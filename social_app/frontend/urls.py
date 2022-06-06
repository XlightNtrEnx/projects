from django.contrib import admin
from django.urls import path, include
from .views import *
from django.contrib.auth import views

urlpatterns = [
    path('', index),
]
