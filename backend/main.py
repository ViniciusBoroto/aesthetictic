from fastapi import FastAPI
from services.brand_service import BrandService

app = FastAPI()

@app.post("/brand/create")
def create_user(user: UserCreate):
    return BrandService().create_user(user)

@app.get("/users/{user_id}")
def get_user(user_id: int):
    return BrandService().get_user(user_id)