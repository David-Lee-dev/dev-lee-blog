from django.urls import path
from .views import *

urlpatterns = [
		path('category/', category),
    path('article/<str:category>/<str:title>/', article),
]
