from django.urls import path

from . import views

urlpatterns = [
    path('courses/add-course/', views.createCourse),
    path('courses/<int:id>/', views.courseGetUpdateDeleteOperations),

    path('users/add-user/', views.createUser),
    path('users/<int:id>', views.userGetUpdateDeleteOperations),
    path('users/validate/', views.validateUser),

    path('purchased/<int:id>', views.userPurchasedCourses),
    path('purchased/', views.addPurchase),
]
