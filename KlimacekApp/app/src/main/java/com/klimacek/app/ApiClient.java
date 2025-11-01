package com.klimacek.app;

import android.os.Handler;
import android.os.Looper;
import android.util.Log;

import com.google.gson.Gson;

import java.io.IOException;

import okhttp3.Call;
import okhttp3.Callback;
import okhttp3.OkHttpClient;
import okhttp3.Request;
import okhttp3.Response;

public class ApiClient {
    private static final String TAG = "ApiClient";
    // API configuration from BuildConfig (configured per build type)
    private static final String BASE_URL = BuildConfig.API_BASE_URL;
    private static final String SENSOR_DATA_ENDPOINT = BuildConfig.SENSOR_DATA_ENDPOINT;

    private final OkHttpClient client;
    private final Gson gson;
    private final Handler mainHandler;

    public ApiClient() {
        this.client = new OkHttpClient();
        this.gson = new Gson();
        this.mainHandler = new Handler(Looper.getMainLooper());
    }

    public interface ApiCallback {
        void onSuccess(ApiResponse response);
        void onError(String error);
    }

    public void getSensorData(final ApiCallback callback) {
        getSensorData(null, 10, callback);
    }

    public void getSensorData(String deviceId, int limit, final ApiCallback callback) {
        String url = BASE_URL + SENSOR_DATA_ENDPOINT + "?limit=" + limit;
        if (deviceId != null && !deviceId.isEmpty()) {
            url += "&device_id=" + deviceId;
        }

        Request request = new Request.Builder()
                .url(url)
                .get()
                .build();

        Log.d(TAG, "Fetching sensor data from: " + url);

        client.newCall(request).enqueue(new Callback() {
            @Override
            public void onFailure(Call call, IOException e) {
                Log.e(TAG, "API request failed", e);
                mainHandler.post(() -> callback.onError("Network error: " + e.getMessage()));
            }

            @Override
            public void onResponse(Call call, Response response) throws IOException {
                if (!response.isSuccessful()) {
                    final String error = "HTTP " + response.code() + ": " + response.message();
                    Log.e(TAG, error);
                    mainHandler.post(() -> callback.onError(error));
                    return;
                }

                try {
                    String responseBody = response.body().string();
                    Log.d(TAG, "API Response: " + responseBody);

                    final ApiResponse apiResponse = gson.fromJson(responseBody, ApiResponse.class);

                    if (apiResponse != null && apiResponse.isSuccess()) {
                        mainHandler.post(() -> callback.onSuccess(apiResponse));
                    } else {
                        String errorMsg = apiResponse != null ? apiResponse.getError() : "Unknown error";
                        mainHandler.post(() -> callback.onError(errorMsg));
                    }
                } catch (Exception e) {
                    Log.e(TAG, "Error parsing response", e);
                    mainHandler.post(() -> callback.onError("Parse error: " + e.getMessage()));
                }
            }
        });
    }
}
