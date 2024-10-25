from django.urls import path, include

urlpatterns = [
    path('users/', include('users.api_users.urls')),  # підключаємо шляхи користувачів
    path('chats/', include('chats.api_chats.urls')),  # підключаємо шляхи чатів і повідомлень
]
