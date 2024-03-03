from django.contrib import admin
from django.urls import path
from . import views
from .views import *

urlpatterns = [
    path('', index, name='index'),
    path('pest/', pest, name='pest'),
    path('pest-detail/<int:id>', pestdetail, name='pestdetail'),
    path('detection/', detection, name='detection'),
    path('about/', about, name='about'),
    path('contact/', contact, name='contact'),
    path('send/', send, name='send'),
    path('search/', search, name='search'),
    path('search_ajax/', search_ajax, name='search_ajax'),
    #################YOLO#######################

    # path('loadData/', loadData, name='loadData'),
    # path('video_feed/', video_feed, name='video_feed'),
    # path('generate_frames/', generate_frames, name='generate_frames'),

    #################ADMIN#######################

    path('admin-home/', adhome, name='adhome'),
    path('dashboard/', dashboard, name='dashboard'),
    path('model_upload/', model_upload, name='model_upload'),
    path('pestlist/', pestlist, name='pestlist'),
    path('pests/<int:pk>/edit/', PestUpdateView.as_view(), name='pest_edit'),
    path('pests/<int:pk>/delete/', pest_delete_view, name='pest_delete'),
    path('feedbacklist/', feedbacklist, name='feedbacklist'),
    path('ad-about/', adabout, name='adabout'),
    path('about/<int:pk>/edit/', AboutUpdateView.as_view(), name='aboutedit'),
    path('about/<int:pk>/delete', aboutdelete, name='aboutdelete'),
    path('ad-contact/', adcontact, name='adcontact'),
    path('contact/<int:pk>/edit/', ContactUpdateView.as_view(), name='contactedit'),
    path('contact/<int:pk>/delete', contactdelete, name='contactdelete'),

]