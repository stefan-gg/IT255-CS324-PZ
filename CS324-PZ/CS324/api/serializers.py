from rest_framework import serializers
from api.models import User, Course


class UserSerializer(serializers.ModelSerializer):

    class Meta:
        model = User
        fields = ('id',
                  'username',
                  'password',
                  'balance',
                  'autor')


class CourseSerializer(serializers.ModelSerializer):

    class Meta:
        model = Course
        fields = ('id',
                  'name',
                  'short_description',
                  'description',
                  'price',
                  'image_URL')
