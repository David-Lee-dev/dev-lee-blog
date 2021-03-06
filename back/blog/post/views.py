import os
from env import POST_PASSWORD
from shutil import rmtree
from messages import *
from utils import *
from django.shortcuts import render
from .models import Post, PostCategory
from .forms import PostForm, UploadForm
from django.views.decorators.http import require_http_methods
from django.core.files.storage import FileSystemStorage


@require_http_methods(["GET", "POST"])
def create_post(request):
		if request.method == "GET":
				post_form = PostForm()
				upload_form = UploadForm()
				context = {
					'post_form': post_form,
					'upload_form': upload_form
				}
				return render(request, 'create_post.html', context)
		else:
				if request.POST['password'] != POST_PASSWORD:
						return make_json_response(400, CP001)
				title = request.POST['title']
				tags = request.POST['tags'].split()
				category = request.POST['category']
				contents_files = request.FILES.getlist('contents_file')
				for cf in contents_files:
						if cf.name[-2:] == 'md':
							contents_url = f'files/posts/{cf.name[:-3]}/{cf.name}'
							target_directory = f'files/posts/{cf.name[:-3]}'
							break
				else:
						return make_json_response(400, CA002)

				if duplicate_checker(contents_url, title):
						return make_json_response(400, CA001)

				if empty_field_checker(title, tags, contents_files, category):
						return make_json_response(400, CA003)

				# 파일 저장
				fs = FileSystemStorage(target_directory)
				for cf in contents_files:
						fs.save(cf.name, cf)

				# 게시글 저장
				try:
						category = PostCategory.objects.get(name=category)
				except PostCategory.DoesNotExist:
						category = PostCategory.objects.create(name=category)
						category.save()

				post = Post.objects.create(
					title=title,	
					tags=str(tags),	
					contents_url=contents_url,
					category=category
				)
				post.save()
				return make_json_response(200, CA000)


@require_http_methods(["DELETE"])
def delete_post(request, pk):
		try:
				post = Post.objects.get(pk=pk)
		except:
				return make_json_response(400, DA002)
		
		location = 'files/posts'
		directory = post.contents_url.split('/')[2]
		path = os.path.join(location, directory)

		try:
				rmtree(path)
				post.delete()
				return make_json_response(200, DA000)
		except:
				return make_json_response(400, DA001)

				
		