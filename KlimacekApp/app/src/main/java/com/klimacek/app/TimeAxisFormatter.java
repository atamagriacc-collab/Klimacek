package com.klimacek.app;

import com.github.mikephil.charting.components.AxisBase;
import com.github.mikephil.charting.formatter.ValueFormatter;

import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.Locale;

public class TimeAxisFormatter extends ValueFormatter {
    private final SimpleDateFormat dateFormat;
    private final long timeRangeMillis;

    public TimeAxisFormatter(long timeRangeMillis) {
        this.timeRangeMillis = timeRangeMillis;

        // Choose format based on time range
        // For ranges > 1 day, show date (dd MMM)
        // For ranges <= 1 day, show time (HH:mm)
        if (timeRangeMillis > 24 * 60 * 60 * 1000L) {
            this.dateFormat = new SimpleDateFormat("dd MMM", Locale.getDefault());
        } else {
            this.dateFormat = new SimpleDateFormat("HH:mm", Locale.getDefault());
        }
    }

    @Override
    public String getAxisLabel(float value, AxisBase axis) {
        // value is timestamp in seconds
        long timestamp = (long) value * 1000L; // Convert to milliseconds
        return dateFormat.format(new Date(timestamp));
    }
}
