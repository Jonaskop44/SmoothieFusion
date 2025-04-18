from django.urls import path
from .views import signup, login, verify_access_token, refresh_token

urlpatterns = [
    path('signup/', signup, name='signup'),
    path('login/', login, name='login'),
    path('verify-token/', verify_access_token, name='verify_token'),
    path('refresh-token/', refresh_token, name='refresh_token'),
]
