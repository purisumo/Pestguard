import os
from django.shortcuts import render, redirect, get_object_or_404
from django.http import JsonResponse, StreamingHttpResponse, HttpResponse
from django.contrib.auth.decorators import login_required
from django.contrib.admin.views.decorators import staff_member_required
from django.core.paginator import Paginator, EmptyPage, PageNotAnInteger
from django.contrib.admin.views.decorators import staff_member_required
from django.contrib.auth.mixins import UserPassesTestMixin
from django.utils.decorators import method_decorator
from django.contrib import messages
from django.db.models import Q

# from ultralytics import YOLO
import yaml
import torch
import cv2
import base64
import numpy as np
import math
import json 
from django.views.decorators.csrf import csrf_exempt
from django.core.files.storage import default_storage
# from inference import InferencePipeline
# # Import the built in render_boxes sink for visualizing results
# from inference.core.interfaces.stream.sinks import render_boxes

from django.views.generic.edit import UpdateView
from django.urls import reverse_lazy
from .forms import *
from .models import *

def index(request):
    about = About.objects.all()
    pests = Pest.objects.all()[:3]

    context = {
        'pests': pests,
        'about':about
    }
    return render(request, 'index.html', context)

def pest(request):
    pests_list = Pest.objects.all()

    # Set the number of items per page
    items_per_page = 6

    # Get the current page number from the request's GET parameters
    page = request.GET.get('page', 1)

    # Create a Paginator object
    paginator = Paginator(pests_list, items_per_page)

    try:
        pests = paginator.page(page)
    except PageNotAnInteger:
        # If page is not an integer, deliver first page.
        pests = paginator.page(1)
    except EmptyPage:
        # If page is out of range (e.g., 9999), deliver the last page of results.
        pests = paginator.page(paginator.num_pages)

    context = {
        'pests': pests,
    }
    return render(request, 'pest.html', context)

def pestdetail(request, id):

    pest = get_object_or_404(Pest, id=id)

    context = {
        'pest': pest
    }

    return render(request, 'pest-details.html', context)

def detection(request):
    pests = Pest.objects.all()
    context = {
        'pests': pests
    }
    return render(request, 'detection.html', context)

def search_ajax(request):
    query = request.GET.get('query', '')

    # Define the fields you want to search in
    search_fields = [
        'name__iexact',
    ]

    # Create a Q object for each field with the query
    queries = Q()
    for field in search_fields:
        queries |= Q(**{field: query})

    all_pests = Pest.objects.filter(queries)

    if not all_pests:
        return JsonResponse({'message': 'No results found'}, status=200)

    # Initialize a list of dictionaries
    pest_list = []

    # Filter out pests based on additional criteria if needed
    for pest in all_pests:
        # Example: Display only pests with a certain condition
        if pest.name:
            pest_list.append({
                'id': pest.id,
                'name': pest.name,
                'img': pest.img.url,
                'info': pest.info,
            })

    return JsonResponse({'pests': pest_list, 'query_res': query}, status=200)

def about(request):
    about = About.objects.all()
    context = {
        'about': about
    }
    return render(request, 'about-us.html', context)

def contact(request):
    contact = Contact.objects.all()
    context = {
        'contact': contact
    }
    return render(request, 'contact.html', context)

def send(request):

    return render(request, 'send.html')

def search(request):
    query = request.GET.get('query', '')
    filter_option = request.GET.get('filter', '')
    queries = None
    # Define the fields you want to search in
    search_fields = [
        'name__iexact', 'info__icontains', 'prevention__icontains',
        'description__icontains', 'target__icontains', 'location__icontains',
    ]
    
    # Create a Q object for the name field with the query
    name_query = Q(name__iexact=query)
    if Pest.objects.filter(name_query).exists():
        queries = name_query

        if filter_option:
            queries &= Q(location__icontains=filter_option.lower())  

    else:
        # Create a Q object for the other fields with the query
        queries = Q()
        for field in search_fields:
            queries |= Q(**{field: query})

        if filter_option:
            queries &= Q(location__icontains=filter_option.lower())  
            
    pests = Pest.objects.filter(queries)       
    if not pests:
        messages.info(request, ':( Sorry Keyword not Found Please Try Again')

    return render(request, 'pest.html', {'pests': pests, 'query': query})


