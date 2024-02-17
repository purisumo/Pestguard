from django.db import models

# Create your models here.

class Pest(models.Model):
    name = models.CharField(max_length=255, blank=False, null=True)
    img = models.ImageField(upload_to='Pest')
    info = models.TextField()
    prevention = models.TextField()
    description = models.TextField()
    target = models.TextField()
    location = models.TextField()
    map = models.ImageField(upload_to='maps')
    feedback = models.TextField()
    img1 = models.ImageField(upload_to='pest')
    img2 = models.ImageField(upload_to='pest')
    img3 = models.ImageField(upload_to='pest')

    def __str__(self):
        return self.name
    
class About(models.Model):
    detail = models.TextField()
    image = models.ImageField(upload_to='About')

    def __str__(self):
        return self.detail
    
class Contact(models.Model):
    info = models.TextField()
    number = models.IntegerField()
    email = models.EmailField()
    address = models.TextField()

    def __str__(self):
        return self.info