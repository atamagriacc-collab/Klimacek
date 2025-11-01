# Release Signing Configuration Guide

## Step 1: Generate Release Keystore

Run this command in your terminal to create a release keystore:

```bash
keytool -genkey -v -keystore klimacek-release-key.jks -keyalg RSA -keysize 2048 -validity 10000 -alias klimacek-release
```

You will be prompted to enter:
- Keystore password (remember this!)
- Key password (remember this!)
- Your name, organization, etc.

**IMPORTANT:**
- Store this keystore file securely
- Never commit it to git
- Keep the passwords safe - you cannot recover them if lost
- You'll need this keystore for ALL future app updates

## Step 2: Configure gradle.properties

Create or edit `gradle.properties` in the project root directory and add:

```properties
# Release signing configuration (DO NOT commit these values to git)
keystorePassword=YOUR_KEYSTORE_PASSWORD
keyAlias=klimacek-release
keyPassword=YOUR_KEY_PASSWORD
```

**Alternative (More Secure):** Use environment variables instead:

```bash
export KEYSTORE_PASSWORD=your_keystore_password
export KEY_ALIAS=klimacek-release
export KEY_PASSWORD=your_key_password
```

## Step 3: Update build.gradle

1. Move your keystore file to a secure location (e.g., `KlimacekApp/keystore/`)
2. Update the `signingConfigs` section in `app/build.gradle`:

```gradle
signingConfigs {
    release {
        storeFile file("../keystore/klimacek-release-key.jks")
        storePassword System.getenv("KEYSTORE_PASSWORD") ?: project.findProperty("keystorePassword")
        keyAlias System.getenv("KEY_ALIAS") ?: project.findProperty("keyAlias")
        keyPassword System.getenv("KEY_PASSWORD") ?: project.findProperty("keyPassword")
    }
}
```

3. Uncomment the signing configuration in the release buildType:
```gradle
release {
    ...
    signingConfig signingConfigs.release
}
```

## Step 4: Update .gitignore

Add to `.gitignore`:
```
# Keystore files
*.jks
*.keystore
keystore/

# Gradle properties with passwords
gradle.properties
```

## Step 5: Build Release APK/AAB

### Build Android App Bundle (recommended for Play Store):
```bash
./gradlew bundleRelease
```
Output: `app/build/outputs/bundle/release/app-release.aab`

### Build APK (for direct distribution):
```bash
./gradlew assembleRelease
```
Output: `app/build/outputs/apk/release/app-release.apk`

## Play Store App Signing (Recommended)

Instead of managing your own keystore, you can use Google Play App Signing:

1. Generate a temporary keystore as shown above
2. Upload your first release to Play Console
3. Opt-in to Play App Signing
4. Google will manage your app signing key
5. You only need to upload the upload key for future releases

Benefits:
- Google securely manages your app signing key
- Can reset lost upload keys
- Additional security

## Verify Your Signed APK

```bash
jarsigner -verify -verbose -certs app/build/outputs/apk/release/app-release.apk
```

## Important Notes

1. **NEVER commit keystore files or passwords to version control**
2. **Backup your keystore** - store it in a secure location (encrypted cloud storage, password manager, etc.)
3. **Document your key information** - store in a secure password manager
4. **Use different keystores** for different apps
5. For team collaboration, use a secure key management solution

## Next Steps After Signing

1. Test the signed release build thoroughly on multiple devices
2. Upload to Play Console internal testing track first
3. Get feedback from testers
4. Promote to production when ready
