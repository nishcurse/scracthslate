from sqlalchemy import select
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.orm import selectinload

from app.db.models import BoardMember, Board


class BoardMemberRepo:

    @staticmethod
    async def get_membership(
        session: AsyncSession,
        board_id: str,
        user_id: str,
    ) -> BoardMember | None:
        result = await session.execute(
            select(BoardMember).where(
                BoardMember.board_id == board_id,
                BoardMember.user_id == user_id,
            )
        )

        return result.scalar_one_or_none()

    @staticmethod
    async def has_access(
        session: AsyncSession,
        board_id: str,
        user_id: str,
    ) -> bool:
        membership = await BoardMemberRepo.get_membership(
            session=session,
            board_id=board_id,
            user_id=user_id,
        )

        return membership is not None

    @staticmethod
    async def add_member(
        session : AsyncSession, 
        board_id: str, 
        user_id : str, 
        role : str = "editor",
    ) -> BoardMember:
        member = BoardMember(
            board_id = board_id, 
            user_id = user_id , 
            role = role, 
        ) 
        session.add(member)
        await session.commit() 
        await session.refresh(member) 

        return member
    
    @staticmethod
    async def get_members(
        session: AsyncSession,
        board_id: str,
    ) -> list[BoardMember]:

        result = await session.execute(
            select(BoardMember)
            .options(
                selectinload(BoardMember.user)
            )
            .where(
                BoardMember.board_id == board_id
            )
            .order_by(
                BoardMember.created_at.asc()
            )
        )

        return list(result.scalars().all())

    @staticmethod
    async def get_shared_boards(
        session: AsyncSession, 
        user_id : str,
    ) -> list[BoardMember]: 
        result = await session.execute(
            select(BoardMember).options(
                selectinload(BoardMember.board).selectinload(Board.owner)
            ).where(
                BoardMember.user_id == user_id
            ).order_by(
                BoardMember.created_at.desc()
            )
        )
        return list(result.scalars().all())