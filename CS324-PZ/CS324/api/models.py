from django.db import models

# Create your models here.


class User(models.Model):
    username = models.CharField(max_length=128)
    password = models.CharField(max_length=40)
    balance = models.FloatField()
    autor = models.BooleanField()

    def __str__(self):
        return self.username


class Course(models.Model):
    name = models.CharField(max_length=128)
    short_description = models.CharField(max_length=128)
    description = models.TextField(max_length=256)
    price = models.FloatField()
    image_URL = models.TextField(max_length=4056)
    autor_id = models.ForeignKey(User, null=True, on_delete=models.RESTRICT)

    def __str__(self):
        return self.name


class PurchasedCourses(models.Model):
    user_id = models.ForeignKey(User, null=True, on_delete=models.RESTRICT)
    course_id = models.ForeignKey(Course, null=True, on_delete=models.RESTRICT)

    def __str__(self):
        return self.user_id
