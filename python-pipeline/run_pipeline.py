"""
Pipeline orchestrator.

--test  : uses mock data everywhere, no API keys needed, shows you exactly
          what the station would produce right now
--live  : uses real GDELT/RSS feeds + real Claude API for scripts + real
          voice/video APIs once the keys are in config/settings.py

Flow per event:
  ingest -> script -> voice (ElevenLabs / mock) -> video (HeyGen / mock)
        -> staged into output/pending/  (NEVER auto-published)
A human then reviews in the dashboard and hits Approve, which moves the item
into output/approved/queue.json. Publishing only happens afterwards, from
publish_approved.py (or the publish modules directly).
"""

import argparse
import hashlib
import json
import os
import re
import shutil
import sys
from datetime import datetime, timezone

sys.path.insert(0, ".")

from ingest.gdelt_poller import mock_events, get_breaking_events
from ingest.rss_poller import mock_items, fetch_all
from scripts.script_writer import write_script
import config.settings as settings

ROOT = os.path.dirname(os.path.abspath(__file__))
PENDING_DIR = os.path.join(ROOT, "output", "pending")


def event_id_from(title, prefix="evt"):
    """Deterministic short id from the event title."""
    slug = re.sub(r"[^a-z0-9]+", "-", title.lower()).strip("-")[:40]
    h = hashlib.md5(title.encode()).hexdigest()[:6]
    return f"{prefix}-{slug or 'x'}-{h}"


def stage_pending(event, script, video_result, created_at=None):
    """
    Write a pending-review item to output/pending/{event_id}/.
    This is the ONLY hand-off into the human approval gate.
    """
    event_id = video_result["event_id"]
    item_dir = os.path.join(PENDING_DIR, event_id)
    os.makedirs(item_dir, exist_ok=True)

    meta_path = os.path.join(item_dir, f"{event_id}.json")
    meta = {
        "event_id": event_id,
        "title": script.get("title") or event.get("title", ""),
        "script_en": script.get("script_en", ""),
        "script_ar": script.get("script_ar", ""),
        "hashtags": script.get("hashtags", []),
        "caveat_used": script.get("caveat_used", False),
        "provider": video_result.get("provider", "mock"),
        "source": event.get("source_url") or "",
        "source_name": event.get("source") or event.get("category", ""),
        "created_at": created_at or datetime.now(timezone.utc).isoformat(),
        "vertical": video_result["vertical"],
        "horizontal": video_result["horizontal"],
    }
    with open(meta_path, "w", encoding="utf-8") as f:
        json.dump(meta, f, ensure_ascii=False, indent=2)
    print(f"[PENDING] staged {event_id} for human review -> output/pending/{event_id}/")
    return event_id


def run(test_mode=True):
    print("=" * 70)
    print(f"AI NEWS STATION — pipeline run ({'TEST' if test_mode else 'LIVE'} mode)")
    print("=" * 70)

    # --- Stage 1: Ingest ---
    if test_mode:
        events = mock_events()
        rss_items = mock_items()
    else:
        events = get_breaking_events(
            threshold=settings.BREAKING_SCORE_THRESHOLD,
            api_key=settings.GDELT_API_KEY,
        )
        rss_items = fetch_all()

    print(f"\n[INGEST] {len(events)} GDELT events, {len(rss_items)} RSS items pulled\n")

    if not events:
        print("No breaking-threshold events right now. Pipeline idle.")
        return

    # --- Stage 2-5: script -> voice -> video -> pending for each event ---
    for event in events:
        print("-" * 70)
        print(f"EVENT: {event['title']}")
        script = write_script(event, api_key=settings.ANTHROPIC_API_KEY or None)

        print(f"\nTITLE:    {script.get('title')}")
        print(f"SCRIPT:   {script.get('script_en')}")
        print(f"HASHTAGS: {script.get('hashtags')}")
        if script.get("mode"):
            print(f"NOTE:     {script.get('mode')}")

        event_id = event.get("id") or event_id_from(event["title"])

        # --- Stage 3: Voice ---
        from voice.elevenlabs_voice import generate_voice
        voice_en = generate_voice(
            script.get("script_en", ""), event_id, language="en",
            api_key=settings.ELEVENLABS_API_KEY or None,
            voice_id=settings.ELEVENLABS_VOICE_ID or None,
        )

        # --- Stage 4: Video ---
        from video.video_assembler import assemble_video
        provider = "heygen" if (settings.HEYGEN_API_KEY and settings.HEYGEN_AVATAR_ID) else "mock"
        script_data = {
            "event_id": event_id,
            "id": event_id,
            "title": script.get("title") or event["title"],
            "script": script.get("script_en", ""),
            "script_en": script.get("script_en", ""),
            "script_ar": script.get("script_ar", ""),
            "language": "en",
            "hashtags": script.get("hashtags", []),
        }
        video = assemble_video(
            voice_en, script_data,
            avatar_provider=provider,
            output_language="en",
        )

        # --- Stage 5: human approval gate (NOT publish) ---
        stage_pending(event, script, video)

        print()

    print("=" * 70)
    print("Pipeline complete. Next steps:")
    print("  1. python dashboard/approval_app.py    (review + approve)")
    print("  2. python publish_approved.py --dry-run (preview the uploads)")
    print("  3. python publish_approved.py           (publish after keys are set)")
    print("=" * 70)


if __name__ == "__main__":
    parser = argparse.ArgumentParser()
    parser.add_argument("--test", action="store_true", help="run with mock data, no keys needed")
    parser.add_argument("--live", action="store_true", help="run with real feeds + Claude API")
    args = parser.parse_args()

    run(test_mode=not args.live)
