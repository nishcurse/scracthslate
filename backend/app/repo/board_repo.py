from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select

from app.db.models import Board,BoardObject

class BoardRepo: 
    @staticmethod
    async def create_object(
        session: AsyncSession, 
        board_id : str, 
        object_data : dict,
    ) -> BoardObject:
        board = await session.get(
            Board, 
            board_id,
        )
        if board is None: 
            raise ValueError(
                "board not found"
            )

        board_object = BoardObject(
            id=object_data["id"], 
            board_id=board_id, 
            type=object_data["type"], 
            data=object_data,
        )
        session.add(board_object)
        await session.commit()
        return board_object
    
    @staticmethod
    async def update_object(
        session : AsyncSession, 
        object_id : str, 
        object_data : dict,
    )->None:
        board_object = await session.get(
            BoardObject, 
            object_id,
        )
        if board_object is None: 
            return
        board_object.data = object_data
        await session.commit()

    @staticmethod
    async def delete_object(
        session: AsyncSession, 
        object_id : str,
    )-> None: 
        board_object = await session.get(
            BoardObject, 
            object_id
        )
        if board_object is None: 
            return
        await session.delete(board_object)
        await session.commit()

    @staticmethod
    async def get_board_object(
        session : AsyncSession, 
        board_id: str, 
    ) -> list[BoardObject]:
        result = await session.execute(
            select(BoardObject).where(
                BoardObject.board_id == board_id
            )
        )
        return list(result.scalars())

    @staticmethod
    async def get_board(
        session : AsyncSession, 
        board_id : str,
    ) -> Board | None :
        result = await session.execute(
            select(Board).where(
                Board.id == board_id
            )
        )
        return result.scalar_one_or_none()
        