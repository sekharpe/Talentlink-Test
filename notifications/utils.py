from .models import Notification

def create_notification(user, message, type="info"):
    """
    Creates an in-app notification for a user
    """
    Notification.objects.create(
        user=user,
        message=message,
        type=type
    )
