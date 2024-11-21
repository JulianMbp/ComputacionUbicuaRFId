from rest_framework.views import APIView
from rest_framework.response import Response
from .models import RfidData
from .serializer import RfidDataSerializer

class RfidDataList(APIView):
    def get(self, request):
        data = RfidData.objects.all()
        serializer = RfidDataSerializer(data, many=True)
        return Response(serializer.data)