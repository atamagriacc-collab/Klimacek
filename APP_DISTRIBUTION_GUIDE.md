# 📱 Firebase App Distribution Setup Guide - KlimacekApp

## Step 1: Aktivasi Firebase App Distribution

### Cara Manual (Via Firebase Console):

1. **Buka Firebase Console**:
   - Kunjungi: https://console.firebase.google.com/project/atamagri-iot/appdistribution
   - Atau klik link: https://console.firebase.google.com/project/_/appdistribution

2. **Klik "Get Started"**:
   - Anda akan melihat button "Get started" atau "Mulai"
   - Klik button tersebut untuk mengaktifkan App Distribution

3. **Pilih App Android**:
   - Pilih app: `com.klimacek.app (Debug)`
   - App ID: `1:745512120451:android:6cfdd1aab20747f675ebb6`

---

## Step 2: Upload APK via Firebase Console (Cara Mudah)

### Upload Manual:

1. Di halaman App Distribution, klik **"Releases"**
2. Klik **"New release"** atau **"Upload"**
3. Pilih file APK:
   ```
   D:\Kerja\Klimacek\KlimacekApp\app\build\outputs\apk\debug\app-debug.apk
   ```
4. Tambahkan Release Notes (copy dari release-notes.txt)
5. Pilih tester groups atau tambahkan email tester
6. Klik **"Distribute"**

---

## Step 3: Upload APK via Command Line (Setelah Aktivasi)

Setelah App Distribution diaktifkan di console, jalankan command ini:

```bash
firebase appdistribution:distribute "D:\Kerja\Klimacek\KlimacekApp\app\build\outputs\apk\debug\app-debug.apk" \
  --app 1:745512120451:android:6cfdd1aab20747f675ebb6 \
  --release-notes-file release-notes.txt \
  --groups testers
```

---

## Step 4: Tambahkan Testers

### Via Firebase Console:
1. Klik **"Testers & Groups"** di sidebar
2. Klik **"Add testers"**
3. Masukkan email testers (satu per baris)
4. Klik **"Add"**

### Via Command Line:
```bash
# Tambahkan tester individual
firebase appdistribution:testers:add tester@example.com

# Buat group
firebase appdistribution:group:create testers

# Tambahkan tester ke group
firebase appdistribution:group:add testers tester@example.com
```

---

## 📥 Cara Tester Download Aplikasi

Setelah distribusi berhasil:

1. **Tester akan menerima email invitation**
2. **Klik link di email** atau install Firebase App Distribution app dari Play Store
3. **Login dengan akun Google yang diundang**
4. **Download dan install APK KlimacekApp**

---

## 🔄 Update Aplikasi di Masa Depan

Setiap kali ada update:

1. Build APK baru:
   ```bash
   cd KlimacekApp
   ./gradlew.bat assembleDebug
   ```

2. Upload APK baru:
   ```bash
   firebase appdistribution:distribute "D:\Kerja\Klimacek\KlimacekApp\app\build\outputs\apk\debug\app-debug.apk" \
     --app 1:745512120451:android:6cfdd1aab20747f675ebb6 \
     --release-notes-file release-notes.txt
   ```

3. Tester akan dapat notifikasi untuk update

---

## ✅ Checklist

- [ ] Aktivasi App Distribution di Firebase Console
- [ ] Upload APK pertama kali (manual atau CLI)
- [ ] Tambahkan tester email addresses
- [ ] Test download dari sisi tester
- [ ] Verifikasi app bisa di-install dan berjalan

---

## 🔗 Links Penting

- **Firebase Console**: https://console.firebase.google.com/project/atamagri-iot
- **App Distribution**: https://console.firebase.google.com/project/atamagri-iot/appdistribution
- **Documentation**: https://firebase.google.com/docs/app-distribution

---

## 📝 APK Location

```
D:\Kerja\Klimacek\KlimacekApp\app\build\outputs\apk\debug\app-debug.apk
```

## 📄 Release Notes Location

```
D:\Kerja\Klimacek\release-notes.txt
```

---

## ❓ Troubleshooting

### Error: "App not found"
- Pastikan App Distribution sudah diaktifkan di console
- Klik "Get started" di halaman App Distribution

### Error: "Permission denied"
- Pastikan Anda login dengan akun yang benar
- Run: `firebase login` dan pilih akun atamagriacc@gmail.com

### Tester tidak menerima email
- Cek spam folder
- Pastikan email tester sudah ditambahkan dengan benar
- Kirim ulang invitation dari console

---

**Happy Testing! 🚀**
