"""
Video assembler — turns an audio narration + script into a short-form news
video with burned captions, a branded lower-third, and intro/outro bumpers.

Two providers:
  avatar_provider="heygen"  : if HEYGEN_API_KEY + HEYGEN_AVATAR_ID are set,
                              generate an avatar clip via the HeyGen v3 API
                              (POST /v3/videos, then poll GET /v3/videos/{id}),
                              download it, and use it as the base footage.
                              If any HeyGen step fails, we print a loud warning
                              and fall back to the synthetic background so the
                              pipeline still runs (mock path preserved).
  avatar_provider="mock"     : synthetic news-graphics background (no key).

Rendering: ffmpeg (libx264 + drawtext + libass-capable build required).
  ffmpeg resolution order:
    1. FFMPEG_BIN env var (must point to a full build, e.g. gyan.dev)
    2. imageio-ffmpeg's bundled static build (ships with this project's deps)
    3. `ffmpeg` on PATH
  The bundled imageio-ffmpeg build has drawtext/harfbuzz/libx264 — verified.

Text rendering notes:
  - Captions are burned with the `drawtext` filter (libfreetype + harfbuzz
    shaping, so Arabic renders connected). Each caption chunk is a textfile
    (avoids escaping issues) enabled over its time window.
  - Intro/outro/lower-third text also use drawtext with textfile.
  - We do NOT use the `subtitles`/`ass` filters: this ffmpeg build hits the
    known "Error applying option 'original_size'" regression.
  - Windows drive-letter colons in filtergraph values break parsing, so
    every textfile path is RELATIVE and ffmpeg runs with cwd = the text
    workdir. Filtergraph itself is written to a file and passed via
    -filter_complex_script.

Outputs (both orientations):
  output/video/{event_id}_{orientation}.mp4
"""

import os
import re
import shutil
import subprocess
import tempfile
import time

import requests

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
VIDEO_DIR = os.path.join(ROOT, "output", "video")
WORK_BASE = os.path.join(ROOT, "output", "work")

# HeyGen v3 (verified against developers.heygen.com docs; v1/v2 EOL Oct 2026).
HEYGEN_CREATE_URL = "https://api.heygen.com/v3/videos"
HEYGEN_STATUS_URL = "https://api.heygen.com/v3/videos/{video_id}"

HEYGEN_POLL_INTERVAL_S = 10
HEYGEN_POLL_MAX_TRIES = 60  # ~10 minutes

INTRO_DURATION = 2.2
OUTRO_DURATION = 2.0

BRAND = "AI NEWS STATION"

FFMPEG_BIN = os.environ.get("FFMPEG_BIN", "")


# ---------------------------------------------------------------- ffmpeg --

def _ffmpeg_exe():
    """Return a usable ffmpeg binary or raise a clear error."""
    candidates = []
    if FFMPEG_BIN:
        candidates.append(FFMPEG_BIN)
    try:
        import imageio_ffmpeg
        candidates.append(imageio_ffmpeg.get_ffmpeg_exe())
    except Exception:
        pass
    candidates.append(shutil.which("ffmpeg") or "")

    for c in candidates:
        if not c or not os.path.isfile(c):
            continue
        try:
            r = subprocess.run([c, "-hide_banner", "-filters"], capture_output=True, timeout=20)
            if b"drawtext" in r.stdout and b"libx264" in subprocess.run(
                [c, "-hide_banner", "-encoders"], capture_output=True, timeout=20
            ).stdout:
                return c
        except (subprocess.SubprocessError, OSError):
            continue
    raise RuntimeError(
        "[video] No ffmpeg with drawtext + libx264 found. Install one and set FFMPEG_BIN, "
        "or `pip install imageio-ffmpeg` (bundled build)."
    )


def _run_ffmpeg(args, cwd):
    """Run ffmpeg, raising with a useful message on failure."""
    ff = _ffmpeg_exe()
    r = subprocess.run([ff, "-hide_banner", "-nostdin", "-y"] + args, cwd=cwd, capture_output=True)
    if r.returncode != 0:
        tail = r.stderr.decode(errors="replace").strip().splitlines()[-8:]
        raise RuntimeError("[video] ffmpeg failed:\n" + "\n".join(tail))
    return r


