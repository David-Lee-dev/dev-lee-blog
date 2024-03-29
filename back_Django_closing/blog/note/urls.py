from django.urls import path
from .views import *

app_name="note"
urlpatterns = [
		path('create', create_note, name='create'),
		path('delete/<int:note_pk>', delete_note),
		path('list/<str:category_name>/<int:page>', get_note_list),
		path('search/<str:query_string>/<int:page>', search_note),
		path('detail/<int:note_pk>', get_note_detail),
		path('category/', get_category_list),
]
