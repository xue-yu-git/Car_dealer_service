from django.urls import path

from .views import (
    api_show_appointment,
    api_show_technician,
    api_list_appointment,
    api_list_technician,
    api_finished_appointment,
    api_canceled_appointment,
)

urlpatterns = [
    path("appointments/", api_list_appointment, name="api_list_appointment"),
    path("technicians/", api_list_technician, name="api_list_technician"),
    path("appointment/<int:pk>/", api_show_appointment, name="api_show_appointment"),
    path("technicians/<int:pk>/", api_show_technician, name="api_show_technician"),
    path(
        "appointment/<int:pk>/finished/",
        api_finished_appointment,
        name="api_finished_appointment",
    ),
    path(
        "appointment/<int:pk>/canceled/",
        api_canceled_appointment,
        name="api_canceled_appointment",
    ),
]
