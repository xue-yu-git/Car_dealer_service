from django.db import models
from django.urls import reverse


class SoldCarsVO(models.Model):
    import_href = models.CharField(max_length=200, unique=True, null=True, blank=True)
    import_vin = models.CharField(max_length=200, unique=True, null=True, blank=True)


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
    date = models.DateField(auto_now=False, auto_now_add=False)
    time = models.TimeField(auto_now=False, auto_now_add=False)
    technician = models.ForeignKey(
        Technician,
        related_name="appointment",
        on_delete=models.PROTECT,
    )
    reason = models.TextField()

    @classmethod
    def create(cls, **kwargs):
        kwargs["status"] = Status.objects.get(name="SUBMITTED")
        appointment = cls(**kwargs)
        appointment.save()
        return appointment

    def cancel(self):
        status = Status.objects.get(name="CANCELED")
        self.status = status
        self.save()

    def finish(self):
        status = Status.objects.get(name="FINISHED")
        self.status = status
        self.save()

    def __str__(self):
        return self.name

    def get_api_url(self):
        return reverse("api_show_appointment", kwargs={"pk": self.pk})


class Status(models.Model):
    id = models.PositiveSmallIntegerField(primary_key=True)
    name = models.CharField(max_length=200, unique=True)

    def __str__(self):
        return self.name
