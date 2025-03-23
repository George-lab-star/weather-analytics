from sqlalchemy.ext.asyncio import create_async_engine, AsyncSession, async_sessionmaker
from ..config import db_settings

DATABASE_URL = f"postgresql+asyncpg://{db_settings.DB_USER}:{db_settings.DB_PASS}@{db_settings.DB_HOST}/{db_settings.DB_NAME}"

engine = create_async_engine(DATABASE_URL)
async_session = async_sessionmaker(autocommit=False, bind=engine, class_=AsyncSession)


async def get_db():
    async with async_session() as session:
        yield session
