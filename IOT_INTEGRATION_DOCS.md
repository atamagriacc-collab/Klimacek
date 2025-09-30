# IoT Firebase Integration Documentation

## Overview
The weather stations page now integrates with Firebase Realtime Database to display live IoT sensor data instead of dummy data.

## Sensor Data Format
The IoT devices (ESP32) send data in the following JSON format:

```json
{
  "device_id": "ESP32-001",
  "timestamp": "2025-09-16 12:45:33",
  "wind_m_s": 3.2,
  "wind_kmh": 11.52,
  "rainrate_mm_h": 0.4,
  "temperature_C": 28.7,
  "humidity_%": 65.3,
  "light_lux": 530.5,
  "sol_voltage_V": 12.4,
  "sol_current_mA": 210.7,
  "sol_power_W": 2.61
}
```

## API Endpoint
**URL:** `/api/iot/sensor-data`

### POST - Send Sensor Data
Send sensor data from IoT device to Firebase.

**Request:**
```bash
POST /api/iot/sensor-data
Content-Type: application/json

{
  "device_id": "ESP32-001",
  "timestamp": "2025-09-16 12:45:33",
  "temperature_C": 28.7,
  ...
}
```

**Response:**
```json
{
  "success": true,
  "id": "firebase-generated-id",
  "message": "Data saved successfully"
}
```

### GET - Retrieve Sensor Data
Fetch recent sensor data from Firebase.

**Request:**
```bash
GET /api/iot/sensor-data?limit=50&device_id=ESP32-001
```

**Response:**
```json
{
  "success": true,
  "data": [...],
  "count": 50,
  "total": 100
}
```

## Weather Stations Page Features

### Real-time Data Display
The page now shows:
- **Live sensor readings** - Temperature, humidity, light, solar metrics, wind, rain
- **Active sensor count** - Shows how many sensors are providing data
- **Uptime percentage** - Calculated from data availability
- **Last update time** - Shows when data was last received

### Data Visualization
- **Sparkline graphs** - Shows last 7 readings for each metric
- **Change indicators** - Shows percentage change from average
- **Unit display** - Proper units for each measurement (°C, %, lux, V, mA, W, km/h, mm/h)

### Weather Forecast
- Generated based on current sensor conditions
- 18-hour prediction
- Conditions determined by humidity and rain rate

## Testing

### 1. Single Test Data
Send a single test data point:
```bash
node test-iot-integration.js
```

### 2. Continuous Simulation
Simulate continuous sensor data (every 10 seconds):
```bash
node test-iot-integration.js --continuous
```

## Firebase Configuration
Ensure these environment variables are set in `.env.local`:
```
NEXT_PUBLIC_FIREBASE_API_KEY=your-api-key
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your-auth-domain
NEXT_PUBLIC_FIREBASE_DATABASE_URL=your-database-url
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your-project-id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your-storage-bucket
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your-messaging-sender-id
NEXT_PUBLIC_FIREBASE_APP_ID=your-app-id
NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID=your-measurement-id
```

## Firebase Database Structure
```
sensor_data/
├── [auto-generated-id]/
│   ├── device_id: "ESP32-001"
│   ├── timestamp: "2025-09-16 12:45:33"
│   ├── temperature_C: 28.7
│   ├── humidity_: 65.3
│   ├── light_lux: 530.5
│   ├── sol_voltage_V: 12.4
│   ├── sol_current_mA: 210.7
│   ├── sol_power_W: 2.61
│   ├── wind_m_s: 3.2
│   ├── wind_kmh: 11.52
│   ├── rainrate_mm_h: 0.4
│   ├── server_timestamp: [Firebase server timestamp]
│   └── received_at: "2025-09-16T12:45:33.000Z"
```

## ESP32 Integration Example
```cpp
// ESP32 Arduino code example
#include <WiFi.h>
#include <HTTPClient.h>
#include <ArduinoJson.h>

const char* serverUrl = "https://your-domain.com/api/iot/sensor-data";

void sendSensorData() {
  if(WiFi.status() == WL_CONNECTED) {
    HTTPClient http;
    http.begin(serverUrl);
    http.addHeader("Content-Type", "application/json");

    StaticJsonDocument<512> doc;
    doc["device_id"] = "ESP32-001";
    doc["timestamp"] = getCurrentTimestamp();
    doc["temperature_C"] = readTemperature();
    doc["humidity_"] = readHumidity();
    // ... add other sensor readings

    String jsonString;
    serializeJson(doc, jsonString);

    int httpResponseCode = http.POST(jsonString);

    if(httpResponseCode > 0) {
      String response = http.getString();
      Serial.println("Data sent successfully");
    }

    http.end();
  }
}
```

## Troubleshooting

### No data showing on weather stations page
1. Check Firebase configuration in `.env.local`
2. Verify Firebase Realtime Database rules allow read/write
3. Check browser console for errors
4. Ensure IoT device is sending data to correct endpoint

### API returns 503 error
- Firebase is not properly configured
- Check environment variables

### Data not updating in real-time
- Check Firebase connection
- Verify real-time listeners are set up
- Check network connectivity

## Security Notes
- The API includes basic signature validation (optional)
- Set `IOT_SECRET` environment variable for enhanced security
- Consider implementing rate limiting for production
- Use HTTPS in production environment