# Aplikasi Klimacek

Aplikasi Android untuk Platform Pemantauan Iklim Cuaca dan Rekomendasi Keputusan Berbasis IoT dan AI.

## Persyaratan

- Android Studio Arctic Fox atau lebih baru
- JDK 11 atau lebih tinggi
- Android SDK dengan minimum API level 24 (Android 7.0 Nougat)

## Cara Menjalankan

1. Buka Android Studio
2. Pilih "Open" dan navigasi ke folder `KlimacekApp`
3. Tunggu Gradle sync selesai
4. Klik tombol "Run" (ikon play hijau) atau tekan Shift+F10
5. Pilih emulator atau device fisik yang terhubung

## Build APK

Untuk membuat APK:

```bash
cd KlimacekApp
./gradlew assembleDebug
```

APK akan tersedia di: `app/build/outputs/apk/debug/app-debug.apk`

## Struktur Project

- `app/src/main/java/com/klimacek/app/` - Kode Java aplikasi
- `app/src/main/res/layout/` - File layout XML
- `app/src/main/res/drawable/` - Resource gambar dan ikon
- `app/src/main/res/values/` - String, warna, dan tema

## Fitur

- Halaman landing dengan logo Klimacek
- Background tema pertanian
- Tombol login untuk masuk ke aplikasi
- Design responsif untuk berbagai ukuran layar