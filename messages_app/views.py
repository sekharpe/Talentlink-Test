# from rest_framework.decorators import api_view, permission_classes
# from rest_framework.permissions import IsAuthenticated
# from rest_framework.response import Response
# from rest_framework import status
# from django.shortcuts import get_object_or_404

# from .models import Message
# from .serializers import MessageSerializer
# from contracts.models import Contract


# # ===============================
# # GET messages for a contract
# # ===============================
# @api_view(["GET"])
# @permission_classes([IsAuthenticated])
# def get_contract_messages(request, contract_id):
#     contract = get_object_or_404(Contract, id=contract_id)

#     # 🔐 Only client or freelancer of the contract can view messages
#     if request.user not in [contract.client, contract.freelancer]:
#         return Response(
#             {"error": "You are not allowed to view these messages"},
#             status=status.HTTP_403_FORBIDDEN
#         )

#     messages = Message.objects.filter(contract=contract).order_by("timestamp")
#     serializer = MessageSerializer(messages, many=True)
#     return Response(serializer.data, status=status.HTTP_200_OK)


# # ===============================
# # SEND a message
# # ===============================
# @api_view(["POST"])
# @permission_classes([IsAuthenticated])
# def send_message(request):
#     contract_id = request.data.get("contract")
#     content = request.data.get("content")

#     if not contract_id or not content:
#         return Response(
#             {"error": "contract and content are required"},
#             status=status.HTTP_400_BAD_REQUEST
#         )

#     contract = get_object_or_404(Contract, id=contract_id)

#     # 🔐 Only client or freelancer can send message
#     if request.user not in [contract.client, contract.freelancer]:
#         return Response(
#             {"error": "You are not allowed to send messages for this contract"},
#             status=status.HTTP_403_FORBIDDEN
#         )

#     # Determine receiver
#     receiver = (
#         contract.freelancer if request.user == contract.client else contract.client
#     )

#     message = Message.objects.create(
#         contract=contract,
#         sender=request.user,
#         receiver=receiver,
#         content=content
#     )

#     serializer = MessageSerializer(message)
#     return Response(serializer.data, status=status.HTTP_201_CREATED)
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework import status
from django.shortcuts import get_object_or_404

from .models import Message
from .serializers import MessageSerializer
from contracts.models import Contract

# ✅ ADD THIS IMPORT
from notifications.utils import create_notification


# ===============================
# GET messages for a contract
# ===============================
@api_view(["GET"])
@permission_classes([IsAuthenticated])
def get_contract_messages(request, contract_id):
    contract = get_object_or_404(Contract, id=contract_id)

    # 🔐 Only client or freelancer of the contract can view messages
    if request.user not in [contract.client, contract.freelancer]:
        return Response(
            {"error": "You are not allowed to view these messages"},
            status=status.HTTP_403_FORBIDDEN
        )

    messages = Message.objects.filter(contract=contract).order_by("timestamp")
    serializer = MessageSerializer(messages, many=True)
    return Response(serializer.data, status=status.HTTP_200_OK)


# ===============================
# SEND a message
# ===============================
@api_view(["POST"])
@permission_classes([IsAuthenticated])
def send_message(request):
    contract_id = request.data.get("contract")
    content = request.data.get("content")

    if not contract_id or not content:
        return Response(
            {"error": "contract and content are required"},
            status=status.HTTP_400_BAD_REQUEST
        )

    contract = get_object_or_404(Contract, id=contract_id)

    # 🔐 Only client or freelancer can send message
    if request.user not in [contract.client, contract.freelancer]:
        return Response(
            {"error": "You are not allowed to send messages for this contract"},
            status=status.HTTP_403_FORBIDDEN
        )

    # Determine receiver
    receiver = (
        contract.freelancer if request.user == contract.client else contract.client
    )

    message = Message.objects.create(
        contract=contract,
        sender=request.user,
        receiver=receiver,
        content=content
    )

    # ✅ ADD NOTIFICATION (THIS IS THE KEY PART)
    sender_name = getattr(request.user, "name", request.user.email)
    create_notification(
        user=receiver,
        message=f"{sender_name} sent you a message"
    )

    serializer = MessageSerializer(message)
    return Response(serializer.data, status=status.HTTP_201_CREATED)
