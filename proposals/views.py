

# # # Create your views here.
# # from rest_framework import generics, permissions, status
# # from rest_framework.views import APIView
# # from rest_framework.response import Response
# # from django.shortcuts import get_object_or_404

# # from .models import Proposal
# # from .serializers import ProposalSerializer


# # # ===================================
# # # Freelancer submits a proposal
# # # ===================================
# # class ProposalCreateView(generics.CreateAPIView):
# #     serializer_class = ProposalSerializer
# #     permission_classes = [permissions.IsAuthenticated]

# #     def perform_create(self, serializer):
# #         serializer.save(freelancer=self.request.user)


# # # ===================================
# # # Client views proposals for a project
# # # ===================================
# # class ProjectProposalListView(generics.ListAPIView):
# #     serializer_class = ProposalSerializer
# #     permission_classes = [permissions.IsAuthenticated]

# #     def get_queryset(self):
# #         project_id = self.kwargs["project_id"]
# #         return Proposal.objects.filter(project_id=project_id)


# # # ===================================
# # # Client accepts / rejects proposal
# # # ===================================
# # class ProposalStatusUpdateView(APIView):
# #     permission_classes = [permissions.IsAuthenticated]

# #     def patch(self, request, pk):
# #         proposal = get_object_or_404(Proposal, pk=pk)

# #         status_value = request.data.get("status")
# #         if status_value not in ["accepted", "rejected"]:
# #             return Response(
# #                 {"error": "Status must be 'accepted' or 'rejected'"},
# #                 status=status.HTTP_400_BAD_REQUEST
# #             )

# #         proposal.status = status_value
# #         proposal.save()

# #         return Response(
# #             {"message": "Proposal status updated successfully"},
# #             status=status.HTTP_200_OK
# #         )


# from rest_framework import generics, permissions, status
# from rest_framework.views import APIView
# from rest_framework.response import Response
# from django.shortcuts import get_object_or_404

# from .models import Proposal
# from .serializers import ProposalSerializer


# # ===============================
# # ADD THIS PERMISSION (NEW)
# # ===============================
# class IsFreelancer(permissions.BasePermission):
#     def has_permission(self, request, view):
#         return request.user.is_authenticated and request.user.role == "freelancer"


# # ===================================
# # Freelancer submits a proposal
# # ===================================
# class ProposalCreateView(generics.CreateAPIView):
#     serializer_class = ProposalSerializer

#     # 🔴 CHANGE HERE (ONLY)
#     permission_classes = [permissions.IsAuthenticated, IsFreelancer]

#     def perform_create(self, serializer):
#         serializer.save(freelancer=self.request.user)


# # ===================================
# # Client views proposals for a project
# # ===================================
# class ProjectProposalListView(generics.ListAPIView):
#     serializer_class = ProposalSerializer
#     permission_classes = [permissions.IsAuthenticated]

#     def get_queryset(self):
#         project_id = self.kwargs["project_id"]
#         return Proposal.objects.filter(project_id=project_id)


# # ===================================
# # Client accepts / rejects proposal
# # ===================================
# class ProposalStatusUpdateView(APIView):
#     permission_classes = [permissions.IsAuthenticated]

#     def patch(self, request, pk):
#         proposal = get_object_or_404(Proposal, pk=pk)

#         status_value = request.data.get("status")
#         if status_value not in ["accepted", "rejected"]:
#             return Response(
#                 {"error": "Status must be 'accepted' or 'rejected'"},
#                 status=status.HTTP_400_BAD_REQUEST
#             )

#         proposal.status = status_value
#         proposal.save()

#         return Response(
#             {"message": "Proposal status updated successfully"},
#             status=status.HTTP_200_OK
#         )



# from rest_framework import generics, permissions, status
# from rest_framework.views import APIView
# from rest_framework.response import Response
# from django.shortcuts import get_object_or_404

# from .models import Proposal
# from .serializers import ProposalSerializer


# # ===============================
# # ROLE-BASED PERMISSIONS
# # ===============================
# class IsFreelancer(permissions.BasePermission):
#     def has_permission(self, request, view):
#         return request.user.is_authenticated and request.user.role == "freelancer"


# class IsClient(permissions.BasePermission):
#     def has_permission(self, request, view):
#         return request.user.is_authenticated and request.user.role == "client"


