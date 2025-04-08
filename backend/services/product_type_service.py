from sqlalchemy.orm import Session
from models.product_type import ProductType
from schemas.product_type_schema import InputCreateProductType

class ProductTypeService:
    @staticmethod
    def create(db: Session, input_create_product_type: InputCreateProductType):
        create_product_type = ProductType(name=input_create_product_type.name)
        db.add(create_product_type)
        db.commit()
        db.refresh(create_product_type)
        return create_product_type.id

    @staticmethod
    def get(db: Session, id: int):
        return db.query(ProductType).filter(ProductType.id == id).first()

    @staticmethod
    def get_all(db: Session):
        return db.query(ProductType).all()