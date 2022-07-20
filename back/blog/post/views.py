import os
from shutil import rmtree
from messages import *
from utils import *
from django.http import HttpResponse, JsonResponse
from django.shortcuts import render
from .models import Article, Category
from .forms import ArticleForm, UploadForm
from django.views.decorators.http import require_http_methods
from django.core.files.storage import FileSystemStorage


@require_http_methods(["GET", "POST"])
def create_article(request):
		if request.method == "GET":
				article_form = ArticleForm()
				upload_form = UploadForm()
				context = {
					'article_form': article_form,
					'upload_form': upload_form
				}
				return render(request, 'create.html', context)
		else:
				title = request.POST['title']
				tags = request.POST['tags'].split()

				contents_files = request.FILES.getlist('contents_file')
				for cf in contents_files:
						if cf.name[-2:] == 'md':
							contents_url = f'articles/{cf.name[:-3]}/{cf.name}'
							target_directory = f'articles/{cf.name[:-3]}'
							break
				else:
						return make_json_response(400, CA002)
				
				if duplicate_post_checker(contents_url, title):
						return make_json_response(400, CA001)
						

				# 파일 저장
				fs = FileSystemStorage(target_directory)
				for cf in contents_files:
						fs.save(cf.name, cf)

				# 게시글 저장
				c = request.POST['category']
				try:
						category = Category.objects.get(name=c)
				except Category.DoesNotExist:
						category = Category.objects.create(name=c)
						category.save()

				article = Article.objects.create(
					title=title,	
					tags=str(tags),	
					contents_url=contents_url,
					category=category
				)
				article.save()
				return make_json_response(200, CA000)


@require_http_methods(["DELETE"])
def delete_article(request, pk):
		try:
				article = Article.objects.get(pk=pk)
		except:
				return make_json_response(400, DA002)
		
		location = 'articles'
		directory = article.contents_url.split('/')[1]
		path = os.path.join(location, directory)

		try:
				rmtree(path)
				article.delete()
				return make_json_response(200, DA000)
		except:
				return make_json_response(400, DA001)

				
		