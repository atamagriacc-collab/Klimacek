package com.klimacek.app;

import androidx.appcompat.app.AppCompatActivity;
import androidx.recyclerview.widget.LinearLayoutManager;
import androidx.recyclerview.widget.RecyclerView;
import android.os.Bundle;
import android.view.View;
import android.view.WindowManager;
import android.widget.ImageView;
import android.widget.TextView;
import java.util.ArrayList;
import java.util.List;

public class ArticleActivity extends AppCompatActivity {

    private RecyclerView recyclerView;
    private ArticleAdapter articleAdapter;
    private List<Article> articleList;
    private ImageView backButton;
    private TextView titleText;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);

        if (getSupportActionBar() != null) {
            getSupportActionBar().hide();
        }

        getWindow().setFlags(WindowManager.LayoutParams.FLAG_FULLSCREEN,
                WindowManager.LayoutParams.FLAG_FULLSCREEN);

        setContentView(R.layout.activity_article);

        initializeViews();
        setupArticles();
        setupRecyclerView();
        setupClickListeners();
    }

    private void initializeViews() {
        recyclerView = findViewById(R.id.recyclerViewArticles);
        backButton = findViewById(R.id.backButton);
        titleText = findViewById(R.id.titleText);
        titleText.setText("Articles");
    }

    private void setupArticles() {
        articleList = new ArrayList<>();

        // Tanah category articles
        articleList.add(new Article(
            "Tanah",
            "Cara Mengolah Tanah Liat",
            "Tanah liat memiliki karakteristik yang unik dan memerlukan penanganan khusus untuk pertanian. Pelajari teknik pengolahan tanah liat yang efektif untuk meningkatkan produktivitas lahan Anda.",
            R.drawable.article_tanah1,
            "Tanah"
        ));

        articleList.add(new Article(
            "Tanah",
            "Meningkatkan Kesuburan Tanah Organik",
            "Metode alami untuk meningkatkan kesuburan tanah menggunakan bahan organik. Temukan cara membuat kompos yang berkualitas dan teknik aplikasi yang tepat.",
            R.drawable.article_tanah2,
            "Tanah"
        ));

        // Tanaman category articles
        articleList.add(new Article(
            "Tanaman",
            "Teknik Budidaya Padi Modern",
            "Pelajari metode terbaru dalam budidaya padi yang efisien dan ramah lingkungan. Dari pemilihan bibit hingga panen, semua dijelaskan secara detail.",
            R.drawable.article_tanaman1,
            "Tanaman"
        ));

        articleList.add(new Article(
            "Tanaman",
            "Panduan Menanam Sayuran Hidroponik",
            "Hidroponik menjadi solusi pertanian modern di lahan terbatas. Ikuti panduan lengkap memulai kebun hidroponik Anda sendiri.",
            R.drawable.article_tanaman2,
            "Tanaman"
        ));

        // Cuaca category articles
        articleList.add(new Article(
            "Cuaca",
            "Memahami Pola Cuaca untuk Pertanian",
            "Cuaca berperan penting dalam keberhasilan pertanian. Pelajari cara membaca pola cuaca dan memanfaatkannya untuk meningkatkan hasil panen.",
            R.drawable.article_cuaca1,
            "Cuaca"
        ));

        articleList.add(new Article(
            "Cuaca",
            "Adaptasi Perubahan Iklim di Sektor Pertanian",
            "Strategi adaptasi menghadapi perubahan iklim global. Temukan solusi praktis untuk menjaga produktivitas pertanian di tengah tantangan cuaca ekstrem.",
            R.drawable.article_cuaca2,
            "Cuaca"
        ));

        // Hama category articles
        articleList.add(new Article(
            "Hama",
            "Pengendalian Hama Terpadu",
            "Metode pengendalian hama yang efektif dan ramah lingkungan. Kombinasi teknik biologis, mekanis, dan kimia untuk hasil optimal.",
            R.drawable.article_hama1,
            "Hama"
        ));

        articleList.add(new Article(
            "Hama",
            "Identifikasi Hama dan Penyakit Tanaman",
            "Panduan lengkap mengenali berbagai jenis hama dan penyakit tanaman. Dilengkapi dengan foto dan cara penanganannya.",
            R.drawable.article_hama2,
            "Hama"
        ));
    }

    private void setupRecyclerView() {
        articleAdapter = new ArticleAdapter(this, articleList);
        recyclerView.setLayoutManager(new LinearLayoutManager(this));
        recyclerView.setAdapter(articleAdapter);
    }

    private void setupClickListeners() {
        backButton.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                onBackPressed();
            }
        });
    }
}