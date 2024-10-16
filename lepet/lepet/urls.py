from django.contrib import admin
from django.urls import path, include

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api_login/', include('users.api_users.urls')),
    path('api_chats/', include('chats.api_chats.urls')),
]
