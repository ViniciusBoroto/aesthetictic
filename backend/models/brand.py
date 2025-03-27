from sqlalchemy import Column, Integer, String
from database import Base

class Brand(Base):
    __tablename__ = "marca"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, index=True)