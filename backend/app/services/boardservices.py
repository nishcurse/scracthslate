from fastapi import WebSocket

from app.repo.board_repo import BoardRepo
from app.websockets import manager
from app.db.database import SessionLocal


class BoardService:

    async def join_board(
        self,
        board_id: str,
        websocket: WebSocket,
    ):
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