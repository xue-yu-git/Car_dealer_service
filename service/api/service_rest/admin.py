from django.contrib import admin
from .models import SoldCarsVO, Technician, Appointment


@admin.register(SoldCarsVO)
class PresentationAdmin(admin.ModelAdmin):
    pass


@admin.register(Appointment)
class StatusAdmin(admin.ModelAdmin):
    pass


@admin.register(Technician)
class StatusAdmin(admin.ModelAdmin):
    pass
