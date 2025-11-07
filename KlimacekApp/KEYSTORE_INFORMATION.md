# 🔐 KEYSTORE SECURITY INFORMATION - KEEP THIS SAFE!

## ⚠️ CRITICAL SECURITY NOTICE

**This file contains sensitive information about your app signing keystore. Keep it SECURE and PRIVATE!**

- ❌ **DO NOT share this file publicly**
- ❌ **DO NOT commit this to public repositories**
- ❌ **DO NOT email without encryption**
- ✅ **BACKUP this file securely** (encrypted cloud storage, password manager)
- ✅ **Store keystore file safely** (multiple secure backups)

**If you lose this keystore or passwords, you CANNOT update your app on Play Store!**

---

## 🔑 Keystore Details

### Keystore File Location
```
D:\Kerja\Klimacek\KlimacekApp\keystore\klimacek-release.jks
```

### Keystore Information
- **Keystore Password**: `klimacek2024`
- **Key Alias**: `klimacek-release`
- **Key Password**: `klimacek2024`
- **Key Algorithm**: RSA
- **Key Size**: 2048 bits
- **Validity**: 10,000 days (~27 years)
- **Created**: November 1, 2025

### Certificate Distinguished Name (DN)
```
CN=Klimacek
OU=Development
O=Klimacek
L=Karanganyar
ST=Jawa Tengah
C=ID
```

---

## 📦 Signed App Bundle

### Release Bundle Information

