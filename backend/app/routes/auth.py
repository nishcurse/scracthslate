from fastapi import APIRouter, Depends
from app.db.models import User
from app.auth.dependencies import get_current_user

from app.schemas.auth import GoogleLoginRequest, LoginResponse , UserResponse
from app.services.auth_services import AuthServices

router = APIRouter(
    prefix="/auth", 
    tags=["Authentication"]
)

service =AuthServices()

@router.post(
    "/google", 
    response_model=LoginResponse
)
async def login(request : GoogleLoginRequest):
    return await service.login_with_google(
        token= request.token
    )

@router.get(
    "/me", 
    response_model=UserResponse
)
async def get_user(
    current_user: User = Depends(get_current_user), 
):
    return current_user
    
