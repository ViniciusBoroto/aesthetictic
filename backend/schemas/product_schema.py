from pydantic import BaseModel

class InputCreateProduct(BaseModel):
    name: str
    price: float
    product_type_id: int
    brand_id: int
    