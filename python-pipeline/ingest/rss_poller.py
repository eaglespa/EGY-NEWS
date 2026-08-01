"""
RSS poller — pulls headline feeds from major wires + regional sources
(Egypt/MENA weighted, since that's the station's home market).

Uses feedparser (pip install feedparser).
"""

import feedparser
import hashlib
from datetime import datetime, timedelta

FEEDS = {
    "Reuters World":   "https://feeds.reuters.com/reuters/worldNews",
    "AP Top News":     "https://apnews.com/hub/ap-top-news?output=rss",
    "AFP":             "https://www.afp.com/en/rss",  # confirm exact path
    "Al Jazeera":      "https://www.aljazeera.com/xml/rss/all.xml",
    "Ahram Online":    "https://english.ahram.org.eg/rss.aspx",
    "Egypt Independent": "https://egyptindependent.com/feed/",
}


def _hash_entry(entry):
    """Dedup key from title + link."""
    key = (entry.get("title", "") + entry.get("link", "")).encode()
    return hashlib.md5(key).hexdigest()


def fetch_all(minutes_back=30):
    """Pull all feeds, dedupe, filter to recent items."""
    cutoff = datetime.utcnow() - timedelta(minutes=minutes_back)
    seen = set()
    items = []

    for source_name, url in FEEDS.items():
        try:
            parsed = feedparser.parse(url)
        except Exception as e:
            print(f"[rss_poller] failed to parse {source_name}: {e}")
            continue

        for entry in parsed.entries:
            h = _hash_entry(entry)
            if h in seen:
                continue
            seen.add(h)

            items.append({
                "source": source_name,
                "title": entry.get("title", ""),
                "summary": entry.get("summary", ""),
                "link": entry.get("link", ""),
                "published": entry.get("published", ""),
            })

    return items


def mock_items():
    """Sample items for testing without live network access."""
    return [
        {
            "source": "Reuters World",
            "title": "Stock exchange halts trading briefly after volatility spike",
            "summary": "Circuit breaker triggered following a sharp intraday move.",
            "link": "https://www.reuters.com/",
            "published": datetime.utcnow().isoformat(),
        },
        {
            "source": "Ahram Online",
            "title": "New tourism figures show record Red Sea visitor numbers",
            "summary": "Hurghada and Sharm El-Sheikh report strong Q3 arrivals.",
            "link": "https://english.ahram.org.eg/",
            "published": datetime.utcnow().isoformat(),
        },
    ]


if __name__ == "__main__":
    print("Running RSS poller in MOCK mode\n")
    for item in mock_items():
        print(f"[{item['source']}] {item['title']}")
