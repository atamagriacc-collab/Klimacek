package com.klimacek.app;

import android.content.Context;
import android.widget.TextView;

import com.github.mikephil.charting.components.MarkerView;
import com.github.mikephil.charting.data.Entry;
import com.github.mikephil.charting.highlight.Highlight;
import com.github.mikephil.charting.utils.MPPointF;

import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.Locale;

public class CustomMarkerView extends MarkerView {
    private TextView tvContent;
    private TextView tvTime;
    private String unit;
    private SimpleDateFormat dateFormat;

    public CustomMarkerView(Context context, int layoutResource, String unit) {
        super(context, layoutResource);
        this.unit = unit;
        tvContent = findViewById(R.id.tvMarkerValue);
        tvTime = findViewById(R.id.tvMarkerTime);
        dateFormat = new SimpleDateFormat("HH:mm:ss", Locale.getDefault());
    }

    @Override
    public void refreshContent(Entry e, Highlight highlight) {
        // Format nilai dengan 2 desimal
        String value = String.format(Locale.US, "%.2f %s", e.getY(), unit);
        tvContent.setText(value);

        // Format waktu dari X value (timestamp dalam detik)
        long timestamp = (long) (e.getX() * 1000); // Convert to milliseconds
        String time = dateFormat.format(new Date(timestamp));
        tvTime.setText(time);

        super.refreshContent(e, highlight);
    }

    @Override
    public MPPointF getOffset() {
        return new MPPointF(-(getWidth() / 2f), -getHeight());
    }
}
