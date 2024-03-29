# pakages
import os
from shutil import rmtree
from copy import deepcopy
from django.shortcuts import render
from django.forms.models import model_to_dict
from django.views.decorators.csrf import csrf_exempt
from django.views.decorators.http import require_http_methods
from django.core.files.storage import FileSystemStorage
from django.db.models import Q

#modules
from messages import *
from utils import *
from env import POST_PASSWORD
from .models import Note, NoteCategory
from .forms import NoteForm, UploadForm


@require_http_methods(["GET", "POST"])
@csrf_exempt
def create_note(request):
		if request.method == "GET":
				note_form = NoteForm()
				upload_form = UploadForm()
				context = {
					'note_form': note_form,
					'upload_form': upload_form
				}
				return render(request, 'create_note.html', context)
		else:
				if request.POST['password'] != POST_PASSWORD:
						return make_json_response(400, CP001)
				title = request.POST['title']
				tags = request.POST['tags'].split()
				category = request.POST['category']
				contents_files = request.FILES.getlist('contents_file')
				for cf in contents_files:
						if cf.name[-2:] == 'md':
							contents_url = f'files/notes/{cf.name[:-3]}/{cf.name}'
							target_directory = f'files/notes/{cf.name[:-3]}'
							break
				else:
						return make_json_response(400, CN002)

				if duplicate_checker(contents_url, title):
						return make_json_response(400, CN001)

				if empty_field_checker(title, tags, contents_files, category):
						return make_json_response(400, CN003)

				# 파일 저장
				fs = FileSystemStorage(target_directory)
				for cf in contents_files:
						fs.save(cf.name, cf)

				# 게시글 저장
				try:
						category = NoteCategory.objects.get(name=category)
				except NoteCategory.DoesNotExist:
						category = NoteCategory.objects.create(name=category)
						category.save()

				note = Note.objects.create(
					title=title,	
					tags=' '.join(tags),
					contents_url=contents_url,
					category=category
				)
				note.save()
				return make_json_response(200, CN000)

@csrf_exempt
@require_http_methods(["DELETE"])
def delete_note(request, note_pk):
		try:
				note = Note.objects.get(pk=note_pk)
		except:
				return make_json_response(400, DN002)
		
		location = 'files/notes'
		directory = note.contents_url.split('/')[2]
		path = os.path.join(location, directory)

		try:
				rmtree(path)
				note.delete()
				return make_json_response(200, DN000)
		except:
				return make_json_response(400, DN001)

				
@require_http_methods(["GET"])
def get_note_list(request, category_name, page):
		# 전체 카테고리 요청
		if category_name == 'all':
				notes = list(Note.objects.all().order_by('-created_at').values())
				cnt = len(notes)		# 특정 카테고리 요청
		else:
				try:
						category = model_to_dict(NoteCategory.objects.get(name=category_name))
						notes = list(Note.objects.filter(category_id=category['id'])[10 * (page - 1): 10 * page].values())
				except NoteCategory.DoesNotExist:
						return make_json_response(404, GN001)
		
		for idx in range(len(notes)):
				notes[idx]['category'] = model_to_dict(NoteCategory.objects.get(pk=notes[idx]['category_id']))
				del notes[idx]['category_id']

		data = deepcopy(GN000)
		data['notes'] = notes[10 * (page - 1): 10 * page]
		data['cnt'] = cnt
		return make_json_response(200, data)


@require_http_methods(["GET"])
def search_note(request, query_string, page):
		try:
				notes = list(Note.objects.filter(
					Q(title__icontains = query_string) |
					Q(tags__icontains = query_string))
					.distinct()
					.values()
				)
				cnt = len(notes)
		except NoteCategory.DoesNotExist:
				return make_json_response(404, GA001)
		
		for idx in range(len(notes)):
				notes[idx]['category'] = {'id': -1, 'name': 'all'}
				del notes[idx]['category_id']

		data = deepcopy(GA000)
		data['notes'] = notes[10 * (page - 1): 10 * page]
		data['cnt'] = cnt
		return make_json_response(200, data)


@require_http_methods(["GET"])
def get_note_detail(request, note_pk):
		try:
				note = model_to_dict(Note.objects.get(pk=note_pk))
		except Note.DoesNotExist:
				return make_json_response(400, GN002)

		f = open(note['contents_url'], 'r')
		contents = ''.join(f.readlines())
		directory = '/'.join(note['contents_url'].split('/')[:-1])
		note['contents'] = contents.replace('![img](', f'![img](http://www.im-dev-lee.site/{directory}/')

		data = deepcopy(GN000)
		data['note'] = note
		return make_json_response(200, data)


@require_http_methods(["GET"])
def get_category_list(request):
		category = list(NoteCategory.objects.all().values())

		data = deepcopy(GC000)
		data['category'] = category
		return make_json_response(200, data)