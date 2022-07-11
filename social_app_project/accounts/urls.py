from . import views
from django.urls import path

urlpatterns = [
    path('login/', views.LoginView.as_view(template_name='index.html'), name='login'),
    path('logout/', views.LogoutView.as_view(template_name='index.html'), name='logout'),
    path('verifyauthenticated/', views.VerifyAuthenticated.as_view()),
]
