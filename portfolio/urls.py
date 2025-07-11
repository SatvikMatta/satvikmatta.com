from django.urls import path, include
from rest_framework.routers import DefaultRouter
from . import views

router = DefaultRouter()
router.register(r'projects', views.ProjectViewSet)
router.register(r'skills', views.SkillViewSet)
router.register(r'experience', views.ExperienceViewSet)

urlpatterns = [
    path('api/', include(router.urls)),
    path('api/summary/', views.portfolio_summary, name='portfolio_summary'),
]