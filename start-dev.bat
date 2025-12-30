@echo off
echo 🚀 Starting Charette System Development Environment (Vercel-Compatible)
echo ========================================================================
echo.

echo 📦 Installing dependencies...
call npm install
if %errorlevel% neq 0 (
    echo ❌ Failed to install backend dependencies
    pause
    exit /b 1
)

cd client
call npm install
if %errorlevel% neq 0 (
    echo ❌ Failed to install frontend dependencies
    pause
    exit /b 1
)
cd ..

echo ✅ Dependencies installed successfully
echo.

echo 🔧 Starting API server (polling-based, no WebSockets)...
start "Charette API" cmd /k "node api/index.js"

timeout /t 3 /nobreak > nul

echo 🌐 Starting frontend development server...
start "Charette Frontend" cmd /k "cd client && npm start"

echo.
echo 🎉 Charette System is starting up!
echo API Server: http://localhost:5000 (REST API with polling)
echo Frontend: http://localhost:3000 (React App)
echo.
echo ⚡ Using polling-based communication (3-second intervals)
echo 🤖 AI-powered continuous questioning enabled
echo.
echo Close the command windows to stop the servers.
pause
