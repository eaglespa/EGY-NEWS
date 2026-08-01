# AI News Station — Automated Breaking News Pipeline

Pulls breaking events → writes original scripts → generates voice + AI anchor video →
you approve → auto-publishes to YouTube Shorts + TikTok.

> **Guardrail:** this pipeline never reproduces wire copy verbatim — every script is
> an original paraphrase that cites its source. Nothing is ever auto-published:
> a human must approve each item in the dashboard first.

## Pipeline

```
ingest/ (GDELT + RSS)  →  scripts/ (Claude writes script)  →  voice/ (ElevenLabs)
   →  video/ (HeyGen avatar or mock, ffmpeg assembly)  →  dashboard/ (approve/reject)
   →  publish/ (YouTube + TikTok upload, gated on your approval)
```

```
run_pipeline.py --test      # full chain in mock mode — no keys needed
run_pipeline.py --live      # real ingest → Claude script → voice → video
dashboard/approval_app.py   # review pending items, Approve / Reject
publish_approved.py --dry-run   # preview what would be uploaded
publish_approved.py             # publish (only approved items, requires keys)
```

## What's built right now

| Module | File | Status |
|---|---|---|
| Ingest | `ingest/gdelt_poller.py`, `ingest/rss_poller.py` | Live GDELT + Reuters/AP/AFP RSS, dedupe, breaking-score |
| Scripts | `scripts/script_writer.py` | 30–45s anchor script, paraphrased, cites source, EN + AR |
| Voice | `voice/elevenlabs_voice.py` | ElevenLabs TTS (`eleven_multilingual_v2`); mock tone generator w/o key |
| Video | `video/video_assembler.py` | ffmpeg overlay cards + captions; HeyGen avatar when keyed |
| Approval gate | `dashboard/approval_app.py` | Flask desk: pending list, in-browser player, Approve/Reject with required reason |
| Publish | `publish/youtube_publish.py`, `publish/tiktok_publish.py` | Upload approved items; `--dry-run` preview; every attempt logged |
| Orchestration | `run_pipeline.py`, `publish_approved.py` | Per-event chain; queue is the only publish input |

**Mock mode** (no keys): voice renders as a tone beep, video renders as colored
title cards with captions — the exact same assembly pipeline, so you can test the
whole loop (ingest → approve → publish dry-run) at zero cost.

## Quick start (mock mode, works right now)

```bash
pip install -r requirements.txt
python run_pipeline.py --test     # stages 3 items into output/pending/
python dashboard/approval_app.py  # http://127.0.0.1:8080 — review, Approve/Reject
python publish_approved.py --dry-run   # preview uploads from output/approved/queue.json
```

Approve moves files to `output/approved/` and appends the single writer
`output/approved/queue.json` (only the dashboard writes this file). Reject requires
a reason, stored in `output/rejected/rejections.json`.

## What needs YOUR accounts before it goes fully live

| Stage | Service | Free tier? | Sign up |
|---|---|---|---|
| Script writing | Anthropic API key | Pay-per-use | console.anthropic.com |
| Voice | ElevenLabs API key | Yes (limited) | elevenlabs.io |
| AI Avatar | HeyGen API key | Trial credits | heygen.com |
| Publish | YouTube Data API v3 (OAuth app) | Free, needs Google Cloud project | console.cloud.google.com |
| Publish | TikTok Content Posting API (dev app) | Free, needs audit approval (can take days) | developers.tiktok.com |
| Alerts | WhatsApp Business API or Slack webhook | Free tier | — |

## Going live

1. Fill in keys in `config/settings.py` (or the same-named env vars).
2. `python run_pipeline.py --live`
3. Review in the dashboard and Approve.
4. YouTube: `python publish/youtube_publish.py --auth` once to complete the one-time
   OAuth consent flow (`config/youtube_token.json` is cached afterwards).
5. TikTok: set `TIKTOK_CLIENT_KEY`/`TIKTOK_CLIENT_SECRET` (stored in
   `config/settings.py`). Until your app passes TikTok's audit, uploads are forced
   to `SELF_ONLY` visibility.
6. `python publish_approved.py` — uploads only what you approved. Real uploads use
   `privacyStatus: private` on YouTube by design; flip to public only after you review.

## ASSUMPTIONS & THINGS TO VERIFY (as of build time)

- **Never auto-publish.** `publish/` only reads `output/approved/queue.json`, which
  only the dashboard's `/approve` handler writes. YouTube uploads default to
  `privacyStatus: private`; TikTok forces `SELF_ONLY` until app audit passes. Both
  choices are deliberate anti auto-publish rails.
- **YouTube OAuth is one-time.** `--auth` opens the consent screen, then a refresh
  token is cached at `config/youtube_token.json`. Uploads use resumable upload with
  categoryId 25 (News). **To verify on a real key:** run the flow and upload one
  Short; confirm the `privacyStatus: private` video appears in your Studio "Videos"
  tab before flipping public.
- **TikTok app audit.** A developer app with `video.publish` scope starts in a
  sandboxed state; API responses should be treated as unverified until your app
  passes audit. **To verify:** upload with the dev app and confirm the post appears
  (SELF_ONLY) in the tester's account feed.
- **HeyGen only does TTS-driven lip-sync.** The API takes a `script` + `voice_id`,
  not a local audio file. Our integration sends the script text and lets HeyGen
  synthesize the voice; if a HeyGen call fails at runtime, the pipeline logs a
  warning and falls back to mock graphics so it never breaks. **To verify on a real
  key:** one live run with `HEYGEN_API_KEY` + `HEYGEN_AVATAR_ID`; confirm the avatar
  tracks the generated audio and that our 9:16/16:9 aspect ratios are accepted.
- **ElevenLabs mock tone.** In mock mode the "voice" is a synthesized tone, not
  speech — this is intentional so tests never hit the API. **To verify on a real
  key:** one live run with `ELEVENLABS_API_KEY`/`ELEVENLABS_VOICE_ID`; confirm Arabic
  (`ar`) is handled by `eleven_multilingual_v2`.
- **ffmpeg is bundled via `imageio-ffmpeg`** — no system ffmpeg needed. The bundled
  7.1 gyan build supports `drawtext`, `harfbuzz`, `libass`, `libx264`.
- **Known ffmpeg regression in this build:** the `subtitles`/`ass` filters fail with
  an "Error applying option 'original_size'" regression, so captions are rendered
  with `drawtext` + `text_shaping=1` instead of ASS subtitles. Arabic shaping works
  because the font is copied to a relative `font.ttf` and `text_shaping=1` is set.
- **Arabic captions.** The video renderer reads `script_ar` from the staged event and
  bakes it into the frame as a second caption line. If `script_ar` is missing the
  English-only caption is used.
- **Publish log.** Every publish attempt (including dry-runs) is appended to
  `output/publish_log.json` with `ok` + `video_id`. No retry/backoff or
  failure-notification channel exists yet — verify a hard failure surfaces in this log.
- **Python 3.14 + Windows.** Developed and verified on Python 3.14.5 / Windows.
  The `os.replace` across-drive pitfall and relative-font handling were specific to
  this environment and are already worked around.

## Layout

```
config/settings.py          # keys (env-var fallbacks), HEYGEN_VOICE_ID, etc.
ingest/ scripts/ voice/ video/ dashboard/ publish/
output/{audio,video,work,pending,approved,rejected,publish_log.json}
run_pipeline.py  publish_approved.py  requirements.txt
```
