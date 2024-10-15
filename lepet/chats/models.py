from django.db import models
from users.models import User


class Chat(models.Model):
    """Модель для представлення чату, який містить учасників."""

    participants = models.ManyToManyField(User, related_name='chats')
    created_at = models.DateTimeField(auto_now_add=True)  # Дата та час створення чату

    def __str__(self):
        """Повертає рядкове представлення чату."""
        return f"Чат між {', '.join([user.username for user in self.participants.all()])}"


class Message(models.Model):
    """Модель для представлення повідомлення в чаті."""

    chat = models.ForeignKey(Chat, related_name='messages', on_delete=models.CASCADE)  # Посилання на чат
    sender = models.ForeignKey(User, on_delete=models.CASCADE)  # Відправник повідомлення
    content = models.TextField()  # Вміст повідомлення
    created_at = models.DateTimeField(auto_now_add=True)  # Дата та час створення повідомлення

    def __str__(self):
        """Повертає рядкове представлення повідомлення."""
        return f"Повідомлення від {self.sender.username} у чаті {self.chat.id}"
