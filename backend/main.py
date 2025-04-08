from fastapi import FastAPI, Depends
from sqlalchemy.orm import Session
from database import engine, Base, get_db
from services.brand_service import BrandService
from schemas.brand_schema import InputCreateBrand
from services.sale_service import SaleService
from schemas.sale_schema import InputCreateSale
from services.product_service import ProductService
from schemas.product_schema import InputCreateProduct
from services.product_type_service import ProductTypeService
from schemas.product_type_schema import InputCreateProductType

# Criar as tabelas no banco de dados
Base.metadata.create_all(bind=engine)
app = FastAPI()

# region Brand
@app.post("/brand/", tags=["Brand"])
def create_brand(brand: InputCreateBrand, db: Session = Depends(get_db)):
    return BrandService().create(db, brand)

@app.get("/brand/{brand_id}", tags=["Brand"])
def get_brand(brand_id: int, db: Session = Depends(get_db)):
    brand = BrandService().get(db, brand_id)
    return brand if brand else {"error": "Brand not found"}

@app.get("/brand/", tags=["Brand"])
def get_brand(db: Session = Depends(get_db)):
    brand = BrandService().get_all(db)
    return brand
# endregion

# region Sale
@app.post("/sale/", tags=["Sale"])
def create_Sale(Sale: InputCreateSale, db: Session = Depends(get_db)):
    return SaleService().create(db, Sale)

@app.get("/sale/{Sale_id}", tags=["Sale"])
def get_Sale(Sale_id: int, db: Session = Depends(get_db)):
    Sale = SaleService().get(db, Sale_id)
    return Sale if Sale else {"error": "Sale not found"}

@app.get("/sale/", tags=["Sale"])
def get_Sale(db: Session = Depends(get_db)):
    Sale = SaleService().get_all(db)
    return Sale
#endregion

# region Product
@app.post("/Product/", tags=["Product"])
def create_Product(Product: InputCreateProduct, db: Session = Depends(get_db)):
    return ProductService().create(db, Product)

@app.get("/Product/{Product_id}", tags=["Product"])
def get_Product(Product_id: int, db: Session = Depends(get_db)):
    Product = ProductService().get(db, Product_id)
    return Product if Product else {"error": "Product not found"}

@app.get("/Product/", tags=["Product"])
def get_Product(db: Session = Depends(get_db)):
    Product = ProductService().get_all(db)
    return Product
#endregion

# region ProductType
@app.post("/ProductType/", tags=["ProductType"])
def create_ProductType(ProductType: InputCreateProductType, db: Session = Depends(get_db)):
    return ProductTypeService().create(db, ProductType)

@app.get("/ProductType/{ProductType_id}", tags=["ProductType"])
def get_ProductType(ProductType_id: int, db: Session = Depends(get_db)):
    ProductType = ProductTypeService().get(db, ProductType_id)
    return ProductType if ProductType else {"error": "ProductType not found"}

@app.get("/ProductType/", tags=["ProductType"])
def get_ProductType(db: Session = Depends(get_db)):
    ProductType = ProductTypeService().get_all(db)
    return ProductType
#endregion