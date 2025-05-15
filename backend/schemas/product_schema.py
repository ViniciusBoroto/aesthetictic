from pydantic import BaseModel

class InputCreateProduct(BaseModel):
    name: str
    price: float
    cost_price: float
    product_type_id: int
    brand_id: int

class ProductWithCostValue:
    def __init__(self, profit_value: float, product_id: int):
        self.product_id = product_id
        self.profit_value = profit_value