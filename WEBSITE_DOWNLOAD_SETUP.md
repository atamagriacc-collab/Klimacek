# 📱 Setup APK Download di Website Klimacek.com

## ✅ APK Ready untuk Download

**File:** `klimacek-v1.0.1.apk`
**Size:** ~11.8 MB
**Version:** 1.0.1
**Package:** com.klimacek.app.debug
**Tested:** ✅ Fully functional

---

## 📤 Step 1: Upload APK ke Server

### A. Via FTP/SFTP

```bash
# Upload ke folder public_html/downloads atau public/downloads
scp klimacek-v1.0.1.apk user@klimacek.com:/path/to/public/downloads/

# Atau via FTP client (FileZilla, WinSCP, dll)
# Upload ke: /public_html/downloads/klimacek-v1.0.1.apk
```

### B. Via cPanel/Hosting Panel

1. Login ke cPanel
2. Navigate ke File Manager
3. Buat folder `downloads` di public_html
4. Upload `klimacek-v1.0.1.apk`
5. Verify: https://www.klimacek.com/downloads/klimacek-v1.0.1.apk

---

## 🔗 Step 2: Update Website Download Link

### File yang Perlu Diedit:

Cari file HTML/React component yang mengandung button "Download" di section "Klimacek Mobile App".

**Lokasi kemungkinan:**
- `pages/index.tsx` atau `pages/index.html`
- `components/MobileAppSection.tsx`
- `app/page.tsx` (jika Next.js App Router)

### Update Link Download:

**BEFORE:**
```jsx
<button>Download</button>
```

**AFTER:**
```jsx
<a
  href="/downloads/klimacek-v1.0.1.apk"
  download="KlimacekApp-v1.0.1.apk"
  className="download-button"
>
  <svg>...</svg>
  Download APK (11.8 MB)
</a>
```

---

## 💻 Complete Code Update

### Option A: Direct Download Link (Recommended)

```jsx
// Di section "Klimacek Mobile App"
<div className="download-section">
  <a
    href="/downloads/klimacek-v1.0.1.apk"
    download="KlimacekApp-v1.0.1.apk"
    className="inline-flex items-center gap-2 px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
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
    Download APK
    <span className="text-sm opacity-90">(11.8 MB)</span>
  </a>

  <p className="mt-2 text-sm text-gray-600">
    Android 7.0 or higher required
  </p>
</div>
```

### Option B: With Analytics Tracking

```jsx
<a
  href="/downloads/klimacek-v1.0.1.apk"
  download="KlimacekApp-v1.0.1.apk"
  onClick={() => {
    // Track download with Google Analytics
    if (typeof gtag !== 'undefined') {
      gtag('event', 'download', {
        'event_category': 'APK',
        'event_label': 'KlimacekApp v1.0.1',
        'value': 1
      });
    }
  }}
  className="download-button"
>
  Download APK (11.8 MB)
</a>
```

### Option C: With Download Instructions Modal

```jsx
import { useState } from 'react';

export default function DownloadButton() {
  const [showInstructions, setShowInstructions] = useState(false);

  return (
    <>
      <a
        href="/downloads/klimacek-v1.0.1.apk"
        download="KlimacekApp-v1.0.1.apk"
        onClick={(e) => {
          // Show instructions first (optional)
          // e.preventDefault();
          // setShowInstructions(true);

          // Or just track download
          gtag?.('event', 'download', { label: 'KlimacekApp' });
        }}
        className="download-button"
      >
        Download APK (11.8 MB)
      </a>

      {showInstructions && (
        <Modal onClose={() => setShowInstructions(false)}>
          <h3>How to Install</h3>
          <ol>
            <li>Download will start automatically</li>
            <li>Open the downloaded APK file</li>
            <li>Allow "Install from Unknown Sources" if prompted</li>
            <li>Click Install</li>
            <li>Open KlimacekApp and enjoy!</li>
          </ol>
          <a
            href="/downloads/klimacek-v1.0.1.apk"
            download
            className="btn-primary"
          >
            Download Now
          </a>
        </Modal>
      )}
    </>
  );
}
```