# # ===================================
# # Freelancer submits a proposal
# # ===================================
# class ProposalCreateView(generics.CreateAPIView):
#     serializer_class = ProposalSerializer
#     permission_classes = [permissions.IsAuthenticated, IsFreelancer]

#     def perform_create(self, serializer):
#         serializer.save(freelancer=self.request.user)


# # ===================================
# # Freelancer views THEIR proposals
# # ===================================
# class MyProposalsView(generics.ListAPIView):
#     serializer_class = ProposalSerializer
#     permission_classes = [permissions.IsAuthenticated, IsFreelancer]

#     def get_queryset(self):
#         return Proposal.objects.filter(freelancer=self.request.user)


# # ===================================
# # Client views proposals for a project
# # ===================================
# class ProjectProposalListView(generics.ListAPIView):
#     serializer_class = ProposalSerializer
#     permission_classes = [permissions.IsAuthenticated, IsClient]

#     def get_queryset(self):
#         project_id = self.kwargs["project_id"]
#         return Proposal.objects.filter(project_id=project_id)


# # ===================================
# # Client accepts / rejects proposal
# # ===================================
# class ProposalStatusUpdateView(APIView):
#     permission_classes = [permissions.IsAuthenticated, IsClient]

#     def patch(self, request, pk):
#         proposal = get_object_or_404(Proposal, pk=pk)

#         status_value = request.data.get("status")
#         if status_value not in ["accepted", "rejected"]:
#             return Response(
#                 {"error": "Status must be 'accepted' or 'rejected'"},
#                 status=status.HTTP_400_BAD_REQUEST
#             )

#         proposal.status = status_value
#         proposal.save()

#         return Response(
#             {"message": "Proposal status updated successfully"},
#             status=status.HTTP_200_OK
#         )

from rest_framework import generics, permissions, status
from rest_framework.views import APIView
from rest_framework.response import Response
from django.shortcuts import get_object_or_404

from .models import Proposal
from .serializers import ProposalSerializer


# ===============================
# ROLE-BASED PERMISSIONS
# ===============================
class IsFreelancer(permissions.BasePermission):
    def has_permission(self, request, view):
        return request.user.is_authenticated and request.user.role == "freelancer"


class IsClient(permissions.BasePermission):
    def has_permission(self, request, view):
        return request.user.is_authenticated and request.user.role == "client"


# ===================================
# Freelancer submits a proposal
# ===================================
class ProposalCreateView(generics.CreateAPIView):
    serializer_class = ProposalSerializer
    permission_classes = [permissions.IsAuthenticated, IsFreelancer]

    def perform_create(self, serializer):
        # 🔐 freelancer auto-attached
        serializer.save(freelancer=self.request.user)


# ===================================
# Freelancer views THEIR proposals
# ===================================
class MyProposalsView(generics.ListAPIView):
    serializer_class = ProposalSerializer
    permission_classes = [permissions.IsAuthenticated, IsFreelancer]

    def get_queryset(self):
        return Proposal.objects.filter(freelancer=self.request.user)


# ===================================
# Client views proposals for a project
# ===================================
class ProjectProposalListView(generics.ListAPIView):
    serializer_class = ProposalSerializer
    permission_classes = [permissions.IsAuthenticated, IsClient]

    def get_queryset(self):
        project_id = self.kwargs["project_id"]

        # 🔐 Client can only view proposals of THEIR project
        return Proposal.objects.filter(
            project_id=project_id,
            project__client=self.request.user
        )


# ===================================
# Client accepts / rejects proposal
# ===================================
class ProposalStatusUpdateView(APIView):
    permission_classes = [permissions.IsAuthenticated, IsClient]

    def patch(self, request, pk):
        proposal = get_object_or_404(Proposal, pk=pk)

        # 🔐 IMPORTANT: Only project owner can update status
        if proposal.project.client != request.user:
            return Response(
                {"error": "You are not allowed to update this proposal"},
                status=status.HTTP_403_FORBIDDEN
            )

        status_value = request.data.get("status")
        if status_value not in ["accepted", "rejected"]:
            return Response(
                {"error": "Status must be 'accepted' or 'rejected'"},
                status=status.HTTP_400_BAD_REQUEST
            )

        proposal.status = status_value
        proposal.save()

        return Response(
            {"message": "Proposal status updated successfully"},
            status=status.HTTP_200_OK
        )

