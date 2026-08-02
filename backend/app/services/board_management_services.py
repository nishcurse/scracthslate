from app.repo.board_management_repo import BoardManagementRepo
from app.db.database import SessionLocal

class boardManagementServices: 
    async def create_board(
        self, 
        title : str,
    ): 
        async with SessionLocal() as session: 
            return await BoardManagementRepo.create_board(
                session=session, 
                title = title,
            )

    async def list_board(
        self, 
    ): 
        async with SessionLocal() as session: 
            return await BoardManagementRepo.list_boards(
                session=session, 
            )
        
    async def rename_board(
        self, 
        board_id : str, 
        title : str,
    ): 
        async with SessionLocal() as session: 
            return await BoardManagementRepo.rename_board(
                session=session,
                board_id=board_id, 
                title=title, 
            )
        
    async def delete_board(
        self, 
        board_id : str,
    ): 
        async with SessionLocal() as session: 
            return await BoardManagementRepo.delete_board(
                session=session, 
                board_id=board_id,
            )