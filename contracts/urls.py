from django.urls import path
from .views import my_contracts, update_contract_status

urlpatterns = [
    path("my/", my_contracts),
    path("<int:contract_id>/status/", update_contract_status),
]
