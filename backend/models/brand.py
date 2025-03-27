from sqlalchemy import create_engine, Column, Integer, String
from sqlalchemy.orm import declarative_base, sessionmaker, relationship

# Criar a base do modelo
Base = declarative_base()
class Brand(Base):
    __tablename__ = "brands"

    id = Column(Integer, primary_key=True, autoincrement=True)
    name = Column(String, unique=True, nullable=False)
    produtos = relationship("Product", back_populates="brand", cascade="all, delete-orphan")