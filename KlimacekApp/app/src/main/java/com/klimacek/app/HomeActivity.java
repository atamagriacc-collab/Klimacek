package com.klimacek.app;

import androidx.appcompat.app.AppCompatActivity;
import androidx.cardview.widget.CardView;
import android.content.Intent;
import android.os.Bundle;
import android.view.View;
import android.view.WindowManager;
import android.widget.Button;
import android.widget.LinearLayout;
import android.widget.TextView;
import android.widget.Toast;
import com.google.android.material.bottomnavigation.BottomNavigationView;

public class HomeActivity extends AppCompatActivity {

    private CardView cardIntensitasCahaya;
    private CardView cardKelembapan;
    private CardView cardKecepatanAngin;
    private CardView cardCurahHujan;
    private LinearLayout menuTanah;
    private LinearLayout menuTanaman;
    private LinearLayout menuCuaca;
    private LinearLayout menuHama;
    private BottomNavigationView bottomNavigation;
    private Button btnSelengkapnya;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);

        if (getSupportActionBar() != null) {
            getSupportActionBar().hide();
        }

        getWindow().setFlags(WindowManager.LayoutParams.FLAG_FULLSCREEN,
                WindowManager.LayoutParams.FLAG_FULLSCREEN);

        setContentView(R.layout.activity_home);

        initializeViews();
        setupClickListeners();
        setupBottomNavigation();
    }

    private void initializeViews() {
        cardIntensitasCahaya = findViewById(R.id.cardIntensitasCahaya);
        cardKelembapan = findViewById(R.id.cardKelembapan);
        cardKecepatanAngin = findViewById(R.id.cardKecepatanAngin);
        cardCurahHujan = findViewById(R.id.cardCurahHujan);

        menuTanah = findViewById(R.id.menuTanah);
        menuTanaman = findViewById(R.id.menuTanaman);
        menuCuaca = findViewById(R.id.menuCuaca);
        menuHama = findViewById(R.id.menuHama);

        btnSelengkapnya = findViewById(R.id.btnSelengkapnya);
        bottomNavigation = findViewById(R.id.bottomNavigation);
    }

    private void setupClickListeners() {
        cardIntensitasCahaya.setOnClickListener(v ->
            showToast("Intensitas Cahaya: 3.33 Cd"));

        cardKelembapan.setOnClickListener(v ->
            showToast("Kelembapan: 50%"));

        cardKecepatanAngin.setOnClickListener(v ->
            showToast("Kecepatan Angin: 1000 hPa"));

        cardCurahHujan.setOnClickListener(v ->
            showToast("Curah Hujan: 30 mm"));

        menuTanah.setOnClickListener(v -> {
            Intent intent = new Intent(HomeActivity.this, ArticleActivity.class);
            startActivity(intent);
        });

        menuTanaman.setOnClickListener(v -> {
            Intent intent = new Intent(HomeActivity.this, ArticleActivity.class);
            startActivity(intent);
        });

        menuCuaca.setOnClickListener(v -> {
            Intent intent = new Intent(HomeActivity.this, ArticleActivity.class);
            startActivity(intent);
        });

        menuHama.setOnClickListener(v -> {
            Intent intent = new Intent(HomeActivity.this, ArticleActivity.class);
            startActivity(intent);
        });

        btnSelengkapnya.setOnClickListener(v -> {
            Intent intent = new Intent(HomeActivity.this, DashboardActivity.class);
            startActivity(intent);
        });
    }

    private void setupBottomNavigation() {
        bottomNavigation.setOnItemSelectedListener(item -> {
            int itemId = item.getItemId();
            if (itemId == R.id.navigation_home) {
                return true;
            } else if (itemId == R.id.navigation_dashboard) {
                showToast("Dashboard");
                return true;
            } else if (itemId == R.id.navigation_categories) {
                showToast("Categories");
                return true;
            } else if (itemId == R.id.navigation_market) {
                Intent intent = new Intent(HomeActivity.this, ShopActivity.class);
                startActivity(intent);
                return true;
            }
            return false;
        });
    }

    private void showToast(String message) {
        Toast.makeText(this, message, Toast.LENGTH_SHORT).show();
    }
}