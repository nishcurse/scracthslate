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

from app.auth.utils import get_user_from_token

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
    board_id: str,
):
    token = websocket.query_params.get("token")

    if not token:
        await websocket.close(code=1008)
        return

    user = await get_user_from_token(token)

    if user is None:
        await websocket.close(code=1008)
        return

    joined = await boardservice.join_board(
        board_id=board_id,
        websocket=websocket,
        user=user,
    )

    if not joined:
        await websocket.close(code=1008)
        return

    try:
        while True:
            message = await websocket.receive_json()

            await boardservice.handle_message(
                board_id=board_id,
                websocket=websocket,
                message=message,
            )

    except WebSocketDisconnect:
        user = manager.disconnect(
            board_id,
            websocket,
        )
        if user:
            await manager.broadcast(
                board_id = board_id, 
                message = {
                    "type" : "presence:leave", 
                    "user" : manager.user_helper(user), 
                }, 
            )