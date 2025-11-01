package com.klimacek.app;

import androidx.appcompat.app.AppCompatActivity;
import androidx.cardview.widget.CardView;
import android.content.Intent;
import android.graphics.Color;
import android.os.Bundle;
import android.os.Handler;
import android.view.View;
import android.view.WindowManager;
import android.widget.ImageView;
import android.widget.TextView;

import com.github.mikephil.charting.charts.LineChart;
import com.github.mikephil.charting.components.XAxis;
import com.github.mikephil.charting.components.YAxis;
import com.github.mikephil.charting.data.Entry;
import com.github.mikephil.charting.data.LineData;
import com.github.mikephil.charting.data.LineDataSet;

import java.util.ArrayList;
import java.util.List;
import java.util.Random;

public class DashboardActivity extends AppCompatActivity {

    private LineChart chartIntensitasCahaya;
    private LineChart chartKelembapan;
    private LineChart chartTemperatur;
    private LineChart chartCurahHujan;
    private LineChart chartTegangan;
    private LineChart chartArus;
    private LineChart chartWatt;
    private LineChart chartKecepatanAngin;

    private ImageView backButton;
    private TextView titleText;

    private Handler handler = new Handler();
    private Random random = new Random();
    private int dataIndex = 0;
    private boolean isRunning = true;

