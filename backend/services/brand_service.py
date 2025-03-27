from sqlalchemy.orm import Session
from models.brand import Brand
from schemas.brand_schema import BrandCreate

class BrandService:
    @staticmethod
    def create(db: Session, input_create_brand: BrandCreate):
        create_brand = Brand(name=input_create_brand.name, code=input_create_brand.code)
        db.add(create_brand)
        db.commit()
        db.refresh(create_brand)
        return create_brand

    @staticmethod
    def get(db: Session, Brand_id: int):
        return db.query(Brand).filter(Brand.id == Brand_id).first()
