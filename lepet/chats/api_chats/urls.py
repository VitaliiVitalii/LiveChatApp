from django.urls import path
from .views import CreateChatView, CreateMessageView, ChatListView, MessageListView, UserChatsView, \
    ReactionCreateView, MessageReactionsView

urlpatterns = [
    path('create/', CreateChatView.as_view(), name='chat_create'),
    path('', ChatListView.as_view(), name='chat_list'),
    path('user/', UserChatsView.as_view(), name='user_chats'),
    path('messages/create/', CreateMessageView.as_view(), name='message_create'),
    path('<int:chat_id>/messages/', MessageListView.as_view(), name='chat_messages'),
    path('messages/<int:message_id>/reactions/', ReactionCreateView.as_view(), name='reaction_create'),
    path('messages/<int:message_id>/reactions/list/', MessageReactionsView.as_view(), name='message_reactions'),
]