from dataclasses import field
from unicodedata import category
from django import forms
from .models import Article


class ArticleForm(forms.ModelForm):
		class Meta:
				model = Article
				field = '__all__'
				exclude = ('contents_url', 'category')

		category = forms.CharField(max_length=50)


class UploadForm(forms.Form):
		contents_file = forms.FileField(widget=forms.ClearableFileInput(attrs={'multiple': True}))