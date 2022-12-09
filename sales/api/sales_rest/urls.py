from django.urls import path
from .views import api_salespersons, api_delete_salespersons, api_customers, api_delete_customers, api_sales, api_delete_sales, api_automobilesVO, api_delete_automobileVO

urlpatterns =[
    path("auto/",api_automobilesVO,name="api_automobilesVO",),
    path("auto/<int:pk>",api_delete_automobileVO,name="api_delete_automobileVO",),
    path("salespersons/",api_salespersons,name="api_salespersons",),
    path("salespersons/<int:pk>",api_delete_salespersons,name="api_delete_salespersons",),
    path("customers/",api_customers,name="api_customers",),
    path("customers/<int:pk>",api_delete_customers,name="api_delete_customers",),
    path("sales/",api_sales,name="api_sales",),
    path("sales/<int:pk>",api_delete_sales,name="api_delete_sales",),
]