####################################################################################
                                    # YOLO #
####################################################################################
# @csrf_exempt
# def generate_frames(request):

#     return HttpResponse("Invalid request", status=400)

# @csrf_exempt
# def generate_frames(request):
#     # object classes
#     classNames = ["asian long horned beetle", "bertha armyworm",
#                     "brown marmorated stink bug", "brown planthopper","chinch bug", "cockroach", 
#                     "colorado potato beetle", "diaphorina-citri", "earwig", "emerald-ash-borer", "fungus-gnats",
#                     "grasshopper", "gypsy-moth", "japanese-beetle", "lice", "mealy-bug", "rats", "slater", "snail",
#                     "taro-hornworm", "termites", "thrips", "tobacco-whitefly", "weevil", "wire-worm",
#                 ]
#     model = YOLO("yolo-Weights/best.pt")

#     # Placeholder values, replace with your actual values
#     confidence_threshold = 0.5
#     detected_class = ''
#     texts = ''
#     if request.method == 'POST':
#         try:
#             image_data_url = request.POST.get('image', '')
#             # Convert image data URL to OpenCV image format
#             img_data = image_data_url.split(',')[1]
#             img_bytes = base64.b64decode(img_data)
#             img_array = np.frombuffer(img_bytes, dtype=np.uint8)
#             img = cv2.imdecode(img_array, cv2.IMREAD_COLOR)

#             # Process the image using YOLO model
#             results = model(img, stream=True)
#             boxes = []

#             for r in results:
#                 for box in r.boxes:
#                     confidence = box.conf[0]

#                     if confidence >= confidence_threshold:
#                         x1, y1, x2, y2 = map(int, box.xyxy[0])
#                         boxes.append({'x': x1, 'y': y1, 'width': x2 - x1, 'height': y2 - y1})
                        
#                         cls = int(box.cls[0])
#                         detected_class = classNames[cls]

#                         org = [x1, y1]
#                         font = cv2.FONT_HERSHEY_SIMPLEX
#                         fontScale = 0.75
#                         color = (255, 0, 0)
#                         thickness = 2

#                         texts = f'{detected_class} {confidence:.2%}'
                
#             # Print the result after processing all boxes
#             print(texts)

#             _, frame = cv2.imencode('.jpg', img)
#             frame_bytes = frame.tobytes()
            
#             data = {"texts": texts, "boxes": boxes}
#             return JsonResponse(data)

#         except Exception as e:
#             print(f"Error processing image: {e}")

#     return HttpResponse("Invalid request", status=400)


#           yield (b'--frame\r\n'
#               b'Content-Type: image/jpeg\r\n\r\n' + frame_bytes + b'\r\n\r\n')
            # Include bounding box information in the response
            # Include bounding box information and confidence in the response

# def loadData(request, detected_class):
#     if detected_class:
#         data = {"response": detected_class}
#         return JsonResponse(data)

# def video_feed(request):
#     return StreamingHttpResponse(generate_frames(request), content_type='multipart/x-mixed-replace; boundary=frame')

# def generate_frames(request):
#     cap = cv2.VideoCapture(0)
#     classNames = ["asian long horned beetle", "bertha armyworm",
#                     "brown marmorated stink bug", "brown planthopper","chinch bug", "cockroach", 
#                     "colorado potato beetle", "diaphorina-citri", "earwig", "emerald-ash-borer", "fungus-gnats",
#                     "grasshopper", "gypsy-moth", "japanese-beetle", "lice", "mealy-bug", "rats", "slater", "snail",
#                     "taro-hornworm", "termites", "thrips", "tobacco-whitefly", "weevil", "wire-worm",
#                 ]
#     model = YOLO("yolo-Weights/best.pt")

#     cap.set(3, 640)
#     cap.set(4, 640)
#     detected_class = ''
#     confidence_threshold = 0.1
#     while True:
#         success, img = cap.read()
#         results = model(img, stream=True)
        
#         for r in results:
#             boxes = r.boxes

#             for box in boxes:
#                 confidence = box.conf[0]

