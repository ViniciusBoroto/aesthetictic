from sqlalchemy.orm import Session
from models.product_type import ProductType
from schemas.product_type_schema import InputCreateProductType
from services.sale_service import SaleService
from itertools import groupby
from operator import attrgetter
from typing import Dict, List

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
    
    @staticmethod
    def get_performance(db: Session):
        sales = SaleService().get_all(db)
        sales.sort(key=lambda s: s.product.product_type_id)
        grouped_sales = {
            key: list(group)
            for key, group in groupby(sales, key=lambda s: s.product.product_type_id)
        }
        most_sales_group = max(grouped_sales.items(), key=lambda x: len(x[1]))
        least_sales_group = min(grouped_sales.items(), key=lambda x: len(x[1]))
        most_product_type_id, most_sales = most_sales_group
        least_product_type_id, least_sales = least_sales_group

        result: Dict[str, float] = {}
        result["Best"] = most_product_type_id
        result["Worse"] = least_product_type_id
        return result