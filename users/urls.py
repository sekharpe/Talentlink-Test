# from django.urls import path
# from .views import RegisterView, LoginView

# urlpatterns = [
#     path('register/', RegisterView.as_view(), name="user-register"),
#     path('login/', LoginView.as_view(), name="user-login"),
# ]
from django.urls import path
from .views import RegisterView, LoginView, UserDetailView, ProfileView

urlpatterns = [
    path("register/", RegisterView.as_view(), name="user-register"),
    path("login/", LoginView.as_view(), name="user-login"),
    path("user/<int:user_id>/", UserDetailView.as_view(), name="user-detail"),
    path("profile/", ProfileView.as_view()),
]
