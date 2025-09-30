package com.klimacek.app;

import androidx.appcompat.app.AppCompatActivity;
import androidx.recyclerview.widget.GridLayoutManager;
import androidx.recyclerview.widget.RecyclerView;
import android.content.Intent;
import android.os.Bundle;
import android.view.LayoutInflater;
import android.view.View;
import android.view.WindowManager;
import android.widget.ImageView;
import android.widget.TextView;
import android.widget.Toast;
import com.google.android.material.bottomnavigation.BottomNavigationItemView;
import com.google.android.material.bottomnavigation.BottomNavigationView;
import java.util.ArrayList;
import java.util.List;

public class ShopActivity extends AppCompatActivity {

    private RecyclerView recyclerView;
    private ProductAdapter productAdapter;
    private List<Product> productList;
    private ImageView backButton;
    private ImageView profileIcon;
    private TextView titleText;
    private BottomNavigationView bottomNavigation;
    private TextView cartBadge;
    private int cartItemCount = 2;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);

        if (getSupportActionBar() != null) {
            getSupportActionBar().hide();
        }

        getWindow().setFlags(WindowManager.LayoutParams.FLAG_FULLSCREEN,
                WindowManager.LayoutParams.FLAG_FULLSCREEN);

        setContentView(R.layout.activity_shop);

        initializeViews();
        setupProducts();
        setupRecyclerView();
        setupClickListeners();
        setupBottomNavigation();
        updateCartBadge();
    }

    private void initializeViews() {
        recyclerView = findViewById(R.id.recyclerViewProducts);
        backButton = findViewById(R.id.backButton);
        profileIcon = findViewById(R.id.profileIcon);
        titleText = findViewById(R.id.titleText);
        bottomNavigation = findViewById(R.id.bottomNavigationShop);
        titleText.setText("Shop");
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
                Toast.makeText(ShopActivity.this, "Membeli: " + product.getName(), Toast.LENGTH_SHORT).show();
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

    private void setupClickListeners() {
        backButton.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                onBackPressed();
            }
        });

        profileIcon.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                Toast.makeText(ShopActivity.this, "Profile", Toast.LENGTH_SHORT).show();
            }
        });
    }

    private void setupBottomNavigation() {
        bottomNavigation.setSelectedItemId(R.id.navigation_shop_cart);

        bottomNavigation.setOnItemSelectedListener(item -> {
            int itemId = item.getItemId();
            if (itemId == R.id.navigation_shop_home) {
                Intent intent = new Intent(ShopActivity.this, HomeActivity.class);
                startActivity(intent);
                finish();
                return true;
            } else if (itemId == R.id.navigation_shop_search) {
                Toast.makeText(this, "Search", Toast.LENGTH_SHORT).show();
                return true;
            } else if (itemId == R.id.navigation_shop_favorites) {
                Toast.makeText(this, "Favorites", Toast.LENGTH_SHORT).show();
                return true;
            } else if (itemId == R.id.navigation_shop_cart) {
                return true;
            }
            return false;
        });
    }

    private void updateCartBadge() {
        BottomNavigationItemView itemView = (BottomNavigationItemView) bottomNavigation.findViewById(R.id.navigation_shop_cart);
        View badge = LayoutInflater.from(this).inflate(R.layout.cart_badge, itemView, false);
        cartBadge = badge.findViewById(R.id.cart_badge_text);
        cartBadge.setText(String.valueOf(cartItemCount));
        itemView.addView(badge);
    }

    public void addToCart() {
        cartItemCount++;
        if (cartBadge != null) {
            cartBadge.setText(String.valueOf(cartItemCount));
        }
    }
}