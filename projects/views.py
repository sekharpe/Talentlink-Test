

# from rest_framework import viewsets, permissions
# from .models import Project
# from .serializers import ProjectSerializer
# from django_filters.rest_framework import DjangoFilterBackend
# from rest_framework import filters

# # Permission: Only clients can post projects
# class IsClient(permissions.BasePermission):
#     def has_permission(self, request, view):
#         return request.user.is_authenticated and request.user.role == 'client'

# class ProjectViewSet(viewsets.ModelViewSet):
#     serializer_class = ProjectSerializer
#     permission_classes = [permissions.IsAuthenticated, IsClient]
#     queryset = Project.objects.all()

#     filter_backends = [DjangoFilterBackend, filters.SearchFilter]
#     filterset_fields = ['budget', 'skills_required']  # you can add duration if needed
#     search_fields = ['title', 'description']

#     def perform_create(self, serializer):
#         serializer.save(client=self.request.user)

from rest_framework import viewsets, permissions
from .models import Project
from .serializers import ProjectSerializer
from django_filters.rest_framework import DjangoFilterBackend
from rest_framework import filters
from rest_framework.generics import ListAPIView
from rest_framework.permissions import IsAuthenticated


# Permission: Only clients can create/update/delete projects
class IsClient(permissions.BasePermission):
    def has_permission(self, request, view):
        return request.user.is_authenticated and request.user.role == 'client'


class ProjectViewSet(viewsets.ModelViewSet):
    queryset = Project.objects.all()
    serializer_class = ProjectSerializer

    filter_backends = [DjangoFilterBackend, filters.SearchFilter]
    filterset_fields = ['budget', 'skills_required']
    search_fields = ['title', 'description']

    def get_permissions(self):
        """
        Allow anyone to view projects.
        Only clients can create/update/delete.
        """
        if self.action in ['list', 'retrieve']:
            return [permissions.AllowAny()]
        return [permissions.IsAuthenticated(), IsClient()]

    def perform_create(self, serializer):
        serializer.save(client=self.request.user)

class MyProjectsView(ListAPIView):
    serializer_class = ProjectSerializer
    permission_classes = [IsAuthenticated, IsClient]

    def get_queryset(self):
        return Project.objects.filter(client=self.request.user)