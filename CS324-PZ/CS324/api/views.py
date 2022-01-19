from asyncio.windows_events import NULL
from enum import auto
from django.shortcuts import render
from api.models import Course, PurchasedCourses, User
from django.http.response import HttpResponse, JsonResponse
from django.core import serializers
import json
from django.views.decorators.csrf import csrf_exempt

# Create your views here.

@csrf_exempt
def courseGetUpdateDeleteOperations(request, id):
    #user = User(username='Username', password='1234', balance=100, autor=True)
    # user.save()

    #course = Course(name="HTML5", short_description="Short", description='Desc', price=89.99, image_URL='image', autor_id=User.objects.get(id=2))
    # course.save()

    # course.autor_id.add(User.objects.get(id=1))
    # course.save()
    #kupljen = PurchasedCourses(user_id=User.objects.get(id=1),course_id=Course.objects.get(id=3))
    # kupljen.save()

    # PurchasedCourses.objects.all().delete()

    # kupljen.user_id.add(User.objects.get(id=1))
    # kupljen.course_id.add(Course.objects.get(id=1))
    # PurchasedCourses.objects.get(id=1).delete()

    if request.method == 'GET':
        data = Course.objects.get(id=id)
        data = serializers.serialize('json', [data])
        data = json.loads(data)

    elif request.method == 'PUT':
        name = request.POST['name']
        short_description = request.POST['short_description']
        description = request.POST['description']
        price = request.POST['price']
        image_URL = request.POST['image_URL']
        autor_id = User.objects.get(id=request.POST['autor_id'])

        Course.objects.filter(id=id).update(name=name, short_description=short_description, description=description,
                                            price=price, image_URL=image_URL, autor_id=autor_id)
        data = 'Course updated'

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

    user = User(username=username, password=password,balance=balance,autor=author)
    user.save()

    ##data = serializers.serialize('json', ['User added'])
    data = 'User added'
    return JsonResponse([data], safe=False)

@csrf_exempt
def userGetUpdateDeleteOperations(request, id):
    if request.method == 'GET':
        data = User.objects.get(id=id)
        data = serializers.serialize('json', [data])
        data = json.loads(data)

    elif request.method == 'PUT':
        username = request.POST['username']
        password = request.POST['password']
        balance = request.POST['balance']
        autor = request.POST['autor']
        User.objects.filter(id=id).update(username=username, password=password, balance=balance, autor=autor)
        data = 'User updated'

    elif request.method == 'DELETE':
        PurchasedCourses.objects.filter(user_id=id).delete()
        User.objects.filter(id=id).delete()
        data = 'User deleted'

    return JsonResponse(data, safe=False)

@csrf_exempt
def validateUser(request):
    username = request.POST['username']
    password = request.POST['password']

    user = User.objects.filter(username = username, password = password)
    
    if not user.count():
        #ako nema korisnika koji se podudara sa kriterijumima
        return JsonResponse(['Wrong username or password !'], safe=False)

    data = serializers.serialize('json', [user])
    data = json.loads(data)
    return JsonResponse(data, safe=False)

@csrf_exempt
def addPurchase(request):
    bought = PurchasedCourses(user_id=User.objects.get(id=request.POST['user_id']),course_id=Course.objects.get(request.POST['course_id']))
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