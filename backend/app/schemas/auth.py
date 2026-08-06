from pydantic import BaseModel, ConfigDict

class GoogleLoginRequest(BaseModel):
    code: str


class LoginResponse(BaseModel): 
    model_config = ConfigDict(from_attributes=True)

    access_token: str
    token_type : str = "bearer"

class UserResponse(BaseModel): 
    model_config = ConfigDict(from_attributes=True)
    id : str
    email: str 
    name : str
    picture : str | None
    

