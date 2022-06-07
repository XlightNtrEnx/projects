# Prebuilt views.

from django import views
from django.contrib.auth import views
from rest_framework.views import APIView

# Imports used in view logic.

from rest_framework.response import Response
from django.shortcuts import get_object_or_404
from django.contrib.sessions.models import Session
from django.http import HttpResponseNotAllowed

# Create your views here.

class VerifyAuthenticated(APIView): # Verifies if user has logged in and has a session stored. Returns 200 if successful else 404.
    
    def get(self, request):
        session_key = request.COOKIES.get("sessionid")
        session = get_object_or_404(Session, pk=session_key)
        return Response()

class LoginView(views.LoginView):
    
    def get(self, request, *args, **kwargs): # Prevents GET method from being used so template won't be rendered and also prevents CSRF
        return HttpResponseNotAllowed(["POST"])

class LogoutView(views.LogoutView):

    def post(self, request, *args, **kwargs): # Allows POST method to be used
        return super().get(request, *args, **kwargs)
    
    def get(self, request, *args, **kwargs): # Prevents GET method from being used so template won't be rendered and also prevent CSRF
        return HttpResponseNotAllowed(["POST"])