#                 if confidence >= confidence_threshold:
#                     x1, y1, x2, y2 = map(int, box.xyxy[0])
#                     cv2.rectangle(img, (x1, y1), (x2, y2), (255, 0, 255), 3)

#                     cls = int(box.cls[0])
#                     detected_class = classNames[cls]

#                     org = [x1, y1]
#                     font = cv2.FONT_HERSHEY_SIMPLEX
#                     fontScale = 0.75
#                     color = (255, 0, 0)
#                     thickness = 2

#                     text = f'{detected_class} {confidence:.2%}'
#                     cv2.putText(img, text, org, font, fontScale, color, thickness)

#         _, frame = cv2.imencode('.jpg', img)
#         frame_bytes = frame.tobytes()
#         yield (b'--frame\r\n'
#                b'Content-Type: image/jpeg\r\n\r\n' + frame_bytes + b'\r\n\r\n')

####################################################################################
                                    # ADMIN #
####################################################################################

@staff_member_required(login_url=reverse_lazy('admin:login'))
def adhome(request):

    return render(request, 'admin/home.html')

@staff_member_required(login_url=reverse_lazy('admin:login'))
def dashboard(request):
    pests = Pest.objects.all()
    context = {
        'pests':pests
    }
    return render(request, 'admin/dashboard.html', context)

@staff_member_required(login_url=reverse_lazy('admin:login'))
def model_upload(request):
    json_file_path = 'training_history.json'

    try:
        with open(json_file_path, 'r') as file:
            training_history_data = json.load(file)
    except FileNotFoundError:
        training_history_data = None

    try:
        if request.method == 'POST':
            model_file = request.FILES.get('model')
            mAp50 = request.POST.get('training_accuracy')
            mAP50_95 = request.POST.get('validation_accuracy')
            boxloss = request.POST.get('validation_loss')
            num_classes = request.POST.get('classes')
            data_length = request.POST.get('class_length')

            # Validate if model file is provided
            if not model_file:
                return JsonResponse({'message': 'Model file is required.'})

            # Validate numeric values
            try:
                mAp50 = float(mAp50)
                mAP50_95 = float(mAP50_95)
                boxloss = float(boxloss)
                num_classes = int(num_classes)
                data_length = int(data_length)
            except (TypeError, ValueError):
                return JsonResponse({'message': 'Invalid numeric value provided.'})
            
            temp_model_path = f'tmp_model_{model_file.name}'  # Specify the temporary model path

            with open(temp_model_path, 'wb') as temp_model_file:
                    for chunk in model_file.chunks():
                        temp_model_file.write(chunk)

                # Load the PyTorch model directly from the temporary path
            model = torch.load(temp_model_path, map_location=torch.device('cpu'))

                # Save the loaded model in PyTorch format
            torch.save(model, 'yolo-Weights/best.pt')

            os.remove(temp_model_path)

            # Assuming 'data' is a dictionary containing your training history data
            data = {
                'training_accuracy': mAp50,
                'validation_accuracy': mAP50_95,
                'validation_loss': boxloss,
                'num_classes': num_classes,
                'data_length': data_length,
            }

            with open('training_history.json', 'w') as json_file:
                json.dump(data, json_file)

            response_data = {'progress': 100, 'message': 'Upload Completed'}
            return JsonResponse(response_data)
        
    except Exception as e:
        print(f"Error: {str(e)}")

    return render(request, 'Admin/model-upload.html', {'training_history_data': training_history_data})

@staff_member_required(login_url=reverse_lazy('admin:login'))
def pestlist(request):
    pests_list = Pest.objects.all()

    # Set the number of items per page
    items_per_page = 10

    # Get the current page number from the request's GET parameters
    page = request.GET.get('page', 1)

    # Create a Paginator object
    paginator = Paginator(pests_list, items_per_page)

    try:
        pests = paginator.page(page)
    except PageNotAnInteger:
        # If page is not an integer, deliver first page.
        pests = paginator.page(1)
    except EmptyPage:
        # If page is out of range (e.g., 9999), deliver the last page of results.
        pests = paginator.page(paginator.num_pages)

    if request.method == 'POST':
        form = PestForm(request.POST, request.FILES)
        if form.is_valid():
            form.save()
            return redirect('pestlist')
    else:
        form = PestForm()

    context = {
        'pests': pests,
        'form': form,
    }
    return render(request, 'admin/pests_list.html', context)

