from app.repo.board_management_repo import BoardManagementRepo
from app.db.database import SessionLocal

class boardManagementServices: 
    async def create_board(
        self, 
        title : str,
        owner_id : str,
    ): 
        async with SessionLocal() as session: 
            return await BoardManagementRepo.create_board(
                session=session, 
                title = title,
                owner_id=owner_id,
            )

    async def list_board(
        self, 
        owner_id : str,
    ): 
        async with SessionLocal() as session: 
            return await BoardManagementRepo.list_boards(
                session=session,
                owner_id=owner_id, 
            )
        
    async def rename_board(
        self, 
        board_id : str, 
        title : str,
        owner_id : str,
    ): 
        async with SessionLocal() as session: 
            return await BoardManagementRepo.rename_board(
                session=session,
                board_id=board_id, 
                title=title, 
                owner_id=owner_id
            )
        
    async def delete_board(
        self, 
        board_id : str,
        owner_id : str,
    ): 
        async with SessionLocal() as session: 
            return await BoardManagementRepo.delete_board(
                session=session, 
                board_id=board_id,
                owner_id=owner_id,
            )