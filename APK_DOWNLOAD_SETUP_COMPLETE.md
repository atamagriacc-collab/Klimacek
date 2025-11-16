# ✅ APK Download Setup - COMPLETE!

## 🎉 Changes Made

Your website is now ready to serve the KlimacekApp APK for direct download!

---

## 📝 What Was Updated

### 1. **Homepage Download Button** ([pages/index.tsx](pages/index.tsx))

**Before:**
```jsx
<button className="...">
  <span>Download</span>
</button>
```

**After:**
```jsx
<a
  href="/downloads/klimacek-v1.0.1.apk"
  download="KlimacekApp-v1.0.1.apk"
  onClick={() => {
    // Track download with Google Analytics (if available)
    if (typeof gtag !== 'undefined') {
      gtag('event', 'download', {
        event_category: 'APK',
        event_label: 'KlimacekApp v1.0.1'
      });
    }
  }}
  className="w-full bg-gray-900 text-white py-2.5 sm:py-3 px-4 sm:px-6 rounded-full font-medium hover:bg-gray-800 transition-colors flex items-center justify-center space-x-2 text-sm sm:text-base"
>
  <Download className="w-5 h-5" />
  <span>Download APK</span>
  <span className="text-xs opacity-75">(11.8 MB)</span>
</a>
```

**Features Added:**
- ✅ Download icon (from lucide-react)
- ✅ APK file size display (11.8 MB)
- ✅ Google Analytics tracking (if configured)
- ✅ Proper download attribute for auto-download
- ✅ Custom filename on download

### 2. **APK File Location**

**Created:** `public/downloads/klimacek-v1.0.1.apk`
- **Size:** 12 MB
- **Package:** com.klimacek.app.debug
- **Version:** 1.0.1 (Build 2)
- **Features:** Firebase Auth, Real-time sensor monitoring

### 3. **Git Configuration**

**Updated:** `.gitignore`
- Added `public/downloads/*.apk` to prevent large binary files from being committed

---

## 🧪 Testing Locally

### Option 1: Test on Development Server

```bash
cd D:\Kerja\Klimacek
npm run dev
```

Then open: http://localhost:3000

Click the "Download APK" button to test the download functionality.

### Option 2: Build and Preview Production

```bash
npm run build
npm start
```

---

## 🚀 Deployment Options

### Option A: Deploy to Vercel (Recommended)

**IMPORTANT NOTE:** Vercel has a file size limit of **100 MB per deployment** and the APK is 12 MB, so it will work fine.

```bash
# If you haven't installed Vercel CLI
npm install -g vercel

# Deploy
vercel
```

**After deployment:**
- Your APK will be available at: `https://yourdomain.com/downloads/klimacek-v1.0.1.apk`
- The download button will work automatically!

### Option B: Deploy to Netlify

**Note:** Netlify has similar file size limits (100 MB), so the APK will work.

1. Push changes to GitHub:
```bash
git add .
git commit -m "Add APK download functionality to homepage"
git push origin main
```

2. Netlify will auto-deploy (if connected)
3. Or manually drag & drop your build folder to Netlify

### Option C: Manual FTP/SFTP Upload

If deploying to your own server (klimacek.com):

1. **Build the website:**
```bash
npm run build
```

2. **Upload these files via FTP/cPanel:**
   - Upload entire `out/` or `.next/` folder (depending on your Next.js config)
   - **Important:** Ensure `public/downloads/klimacek-v1.0.1.apk` is uploaded
   - Location on server: `/public_html/downloads/klimacek-v1.0.1.apk`

3. **Verify access:**
   - Open: `https://www.klimacek.com/downloads/klimacek-v1.0.1.apk`
   - Should auto-download the APK

---

## ✅ Verification Checklist

After deployment, test these:

- [ ] Visit your homepage: https://www.klimacek.com
- [ ] Scroll to "Klimacek Mobile" section (right side card)
- [ ] Click "Download APK" button
- [ ] APK file downloads automatically
- [ ] Downloaded filename is: `KlimacekApp-v1.0.1.apk`
- [ ] File size is approximately 11.8-12 MB
- [ ] Open the APK on Android device
- [ ] Install and verify it works with Firebase Auth

---

## 📱 User Experience Flow

