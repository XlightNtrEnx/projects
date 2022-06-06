from ast import For
from django import views
from django.http import HttpResponse
from rest_framework.views import APIView
from django.views.generic.edit import BaseFormView
from django.views.generic import View
from django.shortcuts import render
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from django.views.decorators.cache import never_cache
from django.views.decorators.csrf import csrf_protect
from django.views.decorators.debug import sensitive_post_parameters
from django.utils.decorators import method_decorator
from django.contrib.auth.forms import AuthenticationForm
from django.contrib.auth import authenticate, login, logout
from rest_framework.parsers import FormParser
from django.shortcuts import get_object_or_404
from django.contrib.sessions.models import Session
from rest_framework.response import Response
from django.contrib.auth import views
from django.http import HttpResponseNotAllowed

# Create your views here.

class VerifyAuthenticated(APIView):
    
    def get(self, request):
        session_key = request.COOKIES.get("sessionid")
        session = get_object_or_404(Session, pk=session_key)
        return Response()

class LoginView(views.LoginView):
    
    def get(self, request, *args, **kwargs):
        return HttpResponseNotAllowed(["POST"])

class LogoutView(views.LogoutView):
    pass