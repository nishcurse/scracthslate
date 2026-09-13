from datetime import datetime
from pydantic import BaseModel


class CreateBoardRequest(BaseModel):
    title: str = "Untitled Board"


class BoardResponse(BaseModel):
    id: str
    title: str
    updated_at: datetime

    model_config = {
        "from_attributes": True,
    }


class RenameBoardRequest(BaseModel):
    title: str


class AddBoardMemberRequest(BaseModel):
    email: str
    role: str = "editor"

class BoardMemberResponse(BaseModel):
    board_id: str
    user_id: str
    role: str

    model_config = {
        "from_attributes" : True,
    }

class BoardMemberDetailResponse(BaseModel):
    board_id: str
    user_id: str
    role: str

    name: str
    email: str
    picture: str | None

    model_config = {
        "from_attributes": True,
    }

class SharedBoardOwnerResponse(BaseModel):
    id: str
    name: str
    picture: str | None = None


class SharedBoardResponse(BaseModel):
    id: str
    title: str
    role: str
    owner: SharedBoardOwnerResponse


