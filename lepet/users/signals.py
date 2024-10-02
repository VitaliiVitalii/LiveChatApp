from django.contrib.auth.signals import user_logged_in, user_logged_out
from django.dispatch import receiver
from django.utils import timezone
from users.models import User


@receiver(user_logged_in)
def user_login(sender, request, user, **kwargs):
    user.is_online = True
    user.last_active = timezone.now()  # Оновлюємо час останньої активності
    user.save()


@receiver(user_logged_out)
def user_logout(sender, request, user, **kwargs):
    user.is_online = False
    user.last_active = timezone.now()  # Можна також оновлювати тут
    user.save()
