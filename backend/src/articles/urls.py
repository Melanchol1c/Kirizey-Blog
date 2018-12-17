from django.urls import path
from django.conf.urls import include
from .routers import router

urlpatterns = [
    path('api/', include(router.urls)),
]
