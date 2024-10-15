from rest_framework import generics
from .api_chats.serializers import ChatSerializer
from .models import Chat


class CreateChatView(generics.CreateAPIView):
    queryset = Chat.objects.all()
    serializer_class = ChatSerializer