---

## 🎨 Enhanced Download Section (Full Example)

```jsx
<section className="mobile-app-section py-16 bg-gradient-to-br from-green-50 to-blue-50">
  <div className="container mx-auto px-4">
    <div className="grid md:grid-cols-2 gap-8 items-center">

      {/* Left: App Preview */}
      <div>
        <img
          src="/images/klimacek-mobile-mockup.png"
          alt="Klimacek Mobile App"
          className="w-full max-w-md mx-auto"
        />
      </div>

      {/* Right: Download Info */}
      <div>
        <h2 className="text-3xl font-bold mb-4">
          Klimacek Mobile App
        </h2>

        <p className="text-gray-700 mb-6">
          Monitoring hasil dari stasiun cuaca Climagrid berupa kelembapan,
          intensitas cahaya, curah hujan, kecepatan angin, dan data panel surya
          untuk menghitung potensi sinar matahari.
        </p>

        {/* Features */}
        <div className="space-y-3 mb-8">
          <div className="flex items-center gap-2">
            <svg className="w-5 h-5 text-green-600" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
            </svg>
            <span>Real-time sensor monitoring</span>
          </div>
          <div className="flex items-center gap-2">
            <svg className="w-5 h-5 text-green-600" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
            </svg>
            <span>Interactive charts & analytics</span>
          </div>
          <div className="flex items-center gap-2">
            <svg className="w-5 h-5 text-green-600" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
            </svg>
            <span>User authentication & sync</span>
          </div>
        </div>

        {/* Download Button */}
        <div className="space-y-4">
          <a
            href="/downloads/klimacek-v1.0.1.apk"
            download="KlimacekApp-v1.0.1.apk"
            className="inline-flex items-center gap-3 px-8 py-4 bg-green-600 text-white text-lg font-semibold rounded-lg hover:bg-green-700 transition-all shadow-lg hover:shadow-xl"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
            </svg>
            Download APK
            <span className="text-sm opacity-90">(11.8 MB)</span>
          </a>

          {/* Requirements */}
          <div className="text-sm text-gray-600">
            <p>✓ Android 7.0 or higher</p>
            <p>✓ Version 1.0.1 (Latest)</p>
            <p>✓ Free - No ads</p>
          </div>
        </div>

        {/* QR Code (Optional) */}
        <div className="mt-6 p-4 bg-white rounded-lg border inline-block">
          <p className="text-sm mb-2">Scan to download:</p>
          <img
            src="/qr-code-download.png"
            alt="QR Code"
            className="w-32 h-32"
          />
        </div>
      </div>

    </div>
  </div>
</section>
```

---

## 📱 Create Installation Instructions Page

Create file: `pages/install.tsx` or `install.html`

