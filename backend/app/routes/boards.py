from fastapi import APIRouter,HTTPException
from app.services.board_management_services import boardManagementServices 

# types importssss
from app.schemas.boards import CreateBoardRequest,BoardResponse,RenameBoardRequest

service = boardManagementServices()

router = APIRouter(
    prefix="/boards", 
    tags=["Boards"],
)

@router.post("/" , response_model=BoardResponse)
async def create_board(
    req : CreateBoardRequest,
): 
    board = await service.create_board(
        title=req.title,
    )
    return board


@router.get("/" , response_model=list[BoardResponse])
async def list_boards():
    return await service.list_board()

@router.patch("/{board_id}", response_model=BoardResponse)
async def rename(
    board_id : str, 
    req: RenameBoardRequest
): 
    board =  await service.rename_board(board_id, title=req.title)
    if board is None:
        raise HTTPException(
            status_code = 404, 
            detail="board not found",
        )
    return board

@router.delete("/{board_id}" ,description="delete board")
async def delete_board(board_id : str):
    deleted = await service.delete_board(board_id)

    if not deleted: 
        raise HTTPException(
            status_code=404, 
            detail="board not found",
        )

    return {
        "message": "board delelted",
    }





