from django.http import JsonResponse


def category(reqeust):
		category = {
				'etc': 1,
		}

		return JsonResponse(data=category, safe=False)


def article(request, category, title):
		path = f'articles/{category}/{title}/contents.md'
		article_file = open(path, 'r')
		data = {
				'contents': article_file.read()
		}
		article_file.close()
		return JsonResponse(data=data, safe=False)