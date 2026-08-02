from sqlalchemy import text
from sqlalchemy.ext.asyncio import (
    AsyncSession,
    async_sessionmaker,
    create_async_engine,
)


DATABASE_URL="postgresql+asyncpg://scratchslate:scratchslate@localhost:5432/scratchslate"


engine = create_async_engine(
    DATABASE_URL,
    echo=True,
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