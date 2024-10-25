from django.contrib.auth import authenticate
from django.shortcuts import get_object_or_404
from rest_framework import generics, status
from rest_framework.exceptions import PermissionDenied
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework.views import APIView
from users.models import User
from .serializers import UserSerializer
from rest_framework_simplejwt.tokens import RefreshToken


class UserListCreate(generics.ListCreateAPIView):
    """Клас для отримання списку користувачів та створення нового користувача."""

    queryset = User.objects.all()
    serializer_class = UserSerializer


class UserDetail(generics.RetrieveUpdateDestroyAPIView):
    """Клас для отримання, оновлення або видалення конкретного користувача."""

    queryset = User.objects.all()
    serializer_class = UserSerializer
    permission_classes = [IsAuthenticated]  # Дозволяє доступ тільки авторизованим користувачам

    def get_object(self):
        """Отримати користувача за UUID."""
        uuid = self.kwargs.get('uuid')
        user = get_object_or_404(User, id=uuid)  # Отримуємо користувача за UUID
        return user

    def update(self, request, *args, **kwargs):
        """Метод для оновлення даних користувача."""
        instance = self.get_object()

        # Перевіряємо, чи користувач намагається оновити свій власний профіль
        if instance != request.user:
            raise PermissionDenied("Ви не маєте прав на оновлення цього користувача.")

        partial = kwargs.pop('partial', False)  # Дозволяє часткове оновлення
        serializer = self.get_serializer(instance, data=request.data, partial=partial)
        serializer.is_valid(raise_exception=True)
        self.perform_update(serializer)

        return Response(serializer.data)


class LoginView(APIView):
    """Клас для аутентифікації користувача через телефонний номер та пароль."""

    def post(self, request):
        # Отримуємо номер телефону та пароль із запиту
        phone_number = request.data.get('phone_number')
        password = request.data.get('password')
        print(f"Received phone_number: {phone_number} and password: {password}")

        # Перевіряємо, чи існує користувач із таким номером телефону
        try:
            user = User.objects.get(phone_number=phone_number)
        except User.DoesNotExist:
            return Response({'detail': 'Користувача з таким номером телефону не існує.'},
                            status=status.HTTP_400_BAD_REQUEST)

        # Аутентифікація користувача
        user = authenticate(username=user.username, password=password)
        if user is not None:
            # Генеруємо JWT токен
            refresh = RefreshToken.for_user(user)
            return Response({
                'refresh': str(refresh),
                'access': str(refresh.access_token),
            }, status=status.HTTP_200_OK)
        else:
            return Response({'detail': 'Невірні облікові дані.'}, status=status.HTTP_401_UNAUTHORIZED)
