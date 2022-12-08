# Generated by Django 4.0.3 on 2022-12-08 05:05

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('service_rest', '0010_alter_appointment_status_delete_status'),
    ]

    operations = [
        migrations.AddField(
            model_name='appointment',
            name='sold_here',
            field=models.BooleanField(default=False, null=True),
        ),
        migrations.AlterField(
            model_name='appointment',
            name='vin',
            field=models.CharField(blank=True, max_length=200, null=True, unique=True),
        ),
    ]