def _probe_duration(path):
    """Return media duration in seconds by parsing `ffmpeg -i` stderr."""
    ff = _ffmpeg_exe()
    r = subprocess.run([ff, "-hide_banner", "-i", path], capture_output=True)
    m = re.search(r"Duration:\s*(\d+):(\d+):(\d+\.\d+)", r.stderr.decode(errors="replace"))
    if not m:
        raise RuntimeError(f"[video] could not probe duration of {path}")
    h, mn, s = m.groups()
    return int(h) * 3600 + int(mn) * 60 + float(s)


def _escape_filter_value(value):
    """Escape a plain string for use as a drawtext option value."""
    return (
        value.replace("\\", "\\\\")
        .replace(":", "\\:")
        .replace("'", "\\'")
        .replace(",", "\\,")
        .replace(";", "\\;")
        .replace("[", "\\[")
        .replace("]", "\\]")
    )


# -------------------------------------------------------------- captions --

def _split_captions(text, max_words=5):
    """Split a script into short caption chunks (~max_words words each)."""
    words = text.split()
    return [" ".join(words[i:i + max_words]) for i in range(0, len(words), max_words)] or [""]


def _write_textfile(workdir, name, text):
    path = os.path.join(workdir, name)
    with open(path, "w", encoding="utf-8") as f:
        f.write(text)
    return name  # return the RELATIVE name for the filtergraph


# -------------------------------------------------------------- heygen --

def _heygen_generate_and_download(audio_path, script_data, event_id, workdir):
    """Create a HeyGen avatar video, poll to completion, download it.

    Uses script text + a HeyGen voice_id (TTS-driven avatar), NOT our local
    audio file: HeyGen lip-sync requires the audio at a PUBLIC url
    (audio_url/audio_asset_id), which we don't have in v1. Script and audio
    are mutually exclusive in the v3 API. Returns the local avatar mp4 path.
    """
    import config.settings as settings

    api_key = settings.HEYGEN_API_KEY
    avatar_id = settings.HEYGEN_AVATAR_ID
    voice_id = settings.HEYGEN_VOICE_ID

    if not api_key or not avatar_id:
        raise RuntimeError("[video] heygen provider requires HEYGEN_API_KEY and HEYGEN_AVATAR_ID")
    if not voice_id:
        raise RuntimeError("[video] heygen TTS-driven avatar requires HEYGEN_VOICE_ID "
                           "(a HeyGen voice; our local ElevenLabs audio can't be lip-synced without a public URL)")

    headers = {"X-Api-Key": api_key, "Content-Type": "application/json"}
    payload = {
        "type": "avatar",
        "avatar_id": avatar_id,
        "script": script_data.get("script", script_data.get("title", "")),
        "voice_id": voice_id,
        "aspect_ratio": "9:16",
        "title": script_data.get("title", f"news-{event_id}"),
    }
    r = requests.post(HEYGEN_CREATE_URL, headers=headers, json=payload, timeout=30)
    if r.status_code != 200:
        raise RuntimeError(f"[video] HeyGen create failed HTTP {r.status_code}: {r.text[:300]}")
    data = r.json().get("data", {})
    video_id = data.get("video_id")
    if not video_id:
        raise RuntimeError(f"[video] HeyGen create response had no video_id: {data}")

    print(f"[video] HeyGen job {video_id} submitted, polling...")
    status = "pending"
    for attempt in range(HEYGEN_POLL_MAX_TRIES):
        time.sleep(HEYGEN_POLL_INTERVAL_S)
        sr = requests.get(HEYGEN_STATUS_URL.format(video_id=video_id), headers=headers, timeout=30)
        if sr.status_code != 200:
            raise RuntimeError(f"[video] HeyGen status HTTP {sr.status_code}: {sr.text[:300]}")
        sdata = sr.json().get("data", {})
        status = sdata.get("status")
        if status == "completed":
            video_url = sdata.get("video_url")
            if not video_url:
                raise RuntimeError("[video] HeyGen completed but no video_url in response")
            os.makedirs(VIDEO_DIR, exist_ok=True)
            local = os.path.join(VIDEO_DIR, f"{event_id}_avatar.mp4")
            with requests.get(video_url, timeout=120, stream=True) as vr:
                vr.raise_for_status()
                with open(local, "wb") as f:
                    shutil.copyfileobj(vr.raw, f)
            print(f"[video] HeyGen avatar downloaded -> {os.path.relpath(local, ROOT)}")
            return local
        if status == "failed":
            raise RuntimeError(f"[video] HeyGen job failed: {sdata.get('failure_message') or sdata}")
        if attempt % 3 == 2:
            print(f"[video] HeyGen status={status} ({attempt + 1}/{HEYGEN_POLL_MAX_TRIES})")

    raise RuntimeError(f"[video] HeyGen job {video_id} did not finish in time (last status {status})")


