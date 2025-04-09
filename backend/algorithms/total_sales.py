
from typing import Dict, List

from pydantic import BaseModel

from models.sale import Sale


class MonthlySales(BaseModel):
    totals_by_month: Dict[str, float]

def total_sales(sales: List[Sale]) -> MonthlySales:
    result: Dict[str, float] = {}
    for sale in sales:
        key = sale.date_your_sale.strftime("%Y-%m")  # e.g., "2025-04"
        result[key] = result.get(key, 0) + sale.price
    return result