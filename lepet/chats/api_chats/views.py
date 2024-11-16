from django.shortcuts import get_object_or_404
from rest_framework import generics, status, permissions
from rest_framework.exceptions import PermissionDenied
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from chats.api_chats.serializers import ChatSerializer, MessageSerializer, ReactionSerializer
from chats.models import Chat, Message, Reaction


class CreateChatView(generics.CreateAPIView):
    queryset = Chat.objects.all()
    serializer_class = ChatSerializer
    permission_classes = [IsAuthenticated]

    def create(self, request, *args, **kwargs):
        participants = request.data.get('participants', [])

        if len(participants) != 2:
            return Response({'detail': 'Чат може бути створений лише з двома учасниками.'},
                            status=status.HTTP_400_BAD_REQUEST)

        existing_chat = Chat.objects.filter(participants__in=participants).distinct()
        if existing_chat.exists():
            return Response({'detail': 'Чат між цими учасниками вже існує.'},
                            status=status.HTTP_400_BAD_REQUEST)

        return super().create(request, *args, **kwargs)


class CreateMessageView(generics.CreateAPIView):
    queryset = Message.objects.all()
    serializer_class = MessageSerializer
    permission_classes = [IsAuthenticated]

    def perform_create(self, serializer):
        chat_id = self.request.data.get('chat')
        chat = get_object_or_404(Chat, id=chat_id)

        if self.request.user not in chat.participants.all():
            raise PermissionDenied("Ви не маєте доступу до цього чату.")

        serializer.save(chat=chat, sender=self.request.user)


class ChatListView(generics.ListAPIView):
    serializer_class = ChatSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        return Chat.objects.filter(participants=self.request.user)


class MessageListView(generics.ListAPIView):
    serializer_class = MessageSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        chat_id = self.kwargs['chat_id']
        chat = get_object_or_404(Chat, id=chat_id)

        if self.request.user not in chat.participants.all():
            raise PermissionDenied("Ви не маєте доступу до цього чату.")

        return chat.messages.select_related('author').prefetch_related('reactions')

    def list(self, request, *args, **kwargs):
        queryset = self.get_queryset()
        message_data = self.get_serializer(queryset, many=True).data

        for message in message_data:
            reactions = [ReactionSerializer(reaction).data for reaction in
                         queryset.get(id=message['id']).reactions.all()]
            message['reactions'] = reactions

        return Response(message_data)


class UserChatsView(generics.ListAPIView):
    permission_classes = [IsAuthenticated]
    serializer_class = ChatSerializer

    def get_queryset(self):
        user = self.request.user
        return Chat.objects.filter(participants=user)


class ReactionCreateView(generics.CreateAPIView):
    queryset = Reaction.objects.all()
    serializer_class = ReactionSerializer
    permission_classes = [permissions.IsAuthenticated]

    def perform_create(self, serializer):
        message_id = self.kwargs['message_id']
        message = get_object_or_404(Message, id=message_id)

        if self.request.user not in message.chat.participants.all():
            raise PermissionDenied("Ви не маєте доступу до цього чату.")

        serializer.save(user=self.request.user, message=message)


class MessageReactionsView(generics.ListAPIView):
    serializer_class = ReactionSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        message_id = self.kwargs['message_id']
        message = get_object_or_404(Message, id=message_id)

        if self.request.user not in message.chat.participants.all():
            raise PermissionDenied("Ви не маєте доступу до цього чату.")

        return message.reactions.all()
