from sqlalchemy.orm import Session, joinedload
from models.sale import Sale
from schemas.sale_schema import InputCreateSale
from models.product import Product
from sqlalchemy import extract
from fastapi import HTTPException, status

class SaleService:
    @staticmethod
    def create(db: Session, input_create_sale: InputCreateSale):
        related_product = db.query(Product).filter(Product.id == input_create_sale.product_id).first()

        if not related_product:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail=f"Produto {input_create_sale.product_id} nao localizado."
            )
        
        create_sale = Sale(date_your_sale=input_create_sale.date_your_sale, price=input_create_sale.price, quantity=input_create_sale.quantity, product_id=input_create_sale.product_id)
        db.add(create_sale)
        db.commit()
        db.refresh(create_sale)
        return create_sale.id
    
    def create_multiple(db: Session, input_create_sale: list[InputCreateSale]):
        listid = []
    
        for i in input_create_sale:
            related_product = db.query(Product).filter(Product.id == i.product_id).first()

            if not related_product:
                raise HTTPException(
                    status_code=status.HTTP_404_NOT_FOUND,
                    detail=f"Produto {input_create_sale.product_id} nao localizado."
                )
            create_sale = Sale(date_your_sale=i.date_your_sale, price=i.price, quantity=i.quantity, product_id=i.product_id)
            db.add(create_sale)
            db.commit()
            db.refresh(create_sale)
            listid.append(create_sale.id)
        return listid

    @staticmethod
    def get(db: Session, id: int):
        return db.query(Sale).filter(Sale.id == id).first()

    @staticmethod
    def get_all(db: Session):
        return db.query(Sale).options(joinedload(Sale.product)).all()
    
    @staticmethod
    def get_by_month(db: Session, month: int):
        return db.query(Sale).options(joinedload(Sale.product)).filter(extract('month', Sale.date_your_sale) == month).all()
    