# from django.urls import path
# from .views import CreateReviewView

# urlpatterns = [
#     path("reviews/create/", CreateReviewView.as_view()),
# ]

from django.urls import path
from .views import CreateReviewView, UserReviewsView

urlpatterns = [
    path("create/", CreateReviewView.as_view()),
    path("user/<int:user_id>/", UserReviewsView.as_view()),
]
