from datetime import datetime

from sqlalchemy import (
    DateTime, 
    ForeignKey, 
    String, 
    func,
)

from sqlalchemy.dialects.postgresql import JSONB
from sqlalchemy.orm import (
    Mapped, 
    mapped_column, 
    relationship,
)

from app.db.base import Base 

class Board(Base):
    __tablename__ = "boards"

    id: Mapped[str] = mapped_column(
        String,
        primary_key=True,
    )

    title: Mapped[str] = mapped_column(
        String,
        default="New Board",
    )

    created_at: Mapped[datetime] = mapped_column(
        DateTime(timezone=True),
        server_default=func.now(),
    )

    updated_at: Mapped[datetime] = mapped_column(
        DateTime(timezone=True),
        server_default=func.now(),
        onupdate=func.now(),
    )

    objects: Mapped[list["BoardObject"]] = relationship(
        back_populates="board",
        cascade="all, delete-orphan",
    )


class BoardObject(Base):
    __tablename__ = "board_objects"

    id: Mapped[str] = mapped_column(
        String,
        primary_key=True,
    )

    board_id: Mapped[str] = mapped_column(
        ForeignKey("boards.id", ondelete="CASCADE"),
        index=True,
    )

    type: Mapped[str] = mapped_column(
        String,
    )

    data: Mapped[dict] = mapped_column(
        JSONB,
    )

    created_at: Mapped[datetime] = mapped_column(
        DateTime(timezone=True),
        server_default=func.now(),
    )

    updated_at: Mapped[datetime] = mapped_column(
        DateTime(timezone=True),
        server_default=func.now(),
        onupdate=func.now(),
    )

    board: Mapped["Board"] = relationship(
        back_populates="objects",
    )
