from django.urls import path
from .views import *

app_name="post"
urlpatterns = [
		path('create', create_post, name='create'),
		path('delete/<int:post_pk>', delete_post),
		path('list/<str:category_name>/<int:page>', get_post_list),
		path('search/<str:query_string>/<int:page>', search_post),
		path('detail/<int:post_pk>', get_post_detail),
		path('category/', get_category_list),
]
