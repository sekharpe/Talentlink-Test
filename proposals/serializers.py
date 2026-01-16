from rest_framework import serializers
from .models import Proposal


class ProposalSerializer(serializers.ModelSerializer):
    freelancer_name = serializers.CharField(
        source="freelancer.name", read_only=True
    )
    project_title = serializers.CharField(
        source="project.title", read_only=True
    )

    class Meta:
        model = Proposal
        fields = "__all__"
        read_only_fields = [
            "freelancer",
            "status",
            "created_at"
        ]