1. User visits **klimacek.com**
2. Sees the homepage with Mobile App card on the right
3. Clicks **"Download APK"** button
4. APK downloads automatically (11.8 MB)
5. User opens the downloaded file
6. Enables "Install from Unknown Sources" (if prompted)
7. Clicks Install
8. Opens KlimacekApp
9. Signs up or logs in with Firebase Auth
10. Starts monitoring weather data!

---

## 🔄 For Future Updates

When you release v1.0.2 or later:

### 1. Build New APK
```bash
cd KlimacekApp
gradlew.bat assembleDebug
# or
gradlew.bat assembleRelease
```

### 2. Copy New APK
```bash
cp KlimacekApp\app\build\outputs\apk\debug\app-debug.apk public\downloads\klimacek-v1.0.2.apk
```

### 3. Update Homepage
Edit `pages/index.tsx`:
```jsx
href="/downloads/klimacek-v1.0.2.apk"  // Update version
download="KlimacekApp-v1.0.2.apk"      // Update version
// Update file size if changed
<span className="text-xs opacity-75">(XX.X MB)</span>
```

### 4. Update Analytics Label
```jsx
event_label: 'KlimacekApp v1.0.2'  // Update version
```

### 5. Deploy
```bash
git add .
git commit -m "Update to KlimacekApp v1.0.2"
git push origin main
# or
vercel --prod
```

---

## 📊 Analytics Tracking (Optional)

The download button includes Google Analytics tracking. To enable it:

### 1. Add Google Analytics to Your Site

Edit `pages/_app.tsx` or `app/layout.tsx`:

```jsx
import Script from 'next/script'

export default function App({ Component, pageProps }) {
  return (
    <>
      {/* Google Analytics */}
      <Script
        src="https://www.googletagmanager.com/gtag/js?id=G-XXXXXXXXXX"
        strategy="afterInteractive"
      />
      <Script id="google-analytics" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', 'G-XXXXXXXXXX');
        `}
      </Script>

      <Component {...pageProps} />
    </>
  )
}
```

### 2. View Download Stats

Go to Google Analytics → Events → download
- Category: APK
- Label: KlimacekApp v1.0.1

---

## 🐛 Troubleshooting

### Issue: Download button doesn't work

**Check:**
- APK file exists at `public/downloads/klimacek-v1.0.1.apk`
- File permissions are readable
- Next.js is serving static files correctly

**Fix:**
```bash
ls -lh public/downloads/klimacek-v1.0.1.apk
```

### Issue: 404 error when downloading

**Vercel/Netlify:** Make sure `public/` folder is included in deployment
**Manual server:** Upload APK to correct path: `/public_html/downloads/`

### Issue: File downloads with wrong name

**Browser behavior:** Some browsers may rename the file. The `download` attribute should handle this, but it depends on browser settings.

### Issue: Can't install APK on Android

**Solution:** Enable "Install from Unknown Sources" in Android Settings:
- Settings → Security → Unknown Sources (Android 7)
- Settings → Apps → Special Access → Install Unknown Apps (Android 8+)

---

## 📁 File Locations

**Local Development:**
- Website code: `D:\Kerja\Klimacek\`
- APK source: `D:\Kerja\Klimacek\klimacek-v1.0.1.apk`
- APK public: `D:\Kerja\Klimacek\public\downloads\klimacek-v1.0.1.apk`
- Homepage: `D:\Kerja\Klimacek\pages\index.tsx`

**Production Server:**
- APK URL: `https://www.klimacek.com/downloads/klimacek-v1.0.1.apk`
- Server path: `/public_html/downloads/klimacek-v1.0.1.apk`

---

## 🎯 Summary

✅ **Website updated:** Download button functional with analytics
✅ **APK ready:** klimacek-v1.0.1.apk (12 MB)
✅ **Location:** `public/downloads/` folder
✅ **Features:** Download icon, file size, analytics tracking
✅ **Git:** APK excluded from version control

**Next Steps:**
1. Test locally: `npm run dev`
2. Deploy to production: `vercel` or `git push`
3. Verify download works on live site
4. Share the link!

**Live URL (after deployment):**
```
https://www.klimacek.com/
```

**Direct APK Download (after deployment):**
```
https://www.klimacek.com/downloads/klimacek-v1.0.1.apk
```

---

**Need help with deployment?** Just ask! 🚀
