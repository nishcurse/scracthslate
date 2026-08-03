from google.auth.transport import requests
from google.oauth2 import id_token

from dataclasses import dataclass

@dataclass
class GoogleUser:
    provider_user_id : str
    email: str
    name: str
    picture : str | None

def verify_google_token(
    token: str, 
    client_id : str,
): 
    payload = id_token.verify_oauth2_token(
        token, 
        requests.Request(),
        client_id,
    )
    return GoogleUser(
        provider_user_id=payload["sub"], 
        email=payload["email"],
        name=payload["name"], 
        picture=payload.get("picture"),
    )