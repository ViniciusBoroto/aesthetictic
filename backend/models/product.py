from sqlalchemy import create_engine, Column, Integer, String, Numeric, ForeignKey
from sqlalchemy.orm import declarative_base, sessionmaker, relationship

# Criar a base do modelo
Base = declarative_base()

# Definir um modelo para a tabela 'usuarios'
class Product(Base):
    __tablename__ = "products"

    id = Column(Integer, primary_key=True, autoincrement=True)
    name = Column(String, nullable=False)
    price = Column(Numeric(10,2), nullable=False)

    product_type_id = Column(Integer, ForeignKey("product_type.id", ondelete="CASCADE"), nullable=False)
    product_type = relationship("Product_type", back_populates="products")

    brand_id = Column(Integer, ForeignKey("brands.id", ondelete="CASCADE"), nullable=False)
    brand = relationship("Brand", back_populates="products")
