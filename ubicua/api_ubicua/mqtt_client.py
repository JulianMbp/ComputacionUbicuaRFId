import paho.mqtt.client as mqtt
from datetime import datetime
from .models import RfidData

# Configuración del broker
MQTT_BROKER = "w87aa8f8.ala.eu-central-1.emqxsl.com"
MQTT_PORT = 8883
MQTT_TOPIC = "empleados/rfid"
MQTT_CLIENT_ID = "django_backend"

# Callback cuando se conecta al broker
def on_connect(client, userdata, flags, rc):
    print("Conectado al broker MQTT con código: ", rc)
    client.subscribe(MQTT_TOPIC)

# Callback cuando llega un mensaje
def on_message(client, userdata, msg):
    print(f"Mensaje recibido: {msg.payload.decode()}")
    data = msg.payload.decode()

    # Parsear el mensaje JSON
    import json
    try:
        rfid_data = json.loads(data)
        uid = rfid_data.get("id")
        timestamp = datetime.now()
        # Guardar en la base de datos
        RfidData.objects.create(uid=uid, timestamp=timestamp)
        print(f"Guardado UID: {uid} en la base de datos")
    except json.JSONDecodeError as e:
        print("Error al parsear JSON: ", e)

# Configurar el cliente MQTT
client = mqtt.Client(client_id=MQTT_CLIENT_ID)
client.tls_set()  # Habilitar TLS
client.on_connect = on_connect
client.on_message = on_message

# Conectarse al broker
client.username_pw_set("esp32-user", "123456789")  # Si es necesario
client.connect(MQTT_BROKER, MQTT_PORT, 60)

# Mantener el cliente corriendo
def start_mqtt():
    client.loop_start()