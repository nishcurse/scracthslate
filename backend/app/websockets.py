from fastapi import WebSocket

class ConnectionManager: 
    def __init__(self): 
        self.rooms: dict[str, list[WebSocket]] = {}

    async def connect(self, board_id : str , websocket: WebSocket): 
        await websocket.accept()

        if board_id not in self.rooms: 
            self.rooms[board_id] = []

        self.rooms[board_id].append(websocket)

    def disconnect(self, board_id: str, websocket : WebSocket): 
        if board_id not in self.rooms: 
            return 

        if websocket in self.rooms[board_id]:
            self.rooms[board_id].remove(websocket)

        if not self.rooms[board_id]: 
            del self.rooms[board_id] 

    async def broadcast(
            self, 
            board_id : str, 
            message : dict , 
            sender : WebSocket
    ):
        if board_id not in self.rooms: 
            return 

        for connection in self.rooms[board_id]: 
            if connection != sender: 
                await connection.send_json(message)

manager =ConnectionManager()