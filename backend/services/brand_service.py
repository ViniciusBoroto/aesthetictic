from sqlalchemy.orm import Session
from models.brand import Brand
from schemas.brand_schema import InputCreateBrand

class BrandService:
    @staticmethod
    def create(db: Session, input_create_brand: InputCreateBrand):
        create_brand = Brand(name=input_create_brand.name)
        db.add(create_brand)
        db.commit()
        db.refresh(create_brand)
        return create_brand.id
    
    @staticmethod
    def create_multiple(db: Session, list_input_create_brand: list[InputCreateBrand]):
        list_id = []
        for i in list_input_create_brand:
            create_brand = Brand(name=i.name)
            db.add(create_brand)
            db.commit()
            db.refresh(create_brand)
            list_id.append(create_brand.id)
        return list_id

    @staticmethod
    def get(db: Session, id: int):
        return db.query(Brand).filter(Brand.id == id).first()

    @staticmethod
    def get_all(db: Session):
        return db.query(Brand).all()