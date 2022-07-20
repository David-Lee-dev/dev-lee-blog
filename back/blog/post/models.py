from asyncio.windows_events import NULL
from re import T
from django.db import models

# Create your models here.
class Category(models.Model):
		name = models.CharField(max_length=50)


class Article(models.Model):
		title = models.CharField(max_length=150)
		contents_url = models.CharField(max_length=200)
		tags = models.CharField(max_length=200, null=True)
		category = models.ForeignKey(Category, on_delete=models.SET_NULL, null=True, default=NULL)
		created_at = models.DateField(auto_now_add=True)


class Comment(models.Model):
		email = models.CharField(max_length=100)
		contents = models.TextField()
		article = models.ForeignKey(Article, on_delete=models.CASCADE)
		comments = models.ForeignKey('self', on_delete=models.CASCADE, null=True, default=NULL)


