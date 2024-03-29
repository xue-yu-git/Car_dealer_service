from django.shortcuts import render
from django.http import JsonResponse
from django.views.decorators.http import require_http_methods
import json

from common.json import ModelEncoder
from .models import SoldCarsVO, Technician, Appointment


class TechnicianListEncoder(ModelEncoder):
    model = Technician
    properties = ["id", "name", "employee_num"]


class TechnicianDetailEncoder(ModelEncoder):
    model = Technician
    properties = ["id", "name", "employee_num"]


class SoldCarsVOListEncoder(ModelEncoder):
    model = SoldCarsVO
    properties = ["vin", "id"]


class AppointmentListEncoder(ModelEncoder):
    model = Appointment
    properties = [
        "id",
        "vin",
        "name_customer",
        "date",
        "time",
        "technician",
        "reason",
        "status",
        "sold_here",
    ]
    encoders = {
        "technician": TechnicianListEncoder(),
    }


class AppointmentDetailEncoder(ModelEncoder):
    model = Appointment
    properties = [
        "id",
        "vin",
        "name_customer",
        "date",
        "time",
        "technician",
        "reason",
        "status",
        "sold_here",
    ]
    encoders = {
        "technician": TechnicianListEncoder(),
    }


@require_http_methods(["GET"])
def api_list_soldcars(request):
    soldcars = SoldCarsVO.objects.all()
    return JsonResponse(
        {"soldcars": soldcars},
        encoder=SoldCarsVOListEncoder,
    )


@require_http_methods(["GET", "POST"])
def api_list_technician(request):
    if request.method == "GET":
        technicians = Technician.objects.all()
        return JsonResponse(
            {"technician": technicians},
            encoder=TechnicianListEncoder,
        )
    else:
        content = json.loads(request.body)
        technician = Technician.objects.create(**content)
        return JsonResponse(
            technician,
            encoder=TechnicianDetailEncoder,
            safe=False,
        )


@require_http_methods(["DELETE", "GET", "PUT"])
def api_show_technician(request, pk):
    if request.method == "GET":
        technician = Technician.objects.get(id=pk)
        return JsonResponse(
            technician,
            encoder=TechnicianDetailEncoder,
            safe=False,
        )
    elif request.method == "DELETE":
        count, _ = Technician.objects.filter(id=pk).delete()
        return JsonResponse({"deleted": count > 0})
    else:
        content = json.loads(request.body)
        Technician.objects.filter(id=pk).update(**content)
        technician = Technician.objects.get(id=pk)
        return JsonResponse(
            technician,
            encoder=TechnicianDetailEncoder,
            safe=False,
        )


@require_http_methods(["GET", "POST"])
def api_list_appointment(request):
    if request.method == "GET":
        appointments = Appointment.objects.all()
        return JsonResponse(
            {"appointments": appointments},
            encoder=AppointmentListEncoder,
        )
    else:
        content = json.loads(request.body)

        try:
            technician = Technician.objects.get(id=content["technician_id"])
            content["technician"] = technician
        except Technician.DoesNotExist:
            return JsonResponse(
                {"message": "Invalid technician id"},
                status=400,
            )

        appointment = Appointment.objects.create(**content)

        return JsonResponse(
            appointment,
            encoder=AppointmentDetailEncoder,
            safe=False,
        )


@require_http_methods(["GET", "PUT"])
def api_show_appointment(request, pk):
    if request.method == "GET":
        appointment = Appointment.objects.get(id=pk)

        return JsonResponse(
            appointment,
            encoder=AppointmentDetailEncoder,
            safe=False,
        )
    else:
        content = json.loads(request.body)

        if "technician" in content:
            technician = Technician.objects.get(id=content["technician"])
            content["technician"] = technician

        Appointment.objects.filter(id=pk).update(**content)
        appointment = Appointment.objects.get(id=pk)
        return JsonResponse(
            appointment,
            encoder=AppointmentDetailEncoder,
            safe=False,
        )
