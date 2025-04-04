from sqlalchemy import create_engine, Column, Integer, String, Numeric, ForeignKey
from sqlalchemy.orm import declarative_base, sessionmaker, relationship

# Criar a base do modelo
Base = declarative_base()

# Definir um modelo para a tabela 'usuarios'
class Product_type(Base):
    __tablename__ = "product_type"

    id = Column(Integer, primary_key=True, autoincrement=True)
    name = Column(String, nullable=False)
    produtos = relationship("Product", back_populates="product_type", cascade="all, delete-orphan")
