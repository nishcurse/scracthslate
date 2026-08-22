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