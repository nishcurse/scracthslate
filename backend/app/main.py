from fastapi import FastAPI , WebSocket , WebSocketDisconnect

from app.websockets import manager

app = FastAPI()

@app.get("/")
def root():
    return {"message" : "backend is running"}

@app.websocket("/ws/boards/{board_id}")
async def board_websocket(
    websocket: WebSocket, 
    board_id : str, 
):
    await manager.connect(board_id , websocket)

    try: 
        while True: 
            message = await websocket.receive_json()
            await manager.broadcast(
                board_id=board_id, 
                message=message, 
                sender = websocket
            )
    except WebSocketDisconnect: 
        manager.disconnect(board_id, websocket)