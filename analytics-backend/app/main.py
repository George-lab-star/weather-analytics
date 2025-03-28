from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from .routes.weather import weather_router
from .routes.auth import auth_router

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(auth_router)
app.include_router(weather_router)
