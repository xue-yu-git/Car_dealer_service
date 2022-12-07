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


class SoldCarsVODetailEncoder(ModelEncoder):
    model = SoldCarsVO
    properties = ["vin", "id"]


class AppointmentListEncoder(ModelEncoder):
    model = Appointment
    properties = ["name_customer"]


class AppointmentDetailEncoder(ModelEncoder):
    model = Appointment
    properties = [
        "name_customer",
        "date",
        "time",
        "technician",
    ]
    encoders = {
        "technician": TechnicianListEncoder(),
    }

    # def get_extra_data(self, o):
    #     return {"status": o.status.name}


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
        technicians = Technician.objects.create(**content)
        return JsonResponse(
            technicians,
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
def api_list_appointment(request, sold_vo_vin=None):
    if request.method == "GET":
        if sold_vo_vin is not None:
            appointments = Appointment.objects.filter(vin=sold_vo_vin)
        else:
            appointments = Appointment.objects.all()
        return JsonResponse(
            {"appointments": appointments},
            encoder=AppointmentListEncoder,
        )
    else:
        content = json.loads(request.body)
        print(content)
        try:
            soldcar_id = content["sold_id"]
            sold = SoldCarsVO.objects.get(soldcar_id=soldcar_id)
            content["sold"] = sold
        except SoldCarsVO.DoesNotExist:
            return JsonResponse(
                {"message": "Invalid soldcar href"},
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
        try:
            if "vin" in content:
                sold_id = content["sold_id"]
                soldcar = SoldCarsVO.objects.get(id=sold_id)
                content["sold"] = soldcar
        except SoldCarsVO.DoesNotExist:
            return JsonResponse(
                {"message": "Invalid Soldcar information"},
                status=400,
            )
        Appointment.objects.filter(id=pk).update(**content)
        appointment = Appointment.objects.get(id=pk)
        return JsonResponse(
            appointment,
            encoder=AppointmentDetailEncoder,
            safe=False,
        )


@require_http_methods(["PUT"])
def api_finished_appointment(request, pk):
    appointment = Appointment.objects.get(id=pk)
    appointment.finish()
    return JsonResponse(
        appointment,
        encoder=AppointmentDetailEncoder,
        safe=False,
    )


@require_http_methods(["PUT"])
def api_canceled_appointment(request, pk):
    appointment = Appointment.objects.get(id=pk)
    appointment.cancel()
    return JsonResponse(
        appointment,
        encoder=AppointmentDetailEncoder,
        safe=False,
    )
