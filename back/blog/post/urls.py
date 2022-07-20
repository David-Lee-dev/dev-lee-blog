from django.urls import path
from .views import *

app_name="article"
urlpatterns = [
		path('article/create', create_article, name='create'),
		path('article/delete/<int:pk>', delete_article)
]
