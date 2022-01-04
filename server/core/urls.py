from django.urls import path, include
from rest_framework import routers
from .views import (
    ItemDetailView,
    HomeView,
    OrderSummaryView,
    ProductView, EventView, UserView, HitCountViewSet, CommentView, ImageView, ApiProductListView, OrderView,
    ImageEventView, CatalogView
)

app_name = 'core'


router = routers.DefaultRouter()
router.register(r'products', viewset=ProductView, basename='products')
router.register(r'catalogs', viewset=CatalogView, basename='catalogs')
router.register(r'orders', viewset=OrderView, basename='orders')
router.register(r'visits', viewset=HitCountViewSet)
router.register(r'events', viewset=EventView, basename='events')
router.register(r'users', viewset=UserView)
router.register(r'images', viewset=ImageView)
router.register(r'eventimages', viewset=ImageEventView, basename='eventimages')
router.register(r'comments', viewset=CommentView, basename='comments')

urlpatterns = [
    path('', include(router.urls)),
    path('', HomeView.as_view(), name='home'),
    path('plist', ApiProductListView.as_view(), name='plist'),
    path('order-summary/', OrderSummaryView.as_view(), name='order-summary'),
    path('product/<slug>', ItemDetailView.as_view(), name='product'),
]
