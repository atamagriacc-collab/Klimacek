package com.klimacek.app;

import androidx.appcompat.app.AppCompatActivity;
import androidx.recyclerview.widget.GridLayoutManager;
import androidx.recyclerview.widget.RecyclerView;
import android.content.Intent;
import android.net.Uri;
import android.os.Bundle;
import android.view.View;
import android.widget.ImageView;
import android.widget.TextView;
import android.widget.Toast;
import com.google.android.material.bottomnavigation.BottomNavigationView;
import java.util.ArrayList;
import java.util.List;
import java.net.URLEncoder;
import java.nio.charset.StandardCharsets;

public class ShopActivity extends AppCompatActivity {

    private RecyclerView recyclerView;
    private ProductAdapter productAdapter;
    private List<Product> productList;
    private ImageView backButton;
    private TextView titleText;
    private BottomNavigationView bottomNavigation;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);

        if (getSupportActionBar() != null) {
            getSupportActionBar().hide();
        }

        setContentView(R.layout.activity_shop);

        initializeViews();
        setupProducts();
        setupRecyclerView();
        setupClickListeners();
        setupBottomNavigation();
    }

    private void initializeViews() {
        recyclerView = findViewById(R.id.recyclerViewProducts);
        backButton = findViewById(R.id.backButton);
        titleText = findViewById(R.id.titleText);
        bottomNavigation = findViewById(R.id.bottomNavigationShop);
        titleText.setText("Market");
    }

    private void setupProducts() {
        productList = new ArrayList<>();

        // Main product - KlimaStation
        productList.add(new Product(
            "KlimaStation",
            "Stasiun cuaca IoT dengan sensor lengkap untuk monitoring kondisi lingkungan pertanian secara real-time",
            2500000,
            R.drawable.product_klimastation,
            "BELI SEKARANG"
        ));

        // Additional IoT products
        productList.add(new Product(
            "Sensor Tanah Smart",
            "Sensor kelembapan tanah dengan koneksi wireless untuk monitoring kondisi tanah",
            850000,
            R.drawable.product_soil_sensor,
            "BELI SEKARANG"
        ));

        productList.add(new Product(
            "Rain Gauge Digital",
            "Alat pengukur curah hujan otomatis dengan data logging dan koneksi internet",
            1200000,
            R.drawable.product_rain_gauge,
            "BELI SEKARANG"
        ));

        productList.add(new Product(
            "Solar Panel Kit",
            "Kit panel surya untuk power supply stasiun cuaca di area terpencil",
            1750000,
            R.drawable.product_solar_panel,
            "BELI SEKARANG"
        ));

        productList.add(new Product(
            "Wind Speed Sensor",
            "Sensor kecepatan angin presisi tinggi dengan anemometer digital",
            950000,
            R.drawable.product_wind_sensor,
            "BELI SEKARANG"
        ));

        productList.add(new Product(
            "UV Index Meter",
            "Pengukur indeks UV untuk monitoring radiasi matahari",
            650000,
            R.drawable.product_uv_meter,
            "PRE-ORDER"
        ));
    }

    private void setupRecyclerView() {
        productAdapter = new ProductAdapter(this, productList, new ProductAdapter.OnProductClickListener() {
            @Override
            public void onProductClick(Product product) {
                openWhatsAppForProduct(product);
            }

            @Override
            public void onFavoriteClick(Product product, int position) {
                product.setFavorite(!product.isFavorite());
                productAdapter.notifyItemChanged(position);
                String message = product.isFavorite() ? "Ditambahkan ke favorit" : "Dihapus dari favorit";
                Toast.makeText(ShopActivity.this, message, Toast.LENGTH_SHORT).show();
            }
        });

        GridLayoutManager layoutManager = new GridLayoutManager(this, 2);
        recyclerView.setLayoutManager(layoutManager);
        recyclerView.setAdapter(productAdapter);
    }

    private void openWhatsAppForProduct(Product product) {
        try {
            // Format harga dengan rupiah
            String formattedPrice = product.getFormattedPrice();

            // Buat pesan WhatsApp yang disesuaikan dengan produk
            String message = "Halo kak, saya mau tanya-tanya terkait produk " +
                           product.getName() + " (Harga: " + formattedPrice + ")";

            // Encode message untuk URL
            String encodedMessage = URLEncoder.encode(message, StandardCharsets.UTF_8.toString());

            // Nomor WhatsApp tujuan
            String phoneNumber = "6281911998210";

            // Buat WhatsApp URL
            String whatsappUrl = "https://wa.me/" + phoneNumber + "?text=" + encodedMessage;

            // Buka WhatsApp dengan Intent
            Intent intent = new Intent(Intent.ACTION_VIEW);
            intent.setData(Uri.parse(whatsappUrl));

            // Cek apakah WhatsApp terinstall
            if (intent.resolveActivity(getPackageManager()) != null) {
                startActivity(intent);
            } else {
                // Jika WhatsApp tidak terinstall, buka di browser
                Toast.makeText(this, "WhatsApp tidak terinstall, membuka di browser...", Toast.LENGTH_SHORT).show();
                startActivity(intent);
            }
        } catch (Exception e) {
            e.printStackTrace();
            Toast.makeText(this, "Gagal membuka WhatsApp: " + e.getMessage(), Toast.LENGTH_SHORT).show();
        }
    }

    private void setupClickListeners() {
        backButton.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                onBackPressed();
            }
        });
    }

    private void setupBottomNavigation() {
        bottomNavigation.setSelectedItemId(R.id.navigation_market);

        bottomNavigation.setOnItemSelectedListener(item -> {
            int itemId = item.getItemId();
            if (itemId == R.id.navigation_home) {
                Intent intent = new Intent(ShopActivity.this, HomeActivity.class);
                startActivity(intent);
                finish();
                return true;
            } else if (itemId == R.id.navigation_market) {
                return true;
            }
            return false;
        });
    }

}