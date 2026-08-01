"""
Approval dashboard — the human safety gate for the whole pipeline.

Pending items live in output/pending/{event_id}/ and are produced by
run_pipeline.py (which NEVER calls publish). A human reviews each item here,
then clicks Approve or Reject:

  Approve -> video files are MOVED to output/approved/{event_id}/ and a
             structured entry is appended to output/approved/queue.json.
  Reject  -> video files are MOVED to output/rejected/{event_id}/ and the
             reason is logged to output/rejected/rejections.json.

Hard guarantee: the only code in this repo that ever appends to
output/approved/queue.json is the /approve handler below. publish/ modules
read their input ONLY from that file — so it is structurally impossible for
un-approved content to reach a publish call. We also assert that on startup.

Usage:
    python dashboard/approval_app.py [--port 8080] [--host 127.0.0.1]

Endpoints:
    GET  /                    pending queue list
    GET  /item/{event_id}     review page (players + scripts + approve/reject)
    POST /approve/{event_id}  approve (moves files, appends queue.json)
    POST /reject/{event_id}   reject  (reason required; moves files, logs)
    GET  /approved            list of approved items (read-only)
    GET  /media/{event_id}/{filename}  serves a video file for the player
"""

import argparse
import json
import os
import shutil
import sys
from datetime import datetime, timezone

from flask import Flask, abort, flash, redirect, render_template_string, request, send_from_directory, url_for

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
if ROOT not in sys.path:
    sys.path.insert(0, ROOT)
PENDING_DIR = os.path.join(ROOT, "output", "pending")
APPROVED_DIR = os.path.join(ROOT, "output", "approved")
REJECTED_DIR = os.path.join(ROOT, "output", "rejected")
QUEUE_FILE = os.path.join(APPROVED_DIR, "queue.json")
REJECTIONS_FILE = os.path.join(REJECTED_DIR, "rejections.json")

app = Flask(__name__)
app.jinja_env.filters["basename"] = os.path.basename
app.secret_key = os.environ.get("DASHBOARD_SECRET", "news-station-dev-only-secret")


# ------------------------------------------------------------- helpers --

def _now():
    return datetime.now(timezone.utc).isoformat()


def _ensure_dirs():
    for d in (PENDING_DIR, APPROVED_DIR, REJECTED_DIR):
        os.makedirs(d, exist_ok=True)


def _load_json(path, default):
    if not os.path.exists(path):
        return default
    try:
        with open(path, "r", encoding="utf-8") as f:
            return json.load(f)
    except (json.JSONDecodeError, OSError):
        return default


def _save_json(path, data):
    with open(path, "w", encoding="utf-8") as f:
        json.dump(data, f, ensure_ascii=False, indent=2)


def _list_pending():
    """Return metadata dicts for every item in output/pending/."""
    items = []
    if not os.path.isdir(PENDING_DIR):
        return items
    for event_id in sorted(os.listdir(PENDING_DIR)):
        item_dir = os.path.join(PENDING_DIR, event_id)
        meta = os.path.join(item_dir, f"{event_id}.json")
        if not os.path.isdir(item_dir) or not os.path.isfile(meta):
            continue
        data = _load_json(meta, {})
        data["event_id"] = event_id
        items.append(data)
    return items


def _find_pending(event_id):
    item_dir = os.path.join(PENDING_DIR, event_id)
    meta = os.path.join(item_dir, f"{event_id}.json")
    if not os.path.isdir(item_dir) or not os.path.isfile(meta):
        return None
    data = _load_json(meta, {})
    data["event_id"] = event_id
    return data


def _file_exists_or_raise(data):
    for key in ("vertical", "horizontal"):
        if not data.get(key) or not os.path.isfile(data[key]):
            abort(500, description=f"pending item missing {key} file: {data.get(key)}")


def _append_queue(entry):
    """Append an approved entry to queue.json. The ONLY writer of this file."""
    queue = _load_json(QUEUE_FILE, [])
    queue.append(entry)
    _save_json(QUEUE_FILE, queue)


def _assert_gate():
    """Startup sanity check that un-approved content cannot reach publish."""
    from publish import youtube_publish, tiktok_publish  # noqa: F401
    assert youtube_publish.QUEUE_FILE == QUEUE_FILE
    assert tiktok_publish.QUEUE_FILE == QUEUE_FILE


# ------------------------------------------------------------------ UI --

