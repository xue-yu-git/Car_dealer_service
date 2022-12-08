from django.urls import path

from .views import (
    api_show_appointment,
    api_show_technician,
    api_list_appointment,
    api_list_technician,
)

urlpatterns = [
    path("appointments/", api_list_appointment, name="api_list_appointment"),
    path("vin/appointments/", api_list_appointment, name="api_list_appointment"),
    path("technicians/", api_list_technician, name="api_list_technician"),
    path("appointment/<int:pk>/", api_show_appointment, name="api_show_appointment"),
    path("technicians/<int:pk>/", api_show_technician, name="api_show_technician"),
]
