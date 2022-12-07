from django.contrib import admin
from .models import AutomobileVO, Technician, Appointment


@admin.register(AutomobileVO)
class PresentationAdmin(admin.ModelAdmin):
    pass


@admin.register(Appointment)
class StatusAdmin(admin.ModelAdmin):
    pass


@admin.register(Technician)
class StatusAdmin(admin.ModelAdmin):
    pass