@method_decorator(staff_member_required(login_url=reverse_lazy('admin:login')), name='dispatch')
class PestUpdateView(UpdateView):
    model = Pest
    form_class = PestForm
    template_name = 'admin/cms_template.html'
    success_url = reverse_lazy('pestlist')

    def test_func(self):
        # This function is called to determine if the user passes the test
        return self.request.user.is_staff
    
@staff_member_required(login_url=reverse_lazy('admin:login'))
def pest_delete_view(request, pk):
    pest = get_object_or_404(Pest, pk=pk)

    image_fields = ['img', 'map', 'img1', 'img2', 'img3']

    # Delete the image files from storage
    for field_name in image_fields:
        field_value = getattr(pest, field_name, None)
        if field_value:
            image_path = field_value.path
            default_storage.delete(image_path)

    pest.delete()

    return redirect(request.META['HTTP_REFERER'])

@staff_member_required(login_url=reverse_lazy('admin:login'))
def feedbacklist(request):
    pests_list = Pest.objects.all()

    # Set the number of items per page
    items_per_page = 10

    # Get the current page number from the request's GET parameters
    page = request.GET.get('page', 1)

    # Create a Paginator object
    paginator = Paginator(pests_list, items_per_page)

    try:
        pests = paginator.page(page)
    except PageNotAnInteger:
        # If page is not an integer, deliver first page.
        pests = paginator.page(1)
    except EmptyPage:
        # If page is out of range (e.g., 9999), deliver the last page of results.
        pests = paginator.page(paginator.num_pages)

    context = {
        'pests': pests,
    }

    return render(request, 'admin/feedback_list.html', context)

@staff_member_required(login_url=reverse_lazy('admin:login'))
def adabout(request):
    about = About.objects.all()

    if request.method == 'POST':
        if About.objects.exists():
            # If an object exists, redirect to the edit view
            return redirect('aboutedit')
        
        form = AboutForm(request.POST, request.FILES)

        if form.is_valid():
            form.save()
            return redirect('adabout')
    else:
        form = AboutForm()

    context = {
        'about': about,
        'form': form
    }
    return render(request, 'admin/about.html', context)

@method_decorator(staff_member_required(login_url=reverse_lazy('admin:login')), name='dispatch')
class AboutUpdateView(UpdateView):
    model = About
    form_class = AboutForm
    template_name = 'admin/cms_template.html'
    success_url = reverse_lazy('adabout')

    def test_func(self):
        # This function is called to determine if the user passes the test
        return self.request.user.is_staff
    
@staff_member_required(login_url=reverse_lazy('admin:login'))
def aboutdelete(request, pk):
    about = get_object_or_404(About, pk=pk)

    image_path = about.image.path

    default_storage.delete(image_path)

    about.delete()

    return redirect(request.META['HTTP_REFERER'])

@staff_member_required(login_url=reverse_lazy('admin:login'))
def adcontact(request):
    contact = Contact.objects.all()

    if request.method == 'POST':
        if Contact.objects.exists():
            # If an object exists, redirect to the edit view
            return redirect('aboutedit')
        
        form = ContactForm(request.POST, request.FILES)

        if form.is_valid():
            form.save()
            return redirect('adcontact')
    else:
        form = ContactForm()
    context = {
        'contact': contact,
        'form': form
    }

    return render(request, 'admin/contact_us.html', context)

@method_decorator(staff_member_required(login_url=reverse_lazy('admin:login')), name='dispatch')
class ContactUpdateView(UpdateView):
    model = Contact
    form_class = ContactForm
    template_name = 'admin/cms_template.html'
    success_url = reverse_lazy('adcontact')

    def test_func(self):
        # This function is called to determine if the user passes the test
        return self.request.user.is_staff
    
@staff_member_required(login_url=reverse_lazy('admin:login'))
def contactdelete(request, pk):
    con = get_object_or_404(Contact, pk=pk)

    con.delete()

    return redirect(request.META['HTTP_REFERER'])