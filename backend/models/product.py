from sqlalchemy import create_engine, Column, Integer, String, Numeric, ForeignKey
from sqlalchemy.orm import declarative_base, sessionmaker, relationship
from database import Base

# Definir um modelo para a tabela 'usuarios'
class Product(Base):
    __tablename__ = "product"
    id = Column(Integer, primary_key=True, autoincrement=True)
    name = Column(String, nullable=False)
    price = Column(Numeric(10,2), nullable=False)

    product_type_id = Column(Integer, ForeignKey("product_type.id", ondelete="CASCADE"), nullable=False)
    product_type = relationship("ProductType", back_populates="products")

    brand_id = Column(Integer, ForeignKey("brand.id", ondelete="CASCADE"), nullable=False)
    brand = relationship("Brand", back_populates="products")

    sales = relationship("Sale", back_populates="product", cascade="all, delete-orphan")
