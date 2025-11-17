/**
 * Script untuk mengeset custom claims subscription untuk user
 * Jalankan dengan: node set-user-subscription.js
 */

const admin = require('firebase-admin');

// Initialize Firebase Admin (pastikan serviceAccountKey.json ada)
try {
  const serviceAccount = require('./serviceAccountKey.json');
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: "https://klimacek-default-rtdb.asia-southeast1.firebasedatabase.app"
  });
} catch (error) {
  console.error('Error initializing Firebase Admin:', error.message);
  console.log('\nCara menggunakan script ini:');
  console.log('1. Download serviceAccountKey.json dari Firebase Console');
  console.log('2. Simpan di root folder project');
  console.log('3. Jalankan: node set-user-subscription.js');
  process.exit(1);
}

// Email user yang akan diset
const userEmail = 'mazkabuana@student.uns.ac.id';

// Subscription data
const subscriptionData = {
  plan: 'free_trial',  // 'free_trial', 'basic', 'premium', atau 'enterprise'
  trial_expires_at: Date.now() + (30 * 24 * 60 * 60 * 1000), // 30 hari dari sekarang
  created_at: Date.now()
};

async function setUserSubscription() {
  try {
    // Get user by email
    console.log(`\nMencari user dengan email: ${userEmail}...`);
    const user = await admin.auth().getUserByEmail(userEmail);
    console.log(`✓ User ditemukan: ${user.uid}`);

    // Set custom claims
    console.log('\nMengeset custom claims subscription...');
    await admin.auth().setCustomUserClaims(user.uid, {
      subscription: subscriptionData
    });

    console.log('✓ Custom claims berhasil diset!');
    console.log('\nData subscription:');
    console.log('  Plan:', subscriptionData.plan);
    console.log('  Expires:', new Date(subscriptionData.trial_expires_at).toLocaleString('id-ID'));
    console.log('  Created:', new Date(subscriptionData.created_at).toLocaleString('id-ID'));

    // Verify
    const updatedUser = await admin.auth().getUser(user.uid);
    console.log('\nVerifikasi custom claims:');
    console.log(JSON.stringify(updatedUser.customClaims, null, 2));

    console.log('\n✓ Selesai! User harus logout dan login ulang untuk melihat perubahan.');
    console.log('  Atau refresh token dengan: user.getIdToken(true)');

  } catch (error) {
    console.error('\n✗ Error:', error.message);

    if (error.code === 'auth/user-not-found') {
      console.log('\nUser belum terdaftar. Silakan signup terlebih dahulu di aplikasi.');
    }
  }

  process.exit(0);
}

// Run the script
setUserSubscription();
