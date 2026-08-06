import httpx

from app.core.config import settings

TOKEN_URL = "https://oauth2.googleapis.com/token"


async def exchange_google_tokens(
    code: str,
) -> dict:
    async with httpx.AsyncClient() as client:
        response = await client.post(
            TOKEN_URL,
            data={
                "code": code,
                "client_id": settings.GOOGLE_CLIENT_ID,
                "client_secret": settings.GOOGLE_CLIENT_SECRET,
                "redirect_uri": "postmessage",
                "grant_type": "authorization_code",
            },
        )

    response.raise_for_status()

    return response.json()