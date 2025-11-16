# 🚀 Upload Manual ke Firebase App Distribution

## Langkah-langkah Upload (Paling Mudah!)

### 1️⃣ Buka Firebase Console
Klik link ini: **https://console.firebase.google.com/project/atamagri-iot/appdistribution**

### 2️⃣ Upload APK
1. Di halaman App Distribution, Anda akan melihat area **"Drag and drop an APK or AAB"**
2. **Drag** file APK dari lokasi ini:
   ```
   D:\Kerja\Klimacek\KlimacekApp\app\build\outputs\apk\debug\app-debug.apk
   ```
3. **Drop** di area upload
4. Atau klik area tersebut dan browse ke file APK

### 3️⃣ Isi Release Notes
Paste release notes berikut:

```
KlimacekApp v1.0.1 - Firebase Authentication Update

New Features:
✨ Firebase Authentication integration
✨ User Login with email and password
✨ User Registration (Sign Up)
✨ Logout functionality
✨ Session persistence (auto-login)

Features:
📊 Real-time sensor data monitoring
🌡️ Weather station integration
💡 Solar panel monitoring
📱 Clean and modern UI

Bug Fixes:
🐛 Improved error handling for authentication
🐛 Better user experience with loading states

Next Steps:
1. Install the APK on your Android device
2. Sign up with your email and password
3. Login and start monitoring your sensors!

Note: This is a beta version for testing purposes.
```

### 4️⃣ Tambahkan Testers
1. Scroll ke bawah ke section **"Testers"**
2. Pilih **"Add testers"**
3. Masukkan email addresses tester (satu per baris), contoh:
   ```
   tester1@gmail.com
   tester2@gmail.com
   atamagriacc@gmail.com
   ```
4. Klik **"Add"**

### 5️⃣ Distribute!
1. Klik button **"Distribute"** atau **"Continue"**
2. Tunggu proses upload selesai (1-2 menit)
3. ✅ Selesai! Testers akan menerima email invitation

---

## 📥 Cara Tester Download Aplikasi

Setelah distribusi berhasil:

1. **Tester menerima email** dari Firebase App Distribution
2. **Klik link** "Download the Latest Build" di email
3. **Install Firebase App Tester** (jika belum punya):
   - Download dari: https://play.google.com/store/apps/details?id=com.google.firebase.appdistribution
4. **Login** dengan akun Google yang menerima invitation
5. **Download & Install** KlimacekApp
6. **Buka aplikasi** dan sign up/login!

---

## 📱 Testing Checklist

Setelah install, test fitur-fitur ini:

- [ ] Buka aplikasi pertama kali
- [ ] Klik "Login" button
- [ ] Test Sign Up:
  - [ ] Input email valid (contoh: test@gmail.com)
  - [ ] Input password (min 6 karakter)
  - [ ] Konfirmasi password sama
  - [ ] Password strength indicator muncul
  - [ ] Klik "Daftar"
- [ ] Test Login:
  - [ ] Input email yang sudah didaftarkan
  - [ ] Input password
  - [ ] Klik "Masuk"
- [ ] Verify redirect ke Home setelah login berhasil
- [ ] Test Sensor Data:
  - [ ] Cek data real-time muncul
  - [ ] Klik card sensor untuk detail
  - [ ] Cek grafik muncul
- [ ] Test Logout:
  - [ ] Klik icon arrow di pojok kanan atas
  - [ ] Verify redirect ke halaman login
  - [ ] Verify session cleared
- [ ] Test Auto-Login:
  - [ ] Close app
  - [ ] Buka app lagi
  - [ ] Verify langsung masuk ke Home (tidak perlu login lagi)

---

## 🔄 Update Aplikasi di Masa Depan

Ketika ada update:

1. **Build APK baru**:
   ```bash
   cd D:\Kerja\Klimacek\KlimacekApp
   gradlew.bat assembleDebug
   ```

2. **Upload** APK baru via drag & drop di console
3. **Update** release notes
4. **Distribute** ke testers
5. Testers akan dapat **notifikasi update** via email

---

## 🎯 File Locations

**APK File:**
```
D:\Kerja\Klimacek\KlimacekApp\app\build\outputs\apk\debug\app-debug.apk
```

**Release Notes:**
```
D:\Kerja\Klimacek\release-notes.txt
```

**Firebase Console:**
```
https://console.firebase.google.com/project/atamagri-iot/appdistribution
```

---

## ❓ Troubleshooting

### Q: APK tidak bisa di-upload?
**A:** Pastikan:
- File APK valid (cek size > 0 bytes)
- Browser sudah login ke account Firebase yang benar
- Refresh halaman console

### Q: Tester tidak menerima email?
**A:**
- Cek spam folder
- Pastikan email sudah ditambahkan dengan benar
- Kirim ulang invitation dari console

### Q: APK tidak bisa di-install di device?
**A:**
- Enable "Install from Unknown Sources" di Settings
- Uninstall versi lama jika ada
- Pastikan device Android versi minimal 7.0 (API 24)

### Q: Aplikasi crash saat dibuka?
**A:**
- Cek logcat untuk error details
- Pastikan internet connection aktif (untuk Firebase)
- Coba uninstall dan install ulang

---

**Ready to upload? Go! 🚀**

Link: https://console.firebase.google.com/project/atamagri-iot/appdistribution
