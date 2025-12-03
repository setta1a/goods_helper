from __future__ import annotations

import asyncio
import logging

from aiogram import Bot, Dispatcher, F
from aiogram.filters import CommandStart, Command
from aiogram.types import InlineKeyboardButton, InlineKeyboardMarkup, Message, WebAppInfo

from config import get_settings

logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

settings = get_settings()
bot = Bot(token=settings.bot_token, parse_mode='HTML')
dp = Dispatcher()


def build_webapp_keyboard() -> InlineKeyboardMarkup:
    return InlineKeyboardMarkup(
        inline_keyboard=[
            [
                InlineKeyboardButton(
                    text='Open Goods Helper',
                    web_app=WebAppInfo(url=settings.webapp_url),
                )
            ]
        ]
    )


@dp.message(CommandStart())
async def handle_start(message: Message) -> None:
    await message.answer(
        (
            'Hi! I am your Goods Helper assistant.\n'
            'Tap the button below to open the mini app and manage your kitchen.'
        ),
        reply_markup=build_webapp_keyboard(),
    )


@dp.message(Command('menu'))
async def handle_menu(message: Message) -> None:
    await message.answer(
        'Goods Helper is always one tap away. Need anything else?',
        reply_markup=build_webapp_keyboard(),
    )


@dp.message(F.web_app_data)
async def handle_webapp_payload(message: Message) -> None:
    data = message.web_app_data.data
    await message.answer(
        f'Received data from the mini app:\n<code>{data}</code>'
    )


async def main() -> None:
    logger.info('Starting Goods Helper bot with web app URL: %s', settings.webapp_url)
    await dp.start_polling(bot, poll_interval=1.0)


if __name__ == '__main__':
    asyncio.run(main())
