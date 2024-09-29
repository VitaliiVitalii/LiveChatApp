import uuid
import transliterate
from django.core.exceptions import ValidationError
from phonenumber_field.modelfields import PhoneNumberField
from django.contrib.auth.models import AbstractUser
from django.db import models


class User(AbstractUser):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    phone_number = PhoneNumberField(unique=True, region='UA')  # Унікальний номер телефону
    profile_picture = models.ImageField(upload_to='profile_pictures/', blank=True, null=True)
    bio = models.CharField(max_length=70, blank=True, null=True)  # Поле біо, необов'язкове

    # Обов'язкові поля при створенні користувача
    REQUIRED_FIELDS = ['phone_number', 'first_name', 'last_name']

    def save(self, *args, **kwargs):
        # Генерація нікнейму, тільки якщо він не заданий і є ім'я та прізвище
        if not self.username and (self.first_name and self.last_name):
            self.username = self.generate_username()

        # Перевірка на унікальність username перед збереженням
        if User.objects.filter(username=self.username).exclude(pk=self.pk).exists():
            raise ValidationError(f'Username "{self.username}" is already taken.')

        # Перевірка на унікальність email перед збереженням
        if self.email and User.objects.filter(email=self.email).exclude(pk=self.pk).exists():
            raise ValidationError(f'Email "{self.email}" is already taken.')

        # Перевірка на унікальність phone_number перед збереженням
        if User.objects.filter(phone_number=self.phone_number).exclude(pk=self.pk).exists():
            raise ValidationError(f'Phone number "{self.phone_number}" is already taken.')

        super(User, self).save(*args, **kwargs)

    def generate_username(self):
        """Генерує username з імені та прізвища, транслітеруючи українські символи."""
        first_name_transliterated = transliterate.translit(self.first_name, 'uk', reversed=True)
        last_name_transliterated = transliterate.translit(self.last_name, 'uk', reversed=True)

        # Створюємо базовий нікнейм
        username_base = f"{first_name_transliterated.lower()}_{last_name_transliterated.lower()}"
        username = username_base
        counter = 1

        # Унікальність нікнейму
        while User.objects.filter(username=username).exists():
            username = f"{username_base}_{counter}"
            counter += 1

        return username

    def __str__(self):
        return self.username
