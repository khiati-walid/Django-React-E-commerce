from comment.models import Comment
from django.contrib.contenttypes.fields import GenericRelation
from django.db.models.signals import post_save
from django.conf import settings
from django.db import models
from django.db.models import Sum
from django.shortcuts import reverse
from django_countries.fields import CountryField


CATEGORY_CHOICES = (
    ('S', 'catego1'),
    ('SW', 'catego2'),
    ('OW', 'catego3')
)

DOMAIN_CHOICES = (
    ('A', 'Agricole'),
    ('G', 'Segment Public'),
    ('N', 'Nawafidh')
)


class HitCount(models.Model):
    visits = models.IntegerField(default=0)


class UserProfile(models.Model):
    user = models.OneToOneField(
        settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
    stripe_customer_id = models.CharField(max_length=50, blank=True, null=True)
    one_click_purchasing = models.BooleanField(default=False)

    def __str__(self):
        return self.user.username


class Product(models.Model):
    nom = models.CharField(max_length=100)
    price = models.FloatField()
    capacity = models.FloatField()
    domain = models.CharField(choices=DOMAIN_CHOICES, max_length=3, null=True)
    NEW = models.BooleanField(default=True)
    Details = models.TextField(null=True)
    Rating = models.IntegerField(null=True, default=0)
    category = models.CharField(choices=CATEGORY_CHOICES, max_length=2)
    description = models.TextField()
    Fiche_technique = models.FileField(upload_to='media', null=True)
    comments = GenericRelation(Comment)
    #order = models.ManyToManyField(Order, related_name='products', null= True, blank= True)

    def __str__(self):
        return self.nom

    def get_absolute_url(self):
        return reverse("core:product", kwargs={
            'slug': self.slug
        })

    def get_add_to_cart_url(self):
        return reverse("core:add-to-cart", kwargs={
            'slug': self.slug
        })

    def get_remove_from_cart_url(self):
        return reverse("core:remove-from-cart", kwargs={
            'slug': self.slug
        })


class Order(models.Model):
    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE,
                             blank=True, null=True, related_name='orders')
    items = models.TextField(null=True)
    total = models.FloatField()
    date = models.CharField(max_length=15, blank=True)



class Catalog(models.Model):
    titre_fr = models.CharField(max_length=50, blank=True)
    titre_ar = models.CharField(max_length=100, blank=True)
    catalog = models.FileField(upload_to='media', null=True)
    description = models.TextField(null=True)
    description_ar = models.TextField(blank=True)


class ImageProduct(models.Model):
    product = models.ForeignKey(
        Product, on_delete=models.CASCADE, null=True, related_name='imageproducts')
    image = models.ImageField(upload_to='images/')




class Event(models.Model):
    name_ar = models.CharField(max_length=100)
    name_fr = models.CharField(max_length=100, blank=True)
    desc_ar = models.TextField(blank=True)
    desc_fr = models.TextField(blank=True)
    description_fr = models.TextField(blank=True)
    description_ar = models.TextField(blank=True)

    def __str__(self):
        return self.name_ar


class ImageEvent(models.Model):
    event = models.ForeignKey(
        Event, on_delete=models.CASCADE, null=True, related_name='imageevents')
    image = models.ImageField(upload_to='images/')
