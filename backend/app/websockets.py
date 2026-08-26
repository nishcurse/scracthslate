from fastapi import WebSocket
from app.db.models import User


class ConnectionManager: 
    def __init__(self): 
        self.rooms: dict[str, list[dict]] = {}
        self.boards: dict[str, dict[str, dict]] = {} 
    async def connect(self, board_id : str , websocket: WebSocket, user: User): 
        await websocket.accept()

        if board_id not in self.rooms: 
            self.rooms[board_id] = []

        self.rooms[board_id].append({
            "websocket": websocket, 
            "user" : user,
            "cursor" : None,
        })

    def disconnect(self, board_id: str, websocket : WebSocket) -> User | None: 
        if board_id not in self.rooms: 
            return None
        removed_user = None
        remaining = []
        for connection in self.rooms[board_id]:
            if connection["websocket"] == websocket:  
                removed_user = connection["user"]
            else: 
                remaining.append(connection)

        self.rooms[board_id] = remaining

        if not self.rooms[board_id]: 
            del self.rooms[board_id]
        return removed_user

    async def broadcast(
            self, 
            board_id : str, 
            message : dict , 
            sender : WebSocket | None = None,
    ):
        if board_id not in self.rooms: 
            return 

        for connection in self.rooms[board_id]: 
            websocket = connection["websocket"]
            if websocket != sender: 
                await websocket.send_json(message)

    def get_live_users(
        self, 
        board_id : str,
    ) -> list[User]:
        if board_id not in self.rooms: 
            return []
        return [
            connection["user"]
            for connection in self.rooms[board_id]
        ]

    #Board syncronization: 
    def get_board(self, board_id: str): 
        return self.boards.get(board_id, {})

    def get_object(self, board_id: str , object_id : str):
        board = self.boards.get(board_id)
        if board is None: 
            return None
        return board.get(object_id)

    def create_object(self, board_id: str, obj: dict): 
        if board_id not in self.boards: 
            self.boards[board_id] = {}
        self.boards[board_id][obj["id"]] = obj

    def update_object(self, board_id : str ,object_id: str ,changes : dict): 
        board = self.boards.get(board_id)
        if not board: 
            return
        if object_id not in board: 
            return 
        obj = board.get(object_id)
        if not obj: 
            return 
        obj.update(changes)

    def delete_object(self , board_id : str , object_id: str): 
        board = self.boards.get(board_id)
        if not board: 
            return 
        board.pop(object_id, None)


    # freeHand functions 
    
    def append_points(
        self, 
        board_id : str, 
        object_id : str,
        points : list, 
    ):
        board = self.boards.get(board_id)
        if not board: 
            return
        obj = board.get(object_id)
        if not obj: 
            return
        if obj.get("type") != "freehand":
            return
        obj["points"].extend(points)

    def has_board(self, board_id : str) -> bool:
        return board_id in self.boards  

    def sync_board(self, board_id: str, objects: list[dict]) :
        self.boards[board_id] = {
            obj["id"] : obj
            for obj in objects
        }

    #helper funtions 
    def user_helper(self, user: User) -> dict: 
        return {
            "id" : user.id, 
            "name" : user.name, 
            "email" : user.email,
            "picture" : user.picture 
        }
    def get_user(self, board_id : str, websocket : WebSocket) -> User|None:
        if board_id not in self.rooms: 
            return None 
        for connection in self.rooms[board_id]: 
            if connection["websocket"] == websocket:
                return connection["user"]

        return None

    #presence:cursor events
    def update_cursor(
        self, 
        board_id : str, 
        websocket: WebSocket, 
        x: float , 
        y: float, 
    ):
        if board_id not in self.rooms: 
            return 

        for connection in self.rooms[board_id]:
            if connection["websocket"] == websocket: 
                connection["cursor"] = {
                    "x":x, 
                    "y":y,
                }
                return


manager =ConnectionManager()
