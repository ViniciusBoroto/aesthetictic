from sqlalchemy.orm import Session
from models.product import Product
from schemas.product_schema import InputCreateProduct

class ProductService:
    @staticmethod
    def create(db: Session, input_create_product: InputCreateProduct):
        create_product = Product(price=input_create_product.price, name=input_create_product.name, product_type_id=input_create_product.product_type_id, brand_id=input_create_product.brand_id)
        db.add(create_product)
        db.commit()
        db.refresh(create_product)
        return create_product.id

    @staticmethod
    def get(db: Session, id: int):
        return db.query(Product).filter(Product.id == id).first()

    @staticmethod
    def get_by_type(db: Session, product_type_id: int):
        return db.query(Product).filter(Product.product_type_id == product_type_id).all()

    @staticmethod
    def get_all(db: Session):
        return db.query(Product).all()