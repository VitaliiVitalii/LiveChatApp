from django.urls import path
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView
from .views import UserListCreate, UserDetail, LoginView  # не забудьте імпортувати LoginView

urlpatterns = [
    path('', UserListCreate.as_view(), name='user_list_create'),
    path('<uuid:uuid>/', UserDetail.as_view(), name='user_detail'),
    path('login/', LoginView.as_view(), name='user_login'),
    path('token/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
]
