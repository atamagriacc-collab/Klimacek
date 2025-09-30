package com.klimacek.app;

import androidx.appcompat.app.AppCompatActivity;
import android.content.Intent;
import android.graphics.Color;
import android.os.Bundle;
import android.os.Environment;
import android.os.Handler;
import android.view.View;
import android.view.WindowManager;
import android.widget.Button;
import android.widget.ImageView;
import android.widget.SeekBar;
import android.widget.TextView;
import android.widget.Toast;

import com.github.mikephil.charting.charts.LineChart;
import com.github.mikephil.charting.components.XAxis;
import com.github.mikephil.charting.components.YAxis;
import com.github.mikephil.charting.data.Entry;
import com.github.mikephil.charting.data.LineData;
import com.github.mikephil.charting.data.LineDataSet;
import com.google.android.material.bottomnavigation.BottomNavigationView;

import java.io.File;
import java.io.FileWriter;
import java.io.IOException;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.Locale;
import java.util.Random;

public class SensorDetailActivity extends AppCompatActivity {

    private ImageView backButton;
    private TextView titleText;
    private TextView sensorNameText;
    private ImageView profileImage;
    private LineChart sensorChart;
    private SeekBar suhuSeekBar;
    private TextView suhuLabel;
    private Button downloadCsvButton;
    private TextView historyText;
    private BottomNavigationView bottomNavigation;

    private String sensorName = "Intensitas Cahaya";
    private String sensorUnit = "Cd";
    private ArrayList<Entry> chartData = new ArrayList<>();

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

        setContentView(R.layout.activity_sensor_detail);

        // Get sensor info from intent
        Intent intent = getIntent();
        if (intent != null) {
            sensorName = intent.getStringExtra("sensor_name");
            sensorUnit = intent.getStringExtra("sensor_unit");
            if (sensorName == null) sensorName = "Intensitas Cahaya";
            if (sensorUnit == null) sensorUnit = "Cd";
        }