# ------------------------------------------------------------ rendering --

FONT_CANDIDATES = [
    os.environ.get("FFMPEG_FONT", ""),
    r"C:\Windows\Fonts\arial.ttf",
    r"C:\Windows\Fonts\arialbd.ttf",
    r"C:\Windows\Fonts\segoeui.ttf",
    r"C:\Windows\Fonts\tahoma.ttf",
    "/usr/share/fonts/truetype/dejavu/DejaVuSans.ttf",
    "/usr/share/fonts/truetype/dejavu/DejaVuSans-Bold.ttf",
    "/usr/share/fonts/dejavu/DejaVuSans.ttf",
]


def _resolve_font(workdir):
    """Copy a usable TTF into workdir and return its RELATIVE name (avoids
    drive-colon escaping in the filtergraph and fontconfig lookup failures).
    Returns None if no font is found (caller falls back to font= name)."""
    for path in FONT_CANDIDATES:
        if path and os.path.isfile(path):
            shutil.copy(path, os.path.join(workdir, "font.ttf"))
            return "font.ttf"
    return None


def _render_orientation(ffmpeg, workdir, event_id, audio_path, script_data,
                        script_text, title, language, width, height, base_video):
    """
    Render one orientation to output/video/{event_id}_{orientation}.mp4.

    base_video: either ("lavfi", None) for synthetic, or ("file", path).
    """
    orientation = "9x16" if width < height else "16x9"
    out_name = f"{event_id}_{orientation}.mp4"

    audio_dur = _probe_duration(audio_path)
    main_start = INTRO_DURATION
    main_end = main_start + audio_dur

    fontfile = _resolve_font(workdir)
    font_opt = f":fontfile={fontfile}" if fontfile else ":font=Arial"

    # caption windows evenly spread across the spoken audio
    chunks = _split_captions(script_text)
    if len(chunks) == 1 and chunks[0] == "":
        chunks = [script_text]
    step = audio_dur / max(len(chunks), 1)

    work_prefix = f"{event_id}_{orientation}"
    cap_files = []
    for i, ch in enumerate(chunks):
        cap_files.append(_write_textfile(workdir, f"{work_prefix}_cap{i}.txt", ch))
    l3_file = _write_textfile(workdir, f"{work_prefix}_l3.txt", title[:60])
    intro_file = _write_textfile(workdir, f"{work_prefix}_intro.txt", BRAND)
    bnews_file = _write_textfile(workdir, f"{work_prefix}_bnews.txt", "BREAKING NEWS")
    tag_file = _write_textfile(workdir, f"{work_prefix}_tag.txt", "LIVE")
    outro_file = _write_textfile(workdir, f"{work_prefix}_outro.txt", "SUBSCRIBE - " + BRAND)

    # --- sources: intro color, outro color, main (color or avatar file) ---
    intro = f"color=c=0x8a1111:s={width}x{height}:d={INTRO_DURATION}:r=30[iv]"
    outro = f"color=c=0x0b1f3a:s={width}x{height}:d={OUTRO_DURATION}:r=30[ov]"
    if base_video[0] == "file":
        main = (f"[0:v]trim=duration={audio_dur:.2f},setpts=PTS-STARTPTS,fps=30,setsar=1,"
                f"scale={width}:{height}:force_original_aspect_ratio=increase,"
                f"crop={width}:{height}[mv]")
    else:
        main = f"color=c=0x0b1f3a:s={width}x{height}:d={audio_dur:.2f}:r=30[mv]"

    # --- intro/outro text baked onto their own color cards, then concat ---
    intro_txt1 = (f"[iv]drawtext=textfile={intro_file}{font_opt}:fontsize={int(width * 0.06)}:"
                  f"fontcolor=white:borderw=3:bordercolor=black:x=(w-text_w)/2:y=h*0.40[ivt]")
    intro_txt2 = (f"[ivt]drawtext=textfile={bnews_file}{font_opt}:fontsize={int(width * 0.035)}:"
                  f"fontcolor=red:borderw=2:bordercolor=black:x=(w-text_w)/2:y=h*0.54[ivf]")
    outro_txt = (f"[ov]drawtext=textfile={outro_file}{font_opt}:fontsize={int(width * 0.05)}:"
                 f"fontcolor=white:borderw=3:bordercolor=black:x=(w-text_w)/2:y=h*0.46[ovf]")
    concat = (f"[ivf][mv][ovf]concat=n=3:v=1:a=0,format=yuv420p,settb=AVTB[vc]")

    # --- branding overlays over the whole timeline (band + live tag + captions + lower-third) ---
    overlays = []
    overlays.append(
        f"drawbox=x=0:y=0:w=iw:h={int(height * 0.045)}:color=0x8a1111@0.9:t=fill:"
        f"enable='between(t,{main_start:.2f},{main_end:.2f})'"
    )
    overlays.append(
        f"drawtext=textfile={tag_file}{font_opt}:fontsize={max(28, int(width * 0.02))}:"
        f"fontcolor=white:box=1:boxcolor=0x8a1111@0.95:boxborderw={max(8, int(width * 0.006))}:"
        f"x={int(width * 0.03)}:y={int(height * 0.005)}:enable='between(t,{main_start:.2f},{main_end:.2f})'"
    )
    for i, cap in enumerate(cap_files):
        cs = main_start + i * step
        ce = cs + step
        overlays.append(
            f"drawtext=textfile={cap}{font_opt}:fontsize={max(40, int(width * 0.052))}:"
            f"fontcolor=white:borderw={max(3, int(width * 0.004))}:bordercolor=black:"
            f"x=(w-text_w)/2:y=h*0.70:text_shaping=1:enable='between(t,{cs:.2f},{ce:.2f})'"
        )
    overlays.append(
        f"drawtext=textfile={l3_file}{font_opt}:fontsize={max(30, int(width * 0.028))}:"
        f"fontcolor=white:box=1:boxcolor=black@0.6:boxborderw={max(10, int(width * 0.008))}:"
        f"x={int(width * 0.03)}:y=h-{int(height * 0.12)}:enable='between(t,{main_start:.2f},{main_end:.2f})'"
    )
    overlays.append(
        f"drawtext=textfile={intro_file}{font_opt}:fontsize={max(26, int(width * 0.022))}:"
        f"fontcolor=0x9ad0ff:box=1:boxcolor=black@0.6:boxborderw={max(10, int(width * 0.008))}:"
        f"x={int(width * 0.03)}:y=h-{int(height * 0.07)}:enable='between(t,{main_start:.2f},{main_end:.2f})'"
    )
    overlay_chain = ",".join(overlays)
    branded = f"[vc]{overlay_chain}[vf]"

    # --- audio: silent intro + narration + silent outro, all 44100 stereo ---
    audio_stream = "1:a" if base_video[0] == "file" else "0:a"
    audio = (
        f"anullsrc=r=44100:cl=stereo,atrim=duration={INTRO_DURATION:.2f}[sa];"
        f"[{audio_stream}]aresample=44100,aformat=sample_fmts=fltp:channel_layouts=stereo[na];"
        f"anullsrc=r=44100:cl=stereo,atrim=duration={OUTRO_DURATION:.2f}[sb];"
        f"[sa][na][sb]concat=n=3:v=0:a=1[ao]"
    )

    graph = ";".join([intro, outro, main, intro_txt1, intro_txt2, outro_txt,
                      concat, branded, audio])

    inputs = []
    if base_video[0] == "file":
        inputs += ["-stream_loop", "-1", "-i", base_video[1]]
    inputs += ["-i", audio_path]

    graph_path = os.path.join(workdir, f"{work_prefix}_graph.txt")
    with open(graph_path, "w", encoding="utf-8") as f:
        f.write(graph)

    args = inputs + [
        "-filter_complex_script", graph_path,
        "-map", "[vf]", "-map", "[ao]",
        "-c:v", "libx264", "-preset", "medium", "-crf", "22",
        "-pix_fmt", "yuv420p", "-r", "30",
        "-c:a", "aac", "-b:a", "128k", "-ar", "44100",
        "-movflags", "+faststart", "-shortest",
        out_name,
    ]
    _run_ffmpeg(args, cwd=workdir)

    final = os.path.join(VIDEO_DIR, out_name)
    if not os.path.exists(final):
        shutil.move(os.path.join(workdir, out_name), final)
    print(f"[video] rendered {orientation} -> {os.path.relpath(final, ROOT)}")
    return final


