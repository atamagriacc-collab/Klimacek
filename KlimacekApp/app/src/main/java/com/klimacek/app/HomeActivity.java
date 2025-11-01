package com.klimacek.app;

import androidx.appcompat.app.AppCompatActivity;
import androidx.cardview.widget.CardView;
import androidx.core.app.ActivityCompat;
import androidx.core.content.ContextCompat;
import android.Manifest;
import android.content.Intent;
import android.content.pm.PackageManager;
import android.location.Address;
import android.location.Geocoder;
import android.location.Location;
import android.location.LocationListener;
import android.location.LocationManager;
import android.os.Bundle;
import android.os.Handler;
import android.view.View;
import android.view.WindowManager;
import android.widget.Button;
import android.widget.LinearLayout;
import android.widget.TextView;
import android.widget.Toast;
import com.google.android.material.bottomnavigation.BottomNavigationView;
import java.io.IOException;
import java.util.List;
import java.util.Locale;

public class HomeActivity extends AppCompatActivity {

    private CardView cardIntensitasCahaya;
    private CardView cardKelembapan;
    private CardView cardKecepatanAngin;
    private CardView cardCurahHujan;
    private CardView cardTemperatur;
    private CardView cardTegangan;
    private CardView cardArus;
    private CardView cardWatt;
    private BottomNavigationView bottomNavigation;

    private TextView tvIntensitasCahayaValue;
    private TextView tvKelembapanValue;
    private TextView tvKecepatanAnginValue;
    private TextView tvCurahHujanValue;
    private TextView tvTemperaturValue;
    private TextView tvTeganganValue;
    private TextView tvArusValue;
    private TextView tvWattValue;
    private TextView tvLocationCity;

    private com.github.mikephil.charting.charts.LineChart chartMiniIntensitasCahaya;
    private com.github.mikephil.charting.charts.LineChart chartMiniKelembapan;
    private com.github.mikephil.charting.charts.LineChart chartMiniKecepatanAngin;
    private com.github.mikephil.charting.charts.LineChart chartMiniCurahHujan;
    private com.github.mikephil.charting.charts.LineChart chartMiniTemperatur;
    private com.github.mikephil.charting.charts.LineChart chartMiniTegangan;
    private com.github.mikephil.charting.charts.LineChart chartMiniArus;
    private com.github.mikephil.charting.charts.LineChart chartMiniWatt;

    private ApiClient apiClient;
    private Handler handler = new Handler();
    private boolean isRunning = true;

