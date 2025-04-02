from django.contrib import admin

from chat_nexlyhub.core.models import Message, Thread

# Register your models here.
admin.site.register(Message)
admin.site.register(Thread)
