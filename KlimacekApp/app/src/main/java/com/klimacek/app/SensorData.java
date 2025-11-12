package com.klimacek.app;

import com.google.gson.annotations.SerializedName;

public class SensorData {
    @SerializedName("id")
    private String id;

    @SerializedName("device_id")
    private String deviceId;

    @SerializedName("timestamp")
    private String timestamp;

    @SerializedName("wind_kmh")
    private Float windKmh;

    @SerializedName("rainrate_mm_h")
    private Float rainrateMmh;

    @SerializedName("temperature_C")
    private Float temperatureC;

    @SerializedName("humidity_")
    private Float humidity;

    @SerializedName("light_lux")
    private Float lightLux;

    @SerializedName("sol_voltage_V")
    private Float solVoltageV;

    @SerializedName("sol_current_mA")
    private Float solCurrentMa;

    @SerializedName("sol_power_W")
    private Float solPowerW;

    @SerializedName("received_at")
    private String receivedAt;

    // Getters
    public String getId() {
        return id;
    }

    public String getDeviceId() {
        return deviceId;
    }

    public String getTimestamp() {
        return timestamp;
    }

    public Float getWindKmh() {
        return windKmh != null ? windKmh : 0f;
    }

    public Float getRainrateMmh() {
        return rainrateMmh != null ? rainrateMmh : 0f;
    }

    public Float getTemperatureC() {
        return temperatureC != null ? temperatureC : 0f;
    }

    public Float getHumidity() {
        return humidity != null ? humidity : 0f;
    }

    public Float getLightLux() {
        return lightLux != null ? lightLux : 0f;
    }

    public Float getSolVoltageV() {
        return solVoltageV != null ? solVoltageV : 0f;
    }

    public Float getSolCurrentMa() {
        return solCurrentMa != null ? solCurrentMa : 0f;
    }

    public Float getSolPowerW() {
        return solPowerW != null ? solPowerW : 0f;
    }

    public String getReceivedAt() {
        return receivedAt;
    }

    // Setters
    public void setId(String id) {
        this.id = id;
    }

    public void setDeviceId(String deviceId) {
        this.deviceId = deviceId;
    }

    public void setTimestamp(String timestamp) {
        this.timestamp = timestamp;
    }

    public void setWindKmh(Float windKmh) {
        this.windKmh = windKmh;
    }

    public void setRainrateMmh(Float rainrateMmh) {
        this.rainrateMmh = rainrateMmh;
    }

    public void setTemperatureC(Float temperatureC) {
        this.temperatureC = temperatureC;
    }

    public void setHumidity(Float humidity) {
        this.humidity = humidity;
    }

    public void setLightLux(Float lightLux) {
        this.lightLux = lightLux;
    }

    public void setSolVoltageV(Float solVoltageV) {
        this.solVoltageV = solVoltageV;
    }

    public void setSolCurrentMa(Float solCurrentMa) {
        this.solCurrentMa = solCurrentMa;
    }

    public void setSolPowerW(Float solPowerW) {
        this.solPowerW = solPowerW;
    }

    public void setReceivedAt(String receivedAt) {
        this.receivedAt = receivedAt;
    }
}
