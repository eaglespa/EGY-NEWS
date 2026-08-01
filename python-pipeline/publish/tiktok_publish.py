"""
TikTok publisher (Content Posting API, Direct Post).

Reads its input ONLY from output/approved/queue.json (written by the approval
dashboard). There is no other code path that can reach the upload call.

Flow (verified against current TikTok Content Posting API docs):
  1. Client access token: POST https://open.tiktokapis.com/v2/oauth/token/
     (grant_type=client_credentials, scope=video.publish). Direct Post needs
     the app to be approved for video.publish AND for the app audit to pass
     (otherwise posts are forced private/SELF_ONLY).
  2. POST https://open.tiktokapis.com/v2/post/publish/video/init/ with
     source_info.source = FILE_UPLOAD (video_size/chunk_size/total_chunk_count)
     -> returns data.publish_id + data.upload_url (expires in ~1h).
  3. Upload the file to upload_url (chunked PUT).
  4. Poll POST /v2/post/publish/status/fetch/ ({"filters": {"publish_id": ...}})
     until PUBLISH_COMPLETE.

Usage:
    python publish/tiktok_publish.py --dry-run
    python publish/tiktok_publish.py          # real upload (needs keys)
"""

import argparse
import math
import os
import sys

import requests

sys.path.insert(0, os.path.dirname(os.path.dirname(os.path.abspath(__file__))))

import config.settings as settings
from publish._log import append_publish_log, load_approved_queue

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
QUEUE_FILE = os.path.join(ROOT, "output", "approved", "queue.json")

TOKEN_URL = "https://open.tiktokapis.com/v2/oauth/token/"
INIT_URL = "https://open.tiktokapis.com/v2/post/publish/video/init/"
STATUS_URL = "https://open.tiktokapis.com/v2/post/publish/status/fetch/"

CHUNK_SIZE = 10 * 1024 * 1024  # 10 MiB
POLL_MAX_TRIES = 30
POLL_INTERVAL_S = 10

PRIVACY = "PUBLIC_TO_EVERYONE"


def _client_access_token():
    """Direct-Post access token via the client_credentials grant."""
    if not settings.TIKTOK_CLIENT_KEY or not settings.TIKTOK_CLIENT_SECRET:
        raise RuntimeError(
            "[tiktok] TIKTOK_CLIENT_KEY / TIKTOK_CLIENT_SECRET not configured. "
            "Create a TikTok developer app and approve the video.publish scope."
        )
    r = requests.post(
        TOKEN_URL,
        data={
            "client_key": settings.TIKTOK_CLIENT_KEY,
            "client_secret": settings.TIKTOK_CLIENT_SECRET,
            "grant_type": "client_credentials",
            "scope": "video.publish",
        },
        timeout=30,
    )
    if r.status_code != 200:
        raise RuntimeError(f"[tiktok] token request failed HTTP {r.status_code}: {r.text[:300]}")
    data = r.json().get("data", {})
    token = data.get("access_token")
    if not token:
        raise RuntimeError(f"[tiktok] token response had no access_token: {data}")
    return token


def _init_publish(token, video_path):
    size = os.path.getsize(video_path)
    total_chunks = math.ceil(size / CHUNK_SIZE)
    headers = {"Authorization": f"Bearer {token}", "Content-Type": "application/json; charset=UTF-8"}
    body = {
        "post_info": {
            "title": "...",  # set by caller after dry-run preview
            "privacy_level": PRIVACY,
            "disable_duet": False,
            "disable_comment": False,
            "disable_stitch": False,
            "video_cover_timestamp_ms": 1000,
        },
        "source_info": {
            "source": "FILE_UPLOAD",
            "video_size": size,
            "chunk_size": CHUNK_SIZE,
            "total_chunk_count": total_chunks,
        },
    }
    return body


def _upload_file(token, upload_url, video_path):
    """Upload the local file to the TikTok presigned upload_url in chunks."""
    size = os.path.getsize(video_path)
    headers = {"Authorization": f"Bearer {token}", "Content-Type": "video/mp4"}
    with open(video_path, "rb") as f:
        offset = 0
        while offset < size:
            data = f.read(CHUNK_SIZE)
            r = requests.put(upload_url, headers=headers, data=data, timeout=300)
            if r.status_code not in (200, 201, 204):
                raise RuntimeError(f"[tiktok] chunk upload failed HTTP {r.status_code}: {r.text[:300]}")
            offset += len(data)


