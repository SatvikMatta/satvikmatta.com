from django.urls import path
from backend import views

urlpatterns = [
    # path('', views.index, name='index'),
    path('predict', views.fire_probability, name='predict')
]