def assemble_video(audio_path, script_data, avatar_provider="heygen", output_language="en"):
    """
    Assemble both orientations of the news video.

    Args:
        audio_path: narration mp3 (from voice/elevenlabs_voice.py)
        script_data: dict with event_id, title, script_<lang> / script, language
        avatar_provider: "heygen" (uses avatar if keys present, else falls back
                         to mock graphics) or "mock"
        output_language: "en" or "ar" — which script is spoken in audio_path

    Returns:
        dict: {"event_id":..., "vertical": path, "horizontal": path,
               "provider": "heygen"|"mock"}
    """
    script_text = script_data.get("script") or script_data.get(f"script_{output_language}") or ""
    title = script_data.get("title") or ""
    event_id = script_data.get("event_id") or script_data.get("id") or "event"

    os.makedirs(VIDEO_DIR, exist_ok=True)
    os.makedirs(WORK_BASE, exist_ok=True)
    _ffmpeg_exe()  # raise early if no usable ffmpeg

    base_video = ("lavfi", None)
    provider = "mock"
    if avatar_provider == "heygen":
        try:
            avatar_path = _heygen_generate_and_download(audio_path, script_data, event_id, WORK_BASE)
            base_video = ("file", avatar_path)
            provider = "heygen"
        except Exception as e:
            print(f"[video] WARNING: HeyGen path failed ({e}); falling back to mock graphics.")

    with tempfile.TemporaryDirectory(prefix="news_", dir=WORK_BASE) as workdir:
        vertical = _render_orientation(
            _ffmpeg_exe(), workdir, event_id, audio_path, script_data,
            script_text, title, output_language, 1080, 1920, base_video,
        )
        horizontal = _render_orientation(
            _ffmpeg_exe(), workdir, event_id, audio_path, script_data,
            script_text, title, output_language, 1920, 1080, base_video,
        )

    return {
        "event_id": event_id,
        "title": title,
        "vertical": vertical,
        "horizontal": horizontal,
        "provider": provider,
    }


