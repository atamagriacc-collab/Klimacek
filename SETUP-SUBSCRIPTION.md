# Setup User Subscription - Panduan Lengkap

Badge subscription plan tidak muncul di navbar? Ikuti langkah-langkah berikut:

## 🔍 Masalah

User yang mendaftar **sebelum** Firebase Cloud Function `onUserCreate` dibuat tidak memiliki custom claims subscription, sehingga badge tidak muncul.

## ✅ Solusi

### Opsi 1: Deploy Cloud Function & Run Script (Recommended)

#### Step 1: Deploy Firebase Functions

```bash
cd functions
npm install
firebase deploy --only functions
```

Tunggu hingga selesai. Anda akan mendapat URL seperti:
```
✔ functions[setUserSubscription(asia-southeast1)]: https://asia-southeast1-atamagri-cc5c1.cloudfunctions.net/setUserSubscription
```

#### Step 2: Jalankan Setup Script

```bash
node setup-user-subscription.js
```

Output yang diharapkan:
```
=== Setup User Subscription ===

Mengirim request ke Cloud Function...
Email: mazkabuana@student.uns.ac.id
Plan: free_trial
Duration: 30 hari

Response Status: 200
Response:
{
  "success": true,
  "message": "Subscription set successfully",
  "data": {
    "uid": "abc123...",
    "email": "mazkabuana@student.uns.ac.id",
    "plan": "free_trial",
    "expires_at": "2025-12-17T...",
    "duration_days": 30
  }
}

✓ Subscription berhasil diset!
```

#### Step 3: Refresh Token

**Tanpa Logout:**
1. Buka Browser Console (F12)
2. Jalankan command:
   ```javascript
   await firebase.auth().currentUser.getIdToken(true)
   ```
3. Refresh halaman

**Atau Dengan Logout:**
1. Klik Logout
2. Login kembali
3. Badge akan muncul!

---

### Opsi 2: Manual via cURL/Postman

Jika tidak ingin menggunakan script, Anda bisa call Cloud Function langsung:

```bash
curl -X POST https://asia-southeast1-atamagri-cc5c1.cloudfunctions.net/setUserSubscription \
  -H "Content-Type: application/json" \
  -d '{
    "email": "mazkabuana@student.uns.ac.id",
    "plan": "free_trial",
    "durationDays": 30
  }'
```

---

### Opsi 3: Otomatis untuk User Baru

User **baru** yang mendaftar setelah Cloud Function di-deploy akan **otomatis** mendapat free trial 30 hari!

Function `onUserCreate` akan:
- Memberi plan: `free_trial`
- Durasi: 30 hari
- Set custom claims otomatis
- Simpan ke Realtime Database

---

## 📋 Plan Types

| Plan         | Badge Color | Description           |
|--------------|-------------|-----------------------|
| `free_trial` | Yellow      | Free Tier Plan 30 hari|
| `basic`      | Blue        | Basic Plan            |
| `premium`    | Purple      | Premium Plan          |
| `enterprise` | Indigo      | Enterprise Plan       |

---

## 🛠️ Troubleshooting

### Badge masih tidak muncul setelah setup

1. **Periksa Browser Console** (F12):
   ```
   [Articles] Fetching subscription for user: mazkabuana@student.uns.ac.id
   [Articles] Subscription info received: { plan: 'free_trial', ... }
   ```

2. **Jika log menunjukkan `{ plan: 'none' }`**:
   - Token belum di-refresh
   - Logout dan login ulang

3. **Jika badge "Loading..." terus menerus**:
   - Custom claims belum diset
   - Jalankan ulang setup script

4. **Jika error di console**:
   - Periksa Firebase Console → Functions → Logs
   - Pastikan Cloud Function berhasil di-deploy

### Cloud Function error

Jika ada error saat deploy:
```bash
# Install dependencies
cd functions
npm install cors firebase-admin firebase-functions

# Deploy ulang
firebase deploy --only functions:setUserSubscription,functions:onUserCreate
```

---

## 📝 File-file Terkait

| File                          | Deskripsi                                    |
|-------------------------------|----------------------------------------------|
| `functions/index.js`          | Cloud Functions (onUserCreate, setUserSubscription) |
| `lib/subscription-utils.ts`   | Utility functions untuk subscription         |
| `pages/articles.tsx`          | Navbar dengan badge subscription             |
| `setup-user-subscription.js`  | Helper script untuk setup subscription       |

---

## 🎯 Quick Start untuk User Baru

Untuk user yang **baru mendaftar**:

1. Deploy functions sekali:
   ```bash
   firebase deploy --only functions
   ```

2. Selesai! Setiap user baru otomatis dapat free trial 30 hari.

3. Badge langsung muncul setelah login pertama kali.

---

## 📞 Kontak

Jika masih ada masalah:
1. Periksa Firebase Console → Functions → Logs
2. Lihat Browser Console (F12) untuk error
3. Screenshot error dan laporkan ke developer
