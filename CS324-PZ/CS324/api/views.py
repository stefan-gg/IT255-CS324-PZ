from asyncio.windows_events import NULL
from enum import auto
from django.shortcuts import render
from api.models import Course, PurchasedCourses, User
from django.http.response import HttpResponse, JsonResponse
from django.core import serializers
import json
from django.views.decorators.csrf import csrf_exempt
from rest_framework.parsers import JSONParser
from api.serializers import CourseSerializer, UserSerializer

# Create your views here.


@csrf_exempt
def courseGetUpdateDeleteOperations(request, id):
    course = Course.objects.get(id=id)

    if request.method == 'GET':
        data = serializers.serialize('json', [course])
        data = json.loads(data)

    elif request.method == 'PUT':
        course_data = JSONParser().parse(request)

        course_serializer = CourseSerializer(course, data=course_data)

        if course_serializer.is_valid():
            course_serializer.save()
            data = 'Course updated'
        else:
            data = 'Course is not updated !'

    elif request.method == 'DELETE':

        PurchasedCourses.objects.filter(course_id=id).delete()
        Course.objects.filter(id=id).delete()
        data = 'Course deleted'

    return JsonResponse(data, safe=False)


@csrf_exempt
def createCourse(request):

    name = request.POST['name']
    short_description = request.POST['short_description']
    description = request.POST['description']
    price = request.POST['price']
    image_URL = request.POST['image_URL']
    autor_id = User.objects.get(id=request.POST['autor_id'])

    course = Course(name=name, short_description=short_description, description=description,
                    price=price, image_URL=image_URL, autor_id=autor_id)
    course.save()

    data = serializers.serialize('json', 'Course added')
    data = json.loads(data)
    return JsonResponse(data, safe=False)


@csrf_exempt
def createUser(request):

    username = request.POST['username']
    password = request.POST['password']
    balance = 999
    author = request.POST['author']

    user = User(username=username, password=password,
                balance=balance, autor=author)
    user.save()

    data = 'User added'
    return JsonResponse([data], safe=False)


@csrf_exempt
def userGetUpdateDeleteOperations(request, id):
    user = User.objects.get(id=id)

    if request.method == 'GET':
        data = serializers.serialize('json', [user])
        data = json.loads(data)

    elif request.method == 'PUT':

        user_data = JSONParser().parse(request)
        user_serializer = UserSerializer(user, data=user_data)

        if user_serializer.is_valid():
            user_serializer.save()
            data = 'User updated'
        else:
            data = 'User is not updated !'

    elif request.method == 'DELETE':
        PurchasedCourses.objects.filter(user_id=id).delete()
        User.objects.filter(id=id).delete()
        data = 'User deleted'

    return JsonResponse(data, safe=False)


@csrf_exempt
def validateUser(request):
    username = request.POST['username']
    password = request.POST['password']

    user = User.objects.filter(username=username, password=password)

    if not user.count():
        # ako nema korisnika koji se podudara sa unetim podacima
        return JsonResponse(['Wrong username or password !'], safe=False)

    data = serializers.serialize('json', [user])
    data = json.loads(data)
    return JsonResponse(data, safe=False)


@csrf_exempt
def addPurchase(request):
    user_id = request.POST['user_id']
    course_id = request.POST['course_id']
    bought = PurchasedCourses(user_id=User.objects.get(
        id=user_id), course_id=Course.objects.get(id=course_id))
    bought.save()
    message = 'Purchase added !'

    return JsonResponse([message], safe=False)


@csrf_exempt
def userPurchasedCourses(request, id):
    
    purchasedCourses = PurchasedCourses.objects.filter(user_id=id)

    if not purchasedCourses.count():
        return JsonResponse(['No purchased courses'], safe=False)

    data = serializers.serialize('json', purchasedCourses)
    data = json.loads(data)
    return JsonResponse(data, safe=False)
