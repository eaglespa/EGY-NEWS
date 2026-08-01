"""
YouTube Shorts publisher.

Reads its input ONLY from output/approved/queue.json (written by the approval
dashboard). There is no other code path that can reach the upload call.

Flow (verified against current YouTube Data API v3 docs):
  1. OAuth2 via client secrets file (config/youtube_oauth.json) — one-time
     `--auth` step opens a browser; the refresh token is cached in
     config/youtube_token.json.
  2. videos.insert with uploadType=resumable, snippet+status.
  3. A vertical 9:16 video under 60s is automatically treated as a Short by
     YouTube; we also add #Shorts to title/description.

Usage:
    python publish/youtube_publish.py --dry-run
    python publish/youtube_publish.py --auth   # one-time OAuth grant
    python publish/youtube_publish.py          # real upload (needs keys)
"""

import argparse
import json
import os
import sys

sys.path.insert(0, os.path.dirname(os.path.dirname(os.path.abspath(__file__))))

import config.settings as settings
from publish._log import append_publish_log, load_approved_queue

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
QUEUE_FILE = os.path.join(ROOT, "output", "approved", "queue.json")
TOKEN_FILE = os.path.join(ROOT, "config", "youtube_token.json")

SCOPES = ["https://www.googleapis.com/auth/youtube.upload"]
CATEGORY_ID_NEWS = "25"  # YouTube video category id for News & Politics


def _lazy_google():
    """Import heavy google libs only when actually needed (dry-run stays light)."""
    from google_auth_oauthlib.flow import InstalledAppFlow  # noqa: F401
    from google.oauth2.credentials import Credentials  # noqa: F401
    from googleapiclient.discovery import build  # noqa: F401
    from googleapiclient.http import MediaFileUpload  # noqa: F401
    return Credentials, InstalledAppFlow, build, MediaFileUpload


def _load_token():
    if not os.path.exists(TOKEN_FILE):
        return None
    with open(TOKEN_FILE, "r", encoding="utf-8") as f:
        return json.load(f)


def _save_token(token):
    os.makedirs(os.path.dirname(TOKEN_FILE), exist_ok=True)
    with open(TOKEN_FILE, "w", encoding="utf-8") as f:
        json.dump(token, f, ensure_ascii=False, indent=2)


def authorize():
    """One-time interactive OAuth flow. Saves refresh token to config/."""
    Credentials, InstalledAppFlow, _, _ = _lazy_google()
    secrets = settings.YOUTUBE_CLIENT_SECRETS_FILE
    if not os.path.exists(secrets):
        raise RuntimeError(
            f"YouTube OAuth client secrets not found at {secrets}. "
            "Create a Google Cloud project, enable YouTube Data API v3, "
            "download the OAuth client JSON, and save it there."
        )
    flow = InstalledAppFlow.from_client_secrets_file(secrets, scopes=SCOPES)
    creds = flow.run_local_server(port=0, prompt="consent")
    _save_token({
        "token": creds.token,
        "refresh_token": creds.refresh_token,
        "token_uri": creds.token_uri,
        "client_id": creds.client_id,
        "client_secret": creds.client_secret,
        "scopes": list(creds.scopes),
    })
    print("[youtube] OAuth token saved to config/youtube_token.json")


def _get_client():
    Credentials, InstalledAppFlow, build, MediaFileUpload = _lazy_google()
    token = _load_token()
    if not token or not token.get("refresh_token"):
        raise RuntimeError(
            "[youtube] no OAuth token. Run `python publish/youtube_publish.py --auth` first."
        )
    creds = Credentials.from_authorized_user_info(token, SCOPES)
    return build("youtube", "v3", credentials=creds), MediaFileUpload


def _build_description(entry):
    parts = [entry.get("description") or entry.get("title", "")]
    hashtags = " ".join(entry.get("hashtags") or [])
    if hashtags:
        parts.append(hashtags)
    parts.append("#Shorts")
    parts.append("Paraphrased from wire reports. AI NEWS STATION.")
    return "\n".join(parts)


def upload_entry(entry, dry_run=True):
    """Upload one approved entry as a YouTube Short. Returns video_id (or None on dry run)."""
    video_path = entry.get("vertical")
    if not video_path or not os.path.isfile(video_path):
        append_publish_log("youtube", entry.get("event_id"), False,
                           f"missing vertical file: {video_path}")
        return None

    title = (entry.get("title") or entry.get("event_id", "news"))[:100]
    description = _build_description(entry)[:4900]
    tags = list(entry.get("hashtags") or [])[:20]

    print("[youtube] would upload as Short:")
    print(f"  file       : {video_path}")
    print(f"  title      : {title}")
    print(f"  description: {description[:200]}...")
    print(f"  tags       : {tags}")
    print(f"  categoryId : {CATEGORY_ID_NEWS}  privacyStatus: private (recommended for review)")

    if dry_run:
        append_publish_log("youtube", entry.get("event_id"), True,
                           "DRY-RUN: upload prepared but API call skipped", video_id="dry-run")
        print("[youtube] DRY-RUN complete (no API call made).")
        return "dry-run"

    client, MediaFileUpload = _get_client()
    body = {
        "snippet": {
            "title": title,
            "description": description,
            "tags": tags,
            "categoryId": CATEGORY_ID_NEWS,
        },
        "status": {
            "privacyStatus": "private",  # never auto-public; flip after review
            "selfDeclaredMadeForKids": False,
        },
    }
    media = MediaFileUpload(video_path, chunksize=16 * 1024 * 1024, resumable=True)
    request = client.videos().insert(part="snippet,status", body=body, media_body=media)
    response = None
    try:
        response = request.execute()
    except Exception as e:
        append_publish_log("youtube", entry.get("event_id"), False, f"{type(e).__name__}: {e}")
        raise
    video_id = response.get("id")
    append_publish_log("youtube", entry.get("event_id"), True, "uploaded", video_id=video_id)
    print(f"[youtube] uploaded video id {video_id}")
    return video_id


def upload_all(dry_run=True):
    queue = load_approved_queue()
    if not queue:
        print("[youtube] approved queue is empty — nothing to publish.")
        return 0
    count = 0
    for entry in queue:
        try:
            upload_entry(entry, dry_run=dry_run)
            count += 1
        except Exception as e:
            print(f"[youtube] ERROR for {entry.get('event_id')}: {e}")
    print(f"[youtube] processed {count}/{len(queue)} approved items "
          f"({'dry-run' if dry_run else 'live'}).")
    return count


def main():
    parser = argparse.ArgumentParser(description="Publish approved items to YouTube Shorts")
    parser.add_argument("--dry-run", action="store_true", help="do everything except the API call")
    parser.add_argument("--auth", action="store_true", help="run the one-time OAuth authorization flow")
    args = parser.parse_args()
    if args.auth:
        authorize()
        return
    upload_all(dry_run=args.dry_run)


if __name__ == "__main__":
    main()
