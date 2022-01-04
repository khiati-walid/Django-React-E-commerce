import random
import string
import os
import stripe
from django.conf import settings
from django.contrib import messages, auth
from django.contrib.auth.decorators import login_required
from django.contrib.auth.mixins import LoginRequiredMixin
from django.contrib.auth.models import User
from django.contrib.contenttypes.models import ContentType
from django.core.exceptions import ObjectDoesNotExist
from django.db.models import F
from django.shortcuts import redirect
from django.shortcuts import render, get_object_or_404
from django.utils import timezone
from django.views.generic import ListView, DetailView, View
from django.http import HttpResponse, JsonResponse
from rest_framework.response import Response

from .serializers import ProductSerializer, EventSerializer, UserSerializer, CommentSerializer, ImageSerializer, \
    OrderSerializer, ImageEventSerializer, CatalogSerializer, HitCountSerializer
from .forms import CheckoutForm, CouponForm, RefundForm, PaymentForm
from .models import Product, Order, UserProfile, Event, Comment, ImageProduct, ImageEvent, Catalog, HitCount
from rest_framework import viewsets, permissions
from rest_framework.pagination import PageNumberPagination
from rest_framework.generics import ListAPIView
from django_filters.rest_framework import DjangoFilterBackend
stripe.api_key = settings.STRIPE_SECRET_KEY




class HitCountViewSet(viewsets.ModelViewSet):
    queryset = HitCount.objects.all()
    serializer_class = HitCountSerializer

    def retrieve(self, request, *args, **kwargs):
        instance = self.get_object()
        HitCount.objects.filter(pk=instance.id).update(visits=F('visits') + 1)
        serializer = self.get_serializer(instance)
        return Response(serializer.data)


class ProductView(viewsets.ModelViewSet):
    queryset = Product.objects.all()
    serializer_class = ProductSerializer
    filter_backends = (DjangoFilterBackend,)
    filter_fields = ('domain', )


class EventView(viewsets.ModelViewSet):
    queryset = Event.objects.all()
    serializer_class = EventSerializer

class ImageEventView(viewsets.ModelViewSet):
    queryset = ImageEvent.objects.all()
    serializer_class = ImageEventSerializer

class OrderView(viewsets.ModelViewSet):
    queryset = Order.objects.all()
    serializer_class = OrderSerializer


    def create(self, request, *args, **kwargs):
        order_data = request.data

        new_order = Order.objects.create(
            user=request.user,
            items=order_data["items"],
            date=order_data["date"],
            total=order_data["total"]
        )
        new_order.save()
        serializer = OrderSerializer(new_order)

        return JsonResponse(serializer.data)

class ImageView(viewsets.ModelViewSet):
    queryset = ImageProduct.objects.all()
    serializer_class = ImageSerializer


class UserView(viewsets.ModelViewSet):
    queryset = User.objects.all()
    serializer_class = UserSerializer

class CatalogView(viewsets.ModelViewSet):
    queryset = Catalog.objects.all()
    serializer_class = CatalogSerializer
'''''
class CommentView(viewsets.ModelViewSet):
    queryset = Comment.objects.all()
    serializer_class = CommentSerializer
'''''


class CommentView(viewsets.ModelViewSet):
    permission_classes = [
        permissions.IsAuthenticated
    ]

    serializer_class = CommentSerializer
    queryset = Comment.objects.all()
   

    def perform_create(self, serializer):
        serializer.save(owner=self.request.user)

    def create(self, request, *args, **kwargs):
        comment_data = request.data
        try:
          comment = Comment.objects.get(id=comment_data["parent"])
        except Comment.DoesNotExist:
          comment = None
        new_comment = Comment.objects.create(
            user = request.user,
            object_id = comment_data["object_id"],
            content=comment_data["content"],
            parent= comment,
            content_type=ContentType.objects.get_for_model(Product)
        )
        new_comment.save()
        serializer = CommentSerializer(new_comment)
        return JsonResponse(serializer.data)




class ApiProductListView(ListAPIView):
    queryset = Product.objects.all()
    serializer_class = ProductSerializer
    pagination_class = PageNumberPagination


def download(request,path):
    file_path = os.path.join(settings.MEDIA_ROOT,path)
    if os.path.exists(file_path):
        with open(file_path,'rb')as fh:
            response= HttpResponse(fh.read(),content_type="application/catalog")
            response['Content-Disposition']='inline;filename='+os.path.basename(file_path)
            return response

        raise Http404


def create_ref_code():
    return ''.join(random.choices(string.ascii_lowercase + string.digits, k=20))


def products(request):
    context = {
        'items': Product.objects.all()
    }
    return render(request, "products.html", context)


def is_valid_form(values):
    valid = True
    for field in values:
        if field == '':
            valid = False
    return valid




class HomeView(ListView):
    model = Product
    paginate_by = 10
    template_name = "home.html"


class OrderSummaryView(LoginRequiredMixin, View):
    def get(self, *args, **kwargs):
        try:
            order = Order.objects.get(user=self.request.user, ordered=False)
            context = {
                'object': order
            }
            return render(self.request, 'order_summary.html', context)
        except ObjectDoesNotExist:
            messages.warning(self.request, "You do not have an active order")
            return redirect("/")


class ItemDetailView(DetailView):
    model = Product
    template_name = "product.html"