    private LocationManager locationManager;
    private static final int LOCATION_PERMISSION_REQUEST_CODE = 100;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);

        if (getSupportActionBar() != null) {
            getSupportActionBar().hide();
        }

        setContentView(R.layout.activity_home);

        apiClient = new ApiClient();
        locationManager = (LocationManager) getSystemService(LOCATION_SERVICE);

        initializeViews();
        setupClickListeners();
        setupBottomNavigation();
        startRealtimeDataFetch();
        requestLocationPermission();
    }

    private void initializeViews() {
        cardIntensitasCahaya = findViewById(R.id.cardIntensitasCahaya);
        cardKelembapan = findViewById(R.id.cardKelembapan);
        cardKecepatanAngin = findViewById(R.id.cardKecepatanAngin);
        cardCurahHujan = findViewById(R.id.cardCurahHujan);
        cardTemperatur = findViewById(R.id.cardTemperatur);
        cardTegangan = findViewById(R.id.cardTegangan);
        cardArus = findViewById(R.id.cardArus);
        cardWatt = findViewById(R.id.cardWatt);

        tvIntensitasCahayaValue = findViewById(R.id.tvIntensitasCahayaValue);
        tvKelembapanValue = findViewById(R.id.tvKelembapanValue);
        tvKecepatanAnginValue = findViewById(R.id.tvKecepatanAnginValue);
        tvCurahHujanValue = findViewById(R.id.tvCurahHujanValue);
        tvTemperaturValue = findViewById(R.id.tvTemperaturValue);
        tvTeganganValue = findViewById(R.id.tvTeganganValue);
        tvArusValue = findViewById(R.id.tvArusValue);
        tvWattValue = findViewById(R.id.tvWattValue);
        tvLocationCity = findViewById(R.id.tvLocationCity);

        chartMiniIntensitasCahaya = findViewById(R.id.chartMiniIntensitasCahaya);
        chartMiniKelembapan = findViewById(R.id.chartMiniKelembapan);
        chartMiniKecepatanAngin = findViewById(R.id.chartMiniKecepatanAngin);
        chartMiniCurahHujan = findViewById(R.id.chartMiniCurahHujan);
        chartMiniTemperatur = findViewById(R.id.chartMiniTemperatur);
        chartMiniTegangan = findViewById(R.id.chartMiniTegangan);
        chartMiniArus = findViewById(R.id.chartMiniArus);
        chartMiniWatt = findViewById(R.id.chartMiniWatt);

        bottomNavigation = findViewById(R.id.bottomNavigation);

        setupMiniCharts();
    }

    private void setupClickListeners() {
        cardIntensitasCahaya.setOnClickListener(v -> {
            Intent intent = new Intent(HomeActivity.this, SensorDetailActivity.class);
            intent.putExtra("sensor_name", "Intensitas Cahaya");
            intent.putExtra("sensor_unit", "Lux");
            startActivity(intent);
        });

        cardKelembapan.setOnClickListener(v -> {
            Intent intent = new Intent(HomeActivity.this, SensorDetailActivity.class);
            intent.putExtra("sensor_name", "Kelembapan");
            intent.putExtra("sensor_unit", "%");
            startActivity(intent);
        });

        cardKecepatanAngin.setOnClickListener(v -> {
            Intent intent = new Intent(HomeActivity.this, SensorDetailActivity.class);
            intent.putExtra("sensor_name", "Kecepatan Angin");
            intent.putExtra("sensor_unit", "km/h");
            startActivity(intent);
        });

        cardCurahHujan.setOnClickListener(v -> {
            Intent intent = new Intent(HomeActivity.this, SensorDetailActivity.class);
            intent.putExtra("sensor_name", "Curah Hujan");
            intent.putExtra("sensor_unit", "mm/h");
            startActivity(intent);
        });

        cardTemperatur.setOnClickListener(v -> {
            Intent intent = new Intent(HomeActivity.this, SensorDetailActivity.class);
            intent.putExtra("sensor_name", "Temperatur Suhu");
            intent.putExtra("sensor_unit", "°C");
            startActivity(intent);
        });

        cardTegangan.setOnClickListener(v -> {
            Intent intent = new Intent(HomeActivity.this, SensorDetailActivity.class);
            intent.putExtra("sensor_name", "Tegangan Panel Surya");
            intent.putExtra("sensor_unit", "V");
            startActivity(intent);
        });

        cardArus.setOnClickListener(v -> {
            Intent intent = new Intent(HomeActivity.this, SensorDetailActivity.class);
            intent.putExtra("sensor_name", "Arus Panel Surya");
            intent.putExtra("sensor_unit", "mA");
            startActivity(intent);
        });

        cardWatt.setOnClickListener(v -> {
            Intent intent = new Intent(HomeActivity.this, SensorDetailActivity.class);
            intent.putExtra("sensor_name", "Watt Panel Surya");
            intent.putExtra("sensor_unit", "W");
            startActivity(intent);
        });
    }

    private void setupBottomNavigation() {
        bottomNavigation.setSelectedItemId(R.id.navigation_home);

        bottomNavigation.setOnItemSelectedListener(item -> {
            int itemId = item.getItemId();
            if (itemId == R.id.navigation_home) {
                return true;
            } else if (itemId == R.id.navigation_market) {
                Intent intent = new Intent(HomeActivity.this, ShopActivity.class);
                startActivity(intent);
                return true;
            }
            return false;
        });
    }

    private void setupMiniCharts() {
        setupMiniChart(chartMiniIntensitasCahaya);
        setupMiniChart(chartMiniKelembapan);
        setupMiniChart(chartMiniKecepatanAngin);
        setupMiniChart(chartMiniCurahHujan);
        setupMiniChart(chartMiniTemperatur);
        setupMiniChart(chartMiniTegangan);
        setupMiniChart(chartMiniArus);
        setupMiniChart(chartMiniWatt);
    }

    private void setupMiniChart(com.github.mikephil.charting.charts.LineChart chart) {
        chart.setDrawGridBackground(false);
        chart.setDrawBorders(false);
        chart.getDescription().setEnabled(false);
        chart.getLegend().setEnabled(false);
        chart.setTouchEnabled(false);
        chart.setDragEnabled(false);
        chart.setScaleEnabled(false);
        chart.setPinchZoom(false);

        chart.getXAxis().setEnabled(false);
        chart.getAxisLeft().setEnabled(false);
        chart.getAxisRight().setEnabled(false);

        chart.setNoDataText("");
    }

    private void updateMiniCharts(java.util.List<SensorData> dataList) {
        if (dataList == null || dataList.size() < 2) return;

        java.util.ArrayList<com.github.mikephil.charting.data.Entry> entriesLight = new java.util.ArrayList<>();
        java.util.ArrayList<com.github.mikephil.charting.data.Entry> entriesHumidity = new java.util.ArrayList<>();
        java.util.ArrayList<com.github.mikephil.charting.data.Entry> entriesWind = new java.util.ArrayList<>();
        java.util.ArrayList<com.github.mikephil.charting.data.Entry> entriesRain = new java.util.ArrayList<>();
        java.util.ArrayList<com.github.mikephil.charting.data.Entry> entriesTemp = new java.util.ArrayList<>();
        java.util.ArrayList<com.github.mikephil.charting.data.Entry> entriesVoltage = new java.util.ArrayList<>();
        java.util.ArrayList<com.github.mikephil.charting.data.Entry> entriesCurrent = new java.util.ArrayList<>();
        java.util.ArrayList<com.github.mikephil.charting.data.Entry> entriesPower = new java.util.ArrayList<>();

        for (int i = 0; i < dataList.size(); i++) {
            SensorData data = dataList.get(i);
            entriesLight.add(new com.github.mikephil.charting.data.Entry(i, data.getLightLux()));
            entriesHumidity.add(new com.github.mikephil.charting.data.Entry(i, data.getHumidity()));
            entriesWind.add(new com.github.mikephil.charting.data.Entry(i, data.getWindKmh()));
            entriesRain.add(new com.github.mikephil.charting.data.Entry(i, data.getRainrateMmh()));
            entriesTemp.add(new com.github.mikephil.charting.data.Entry(i, data.getTemperatureC()));
            entriesVoltage.add(new com.github.mikephil.charting.data.Entry(i, data.getSolVoltageV()));
            entriesCurrent.add(new com.github.mikephil.charting.data.Entry(i, data.getSolCurrentMa()));
            entriesPower.add(new com.github.mikephil.charting.data.Entry(i, data.getSolPowerW()));
        }

        updateSingleMiniChart(chartMiniIntensitasCahaya, entriesLight, android.graphics.Color.parseColor("#7C4DFF"));
        updateSingleMiniChart(chartMiniKelembapan, entriesHumidity, android.graphics.Color.parseColor("#2196F3"));
        updateSingleMiniChart(chartMiniKecepatanAngin, entriesWind, android.graphics.Color.parseColor("#4CAF50"));
        updateSingleMiniChart(chartMiniCurahHujan, entriesRain, android.graphics.Color.parseColor("#00BCD4"));
        updateSingleMiniChart(chartMiniTemperatur, entriesTemp, android.graphics.Color.parseColor("#FF9800"));
        updateSingleMiniChart(chartMiniTegangan, entriesVoltage, android.graphics.Color.parseColor("#FFC107"));
        updateSingleMiniChart(chartMiniArus, entriesCurrent, android.graphics.Color.parseColor("#FF5722"));
        updateSingleMiniChart(chartMiniWatt, entriesPower, android.graphics.Color.parseColor("#9C27B0"));
    }

    private void updateSingleMiniChart(com.github.mikephil.charting.charts.LineChart chart,
                                        java.util.ArrayList<com.github.mikephil.charting.data.Entry> entries,
                                        int color) {
        if (entries.isEmpty()) return;

        com.github.mikephil.charting.data.LineDataSet dataSet = new com.github.mikephil.charting.data.LineDataSet(entries, "");
        dataSet.setColor(color);
        dataSet.setLineWidth(2f);
        dataSet.setDrawCircles(false);
        dataSet.setDrawValues(false);
        dataSet.setMode(com.github.mikephil.charting.data.LineDataSet.Mode.LINEAR);
        dataSet.setDrawFilled(true);
        dataSet.setFillColor(color);
        dataSet.setFillAlpha(50);

        com.github.mikephil.charting.data.LineData lineData = new com.github.mikephil.charting.data.LineData(dataSet);
        chart.setData(lineData);
        chart.invalidate();
    }

    private void showToast(String message) {
        Toast.makeText(this, message, Toast.LENGTH_SHORT).show();
    }

    private void startRealtimeDataFetch() {
        handler.postDelayed(new Runnable() {
            @Override
            public void run() {
                if (isRunning) {
                    fetchSensorData();
                    handler.postDelayed(this, 3000); // Update every 3 seconds
                }
            }
        }, 500); // Start after 500ms
    }

    private void fetchSensorData() {
        apiClient.getSensorData(null, 15, new ApiClient.ApiCallback() {
            @Override
            public void onSuccess(ApiResponse response) {
                if (response.getData() != null && !response.getData().isEmpty()) {
                    SensorData latestData = response.getData().get(0);
                    updateUI(latestData);
                    updateMiniCharts(response.getData());
                }
            }

            @Override
            public void onError(String error) {
                android.util.Log.e("HomeActivity", "Error fetching sensor data: " + error);
            }
        });
    }

    private void updateUI(SensorData data) {
        tvIntensitasCahayaValue.setText(String.format(Locale.US, "%.2f", data.getLightLux()));
        tvKelembapanValue.setText(String.format(Locale.US, "%.0f", data.getHumidity()));
        tvKecepatanAnginValue.setText(String.format(Locale.US, "%.1f", data.getWindKmh()));
        tvCurahHujanValue.setText(String.format(Locale.US, "%.1f", data.getRainrateMmh()));
        tvTemperaturValue.setText(String.format(Locale.US, "%.1f", data.getTemperatureC()));
        tvTeganganValue.setText(String.format(Locale.US, "%.2f", data.getSolVoltageV()));
        tvArusValue.setText(String.format(Locale.US, "%.2f", data.getSolCurrentMa()));
        tvWattValue.setText(String.format(Locale.US, "%.2f", data.getSolPowerW()));
    }

    private void requestLocationPermission() {
        if (ContextCompat.checkSelfPermission(this, Manifest.permission.ACCESS_FINE_LOCATION)
                != PackageManager.PERMISSION_GRANTED) {
            ActivityCompat.requestPermissions(this,
                    new String[]{Manifest.permission.ACCESS_FINE_LOCATION,
                            Manifest.permission.ACCESS_COARSE_LOCATION},
                    LOCATION_PERMISSION_REQUEST_CODE);
        } else {
            getCurrentLocation();
        }
    }

    @Override
    public void onRequestPermissionsResult(int requestCode, String[] permissions, int[] grantResults) {
        super.onRequestPermissionsResult(requestCode, permissions, grantResults);
        if (requestCode == LOCATION_PERMISSION_REQUEST_CODE) {
            if (grantResults.length > 0 && grantResults[0] == PackageManager.PERMISSION_GRANTED) {
                getCurrentLocation();
            } else {
                tvLocationCity.setText("Location Permission Denied");
            }
        }
    }

    private void getCurrentLocation() {
        try {
            if (ActivityCompat.checkSelfPermission(this, Manifest.permission.ACCESS_FINE_LOCATION)
                    == PackageManager.PERMISSION_GRANTED) {

                Location lastKnownLocation = locationManager.getLastKnownLocation(LocationManager.GPS_PROVIDER);

                if (lastKnownLocation == null) {
                    lastKnownLocation = locationManager.getLastKnownLocation(LocationManager.NETWORK_PROVIDER);
                }

                if (lastKnownLocation != null) {
                    getCityName(lastKnownLocation.getLatitude(), lastKnownLocation.getLongitude());
                } else {
                    // Request location updates if last known location is null
                    locationManager.requestLocationUpdates(
                            LocationManager.NETWORK_PROVIDER,
                            0,
                            0,
                            new LocationListener() {
                                @Override
                                public void onLocationChanged(Location location) {
                                    getCityName(location.getLatitude(), location.getLongitude());
                                    locationManager.removeUpdates(this);
                                }

                                @Override
                                public void onStatusChanged(String provider, int status, Bundle extras) {}

                                @Override
                                public void onProviderEnabled(String provider) {}

                                @Override
                                public void onProviderDisabled(String provider) {}
                            }
                    );
                    tvLocationCity.setText("Getting location...");
                }
            }
        } catch (Exception e) {
            e.printStackTrace();
            tvLocationCity.setText("Error getting location");
        }
    }

    private void getCityName(double latitude, double longitude) {
        try {
            Geocoder geocoder = new Geocoder(this, Locale.getDefault());
            List<Address> addresses = geocoder.getFromLocation(latitude, longitude, 1);

            if (addresses != null && !addresses.isEmpty()) {
                Address address = addresses.get(0);
                String city = address.getLocality();

                if (city != null && !city.isEmpty()) {
                    tvLocationCity.setText(city);
                } else {
                    // If city is null, try to get sub-admin area or admin area
                    String subAdmin = address.getSubAdminArea();
                    String admin = address.getAdminArea();

                    if (subAdmin != null && !subAdmin.isEmpty()) {
                        tvLocationCity.setText(subAdmin);
                    } else if (admin != null && !admin.isEmpty()) {
                        tvLocationCity.setText(admin);
                    } else {
                        tvLocationCity.setText("Unknown Location");
                    }
                }
            } else {
                tvLocationCity.setText("Unknown Location");
            }
        } catch (IOException e) {
            e.printStackTrace();
            tvLocationCity.setText("Error: " + e.getMessage());
        }
    }

    @Override
    protected void onDestroy() {
        super.onDestroy();
        isRunning = false;
        handler.removeCallbacksAndMessages(null);
    }

    @Override
    protected void onPause() {
        super.onPause();
        isRunning = false;
    }

    @Override
    protected void onResume() {
        super.onResume();
        if (!isRunning) {
            isRunning = true;
            startRealtimeDataFetch();
        }
    }
}