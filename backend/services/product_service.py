from sqlalchemy.orm import Session
from models.product import Product
from services.sale_service import SaleService
from schemas.product_schema import InputCreateProduct
from schemas.product_schema import ProductWithCostValue
from typing import Dict
from collections import defaultdict
from decimal import Decimal

class ProductService:
    @staticmethod
    def create(db: Session, input_create_product: InputCreateProduct):
        create_product = Product(price=input_create_product.price, name=input_create_product.name, product_type_id=input_create_product.product_type_id, brand_id=input_create_product.brand_id, cost_price=input_create_product.cost_price)
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
    
    @staticmethod
    def get_profit_value(db: Session, id: int):
        product = ProductService().get(db, id)
        if product:
            result: Dict[str, float] = {}
            result["ProfitValue"] = product.price - product.cost_price
            return result
        return None
    
    @staticmethod
    def get_worst_profit_value_by_month(db: Session, month: int):
        month_sales = SaleService().get_by_month(db, month)
        list_cost_value = []
        for i in month_sales:
            profit_value = (i.product.price - i.product.cost_price) * i.quantity
            list_cost_value.append(ProductWithCostValue(profit_value, i.product.id))
        
        # list_cost_value.sort(key=lambda s: s.profit_value)
        profit_by_product = defaultdict(lambda: Decimal('0.0'))

        for item in list_cost_value:
            product_id = item.product_id
            profit_by_product[product_id] += item.profit_value

        # Transformar o resultado em uma lista de tuplas, como no LINQ
        #result = [(profit, product_id) for product_id, profit in profit_by_product.items()]

        list_result = []
        for product_id, profit in profit_by_product.items():
            result: Dict[str, float] = {}
            result["ProfitValue"] = profit
            result["ProductId"] = product_id
            list_result.append(result)

        return list_result