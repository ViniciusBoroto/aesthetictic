from pydantic import BaseModel

class InputCreateProductType(BaseModel):
    name: str
    
class InputUpdateProductType(BaseModel):
    id: int
    name: str
    