def _poll_status(token, publish_id):
    headers = {"Authorization": f"Bearer {token}", "Content-Type": "application/json"}
    for _ in range(POLL_MAX_TRIES):
        r = requests.post(STATUS_URL, headers=headers,
                          json={"filters": {"publish_id": publish_id}}, timeout=30)
        if r.status_code == 200:
            data = r.json().get("data", {})
            status = data.get("status")
            if status == "PUBLISH_COMPLETE":
                return True
            if status in ("FAILED", "PUBLISH_FAILED"):
                raise RuntimeError(f"[tiktok] publish failed: {data}")
        import time
        time.sleep(POLL_INTERVAL_S)
    raise RuntimeError("[tiktok] publish did not complete in time")


def upload_entry(entry, dry_run=True):
    """Upload one approved entry to TikTok. Returns publish_id (or None on dry run)."""
    video_path = entry.get("vertical")
    if not video_path or not os.path.isfile(video_path):
        append_publish_log("tiktok", entry.get("event_id"), False,
                           f"missing vertical file: {video_path}")
        return None

    title = (entry.get("title") or entry.get("event_id", "news"))
    hashtags = " ".join(entry.get("hashtags") or [])
    post_title = f"{title} {hashtags}".strip()

    print("[tiktok] would upload as TikTok Direct Post:")
    print(f"  file     : {video_path}")
    print(f"  title    : {post_title[:200]}")
    print(f"  privacy  : {PRIVACY} (until app audit passes, TikTok forces SELF_ONLY)")

    if dry_run:
        append_publish_log("tiktok", entry.get("event_id"), True,
                           "DRY-RUN: init payload prepared but API call skipped")
        print("[tiktok] DRY-RUN complete (no API call made).")
        return "dry-run"

    token = _client_access_token()
    body = _init_publish(token, video_path)
    body["post_info"]["title"] = post_title[:2000]
    r = requests.post(INIT_URL, headers={"Authorization": f"Bearer {token}",
                                         "Content-Type": "application/json; charset=UTF-8"},
                      json=body, timeout=60)
    if r.status_code != 200:
        append_publish_log("tiktok", entry.get("event_id"), False,
                           f"init HTTP {r.status_code}: {r.text[:500]}")
        raise RuntimeError(f"[tiktok] init failed HTTP {r.status_code}: {r.text[:300]}")
    data = r.json().get("data", {})
    publish_id = data.get("publish_id")
    upload_url = data.get("upload_url")
    if not publish_id:
        append_publish_log("tiktok", entry.get("event_id"), False, f"no publish_id: {data}")
        raise RuntimeError(f"[tiktok] no publish_id in init response: {data}")

    try:
        _upload_file(token, upload_url, video_path)
        _poll_status(token, publish_id)
        append_publish_log("tiktok", entry.get("event_id"), True, "published", video_id=publish_id)
        print(f"[tiktok] published {publish_id}")
    except Exception as e:
        append_publish_log("tiktok", entry.get("event_id"), False, f"{type(e).__name__}: {e}")
        raise
    return publish_id


def upload_all(dry_run=True):
    queue = load_approved_queue()
    if not queue:
        print("[tiktok] approved queue is empty — nothing to publish.")
        return 0
    count = 0
    for entry in queue:
        try:
            upload_entry(entry, dry_run=dry_run)
            count += 1
        except Exception as e:
            print(f"[tiktok] ERROR for {entry.get('event_id')}: {e}")
    print(f"[tiktok] processed {count}/{len(queue)} approved items "
          f"({'dry-run' if dry_run else 'live'}).")
    return count


def main():
    parser = argparse.ArgumentParser(description="Publish approved items to TikTok")
    parser.add_argument("--dry-run", action="store_true", help="do everything except the API call")
    args = parser.parse_args()
    upload_all(dry_run=args.dry_run)


if __name__ == "__main__":
    main()
