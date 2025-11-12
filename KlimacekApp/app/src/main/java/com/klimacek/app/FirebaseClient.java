package com.klimacek.app;

import android.os.Handler;
import android.os.Looper;
import android.util.Log;

import androidx.annotation.NonNull;

import com.google.firebase.database.DataSnapshot;
import com.google.firebase.database.DatabaseError;
import com.google.firebase.database.DatabaseReference;
import com.google.firebase.database.FirebaseDatabase;
import com.google.firebase.database.ValueEventListener;

import java.util.ArrayList;
import java.util.Collections;
import java.util.Comparator;
import java.util.List;

public class FirebaseClient {
    private static final String TAG = "FirebaseClient";
    private final DatabaseReference databaseRef;
    private final Handler mainHandler;

    public FirebaseClient() {
        // Initialize Firebase Database
        FirebaseDatabase database = FirebaseDatabase.getInstance("https://atamagri-iot-default-rtdb.asia-southeast1.firebasedatabase.app");
        this.databaseRef = database.getReference("sensor_data");
        this.mainHandler = new Handler(Looper.getMainLooper());
    }

    public interface FirebaseCallback {
        void onSuccess(List<SensorData> data);
        void onError(String error);
    }

    public void getSensorData(final FirebaseCallback callback) {
        getSensorData(null, 10, callback);
    }

    public void getSensorData(String deviceId, int limit, final FirebaseCallback callback) {
        Log.d(TAG, "Fetching sensor data from Firebase");

        databaseRef.addListenerForSingleValueEvent(new ValueEventListener() {
            @Override
            public void onDataChange(@NonNull DataSnapshot dataSnapshot) {
                List<SensorData> sensorDataList = new ArrayList<>();

                try {
                    for (DataSnapshot snapshot : dataSnapshot.getChildren()) {
                        try {
                            // Parse data from Firebase
                            String id = snapshot.getKey();
                            String device = snapshot.child("device_id").getValue(String.class);

                            // Filter by device_id if specified
                            if (deviceId != null && !deviceId.isEmpty() && !deviceId.equals(device)) {
                                continue;
                            }

                            // Get sensor values with safe defaults
                            Float windKmh = safeGetFloat(snapshot, "wind_kmh");
                            Float rainrate = safeGetFloat(snapshot, "rainrate_mm_h");
                            Float temperature = safeGetFloat(snapshot, "temperature_C");
                            Float humidity = safeGetFloat(snapshot, "humidity_");
                            Float lightLux = safeGetFloat(snapshot, "light_lux");
                            Float solVoltage = safeGetFloat(snapshot, "sol_voltage_V");
                            Float solCurrent = safeGetFloat(snapshot, "sol_current_mA");
                            Float solPower = safeGetFloat(snapshot, "sol_power_W");

                            String receivedAt = snapshot.child("received_at").getValue(String.class);
                            if (receivedAt == null) {
                                receivedAt = snapshot.child("timestamp").getValue(String.class);
                            }
                            if (receivedAt == null) {
                                receivedAt = new java.text.SimpleDateFormat("yyyy-MM-dd'T'HH:mm:ss.SSS'Z'", java.util.Locale.US).format(new java.util.Date());
                            }

                            SensorData data = new SensorData();
                            data.setId(id);
                            data.setDeviceId(device != null ? device : "KLIMACEK-001");
                            data.setWindKmh(windKmh != null ? windKmh : 0f);
                            data.setRainrateMmh(rainrate != null ? rainrate : 0f);
                            data.setTemperatureC(temperature != null ? temperature : 0f);
                            data.setHumidity(humidity != null ? humidity : 0f);
                            data.setLightLux(lightLux != null ? lightLux : 0f);
                            data.setSolVoltageV(solVoltage != null ? solVoltage : 0f);
                            data.setSolCurrentMa(solCurrent != null ? solCurrent : 0f);
                            data.setSolPowerW(solPower != null ? solPower : 0f);
                            data.setReceivedAt(receivedAt);

                            sensorDataList.add(data);
                        } catch (Exception e) {
                            Log.w(TAG, "Error parsing sensor data item: " + e.getMessage());
                        }
                    }

                    // Sort by received_at descending (most recent first)
                    Collections.sort(sensorDataList, new Comparator<SensorData>() {
                        @Override
                        public int compare(SensorData o1, SensorData o2) {
                            try {
                                java.text.SimpleDateFormat sdf = new java.text.SimpleDateFormat("yyyy-MM-dd'T'HH:mm:ss.SSS'Z'", java.util.Locale.US);
                                sdf.setTimeZone(java.util.TimeZone.getTimeZone("UTC"));
                                java.util.Date date1 = sdf.parse(o1.getReceivedAt());
                                java.util.Date date2 = sdf.parse(o2.getReceivedAt());
                                if (date1 != null && date2 != null) {
                                    return date2.compareTo(date1); // Descending
                                }
                            } catch (Exception e) {
                                Log.w(TAG, "Error comparing dates: " + e.getMessage());
                            }
                            return 0;
                        }
                    });

                    // Apply limit
                    final List<SensorData> limitedData;
                    if (sensorDataList.size() > limit) {
                        limitedData = sensorDataList.subList(0, limit);
                    } else {
                        limitedData = sensorDataList;
                    }

                    Log.d(TAG, "Successfully fetched " + limitedData.size() + " sensor data records");
                    mainHandler.post(() -> callback.onSuccess(limitedData));

                } catch (Exception e) {
                    Log.e(TAG, "Error processing Firebase data", e);
                    mainHandler.post(() -> callback.onError("Error processing data: " + e.getMessage()));
                }
            }

            @Override
            public void onCancelled(@NonNull DatabaseError databaseError) {
                Log.e(TAG, "Firebase error: " + databaseError.getMessage());
                mainHandler.post(() -> callback.onError("Database error: " + databaseError.getMessage()));
            }
        });
    }

    private Float safeGetFloat(DataSnapshot snapshot, String key) {
        try {
            Object value = snapshot.child(key).getValue();
            if (value == null) {
                return null;
            }
            if (value instanceof Number) {
                return ((Number) value).floatValue();
            }
            if (value instanceof String) {
                return Float.parseFloat((String) value);
            }
        } catch (Exception e) {
            Log.w(TAG, "Error parsing float for key " + key + ": " + e.getMessage());
        }
        return null;
    }
}
