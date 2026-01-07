from rest_framework import generics, permissions, status
from rest_framework.views import APIView
from rest_framework.response import Response
from django.shortcuts import get_object_or_404

from .models import Proposal
from .serializers import ProposalSerializer

# ✅ NEW IMPORT
from contracts.models import Contract


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

        # 🔐 Only project owner can update
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

        # ❗ Prevent accepting if contract already exists for project
        if status_value == "accepted":
            if Contract.objects.filter(project=proposal.project).exists():
                return Response(
                    {"error": "A contract already exists for this project"},
                    status=status.HTTP_400_BAD_REQUEST
                )

        # ✅ Update proposal status
        proposal.status = status_value
        proposal.save()

        # ✅ CREATE CONTRACT WHEN ACCEPTED
        if status_value == "accepted":
            Contract.objects.create(
                project=proposal.project,
                proposal=proposal,
                client=proposal.project.client,
                freelancer=proposal.freelancer,
                amount=proposal.bid_amount
            )

        return Response(
            {"message": f"Proposal {status_value} successfully"},
            status=status.HTTP_200_OK
        )
