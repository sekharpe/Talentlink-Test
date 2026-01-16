# # from django.urls import path
# # from .views import NotificationListView,MarkNotificationReadView,UnreadNotificationCountView

# # urlpatterns = [
# #     path("notifications/", NotificationListView.as_view(), name="notifications"),
# #     path("notifications/<int:pk>/read/", MarkNotificationReadView.as_view()),
# #      path(
# #         "notifications/unread-count/",
# #         UnreadNotificationCountView.as_view()
# #     )
# # ]


# from django.urls import path
# from .views import (
#     NotificationListView,
#     MarkNotificationReadView,
#     UnreadNotificationCountView,
# )

# urlpatterns = [
#     path("notifications/", NotificationListView.as_view()),
#     path("notifications/<int:pk>/read/", MarkNotificationReadView.as_view()),
#     path(
#         "notifications/unread-count/",
#         UnreadNotificationCountView.as_view()
#     ),
# ]

from django.urls import path
from .views import (
    list_notifications,
    unread_count,
    mark_notification_read,
)

urlpatterns = [
    path("", list_notifications),  # GET /api/notifications/
    path("unread-count/", unread_count),  # GET /api/notifications/unread-count/
    path("<int:id>/mark-read/", mark_notification_read),  # POST /api/notifications/<id>/mark-read/
]

