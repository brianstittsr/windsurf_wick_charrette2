@echo off
echo 🔥 Firebase Setup Helper for Charette System
echo ==============================================
echo.
echo 📋 Firebase Configuration Setup
echo -------------------------------
echo You'll need to get these values from Firebase Console:
echo 1. Go to https://console.firebase.google.com/
echo 2. Select your project (or create new)
echo 3. Go to Project Settings ^> General ^> Your apps
echo 4. Add a Web app (</^>) if you haven't already
echo 5. Copy the config values
echo.
echo 📝 Template created at .env.local.template
echo 📝 Copy it to .env.local and edit with your values
echo.
echo Example .env.local content:
echo REACT_APP_FIREBASE_API_KEY=your_api_key_here
echo REACT_APP_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
echo REACT_APP_FIREBASE_PROJECT_ID=your_project_id
echo.
pause
