from . import models
from rest_framework import serializers

class UserSerializer(serializers.ModelSerializer):

    class Meta:
        model = models.User
        fields = ['id', 'first_name', 'last_name']