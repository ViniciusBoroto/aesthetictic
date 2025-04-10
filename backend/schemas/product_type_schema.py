from pydantic import BaseModel

class InputCreateProductType(BaseModel):
    name: str
    