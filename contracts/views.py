# from rest_framework.decorators import api_view, permission_classes
# from rest_framework.permissions import IsAuthenticated
# from rest_framework.response import Response

# from .models import Contract
# from .serializers import ContractSerializer


# @api_view(["GET"])
# @permission_classes([IsAuthenticated])
# def my_contracts(request):
#     contracts = Contract.objects.filter(client=request.user) | Contract.objects.filter(
#         freelancer=request.user
#     )

#     serializer = ContractSerializer(contracts, many=True)
#     return Response(serializer.data)

# from rest_framework.decorators import api_view, permission_classes
# from rest_framework.permissions import IsAuthenticated
# from rest_framework.response import Response
# from rest_framework import status

# from .models import Contract


# @api_view(["PATCH"])
# @permission_classes([IsAuthenticated])
# def update_contract_status(request, contract_id):
#     contract = Contract.objects.get(id=contract_id)

#     # ✅ ONLY CLIENT CAN COMPLETE
#     if request.user != contract.client:
#         return Response(
#             {"error": "Only client can complete the contract"},
#             status=status.HTTP_403_FORBIDDEN
#         )

#     new_status = request.data.get("status")

#     if new_status not in ["completed", "cancelled"]:
#         return Response(
#             {"error": "Invalid status"},
#             status=status.HTTP_400_BAD_REQUEST
#         )

#     contract.status = new_status
#     contract.save()

#     return Response(
#         {"message": "Contract status updated successfully"}
#     )

from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework import status
from django.shortcuts import get_object_or_404

from .models import Contract


# ✅ GET contracts for logged-in user (client OR freelancer)
@api_view(["GET"])
@permission_classes([IsAuthenticated])
def my_contracts(request):
    contracts = Contract.objects.filter(client=request.user) | Contract.objects.filter(
        freelancer=request.user
    )

    data = []
    for c in contracts:
        data.append({
            "id": c.id,
            "project": c.project.id,
            "project_title": c.project.title,
            "client": c.client.id,
            "client_name": c.client.name,
            "freelancer": c.freelancer.id,
            "freelancer_name": c.freelancer.name,
            "amount": str(c.amount),
            "status": c.status,
            "start_date": c.start_date,
            "end_date": c.end_date,
        })

    return Response(data, status=status.HTTP_200_OK)


# ✅ Client completes / cancels contract
@api_view(["PATCH"])
@permission_classes([IsAuthenticated])
def update_contract_status(request, contract_id):
    contract = get_object_or_404(Contract, id=contract_id)

    # 🔐 ONLY CLIENT CAN UPDATE
    if request.user != contract.client:
        return Response(
            {"error": "Only client can update the contract"},
            status=status.HTTP_403_FORBIDDEN
        )

    new_status = request.data.get("status")

    if new_status not in ["completed", "cancelled"]:
        return Response(
            {"error": "Invalid status"},
            status=status.HTTP_400_BAD_REQUEST
        )

    contract.status = new_status
    contract.save()

    return Response(
        {"message": "Contract status updated successfully"},
        status=status.HTTP_200_OK
    )
