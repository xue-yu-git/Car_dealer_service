# Generated by Django 4.0.3 on 2022-12-07 20:56

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('service_rest', '0003_remove_soldcarsvo_import_vin_soldcarsvo_vin'),
    ]

    operations = [
        migrations.AddField(
            model_name='appointment',
            name='status',
            field=models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.PROTECT, related_name='presentations', to='service_rest.status'),
        ),
    ]
