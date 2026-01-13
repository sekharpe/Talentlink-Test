# from rest_framework.views import APIView
# from rest_framework.permissions import IsAuthenticated
# from rest_framework.response import Response
# from rest_framework import status

# from .models import Review
# from contracts.models import Contract


# class CreateReviewView(APIView):
#     permission_classes = [IsAuthenticated]

#     def post(self, request):
#         project_id = request.data.get("project")
#         reviewed_user_id = request.data.get("reviewed_user")
#         rating = request.data.get("rating")
#         comment = request.data.get("comment", "")

#         # 1️⃣ Get contract for project
#         try:
#             contract = Contract.objects.get(project_id=project_id)
#         except Contract.DoesNotExist:
#             return Response(
#                 {"error": "No contract exists for this project"},
#                 status=status.HTTP_400_BAD_REQUEST
#             )

#         # 2️⃣ Check contract is completed
#         if contract.status != "completed":
#             return Response(
#                 {"error": "Review allowed only after contract completion"},
#                 status=status.HTTP_400_BAD_REQUEST
#             )

#         # 3️⃣ Check reviewer is part of contract
#         if request.user not in [contract.client, contract.freelancer]:
#             return Response(
#                 {"error": "You are not allowed to review this project"},
#                 status=status.HTTP_403_FORBIDDEN
#             )

#         # 4️⃣ Prevent duplicate review
#         if Review.objects.filter(
#             reviewer=request.user,
#             project_id=project_id
#         ).exists():
#             return Response(
#                 {"error": "You already reviewed this project"},
#                 status=status.HTTP_400_BAD_REQUEST
#             )

#         # 5️⃣ Create review
#         Review.objects.create(
#             reviewer=request.user,
#             reviewed_user_id=reviewed_user_id,
#             project_id=project_id,
#             rating=rating,
#             comment=comment
#         )

#         return Response(
#             {"message": "Review submitted successfully"},
#             status=status.HTTP_201_CREATED
#         )

from rest_framework.views import APIView
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework import status
from django.db.models import Avg

from .models import Review
from .serializers import ReviewSerializer
from contracts.models import Contract


class CreateReviewView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request):
        project_id = request.data.get("project")
        reviewed_user_id = request.data.get("reviewed_user")
        rating = request.data.get("rating")
        comment = request.data.get("comment", "")

        contract = Contract.objects.filter(
            project_id=project_id,
            status="completed"
        ).first()

        if not contract:
            return Response(
                {"error": "No completed contract exists for this project"},
                status=status.HTTP_400_BAD_REQUEST
            )

        if request.user not in [contract.client, contract.freelancer]:
            return Response(
                {"error": "You are not allowed to review this project"},
                status=status.HTTP_403_FORBIDDEN
            )

        if Review.objects.filter(
            reviewer=request.user,
            project_id=project_id
        ).exists():
            return Response(
                {"error": "You already reviewed this project"},
                status=status.HTTP_400_BAD_REQUEST
            )

        Review.objects.create(
            reviewer=request.user,
            reviewed_user_id=reviewed_user_id,
            project_id=project_id,
            rating=rating,
            comment=comment
        )

        return Response(
            {"message": "Review submitted successfully"},
            status=status.HTTP_201_CREATED
        )


class UserReviewsView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request, user_id):
        reviews = Review.objects.filter(
            reviewed_user_id=user_id
        ).order_by("-created_at")

        average_rating = reviews.aggregate(avg=Avg("rating"))["avg"]

        serializer = ReviewSerializer(reviews, many=True)

        return Response({
            "average_rating": round(average_rating, 1) if average_rating else 0,
            "total_reviews": reviews.count(),
            "reviews": serializer.data
        })
