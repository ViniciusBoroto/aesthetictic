from sqlalchemy.orm import Session
from models.sale import Sale
from schemas.sale_schema import InputCreateSale

class SaleService:
    @staticmethod
    def create(db: Session, input_create_sale: InputCreateSale):
        create_sale = Sale(date_your_sale=input_create_sale.date_your_sale, price=input_create_sale.price, quantity=input_create_sale.quantity, product_id=input_create_sale.product_id)
        db.add(create_sale)
        db.commit()
        db.refresh(create_sale)
        return create_sale.id
    
    def create_multiple(db: Session, input_create_sale: list[InputCreateSale]):
        listid = []
        for i in input_create_sale:
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
        return db.query(Sale).all()