from sqlalchemy import text
from sqlalchemy.ext.asyncio import (
    AsyncSession,
    async_sessionmaker,
    create_async_engine,
)
from app.core.config import settings


engine = create_async_engine(
    settings.DATABASE_URL,
)


SessionLocal = async_sessionmaker(
    bind=engine,
    class_=AsyncSession,
    expire_on_commit=False,
)

async def get_session():
    async with SessionLocal() as session: 
        yield session


async def test_connection():
    async with engine.connect() as connection:
        result = await connection.execute(
            text("SELECT 1")
        )

        print(
            "DATABASE CONNECTED:",
            result.scalar(),
        )