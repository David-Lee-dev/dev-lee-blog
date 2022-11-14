from django.http import JsonResponse
from post.models import Post
from note.models import Note


def make_json_response(status, data):
		data = { 'data': data } if status == 200 else { 'error': data }
		
		return JsonResponse(status=status, data=data, safe=False, json_dumps_params={'ensure_ascii': False})


def empty_field_checker(*fields):
		for field in fields:
				if not field:
						return True
		
		return False


def duplicate_checker(contents_url, title):
		try:
				open(contents_url)
				return True
		except:
				pass

		if contents_url.split('/')[1] == 'posts':
				try:
						Post.objects.get(title=title)
						return True
				except Post.DoesNotExist:
						pass	
		else:
				try:
						Note.objects.get(title=title)
						return True
				except Note.DoesNotExist:
						pass	
		
		return False