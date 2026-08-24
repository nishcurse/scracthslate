from fastapi import WebSocket

from app.repo.board_repo import BoardRepo
from app.repo.user_repo import UserRepo
from app.repo.board_member_repo import BoardMemberRepo
from app.websockets import manager
from app.db.database import SessionLocal
from app.db.models import User



class BoardService:

    async def join_board(
        self,
        board_id: str,
        websocket: WebSocket,
        user : User
    ):
        async with SessionLocal() as session: 
            board = await BoardRepo.get_board(
                session=session, 
                board_id = board_id,
            )
            if board is None: 
                await websocket.close(code = 1008)
                return False
            if board.owner_id != user.id: 
                has_access = await BoardMemberRepo.has_access(
                    session=session, 
                    board_id=board_id, 
                    user_id=user.id
                )
                if not has_access: 
                    await websocket.close(code = 1008)
                    return False
            

        
        if not manager.has_board(board_id):
            async with SessionLocal() as session:
                db_objects = await BoardRepo.get_board_object(
                    session=session, 
                    board_id=board_id,
                )
            
            manager.sync_board(
                board_id=board_id, 
                objects=[obj.data for obj in db_objects], 
            )


        await manager.connect(board_id , websocket)
            # send new user his snapshot so they can sync 
        await websocket.send_json({
            "type": "board:snapshot", 
            "objects" : manager.get_board(board_id),
        })
        

    async def handle_message(
        self,
        board_id: str,
        websocket: WebSocket,
        message: dict,
    ):
        eventType = message.get("type")
        if eventType == "object:create": 
            object = message["object"]
            manager.create_object(board_id, object)
            async with SessionLocal() as session:
                await BoardRepo.create_object(
                    session=session, 
                    board_id=board_id, 
                    object_data=object,
                )
        elif eventType == "object:update":
            manager.update_object(board_id, message["id"] , message["changes"])
            object_id = message["id"]
            updated = manager.get_object(board_id, object_id)
            if updated is not None: 
                async with SessionLocal() as session: 
                    await BoardRepo.update_object(
                        session=session, 
                        object_id=object_id, 
                        object_data = updated,
                    )
        elif eventType == "object:delete": 
            manager.delete_object(board_id, message["id"])
            async with SessionLocal() as session:
                await BoardRepo.delete_object(
                    session=session, 
                    object_id=message["id"]
                )

        elif eventType == "stroke:append": 
            manager.append_points(
                board_id, 
                message["id"], 
                message["points"],
            )
            
        await manager.broadcast(
            board_id=board_id, 
            message=message, 
            sender = websocket
        )

    async def add_member(
        self, 
        board_id : str, 
        owner_id : str, 
        email : str, 
        role : str = "editor",
    ):
        async with SessionLocal() as session: 

            board = await BoardRepo.get_board(
            session=session,
            board_id=board_id,
        )

        if board is None:
            return None

        if board.owner_id != owner_id:
            raise PermissionError(
                "Only the board owner can add collaborators"
            )

        user = await UserRepo.get_by_email(
            session=session,
            email=email,
        )

        if user is None:
            raise ValueError("User not found")

        if user.id == owner_id:
            raise ValueError(
                "Owner already has access to this board"
            )

        existing = await BoardMemberRepo.get_membership(
            session=session,
            board_id=board_id,
            user_id=user.id,
        )

        if existing:
            raise ValueError(
                "This user is already an member of this board!!"
            )

        return await BoardMemberRepo.add_member(
            session=session,
            board_id=board_id,
            user_id=user.id,
            role=role,
        )

    async def get_members(
        self,
        board_id: str,
        user_id: str,
    ):
        async with SessionLocal() as session:

            board = await BoardRepo.get_board(
                session=session,
                board_id=board_id,
            )

            if board is None:
                return None

            if board.owner_id != user_id:
                has_access = await BoardMemberRepo.has_access(
                    session=session,
                    board_id=board_id,
                    user_id=user_id,
                )

                if not has_access:
                    raise PermissionError(
                        "You do not have access to this board"
                    )

            members = await BoardMemberRepo.get_members(
                session=session,
                board_id=board_id,
            )

            return [
                {
                    "board_id": member.board_id,
                    "user_id": member.user_id,
                    "role": member.role,
                    "name": member.user.name,
                    "email": member.user.email,
                    "picture": member.user.picture,
                }
                for member in members
            ]