        initializeViews();
        setupChart();
        setupClickListeners();
        setupSeekBar();
        setupBottomNavigation();
        startRealtimeDataSimulation();
    }

    private void initializeViews() {
        backButton = findViewById(R.id.backButton);
        titleText = findViewById(R.id.titleText);
        sensorNameText = findViewById(R.id.sensorNameText);
        profileImage = findViewById(R.id.profileImage);
        sensorChart = findViewById(R.id.sensorChart);
        suhuSeekBar = findViewById(R.id.suhuSeekBar);
        suhuLabel = findViewById(R.id.suhuLabel);
        downloadCsvButton = findViewById(R.id.downloadCsvButton);
        historyText = findViewById(R.id.historyText);
        bottomNavigation = findViewById(R.id.bottomNavigation);

        sensorNameText.setText(sensorName);
    }

    private void setupChart() {
        sensorChart.setDrawGridBackground(false);
        sensorChart.getDescription().setEnabled(false);
        sensorChart.setTouchEnabled(true);
        sensorChart.setDragEnabled(true);
        sensorChart.setScaleEnabled(false);
        sensorChart.setPinchZoom(false);
        sensorChart.setBackgroundColor(Color.WHITE);
        sensorChart.setNoDataText("Loading...");

        XAxis xAxis = sensorChart.getXAxis();
        xAxis.setPosition(XAxis.XAxisPosition.BOTTOM);
        xAxis.setDrawGridLines(true);
        xAxis.setGridColor(Color.parseColor("#E0E0E0"));
        xAxis.setTextColor(Color.parseColor("#757575"));
        xAxis.setTextSize(12f);
        xAxis.setLabelCount(7, true);
        xAxis.setGranularity(1f);

        YAxis leftAxis = sensorChart.getAxisLeft();
        leftAxis.setDrawGridLines(true);
        leftAxis.setGridColor(Color.parseColor("#E0E0E0"));
        leftAxis.setTextColor(Color.parseColor("#757575"));
        leftAxis.setTextSize(12f);
        leftAxis.setAxisMinimum(0);
        leftAxis.setAxisMaximum(60);
        leftAxis.setLabelCount(5, false);

        sensorChart.getAxisRight().setEnabled(false);
        sensorChart.getLegend().setEnabled(false);
        sensorChart.animateX(500);

        // Initialize with sample data
        ArrayList<Entry> entries = generateInitialData();
        updateChart(entries);
    }

    private ArrayList<Entry> generateInitialData() {
        ArrayList<Entry> entries = new ArrayList<>();
        float[] values = {50, 20, 37, 25, 30, 10, 32};
        for (int i = 0; i < values.length; i++) {
            entries.add(new Entry(i, values[i]));
        }
        chartData = new ArrayList<>(entries);
        return entries;
    }

    private void updateChart(ArrayList<Entry> entries) {
        LineDataSet dataSet = new LineDataSet(entries, sensorName);
        dataSet.setColor(Color.parseColor("#7C4DFF"));
        dataSet.setLineWidth(2.5f);
        dataSet.setCircleColor(Color.parseColor("#7C4DFF"));
        dataSet.setCircleRadius(4f);
        dataSet.setDrawCircleHole(true);
        dataSet.setCircleHoleColor(Color.WHITE);
        dataSet.setDrawValues(false);
        dataSet.setMode(LineDataSet.Mode.LINEAR);
        dataSet.setDrawFilled(false);

        LineData lineData = new LineData(dataSet);
        sensorChart.setData(lineData);
        sensorChart.invalidate();
    }

    private void setupClickListeners() {
        backButton.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                onBackPressed();
            }
        });

        downloadCsvButton.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                downloadDataAsCSV();
            }
        });
    }

    private void setupSeekBar() {
        suhuSeekBar.setMax(100);
        suhuSeekBar.setProgress(30);

        suhuSeekBar.setOnSeekBarChangeListener(new SeekBar.OnSeekBarChangeListener() {
            @Override
            public void onProgressChanged(SeekBar seekBar, int progress, boolean fromUser) {
                // Update temperature display or control
            }

            @Override
            public void onStartTrackingTouch(SeekBar seekBar) {
                // Optional: Handle when user starts dragging
            }

            @Override
            public void onStopTrackingTouch(SeekBar seekBar) {
                // Optional: Handle when user stops dragging
            }
        });
    }

    private void setupBottomNavigation() {
        bottomNavigation.setOnItemSelectedListener(item -> {
            int itemId = item.getItemId();
            if (itemId == R.id.navigation_home) {
                Intent intent = new Intent(SensorDetailActivity.this, HomeActivity.class);
                intent.setFlags(Intent.FLAG_ACTIVITY_CLEAR_TOP);
                startActivity(intent);
                return true;
            } else if (itemId == R.id.navigation_dashboard) {
                Intent intent = new Intent(SensorDetailActivity.this, DashboardActivity.class);
                intent.setFlags(Intent.FLAG_ACTIVITY_CLEAR_TOP);
                startActivity(intent);
                return true;
            } else if (itemId == R.id.navigation_categories) {
                showToast("Categories");
                return true;
            } else if (itemId == R.id.navigation_market) {
                showToast("Market");
                return true;
            }
            return false;
        });
    }

    private void startRealtimeDataSimulation() {
        handler.postDelayed(new Runnable() {
            @Override
            public void run() {
                if (isRunning) {
                    dataIndex++;

                    // Generate new random data point
                    float newValue = 10 + random.nextFloat() * 40;

                    // Keep only last 7 points
                    if (chartData.size() >= 7) {
                        chartData.remove(0);
                        // Re-index entries
                        for (int i = 0; i < chartData.size(); i++) {
                            Entry entry = chartData.get(i);
                            entry.setX(i);
                        }
                    }

                    // Add new entry
                    chartData.add(new Entry(chartData.size(), newValue));

                    // Update chart
                    updateChart(new ArrayList<>(chartData));

                    // Update history
                    updateHistory(newValue);

                    // Repeat every 3 seconds
                    handler.postDelayed(this, 3000);
                }
            }
        }, 3000);
    }

    private void updateHistory(float value) {
        SimpleDateFormat sdf = new SimpleDateFormat("HH:mm:ss", Locale.getDefault());
        String currentTime = sdf.format(new Date());

        String currentHistory = historyText.getText().toString();
        String newEntry = currentTime + " - " + String.format(Locale.getDefault(), "%.2f %s\n", value, sensorUnit);

        // Keep only last 5 entries
        String[] lines = currentHistory.split("\n");
        if (lines.length >= 5) {
            currentHistory = "";
            for (int i = 1; i < 5; i++) {
                currentHistory += lines[i] + "\n";
            }
        }

        historyText.setText(currentHistory + newEntry);
    }

    private void downloadDataAsCSV() {
        try {
            // Create CSV content
            StringBuilder csvContent = new StringBuilder();
            csvContent.append("Index,").append(sensorName).append(" (").append(sensorUnit).append(")\n");

            for (Entry entry : chartData) {
                csvContent.append(entry.getX()).append(",").append(entry.getY()).append("\n");
            }

            // Save to Downloads folder
            SimpleDateFormat dateFormat = new SimpleDateFormat("yyyyMMdd_HHmmss", Locale.getDefault());
            String fileName = "sensor_data_" + dateFormat.format(new Date()) + ".csv";

            File path = new File(getExternalFilesDir(Environment.DIRECTORY_DOWNLOADS), fileName);
            FileWriter writer = new FileWriter(path);
            writer.write(csvContent.toString());
            writer.close();

            showToast("CSV berhasil diunduh ke: " + path.getAbsolutePath());
        } catch (IOException e) {
            e.printStackTrace();
            showToast("Gagal mengunduh CSV");
        }
    }

    private void showToast(String message) {
        Toast.makeText(this, message, Toast.LENGTH_SHORT).show();
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