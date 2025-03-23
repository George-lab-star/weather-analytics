from aiohttp import ClientSession


class HTTPClient:
    def __init__(
        self, base_url: str, api_key_name: str | None = None, api_key: str | None = None
    ):
        self.api_key = api_key
        self._session = ClientSession(
            base_url=base_url,
            headers={
                api_key_name: api_key,
            }
            if api_key_name and api_key
            else None,
        )


class WeatherHTTPClient(HTTPClient):
    async def reverse_geocoding(self, lat: str, lon: str):
        async with self._session.get(
            f"/geo/1.0/reverse?lat={lat}&lon={lon}&limit=5&appid={self.api_key}"
        ) as res:
            result = await res.json()
            return {"object": result[0]["name"], "country": result[0]["country"]}

    async def get_weather(self, city: str, country: str):
        async with self._session.get(
            f"/data/2.5/weather?q={city + ',' + country}&APPID={self.api_key}"
        ) as res:
            result = await res.json()
            return result
