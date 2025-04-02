from allauth.account import app_settings as allauth_account_settings
from allauth.account.forms import default_token_generator
from allauth.account.utils import user_pk_to_url_str
from allauth.utils import get_username_max_length
from dj_rest_auth.registration.serializers import RegisterSerializer
from dj_rest_auth.serializers import LoginSerializer
from dj_rest_auth.serializers import PasswordResetSerializer
from django.conf import settings
from django.contrib.auth.forms import PasswordResetForm
from rest_framework import serializers

from chat_nexlyhub.users.models import User


class UserSerializer(serializers.ModelSerializer[User]):
    class Meta:
        model = User
        fields = ["username", "url"]

        extra_kwargs = {
            "url": {"view_name": "api:user-detail", "lookup_field": "username"},
        }


class UserRegisterSerializer(RegisterSerializer):
    username =  None
    email = serializers.EmailField(required=allauth_account_settings.EMAIL_REQUIRED)

    def validate(self, data):
        if settings.ACCOUNT_SIGNUP_PASSWORD_ENTER_TWICE:
            if data["password1"] != data["password2"]:
                raise serializers.ValidationError(
                    "The two password fields didn't match.",
                )
        return data

    def custom_signup(self, request, user):
        user.first_name = self.validated_data.get("first_name")
        user.last_name = self.validated_data.get("last_name")
        user.save()


class UserLoginSerializer(LoginSerializer):
    username = None
