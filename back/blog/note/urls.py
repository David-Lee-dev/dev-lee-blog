from django.urls import path
from .views import *

app_name="note"
urlpatterns = [
		path('create', create_note, name='create'),
		path('delete/<int:pk>', delete_note)
]
