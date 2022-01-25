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
    data = json.loads(request.body)

    name = data.get('name')
    short_description = data.get('short_description')
    description = data.get('description')
    price = data.get('price')
    image_URL = data.get('image_URL')
    id = data.get('autor_id')

    autor_id = User.objects.get(id=id)

    course = Course(name=name, short_description=short_description, description=description,
                    price=price, image_URL=image_URL, autor_id=autor_id)
    course.save()

    #data = serializers.serialize('json', ['Course added'])
    #data = json.loads(data)
    return JsonResponse(['Course added'], safe=False)


@csrf_exempt
def createUser(request):
    data = json.loads(request.body)

    username = data.get('username')
    password = data.get('password')
    balance = 999
    author = data.get('author')

    check_username = User.objects.filter(username=username).count()

    if check_username == 0:

        user = User(username=username, password=password,
                    balance=balance, autor=author)
        user.save()

        data = 'User added'
        return JsonResponse([data], safe=False)

    return JsonResponse(['Username exists !'], safe=False)


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
    data = json.loads(request.body)

    username = data.get('username')
    password = data.get('password')
    user = User.objects.filter(username=username, password=password)

    if not user.count():
        # ako nema korisnika koji se podudara sa unetim podacima
        return JsonResponse(['Wrong username or password !'], safe=False)

    data = serializers.serialize('json', user)
    data = json.loads(data)
    return JsonResponse(data, safe=False)


@csrf_exempt
def addPurchase(request):
    data = json.loads(request.body)

    user_id = data.get('user_id')
    course_id = data.get('course_id')

    bought = PurchasedCourses(user_id=User.objects.get(
        id=user_id), course_id=Course.objects.get(id=course_id))
    bought.save()
    message = 'Purchase added !'

    return JsonResponse([message], safe=False)


@csrf_exempt
def getAllCurses(request):
    courses = Course.objects.all()

    data = serializers.serialize('json', courses)
    data = json.loads(data)
    return JsonResponse(data, safe=False)


@csrf_exempt
def getAllAuthroCourses(request, id):
    courses = Course.objects.filter(autor_id=id)

    data = serializers.serialize('json', courses)
    data = json.loads(data)
    return JsonResponse(data, safe=False)


@csrf_exempt
def userPurchasedCourses(request, id):

    purchasedCourses = PurchasedCourses.objects.filter(user_id=id)

    if not purchasedCourses.count():
        return JsonResponse([-1], safe=False)

    data = serializers.serialize('json', purchasedCourses)
    data = json.loads(data)
    return JsonResponse(data, safe=False)
