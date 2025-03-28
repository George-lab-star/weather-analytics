from aiogram import Router, F
from aiogram.types import Message
from aiogram.filters import CommandStart

from .keyboards import menu

router = Router()


@router.message(CommandStart())
async def on_start(message: Message):
    await message.answer(
        "🌤️ Привет! Я твой личный синоптик. Я могу предсказывать погоду! Выбери пункт меню или перейди в наше ТГ мини-приложение! 😊",
        reply_markup=menu,
    )


@router.message(F.text == "Создатель")
async def get_creator(message: Message):
    await message.answer("https://github.com/George-lab-star")
