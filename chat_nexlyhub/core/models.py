from django.contrib.auth import get_user_model
from django.db import models

User = get_user_model()


class Thread(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)



    def __str__(self):
        return f"{self.user}"


class Message(models.Model):
    content = models.TextField("Content", null=True, blank=True)
    thread = models.ForeignKey(Thread, on_delete=models.CASCADE)
    sender = models.ForeignKey(
        User, blank=True, on_delete=models.CASCADE, related_name="msg_sender"
    )
    consumer = models.ForeignKey(
        User,
        null=True,
        blank=True,
        on_delete=models.CASCADE,
        related_name="msg_consumer",
    )
    file_path = models.FilePathField(max_length=800, null=True, blank=True)
    is_read = models.BooleanField(default=False)


    def __str__(self):
        return f"{self.sender}-{self.content}"

