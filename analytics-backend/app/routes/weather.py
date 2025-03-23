from fastapi import APIRouter
from ..http_client import WeatherHTTPClient
from ..config import settings

weather_router = APIRouter()

weather_client = WeatherHTTPClient(
    base_url="https://api.openweathermap.org", api_key=settings.WEATHER_TOKEN
)


@weather_router.get("/weather/get")
async def get_weather(lat: str, lon: str):
    reverse_geocoding = await weather_client.reverse_geocoding(lat, lon)
    return await weather_client.get_weather(
        reverse_geocoding["object"], reverse_geocoding["country"]
    )
