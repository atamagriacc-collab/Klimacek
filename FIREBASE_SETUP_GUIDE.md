# Firebase Setup Guide for Weather Stations

## ✅ Fixed: App Now Runs Without Firebase Auth Errors

The app has been updated to handle missing Firebase credentials gracefully. You can now run the app and access the weather-stations page even without complete Firebase configuration.

## To Enable Full Firebase Integration

### Step 1: Get Your Firebase Credentials

1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Select your project (or create a new one)
3. Go to Project Settings (gear icon)
4. Under "Your apps", find your web app
5. Copy the configuration values

### Step 2: Update .env.local

Replace the placeholder values in `.env.local` with your actual Firebase credentials:

```env
# Required for Weather Stations page
NEXT_PUBLIC_FIREBASE_DATABASE_URL=https://your-actual-project.firebaseio.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your-actual-project-id

# Optional - for authentication features
NEXT_PUBLIC_FIREBASE_API_KEY=your-actual-api-key
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your-project.firebaseapp.com
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your-project.firebasestorage.app
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your-sender-id
NEXT_PUBLIC_FIREBASE_APP_ID=your-app-id
```

### Step 3: Configure Firebase Realtime Database Rules

In Firebase Console, go to Realtime Database > Rules and set:

```json
{
  "rules": {
    "sensor_data": {
      ".read": true,
      ".write": true
    }
  }
}
```

**Note:** For production, implement proper security rules!

### Step 4: Test the Integration

1. **Start the app:**
   ```bash
   npm run dev
   ```

2. **Send test data:**
   ```bash
   node test-iot-integration.js
   ```

3. **Simulate continuous data:**
   ```bash
   node test-iot-integration.js --continuous
   ```

4. **Visit the weather stations page:**
   http://localhost:3000/weather-stations

## What's Working Now

✅ **App runs without Firebase Auth errors**
- The app now handles missing Firebase Auth credentials gracefully
- Firebase Auth is optional - the app works without it

✅ **Weather Stations page is ready for data**
- Real-time listeners are set up
- UI will update automatically when data arrives
- All sensor metrics are mapped correctly

✅ **API endpoint is functional**
- `/api/iot/sensor-data` accepts POST requests from IoT devices
- Data is stored in Firebase when configured

## Troubleshooting

### If you see "Firebase database not initialized" on weather-stations page:
- Update `.env.local` with your actual Firebase credentials
- Restart the development server after updating `.env.local`

### If test script fails to send data:
- Make sure your dev server is running
- Check that Firebase Realtime Database rules allow writes
- Verify your Firebase project has Realtime Database enabled

### To use with actual ESP32 device:
- Update the ESP32 code to point to your server URL
- Use the JSON format specified in IOT_INTEGRATION_DOCS.md
- Ensure your server is accessible from the ESP32 network

## Current Status

The app is now running on port 3001 (because port 3000 is in use).
You can access it at: http://localhost:3001

The weather-stations page will display real sensor data once you:
1. Configure Firebase with your actual credentials
2. Send data using the test script or actual IoT devices