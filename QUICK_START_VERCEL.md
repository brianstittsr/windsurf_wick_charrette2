# Quick Start: Deploy to Vercel in 10 Minutes

## TL;DR

1. **Firebase Setup** (2 min)
   - Create Firebase project
   - Enable Firestore
   - Generate service account key

2. **Local Setup** (2 min)
   ```bash
   npm install && cd client && npm install
   npm run build
   ```

3. **Vercel Setup** (3 min)
   - Connect GitHub repo to Vercel
   - Add environment variables
   - Deploy

4. **Verify** (3 min)
   - Test API: `curl https://YOUR_URL/api/health`
   - Test UI: Visit `https://YOUR_URL`

## Step-by-Step

### 1. Firebase (2 min)

```bash
# Go to https://console.firebase.google.com
# 1. Create new project
# 2. Enable Firestore Database
# 3. Project Settings → Service Accounts → Generate Key
# 4. Copy these from the JSON file:
#    - project_id
#    - private_key (keep the \n characters!)
#    - client_email
```

### 2. Local Build (2 min)

```bash
# Install dependencies
npm install
cd client && npm install

# Build React app
npm run build

# Test locally
npm start
# Visit http://localhost:3000
```

### 3. Vercel Deploy (3 min)

```bash
# 1. Push code to GitHub
git add .
git commit -m "Optimize for Vercel"
git push

# 2. Go to https://vercel.com/dashboard
# 3. Click "Add New" → "Project"
# 4. Select your GitHub repo
# 5. Click "Import"
# 6. Vercel auto-detects settings from vercel.json
# 7. Click "Environment Variables"
# 8. Add these variables:
#    NODE_ENV = production
#    FIREBASE_PROJECT_ID = your-project-id
#    FIREBASE_PRIVATE_KEY = -----BEGIN PRIVATE KEY-----\n...\n-----END PRIVATE KEY-----\n
#    FIREBASE_CLIENT_EMAIL = firebase-adminsdk-...@....iam.gserviceaccount.com
#    APP_URL = https://your-project.vercel.app
# 9. Click "Deploy"
```

### 4. Verify (3 min)

```bash
# Test API
curl https://YOUR_PROJECT.vercel.app/api/health

# Expected response:
# { "status": "ok", "timestamp": "2024-10-24T..." }

# Visit in browser
# https://YOUR_PROJECT.vercel.app
# Should see Charette System UI
```

## Common Issues

### Build Fails
```bash
# Test locally first
npm run vercel-build

# If it fails, check:
# 1. client/package.json has all dependencies
# 2. No syntax errors in api/index.js
# 3. All imports are correct
```

### API Returns 404
- Check `vercel.json` routes
- Verify `api/index.js` exists
- Check Vercel build logs

### Firebase Connection Error
- Verify `FIREBASE_PRIVATE_KEY` includes `\n` characters
- Check Firebase project ID is correct
- Ensure Firestore database is created

### Real-time Not Working
- Check browser console for errors
- Socket.IO uses polling on Vercel (slower but works)
- For better performance, use Pusher/Ably

## What Changed

- ✅ Backend moved to `api/` directory (Vercel standard)
- ✅ `vercel.json` updated with proper routing
- ✅ Firebase integration added
- ✅ Environment configuration added
- ✅ Client-side API config added

## Files to Know

| File | Purpose |
|------|---------|
| `api/index.js` | Express server (Vercel entry point) |
| `api/firebase-service.js` | Firebase operations |
| `vercel.json` | Vercel configuration |
| `package.json` | Root dependencies |
| `client/src/config.js` | API URLs for frontend |
| `.env.vercel.example` | Environment variables template |

## Next Steps

1. ✅ Deploy to Vercel
2. ⬜ (Optional) Set up Pusher/Ably for better real-time
3. ⬜ (Optional) Add custom domain
4. ⬜ (Optional) Set up monitoring

## Documentation

- **Full Guide**: `VERCEL_DEPLOYMENT_GUIDE.md`
- **Architecture**: `ARCHITECTURE_ANALYSIS.md`
- **Checklist**: `VERCEL_CHECKLIST.md`
- **Optimization**: `VERCEL_OPTIMIZATION_README.md`

## Support

- **Vercel**: https://vercel.com/docs
- **Firebase**: https://firebase.google.com/docs
- **Socket.IO**: https://socket.io/docs/v4/socket-io-on-serverless/

---

**You're ready to deploy!** 🚀
