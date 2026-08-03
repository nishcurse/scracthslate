from uuid import uuid4

from sqlalchemy import select 
from sqlalchemy.ext.asyncio import AsyncSession

from app.db.models import User

class UserRepo: 
    @staticmethod
    async def create_user(
        session : AsyncSession, 
        email : str, 
        name : str, 
        picture : str | None, 
        provider : str, 
        provider_user_id : str,
    ) -> User :
        user = User(
            id=str(uuid4()),
            email=email, 
            name=name, 
            picture=picture, 
            provider=provider, 
            provider_user_id=provider_user_id,
        )
        session.add(user)

        await session.commit()
        await session.refresh(user)

        return user

    @staticmethod
    async def get_by_id(
        session: AsyncSession, 
        user_id : str, 
    ) -> User | None : 
        return await session.get(
            User, 
            user_id
        )

    @staticmethod
    async def get_by_email(
        session : AsyncSession, 
        email : str,
    ) -> User | None: 
        result = await session.execute(
            select(User).where(
                User.email == email
            )
        )
        return result.scalar_one_or_none()
    
    @staticmethod
    async def get_by_provider(
        session : AsyncSession, 
        provider : str,
        provider_user_id : str, 
    ) -> User | None: 
        result = await session.execute(
            select(User).where(
                User.provider == provider, 
                User.provider_user_id == provider_user_id,
            )
        )
        return result.scalar_one_or_none()

    @staticmethod
    async def update_user(
        session : AsyncSession, 
        user : User, 
        name : str, 
        picture : str | None, 
    ) -> User: 
        user.name = name 
        user.picture = picture

        await session.commit() 
        await session.refresh(user) 
        return user

    

    