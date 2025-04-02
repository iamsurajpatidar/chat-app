from django.urls import path


from chat_nexlyhub.core.views import ChatView

urlpatterns = [
    path("chat/", ChatView.as_view(), name="chat_start" ),
]
