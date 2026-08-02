from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select

from uuid import uuid4


from app.db.models import Board

class BoardManagementRepo:

    @staticmethod
    async def create_board(
        session : AsyncSession, 
        title : str = "Untitled Board",
    ) -> Board:
        board = Board(
            id = str(uuid4()), 
            title = title, 
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
    )->list[Board] : 
        result = await session.execute(
            select(Board).order_by(Board.updated_at.desc())
        )
        return list(
            result.scalars()
        )

    @staticmethod
    async def rename_board(
        session: AsyncSession, 
        board_id : str,
        title : str,
    ) -> Board | None :
        board = await session.get(
            Board,
            board_id
        )
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
    ) -> bool: 
        board = await session.get(
            Board, 
            board_id,
        )
        if Board is None: 
            return False

        await session.delete(board)
        await session.commit()
        return True
    
