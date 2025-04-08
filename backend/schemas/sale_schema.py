from pydantic import BaseModel
from datetime import datetime

class InputCreateSale(BaseModel):
    date_your_sale: datetime
    price: float
    quantity: int
    product_id: int