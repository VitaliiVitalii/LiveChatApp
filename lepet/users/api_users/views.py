from django.contrib.auth import authenticate
from rest_framework import generics, status
from rest_framework.permissions import IsAuthenticated, AllowAny
from rest_framework.response import Response
from rest_framework.views import APIView

from users.models import User
from .serializers import UserSerializer, LoginSerializer
from rest_framework_simplejwt.tokens import RefreshToken


class UserListCreate(generics.ListCreateAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer


class UserDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer
    permission_classes = [IsAuthenticated]


class LoginView(APIView):
    def post(self, request):
        # Отримуємо номер телефону та пароль із запиту
        phone_number = request.data.get('phone_number')
        password = request.data.get('password')
        print(f"Received phone_number: {phone_number} and password: {password}")

        # Перевіряємо, чи існує користувач із таким номером телефону
        try:
            user = User.objects.get(phone_number=phone_number)
        except User.DoesNotExist:
            return Response({'detail': 'User with this phone number does not exist.'},
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
            return Response({'detail': 'Invalid credentials.'}, status=status.HTTP_401_UNAUTHORIZED)
