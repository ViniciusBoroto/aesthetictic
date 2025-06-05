from sqlalchemy.orm import Session
from models.product import Product
from services.sale_service import SaleService
from services.brand_service import BrandService
from services.product_type_service import ProductTypeService
from schemas.product_schema import InputCreateProduct, InputUpdateProduct
from schemas.product_schema import ProductWithCostValue, ProductWithCostValueAndProfit
from typing import Dict, List
from collections import defaultdict
from decimal import Decimal
from fastapi import HTTPException, status

class ProductService:
    @staticmethod
    def create(db: Session, input_create_product: InputCreateProduct):
        related_brand = BrandService().get(db, input_create_product.brand_id)
        related_product_type = ProductTypeService().get(db, input_create_product.product_type_id)

        if not related_brand:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail=f"Marca {input_create_product.brand_id} nao localizada."
            )
        if not related_product_type:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail=f"Tipo de produto {input_create_product.product_type_id} nao localizado."
            )
        
        create_product = Product(price=input_create_product.price, name=input_create_product.name, product_type_id=input_create_product.product_type_id, brand_id=input_create_product.brand_id, cost_price=input_create_product.cost_price)
        db.add(create_product)
        db.commit()
        db.refresh(create_product)
        return create_product.id

    @staticmethod
    def create_multiple(db: Session, input_create_product: list[InputCreateProduct]):
        for n in input_create_product:
            ProductService().create(db, n)

        return True

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
        
        profit_by_product = defaultdict(lambda: Decimal('0.0'))

        for item in list_cost_value:
            product_id = item.product_id
            profit_by_product[product_id] += item.profit_value

        list_result = []
        for product_id, profit in profit_by_product.items():
            result: Dict[str, float] = {}
            result["ProfitValue"] = profit
            result["ProductId"] = product_id
            list_result.append(result)

        list_result.sort(key=lambda x: x["ProfitValue"], reverse=False)

        return list_result
    
    @staticmethod
    def get_best_profit_value_by_month(db: Session, month: int) -> List[Dict[str, float]]:
        month_sales = SaleService().get_by_month(db, month)
        list_cost_value = []
        
        for i in month_sales:
            profit_value = (i.product.price - i.product.cost_price) * i.quantity
            list_cost_value.append(ProductWithCostValue(profit_value, i.product.id))
        
        profit_by_product = defaultdict(lambda: Decimal('0.0'))

        for item in list_cost_value:
            profit_by_product[item.product_id] += item.profit_value

        list_result = []
        for product_id, profit in profit_by_product.items():
            result: Dict[str, float] = {}
            result["ProfitValue"] = float(profit)
            result["ProductId"] = product_id
            list_result.append(result)

        # Ordenar por lucro (decrescente) para retornar os melhores primeiro
        list_result.sort(key=lambda x: x["ProfitValue"], reverse=True)

        return list_result
    
    @staticmethod
    def get_roi(db: Session):
        sales = SaleService().get_all(db)
        list_cost_value = []
        
        for i in sales:
            profit_value = (i.product.price - i.product.cost_price) * i.quantity
            list_cost_value.append(ProductWithCostValueAndProfit(profit_value, i.product.cost_price, i.product.id))
        
        profit_and_cost_by_product = defaultdict(lambda: {'profit': Decimal('0.0'), 'cost': Decimal('0.0')})

        for item in list_cost_value:
            profit_and_cost_by_product[item.product_id]['profit'] += item.profit_value
            profit_and_cost_by_product[item.product_id]['cost'] += item.cost_value

        list_result = []
        for product_id, dict in profit_and_cost_by_product.items():
            result: Dict[str, float] = {}
            parsed_profit = float(dict["profit"])
            parsed_cost = float(dict["cost"])
            roi = parsed_profit / parsed_cost * 100
            result["roi"] = float(f"{roi:.2f}")
            result["productId"] = product_id
            list_result.append(result)

        # Ordenar por lucro (decrescente) para retornar os melhores primeiro
        list_result.sort(key=lambda x: x["roi"], reverse=True)

        return list_result

    @staticmethod
    def update(db: Session, input_update_product: InputUpdateProduct):
        product = ProductService().get(db, input_update_product.id)
        related_brand = BrandService().get(db, input_update_product.brand_id)
        related_product_type = ProductTypeService().get(db, input_update_product.product_type_id)

        if not related_brand:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail=f"Marca {input_update_product.brand_id} nao localizada."
            )
        if not related_product_type:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail=f"Tipo de produto {input_update_product.product_type_id} nao localizado."
            )

        if product:
            product.name = input_update_product.name
            product.price = input_update_product.price
            product.cost_price = input_update_product.cost_price
            product.product_type_id = input_update_product.product_type_id
            product.brand_id = input_update_product.brand_id
            db.commit()
            db.refresh(product)
            return product
        else:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail=f"Produto {input_update_product.id} nao localizada."
            )

    @staticmethod
    def delete(db: Session, id: int):
        product = ProductService().get(db, id)

        if product:
            db.delete(product)
            db.commit()
            return True
        else:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail=f"Produto {id} nao localizada."
            )