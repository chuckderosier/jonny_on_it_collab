# Generated by Django 2.1.4 on 2018-12-15 21:26

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('main', '0003_auto_20181212_0713'),
    ]

    operations = [
        migrations.AddField(
            model_name='job',
            name='time',
            field=models.DateTimeField(blank=True, null=True),
        ),
    ]