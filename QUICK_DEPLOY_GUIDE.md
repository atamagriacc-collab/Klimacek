# 🚀 Quick Deploy - APK Download Setup

## ✅ Status: READY TO DEPLOY!

**APK File:** `klimacek-v1.0.1.apk` (11.8 MB)
**Location:** `D:\Kerja\Klimacek\klimacek-v1.0.1.apk`
**Tested:** ✅ Fully functional dengan Firebase Auth

---

## 📤 Step 1: Upload APK (5 menit)

### Upload ke Server klimacek.com:

```bash
# Via SCP/SFTP
scp D:\Kerja\Klimacek\klimacek-v1.0.1.apk user@klimacek.com:/var/www/html/downloads/

# Or via FTP client (FileZilla, WinSCP, etc.)
# Local: D:\Kerja\Klimacek\klimacek-v1.0.1.apk
# Remote: /public_html/downloads/klimacek-v1.0.1.apk
```

### Via cPanel:
1. Login ke cPanel
2. File Manager
3. Navigate to `public_html`
4. Create folder `downloads` (jika belum ada)
5. Upload `klimacek-v1.0.1.apk`

### Verify Upload:
```
https://www.klimacek.com/downloads/klimacek-v1.0.1.apk
```

Buka URL di browser, should auto-download!

---

## 💻 Step 2: Update Website Code (10 menit)

### Find Download Button in Code:

Lokasi file kemungkinan (Next.js/React):
- `pages/index.tsx`
- `app/page.tsx`
- `components/Home.tsx` atau `components/MobileApp.tsx`

### Current Code (yang ada sekarang):
```jsx
<button>Download</button>
```

### NEW Code (replace dengan ini):

```jsx
<a
  href="/downloads/klimacek-v1.0.1.apk"
  download="KlimacekApp-v1.0.1.apk"
  onClick={() => {
    // Track download dengan Google Analytics (optional)
    if (typeof gtag !== 'undefined') {
      gtag('event', 'download', {
        event_category: 'APK',
        event_label: 'KlimacekApp v1.0.1'
      });
    }
  }}
  className="inline-flex items-center gap-2 px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors shadow-lg"
>
  <svg
    className="w-5 h-5"
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
    />
  </svg>
  Download
  <span className="text-sm opacity-90">(11.8 MB)</span>
</a>
```

### Add Version Info (below button):

```jsx
<div className="mt-3 text-sm text-gray-600">
  <p>✓ Version 1.0.1 (Latest)</p>
  <p>✓ Android 7.0+</p>
  <p>✓ Free - No ads</p>
</div>
```

---

## 🔥 COMPLETE SECTION CODE (Copy-Paste Ready!)

Replace entire "Klimacek Mobile App" section dengan code ini:

