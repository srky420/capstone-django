# Generated by Django 4.2.4 on 2023-08-29 16:23

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('accounts', '0001_initial'),
    ]

    operations = [
        migrations.AddField(
            model_name='user',
            name='profile_pic',
            field=models.ImageField(default='images/default-profile-pic.jpg', upload_to='images/'),
        ),
    ]