    private ApiClient apiClient;
    private ArrayList<Long> timestamps = new ArrayList<>();

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);

        if (getSupportActionBar() != null) {
            getSupportActionBar().hide();
        }

        setContentView(R.layout.activity_dashboard);

        apiClient = new ApiClient();
        initializeViews();
        setupCharts();
        setupClickListeners();
        startRealtimeDataSimulation();
    }

    private void initializeViews() {
        backButton = findViewById(R.id.backButton);
        titleText = findViewById(R.id.titleText);

        chartIntensitasCahaya = findViewById(R.id.chartIntensitasCahaya);
        chartKelembapan = findViewById(R.id.chartKelembapan);
        chartTemperatur = findViewById(R.id.chartTemperatur);
        chartCurahHujan = findViewById(R.id.chartCurahHujan);
        chartTegangan = findViewById(R.id.chartTegangan);
        chartArus = findViewById(R.id.chartArus);
        chartWatt = findViewById(R.id.chartWatt);
        chartKecepatanAngin = findViewById(R.id.chartKecepatanAngin);
    }

    private void setupCharts() {
        setupLineChart(chartIntensitasCahaya, "Intensitas Cahaya", 0, 60);
        setupLineChart(chartKelembapan, "Kelembapan", 0, 60);
        setupLineChart(chartTemperatur, "Temperatur", 15, 45);
        setupLineChart(chartCurahHujan, "Curah Hujan", 0, 60);
        setupLineChart(chartTegangan, "Tegangan", 0, 60);
        setupLineChart(chartArus, "Arus", 0, 60);
        setupLineChart(chartWatt, "Watt", 0, 60);
        setupLineChart(chartKecepatanAngin, "Kecepatan Angin", 0, 60);

    }

    private void setupLineChart(LineChart chart, String label, float minY, float maxY) {
        chart.setDrawGridBackground(false);
        chart.getDescription().setEnabled(false);
        chart.setTouchEnabled(true);
        chart.setDragEnabled(true);
        chart.setScaleEnabled(false);
        chart.setPinchZoom(false);
        chart.setBackgroundColor(Color.WHITE);
        chart.setNoDataText("");

        XAxis xAxis = chart.getXAxis();
        xAxis.setPosition(XAxis.XAxisPosition.BOTTOM);
        xAxis.setDrawGridLines(true);
        xAxis.setGridColor(Color.parseColor("#E0E0E0"));
        xAxis.setTextColor(Color.parseColor("#757575"));
        xAxis.setTextSize(9f);
        xAxis.setLabelCount(4, true);
        xAxis.setGranularity(1f);
        xAxis.setValueFormatter(new TimeAxisFormatter(10 * 60 * 1000L)); // 10 minutes format (HH:mm)

        YAxis leftAxis = chart.getAxisLeft();
        leftAxis.setDrawGridLines(true);
        leftAxis.setGridColor(Color.parseColor("#E0E0E0"));
        leftAxis.setTextColor(Color.parseColor("#757575"));
        leftAxis.setTextSize(10f);
        leftAxis.setAxisMinimum(minY);
        leftAxis.setAxisMaximum(maxY);
        leftAxis.setLabelCount(5, false);

        chart.getAxisRight().setEnabled(false);
        chart.getLegend().setEnabled(false);
        chart.animateX(500);
    }

    private void updateChart(LineChart chart, ArrayList<Entry> entries) {
        LineDataSet dataSet = new LineDataSet(entries, "");
        dataSet.setColor(Color.parseColor("#2196F3"));
        dataSet.setLineWidth(2f);
        dataSet.setDrawCircles(false);
        dataSet.setDrawValues(false);
        dataSet.setMode(LineDataSet.Mode.CUBIC_BEZIER);
        dataSet.setDrawFilled(false);

        LineData lineData = new LineData(dataSet);
        chart.setData(lineData);
        chart.invalidate();
    }

    private void setupClickListeners() {
        backButton.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                onBackPressed();
            }
        });

        // Add click listeners for each sensor chart
        chartIntensitasCahaya.setOnTouchListener((v, event) -> {
            if (event.getAction() == android.view.MotionEvent.ACTION_UP) {
                navigateToDetail("Intensitas Cahaya", "Cd");
                return true;
            }
            return false;
        });

        chartKelembapan.setOnTouchListener((v, event) -> {
            if (event.getAction() == android.view.MotionEvent.ACTION_UP) {
                navigateToDetail("Kelembapan", "%");
                return true;
            }
            return false;
        });

        chartTemperatur.setOnTouchListener((v, event) -> {
            if (event.getAction() == android.view.MotionEvent.ACTION_UP) {
                navigateToDetail("Temperatur Suhu", "°C");
                return true;
            }
            return false;
        });

        chartCurahHujan.setOnTouchListener((v, event) -> {
            if (event.getAction() == android.view.MotionEvent.ACTION_UP) {
                navigateToDetail("Curah Hujan", "mm");
                return true;
            }
            return false;
        });

        chartTegangan.setOnTouchListener((v, event) -> {
            if (event.getAction() == android.view.MotionEvent.ACTION_UP) {
                navigateToDetail("Tegangan Panel Surya", "V");
                return true;
            }
            return false;
        });

        chartArus.setOnTouchListener((v, event) -> {
            if (event.getAction() == android.view.MotionEvent.ACTION_UP) {
                navigateToDetail("Arus Panel Surya", "A");
                return true;
            }
            return false;
        });

        chartWatt.setOnTouchListener((v, event) -> {
            if (event.getAction() == android.view.MotionEvent.ACTION_UP) {
                navigateToDetail("Watt Panel Surya", "W");
                return true;
            }
            return false;
        });

        chartKecepatanAngin.setOnTouchListener((v, event) -> {
            if (event.getAction() == android.view.MotionEvent.ACTION_UP) {
                navigateToDetail("Kecepatan Angin", "km/h");
                return true;
            }
            return false;
        });
    }

    private void navigateToDetail(String sensorName, String sensorUnit) {
        Intent intent = new Intent(DashboardActivity.this, SensorDetailActivity.class);
        intent.putExtra("sensor_name", sensorName);
        intent.putExtra("sensor_unit", sensorUnit);
        startActivity(intent);
    }

    private void startRealtimeDataSimulation() {
        handler.postDelayed(new Runnable() {
            @Override
            public void run() {
                if (isRunning) {
                    fetchSensorData();
                    // Repeat every 2 seconds
                    handler.postDelayed(this, 2000);
                }
            }
        }, 500); // Start after 500ms
    }

    private void fetchSensorData() {
        apiClient.getSensorData(null, 7, new ApiClient.ApiCallback() {
            @Override
            public void onSuccess(ApiResponse response) {
                if (response.getData() != null && !response.getData().isEmpty()) {
                    List<SensorData> dataList = response.getData();

                    // Clear existing data
                    timestamps.clear();

                    // Prepare entries for all charts
                    ArrayList<Entry> entriesLight = new ArrayList<>();
                    ArrayList<Entry> entriesHumidity = new ArrayList<>();
                    ArrayList<Entry> entriesTemp = new ArrayList<>();
                    ArrayList<Entry> entriesRain = new ArrayList<>();
                    ArrayList<Entry> entriesVoltage = new ArrayList<>();
                    ArrayList<Entry> entriesCurrent = new ArrayList<>();
                    ArrayList<Entry> entriesPower = new ArrayList<>();
                    ArrayList<Entry> entriesWind = new ArrayList<>();

                    // Process data in reverse order (oldest to newest)
                    for (int i = dataList.size() - 1; i >= 0; i--) {
                        SensorData data = dataList.get(i);
                        long timestamp = parseTimestamp(data.getReceivedAt());
                        float xValue = timestamp / 1000f; // Convert to seconds for X-axis

                        timestamps.add(timestamp);

                        entriesLight.add(new Entry(xValue, data.getLightLux()));
                        entriesHumidity.add(new Entry(xValue, data.getHumidity()));
                        entriesTemp.add(new Entry(xValue, data.getTemperatureC()));
                        entriesRain.add(new Entry(xValue, data.getRainrateMmh()));
                        entriesVoltage.add(new Entry(xValue, data.getSolVoltageV()));
                        entriesCurrent.add(new Entry(xValue, data.getSolCurrentMa()));
                        entriesPower.add(new Entry(xValue, data.getSolPowerW()));
                        entriesWind.add(new Entry(xValue, data.getWindKmh()));
                    }

                    // Update all charts
                    updateChart(chartIntensitasCahaya, entriesLight);
                    updateChart(chartKelembapan, entriesHumidity);
                    updateChart(chartTemperatur, entriesTemp);
                    updateChart(chartCurahHujan, entriesRain);
                    updateChart(chartTegangan, entriesVoltage);
                    updateChart(chartArus, entriesCurrent);
                    updateChart(chartWatt, entriesPower);
                    updateChart(chartKecepatanAngin, entriesWind);
                }
            }

            @Override
            public void onError(String error) {
                android.util.Log.e("DashboardActivity", "Error fetching sensor data: " + error);
            }
        });
    }

    private long parseTimestamp(String receivedAt) {
        try {
            java.text.SimpleDateFormat sdf = new java.text.SimpleDateFormat("yyyy-MM-dd'T'HH:mm:ss.SSS'Z'", java.util.Locale.US);
            sdf.setTimeZone(java.util.TimeZone.getTimeZone("UTC"));
            java.util.Date date = sdf.parse(receivedAt);
            return date != null ? date.getTime() : System.currentTimeMillis();
        } catch (Exception e) {
            android.util.Log.e("DashboardActivity", "Error parsing timestamp: " + receivedAt, e);
            return System.currentTimeMillis();
        }
    }


    @Override
    protected void onDestroy() {
        super.onDestroy();
        isRunning = false;
        handler.removeCallbacksAndMessages(null);
    }

    @Override
    public void onBackPressed() {
        super.onBackPressed();
        isRunning = false;
    }
}