from app.auth.jwt import verify_access_token
from app.db.database import SessionLocal
from app.repo.user_repo import UserRepo
from app.db.models import User

async def get_user_from_token(token : str) -> User | None:
    try :
        payload = verify_access_token(token)
    except Exception: 
        return None

    user_id = payload.get("sub")
    if not user_id: 
        return None

    async with SessionLocal() as session: 
        return await UserRepo.get_by_id(
            session=session, 
            user_id=user_id,
        )


    