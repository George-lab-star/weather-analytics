from pydantic import Extra
from pydantic_settings import BaseSettings


class Settings(BaseSettings):
    WEATHER_TOKEN: str

    class Config:
        env_file = ".env"
        extra = Extra.ignore


class DbSettings(BaseSettings):
    DB_NAME: str
    DB_HOST: str
    DB_USER: str
    DB_PASS: str

    class Config:
        env_file = ".env"
        extra = Extra.ignore


settings = Settings()

db_settings = DbSettings()
