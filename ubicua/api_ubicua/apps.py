from django.apps import AppConfig

class ApiUbicuaConfig(AppConfig):
    default_auto_field = 'django.db.models.BigAutoField'
    name = 'api_ubicua'

    def ready(self):
        from .mqtt_client import start_mqtt
        start_mqtt()