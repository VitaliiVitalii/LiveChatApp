from django.urls import path
from chats.api_chats.views import CreateChatView, CreateMessageView, ChatListView, MessageListView, UserChatsView, \
    ReactionCreateView, MessageReactionsView

urlpatterns = [
    path('', ChatListView.as_view(), name='chat_list'),
    path('create/', CreateChatView.as_view(), name='chat_create'),
    path('chats/<int:chat_id>/messages/', MessageListView.as_view(), name='chat_messages'),
    path('user/chats/', UserChatsView.as_view(), name='user_chats'),
    path('messages/create/', CreateMessageView.as_view(), name='message_create'),
    path('messages/<int:message_id>/reactions/', ReactionCreateView.as_view(), name='reaction_create'),
    path('messages/<int:message_id>/reactions/list/', MessageReactionsView.as_view(), name='message_reactions'),
]