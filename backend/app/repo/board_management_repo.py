from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select

from uuid import uuid4


from app.db.models import Board

class BoardManagementRepo:

    @staticmethod
    async def create_board(
        session : AsyncSession, 
        owner_id : str,
        title : str = "Untitled Board",
    ) -> Board:
        board = Board(
            id = str(uuid4()), 
            title = title, 
            owner_id=owner_id
        )

        session.add(board)
        await session.commit()
        await session.refresh(board)

        return board

    @staticmethod
    async def get_board(
        session : AsyncSession, 
        board_id : str,
    ) -> Board | None : 
        return await session.get(
            Board, 
            board_id,
        )

    @staticmethod
    async def list_boards(
        session : AsyncSession, 
        owner_id : str,
    )->list[Board] : 
        result = await session.execute(
            select(Board)
            .where(Board.owner_id == owner_id)
            .order_by(Board.updated_at.desc())
        )
        return list(
            result.scalars()
        )

    @staticmethod
    async def rename_board(
        session: AsyncSession, 
        board_id : str,
        title : str,
        owner_id : str,
    ) -> Board | None :
        result = await session.execute(
            select(Board).where(
                Board.id == board_id, 
                Board.owner_id == owner_id
            )
        )
        board = result.scalar_one_or_none()

        if board is None: 
            return None
        board.title = title

        await session.commit()
        await session.refresh(board)
        return board

    @staticmethod
    async def delete_board(
        session : AsyncSession, 
        board_id : str,
        owner_id : str,
    ) -> bool: 
        result = await session.execute(
            select(Board).where(
                Board.id == board_id, 
                Board.owner_id == owner_id,
            )
        )
        board = result.scalar_one_or_none()
        if board is None: 
            return False

        await session.delete(board)
        await session.commit()
        return True
    
