from fastapi import Depends, HTTPException
from fastapi.security import HTTPAuthorizationCredentials
from fastapi.security import HTTPBearer 

from app.auth.jwt import verify_access_token
from app.db.database import SessionLocal
from app.repo.user_repo import UserRepo
from app.db.models import User

security = HTTPBearer()

async def get_current_user(
        credentials: HTTPAuthorizationCredentials = Depends(
            security
        ), 
) -> User: 
    token = credentials.credentials
    try:
        payload =  verify_access_token(token)
    except Exception: 
        raise HTTPException(
            status_code=401, 
            detail="invalid token"
        )
    
    user_id = payload["sub"]

    async with SessionLocal() as session: 

        user = await UserRepo.get_by_id(
            session=session, 
            user_id = user_id,
        )

    if user is None:
        raise HTTPException(
            status_code=401, 
            detail="user not found",
        )
    
    return user

