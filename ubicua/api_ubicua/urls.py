from django.urls import path
from .views import RfidDataList

urlpatterns = [
    path('rfid/', RfidDataList.as_view(), name='rfid-data'),
]