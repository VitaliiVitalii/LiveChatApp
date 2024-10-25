from django.contrib.auth import authenticate
from phonenumber_field.serializerfields import PhoneNumberField
from rest_framework import serializers
from users.models import User


class UserSerializer(serializers.ModelSerializer):
    phone_number = PhoneNumberField(region='UA')

    class Meta:
        model = User
        fields = [
            'id', 'username', 'is_online', 'last_active', 'phone_number',
            'email', 'first_name', 'last_name', 'profile_picture', 'bio', 'password'
        ]
        extra_kwargs = {
            'username': {'required': False},
            'password': {'write_only': True}  # Пароль тільки для запису
        }

    def create(self, validated_data):
        """Метод для створення нового користувача."""
        print(f"Received phone_number: {validated_data.get('phone_number')}")

        if not validated_data.get('username'):
            first_name = validated_data.get('first_name', '')
            last_name = validated_data.get('last_name', '')
            user_instance = User(first_name=first_name, last_name=last_name)
            validated_data['username'] = user_instance.generate_username()

        user = User(**validated_data)
        user.set_password(validated_data.pop('password'))  # Зберігаємо пароль у зашифрованому вигляді
        user.save()
        print(f'Created user: {user}')
        return user

    def update(self, instance, validated_data):
        """Метод для оновлення даних користувача."""
        for attr, value in validated_data.items():
            if attr == 'password':
                instance.set_password(value)  # Оновлюємо пароль у зашифрованому вигляді
            else:
                setattr(instance, attr, value)  # Оновлюємо інші атрибути
        instance.save()
        return instance


class LoginSerializer(serializers.Serializer):
    phone_number = serializers.CharField()
    password = serializers.CharField()

    def validate(self, attrs):
        """Метод для валідації даних аутентифікації."""
        phone_number = attrs.get('phone_number')
        password = attrs.get('password')

        print(f"Received phone_number: {phone_number} and password: {password}")

        user = authenticate(request=self.context.get('request'), phone_number=phone_number, password=password)

        if user is None:
            raise serializers.ValidationError("Невірні облікові дані")

        attrs['user'] = user
        return attrs
