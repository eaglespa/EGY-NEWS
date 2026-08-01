"""
Central config — fill these in once you have accounts set up.
Never commit this file with real keys to a public repo.
Better: use environment variables / a .env file instead of hardcoding.
"""

import os

# --- Script generation ---
ANTHROPIC_API_KEY = os.environ.get("ANTHROPIC_API_KEY", "")

# --- Ingest ---
GDELT_API_KEY = os.environ.get("GDELT_API_KEY", "")

# --- Voice ---
ELEVENLABS_API_KEY = os.environ.get("ELEVENLABS_API_KEY", "")
ELEVENLABS_VOICE_ID = os.environ.get("ELEVENLABS_VOICE_ID", "")  # your cloned anchor voice

# --- Video / Avatar ---
HEYGEN_API_KEY = os.environ.get("HEYGEN_API_KEY", "")
HEYGEN_AVATAR_ID = os.environ.get("HEYGEN_AVATAR_ID", "")
# HeyGen voice used for the TTS-driven avatar (script + voice_id). Our local
# ElevenLabs audio cannot be lip-synced without a publicly reachable URL.
HEYGEN_VOICE_ID = os.environ.get("HEYGEN_VOICE_ID", "")

# --- Publishing ---
YOUTUBE_CLIENT_SECRETS_FILE = os.environ.get("YOUTUBE_CLIENT_SECRETS_FILE", "config/youtube_oauth.json")
TIKTOK_CLIENT_KEY = os.environ.get("TIKTOK_CLIENT_KEY", "")
TIKTOK_CLIENT_SECRET = os.environ.get("TIKTOK_CLIENT_SECRET", "")

# --- Alerts / approval gate ---
SLACK_WEBHOOK_URL = os.environ.get("SLACK_WEBHOOK_URL", "")
WHATSAPP_APPROVAL_NUMBER = os.environ.get("WHATSAPP_APPROVAL_NUMBER", "")

# --- Thresholds ---
BREAKING_SCORE_THRESHOLD = 60   # 0-100, how urgent an event must score to trigger production
POLL_INTERVAL_SECONDS = 60      # how often ingest checks for new events
