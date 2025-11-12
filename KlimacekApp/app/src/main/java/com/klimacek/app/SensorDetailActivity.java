package com.klimacek.app;

import androidx.appcompat.app.AppCompatActivity;
import android.content.Intent;
import android.graphics.Color;
import android.os.Bundle;
import android.os.Environment;
import android.os.Handler;
import android.view.View;
import android.view.WindowManager;
import android.widget.AdapterView;
import android.widget.ArrayAdapter;
import android.widget.Button;
import android.widget.ImageView;
import android.widget.SeekBar;
import android.widget.Spinner;
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
import java.util.List;
import java.util.Locale;
import java.util.Random;

public class SensorDetailActivity extends AppCompatActivity {

    private ImageView backButton;
    private TextView titleText;
    private TextView sensorNameText;
    private LineChart sensorChart;
    private Button downloadCsvButton;
    private BottomNavigationView bottomNavigation;

    private String sensorName = "Intensitas Cahaya";
    private String sensorUnit = "Cd";
    private ArrayList<Entry> chartData = new ArrayList<>();

    private Handler handler = new Handler();
    private Random random = new Random();
    private int dataIndex = 0;
    private boolean isRunning = true;

    private FirebaseClient firebaseClient;
    private ArrayList<Long> timestamps = new ArrayList<>();
    private ArrayList<Float> values = new ArrayList<>();

