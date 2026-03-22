from sqlalchemy import Boolean, Column, Integer, String

from .database import Base


class Item(Base):
    __tablename__ = "items"

    id = Column(Integer, primary_key=True, index=True)
    title = Column(String, nullable=False, index=True)
    description = Column(String, nullable=True)
    is_done = Column(Boolean, default=False, nullable=False)
