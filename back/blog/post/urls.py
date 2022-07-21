from django.urls import path
from .views import *

app_name="post"
urlpatterns = [
		path('create', create_post, name='create'),
		path('delete/<int:pk>', delete_post, name='delete')
]
