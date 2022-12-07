from common.json import ModelEncoder

from .models import Automobile, Manufacturer, VehicleModel, SoldCars


class ManufacturerEncoder(ModelEncoder):
    model = Manufacturer
    properties = [
        "id",
        "name",
    ]


class VehicleModelEncoder(ModelEncoder):
    model = VehicleModel
    properties = [
        "id",
        "name",
        "picture_url",
        "manufacturer",
    ]
    encoders = {
        "manufacturer": ManufacturerEncoder(),
    }


class AutomobileEncoder(ModelEncoder):
    model = Automobile
    properties = [
        "id",
        "color",
        "year",
        "vin",
        "model",
    ]
    encoders = {
        "model": VehicleModelEncoder(),
    }

class SoldEncoder(ModelEncoder):
    model = SoldCars
    properties = [
        "id",
        "vin",
    ]
