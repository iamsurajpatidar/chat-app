"""
ASGI config for chat_project project.

It exposes the ASGI callable as a module-level variable named ``application``.

For more information on this file, see
https://docs.djangoproject.com/en/4.2/howto/deployment/asgi/
"""

import os
import sys
from pathlib import Path

from channels.auth import AuthMiddlewareStack
from channels.routing import ProtocolTypeRouter, URLRouter
from channels.security.websocket import AllowedHostsOriginValidator
from django.core.asgi import get_asgi_application

import chat_nexlyhub.core.routing

BASE_DIR = Path(__file__).resolve(strict=True).parent.parent
sys.path.append(str(BASE_DIR / "chat_nexlyhub"))
os.environ.setdefault("DJANGO_SETTINGS_MODULE", "config.settings.local")


application_app = get_asgi_application()

application = ProtocolTypeRouter(
    {
        "http": application_app,
        "websocket": AllowedHostsOriginValidator(
            AuthMiddlewareStack(
                URLRouter(chat_nexlyhub.core.routing.websocket_urlpatterns)
            )
        ),
    }
)
