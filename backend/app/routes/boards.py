from fastapi import APIRouter,HTTPException , Depends
from app.services.board_management_services import boardManagementServices 
from app.services.boardservices import BoardService

# types importssss
from app.schemas.boards import CreateBoardRequest,BoardResponse,RenameBoardRequest


from app.schemas.boards import AddBoardMemberRequest, BoardMemberResponse, BoardMemberDetailResponse


from app.schemas.boards import SharedBoardOwnerResponse, SharedBoardResponse
from app.db.models import User

from app.auth.dependencies import get_current_user

service = boardManagementServices()
boardService = BoardService()

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

@router.get(
    "/shared",
    response_model=list[SharedBoardResponse],
)
async def get_shared_boards(
    current_user: User = Depends(get_current_user),
):
    return await boardService.get_shared_boards(
        user_id=current_user.id,
    )

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

@router.post("/{board_id}/members", response_model=BoardMemberResponse)
async def add_board_member(
    board_id : str, 
    req: AddBoardMemberRequest, 
    current_user : User = Depends(get_current_user),
): 
    try : 
        member = await boardService.add_member(
            board_id=board_id, 
            owner_id=current_user.id, 
            email=req.email, 
            role = req.role,
        )

    except PermissionError as exc: 
        raise HTTPException(
            status_code=403,
            detail=str(exc)
        )

    except ValueError as exc: 
        raise HTTPException(
            status_code = 404, 
            detail=str(exc)
        )

    if member is None:
        raise HTTPException(
            status_code=404,
            detail="Board not found",
        )

    return member

@router.get(
    "/{board_id}/members", 
    response_model=list[BoardMemberDetailResponse],
)
async def get_board_member(
    board_id : str, 
    current_user : User = Depends(get_current_user),
): 
    try: 
        members = await boardService.get_members(
            board_id=board_id, 
            user_id=current_user.id,
        )
    except PermissionError as exc: 
        raise HTTPException(
            status_code=403, 
            detail=str(exc),
        )
    if members is None: 
        raise HTTPException(
            status_code = 404, 
            detail="board not found",
        )
    return members

@router.get(
    "/{board_id}", 
    response_model=BoardResponse
)
async def get_board(
    board_id : str, 
    current_user : User = Depends(get_current_user),
):
    try:
        board = await service.get_board(
            board_id=board_id, 
            user_id=current_user.id
        )

    except PermissionError as exec:
        raise HTTPException(
            status_code=403, 
            detail = str(exec),
        )

    if board is None: 
        raise HTTPException(
            status_code=404, 
            detail="board not found",
        )
    return board



