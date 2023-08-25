from django.contrib import admin

from .models import Subscription


# Register your models here.
class SubscriptionAdmin(admin.ModelAdmin):
    list_display = ["id", "source_id", "source_name", "source_category", "source_description", "source_url", "user"]
    
    
admin.site.register(Subscription, SubscriptionAdmin)