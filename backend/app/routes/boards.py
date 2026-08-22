from fastapi import APIRouter,HTTPException , Depends
from app.services.board_management_services import boardManagementServices 

# types importssss
from app.schemas.boards import CreateBoardRequest,BoardResponse,RenameBoardRequest
from app.db.models import User

from app.auth.dependencies import get_current_user

service = boardManagementServices()

router = APIRouter(
    prefix="/boards", 
    tags=["Boards"],
)

@router.post("/" , response_model=BoardResponse)
async def create_board(
    req : CreateBoardRequest,
    current_user : User = Depends(get_current_user)
): 
    board = await service.create_board(
        title=req.title,
        owner_id=current_user.id,
    )
    return board


@router.get("/" , response_model=list[BoardResponse])
async def list_boards(
    current_user : User = Depends(get_current_user)
):
    return await service.list_board(owner_id=current_user.id)

@router.patch("/{board_id}", response_model=BoardResponse)
async def rename(
    board_id : str, 
    req: RenameBoardRequest,
    current_user : User = Depends(get_current_user)
): 
    board =  await service.rename_board(board_id,title=req.title, owner_id=current_user.id)
    if board is None:
        raise HTTPException(
            status_code = 404, 
            detail="board not found",
        )
    return board

@router.delete("/{board_id}" ,description="delete board")
async def delete_board(board_id : str , current_user : User = Depends(get_current_user)):
    deleted = await service.delete_board(board_id, owner_id = current_user.id)

    if not deleted: 
        raise HTTPException(
            status_code=404, 
            detail="board not found",
        )

    return {
        "message": "board delelted",
    }