```jsx
export default function InstallPage() {
  return (
    <div className="container mx-auto px-4 py-12 max-w-3xl">
      <h1 className="text-3xl font-bold mb-6">
        How to Install KlimacekApp
      </h1>

      <div className="space-y-6">
        {/* Step 1 */}
        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-xl font-semibold mb-3 flex items-center gap-2">
            <span className="bg-green-600 text-white w-8 h-8 rounded-full flex items-center justify-center">1</span>
            Download APK
          </h2>
          <p className="text-gray-700 mb-3">
            Click the download button above or use the link below:
          </p>
          <a
            href="/downloads/klimacek-v1.0.1.apk"
            download
            className="btn-primary"
          >
            Download KlimacekApp v1.0.1
          </a>
        </div>

        {/* Step 2 */}
        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-xl font-semibold mb-3 flex items-center gap-2">
            <span className="bg-green-600 text-white w-8 h-8 rounded-full flex items-center justify-center">2</span>
            Enable Unknown Sources
          </h2>
          <p className="text-gray-700">
            Go to Settings → Security → Enable "Install from Unknown Sources"
          </p>
          <img
            src="/images/enable-unknown-sources.png"
            alt="Enable Unknown Sources"
            className="mt-3 rounded border"
          />
        </div>

        {/* Step 3 */}
        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-xl font-semibold mb-3 flex items-center gap-2">
            <span className="bg-green-600 text-white w-8 h-8 rounded-full flex items-center justify-center">3</span>
            Install APK
          </h2>
          <p className="text-gray-700">
            Open the downloaded file and click "Install"
          </p>
        </div>

        {/* Step 4 */}
        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-xl font-semibold mb-3 flex items-center gap-2">
            <span className="bg-green-600 text-white w-8 h-8 rounded-full flex items-center justify-center">4</span>
            Open & Enjoy!
          </h2>
          <p className="text-gray-700">
            Launch KlimacekApp, sign up or login, and start monitoring!
          </p>
        </div>
      </div>

      {/* Troubleshooting */}
      <div className="mt-12 bg-yellow-50 p-6 rounded-lg">
        <h3 className="text-lg font-semibold mb-3">Troubleshooting</h3>
        <ul className="space-y-2 text-gray-700">
          <li>• <strong>Can't install?</strong> Make sure "Unknown Sources" is enabled</li>
          <li>• <strong>App crashes?</strong> Check internet connection and try reinstalling</li>
          <li>• <strong>Need help?</strong> Contact us at klimacekacc@gmail.com</li>
        </ul>
      </div>
    </div>
  );
}
```

---

## 🔄 Update Strategy

### When releasing updates:

1. **Build new APK**
   ```bash
   cd KlimacekApp
   gradlew.bat assembleDebug
   ```

2. **Rename with version**
   ```bash
   copy app-debug.apk klimacek-v1.0.2.apk
   ```

3. **Upload to server**
   ```bash
   scp klimacek-v1.0.2.apk user@klimacek.com:/public/downloads/
   ```

4. **Update website link**
   ```jsx
   href="/downloads/klimacek-v1.0.2.apk"
   ```

5. **Keep old versions** (optional)
   - For users who want previous version
   - Or redirect old links to new version

---

## 📊 Track Downloads (Optional)

### Add to Google Analytics:

```jsx
// When download button clicked
gtag('event', 'download', {
  'event_category': 'APK',
  'event_label': 'KlimacekApp v1.0.1',
  'value': 1
});
```

### Or use custom tracking:

```jsx
const trackDownload = async () => {
  await fetch('/api/track-download', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      app: 'klimacek',
      version: '1.0.1',
      timestamp: new Date().toISOString()
    })
  });
};
```

---

## ✅ Deployment Checklist

- [ ] APK uploaded to `/public/downloads/` folder
- [ ] Verify download link works: https://www.klimacek.com/downloads/klimacek-v1.0.1.apk
- [ ] Update download button on homepage
- [ ] Test download on mobile device
- [ ] Test download on desktop
- [ ] Add Google Analytics tracking (optional)
- [ ] Create installation instructions page (optional)
- [ ] Generate QR code for download (optional)
- [ ] Update app version in website metadata

---

## 🎯 Final URL Structure

```
Website Root
├── downloads/
│   ├── klimacek-v1.0.1.apk  (current)
│   └── klimacek-v1.0.0.apk  (old - optional)
├── install.html              (installation guide)
└── index.html               (homepage with download button)
```

**Download URL:**
```
https://www.klimacek.com/downloads/klimacek-v1.0.1.apk
```

---

## 📞 Need Help?

File locations:
- **APK File:** `D:\Kerja\Klimacek\klimacek-v1.0.1.apk`
- **Original:** `D:\Kerja\Klimacek\KlimacekApp\app\build\outputs\apk\debug\app-debug.apk`

**Next step:** Upload APK ke server klimacek.com dan update download link!

**Ready to deploy! 🚀**
