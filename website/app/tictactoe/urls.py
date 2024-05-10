from django.urls import path

from tictactoe import views

urlpatterns = [
    path("", views.index, name="index"),
]