from rest_framework import serializers
from users.models import User


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'username', 'phone_number', 'email', 'first_name', 'last_name', 'profile_picture', 'bio']
        extra_kwargs = {'username': {'required': False}}

    def create(self, validated_data):
        # Якщо нікнейм не передано, генеруємо його автоматично
        if not validated_data.get('username'):
            first_name = validated_data.get('first_name', '')
            last_name = validated_data.get('last_name', '')
            user_instance = User(first_name=first_name, last_name=last_name)
            validated_data['username'] = user_instance.generate_username()

        return super().create(validated_data)