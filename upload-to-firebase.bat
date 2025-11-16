@echo off
echo ========================================
echo  KlimacekApp - Firebase App Distribution
echo ========================================
echo.

echo Step 1: Building APK...
cd KlimacekApp
call gradlew.bat assembleDebug
if %errorlevel% neq 0 (
    echo Build failed!
    pause
    exit /b 1
)
cd ..

echo.
echo Step 2: Uploading to Firebase App Distribution...
firebase appdistribution:distribute "D:\Kerja\Klimacek\KlimacekApp\app\build\outputs\apk\debug\app-debug.apk" --app 1:745512120451:android:4d84f1bdd1882cd875ebb6 --release-notes-file release-notes.txt --testers atamagriacc@gmail.com

if %errorlevel% neq 0 (
    echo.
    echo Upload failed!
    echo.
    echo Please make sure you have activated App Distribution in Firebase Console:
    echo https://console.firebase.google.com/project/atamagri-iot/appdistribution
    echo.
    pause
    exit /b 1
)

echo.
echo ========================================
echo  Upload Successful!
echo ========================================
echo.
echo Testers will receive notification to download the app.
echo.
pause
