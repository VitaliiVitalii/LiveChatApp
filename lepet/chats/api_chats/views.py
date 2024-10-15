from django.shortcuts import get_object_or_404
from rest_framework import generics, status
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response

from chats.api_chats.serializers import ChatSerializer, MessageSerializer
from chats.models import Chat, Message


class CreateChatView(generics.CreateAPIView):
    """Клас для створення нового чату."""

    queryset = Chat.objects.all()
    serializer_class = ChatSerializer
    permission_classes = [IsAuthenticated]  # Дозволяє доступ тільки авторизованим користувачам

    def create(self, request, *args, **kwargs):
        participants = request.data.get('participants', [])

        # Перевірка на кількість учасників
        if len(participants) != 2:
            return Response({'detail': 'Чат може бути створений лише з двома учасниками.'},
                            status=status.HTTP_400_BAD_REQUEST)

        # Перевірка на унікальність чату
        existing_chat = Chat.objects.filter(participants__in=participants).distinct()
        if existing_chat.exists():
            return Response({'detail': 'Чат між цими учасниками вже існує.'},
                            status=status.HTTP_400_BAD_REQUEST)

        return super().create(request, *args, **kwargs)


class CreateMessageView(generics.CreateAPIView):
    queryset = Message.objects.all()
    serializer_class = MessageSerializer
    permission_classes = [IsAuthenticated]  # Дозволити тільки авторизованим користувачам

    def perform_create(self, serializer):
        chat_id = self.request.data.get('chat')
        chat = get_object_or_404(Chat, id=chat_id)  # Перевіряємо, чи існує чат
        serializer.save(chat=chat)


class ChatListView(generics.ListAPIView):
    queryset = Chat.objects.all()
    serializer_class = ChatSerializer
    permission_classes = [IsAuthenticated]  # Дозволити тільки авторизованим користувачам


# Відображення повідомлень у конкретному чаті
class MessageListView(generics.ListAPIView):
    serializer_class = MessageSerializer
    permission_classes = [IsAuthenticated]  # Дозволити тільки авторизованим користувачам

    def get_queryset(self):
        chat_id = self.kwargs['chat_id']  # Отримуємо chat_id з URL
        return Message.objects.filter(chat__id=chat_id)  # Повертаємо всі повідомлення для конкретного чату


class UserChatsView(generics.ListAPIView):
    """Клас для отримання чату, в якому бере участь користувач."""

    permission_classes = [IsAuthenticated]  # Дозволяє доступ тільки авторизованим користувачам
    serializer_class = ChatSerializer  # Вказуємо серіалізатор

    def get_queryset(self):
        user = self.request.user  # Отримуємо аутентифікованого користувача
        return Chat.objects.filter(participants=user)  # Повертаємо чати, в яких бере участь користувач
