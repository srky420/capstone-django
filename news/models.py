from django.db import models

from accounts.models import User


# Create your models here.
class Subscription(models.Model):
    source_id = models.CharField(max_length=64)
    source_name = models.CharField(max_length=64)
    source_category = models.CharField(max_length=64)
    source_description = models.CharField(max_length=1200)
    source_url = models.URLField()
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name="subscriptions")