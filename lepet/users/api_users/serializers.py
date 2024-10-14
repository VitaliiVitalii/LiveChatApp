from django.contrib.auth import authenticate
from phonenumber_field.serializerfields import PhoneNumberField
from rest_framework import serializers
from users.models import User


class UserSerializer(serializers.ModelSerializer):
    phone_number = PhoneNumberField(region='UA')

    class Meta:
        model = User
        fields = ['id', 'username', 'is_online', 'last_active', 'phone_number', 'email', 'first_name', 'last_name',
                  'profile_picture', 'bio', 'password']
        extra_kwargs = {'username': {'required': False},
                        'password': {'write_only': True}}

    def create(self, validated_data):
        print(f"Received phone_number: {validated_data.get('phone_number')}")
        if not validated_data.get('username'):
            first_name = validated_data.get('first_name', '')
            last_name = validated_data.get('last_name', '')
            user_instance = User(first_name=first_name, last_name=last_name)
            validated_data['username'] = user_instance.generate_username()

        user = User(**validated_data)
        user.set_password(validated_data.pop('password'))
        user.save()
        print(f'Created user: {user}')
        return user


class LoginSerializer(serializers.Serializer):
    phone_number = serializers.CharField()
    password = serializers.CharField()

    def validate(self, attrs):
        phone_number = attrs.get('phone_number')
        password = attrs.get('password')

        print(f"Received phone_number: {phone_number} and password: {password}")

        user = authenticate(request=self.context.get('request'), phone_number=phone_number, password=password)

        if user is None:
            raise serializers.ValidationError("Invalid credentials")

        attrs['user'] = user
        return attrs
