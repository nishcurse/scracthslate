from app.db.database import SessionLocal
from app.repo.user_repo import UserRepo
from app.auth.oidc import verify_google_token
from app.core.config import settings
from app.auth.jwt import create_access_token
from app.schemas.auth import LoginResponse, UserResponse
from app.auth.googleOauth import exchange_google_tokens

class AuthServices: 

    async def login_with_google(
        self, 
        code: str,
    ): 
        token = await exchange_google_tokens(
            code=code,
        )
        google_user = verify_google_token(
            token=token["id_token"], 
            client_id=settings.GOOGLE_CLIENT_ID,
        )
        async with SessionLocal() as session: 
            user = await UserRepo.get_by_provider(
                session=session, 
                provider="google", 
                provider_user_id=google_user.provider_user_id,
            )

            if user is None: 
                user = await UserRepo.create_user(
                    session=session, 
                    name=google_user.name, 
                    email=google_user.email, 
                    provider_user_id=google_user.provider_user_id, 
                    provider="google", 
                    picture=google_user.picture
                )
            else:
                user = await  UserRepo.update_user(
                    session=session,
                    user=user, 
                    name=google_user.name, 
                    picture=google_user.picture, 
                )
            
            access_token = create_access_token(user_id=user.id)
            return LoginResponse(
                access_token=access_token, 
            )
        
       
        
    