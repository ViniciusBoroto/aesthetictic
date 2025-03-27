from fastapi import FastAPI, Depends
from sqlalchemy.orm import Session
from database import engine, Base, get_db
from services.brand_service import BrandService
from schemas.brand_schema import BrandCreate

# Criar as tabelas no banco de dados
Base.metadata.create_all(bind=engine)
app = FastAPI()

@app.post("/brand/", tags=["Brand"])
def create_brand(brand: BrandCreate, db: Session = Depends(get_db)):
    return BrandService().create(db, brand)

@app.get("/brand/{brand_id}", tags=["Brand"])
def get_brand(brand_id: int, db: Session = Depends(get_db)):
    brand = BrandService().get(db, brand_id)
    return brand if brand else {"error": "Brand not found"}