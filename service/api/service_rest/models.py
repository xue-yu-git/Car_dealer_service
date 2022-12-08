from django.db import models
from django.urls import reverse


class SoldCarsVO(models.Model):
    import_id = models.PositiveSmallIntegerField(default=0, null=True, blank=True)
    vin = models.CharField(max_length=200, unique=True, null=True, blank=True)


class Technician(models.Model):
    name = models.CharField(max_length=200, null=True, blank=True)
    employee_num = models.CharField(max_length=200, null=True, blank=True)

    def __str__(self):
        return self.name

    def get_api_url(self):
        return reverse("api_show_technician", kwargs={"pk": self.pk})


class Appointment(models.Model):

    vin = models.ForeignKey(
        SoldCarsVO,
        related_name="appointment",
        on_delete=models.PROTECT,
        null=True,
        blank=True,
    )
    name_customer = models.CharField(max_length=200)
    date = models.DateTimeField(auto_now=False, auto_now_add=False)
    # date = models.CharField(max_length=200)
    technician = models.ForeignKey(
        Technician,
        related_name="appointment",
        on_delete=models.PROTECT,
    )
    reason = models.TextField()

    submitted = "submitted"
    canceled = "canceled"
    finished = "finished"
    CHOICES = (
        (submitted, "submitted"),
        (canceled, "canceled"),
        (finished, "finished"),
    )
    status = models.CharField(max_length=200, choices=CHOICES, default="submitted")

    def __str__(self):
        return self.name_customer

    def get_api_url(self):
        return reverse("api_show_appointment", kwargs={"pk": self.pk})
