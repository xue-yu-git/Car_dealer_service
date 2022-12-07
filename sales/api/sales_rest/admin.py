from django.contrib import admin

from .models import AutomobileVO, Salesperson, Customer, Sale

@admin.register(AutomobileVO)
class HatAdmin(admin.ModelAdmin):
    pass

@admin.register(Salesperson)
class LocationVOAdmin(admin.ModelAdmin):
    pass

@admin.register(Customer)
class LocationVOAdmin(admin.ModelAdmin):
    pass

@admin.register(Sale)
class LocationVOAdmin(admin.ModelAdmin):
    pass
