import contextlib

from django.apps import AppConfig
from django.utils.translation import gettext_lazy as _


class UsersConfig(AppConfig):
    name = "chat_nexlyhub.users"
    verbose_name = _("Users")

    def ready(self):
        with contextlib.suppress(ImportError):
            import chat_nexlyhub.users.signals  # noqa: F401
