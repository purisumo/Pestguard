from django import forms
from .models import *

class PestForm(forms.ModelForm):
    class Meta:
        model = Pest
        fields = '__all__'

class AboutForm(forms.ModelForm):
    class Meta:
        model = About
        fields = '__all__'

class ContactForm(forms.ModelForm):
    class Meta:
        model = Contact
        fields = '__all__'