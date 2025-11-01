package com.klimacek.app;

import com.google.gson.annotations.SerializedName;
import java.util.List;

public class ApiResponse {
    @SerializedName("success")
    private boolean success;

    @SerializedName("data")
    private List<SensorData> data;

    @SerializedName("count")
    private int count;

    @SerializedName("total")
    private int total;

    @SerializedName("error")
    private String error;

    // Getters
    public boolean isSuccess() {
        return success;
    }

    public List<SensorData> getData() {
        return data;
    }

    public int getCount() {
        return count;
    }

    public int getTotal() {
        return total;
    }

    public String getError() {
        return error;
    }
}
