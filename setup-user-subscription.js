/**
 * Helper script untuk mengeset subscription user via Cloud Function
 * Jalankan dengan: node setup-user-subscription.js
 */

const https = require('https');

// KONFIGURASI - Ganti dengan URL Cloud Function Anda
const CLOUD_FUNCTION_URL = 'https://asia-southeast1-atamagri-cc5c1.cloudfunctions.net/setUserSubscription';

// Data user yang akan diset
const userData = {
  email: 'mazkabuana@student.uns.ac.id',  // Email user
  plan: 'free_trial',                      // Plan: 'free_trial', 'basic', 'premium', 'enterprise'
  durationDays: 30                         // Durasi dalam hari
};

console.log('=== Setup User Subscription ===\n');
console.log('Mengirim request ke Cloud Function...');
console.log('Email:', userData.email);
console.log('Plan:', userData.plan);
console.log('Duration:', userData.durationDays, 'hari\n');

// Parse URL
const url = new URL(CLOUD_FUNCTION_URL);
const postData = JSON.stringify(userData);

const options = {
  hostname: url.hostname,
  path: url.pathname,
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'Content-Length': Buffer.byteLength(postData)
  }
};

const req = https.request(options, (res) => {
  let data = '';

  res.on('data', (chunk) => {
    data += chunk;
  });

  res.on('end', () => {
    console.log('Response Status:', res.statusCode);
    console.log('Response:');

    try {
      const response = JSON.parse(data);
      console.log(JSON.stringify(response, null, 2));

      if (response.success) {
        console.log('\n✓ Subscription berhasil diset!');
        console.log('\nInstruksi untuk user:');
        console.log('1. Logout dari aplikasi');
        console.log('2. Login kembali');
        console.log('3. Badge subscription akan muncul di navbar');
        console.log('\nAtau refresh token tanpa logout:');
        console.log('- Buka browser console (F12)');
        console.log('- Jalankan: await firebase.auth().currentUser.getIdToken(true)');
        console.log('- Refresh halaman');
      } else {
        console.log('\n✗ Gagal mengeset subscription');
        console.log('Error:', response.message);
      }
    } catch (error) {
      console.log('Raw response:', data);
    }
  });
});

req.on('error', (error) => {
  console.error('\n✗ Error:', error.message);
  console.log('\nTroubleshooting:');
  console.log('1. Pastikan Cloud Function sudah di-deploy');
  console.log('2. Pastikan URL Cloud Function sudah benar');
  console.log('3. Periksa Firebase Console untuk error logs');
});

req.write(postData);
req.end();