if __name__ == "__main__":
    # Self-test: build a mock video from the existing mock narration mp3.
    import sys
    sys.path.insert(0, ROOT)

    audio = os.path.join(ROOT, "output", "audio", "mock-voice-test_en.mp3")
    if not os.path.exists(audio):
        from voice.elevenlabs_voice import generate_voice
        audio = generate_voice("Test narration for the video assembler.", event_id="mock-voice-test", language="en")

    result = assemble_video(
        audio,
        {
            "event_id": "mock-asm-test",
            "title": "Magnitude 6.1 earthquake reported off the coast of Crete",
            "script": "We are tracking a fast-moving situation out of Crete, Greece. "
                      "Wire services are confirming details as they come in. "
                      "Our team is monitoring official channels for the latest. "
                      "Stay with us - we will have more shortly.",
            "script_ar": "عاجل زلزال قوي قبالة سواحل كريت، وخدمات الأنباء تؤكد التفاصيل. ابقوا معنا.",
            "language": "en",
            "hashtags": ["#BreakingNews", "#News", "#Developing"],
        },
        avatar_provider="mock",
        output_language="en",
    )
    print("\nRESULT:", {k: (os.path.relpath(v, ROOT) if isinstance(v, str) and v else v) for k, v in result.items()})
    for key in ("vertical", "horizontal"):
        p = result[key]
        print(f"\n{key}: duration={_probe_duration(p):.2f}s size={os.path.getsize(p)} bytes")
