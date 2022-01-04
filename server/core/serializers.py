from django.contrib.auth.models import User as UserModel
from rest_framework import serializers, request
from .models import Product, Event, Comment, ImageProduct,HitCount, Order, ImageEvent, Catalog


class UserSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = UserModel
        fields = ['id','username','password','is_staff']




class CommentSerializer(serializers.ModelSerializer):

    user = UserSerializer()
    class Meta:
        model = Comment
        fields = ['id','object_id','content','posted','edited','parent','user']



class ImageSerializer(serializers.HyperlinkedModelSerializer):
    
    class Meta:
        model = ImageProduct
        fields = ['id','image']





class ProductSerializer(serializers.ModelSerializer):
    imageproducts = ImageSerializer(many=True,allow_null=True)
    comments = CommentSerializer(many=True,allow_null=True)
    class Meta:
        model = Product
        fields = ['id','nom','price','capacity','domain','Details','Rating',
                  'NEW','category','description','comments','imageproducts']

class CatalogSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Catalog
        fields = ['titre_fr', "titre_ar",'catalog','description','description_ar']




class OrderSerializer(serializers.ModelSerializer):
    user = UserSerializer()
    class Meta:
        model = Order
        fields = ['id','date','user','items','total','user']


class ImageEventSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = ImageEvent
        fields = ['id','image']

class HitCountSerializer(serializers.ModelSerializer):
    class Meta:
        model = HitCount
        fields = ('visits',)


class EventSerializer(serializers.HyperlinkedModelSerializer):
    imageevents = ImageEventSerializer(many=True)
    class Meta:
        model = Event
        fields = ['id','name_ar', 'name_fr','desc_ar','desc_fr','description_ar','description_fr','imageevents']



