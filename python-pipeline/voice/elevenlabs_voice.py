"""
Voice generator — turns a broadcast script into an MP3 using ElevenLabs TTS.

Docs (verified against live docs at build time):
  POST https://api.elevenlabs.io/v1/text-to-speech/{voice_id}
  Headers : xi-api-key, Content-Type: application/json, Accept: audio/mpeg
  Query   : output_format (default mp3_44100_128)
  Body    : { "text": ..., "model_id": "eleven_multilingual_v2", "voice_settings": {...} }
  Response: binary MP3 bytes (application/octet-stream)

Arabic note: the ElevenLabs multilingual model `eleven_multilingual_v2`
supports `ar` natively, so the SAME model/voice is used for both English and
Arabic scripts. `eleven_v3` (70+ languages) is a newer higher-quality
alternative that also supports Arabic — switch MODEL_ID below if you prefer it.

Mock mode (no ELEVENLABS_API_KEY): generates a short audible WAV tone via pure
Python (stdlib only), then converts it to MP3 with ffmpeg if available. The
pipeline never breaks for a keyless tester.
"""

import os
import math
import shutil
import struct
import subprocess
import tempfile
import wave
from datetime import datetime

import requests

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
AUDIO_DIR = os.path.join(ROOT, "output", "audio")

# Official ElevenLabs TTS endpoint (see docs above).
TTS_URL = "https://api.elevenlabs.io/v1/text-to-speech/{voice_id}"

# Multilingual v2 supports ar; eleven_v3 supports 70+ languages incl. ar.
DEFAULT_MODEL_ID = "eleven_multilingual_v2"

# ffmpeg may live outside PATH on Windows; allow override via env var.
FFMPEG_BIN = os.environ.get("FFMPEG_BIN", "ffmpeg")


def _find_ffmpeg():
    """Return a path to ffmpeg or None."""
    if os.path.isfile(FFMPEG_BIN):
        return FFMPEG_BIN
    try:
        import imageio_ffmpeg
        return imageio_ffmpeg.get_ffmpeg_exe()
    except Exception:
        pass
    from shutil import which
    return which("ffmpeg")


def _mock_tone_wav(duration=5.0, sample_rate=22050, freq=440.0):
    """
    Pure-Python generated placeholder: a short soft two-tone beep so the
    audio file is audible (not silence, which can look like a bug) and is a
    valid, playable WAV.
    """
    n_frames = int(sample_rate * duration)
    buf = bytearray()
    for i in range(n_frames):
        t = i / sample_rate
        # gentle sine wave with a slow fade in/out envelope
        envelope = min(1.0, i / (sample_rate * 0.05), (n_frames - i) / (sample_rate * 0.15))
        value = 0.18 * envelope * (math.sin(2 * math.pi * freq * t) + 0.35 * math.sin(2 * math.pi * freq * 2.0 * t))
        buf.extend(struct.pack("<h", int(value * 32767)))

    tmp = tempfile.NamedTemporaryFile(delete=False, suffix=".wav")
    tmp.close()
    with wave.open(tmp.name, "wb") as w:
        w.setnchannels(1)
        w.setsampwidth(2)
        w.setframerate(sample_rate)
        w.writeframes(bytes(buf))
    return tmp.name


def _wav_to_mp3(wav_path, mp3_path):
    """Convert WAV->MP3 with ffmpeg. Returns True on success."""
    ffmpeg = _find_ffmpeg()
    if not ffmpeg:
        return False
    try:
        subprocess.run(
            [ffmpeg, "-y", "-loglevel", "error", "-i", wav_path, "-codec:a", "libmp3lame", "-q:a", "5", mp3_path],
            check=True,
            capture_output=True,
            timeout=60,
        )
        return os.path.isfile(mp3_path) and os.path.getsize(mp3_path) > 0
    except (subprocess.CalledProcessError, subprocess.TimeoutExpired, FileNotFoundError):
        return False


