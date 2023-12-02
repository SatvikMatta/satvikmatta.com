from django.urls import path
from .views import *

urlpatterns = [
    path('hello/', hello, name='hello'),
    path('', index, name='index')
]
