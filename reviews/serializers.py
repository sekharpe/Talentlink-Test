# # from rest_framework import serializers
# # from .models import Review


# # class ReviewSerializer(serializers.ModelSerializer):
# #     reviewer_name = serializers.CharField(
# #         source="reviewer.username", read_only=True
# #     )

# #     class Meta:
# #         model = Review
# #         fields = [
# #             "id",
# #             "reviewer_name",
# #             "rating",
# #             "comment",
# #             "created_at",
# #         ]
# from rest_framework import serializers
# from .models import Review

# class ReviewSerializer(serializers.ModelSerializer):
#     reviewer_name = serializers.CharField(
#         source="reviewer.email", read_only=True
#     )

#     class Meta:
#         model = Review
#         fields = [
#             "id",
#             "reviewer_name",
#             "rating",
#             "comment",
#             "created_at",
#         ]

from rest_framework import serializers
from .models import Review


class ReviewSerializer(serializers.ModelSerializer):
    reviewer_name = serializers.SerializerMethodField()

    class Meta:
        model = Review
        fields = [
            "id",
            "reviewer_name",
            "rating",
            "comment",
            "created_at",
        ]

    def get_reviewer_name(self, obj):
        return str(obj.reviewer)
