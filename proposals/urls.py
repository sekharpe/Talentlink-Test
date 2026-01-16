from django.urls import path
from .views import (
    ProposalCreateView,
    ProjectProposalListView,
    ProposalStatusUpdateView,
    MyProposalsView,
)

urlpatterns = [
    path("create/", ProposalCreateView.as_view(), name="proposal-create"),
    path(
        "project/<int:project_id>/",
        ProjectProposalListView.as_view(),
        name="project-proposals"
    ),
    path(
        "<int:pk>/status/",
        ProposalStatusUpdateView.as_view(),
        name="proposal-status-update"
    ),
    path("my/", MyProposalsView.as_view()),

]
