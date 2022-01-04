# Generated by Django 2.2.14 on 2022-01-03 13:16

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
    ]

    operations = [
        migrations.CreateModel(
            name='Catalog',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('titre_fr', models.CharField(blank=True, max_length=50)),
                ('titre_ar', models.CharField(blank=True, max_length=100)),
                ('catalog', models.FileField(null=True, upload_to='media')),
                ('description', models.TextField(null=True)),
                ('description_ar', models.TextField(blank=True)),
            ],
        ),
        migrations.CreateModel(
            name='Event',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name_ar', models.CharField(max_length=100)),
                ('name_fr', models.CharField(blank=True, max_length=100)),
                ('desc_ar', models.TextField(blank=True)),
                ('desc_fr', models.TextField(blank=True)),
                ('description_fr', models.TextField(blank=True)),
                ('description_ar', models.TextField(blank=True)),
            ],
        ),
        migrations.CreateModel(
            name='HitCount',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('visits', models.IntegerField(default=0)),
            ],
        ),
        migrations.CreateModel(
            name='Product',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('nom', models.CharField(max_length=100)),
                ('price', models.FloatField()),
                ('capacity', models.FloatField()),
                ('domain', models.CharField(choices=[('A', 'Agricole'), ('G', 'Segment Public'), ('N', 'Nawafidh')], max_length=3, null=True)),
                ('NEW', models.BooleanField(default=True)),
                ('Details', models.TextField(null=True)),
                ('Rating', models.IntegerField(default=0, null=True)),
                ('category', models.CharField(choices=[('S', 'catego1'), ('SW', 'catego2'), ('OW', 'catego3')], max_length=2)),
                ('description', models.TextField()),
                ('Fiche_technique', models.FileField(null=True, upload_to='media')),
            ],
        ),
        migrations.CreateModel(
            name='UserProfile',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('stripe_customer_id', models.CharField(blank=True, max_length=50, null=True)),
                ('one_click_purchasing', models.BooleanField(default=False)),
                ('user', models.OneToOneField(on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL)),
            ],
        ),
        migrations.CreateModel(
            name='Order',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('items', models.TextField(null=True)),
                ('total', models.FloatField()),
                ('date', models.CharField(blank=True, max_length=15)),
                ('user', models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, related_name='orders', to=settings.AUTH_USER_MODEL)),
            ],
        ),
        migrations.CreateModel(
            name='ImageProduct',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('image', models.ImageField(upload_to='images/')),
                ('product', models.ForeignKey(null=True, on_delete=django.db.models.deletion.CASCADE, related_name='imageproducts', to='core.Product')),
            ],
        ),
        migrations.CreateModel(
            name='ImageEvent',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('image', models.ImageField(upload_to='images/')),
                ('event', models.ForeignKey(null=True, on_delete=django.db.models.deletion.CASCADE, related_name='imageevents', to='core.Event')),
            ],
        ),
    ]
