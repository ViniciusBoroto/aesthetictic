from sqlalchemy import create_engine, Column, Integer, String, Numeric, ForeignKey, DateTime, CheckConstraint
from sqlalchemy.orm import declarative_base, sessionmaker, relationship
from sqlalchemy.sql import func
from database import Base

class Sale(Base):
     __tablename__ = "sale"

     id = Column(Integer, primary_key=True, autoincrement=True)
     date_your_sale = Column(DateTime, default=func.now(), nullable=False)
     price = Column(Numeric(10,2), CheckConstraint("price > 0"), nullable=False)
     quantity = Column(Integer, CheckConstraint("quantity > 0"), nullable=False)

     product_id = Column(Integer, ForeignKey("product.id", ondelete="CASCADE"), nullable=False)
     product = relationship("Product", back_populates="sales")