import os
from dotenv import load_dotenv
import asyncio
import logging

from aiogram import Bot, Dispatcher

from app.handlers import router

load_dotenv()

TOKEN = str(os.getenv("BOT_TOKEN"))


async def main():
    bot = Bot(token=TOKEN)
    dp = Dispatcher()
    dp.include_router(router)
    await dp.start_polling(bot)


if __name__ == "__main__":
    logging.basicConfig(level=logging.INFO)
    try:
        asyncio.run(main())
    except:
        print("Exit")
