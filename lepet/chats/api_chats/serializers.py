from rest_framework import serializers
from chats.models import Chat, Message, Reaction


class ReactionSerializer(serializers.ModelSerializer):
    class Meta:
        model = Reaction
        fields = ['emoji']


class MessageSerializer(serializers.ModelSerializer):
    sender = serializers.PrimaryKeyRelatedField(read_only=True)
    reactions = ReactionSerializer(many=True, read_only=True)

    class Meta:
        model = Message
        fields = ['id', 'chat', 'content', 'sender', 'created_at', 'reactions']

    def create(self, validated_data):
        request = self.context.get('request')
        sender = request.user  # Отримуємо аутентифікованого користувача
        message = Message.objects.create(sender=sender, **validated_data)
        return message


class ChatSerializer(serializers.ModelSerializer):
    last_message = MessageSerializer(read_only=True)

    class Meta:
        model = Chat
        fields = ['id', 'participants', 'created_at', 'last_message']
