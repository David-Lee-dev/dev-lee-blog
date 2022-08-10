# pakages
import http
from ntpath import join
import os
from shutil import rmtree
from copy import deepcopy
from django.shortcuts import render
from django.forms.models import model_to_dict
from django.views.decorators.csrf import csrf_exempt
from django.views.decorators.http import require_http_methods
from django.core.files.storage import FileSystemStorage

#modules
from messages import *
from utils import *
from env import POST_PASSWORD
from .models import Post, PostCategory
from .forms import PostForm, UploadForm


@require_http_methods(["GET", "POST"])
@csrf_exempt
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
				print(tags)
				post = Post.objects.create(
					title=title,	
					tags=' '.join(tags),	
					contents_url=contents_url,
					category=category
				)
				post.save()
				return make_json_response(200, CA000)


@require_http_methods(["DELETE"])
@csrf_exempt
def delete_post(request, post_pk):
		try:
				post = Post.objects.get(pk=post_pk)
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

				
@require_http_methods(["GET"])
def get_post_list(request, category_name, page):
		# 전체 카테고리 요청
		if category_name == 'all':
				posts = list(Post.objects.all()[10 * (page - 1): 10 * page].values())
		# 특정 카테고리 요청
		else:
				try:
						category = model_to_dict(PostCategory.objects.get(name=category_name))
						posts = list(Post.objects.filter(category_id=category['id'])[10 * (page - 1): 10 * page].values())
				except PostCategory.DoesNotExist:
						return make_json_response(404, GA001)
		
		for idx in range(len(posts)):
				posts[idx]['category'] = model_to_dict(PostCategory.objects.get(pk=posts[idx]['category_id']))
				del posts[idx]['category_id']

		data = deepcopy(GA000)
		data['posts'] = posts
		return make_json_response(200, data)


@require_http_methods(["GET"])
def get_post_detail(request, post_pk):
		try:
				post = model_to_dict(Post.objects.get(pk=post_pk))
		except Post.DoesNotExist:
				return make_json_response(400, GA002)

		f = open(post['contents_url'], 'r')
		contents = ''.join(f.readlines())
		directory = '/'.join(post['contents_url'].split('/')[:-1])
		post['contents'] = contents.replace('![img](', f'![img](http://im-dev-lee.site/{directory}/')

		data = deepcopy(GA000)
		data['post'] = post
		return make_json_response(200, data)


@require_http_methods(["GET"])
def get_category_list(request):
		category = list(PostCategory.objects.all().values())
		data = deepcopy(GC000)
		data['category'] = []
		for c in category:
				cnt = len(list(Post.objects.filter(category_id=c.get('id'))))
				if cnt > 0:
						data['category'].append(c)

		return make_json_response(200, data)