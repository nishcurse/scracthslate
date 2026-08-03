from datetime import datetime, timedelta, timezone

import jwt 

from app.core.config import settings

def create_access_token(
        user_id : str,
)->str : 
    now = datetime.now(timezone.utc)
    payload = {
        "sub" : user_id, 
        "iat" : now, 
        "exp" : now + timedelta(days=7)
    }
    return jwt.encode(
        payload, 
        settings.JWT_SECRET, 
        settings.JWT_ALGORITHM
    )


def verify_access_token(
        token : str,
) -> dict: 
    return jwt.decode(token, settings.JWT_SECRET, algorithms=[settings.JWT_ALGORITHM])