from django.urls import path
from chats.api_chats.views import CreateChatView, CreateMessageView, ChatListView, MessageListView, UserChatsView

urlpatterns = [
    path('chats/', ChatListView.as_view(), name='chat-list'),  # URL для списку чатів
    path('chats/<int:chat_id>/messages/', MessageListView.as_view(), name='message-list'),  # URL для повідомлень у чаті
    path('messages/', CreateMessageView.as_view(), name='create-message'),  # URL для створення повідомлення
    path('chats/create/', CreateChatView.as_view(), name='create-chat'),  # URL для створення чату
    path('user/chats/', UserChatsView.as_view(), name='user_chats'),  # Додаємо новий URL
]
