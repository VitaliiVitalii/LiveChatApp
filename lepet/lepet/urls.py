from django.contrib import admin
from django.urls import path, include

urlpatterns = [
    path('admin/', admin.site.urls),
    path('rest_api/', include('users.api_users.urls')),  # заміни на ім'я свого додатку
]
