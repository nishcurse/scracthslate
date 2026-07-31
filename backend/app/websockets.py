from fastapi import WebSocket

class ConnectionManager: 
    def __init__(self): 
        self.rooms: dict[str, list[WebSocket]] = {}
        self.boards: dict[str, dict[str, dict]] = {} #current state of board storage we can say for now 
    #connection management: 
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

    #Board syncronization: 
    def get_board(self, board_id: str): 
        return self.boards.get(board_id, {})

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



manager =ConnectionManager()