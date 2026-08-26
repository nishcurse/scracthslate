from app.repo.board_management_repo import BoardManagementRepo
from app.repo.board_member_repo import BoardMemberRepo
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

    async def get_board(
        self, 
        board_id : str, 
        user_id : str,
    ): 
        async with SessionLocal() as session: 
            board = await BoardManagementRepo.get_board(
                session=session,
                board_id=board_id
            )

            if board is None: 
                return None
            #let's check access
            if board.owner_id != user_id:
                has_access = await BoardMemberRepo.has_access(
                    session=session, 
                    board_id=board_id, 
                    user_id=user_id,
                )

                if not has_access: 
                    raise PermissionError(
                        "you do not have permission for this board"
                    )

            return board