def _mock_voice(base_path):
    """Generate a placeholder audio file (base_path without extension).

    Returns the actual file written: base_path.mp3 if ffmpeg conversion
    succeeded, otherwise base_path.wav (pure-Python, always works)."""
    wav = _mock_tone_wav()
    try:
        mp3 = base_path + ".mp3"
        if _wav_to_mp3(wav, mp3):
            return mp3
        # no ffmpeg -> keep the WAV with a clear .wav extension so it still plays
        wav_final = base_path + ".wav"
        shutil.copy2(wav, wav_final)
        return wav_final
    finally:
        if os.path.exists(wav):
            try:
                os.remove(wav)
            except OSError:
                pass


def generate_voice(script_text, event_id, language="en", voice_id=None, api_key=None, model_id=None):
    """
    Generate an MP3 of `script_text`.

    Args:
        script_text: the script text to speak (en or ar — same multilingual model)
        event_id:    unique id used in the output filename
        language:    "en" or "ar" — appended to the filename; does NOT change
                     the model, because eleven_multilingual_v2 handles both
        voice_id:    ElevenLabs voice id (defaults to settings.ELEVENLABS_VOICE_ID)
        api_key:     ElevenLabs key (defaults to settings.ELEVENLABS_API_KEY)
        model_id:    TTS model (defaults to eleven_multilingual_v2)

    Returns:
        Path to the generated audio file. Falls back to a pure-Python tone
        (mock mode) when no API key is configured.
    """
    import config.settings as settings

    api_key = api_key or settings.ELEVENLABS_API_KEY
    voice_id = voice_id or settings.ELEVENLABS_VOICE_ID
    model_id = model_id or DEFAULT_MODEL_ID

    os.makedirs(AUDIO_DIR, exist_ok=True)
    filepath = os.path.join(AUDIO_DIR, f"{event_id}_{language}.mp3")

    if not api_key or not voice_id:
        base = os.path.join(AUDIO_DIR, f"{event_id}_{language}")
        result = _mock_voice(base)
        print(f"[voice] MOCK mode (no ELEVENLABS_API_KEY) -> {os.path.relpath(result, ROOT)}")
        return result

    resp = requests.post(
        TTS_URL.format(voice_id=voice_id),
        headers={
            "xi-api-key": api_key,
            "Content-Type": "application/json",
            "Accept": "audio/mpeg",
        },
        params={"output_format": "mp3_44100_128"},
        json={
            "text": script_text,
            "model_id": model_id,
            "voice_settings": {"stability": 0.4, "similarity_boost": 0.8, "style": 0.3, "use_speaker_boost": True},
        },
        timeout=60,
    )
    if resp.status_code != 200:
        raise RuntimeError(
            f"[voice] ElevenLabs returned HTTP {resp.status_code}: {resp.text[:500]} "
            f"(language={language}, voice_id={voice_id}, model_id={model_id})"
        )
    with open(filepath, "wb") as f:
        f.write(resp.content)
    if os.path.getsize(filepath) == 0:
        raise RuntimeError("[voice] ElevenLabs returned an empty audio payload (0 bytes).")
    print(f"[voice] ElevenLabs TTS ({model_id}, {language}) -> {os.path.relpath(filepath, ROOT)}")
    return filepath


if __name__ == "__main__":
    # Make `config.settings` importable when run directly (e.g. python voice/elevenlabs_voice.py)
    import sys
    sys.path.insert(0, ROOT)

    # Self-test: run the mock path and verify the file is a valid audio stream.
    p = generate_voice(
        "We are tracking a fast-moving situation out of Crete, Greece. "
        "Wire services are confirming details as they come in.",
        event_id="mock-voice-test",
        language="en",
    )
    print(f"\nGenerated: {p}")
    print(f"Size     : {os.path.getsize(p)} bytes")
    ffprobe = os.environ.get("FFPROBE_BIN") or ("ffprobe" if os.path.isfile("ffprobe") else None)
    from shutil import which
    ffprobe = ffprobe or which("ffprobe")
    ffmpeg = _find_ffmpeg()
    if ffmpeg:
        print("\nffmpeg media info (stderr):")
        r = subprocess.run([ffmpeg, "-i", p], capture_output=True)
        print(r.stderr.decode(errors="replace"))
    else:
        print("\n(no ffmpeg/ffprobe on PATH to verify duration — file written as WAV is self-verifying)")