```jsx
<section className="py-16 bg-gradient-to-br from-green-50 to-blue-50">
  <div className="container mx-auto px-4">
    <div className="grid md:grid-cols-2 gap-12 items-center">

      {/* Left: Image */}
      <div className="order-2 md:order-1">
        <div className="relative">
          <img
            src="/images/klimacek-mobile-mockup.png"
            alt="Klimacek Mobile App"
            className="w-full max-w-md mx-auto drop-shadow-2xl"
          />
          {/* Badge */}
          <div className="absolute top-4 right-4 bg-green-600 text-white px-4 py-2 rounded-full text-sm font-semibold">
            NEW
          </div>
        </div>
      </div>

      {/* Right: Content */}
      <div className="order-1 md:order-2">
        <div className="mb-6">
          <span className="inline-block px-4 py-1 bg-green-100 text-green-800 rounded-full text-sm font-semibold mb-4">
            Mobile App
          </span>
          <h2 className="text-4xl font-bold mb-4 bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent">
            Klimacek Mobile App
          </h2>
          <p className="text-lg text-gray-700 leading-relaxed">
            Mengakses aplikasi yang digunakan untuk memonitoring hasil dari stasiun cuaca
            Climagrid berupa kelembapan, sejarah kelembapan, intensitas cahaya, curah hujan,
            kecepatan angin, arus panel surya, tegangan panel surya, dan watt panel surya
            untuk menghitung potensi sinar matahari.
          </p>
        </div>

        {/* Features List */}
        <div className="space-y-3 mb-8">
          {[
            'Real-time sensor monitoring',
            'Interactive charts & analytics',
            'Weather data history',
            'Solar panel monitoring',
            'User authentication & sync'
          ].map((feature, index) => (
            <div key={index} className="flex items-center gap-3">
              <svg className="w-6 h-6 text-green-600 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              <span className="text-gray-700">{feature}</span>
            </div>
          ))}
        </div>

        {/* Download Button */}
        <div className="space-y-4">
          <a
            href="/downloads/klimacek-v1.0.1.apk"
            download="KlimacekApp-v1.0.1.apk"
            onClick={() => {
              if (typeof gtag !== 'undefined') {
                gtag('event', 'download', {
                  event_category: 'APK',
                  event_label: 'KlimacekApp v1.0.1'
                });
              }
            }}
            className="inline-flex items-center gap-3 px-8 py-4 bg-green-600 text-white text-lg font-semibold rounded-lg hover:bg-green-700 transition-all shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
            </svg>
            Download APK
            <span className="text-sm opacity-90 ml-2">(11.8 MB)</span>
          </a>

          {/* App Info */}
          <div className="flex flex-wrap gap-4 text-sm text-gray-600">
            <div className="flex items-center gap-1">
              <svg className="w-4 h-4 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              Version 1.0.1
            </div>
            <div className="flex items-center gap-1">
              <svg className="w-4 h-4 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              Android 7.0+
            </div>
            <div className="flex items-center gap-1">
              <svg className="w-4 h-4 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              Free - No ads
            </div>
          </div>

          {/* How to Install Link */}
          <a
            href="#install-instructions"
            className="text-green-600 hover:text-green-700 text-sm font-medium inline-flex items-center gap-1"
          >
            How to install?
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </a>
        </div>
      </div>

    </div>
  </div>
</section>

{/* Installation Instructions */}
<section id="install-instructions" className="py-12 bg-white">
  <div className="container mx-auto px-4 max-w-4xl">
    <h3 className="text-2xl font-bold mb-8 text-center">How to Install</h3>

    <div className="grid md:grid-cols-4 gap-6">
      {[
        {
          step: 1,
          title: 'Download',
          desc: 'Click download button above'
        },
        {
          step: 2,
          title: 'Enable',
          desc: 'Allow "Unknown Sources" in Settings'
        },
        {
          step: 3,
          title: 'Install',
          desc: 'Open APK and click Install'
        },
        {
          step: 4,
          title: 'Enjoy',
          desc: 'Open app and start monitoring!'
        }
      ].map((item) => (
        <div key={item.step} className="text-center">
          <div className="w-12 h-12 bg-green-600 text-white rounded-full flex items-center justify-center font-bold text-xl mx-auto mb-3">
            {item.step}
          </div>
          <h4 className="font-semibold mb-2">{item.title}</h4>
          <p className="text-sm text-gray-600">{item.desc}</p>
        </div>
      ))}
    </div>
  </div>
</section>
```

---

## 📦 Step 3: Deploy Website (5 menit)

### If using Git/GitHub:

```bash
# Commit changes
git add .
git commit -m "Add APK download link for KlimacekApp v1.0.1"
git push origin main

# If using Vercel/Netlify, it will auto-deploy
```

### If using manual FTP:

1. Upload updated files to server
2. Clear cache if needed
3. Test the website

---

## ✅ Verification Checklist

After deployment, test:

- [ ] Open https://www.klimacek.com
- [ ] Scroll to "Klimacek Mobile App" section
- [ ] Click "Download" button
- [ ] APK should download automatically
- [ ] File name: `KlimacekApp-v1.0.1.apk`
- [ ] File size: ~11.8 MB
- [ ] Test on mobile device
- [ ] Install APK and verify it works

---

## 🎯 What Users Will Experience:

1. **Visit** klimacek.com
2. **Scroll** to Mobile App section
3. **Click** Download button
4. **APK downloads** automatically
5. **Open** downloaded file
6. **Enable** Unknown Sources (if needed)
7. **Install** app
8. **Open** KlimacekApp
9. **Sign Up** or Login
10. **Start monitoring!**

---

## 📊 Optional: Add Download Counter

Create API endpoint to track downloads:

```js
// pages/api/download-count.js
let downloadCount = 0;

export default function handler(req, res) {
  if (req.method === 'POST') {
    downloadCount++;
    return res.json({ count: downloadCount });
  }
  return res.json({ count: downloadCount });
}
```

Then call from button:

```jsx
onClick={() => {
  fetch('/api/download-count', { method: 'POST' });
}}
```

Display count:

```jsx
<p className="text-sm text-gray-600">
  Downloaded {downloadCount} times
</p>
```

---

## 🔄 For Future Updates:

When releasing v1.0.2:

1. Build new APK
2. Rename to `klimacek-v1.0.2.apk`
3. Upload to `/downloads/`
4. Update link in website
5. Update version numbers
6. Push changes

---

## 📞 Support

**File Locations:**
- APK: `D:\Kerja\Klimacek\klimacek-v1.0.1.apk`
- Docs: `D:\Kerja\Klimacek\WEBSITE_DOWNLOAD_SETUP.md`

**Download URL:**
```
https://www.klimacek.com/downloads/klimacek-v1.0.1.apk
```

---

## 🎉 Summary

**APK:** ✅ Ready
**Docs:** ✅ Complete
**Code:** ✅ Copy-paste ready

**Next Actions:**
1. Upload APK ke server (5 min)
2. Update website code (10 min)
3. Test download (2 min)
4. **LIVE!** 🚀

**Total Time:** ~20 minutes to go live!
