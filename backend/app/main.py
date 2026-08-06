from fastapi import FastAPI , WebSocket , WebSocketDisconnect

from contextlib import asynccontextmanager

from app.websockets import manager

from app.db.database import test_connection

from app.db.database import SessionLocal
from app.repo.board_repo import BoardRepo
from app.services.boardservices import BoardService

from app.routes.boards import router as board_router
from app.routes.auth import router as auth_router
from fastapi.middleware.cors import CORSMiddleware

boardservice = BoardService()



@asynccontextmanager
async def lifespan(app: FastAPI):
    print("starting db connection")
    await test_connection()
    print("docker connection done")

    yield

app = FastAPI(lifespan=lifespan)


app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:3000",
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
app.include_router(auth_router)
app.include_router(board_router)

@app.get("/")
def root():
    return {"message" : "Boom!"}

@app.websocket("/ws/boards/{board_id}")
async def board_websocket(
    websocket: WebSocket, 
    board_id : str, 
):
    await boardservice.join_board(
        board_id=board_id, 
        websocket = websocket,
    )
    
    try: 
        while True: 
            message = await websocket.receive_json()
            await boardservice.handle_message(
                board_id = board_id, 
                websocket=websocket, 
                message=message,
            )
    except WebSocketDisconnect: 
        manager.disconnect(board_id, websocket)