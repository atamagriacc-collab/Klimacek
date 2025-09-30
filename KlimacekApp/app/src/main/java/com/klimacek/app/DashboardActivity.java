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

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);

        if (getSupportActionBar() != null) {
            getSupportActionBar().hide();
        }

        getWindow().setFlags(WindowManager.LayoutParams.FLAG_FULLSCREEN,
                WindowManager.LayoutParams.FLAG_FULLSCREEN);

        setContentView(R.layout.activity_dashboard);

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

        // Initialize with sample data
        updateChart(chartIntensitasCahaya, generateInitialData());
        updateChart(chartKelembapan, generateInitialData());
        updateChart(chartTemperatur, generateInitialTemperatureData());
        updateChart(chartCurahHujan, generateInitialData());
        updateChart(chartTegangan, generateInitialData());
        updateChart(chartArus, generateInitialData());
        updateChart(chartWatt, generateInitialData());
        updateChart(chartKecepatanAngin, generateInitialData());
    }

    private void setupLineChart(LineChart chart, String label, float minY, float maxY) {
        chart.setDrawGridBackground(false);
        chart.getDescription().setEnabled(false);
        chart.setTouchEnabled(true);
        chart.setDragEnabled(true);
        chart.setScaleEnabled(false);
        chart.setPinchZoom(false);
        chart.setBackgroundColor(Color.WHITE);
        chart.setNoDataText("Loading...");

        XAxis xAxis = chart.getXAxis();
        xAxis.setPosition(XAxis.XAxisPosition.BOTTOM);
        xAxis.setDrawGridLines(true);
        xAxis.setGridColor(Color.parseColor("#E0E0E0"));
        xAxis.setTextColor(Color.parseColor("#757575"));
        xAxis.setTextSize(10f);
        xAxis.setLabelCount(7, true);
        xAxis.setGranularity(1f);

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

    private ArrayList<Entry> generateInitialData() {
        ArrayList<Entry> entries = new ArrayList<>();
        for (int i = 0; i <= 6; i++) {
            float value = 15 + random.nextFloat() * 30;
            entries.add(new Entry(i, value));
        }
        return entries;
    }

    private ArrayList<Entry> generateInitialTemperatureData() {
        ArrayList<Entry> entries = new ArrayList<>();
        for (int i = 0; i <= 6; i++) {
            float value = 25 + random.nextFloat() * 10;
            entries.add(new Entry(i, value));
        }
        return entries;
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
                    dataIndex++;

                    // Update each chart with new random data point
                    addDataPoint(chartIntensitasCahaya, 15 + random.nextFloat() * 30);
                    addDataPoint(chartKelembapan, 30 + random.nextFloat() * 30);
                    addDataPoint(chartTemperatur, 25 + random.nextFloat() * 10);
                    addDataPoint(chartCurahHujan, 10 + random.nextFloat() * 30);
                    addDataPoint(chartTegangan, 15 + random.nextFloat() * 30);
                    addDataPoint(chartArus, 20 + random.nextFloat() * 25);
                    addDataPoint(chartWatt, 10 + random.nextFloat() * 30);
                    addDataPoint(chartKecepatanAngin, 15 + random.nextFloat() * 30);

                    // Repeat every 2 seconds
                    handler.postDelayed(this, 2000);
                }
            }
        }, 2000);
    }

    private void addDataPoint(LineChart chart, float value) {
        LineData data = chart.getData();
        if (data != null) {
            LineDataSet set = (LineDataSet) data.getDataSetByIndex(0);
            if (set != null) {
                // Keep only last 7 points
                if (set.getEntryCount() >= 7) {
                    set.removeFirst();
                    // Re-index entries
                    for (int i = 0; i < set.getEntryCount(); i++) {
                        Entry entry = set.getEntryForIndex(i);
                        entry.setX(i);
                    }
                }

                // Add new entry
                set.addEntry(new Entry(set.getEntryCount(), value));
                data.notifyDataChanged();
                chart.notifyDataSetChanged();
                chart.invalidate();
            }
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