from rest_framework import serializers
from chats.models import Chat, Message, Reaction


class ChatSerializer(serializers.ModelSerializer):
    class Meta:
        model = Chat
        fields = ['id', 'participants']  # Додайте поля, які вам потрібні


class ReactionSerializer(serializers.ModelSerializer):
    """Серіалізатор для реакцій на повідомлення."""

    class Meta:
        model = Reaction
        fields = ['emoji']


class MessageSerializer(serializers.ModelSerializer):
    sender = serializers.PrimaryKeyRelatedField(read_only=True)
    reactions = ReactionSerializer(many=True, read_only=True)

    class Meta:
        model = Message
        fields = ['id', 'chat', 'content', 'sender',
                  'created_at', 'reactions']  # Виключаємо 'sender', будемо встановлювати його автоматично

    def create(self, validated_data):
        request = self.context.get('request')
        sender = request.user  # Отримуємо аутентифікованого користувача
        # Створюємо повідомлення з автоматичною установкою відправника
        message = Message.objects.create(sender=sender, **validated_data)
        return message