_LAYOUT = """<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1">
<title>AI News Station — Approval Desk</title>
<style>
 body{font-family:Segoe UI,Roboto,sans-serif;background:#0b1f3a;color:#e8eef5;margin:0}
 header{background:#8a1111;padding:14px 28px;display:flex;justify-content:space-between;align-items:center}
 header h1{margin:0;font-size:20px;letter-spacing:1px}
 header a{color:#ffd9d9;text-decoration:none;margin-left:18px;font-size:14px}
 main{padding:24px 28px;max-width:960px;margin:0 auto}
 .flash{background:#1b3a6b;border:1px solid #4a7ab5;padding:10px 14px;border-radius:6px;margin-bottom:16px}
 .card{background:#10243f;border:1px solid #2a4770;border-radius:8px;padding:18px;margin-bottom:16px}
 .card h3{margin:0 0 6px;font-size:17px}
 .meta{color:#9ab6d8;font-size:13px;margin-bottom:10px}
 .btn{display:inline-block;padding:9px 18px;border:none;border-radius:6px;cursor:pointer;font-size:14px;font-weight:600;text-decoration:none}
 .btn-approve{background:#1e8a3c;color:#fff}.btn-reject{background:#b3392f;color:#fff}
 .btn-ghost{background:#2a4770;color:#e8eef5}
 video{width:100%;max-height:420px;background:#000;border-radius:6px}
 .cols{display:grid;grid-template-columns:1fr 1fr;gap:16px}
 .script{background:#0a1a30;border-left:3px solid #4a7ab5;padding:10px 12px;border-radius:4px;white-space:pre-wrap}
 pre{white-space:pre-wrap;word-break:break-word}
 .tag{background:#8a1111;color:#fff;padding:2px 8px;border-radius:10px;font-size:12px;margin-right:4px}
 textarea{width:100%;min-height:70px;margin:8px 0;background:#0a1a30;color:#e8eef5;border:1px solid #2a4770;border-radius:6px;padding:8px}
 form.inline{display:inline}
 .empty{color:#9ab6d8;text-align:center;padding:60px 0}
 @media(max-width:720px){.cols{grid-template-columns:1fr}}
</style>
</head>
<body>
<header>
 <h1>AI NEWS STATION — Approval Desk</h1>
 <div><a href="/">Pending</a><a href="/approved">Approved</a></div>
</header>
<main>
 {% with messages = get_flashed_messages() %}{% if messages %}{% for m in messages %}<div class="flash">{{ m }}</div>{% endfor %}{% endif %}{% endwith %}
 {% block body %}{% endblock %}
</main>
</body></html>"""


@app.route("/")
def index():
    items = _list_pending()
    body = """
    <h2>Pending reviews ({{ items|length }})</h2>
    {% if not items %}<div class="empty">Nothing waiting for approval.</div>{% endif %}
    {% for it in items %}
    <div class="card">
      <h3>{{ it.title or 'Untitled' }}</h3>
      <div class="meta">id: {{ it.event_id }} · provider: {{ it.provider }} · created: {{ it.created_at }}</div>
      <div class="meta">{% for h in it.hashtags %}<span class="tag">{{ h }}</span>{% endfor %}</div>
      <a class="btn btn-approve" href="/item/{{ it.event_id }}">Review</a>
    </div>
    {% endfor %}
    """
    return render_template_string(_LAYOUT + body, items=items)


@app.route("/item/<event_id>")
def review(event_id):
    data = _find_pending(event_id)
    if not data:
        abort(404)
    _file_exists_or_raise(data)
    body = """
    <a class="btn btn-ghost" href="/">← back</a>
    <div class="card">
      <h3>{{ data.title }}</h3>
      <div class="meta">id: {{ data.event_id }} · provider: {{ data.provider }} · created: {{ data.created_at }}</div>
      <div class="meta">{% for h in data.hashtags %}<span class="tag">{{ h }}</span>{% endfor %}</div>
      <div class="cols">
        <div>
          <h4>Vertical (9:16)</h4>
          <video controls src="/media/{{ data.event_id }}/{{ data.vertical | basename }}"></video>
        </div>
        <div>
          <h4>Horizontal (16:9)</h4>
          <video controls src="/media/{{ data.event_id }}/{{ data.horizontal | basename }}"></video>
        </div>
      </div>
      <h4>Script — English</h4>
      <div class="script">{{ data.script_en }}</div>
      <h4>Script — Arabic</h4>
      <div class="script">{{ data.script_ar }}</div>
      <h4>Caption / hashtags</h4>
      <div class="meta">{{ data.hashtags | join(' ') }}</div>
      <div style="margin-top:14px">
        <form class="inline" method="post" action="/approve/{{ data.event_id }}">
          <button class="btn btn-approve" type="submit">Approve & publish-ready</button>
        </form>
        <form class="inline" method="post" action="/reject/{{ data.event_id }}">
          <label>Reason: <textarea name="reason" placeholder="Required for rejection" required></textarea></label>
          <button class="btn btn-reject" type="submit">Reject</button>
        </form>
      </div>
    </div>
    """
    return render_template_string(_LAYOUT + body, data=data)

