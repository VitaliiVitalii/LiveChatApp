from rest_framework import serializers

from chats.models import Chat, Message


class ChatSerializer(serializers.ModelSerializer):
    class Meta:
        model = Chat
        fields = ['id', 'participants']  # Додайте поля, які вам потрібні


class MessageSerializer(serializers.ModelSerializer):
    sender = serializers.PrimaryKeyRelatedField(read_only=True)

    class Meta:
        model = Message
        fields = ['chat', 'content', 'sender',
                  'created_at']  # Виключаємо 'sender', будемо встановлювати його автоматично

    def create(self, validated_data):
        request = self.context.get('request')
        sender = request.user  # Отримуємо аутентифікованого користувача
        # Створюємо повідомлення з автоматичною установкою відправника
        message = Message.objects.create(sender=sender, **validated_data)
        return message
