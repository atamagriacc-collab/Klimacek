# Google Play Store Publication Checklist

## Pre-Release Checklist

### 1. Configuration Updates
- [x] Remove hardcoded API URLs (now using BuildConfig)
- [x] Disable cleartext traffic for production
- [x] Enable ProGuard/R8 code optimization
- [x] Configure proper build types (debug vs release)
- [ ] Update `versionCode` in build.gradle before each release
- [ ] Update `versionName` in build.gradle (e.g., "1.0.0" → "1.0.1")

### 2. API Configuration
- [ ] Replace "https://api.klimacek.com" with your ACTUAL production API URL
  - Location: `app/build.gradle` line 19 and 54
- [ ] Ensure production API is HTTPS (not HTTP)
- [ ] Test API endpoints are accessible from external network
- [ ] Verify API authentication/authorization if required

### 3. App Signing
- [ ] Generate release keystore (see RELEASE_SIGNING_GUIDE.md)
- [ ] Configure signing in build.gradle
- [ ] Store keystore and passwords securely
- [ ] Verify keystore is NOT committed to git
- [ ] Test signing: `./gradlew assembleRelease`

### 4. Testing Requirements
- [ ] Test on physical devices (not just emulator)
- [ ] Test on different Android versions (API 24 to latest)
- [ ] Test on different screen sizes (phone, tablet)
- [ ] Test with production API endpoint
- [ ] Verify all features work without crashes
- [ ] Test network connectivity edge cases (no internet, slow connection)
- [ ] Test location permissions flow

### 5. Code Quality
- [x] Remove debug logging (ProGuard removes in release)
- [ ] Remove test/dummy code
- [ ] Review all TODOs in code
- [ ] Run lint checks: `./gradlew lint`
- [ ] Fix critical lint warnings
- [ ] Test release build thoroughly

## Play Console Setup

