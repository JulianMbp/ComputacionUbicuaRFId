from rest_framework import serializers
from .models import RfidData

class RfidDataSerializer(serializers.ModelSerializer):
    class Meta:
        model = RfidData
        fields = ['uid', 'timestamp']