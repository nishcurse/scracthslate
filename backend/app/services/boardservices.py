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
    user: User,
    ) -> bool:

        async with SessionLocal() as session:
            board = await BoardRepo.get_board(
                session=session,
                board_id=board_id,
            )

            if board is None:
                return False

            # Owner automatically has access.
            if board.owner_id != user.id:
                has_access = await BoardMemberRepo.has_access(
                    session=session,
                    board_id=board_id,
                    user_id=user.id,
                )

                if not has_access:
                    return False

        # Load the board from PostgreSQL only when
        # this board isn't currently active in memory.
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
        existing_users = manager.get_live_users(board_id=board_id)

        await manager.connect(
            board_id,
            websocket,
            user=user,
        )

        await websocket.send_json({
            "type": "board:snapshot",
            "objects": manager.get_board(board_id),
        })
        await websocket.send_json({
            "type" : "presence:snapshot", 
            "users" : [
                manager.user_helper(existing_user)
                for existing_user in existing_users
            ] + [
                manager.user_helper(user)
            ]
        })

        await manager.broadcast(
            board_id=board_id, 
            message = {
                "type" : "presence:join", 
                "user" : manager.user_helper(user), 
            }, 
            sender = websocket,
        )

        return True
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
        elif eventType == "object:commit":
            object_id = message["id"]
            updated = manager.get_object(
                board_id=board_id, 
                object_id=object_id,
            )
            if updated is not None: 
                async with SessionLocal() as session: 
                    await BoardRepo.update_object(
                        session=session, 
                        object_id=object_id, 
                        object_data=updated
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
        elif eventType == "presence:cursor":
            manager.update_cursor(
                board_id, 
                websocket, 
                x=message["x"],
                y=message["y"],
            )   
            user = manager.get_user(
                board_id, 
                websocket,
            )
            if user is None:
                return 
            await manager.broadcast(
                board_id=board_id, 
                message = {
                    "type" : "presence:cursor",
                    "user" : manager.user_helper(user), 
                    "x" : message["x"], 
                    "y" : message["y"],
                }, 
                sender = websocket
            )
            return 
            
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
    async def get_shared_boards(
        self,
        user_id: str,
    ):
        async with SessionLocal() as session:
            memberships = await BoardMemberRepo.get_shared_boards(
                session=session,
                user_id=user_id,
            )

            return [
                {
                    "id": member.board.id,
                    "title": member.board.title,
                    "role": member.role,
                    "owner": {
                        "id": member.board.owner.id,
                        "name": member.board.owner.name,
                        "picture": member.board.owner.picture,
                    },
                }
                for member in memberships
            ]

