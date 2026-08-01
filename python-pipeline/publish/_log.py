"""Shared publish utilities (logging to output/publish_log.json)."""

import json
import os

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
PUBLISH_LOG = os.path.join(ROOT, "output", "publish_log.json")


def append_publish_log(platform, event_id, ok, detail, video_id=None):
    """Record every publish attempt (success or failure, full error detail)."""
    os.makedirs(os.path.dirname(PUBLISH_LOG), exist_ok=True)
    entries = []
    if os.path.exists(PUBLISH_LOG):
        try:
            with open(PUBLISH_LOG, "r", encoding="utf-8") as f:
                entries = json.load(f)
        except (json.JSONDecodeError, OSError):
            entries = []
    from datetime import datetime, timezone

    entries.append({
        "platform": platform,
        "event_id": event_id,
        "video_id": video_id,
        "ok": bool(ok),
        "result": detail,
        "timestamp": datetime.now(timezone.utc).isoformat(),
    })
    with open(PUBLISH_LOG, "w", encoding="utf-8") as f:
        json.dump(entries, f, ensure_ascii=False, indent=2)


def load_approved_queue():
    """Read the approved queue. Publish modules read their input ONLY here."""
    path = os.path.join(ROOT, "output", "approved", "queue.json")
    if not os.path.exists(path):
        return []
    with open(path, "r", encoding="utf-8") as f:
        return json.load(f)
