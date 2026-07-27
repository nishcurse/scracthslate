from fastapi import FastAPI , WebSocket , WebSocketDisconnect

from app.websockets import manager

app = FastAPI()

@app.get("/")
def root():
    return {"message" : "Boom!"}

@app.websocket("/ws/boards/{board_id}")
async def board_websocket(
    websocket: WebSocket, 
    board_id : str, 
):
    await manager.connect(board_id , websocket)
    # send new user his snapshot so they can sync 
    await websocket.send_json({
        "type": "board:snapshot", 
        "objects" : manager.get_board(board_id),
    })

    
    try: 
        while True: 
            message = await websocket.receive_json()
            eventType = message.get("type")
            if eventType == "object:create": 
                manager.create_object(board_id, message["object"])
                
            elif eventType == "object:update":
                manager.update_object(board_id, message["id"] , message["changes"])

            elif eventType == "object:delete": 
                manager.delete_object(board_id, message["id"])

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
    except WebSocketDisconnect: 
        manager.disconnect(board_id, websocket)