from django.db import models

# Create your models here.
class AutomobileVO(models.Model):
    color = models.CharField(max_length=50)
    year = models.PositiveSmallIntegerField()
    vin = models.CharField(max_length=17, unique=True)
    import_href = models.CharField(max_length=200, unique=True, null=True)

    def __str__(self):
        return self.vin

class Salesperson(models.Model):
    name = models.CharField(max_length=50)
    emplid = models.CharField(max_length=50,unique=True)

    def __str__(self):
        return self.name

class Customer(models.Model):
    name = models.CharField(max_length=50)
    number = models.CharField(max_length=10)
    address= models.TextField()

class Sale(models.Model):
    price = models.IntegerField()
    salesperson = models.ForeignKey(
        Salesperson,
        related_name="sales",
        on_delete=models.PROTECT,
    )
    customer = models.ForeignKey(
        Customer,
        related_name="sales",
        on_delete=models.PROTECT,
    )
    automobile = models.ForeignKey(
        AutomobileVO,
        related_name="sales",
        on_delete=models.PROTECT,
    )
