from django.http import JsonResponse
from django.views.decorators.http import require_http_methods
import json

from .encoders import SalespersonEncoder

from .models import Sale

@require_http_methods(["DELETE"])
def api_delete_sales(request,pk):
    if request.method == "DELETE":
        try:
            sale = Sale.objects.get(id=pk)
            sale.delete()
            return JsonResponse(
                sale,
                encoder=SalespersonEncoder,
                safe=False,
            )
        except SalespersonEncoder.DoesNotExist:
            return JsonResponse({"message": "Does not exist"})
