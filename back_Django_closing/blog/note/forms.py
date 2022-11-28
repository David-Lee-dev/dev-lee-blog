from django import forms
from .models import Note


class NoteForm(forms.ModelForm):
		class Meta:
				model = Note
				field = '__all__'
				exclude = ('contents_url', 'category')

		category = forms.CharField(max_length=50)
		password = forms.CharField(max_length=100)


class UploadForm(forms.Form):
		contents_file = forms.FileField(widget=forms.ClearableFileInput(attrs={'multiple': True}))