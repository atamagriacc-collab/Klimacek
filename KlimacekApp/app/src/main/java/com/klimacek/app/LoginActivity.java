package com.klimacek.app;

import android.content.Intent;
import android.os.Bundle;
import android.text.TextUtils;
import android.view.View;
import android.widget.Button;
import android.widget.ProgressBar;
import android.widget.TextView;
import android.widget.Toast;

import androidx.appcompat.app.AppCompatActivity;

import com.google.android.material.textfield.TextInputEditText;
import com.google.firebase.auth.FirebaseAuth;
import com.google.firebase.auth.FirebaseUser;

public class LoginActivity extends AppCompatActivity {

    private TextInputEditText etEmail, etPassword;
    private Button btnLogin;
    private TextView tvSignUp, tvError;
    private ProgressBar progressBar;
    private FirebaseAuth mAuth;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_login);

        // Initialize Firebase Auth
        mAuth = FirebaseAuth.getInstance();

        // Initialize views
        etEmail = findViewById(R.id.etEmail);
        etPassword = findViewById(R.id.etPassword);
        btnLogin = findViewById(R.id.btnLogin);
        tvSignUp = findViewById(R.id.tvSignUp);
        tvError = findViewById(R.id.tvError);
        progressBar = findViewById(R.id.progressBar);

        // Set click listeners
        btnLogin.setOnClickListener(v -> loginUser());
        tvSignUp.setOnClickListener(v -> {
            startActivity(new Intent(LoginActivity.this, SignUpActivity.class));
        });
    }

    @Override
    protected void onStart() {
        super.onStart();
        // Check if user is signed in
        FirebaseUser currentUser = mAuth.getCurrentUser();
        if (currentUser != null) {
            // User is already logged in, go to MainActivity
            navigateToMain();
        }
    }

    private void loginUser() {
        String email = etEmail.getText().toString().trim();
        String password = etPassword.getText().toString().trim();

        // Validate inputs
        if (TextUtils.isEmpty(email)) {
            showError("Email tidak boleh kosong");
            etEmail.requestFocus();
            return;
        }

        if (TextUtils.isEmpty(password)) {
            showError("Password tidak boleh kosong");
            etPassword.requestFocus();
            return;
        }

        // Show progress
        setLoading(true);
        hideError();

        // Sign in with Firebase
        mAuth.signInWithEmailAndPassword(email, password)
                .addOnCompleteListener(this, task -> {
                    setLoading(false);
                    if (task.isSuccessful()) {
                        // Sign in success
                        FirebaseUser user = mAuth.getCurrentUser();
                        Toast.makeText(LoginActivity.this, "Login berhasil!",
                                Toast.LENGTH_SHORT).show();
                        navigateToMain();
                    } else {
                        // Sign in failed
                        String errorMessage = getErrorMessage(task.getException());
                        showError(errorMessage);
                    }
                });
    }

    private String getErrorMessage(Exception exception) {
        if (exception == null) {
            return "Terjadi kesalahan saat login. Silakan coba lagi.";
        }

        String errorCode = exception.getMessage();
        if (errorCode != null) {
            if (errorCode.contains("user-not-found")) {
                return "Email tidak ditemukan. Silakan daftar terlebih dahulu.";
            } else if (errorCode.contains("wrong-password")) {
                return "Password salah. Silakan coba lagi.";
            } else if (errorCode.contains("invalid-email")) {
                return "Format email tidak valid.";
            } else if (errorCode.contains("too-many-requests")) {
                return "Terlalu banyak percobaan login. Silakan coba lagi nanti.";
            } else if (errorCode.contains("invalid-credential")) {
                return "Email atau password salah. Silakan coba lagi.";
            }
        }
        return "Terjadi kesalahan saat login. Silakan coba lagi.";
    }

    private void showError(String message) {
        tvError.setText(message);
        tvError.setVisibility(View.VISIBLE);
    }

    private void hideError() {
        tvError.setVisibility(View.GONE);
    }

    private void setLoading(boolean isLoading) {
        if (isLoading) {
            progressBar.setVisibility(View.VISIBLE);
            btnLogin.setEnabled(false);
            etEmail.setEnabled(false);
            etPassword.setEnabled(false);
        } else {
            progressBar.setVisibility(View.GONE);
            btnLogin.setEnabled(true);
            etEmail.setEnabled(true);
            etPassword.setEnabled(true);
        }
    }

    private void navigateToMain() {
        Intent intent = new Intent(LoginActivity.this, MainActivity.class);
        intent.setFlags(Intent.FLAG_ACTIVITY_NEW_TASK | Intent.FLAG_ACTIVITY_CLEAR_TASK);
        startActivity(intent);
        finish();
    }
}