**File**: `klimacek-v1.0.0-signed-release.aab`
**Location**: `D:\Kerja\Klimacek\KlimacekApp\play-store-assets\`

**Details**:
- **Size**: 3.4 MB (optimized with ProGuard/R8)
- **Version Code**: 1
- **Version Name**: 1.0.0
- **Signed**: Yes ✅
- **Build Type**: Release
- **Ready for**: Internal Testing, Production

**Features**:
- Code minification enabled
- Resource shrinking enabled
- ProGuard/R8 optimized
- Production API configured (https://api.klimacek.com)

---

## 🔒 Security Best Practices

### 1. Backup Your Keystore

**CRITICAL**: Make multiple secure backups of:
- `keystore/klimacek-release.jks` (the keystore file)
- `key.properties` (the configuration file)
- This `KEYSTORE_INFORMATION.md` file

**Recommended Backup Locations**:
1. **Encrypted USB drive** - Store in safe location
2. **Password manager** (1Password, LastPass, Bitwarden)
3. **Encrypted cloud storage** (Google Drive with encryption, OneDrive Personal Vault)
4. **Secure file service** (Tresorit, SpiderOak)

### 2. Change Default Passwords (Recommended)

The default passwords (`klimacek2024`) are documented here. For production:

**Option A: Create New Keystore** (Recommended for production)
```bash
cd D:/Kerja/Klimacek/KlimacekApp/keystore
keytool -genkey -v -keystore klimacek-production.jks -keyalg RSA -keysize 2048 -validity 10000 -alias klimacek-release
# Enter strong, unique passwords when prompted
```

**Option B: Keep Current** (Acceptable if file is secured)
- Ensure keystore file is never exposed
- Use strong file encryption
- Limit access to trusted team members only

### 3. Google Play App Signing (Recommended)

**Enroll in Play App Signing** when you upload first release:
- Google securely manages your app signing key
- You keep the upload key (this keystore)
- Can reset upload key if lost
- Better security overall

**How to Enroll**:
1. Upload your first AAB to Play Console
2. Play Console will prompt to opt-in to App Signing
3. Select "Continue" and accept
4. Google will generate and store the app signing key
5. Your keystore becomes the "upload key"

**Benefits**:
- More secure (Google manages production key)
- Can recover from lost upload key
- Automatic app signing optimization
- Industry best practice

---

## 📝 Configuration Files

### key.properties (Location: Project Root)

**File**: `D:\Kerja\Klimacek\KlimacekApp\key.properties`

**Contents**:
```properties
storePassword=klimacek2024
keyPassword=klimacek2024
keyAlias=klimacek-release
storeFile=keystore/klimacek-release.jks
```

**Security**:
- ✅ Already added to .gitignore
- ❌ Not committed to version control
- ⚠️ Contains sensitive passwords

---

## 🔄 Building Signed Releases

### Command to Build Signed Release AAB
```bash
cd D:/Kerja/Klimacek/KlimacekApp
./gradlew.bat bundleRelease
```

### Output Location
```
app/build/outputs/bundle/release/app-release.aab
```

### Before Building New Version
1. Update `versionCode` in `app/build.gradle`:
   ```gradle
   versionCode 2  // Increment by 1
   versionName "1.0.1"  // Update as needed
   ```
2. Test thoroughly
3. Build: `./gradlew.bat bundleRelease`
4. Upload to Play Console

---

## 🚨 If Keystore is Lost or Compromised

### If Lost BEFORE Publishing to Play Store
- Generate new keystore
- Update key.properties
- Rebuild and upload
- No impact on users (not published yet)

### If Lost AFTER Publishing to Play Store

**Without Play App Signing**:
- ❌ Cannot update your app (serious problem!)
- Must publish as new app with new package name
- Lose all users, reviews, ratings
- **This is why backups are CRITICAL**

**With Play App Signing** (Recommended):
- ✅ Can request new upload key from Google
- App can still be updated
- Users not affected
- Contact Play Console support

### If Compromised (Passwords Leaked)
1. **Generate new keystore immediately**
2. **Update key.properties**
3. **If using Play App Signing**: Request key reset from Google
4. **If not using Play App Signing**: Must contact Google support
5. Change all related passwords
6. Review app permissions/access

---

## 📊 Version Management

### Current Version
- **Version Code**: 1
- **Version Name**: 1.0.0

### For Next Release
Update in `app/build.gradle`:
```gradle
defaultConfig {
    versionCode 2  // Always increment by 1
    versionName "1.0.1"  // Semantic versioning
}
```

### Version Naming Convention
- **Major.Minor.Patch** (e.g., 1.0.0)
- **Major**: Breaking changes, major features
- **Minor**: New features, enhancements
- **Patch**: Bug fixes, small improvements

Examples:
- `1.0.0` → Initial release
- `1.0.1` → Bug fixes
- `1.1.0` → New features added
- `2.0.0` → Major redesign/breaking changes

---

## 🔍 Verifying Signed APK/AAB

### Check if Bundle is Signed
```bash
jarsigner -verify -verbose -certs app-release.aab
```

Should show: "jar verified."

### View Certificate Details
```bash
keytool -list -v -keystore keystore/klimacek-release.jks -alias klimacek-release
```

Enter password: `klimacek2024`

---

## 🔐 Team Access Management

### If Working Solo
- Keep keystore secured personally
- Backup in multiple locations
- Don't share passwords

### If Working in Team

**Option 1: Centralized Signing** (Recommended)
- One trusted person manages keystore
- Others build unsigned APKs for testing
- Release signing done centrally

**Option 2: Shared Keystore** (Use with Caution)
- Store keystore in secure team vault (1Password Teams, etc.)
- Limit access to necessary team members only
- Audit access regularly
- Use strong passwords

**Option 3: CI/CD** (Best for Teams)
- Store keystore in CI/CD secrets (GitHub Actions, Jenkins)
- Automated signing on release branches
- No manual keystore access needed
- Audit trail of all builds

---

## 📞 Emergency Contacts

### If Issues with Keystore

**Play Console Support**:
- Help Center: https://support.google.com/googleplay/android-developer
- Contact: Via Play Console (Settings → Help & Feedback)

**For App Signing Issues**:
- Check: https://support.google.com/googleplay/android-developer/answer/9842756

**For Lost Keys**:
- With App Signing: Contact Google via Play Console
- Without App Signing: Limited options - prevention is key!

---

## ✅ Security Checklist

Before publishing or sharing access:

- [ ] Keystore backed up in 3+ secure locations
- [ ] Passwords documented in secure password manager
- [ ] key.properties added to .gitignore
- [ ] Keystore file NOT committed to repository
- [ ] Team members trained on keystore security
- [ ] Enrolled in Google Play App Signing (recommended)
- [ ] Emergency recovery plan documented
- [ ] Access audit log maintained (for teams)

---

## 📚 Additional Resources

### Official Documentation
- [App Signing Guide](https://developer.android.com/studio/publish/app-signing)
- [Play App Signing](https://support.google.com/googleplay/android-developer/answer/9842756)
- [Keystore Management](https://developer.android.com/studio/publish/app-signing#secure-key)

### Tools
- **keytool**: Java keystore tool (comes with JDK)
- **jarsigner**: Verify signed archives
- **apksigner**: Android-specific signing tool

---

## 🎯 Quick Reference

### Keystore Passwords (KEEP SECURE!)
```
Keystore Password: klimacek2024
Key Password: klimacek2024
Key Alias: klimacek-release
```

### File Locations
```
Keystore: D:\Kerja\Klimacek\KlimacekApp\keystore\klimacek-release.jks
Config: D:\Kerja\Klimacek\KlimacekApp\key.properties
Signed AAB: play-store-assets/klimacek-v1.0.0-signed-release.aab
```

### Build Commands
```bash
# Build signed release
./gradlew.bat bundleRelease

# Build signed APK
./gradlew.bat assembleRelease

# Clean build
./gradlew.bat clean bundleRelease
```

---

## ⚠️ FINAL WARNING

**LOSING YOUR KEYSTORE = LOSING CONTROL OF YOUR APP**

If you publish with this keystore and then lose it:
- Cannot publish updates
- Cannot fix bugs
- Cannot add features
- Must create entirely new app
- Lose all users and reviews

**BACKUP NOW! BACKUP OFTEN!**

---

**Last Updated**: November 1, 2025
**Document Version**: 1.0
**Security Classification**: CONFIDENTIAL
