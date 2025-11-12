# Bundle Identifier Configuration

**CRITICAL: This app MUST use the bundle ID: `com.learningscience.letsmakemusic`**

## Fixed Files (DO NOT CHANGE)

### iOS Configuration
- **ios/Instamobile.xcodeproj/project.pbxproj**
  - Line 433: `PRODUCT_BUNDLE_IDENTIFIER = com.learningscience.letsmakemusic;` (Debug)
  - Line 467: `PRODUCT_BUNDLE_IDENTIFIER = com.learningscience.letsmakemusic;` (Release)

### Android Configuration
- **android/app/build.gradle**
  - Line 111: `namespace 'com.learningscience.letsmakemusic'`
  - Line 114: `applicationId "com.learningscience.letsmakemusic"`
- **android/app/google-services.json**
  - Line 48: `"package_name": "com.learningscience.letsmakemusic"`

### Firebase Configuration
- iOS: `ios/Instamobile/GoogleService-Info.plist` - Configured for `com.learningscience.letsmakemusic`
- Android: `android/app/google-services.json` - Configured for `com.learningscience.letsmakemusic`

## What Was Wrong Before

The Xcode project was configured with `io.instamobile.rn.ios.demo` which caused:
1. Wrong app being installed on simulator
2. White screen issues
3. Wasted time debugging the wrong application

## How to Verify

```bash
# Check iOS bundle ID
grep "PRODUCT_BUNDLE_IDENTIFIER" ios/Instamobile.xcodeproj/project.pbxproj | grep -v "org.cocoapods"

# Should show:
# PRODUCT_BUNDLE_IDENTIFIER = com.learningscience.letsmakemusic;
# PRODUCT_BUNDLE_IDENTIFIER = com.learningscience.letsmakemusic;

# Check Android package name
grep "package_name" android/app/google-services.json | grep "letsmakemusic"

# Should show:
# "package_name": "com.learningscience.letsmakemusic"
```

## If You Need to Change Bundle ID

**DON'T** unless absolutely necessary. If you must:

1. Update `ios/Instamobile.xcodeproj/project.pbxproj` (2 locations)
2. Update Firebase configs for both platforms
3. Update `android/app/build.gradle` if needed
4. Re-download Firebase config files from Firebase Console
5. Clean and rebuild everything

---

**Last Updated:** 2025-11-11
**Fixed By:** Bundle ID permanently set to `com.learningscience.letsmakemusic`
