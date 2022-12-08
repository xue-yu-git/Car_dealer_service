from django.contrib import admin
from .models import SoldCarsVO, Technician, Appointment


@admin.register(SoldCarsVO)
class SoldCarsVOAdmin(admin.ModelAdmin):
    pass


@admin.register(Appointment)
class AppointmentAdmin(admin.ModelAdmin):
    pass


@admin.register(Technician)
class TechnicianAdmin(admin.ModelAdmin):
    pass
