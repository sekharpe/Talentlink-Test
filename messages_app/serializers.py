from rest_framework import serializers
from .models import Message


class MessageSerializer(serializers.ModelSerializer):
    sender_name = serializers.CharField(source="sender.name", read_only=True)
    receiver_name = serializers.CharField(source="receiver.name", read_only=True)

    class Meta:
        model = Message
        fields = [
            "id",
            "contract",
            "sender",
            "sender_name",
            "receiver",
            "receiver_name",
            "content",
            "timestamp",
            "is_read",
        ]
