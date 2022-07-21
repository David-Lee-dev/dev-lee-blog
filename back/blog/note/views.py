import os
from shutil import rmtree
from env import POST_PASSWORD
from messages import *
from utils import *
from django.shortcuts import render
from .models import Note, NoteCategory
from .forms import NoteForm, UploadForm
from django.views.decorators.http import require_http_methods
from django.core.files.storage import FileSystemStorage


@require_http_methods(["GET", "POST"])
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
					tags=str(tags),	
					contents_url=contents_url,
					category=category
				)
				note.save()
				return make_json_response(200, CN000)


@require_http_methods(["DELETE"])
def delete_note(request, pk):
		try:
				note = Note.objects.get(pk=pk)
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

				
		