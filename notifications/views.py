# from rest_framework.generics import ListAPIView
# from rest_framework.permissions import IsAuthenticated
# from .models import Notification
# from .serializers import NotificationSerializer

# class NotificationListView(ListAPIView):
#     serializer_class = NotificationSerializer
#     permission_classes = [IsAuthenticated]

#     def get_queryset(self):
#         return Notification.objects.filter(
#             user=self.request.user
#         ).order_by("-created_at")


# from rest_framework.generics import ListAPIView
# from rest_framework.views import APIView
# from rest_framework.permissions import IsAuthenticated
# from rest_framework.response import Response
# from rest_framework import status
# from django.shortcuts import get_object_or_404

# from .models import Notification
# from .serializers import NotificationSerializer


# # 🔔 STEP 3: List notifications
# class NotificationListView(ListAPIView):
#     serializer_class = NotificationSerializer
#     permission_classes = [IsAuthenticated]

#     def get_queryset(self):
#         return Notification.objects.filter(
#             user=self.request.user
#         ).order_by("-created_at")


# # 🔔 STEP 4: Mark notification as read
# class MarkNotificationReadView(APIView):
#     permission_classes = [IsAuthenticated]

#     def patch(self, request, pk):
#         notification = get_object_or_404(
#             Notification,
#             id=pk,
#             user=request.user
#         )

#         notification.is_read = True
#         notification.save()

#         return Response(
#             {"message": "Notification marked as read"},
#             status=status.HTTP_200_OK
#         )

# class UnreadNotificationCountView(APIView):
#     permission_classes = [IsAuthenticated]

#     def get(self, request):
#         unread_count = Notification.objects.filter(
#             user=request.user,
#             is_read=False
#         ).count()

#         return Response({
#             "unread_count": unread_count
#         })

from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from django.shortcuts import get_object_or_404
from .models import Notification


@api_view(["GET"])
@permission_classes([IsAuthenticated])
def list_notifications(request):
    notifications = Notification.objects.filter(
        user=request.user
    ).order_by("-created_at")

    return Response([
        {
            "id": n.id,
            "message": n.message,
            "is_read": n.is_read,
            "created_at": n.created_at,
        }
        for n in notifications
    ])


@api_view(["GET"])
@permission_classes([IsAuthenticated])
def unread_count(request):
    count = Notification.objects.filter(
        user=request.user,
        is_read=False
    ).count()
    return Response({"unread_count": count})


@api_view(["POST"])
@permission_classes([IsAuthenticated])
def mark_notification_read(request, id):
    notification = get_object_or_404(
        Notification,
        id=id,
        user=request.user
    )
    notification.is_read = True
    notification.save()
    return Response({"success": True})


