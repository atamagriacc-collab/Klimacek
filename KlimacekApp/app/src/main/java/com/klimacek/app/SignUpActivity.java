package com.klimacek.app;

import android.content.Intent;
import android.os.Bundle;
import android.text.Editable;
import android.text.TextUtils;
import android.text.TextWatcher;
import android.view.View;
import android.widget.Button;
import android.widget.ProgressBar;
import android.widget.TextView;
import android.widget.Toast;

import androidx.appcompat.app.AppCompatActivity;

import com.google.android.material.textfield.TextInputEditText;
import com.google.firebase.auth.FirebaseAuth;
import com.google.firebase.auth.FirebaseUser;

public class SignUpActivity extends AppCompatActivity {

    private TextInputEditText etEmail, etPassword, etConfirmPassword;
    private Button btnSignUp;
    private TextView tvLogin, tvError, tvPasswordStrength;
    private ProgressBar progressBar, passwordStrengthBar;
    private View passwordStrengthLayout;
    private FirebaseAuth mAuth;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_signup);

        // Initialize Firebase Auth
        mAuth = FirebaseAuth.getInstance();

        // Initialize views
        etEmail = findViewById(R.id.etEmail);
        etPassword = findViewById(R.id.etPassword);
        etConfirmPassword = findViewById(R.id.etConfirmPassword);
        btnSignUp = findViewById(R.id.btnSignUp);
        tvLogin = findViewById(R.id.tvLogin);
        tvError = findViewById(R.id.tvError);
        progressBar = findViewById(R.id.progressBar);
        tvPasswordStrength = findViewById(R.id.tvPasswordStrength);
        passwordStrengthBar = findViewById(R.id.passwordStrengthBar);
        passwordStrengthLayout = findViewById(R.id.passwordStrengthLayout);

        // Set up password strength indicator
        etPassword.addTextChangedListener(new TextWatcher() {
            @Override
            public void beforeTextChanged(CharSequence s, int start, int count, int after) {}

            @Override
            public void onTextChanged(CharSequence s, int start, int before, int count) {
                updatePasswordStrength(s.toString());
            }

            @Override
            public void afterTextChanged(Editable s) {}
        });

        // Set click listeners
        btnSignUp.setOnClickListener(v -> signUpUser());
        tvLogin.setOnClickListener(v -> {
            startActivity(new Intent(SignUpActivity.this, LoginActivity.class));
            finish();
        });
    }

    private void updatePasswordStrength(String password) {
        if (password.isEmpty()) {
            passwordStrengthLayout.setVisibility(View.GONE);
            passwordStrengthBar.setVisibility(View.GONE);
            return;
        }

        passwordStrengthLayout.setVisibility(View.VISIBLE);
        passwordStrengthBar.setVisibility(View.VISIBLE);

        int strength = 0;
        String strengthText;
        int color;

        if (password.length() >= 6) strength++;
        if (password.length() >= 8) strength++;
        if (password.matches(".*[A-Z].*")) strength++;
        if (password.matches(".*[0-9].*")) strength++;

        if (strength <= 1) {
            strengthText = "Lemah";
            color = 0xFFF44336; // Red
            passwordStrengthBar.setProgress(33);
        } else if (strength <= 2) {
            strengthText = "Sedang";
            color = 0xFFFFA726; // Orange
            passwordStrengthBar.setProgress(66);
        } else {
            strengthText = "Kuat";
            color = 0xFF4CAF50; // Green
            passwordStrengthBar.setProgress(100);
        }

        tvPasswordStrength.setText(strengthText);
        tvPasswordStrength.setTextColor(color);
        passwordStrengthBar.setProgressTintList(
            android.content.res.ColorStateList.valueOf(color)
        );
    }

    private void signUpUser() {
        String email = etEmail.getText().toString().trim();
        String password = etPassword.getText().toString().trim();
        String confirmPassword = etConfirmPassword.getText().toString().trim();

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

        if (password.length() < 6) {
            showError("Password harus minimal 6 karakter");
            etPassword.requestFocus();
            return;
        }

        if (TextUtils.isEmpty(confirmPassword)) {
            showError("Konfirmasi password tidak boleh kosong");
            etConfirmPassword.requestFocus();
            return;
        }

        if (!password.equals(confirmPassword)) {
            showError("Password dan konfirmasi password tidak cocok");
            etConfirmPassword.requestFocus();
            return;
        }

        // Show progress
        setLoading(true);
        hideError();

        // Create user with Firebase
        mAuth.createUserWithEmailAndPassword(email, password)
                .addOnCompleteListener(this, task -> {
                    setLoading(false);
                    if (task.isSuccessful()) {
                        // Sign up success
                        FirebaseUser user = mAuth.getCurrentUser();
                        Toast.makeText(SignUpActivity.this, "Pendaftaran berhasil!",
                                Toast.LENGTH_SHORT).show();
                        navigateToMain();
                    } else {
                        // Sign up failed
                        String errorMessage = getErrorMessage(task.getException());
                        showError(errorMessage);
                    }
                });
    }

    private String getErrorMessage(Exception exception) {
        if (exception == null) {
            return "Terjadi kesalahan saat mendaftar. Silakan coba lagi.";
        }

        String errorCode = exception.getMessage();
        if (errorCode != null) {
            if (errorCode.contains("email-already-in-use")) {
                return "Email sudah terdaftar. Silakan gunakan email lain atau login.";
            } else if (errorCode.contains("invalid-email")) {
                return "Format email tidak valid.";
            } else if (errorCode.contains("weak-password")) {
                return "Password terlalu lemah. Gunakan minimal 6 karakter.";
            } else if (errorCode.contains("operation-not-allowed")) {
                return "Pendaftaran tidak diizinkan. Hubungi administrator.";
            }
        }
        return "Terjadi kesalahan saat mendaftar. Silakan coba lagi.";
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
            btnSignUp.setEnabled(false);
            etEmail.setEnabled(false);
            etPassword.setEnabled(false);
            etConfirmPassword.setEnabled(false);
        } else {
            progressBar.setVisibility(View.GONE);
            btnSignUp.setEnabled(true);
            etEmail.setEnabled(true);
            etPassword.setEnabled(true);
            etConfirmPassword.setEnabled(true);
        }
    }

    private void navigateToMain() {
        Intent intent = new Intent(SignUpActivity.this, MainActivity.class);
        intent.setFlags(Intent.FLAG_ACTIVITY_NEW_TASK | Intent.FLAG_ACTIVITY_CLEAR_TASK);
        startActivity(intent);
        finish();
    }
}
