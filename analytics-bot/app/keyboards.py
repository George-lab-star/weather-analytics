from aiogram.types import ReplyKeyboardMarkup, KeyboardButton
from aiogram.types.web_app_info import WebAppInfo

menu = ReplyKeyboardMarkup(
    keyboard=[
        [
            KeyboardButton(
                text="Войти в приложение погоды.",
                web_app=WebAppInfo(
                    url="https://realweatheranalytics.serveo.net/analytics"
                ),
            )
        ],
        [KeyboardButton(text="Создатель")],
    ]
)
