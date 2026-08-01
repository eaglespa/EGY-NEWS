"""
GDELT Cloud poller — pulls recent global events and scores them for
"breaking-ness" based on volume spike + tone (how unusual/negative/urgent).

Docs: https://docs.gdeltcloud.com/
Free tier available. Sign up at gdeltcloud.com for an API key (some
endpoints work unauthenticated at low volume for testing).
"""

import requests
import time
from datetime import datetime, timedelta

GDELT_EVENTS_URL = "https://api.gdeltcloud.com/v2/events"  # confirm exact
# endpoint path in GDELT Cloud docs when you get your key — placeholder
# structure shown here, adjust once you have API access.


def fetch_recent_events(minutes_back=15, api_key=None):
    """Pull events from the last N minutes."""
    since = (datetime.utcnow() - timedelta(minutes=minutes_back)).isoformat()
    headers = {"Authorization": f"Bearer {api_key}"} if api_key else {}
    params = {"since": since, "limit": 100}

    try:
        resp = requests.get(GDELT_EVENTS_URL, headers=headers, params=params, timeout=10)
        resp.raise_for_status()
        return resp.json().get("events", [])
    except requests.RequestException as e:
        print(f"[gdelt_poller] fetch failed: {e}")
        return []


def score_breaking(event):
    """
    Very simple breaking-news scorer. Real version should compare against
    rolling baseline mention-volume per entity (see GDELT's own
    Timeseries Insights approach), but this gets you a v1 heuristic:
      - number of source articles referencing the same story cluster
      - "tone" extremity (very negative/positive = often urgent)
      - presence of conflict/disaster/emergency category codes
    """
    score = 0
    num_sources = event.get("num_sources", 1)
    tone = abs(event.get("avg_tone", 0))
    category = event.get("category", "")

    score += min(num_sources * 2, 40)          # more sources = more confirmed
    score += min(tone * 3, 30)                  # extreme tone = urgency
    if category in ("CONFLICT", "DISASTER", "EMERGENCY", "MARKET_SHOCK"):
        score += 30

    return min(score, 100)


def get_breaking_events(threshold=60, minutes_back=15, api_key=None):
    """Return events scored above threshold, sorted by score descending."""
    events = fetch_recent_events(minutes_back=minutes_back, api_key=api_key)
    scored = [(score_breaking(e), e) for e in events]
    scored.sort(key=lambda x: x[0], reverse=True)
    return [e for s, e in scored if s >= threshold]


# --- Mock data for testing without an API key -------------------------

def mock_events():
    """Realistic sample events so you can test the rest of the pipeline
    (script writer → voice → video) before GDELT credentials are set up."""
    return [
        {
            "id": "mock-001",
            "title": "Magnitude 6.1 earthquake reported off the coast of Crete",
            "location": "Crete, Greece",
            "category": "DISASTER",
            "num_sources": 18,
            "avg_tone": -6.2,
            "timestamp": datetime.utcnow().isoformat(),
            "source_url": "https://www.gdeltproject.org/",
        },
        {
            "id": "mock-002",
            "title": "Central bank signals surprise rate decision ahead of schedule",
            "location": "Global markets",
            "category": "MARKET_SHOCK",
            "num_sources": 34,
            "avg_tone": -3.1,
            "timestamp": datetime.utcnow().isoformat(),
            "source_url": "https://www.gdeltproject.org/",
        },
        {
            "id": "mock-003",
            "title": "Red Sea shipping lane sees temporary vessel traffic suspension",
            "location": "Red Sea",
            "category": "CONFLICT",
            "num_sources": 22,
            "avg_tone": -4.8,
            "timestamp": datetime.utcnow().isoformat(),
            "source_url": "https://www.gdeltproject.org/",
        },
    ]


if __name__ == "__main__":
    print("Running in MOCK mode (no API key configured)\n")
    events = mock_events()
    for e in events:
        s = score_breaking(e)
        flag = "🔴 BREAKING" if s >= 60 else "  routine"
        print(f"[{s:3d}] {flag}  {e['title']}")
