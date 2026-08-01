"""
Publish every approved item to YouTube Shorts + TikTok.

Reads its input ONLY from output/approved/queue.json (which only the approval
dashboard can write). Publishing never happens from run_pipeline.py — only
after a human approves, and only by running this script.

Usage:
    python publish_approved.py --dry-run   # preview exactly what would be sent
    python publish_approved.py             # real uploads (keys required)
"""

import argparse
import sys
import os

sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))

from publish import youtube_publish, tiktok_publish
from publish._log import load_approved_queue


def main():
    parser = argparse.ArgumentParser(description="Publish approved items to YouTube + TikTok")
    parser.add_argument("--dry-run", action="store_true",
                        help="do everything except the final API upload calls")
    parser.add_argument("--youtube-only", action="store_true")
    parser.add_argument("--tiktok-only", action="store_true")
    args = parser.parse_args()

    queue = load_approved_queue()
    print(f"[publish] {len(queue)} approved item(s) in output/approved/queue.json\n")

    if not args.tiktok_only:
        youtube_publish.upload_all(dry_run=args.dry_run)
    if not args.youtube_only:
        tiktok_publish.upload_all(dry_run=args.dry_run)

    print("\n[publish] every attempt logged to output/publish_log.json")


if __name__ == "__main__":
    main()
