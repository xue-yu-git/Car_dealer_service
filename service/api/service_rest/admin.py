from django.contrib import admin
from .models import SoldCarsVO, Technician, Appointment, Status


@admin.register(SoldCarsVO)
class SoldCarsVOAdmin(admin.ModelAdmin):
    pass


@admin.register(Appointment)
class AppointmentAdmin(admin.ModelAdmin):
    pass


@admin.register(Technician)
class TechnicianAdmin(admin.ModelAdmin):
    pass


@admin.register(Status)
class StatusAdmin(admin.ModelAdmin):
    pass
