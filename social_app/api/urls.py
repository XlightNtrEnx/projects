from . import views
from django.urls import path, include
from django.views.decorators.http import require_POST

urlpatterns = [
    path('login/', views.LoginView.as_view(template_name='index.html'), name='login'),
    path('logout/', views.LogoutView.as_view(template_name='index.html'), name='logout'),
    path('verifyauthenticated/', views.VerifyAuthenticated.as_view())
]
