from common.json import ModelEncoder

from .models import AutomobileVO, Salesperson, Customer, Sale


class SalespersonEncoder(ModelEncoder):
    model = Salesperson
    properties = [
        "id",
        "name",
        "emplid"
    ]


class CustomerEncoder(ModelEncoder):
    model = Customer
    properties = [
        "id",
        "name",
        "number",
        "address",
    ]



class AutomobileVOEncoder(ModelEncoder):
    model = AutomobileVO
    properties = [
        "id",
        "color",
        "year",
        "vin",
        "import_href",
    ]

class SaleEncoder(ModelEncoder):
    model = Sale
    properties = [
        "id",
        "price",
        "salesperson",
        "customer",
        "automobile",
    ]
    encoders = {
        "salesperson": SalespersonEncoder(),
        "customer": CustomerEncoder(),
        "automobile": AutomobileVOEncoder()
    }
