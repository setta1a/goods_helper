from __future__ import annotations

from dataclasses import dataclass
import os
from dotenv import load_dotenv

load_dotenv()


@dataclass(frozen=True)
class Settings:
    bot_token: str
    webapp_url: str


def get_settings() -> Settings:
    bot_token = os.getenv('BOT_TOKEN')
    if not bot_token:
        raise RuntimeError('BOT_TOKEN is missing. Provide it via environment or .env file.')

    webapp_url = os.getenv('WEBAPP_URL', 'http://localhost:4173')
    return Settings(bot_token=bot_token, webapp_url=webapp_url)
