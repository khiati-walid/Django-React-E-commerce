from django.contrib import admin
from django.contrib.auth.models import User
from django.contrib.sites.models import Site
from django.contrib.auth.models import Group
from allauth.socialaccount.models import SocialToken, SocialAccount, SocialApp
from allauth.account.models import EmailAddress
from knox.models import AuthToken
from .models import Product, Order, UserProfile, ImageProduct, Event, ImageEvent, Catalog

admin.site.register(Product)
admin.site.register(ImageProduct)
admin.site.register(Catalog)
admin.site.register(Event)
admin.site.register(Order)
admin.site.register(ImageEvent)
admin.site.unregister(Group)
admin.site.unregister(Site)
admin.site.unregister(SocialToken)
admin.site.unregister(SocialAccount)
admin.site.unregister(SocialApp)
admin.site.unregister(EmailAddress)
admin.site.unregister(AuthToken)