### 1. Create Play Console Account
- [ ] Register at [play.google.com/console](https://play.google.com/console)
- [ ] Pay one-time $25 registration fee
- [ ] Complete developer profile

### 2. Create App Listing
- [ ] App name: Choose your app name (max 50 characters)
- [ ] Default language
- [ ] App or Game: Select "App"
- [ ] Free or Paid: Select pricing model

### 3. Store Listing Assets

#### Required Graphics
- [ ] App icon: 512x512 PNG (32-bit with alpha)
- [ ] Feature graphic: 1024x500 JPG or PNG
- [ ] Screenshots: Minimum 2, recommended 8
  - Phone: 16:9 or 9:16 aspect ratio
  - Recommended: 1080x1920 or 1080x2340
  - 7-inch tablet (optional): 1536x2048
  - 10-inch tablet (optional): 2048x1536

#### Store Listing Text
- [ ] Short description (max 80 characters)
- [ ] Full description (max 4000 characters)
- [ ] App category (e.g., Productivity, Tools, Weather)
- [ ] Tags (optional, help with discovery)

#### Contact Details
- [ ] Website (optional but recommended)
- [ ] Email (required for support)
- [ ] Phone number (optional)
- [ ] Privacy policy URL (REQUIRED - see below)

### 4. Privacy Policy (REQUIRED)
Your app requests location permissions, so you MUST provide a privacy policy.

Create a privacy policy that includes:
- What data you collect (location, device info, etc.)
- How you use the data
- How long you store the data
- User rights (access, deletion, etc.)
- Contact information

Host it on:
- Your website
- GitHub Pages
- Privacy policy generators (e.g., termly.io, freeprivacypolicy.com)

### 5. Content Rating
- [ ] Complete content rating questionnaire
- [ ] Answer questions honestly
- [ ] Review and confirm rating (usually Everyone or Teen)

### 6. Data Safety Form (NEW REQUIREMENT)
Declare what data your app collects:

Location Data:
- [ ] Approximate location (ACCESS_COARSE_LOCATION)
- [ ] Precise location (ACCESS_FINE_LOCATION)
- Purpose: Explain why (e.g., "Show local weather data")

Device or Other IDs:
- [ ] Check if you collect device IDs or advertising IDs

For each data type, specify:
- Is it collected or shared?
- Is it required or optional?
- Is it encrypted in transit?
- Can users request deletion?

### 7. Target Audience
- [ ] Select target age groups
- [ ] If including children: Additional requirements apply

### 8. App Access
- [ ] Provide test credentials if app requires login
- [ ] List any special access instructions

## Release Configuration

### 1. Build Release APK/AAB
```bash
# Clean build
./gradlew clean

# Build release bundle (RECOMMENDED for Play Store)
./gradlew bundleRelease

# OR build release APK
./gradlew assembleRelease
```

Output locations:
- AAB: `app/build/outputs/bundle/release/app-release.aab`
- APK: `app/build/outputs/apk/release/app-release.apk`

### 2. Upload to Play Console
- [ ] Go to Release → Production → Create new release
- [ ] Upload AAB file (recommended) or APK
- [ ] Add release notes
  - What's new in this version
  - Bug fixes
  - New features

### 3. App Signing
Choose one option:

**Option A: Google Play App Signing (RECOMMENDED)**
- [ ] Opt-in to Play App Signing on first release
- [ ] Google manages your app signing key
- [ ] Can reset upload key if lost

**Option B: Manage Your Own Signing Key**
- [ ] Upload APK signed with your keystore
- [ ] Must use same keystore for ALL future updates
- [ ] Cannot recover if lost

### 4. Release Tracks

**Internal Testing**
- Up to 100 testers
- Changes available in minutes
- Use for quick testing

**Closed Testing**
- Invite testers via email list or Google Group
- Good for beta testing
- Recommended before production

**Open Testing**
- Anyone can join as tester
- Good for larger beta
- Can set user limit

**Production**
- Available to all users
- Recommended to test via internal/closed first

## Pre-Launch Checklist

### Before Submitting for Review
- [ ] All store listing sections complete (green checkmarks)
- [ ] Content rating completed
- [ ] Data safety form completed
- [ ] Privacy policy URL added
- [ ] App signed and uploaded
- [ ] Release notes written
- [ ] Pricing & distribution countries selected
- [ ] All required graphics uploaded
- [ ] Test the uploaded APK/AAB via internal testing

### Review Process
- [ ] Submit for review
- [ ] Wait for Google review (typically 1-7 days)
- [ ] Respond to any review feedback
- [ ] App approved and published!

## Post-Publication

### Monitor Your App
- [ ] Check crash reports in Play Console
- [ ] Monitor user reviews and ratings
- [ ] Respond to user feedback
- [ ] Track install metrics

### Update Process
1. Update versionCode and versionName in build.gradle
2. Make your changes
3. Test thoroughly
4. Build release AAB/APK
5. Upload to Play Console
6. Add release notes
7. Submit for review

## Important Notes

### Common Rejection Reasons
1. Missing or invalid privacy policy
2. Incomplete data safety section
3. App crashes during testing
4. Misleading app description or screenshots
5. Copyright/trademark violations
6. Inappropriate content

### API URL Configuration
**IMPORTANT:** Before building release, update production API URL in `app/build.gradle`:
```gradle
// Line 54 - Update this to your actual API URL
buildConfigField "String", "API_BASE_URL", "\"https://api.klimacek.com\""
```

### Testing Before Release
1. Install release APK on physical device: `adb install app-release.apk`
2. Verify it connects to production API
3. Test all features work correctly
4. Check for crashes or errors

### Version Management
- versionCode: Integer that MUST increase with each release (1, 2, 3...)
- versionName: Display version for users (1.0.0, 1.0.1, 1.1.0, 2.0.0...)

### Resources
- [Play Console Help](https://support.google.com/googleplay/android-developer)
- [Launch Checklist](https://developer.android.com/distribute/best-practices/launch/launch-checklist)
- [App Quality Guidelines](https://developer.android.com/quality)
- [Privacy Policy Guide](https://support.google.com/googleplay/android-developer/answer/9859455)

## Quick Command Reference

```bash
# Clean project
./gradlew clean

# Run tests
./gradlew test

# Run lint checks
./gradlew lint

# Build debug APK
./gradlew assembleDebug

# Build release APK
./gradlew assembleRelease

# Build release AAB (for Play Store)
./gradlew bundleRelease

# Install debug APK
adb install app/build/outputs/apk/debug/app-debug.apk

# Install release APK
adb install app/build/outputs/apk/release/app-release.apk

# View connected devices
adb devices

# Check logcat
adb logcat | grep Klimacek
```
