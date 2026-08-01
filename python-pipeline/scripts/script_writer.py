"""
Script writer — takes a raw event (from GDELT or RSS) and turns it into a
30-45 second broadcast anchor script.

Rules baked into the prompt:
  - Original wording only, never quotes wire copy verbatim
  - States the source ("Reuters reports...", "According to...") without
    reproducing more than a short paraphrase
  - Punchy, spoken-word rhythm (short sentences, no jargon)
  - Outputs both English and Arabic versions
  - Flags "DEVELOPING" if facts are still unconfirmed / single-sourced

Requires ANTHROPIC_API_KEY set in config/settings.py or as an env var.
"""

import os
import json

try:
    import anthropic
except ImportError:
    anthropic = None

ANCHOR_PERSONA = """
You are the lead anchor script-writer for an independent breaking-news
station covering global events with a Red Sea / MENA regional lens.
Tone: confident, fast-paced, trustworthy — never sensational, never
copies source wording. Think Reuters' factual precision delivered with
broadcast energy.
"""

SCRIPT_PROMPT_TEMPLATE = """
{persona}

Write a broadcast anchor script for this event. Requirements:
- 30-45 seconds spoken length (roughly 80-110 words)
- Open with a strong hook line, not "Breaking news:"
- State what happened, where, and why it matters — in your own words
- Never quote the source directly for more than a few words
- Mention the source generally (e.g. "according to wire reports") without
  reproducing its phrasing
- If num_sources < 3, add a one-line "still developing, details to follow"
  caveat
- End with a short forward-looking line ("we'll have more as this develops")
- Also provide a natural Arabic translation of the same script (MSA, broadcast register)
- Also provide 3 short hashtag suggestions for TikTok/YouTube Shorts
- Also provide a punchy 60-character video title

Event data:
{event_json}

Respond ONLY as JSON with keys: title, script_en, script_ar, hashtags (array), caveat_used (bool)
"""


def write_script(event, api_key=None):
    """Generate a broadcast script from a raw event dict."""
    api_key = api_key or os.environ.get("ANTHROPIC_API_KEY")

    if not anthropic or not api_key:
        return _mock_script(event)

    client = anthropic.Anthropic(api_key=api_key)
    prompt = SCRIPT_PROMPT_TEMPLATE.format(
        persona=ANCHOR_PERSONA,
        event_json=json.dumps(event, indent=2),
    )

    response = client.messages.create(
        model="claude-sonnet-4-6",
        max_tokens=800,
        messages=[{"role": "user", "content": prompt}],
    )

    text = response.content[0].text
    # Strip markdown fences if present
    text = text.replace("```json", "").replace("```", "").strip()
    try:
        return json.loads(text)
    except json.JSONDecodeError:
        return {"error": "failed to parse model output", "raw": text}


def _mock_script(event):
    """Fallback so the pipeline is demonstrable with zero API keys."""
    title = event.get("title", "Untitled event")
    location = event.get("location", event.get("source", "unknown location"))
    caveat = event.get("num_sources", 99) < 3

    developing_note = " - this is still developing, and we will update you the moment we know more"
    caveat_text = developing_note if caveat else ""
    script_en = (
        f"We are tracking a fast-moving situation out of {location}. "
        f"{title}. Wire services are confirming details as they come in"
        f"{caveat_text}. "
        f"Our team is monitoring official channels for the latest. "
        f"Stay with us - we will have more shortly."
    )

    return {
        "title": title[:60],
        "script_en": script_en,
        "script_ar": "[Arabic translation requires live API key — connect ANTHROPIC_API_KEY]",
        "hashtags": ["#BreakingNews", "#News", "#Developing"],
        "caveat_used": caveat,
        "mode": "MOCK — connect ANTHROPIC_API_KEY for real generation",
    }


if __name__ == "__main__":
    from ingest.gdelt_poller import mock_events

    for event in mock_events():
        result = write_script(event)
        print("=" * 60)
        print(result.get("title"))
        print("-" * 60)
        print(result.get("script_en"))
        print()
