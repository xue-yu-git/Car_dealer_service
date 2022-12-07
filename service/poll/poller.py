import django
import os
import sys
import time
import json
import requests

sys.path.append("")
os.environ.setdefault("DJANGO_SETTINGS_MODULE", "service_project.settings")
django.setup()

# Import models from service_rest, here.
# from service_rest.models import Something
from service_rest.models import SoldCarsVO


def get_sold():
    response = requests.get("http://inventory-api:8000/api/automobiles/sold/")
    content = json.loads(response.content)
    for sold in content["soldcars"]:
        SoldCarsVO.objects.update_or_create(
            import_href=sold["href"],
            defaults={
                "vin": sold["vin"],
            },
        )


def poll():
    while True:
        try:
            get_sold()
        except Exception as e:
            print(e, file=sys.stderr)
        time.sleep(60)


if __name__ == "__main__":
    poll()
