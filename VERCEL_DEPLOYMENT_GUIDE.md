# Vercel Deployment Guide - Charette System

## Overview

This guide walks you through deploying the Charette System to Vercel with proper frontend/backend separation and Firebase integration.

## Prerequisites

1. **Vercel Account**: [Sign up at vercel.com](https://vercel.com)
2. **GitHub Repository**: Push your code to GitHub
3. **Firebase Project**: [Create at console.firebase.google.com](https://console.firebase.google.com)
4. **Node.js 18+**: Installed locally for testing

## Step 1: Prepare Firebase

### 1.1 Create Firebase Project
1. Go to [Firebase Console](https://console.firebase.google.com)
2. Click "Create a new project"
3. Enter project name (e.g., "charette-system")
4. Enable Google Analytics (optional)
5. Click "Create project"

### 1.2 Enable Firestore Database
1. In Firebase Console, go to **Firestore Database**
2. Click **Create Database**
3. Select **Start in production mode**
4. Choose your region (closest to your users)
5. Click **Create**

### 1.3 Generate Service Account Key
1. Go to **Project Settings** (gear icon)
2. Click **Service Accounts** tab
3. Click **Generate New Private Key**
4. A JSON file will download - **keep this secure**
5. Extract these values:
   - `project_id` → `FIREBASE_PROJECT_ID`
   - `private_key` → `FIREBASE_PRIVATE_KEY` (keep the `\n` characters)
   - `client_email` → `FIREBASE_CLIENT_EMAIL`

## Step 2: Update Local Environment

### 2.1 Create `.env.local`
```bash
# Copy from .env.vercel.example
NODE_ENV=development
FIREBASE_PROJECT_ID=your-project-id
FIREBASE_PRIVATE_KEY=-----BEGIN PRIVATE KEY-----\n...\n-----END PRIVATE KEY-----\n
FIREBASE_CLIENT_EMAIL=firebase-adminsdk-xxxxx@your-project-id.iam.gserviceaccount.com
```

### 2.2 Test Locally
```bash
# Install dependencies
npm install
cd client && npm install

# Build React app
npm run build

# Test API server
npm start
```

Visit `http://localhost:3000` to verify the build works.

## Step 3: Deploy to Vercel

### 3.1 Connect GitHub Repository
1. Go to [Vercel Dashboard](https://vercel.com/dashboard)
2. Click **Add New** → **Project**
3. Select your GitHub repository
4. Click **Import**

### 3.2 Configure Build Settings
Vercel should auto-detect the configuration from `vercel.json`, but verify:

- **Framework Preset**: `Other`
- **Build Command**: `npm run vercel-build`
- **Output Directory**: `client/build`
- **Install Command**: `npm install`

### 3.3 Add Environment Variables
1. In Vercel project settings, go to **Environment Variables**
2. Add each variable from `.env.vercel.example`:

```
NODE_ENV = production
FIREBASE_PROJECT_ID = your-project-id
FIREBASE_PRIVATE_KEY = -----BEGIN PRIVATE KEY-----\n...\n-----END PRIVATE KEY-----\n
FIREBASE_CLIENT_EMAIL = firebase-adminsdk-xxxxx@your-project-id.iam.gserviceaccount.com
APP_URL = https://your-project.vercel.app
```

**Important**: For `FIREBASE_PRIVATE_KEY`, paste the entire key including `\n` characters exactly as shown in the JSON file.

### 3.4 Deploy
1. Click **Deploy**
2. Wait for build to complete (2-5 minutes)
3. Once deployed, visit your Vercel URL

## Step 4: Verify Deployment

### 4.1 Test API Endpoints
```bash
# Replace YOUR_VERCEL_URL with your actual URL
curl https://YOUR_VERCEL_URL/api/health
```

Expected response:
```json
{ "status": "ok", "timestamp": "2024-10-24T..." }
```

### 4.2 Test Frontend
Visit `https://YOUR_VERCEL_URL` in your browser. You should see the Charette System UI.

### 4.3 Check Logs
In Vercel dashboard:
1. Go to **Deployments**
2. Click the latest deployment
3. Click **Functions** to see API logs
4. Check for any errors

## Step 5: Configure Firestore Security Rules

### 5.1 Set Up Basic Rules
In Firebase Console, go to **Firestore Database** → **Rules**:

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Allow read/write for authenticated users
    match /{document=**} {
      allow read, write: if request.auth != null;
    }
    
    // For demo mode (no auth), uncomment:
    // match /{document=**} {
    //   allow read, write: if true;
    // }
  }
}
```

Click **Publish** to apply.

## Step 6: Handle Real-time Communication (Socket.IO)

### Current Limitation
Vercel Functions don't support persistent WebSocket connections. Socket.IO will fall back to polling, which is less efficient.

### Option A: Use Managed WebSocket Service (Recommended)

#### Using Pusher
1. Sign up at [pusher.com](https://pusher.com)
2. Create an app
3. Get your credentials
4. Add to Vercel environment variables:
   ```
   PUSHER_APP_ID = ...
   PUSHER_KEY = ...
   PUSHER_SECRET = ...
   PUSHER_CLUSTER = ...
   ```
5. Update `api/index.js` to use Pusher instead of Socket.IO

#### Using Ably
1. Sign up at [ably.io](https://ably.io)
2. Create an app
3. Get your API key
4. Add to Vercel environment variables:
   ```
   ABLY_API_KEY = ...
   ```

### Option B: Use Polling (No Additional Service)
Socket.IO will automatically fall back to polling. This works but is less efficient for real-time updates.

## Step 7: Monitor and Debug

### 7.1 View Logs
```bash
# Install Vercel CLI
npm install -g vercel

# View logs
vercel logs
```

### 7.2 Common Issues

**Issue**: 404 on API endpoints
- **Solution**: Check `vercel.json` routes are correct
- Verify `api/index.js` exists

**Issue**: Firebase errors
- **Solution**: Check environment variables in Vercel dashboard
- Verify `FIREBASE_PRIVATE_KEY` includes `\n` characters
- Check Firestore security rules allow your requests

**Issue**: Static files not loading
- **Solution**: Ensure `npm run vercel-build` creates `client/build/`
- Check `vercel.json` output directory is correct

**Issue**: Real-time updates not working
- **Solution**: Socket.IO falls back to polling on Vercel
- Consider using Pusher/Ably for better real-time experience

## Step 8: Continuous Deployment

Once connected to GitHub, Vercel automatically deploys on:
- Push to main branch
- Pull requests (preview deployments)

### Disable Auto-Deploy (Optional)
In Vercel project settings → **Git** → uncheck "Deploy on push"

## Step 9: Custom Domain (Optional)

1. In Vercel project settings, go to **Domains**
2. Click **Add Domain**
3. Enter your domain
4. Follow DNS configuration instructions
5. Wait for DNS propagation (up to 48 hours)

## Troubleshooting

### Build Fails
1. Check build logs in Vercel dashboard
2. Run `npm run vercel-build` locally to reproduce
3. Verify `client/package.json` has all dependencies

### API Returns 500 Error
1. Check Vercel function logs
2. Verify Firebase credentials are correct
3. Check Firestore security rules

### Frontend Can't Connect to API
1. Verify `APP_URL` environment variable is set
2. Check CORS configuration in `api/index.js`
3. Verify API routes in `vercel.json`

### Real-time Features Not Working
1. Socket.IO uses polling on Vercel (slower but functional)
2. For better performance, use Pusher or Ably
3. Check browser console for connection errors

## Performance Optimization

### 1. Enable Caching
In `vercel.json`, add cache headers:
```json
"headers": [
  {
    "source": "/client/build/(.*)",
    "headers": [
      {
        "key": "Cache-Control",
        "value": "public, max-age=31536000, immutable"
      }
    ]
  }
]
```

### 2. Optimize Images
- Compress images before uploading
- Use WebP format where possible

### 3. Monitor Performance
- Use Vercel Analytics
- Check Core Web Vitals in Vercel dashboard

## Next Steps

1. ✅ Deploy to Vercel
2. ✅ Set up Firebase Firestore
3. ✅ Configure environment variables
4. ⬜ (Optional) Set up Pusher/Ably for real-time
5. ⬜ (Optional) Add custom domain
6. ⬜ (Optional) Set up monitoring/alerting

## Support

- **Vercel Docs**: https://vercel.com/docs
- **Firebase Docs**: https://firebase.google.com/docs
- **Socket.IO on Serverless**: https://socket.io/docs/v4/socket-io-on-serverless/

## Summary

Your Charette System is now deployed on Vercel with:
- ✅ React frontend served as static files
- ✅ Express API running on Vercel Functions
- ✅ Firebase Firestore for persistent data
- ✅ Automatic deployments from GitHub
- ⚠️ Real-time features using polling (consider Pusher/Ably for production)
