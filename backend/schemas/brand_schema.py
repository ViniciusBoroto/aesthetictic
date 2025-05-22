from pydantic import BaseModel

class InputCreateBrand(BaseModel):
    name: str
    
class InputUpdateBrand(BaseModel):
    id: int
    name: str