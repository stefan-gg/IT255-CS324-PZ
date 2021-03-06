# Generated by Django 4.0.1 on 2022-01-16 23:18

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0001_initial'),
    ]

    operations = [
        migrations.AlterField(
            model_name='course',
            name='autor_id',
            field=models.ForeignKey(null=True, on_delete=django.db.models.deletion.RESTRICT, to='api.user'),
        ),
        migrations.AlterField(
            model_name='purchasedcourses',
            name='course_id',
            field=models.ForeignKey(null=True, on_delete=django.db.models.deletion.RESTRICT, to='api.course'),
        ),
        migrations.AlterField(
            model_name='purchasedcourses',
            name='user_id',
            field=models.ForeignKey(null=True, on_delete=django.db.models.deletion.RESTRICT, to='api.user'),
        ),
    ]
