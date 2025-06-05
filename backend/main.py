from typing import Dict
from fastapi import FastAPI, Depends
from sqlalchemy.orm import Session
import uvicorn
from algorithms.total_sales import total_sales
from database import engine, Base, get_db
from services.brand_service import BrandService
from schemas.brand_schema import InputCreateBrand, InputUpdateBrand
from services.sale_service import SaleService
from schemas.sale_schema import InputCreateSale
from services.product_service import ProductService
from schemas.product_schema import InputCreateProduct, InputUpdateProduct
from services.product_type_service import ProductTypeService
from schemas.product_type_schema import InputCreateProductType, InputUpdateProductType
from fastapi.middleware.cors import CORSMiddleware

# Criar as tabelas no banco de dados
Base.metadata.create_all(bind=engine)
app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# region Brand
@app.post("/brand/", tags=["Brand"])
def create_brand(brand: InputCreateBrand, db: Session = Depends(get_db)):
    return BrandService().create(db, brand)

@app.post("/brand/Multiple", tags=["Brand"])
def create_brand_multiple(brand: list[InputCreateBrand], db: Session = Depends(get_db)):
    return BrandService().create_multiple(db, brand)

@app.put("/brand/", tags=["Brand"])
def update_brand(brand: InputUpdateBrand, db: Session = Depends(get_db)):
    return BrandService().update(db, brand)

@app.delete("/brand/{id}", tags=["Brand"])
def delete_brand(id: int, db: Session = Depends(get_db)):
    return BrandService().delete(db, id)

@app.get("/brand/{id}", tags=["Brand"])
def get_brand(id: int, db: Session = Depends(get_db)):
    brand = BrandService().get(db, id)
    return brand

@app.get("/brand/", tags=["Brand"])
def get_brand(db: Session = Depends(get_db)):
    brand = BrandService().get_all(db)
    return brand
# endregion

# region Sale
@app.post("/sale/", tags=["Sale"])
def create_Sale(Sale: InputCreateSale, db: Session = Depends(get_db)):
    return SaleService().create(db, Sale)

@app.post("/sale/Multiple", tags=["Sale"])
def create_sale_m(Sale: list[InputCreateSale], db: Session = Depends(get_db)):
    return SaleService().create_multiple(db, Sale)

@app.get("/sale/{sale_id}", tags=["Sale"])
def get_Sale(Sale_id: int, db: Session = Depends(get_db)):
    Sale = SaleService().get(db, Sale_id)
    return Sale

@app.get("/sale/", tags=["Sale"])
def get_Sale(db: Session = Depends(get_db)):
    Sale = SaleService().get_all(db)
    return Sale
#endregion

# region Product
@app.post("/Product/", tags=["Product"])
def create_product(Product: InputCreateProduct, db: Session = Depends(get_db)):
    return ProductService().create(db, Product)

@app.post("/Product/Multiple", tags=["Product"])
def create_product(Product: list[InputCreateProduct], db: Session = Depends(get_db)):
    return ProductService().create_multiple(db, Product)

# Usar no grafico
@app.get("/Product/GetROI/", tags=["Product"])
def get_roi(db: Session = Depends(get_db)):
    Product = ProductService().get_roi(db)
    return Product

@app.get("/Product/{id}", tags=["Product"])
def get_product(id: int, db: Session = Depends(get_db)):
    Product = ProductService().get(db, id)
    return Product

@app.get("/Product/ByType/{product_type_id}", tags=["Product"])
def get_product_by_type(product_type_id: int, db: Session = Depends(get_db)):
    Product = ProductService().get_by_type(db, product_type_id)
    return Product

@app.get("/Product/", tags=["Product"])
def get_product(db: Session = Depends(get_db)):
    Product = ProductService().get_all(db)
    return Product

@app.get("/Product/GetProfitValue/{id}", tags=["Product"])
def get_profit_value(id: int, db: Session = Depends(get_db)):
    Product = ProductService().get_profit_value(db, id)
    return Product

# Usar no grafico
@app.get("/Product/GetWorstProfitValueByMonth/{month}", tags=["Product"])
def get_worst_profit_value_by_month(month: int, db: Session = Depends(get_db)):
    Product = ProductService().get_worst_profit_value_by_month(db, month)
    return Product

# Usar no grafico
@app.get("/Product/GetBestProfitValueByMonth/{month}", tags=["Product"])
def get_best_profit_value_by_month(month: int, db: Session = Depends(get_db)):
    Product = ProductService().get_best_profit_value_by_month(db, month)
    return Product

@app.put("/Product/", tags=["Product"])
def update_product(product: InputUpdateProduct, db: Session = Depends(get_db)):
    return ProductService().update(db, product)

@app.delete("/Product/{id}", tags=["Product"])
def delete_product(id: int, db: Session = Depends(get_db)):
    return ProductService().delete(db, id)
#endregion

# region ProductType
@app.post("/ProductType/", tags=["ProductType"])
def create_ProductType(ProductType: InputCreateProductType, db: Session = Depends(get_db)):
    return ProductTypeService().create(db, ProductType)

@app.get("/ProductType/{id}", tags=["ProductType"])
def get_ProductType(id: int, db: Session = Depends(get_db)):
    ProductType = ProductTypeService().get(db, id)
    return ProductType

@app.get("/ProductType/", tags=["ProductType"])
def get_ProductType(db: Session = Depends(get_db)):
    ProductType = ProductTypeService().get_all(db)
    return ProductType

@app.put("/ProductType/", tags=["ProductType"])
def update_producttype(producttype: InputUpdateProductType, db: Session = Depends(get_db)):
    return ProductTypeService().update(db, producttype)

@app.delete("/ProductType/{id}", tags=["ProductType"])
def delete_producttype(id: int, db: Session = Depends(get_db)):
    return ProductTypeService().delete(db, id)
#endregion

#region General
# Usar no grafico
@app.get("/TotalSales/month", tags=["General"])
def get_TotalSales_Month(db: Session = Depends(get_db)):
    sales= SaleService().get_all(db)
    return total_sales(sales)

# Usar no grafico
@app.get("/ProductTypePerformance/", tags=["General"])
def get_product_type_performance(db: Session = Depends(get_db)):
    performance = ProductTypeService().get_performance(db)
    return performance
#endregion

if __name__ == "__main__":
    uvicorn.run(app, host="0.0.0.0", port=8000)