@app.route("/media/<event_id>/<filename>")
def media(event_id, filename):
    data = _find_pending(event_id)
    if not data:
        abort(404)
    for key in ("vertical", "horizontal"):
        p = data.get(key) or ""
        if os.path.basename(p) == filename and os.path.isfile(p):
            return send_from_directory(os.path.dirname(p), filename)
    abort(404)


@app.route("/approved")
def approved_list():
    queue = _load_json(QUEUE_FILE, [])
    body = """
    <h2>Approved & publish-ready ({{ queue|length }})</h2>
    {% if not queue %}<div class="empty">No approved items yet. run_pipeline.py → review → Approve.</div>{% endif %}
    {% for e in queue %}
    <div class="card">
      <h3>{{ e.title }}</h3>
      <div class="meta">id: {{ e.event_id }} · approved: {{ e.approved_at }}</div>
      <div class="meta">{% for h in e.hashtags %}<span class="tag">{{ h }}</span>{% endfor %}</div>
      <div class="meta"><code>{{ e.vertical }}</code><br><code>{{ e.horizontal }}</code></div>
    </div>
    {% endfor %}
    """
    return render_template_string(_LAYOUT + body, queue=queue)


# ------------------------------------------------------------- actions --

@app.route("/approve/<event_id>", methods=["POST"])
def approve(event_id):
    data = _find_pending(event_id)
    if not data:
        abort(404, description="item not pending")
    _file_exists_or_raise(data)

    item_dir = os.path.join(PENDING_DIR, event_id)
    dest_dir = os.path.join(APPROVED_DIR, event_id)
    os.makedirs(dest_dir, exist_ok=True)

    vertical = data.get("vertical")
    horizontal = data.get("horizontal")
    new_vertical = shutil.move(vertical, os.path.join(dest_dir, os.path.basename(vertical)))
    new_horizontal = shutil.move(horizontal, os.path.join(dest_dir, os.path.basename(horizontal)))

    entry = {
        "event_id": event_id,
        "title": data.get("title", ""),
        "description": data.get("title", ""),
        "hashtags": data.get("hashtags", []),
        "script_en": data.get("script_en", ""),
        "script_ar": data.get("script_ar", ""),
        "caveat_used": data.get("caveat_used", False),
        "provider": data.get("provider", "mock"),
        "approved_at": _now(),
        "vertical": new_vertical,
        "horizontal": new_horizontal,
    }
    _append_queue(entry)
    shutil.rmtree(item_dir, ignore_errors=True)
    flash(f"Approved {event_id} — files moved to output/approved/, queued for publishing.")
    return redirect(url_for("index"))


@app.route("/reject/<event_id>", methods=["POST"])
def reject(event_id):
    data = _find_pending(event_id)
    if not data:
        abort(404, description="item not pending")
    reason = (request.form.get("reason") or "").strip()
    if not reason:
        flash("A reason is required to reject an item.")
        return redirect(url_for("review", event_id=event_id))

    item_dir = os.path.join(PENDING_DIR, event_id)
    dest_dir = os.path.join(REJECTED_DIR, event_id)
    os.makedirs(dest_dir, exist_ok=True)
    for key in ("vertical", "horizontal"):
        p = data.get(key)
        if p and os.path.isfile(p):
            shutil.move(p, os.path.join(dest_dir, os.path.basename(p)))

    rejections = _load_json(REJECTIONS_FILE, [])
    rejections.append({
        "event_id": event_id,
        "title": data.get("title", ""),
        "reason": reason,
        "rejected_at": _now(),
    })
    _save_json(REJECTIONS_FILE, rejections)
    shutil.rmtree(item_dir, ignore_errors=True)
    flash(f"Rejected {event_id}. Reason logged to output/rejected/rejections.json")
    return redirect(url_for("index"))


# ---------------------------------------------------------------- main --

def main():
    parser = argparse.ArgumentParser(description="AI News Station approval dashboard")
    parser.add_argument("--host", default="127.0.0.1")
    parser.add_argument("--port", type=int, default=8080)
    args = parser.parse_args()

    _ensure_dirs()
    try:
        _assert_gate()
    except Exception as e:
        print(f"[dashboard] WARNING: publish gate assertion failed ({e}) — "
              "publish modules must be importable and point at the same queue file.")

    print("=" * 60)
    print("AI NEWS STATION — Approval Desk")
    print(f"  http://{args.host}:{args.port}")
    print(f"  pending  : {PENDING_DIR}")
    print(f"  approved : {APPROVED_DIR} (queue.json)")
    print(f"  rejected : {REJECTED_DIR} (rejections.json)")
    print("=" * 60)
    app.run(host=args.host, port=args.port, debug=False)


if __name__ == "__main__":
    main()
