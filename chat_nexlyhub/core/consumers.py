import json
import logging

from channels.consumer import AsyncConsumer
from channels.db import database_sync_to_async
from django.contrib.auth import get_user_model


class ChatConsumer(AsyncConsumer):
    connected_users_by_room = {}

    async def websocket_connect(self, event):
        self.room_name = self.scope["url_route"]["kwargs"]["room_name"]
        print("--------_________", self.room_name)
        self.room_group_name = "chat_%s" % self.room_name
        self_user = self.scope["user"]
        if self.room_name not in self.connected_users_by_room:
            self.connected_users_by_room[self.room_name] = set()
        self.connected_users_by_room[self.room_name].add(self_user)
        logging.info(f"Connected user by room : {self.connected_users_by_room}")
        await self.channel_layer.group_add(self.room_group_name, self.channel_name)
        await self.send({"type": "websocket.accept"})

    async def websocket_disconnect(self, event):
        # Leave room group
        self_user = self.scope["user"]
        if self.room_name in self.connected_users_by_room:
            self.connected_users_by_room[self.room_name].remove(self_user)
            if not self.connected_users_by_room[self.room_name]:
                del self.connected_users_by_room[self.room_name]

        logging.info(f"DisConnected user by room : {self.connected_users_by_room}")
        await self.channel_layer.group_discard(self.room_group_name, self.channel_name)

    # Receive message from WebSocket
    async def websocket_receive(self, event):
        logging.info("Websocket receive called")
        received_data = json.loads(event["text"])
        file_url = received_data.get("file_url")
        msg = received_data.get("message")
        sent_by_id = received_data.get("sent_by")
        thread_id = received_data.get("thread_id")
        sent_by_user = await self.get_user_object(sent_by_id)
        thread_obj = await self.get_thread(thread_id)
        consumer = await self.get_consumer_object(thread_obj, sent_by_user)
        await self.create_chat_message(
            thread_obj, sent_by_user, consumer, msg, file_url
        )
        self_user = self.scope["user"]
        response = {
            "file_url": str(file_url) if file_url else "",
            "message": str(msg),
            "sent_by": str(self_user.id),
            "thread_id": str(thread_id),
        }
        # Send message to room group
        await self.channel_layer.group_send(
            self.room_group_name, {"type": "chat_message", "text": json.dumps(response)}
        )

    # Receive message from room group
    async def chat_message(self, event):
        await self.send({"type": "websocket.send", "text": event["text"]})

    @database_sync_to_async
    def get_user_object(self, user_id):
        User = get_user_model()
        qs = User.objects.filter(id=user_id)
        if qs.exists():
            obj = qs.first()
        else:
            obj = None
        return obj

    @database_sync_to_async
    def get_consumer_object(self, thread, sender):
        consumer = None
        if thread.user == sender:
            consumer = thread.user
        if thread.user == sender:
            consumer = thread.user
        return consumer

    @database_sync_to_async
    def get_thread(self, thread_id):
        from chat_nexlyhub.core.models import Thread

        qs = Thread.objects.filter(id=1)
        if qs.exists():
            obj = qs.first()
        else:
            obj = None
        return obj

    @database_sync_to_async
    def create_chat_message(self, thread, user, consumer, msg, file_url):
        connected_users_in_room = self.connected_users_by_room.get(
            self.room_name, set()
        )

        from chat_nexlyhub.core.models  import Message

        if (
            thread.user in connected_users_in_room
            and thread.user in connected_users_in_room
        ):
            Message.objects.create(
                thread=thread,
                sender=user,
                consumer=consumer,
                content=msg,
                file_path=file_url,
                is_read=True,
            )
        else:
            Message.objects.create(
                thread=thread,
                sender=user,
                consumer=consumer,
                content=msg,
                file_path=file_url,
            )
