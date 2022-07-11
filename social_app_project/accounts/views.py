# Prebuilt views.

from django import views
from django.views.generic import View
from django.contrib.auth import views
from rest_framework.views import APIView

# Imports used in view logic.

from django.utils.http import url_has_allowed_host_and_scheme
from django.shortcuts import resolve_url
from django.conf import settings
from rest_framework.response import Response
from django.shortcuts import get_object_or_404
from django.contrib.sessions.models import Session
from django.contrib.auth import logout as auth_logout
from django.http import HttpResponseNotAllowed, HttpResponseRedirect, HttpResponseServerError
from django.core.exceptions import ImproperlyConfigured
from django.views.decorators.cache import never_cache
from django.utils.decorators import method_decorator

# Create your views here.

class VerifyAuthenticated(APIView): # Verifies if user has logged in and has a session stored. Returns 200 if successful else 404.
    
    def get(self, request):
        session_key = request.COOKIES.get("sessionid")
        session = get_object_or_404(Session, pk=session_key)
        return Response()

class LoginView(views.LoginView):

    next_page = "/"
    
    def get(self, request, *args, **kwargs): # Prevents GET method from being used so template won't be rendered and also prevents CSRF
        return HttpResponseNotAllowed(["POST"])

class LogoutView(views.LogoutView):

    next_page = "/"

    @method_decorator(never_cache)
    def post(self, request, *args, **kwargs):
        auth_logout(request)
        next_page = self.get_next_page()
        if next_page:
            # Redirect to this page until the session has been cleared.
            return HttpResponseRedirect(next_page)
        else:
            return HttpResponseServerError()
    
    def get(self, request, *args, **kwargs): # Prevents GET method from being used so template won't be rendered and also prevent CSRF
        return HttpResponseNotAllowed(["POST"])