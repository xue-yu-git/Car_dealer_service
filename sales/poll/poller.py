import django
import os
import sys
import time
import json
import requests

sys.path.append("")
os.environ.setdefault("DJANGO_SETTINGS_MODULE", "sales_project.settings")
django.setup()

from sales_rest.models import AutomobileVO


def get_automobile():
    response = requests.get("http://inventory:8000/api/automobiles/")
    content = json.loads(response.content)
    print(content)
    for automobile in content["automobiles"]:
        AutomobileVO.objects.update_or_create(
            import_href=automobile["href"],
            defaults={
                "color": automobile["color"],
                "year": automobile["year"],
                "vin": automobile["vin"],
                },
        )

def poll():
    while True:
        print('Sales poller polling for data')
        try:
            get_automobile()
            pass
        except Exception as e:
            print(e, file=sys.stderr)
        time.sleep(5)

if __name__ == "__main__":
    poll()
