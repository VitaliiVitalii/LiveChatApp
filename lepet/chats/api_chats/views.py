from django.shortcuts import get_object_or_404
from rest_framework import generics, status, permissions, viewsets
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response

from chats.api_chats.serializers import ChatSerializer, MessageSerializer, ReactionSerializer
from chats.models import Chat, Message, Reaction


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
    permission_classes = [IsAuthenticated]


# Відображення повідомлень у конкретному чаті

class MessageListView(generics.ListAPIView):
    serializer_class = MessageSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        chat_id = self.kwargs['chat_id']
        return Message.objects.filter(chat__id=chat_id).select_related('author').prefetch_related('reactions')

    def list(self, request, *args, **kwargs):
        queryset = self.get_queryset()
        # Використовуємо MessageSerializer з параметром many=True для серіалізації всіх повідомлень
        message_data = self.get_serializer(queryset, many=True).data

        for message in message_data:
            reactions = [ReactionSerializer(reaction).data for reaction in
                         queryset.get(id=message['id']).reactions.all()]
            message['reactions'] = reactions

        return Response(message_data)


class UserChatsView(generics.ListAPIView):
    """Клас для отримання чату, в якому бере участь користувач."""

    permission_classes = [IsAuthenticated]  # Дозволяє доступ тільки авторизованим користувачам
    serializer_class = ChatSerializer  # Вказуємо серіалізатор

    def get_queryset(self):
        user = self.request.user  # Отримуємо аутентифікованого користувача
        return Chat.objects.filter(participants=user)  # Повертаємо чати, в яких бере участь користувач


class ReactionCreateView(generics.CreateAPIView):
    """Представлення для створення реакції на повідомлення."""

    queryset = Reaction.objects.all()
    serializer_class = ReactionSerializer
    permission_classes = [permissions.IsAuthenticated]

    def perform_create(self, serializer):
        message_id = self.kwargs['message_id']  # Отримуємо message_id з URL
        message = get_object_or_404(Message, id=message_id)  # Знаходимо повідомлення по ID
        serializer.save(user=self.request.user, message=message)  # Зберігаємо користувача і повідомлення


class MessageReactionsView(generics.ListAPIView):
    """Представлення для отримання всіх реакцій на конкретне повідомлення."""

    serializer_class = ReactionSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        message_id = self.kwargs['message_id']
        return Reaction.objects.filter(message_id=message_id)
