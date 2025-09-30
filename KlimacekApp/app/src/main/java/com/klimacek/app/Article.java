package com.klimacek.app;

public class Article {
    private String title;
    private String subtitle;
    private String description;
    private int imageResourceId;
    private String category;

    public Article(String title, String subtitle, String description, int imageResourceId, String category) {
        this.title = title;
        this.subtitle = subtitle;
        this.description = description;
        this.imageResourceId = imageResourceId;
        this.category = category;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getSubtitle() {
        return subtitle;
    }

    public void setSubtitle(String subtitle) {
        this.subtitle = subtitle;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public int getImageResourceId() {
        return imageResourceId;
    }

    public void setImageResourceId(int imageResourceId) {
        this.imageResourceId = imageResourceId;
    }

    public String getCategory() {
        return category;
    }

    public void setCategory(String category) {
        this.category = category;
    }
}