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

    TEXT = 'text'
    IMAGE = 'image'
    VIDEO = 'video'
    FILE = 'file'

    MESSAGE_TYPE_CHOICES = [
        (TEXT, 'Текст'),
        (IMAGE, 'Зображення'),
        (VIDEO, 'Відео'),
        (FILE, 'Файл'),
    ]

    chat = models.ForeignKey(Chat, related_name='messages', on_delete=models.CASCADE)  # Посилання на чат
    sender = models.ForeignKey(User, on_delete=models.CASCADE)  # Відправник повідомлення
    content = models.TextField(blank=True)  # Вміст текстового повідомлення (дозволяє бути порожнім для медіа)

    # Поля для медіа
    image = models.ImageField(upload_to='uploads/images/', null=True, blank=True)  # Поле для зображення
    video = models.FileField(upload_to='uploads/videos/', null=True, blank=True)  # Поле для відео
    file = models.FileField(upload_to='uploads/files/', null=True, blank=True)  # Поле для файлів (інше)

    # Поля для статусу та реакцій
    is_read = models.BooleanField(default=False)  # Статус прочитано
    created_at = models.DateTimeField(auto_now_add=True)  # Дата та час створення повідомлення

    def __str__(self):
        """Повертає рядкове представлення повідомлення."""
        return f"Повідомлення від {self.sender.username} у чаті {self.chat.id}"


class Reaction(models.Model):
    """Модель для представлення реакції на повідомлення."""

    REACTION_CHOICES = [
        ('😊', 'Посмішка'),
        ('❤️', 'Серце'),
        ('😂', 'Сміх'),
        ('😢', 'Сльози'),
        ('😡', 'Гнів'),
        ('👍', 'Добре'),
        ('👎', 'Погано'),
    ]

    message = models.ForeignKey(Message, related_name='reactions',
                                on_delete=models.CASCADE)  # Посилання на повідомлення
    user = models.ForeignKey(User, on_delete=models.CASCADE)  # Користувач, який поставив реакцію
    emoji = models.CharField(max_length=10, choices=REACTION_CHOICES)  # Код емодзі або текстова репрезентація реакції
    created_at = models.DateTimeField(auto_now_add=True)  # Дата та час створення реакції

    class Meta:
        unique_together = (
            'message', 'user')  # Забороняємо повторне використання однієї і тієї ж реакції одним користувачем

    def __str__(self):
        """Повертає рядкове представлення реакції."""
        return f"{self.user.username} reacted with {self.emoji} to message {self.message.id}"
