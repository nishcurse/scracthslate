from fastapi import APIRouter

from app.schemas.auth import GoogleLoginRequest, LoginResponse
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
    