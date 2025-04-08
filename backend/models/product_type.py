from sqlalchemy import create_engine, Column, Integer, String, Numeric, ForeignKey
from sqlalchemy.orm import declarative_base, sessionmaker, relationship
from database import Base

# Definir um modelo para a tabela 'usuarios'
class ProductType(Base):
    __tablename__ = "product_type"

    id = Column(Integer, primary_key=True, autoincrement=True)
    name = Column(String, nullable=False)
    products = relationship("Product", back_populates="product_type", cascade="all, delete-orphan")
