from rest_framework import serializers
from .models import Contract


class ContractSerializer(serializers.ModelSerializer):
    project_title = serializers.CharField(source="project.title", read_only=True)
    freelancer_name = serializers.CharField(source="freelancer.name", read_only=True)
    client_name = serializers.CharField(source="client.name", read_only=True)

    class Meta:
        model = Contract
        fields = [
            "id",
            "project",
            "project_title",
            "client",
            "client_name",
            "freelancer",
            "freelancer_name",
            "amount",
            "status",
            "start_date",
            "end_date",
        ]
