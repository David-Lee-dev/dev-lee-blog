from multiprocessing.reduction import duplicate
from django.http import JsonResponse
from post.models import Article


def make_json_response(status, data):
		data = { 'data': data } if status == 200 else { 'error': data }
		
		return JsonResponse(status=status, data=data, safe=False, json_dumps_params={'ensure_ascii': False})



def duplicate_post_checker(contents_url, title):
		try:
				open(contents_url)
				return True
		except:
				pass

		try:
				Article.objects.get(title=title)
				return True
		except Article.DoesNotExist:
				pass	
		
		return False