from env import POST_PASSWORD
from django.test import TestCase
from django.test import Client

class PostTest(TestCase):
		def test_create_and_delete_post(self):
				test_file = open('testfile.md', 'r')
				data = {
							'title': 'testtitle',
							'tags': 'testtag',
							'category': 'test category',
							'password': POST_PASSWORD,
							'contents_file': test_file
						}
				c = Client()
				response = c.post('/api/post/create', data)
				self.assertTrue(response.status_code == 200)
				response = c.delete('/api/post/delete/1')
				self.assertTrue(response.status_code == 200)

				
		def test_create_post_with_empty_field(self):
				test_file = open('testfile.md', 'r')
				
				for i in range(5):
						data = {
									'title': 'testtitle',
									'tags': 'testtag',
									'category': 'test category',
									'password': POST_PASSWORD,
									'contents_file': test_file
								}
						key = list(data.keys())[i]
						data[key] = ''
						c = Client()
						response = c.post('/api/post/create', data)
						if response.status_code == 400 and response.json()['error']['code'] == 'CA003':
								print('제목, 태그, 카테고리 중 하나가 빈 필드입니다.')
						elif response.status_code == 400 and response.json()['error']['code'] == 'CP001':
								print('비밀번호가 틀렸습니다.')
						elif response.status_code == 400 and response.json()['error']['code'] == 'CA002':
								print('본문 파일이 빈 필드입니다.')
						else:
								self.assertTrue(False)


		def test_create_duplicated_post(self):
				test_file = open('testfile.md', 'r')
				data = {
							'title': 'testtitle',
							'tags': 'testtag',
							'category': 'test category',
							'password': POST_PASSWORD,
							'contents_file': test_file
						}
				c = Client()
				response = c.post('/api/post/create', data)
				self.assertTrue(response.status_code == 200)
				response = c.post('/api/post/create', data)
				self.assertTrue(response.status_code == 400 and response.json()['error']['code'] == 'CA001')
				response = c.delete('/api/post/delete/1')
				self.assertTrue(response.status_code == 200)