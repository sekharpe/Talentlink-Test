from django.urls import path
from .views import get_contract_messages, send_message

urlpatterns = [
    path("contract/<int:contract_id>/", get_contract_messages),
    path("send/", send_message),
]
