from pydantic import BaseModel

class BrandCreate(BaseModel):
    code: str
    name: str