from django.urls import path
from . import views

urlpatterns = [
    path('api/projects/', views.projects_list, name='projects_list'),
    path('api/skills/', views.skills_list, name='skills_list'),
    path('api/experience/', views.experience_list, name='experience_list'),
    path('api/summary/', views.portfolio_summary, name='portfolio_summary'),
]