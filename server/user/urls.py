from django.urls import path
from .views import get_user_info

urlpatterns = [
    path('info', get_user_info, name='get_user_info'),
]
