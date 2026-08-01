"""End-to-end smoke test for the approval dashboard over real HTTP.

Starts the Flask app in a thread on 127.0.0.1, then:
  - GET /            (pending list)
  - GET /item/{id}   (review page)
  - POST /approve/{id}  (mock-001 -> approved + queue.json)
  - POST /reject/{id}   (mock-002 -> rejected + rejection log)
  - GET /approved    (approved list)
  - GET /media/{id}/{file}  (video player file serving)
Verifies files physically moved and queue.json schema. Prints PASS/FAIL.
"""

import json
import os
import sys
import threading
import time
import urllib.parse
import urllib.request

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
sys.path.insert(0, ROOT)

PORT = 8091
BASE = f"http://127.0.0.1:{PORT}"

APPROVED_DIR = os.path.join(ROOT, "output", "approved")
REJECTED_DIR = os.path.join(ROOT, "output", "rejected")
QUEUE_FILE = os.path.join(APPROVED_DIR, "queue.json")
REJECTIONS_FILE = os.path.join(REJECTED_DIR, "rejections.json")
PENDING_DIR = os.path.join(ROOT, "output", "pending")


def http(method, path, data=None):
    req = urllib.request.Request(BASE + path, method=method)
    if data is not None:
        req.data = urllib.parse.urlencode(data).encode()
    with urllib.request.urlopen(req, timeout=30) as resp:
        return resp.status, resp.read().decode("utf-8", errors="replace")


def main():
    from dashboard.approval_app import app

    import shutil
    for d in (APPROVED_DIR, REJECTED_DIR):
        if os.path.isdir(d):
            shutil.rmtree(d)

    results = []

    def check(name, cond, detail=""):
        results.append((name, bool(cond), detail))
        print(f"  {'PASS' if cond else 'FAIL'}  {name}" + (f"  {detail}" if detail and not cond else ""))

    server = threading.Thread(target=app.run, kwargs={"host": "127.0.0.1", "port": PORT, "debug": False, "use_reloader": False}, daemon=True)
    server.start()
    time.sleep(3)

    pending_before = sorted(os.listdir(PENDING_DIR)) if os.path.isdir(PENDING_DIR) else []
    check("server responded on /", True if http("GET", "/")[0] == 200 else False)

    status, body = http("GET", "/")
    for eid in ("mock-001", "mock-002", "mock-003"):
        check(f"pending list mentions {eid}", eid in body)

    status, body = http("GET", "/item/mock-001")
    check("review page renders (players + approve form)", status == 200 and "Approve" in body and "<video" in body)

    status, body = http("GET", "/media/mock-001/mock-001_9x16.mp4")
    check("media file served over HTTP", status == 200 and len(body.encode()) > 0)

    status, body = http("POST", "/approve/mock-001", {})
    check("approve returns redirect", status in (200, 302, 303))  # 200 when urllib follows the redirect

    status, body = http("POST", "/reject/mock-002", {"reason": "Editorial: duplicate of mock-003"})
    check("reject returns redirect", status in (200, 302, 303))

    time.sleep(1)
    queue = json.load(open(QUEUE_FILE, encoding="utf-8"))
    check("queue.json has exactly the approved item", len(queue) == 1 and queue[0]["event_id"] == "mock-001")
    entry = queue[0]
    check("queue entry has both video paths", os.path.isfile(entry["vertical"]) and os.path.isfile(entry["horizontal"]))
    check("queue entry moved files into output/approved/", entry["vertical"].startswith(APPROVED_DIR))

    rejections = json.load(open(REJECTIONS_FILE, encoding="utf-8"))
    check("rejection logged with reason", len(rejections) == 1 and rejections[0]["reason"].startswith("Editorial"))

    check("approved video no longer pending", not os.path.isdir(os.path.join(PENDING_DIR, "mock-001")))
    check("rejected video no longer pending", not os.path.isdir(os.path.join(PENDING_DIR, "mock-002")))
    check("mock-003 still pending", os.path.isdir(os.path.join(PENDING_DIR, "mock-003")))

    status, body = http("GET", "/approved")
    check("approved page lists the entry", "mock-001" in body)

    # security: un-approved content cannot appear in queue.json
    ids_in_queue = {e["event_id"] for e in json.load(open(QUEUE_FILE, encoding="utf-8"))}
    check("NOTHING un-approved in queue.json", ids_in_queue == {"mock-001"})

    print("\n" + "=" * 60)
    failed = [r for r in results if not r[1]]
    print(f"SMOKE TEST: {len(results) - len(failed)}/{len(results)} passed")
    if failed:
        print("FAILURES:", failed)
        return 1
    return 0


if __name__ == "__main__":
    sys.exit(main())