    private Spinner timeRangeSpinner;
    private int selectedTimeRangePosition = 2; // Default to 1 day
    private ArrayList<SensorData> allData = new ArrayList<>();

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);

        if (getSupportActionBar() != null) {
            getSupportActionBar().hide();
        }

        setContentView(R.layout.activity_sensor_detail);

        // Get sensor info from intent
        Intent intent = getIntent();
        if (intent != null) {
            sensorName = intent.getStringExtra("sensor_name");
            sensorUnit = intent.getStringExtra("sensor_unit");
            if (sensorName == null) sensorName = "Intensitas Cahaya";
            if (sensorUnit == null) sensorUnit = "Cd";
        }

        firebaseClient = new FirebaseClient();
        initializeViews();
        setupChart();
        setupTimeRangeSpinner();
        setupClickListeners();
        setupBottomNavigation();
        startRealtimeDataFetch();
    }

    private void initializeViews() {
        backButton = findViewById(R.id.backButton);
        titleText = findViewById(R.id.titleText);
        sensorNameText = findViewById(R.id.sensorNameText);
        sensorChart = findViewById(R.id.sensorChart);
        downloadCsvButton = findViewById(R.id.downloadCsvButton);
        bottomNavigation = findViewById(R.id.bottomNavigation);
        timeRangeSpinner = findViewById(R.id.timeRangeSpinner);

        sensorNameText.setText(sensorName);
    }

    private void setupTimeRangeSpinner() {
        ArrayAdapter<CharSequence> adapter = ArrayAdapter.createFromResource(
                this,
                R.array.time_range_options,
                android.R.layout.simple_spinner_item
        );
        adapter.setDropDownViewResource(android.R.layout.simple_spinner_dropdown_item);
        timeRangeSpinner.setAdapter(adapter);
        timeRangeSpinner.setSelection(selectedTimeRangePosition); // Set default selection

        timeRangeSpinner.setOnItemSelectedListener(new AdapterView.OnItemSelectedListener() {
            @Override
            public void onItemSelected(AdapterView<?> parent, android.view.View view, int position, long id) {
                selectedTimeRangePosition = position;
                applyTimeRangeFilter();
            }

            @Override
            public void onNothingSelected(AdapterView<?> parent) {
                // Do nothing
            }
        });
    }

    private void setupChart() {
        sensorChart.setDrawGridBackground(false);
        sensorChart.getDescription().setEnabled(false);
        sensorChart.setTouchEnabled(true);
        sensorChart.setDragEnabled(true);
        sensorChart.setScaleEnabled(true);
        sensorChart.setPinchZoom(true);
        sensorChart.setScaleXEnabled(true);
        sensorChart.setScaleYEnabled(true);
        sensorChart.setDoubleTapToZoomEnabled(true);
        sensorChart.setHighlightPerDragEnabled(true);
        sensorChart.setBackgroundColor(Color.WHITE);
        sensorChart.setNoDataText("Loading...");

        // Set custom marker view for interactive tooltips
        CustomMarkerView markerView = new CustomMarkerView(this, R.layout.custom_marker_view, sensorUnit);
        markerView.setChartView(sensorChart);
        sensorChart.setMarker(markerView);

        // Set zoom limits
        sensorChart.setMaxVisibleValueCount(100);
        sensorChart.setDragDecelerationFrictionCoef(0.9f);

        XAxis xAxis = sensorChart.getXAxis();
        xAxis.setPosition(XAxis.XAxisPosition.BOTTOM);
        xAxis.setDrawGridLines(true);
        xAxis.setGridColor(Color.parseColor("#E0E0E0"));
        xAxis.setTextColor(Color.parseColor("#757575"));
        xAxis.setTextSize(10f);
        xAxis.setLabelCount(4, true);
        xAxis.setGranularity(60f); // 1 minute granularity
        // Formatter will be set when data is loaded

        YAxis leftAxis = sensorChart.getAxisLeft();
        leftAxis.setDrawGridLines(true);
        leftAxis.setGridColor(Color.parseColor("#E0E0E0"));
        leftAxis.setTextColor(Color.parseColor("#757575"));
        leftAxis.setTextSize(12f);
        leftAxis.setAxisMinimum(0);
        leftAxis.setLabelCount(5, false);

        sensorChart.getAxisRight().setEnabled(false);
        sensorChart.getLegend().setEnabled(false);
        sensorChart.animateX(500);
    }

    private void updateChart(ArrayList<Entry> entries) {
        if (entries == null || entries.isEmpty()) {
            android.util.Log.w("SensorDetailActivity", "updateChart called with empty entries");
            sensorChart.clear();
            sensorChart.invalidate();
            return;
        }

        android.util.Log.d("SensorDetailActivity", "Updating chart with " + entries.size() + " entries");

        LineDataSet dataSet = new LineDataSet(entries, sensorName);
        dataSet.setColor(Color.parseColor("#7C4DFF"));
        dataSet.setLineWidth(2.5f);
        dataSet.setCircleColor(Color.parseColor("#7C4DFF"));
        dataSet.setCircleRadius(3f);
        dataSet.setDrawCircleHole(true);
        dataSet.setCircleHoleColor(Color.WHITE);
        dataSet.setCircleHoleRadius(1.5f);
        dataSet.setDrawCircles(entries.size() <= 50); // Only show circles if data points are not too many
        dataSet.setDrawValues(false);
        dataSet.setMode(LineDataSet.Mode.LINEAR);
        dataSet.setDrawFilled(false);

        // Enable highlighting
        dataSet.setHighLightColor(Color.parseColor("#FF6E40"));
        dataSet.setHighlightLineWidth(2f);
        dataSet.setDrawHighlightIndicators(true);
        dataSet.setDrawHorizontalHighlightIndicator(true);
        dataSet.setDrawVerticalHighlightIndicator(true);

        LineData lineData = new LineData(dataSet);
        sensorChart.setData(lineData);

        // Reset zoom to fit all data (user can pinch zoom to zoom in/out)
        sensorChart.fitScreen();

        // Auto scale Y axis based on data
        sensorChart.getAxisLeft().resetAxisMaximum();
        sensorChart.getAxisLeft().resetAxisMinimum();

        // Move to the latest data
        if (entries.size() > 0) {
            sensorChart.moveViewToX(entries.get(entries.size() - 1).getX());
        }

        sensorChart.invalidate();
        android.util.Log.d("SensorDetailActivity", "Chart updated successfully");
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

    private void setupBottomNavigation() {
        bottomNavigation.setOnItemSelectedListener(item -> {
            int itemId = item.getItemId();
            if (itemId == R.id.navigation_home) {
                Intent intent = new Intent(SensorDetailActivity.this, HomeActivity.class);
                intent.setFlags(Intent.FLAG_ACTIVITY_CLEAR_TOP);
                startActivity(intent);
                return true;
            } else if (itemId == R.id.navigation_market) {
                Intent intent = new Intent(SensorDetailActivity.this, ShopActivity.class);
                intent.setFlags(Intent.FLAG_ACTIVITY_CLEAR_TOP);
                startActivity(intent);
                return true;
            }
            return false;
        });
    }

    private void startRealtimeDataFetch() {
        handler.postDelayed(new Runnable() {
            @Override
            public void run() {
                if (isRunning) {
                    fetchSensorData();
                    // Repeat every 3 seconds
                    handler.postDelayed(this, 3000);
                }
            }
        }, 500); // Start after 500ms
    }

    private void fetchSensorData() {
        // Fetch 100 records to have enough data for filtering
        firebaseClient.getSensorData(null, 100, new FirebaseClient.FirebaseCallback() {
            @Override
            public void onSuccess(List<SensorData> dataList) {
                if (dataList != null && !dataList.isEmpty()) {
                    android.util.Log.d("SensorDetailActivity", "Fetched " + dataList.size() + " records");
                    allData.clear();
                    allData.addAll(dataList);
                    runOnUiThread(new Runnable() {
                        @Override
                        public void run() {
                            applyTimeRangeFilter();
                        }
                    });
                } else {
                    android.util.Log.w("SensorDetailActivity", "No data received from Firebase");
                    runOnUiThread(new Runnable() {
                        @Override
                        public void run() {
                            sensorChart.setNoDataText("Tidak ada data");
                            sensorChart.invalidate();
                        }
                    });
                }
            }

            @Override
            public void onError(String error) {
                android.util.Log.e("SensorDetailActivity", "Error fetching sensor data: " + error);
                runOnUiThread(new Runnable() {
                    @Override
                    public void run() {
                        sensorChart.setNoDataText("Error: " + error);
                        sensorChart.invalidate();
                    }
                });
            }
        });
    }

    private void applyTimeRangeFilter() {
        if (allData.isEmpty()) {
            android.util.Log.w("SensorDetailActivity", "allData is empty, cannot apply filter");
            return;
        }

        // Clear existing data
        timestamps.clear();
        values.clear();
        chartData.clear();

        // Calculate time range based on selected option
        long currentTime = System.currentTimeMillis();
        long timeRangeMillis = getTimeRangeInMillis(selectedTimeRangePosition);
        long cutoffTime = currentTime - timeRangeMillis;

        android.util.Log.d("SensorDetailActivity", "Filtering data for time range: " + getTimeRangeLabel(selectedTimeRangePosition));
        android.util.Log.d("SensorDetailActivity", "Total records to filter: " + allData.size());

        // Filter and process data
        for (int i = allData.size() - 1; i >= 0; i--) {
            SensorData data = allData.get(i);
            long timestamp = parseTimestamp(data.getReceivedAt());

            // Only include data within the selected time range
            if (timestamp >= cutoffTime) {
                float xValue = timestamp / 1000f; // Convert to seconds for X-axis
                float yValue = getSensorValueFromData(data);

                timestamps.add(timestamp);
                values.add(yValue);
                chartData.add(new Entry(xValue, yValue));
            }
        }

        android.util.Log.d("SensorDetailActivity", "Filtered records: " + chartData.size());

        // Update X-axis formatter based on time range
        XAxis xAxis = sensorChart.getXAxis();
        xAxis.setValueFormatter(new TimeAxisFormatter(timeRangeMillis));

        // Update chart
        if (chartData.isEmpty()) {
            android.util.Log.w("SensorDetailActivity", "No data within selected time range");
            sensorChart.setNoDataText("Tidak ada data untuk rentang waktu ini");
            sensorChart.clear();
            sensorChart.invalidate();
        } else {
            updateChart(new ArrayList<>(chartData));
        }
    }

    private long getTimeRangeInMillis(int position) {
        switch (position) {
            case 0: // 5 minutes
                return 5 * 60 * 1000L;
            case 1: // 10 minutes
                return 10 * 60 * 1000L;
            case 2: // 1 day
                return 24 * 60 * 60 * 1000L;
            case 3: // 7 days
                return 7 * 24 * 60 * 60 * 1000L;
            case 4: // 30 days
                return 30 * 24 * 60 * 60 * 1000L;
            default:
                return 10 * 60 * 1000L; // Default to 10 minutes
        }
    }

    private float getSensorValueFromData(SensorData data) {
        // Map sensor name to corresponding data field
        switch (sensorName) {
            case "Intensitas Cahaya":
                return data.getLightLux();
            case "Kelembapan":
                return data.getHumidity();
            case "Temperatur Suhu":
                return data.getTemperatureC();
            case "Curah Hujan":
                return data.getRainrateMmh();
            case "Tegangan Panel Surya":
                return data.getSolVoltageV();
            case "Arus Panel Surya":
                return data.getSolCurrentMa();
            case "Watt Panel Surya":
                return data.getSolPowerW();
            case "Kecepatan Angin":
                return data.getWindKmh();
            default:
                return 0f;
        }
    }

    private long parseTimestamp(String receivedAt) {
        try {
            SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd'T'HH:mm:ss.SSS'Z'", Locale.US);
            sdf.setTimeZone(java.util.TimeZone.getTimeZone("UTC"));
            Date date = sdf.parse(receivedAt);
            return date != null ? date.getTime() : System.currentTimeMillis();
        } catch (Exception e) {
            android.util.Log.e("SensorDetailActivity", "Error parsing timestamp: " + receivedAt, e);
            return System.currentTimeMillis();
        }
    }

    private void downloadDataAsCSV() {
        try {
            // Create CSV content
            StringBuilder csvContent = new StringBuilder();

            // Add header with time range info
            String timeRangeLabel = getTimeRangeLabel(selectedTimeRangePosition);
            csvContent.append("# Data Sensor: ").append(sensorName).append("\n");
            csvContent.append("# Rentang Waktu: ").append(timeRangeLabel).append("\n");
            csvContent.append("# Total Data: ").append(chartData.size()).append(" record\n\n");
            csvContent.append("Timestamp,").append(sensorName).append(" (").append(sensorUnit).append(")\n");

            SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss", Locale.getDefault());
            for (int i = 0; i < chartData.size(); i++) {
                Entry entry = chartData.get(i);
                String timeStr = i < timestamps.size() ? sdf.format(new Date(timestamps.get(i))) : "";
                csvContent.append(timeStr).append(",").append(String.format(Locale.US, "%.2f", entry.getY())).append("\n");
            }

            // Save to Downloads folder
            SimpleDateFormat dateFormat = new SimpleDateFormat("yyyyMMdd_HHmmss", Locale.getDefault());
            String fileName = sensorName.replace(" ", "_") + "_" + dateFormat.format(new Date()) + ".csv";

            File path = new File(getExternalFilesDir(Environment.DIRECTORY_DOWNLOADS), fileName);
            FileWriter writer = new FileWriter(path);
            writer.write(csvContent.toString());
            writer.close();

            showToast("CSV berhasil diunduh: " + fileName + " (" + chartData.size() + " records)");
        } catch (IOException e) {
            e.printStackTrace();
            showToast("Gagal mengunduh CSV");
        }
    }

    private String getTimeRangeLabel(int position) {
        switch (position) {
            case 0: return "5 Menit Terakhir";
            case 1: return "10 Menit Terakhir";
            case 2: return "1 Hari Terakhir";
            case 3: return "7 Hari Terakhir";
            case 4: return "30 Hari Terakhir";
            default: return "10 Menit Terakhir";
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