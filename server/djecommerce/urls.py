from django.conf import settings
from django.conf.urls.static import static
from django.contrib import admin
from django.urls import path, include
from django.conf.urls import url
from django.views.static import serve

urlpatterns = [
    path('admin/', admin.site.urls),
    path('comment/', include('comment.urls')),
    path('', include('accounts.urls')),
    url(r'^download/(?P<path>.*)$', serve,
        {'document_root': settings.MEDIA_ROOT}),
    path('accounts/', include('allauth.urls')),
    path('', include('core.urls', namespace='core'))
]

if settings.DEBUG:
    import debug_toolbar
    urlpatterns += [path('__debug__/', include(debug_toolbar.urls))]
    urlpatterns += static(settings.MEDIA_URL,
                          document_root=settings.MEDIA_ROOT)
    urlpatterns += static(settings.STATIC_URL,
                          document_root=settings.STATIC_ROOT)
