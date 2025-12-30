# Vercel Deployment Checklist

Use this checklist to verify everything is configured correctly before deploying.

## Pre-Deployment Checks

### Code Structure
- [ ] `api/index.js` exists and contains Express app
- [ ] `api/firebase-service.js` exists
- [ ] `client/` directory contains React app
- [ ] `vercel.json` is updated with proper routes
- [ ] `package.json` main points to `api/index.js`

### Dependencies
- [ ] Root `package.json` has all backend dependencies
- [ ] `client/package.json` has all frontend dependencies
- [ ] No circular dependencies between api and client
- [ ] All imports use correct relative paths

### Build Configuration
- [ ] `npm run vercel-build` works locally
- [ ] `client/build/` directory is created
- [ ] `client/build/index.html` exists
- [ ] No build errors or warnings

### Environment Variables
- [ ] `.env.local` exists locally (git ignored)
- [ ] `.env.vercel.example` has all required variables
- [ ] Firebase credentials are valid
- [ ] No hardcoded secrets in code

### API Endpoints
- [ ] `/api/health` returns `{ status: 'ok' }`
- [ ] `/api/charettes` returns empty array or demo data
- [ ] `/` serves React app (index.html)
- [ ] CORS is configured for your domain

### Real-time Communication
- [ ] Socket.IO configured with polling fallback
- [ ] `client/src/config.js` has correct API URLs
- [ ] SOCKET_CONFIG includes both websocket and polling transports

## Local Testing

### 1. Build Test
```bash
npm run vercel-build
```
Expected: `client/build/` created without errors

### 2. Start Server
```bash
npm start
```
Expected: Server starts on port 3000 or 5000

### 3. Test API
```bash
curl http://localhost:3000/api/health
```
Expected: `{ "status": "ok", "timestamp": "..." }`

### 4. Test Frontend
Visit `http://localhost:3000` in browser
Expected: Charette System UI loads

### 5. Test Fallback
Check browser console for Socket.IO connection
Expected: Should connect via polling if WebSocket unavailable

## Firebase Setup

- [ ] Firebase project created
- [ ] Firestore database enabled
- [ ] Service account key generated
- [ ] Private key copied correctly (with `\n` characters)
- [ ] Firestore security rules configured
- [ ] Collections created (optional - auto-created on first write):
  - [ ] `charettes`
  - [ ] `messages`
  - [ ] `participants`
  - [ ] `analysis`
  - [ ] `reports`

## Vercel Configuration

### Project Settings
- [ ] GitHub repository connected
- [ ] Build command: `npm run vercel-build`
- [ ] Output directory: `client/build`
- [ ] Install command: `npm install`
- [ ] Node version: 18.x

### Environment Variables
- [ ] `NODE_ENV` = `production`
- [ ] `FIREBASE_PROJECT_ID` set
- [ ] `FIREBASE_PRIVATE_KEY` set (with `\n` characters)
- [ ] `FIREBASE_CLIENT_EMAIL` set
- [ ] `APP_URL` set to your Vercel domain

### Deployment
- [ ] Initial deployment successful
- [ ] Build logs show no errors
- [ ] Function logs show no errors
- [ ] Deployment URL is accessible

## Post-Deployment Verification

### API Health
```bash
curl https://YOUR_VERCEL_URL/api/health
```
Expected: `{ "status": "ok", "timestamp": "..." }`

### Frontend Access
Visit `https://YOUR_VERCEL_URL` in browser
Expected: Charette System UI loads

### API Endpoints
```bash
curl https://YOUR_VERCEL_URL/api/charettes
```
Expected: JSON array (empty or with data)

### Logs
- [ ] Check Vercel deployment logs for errors
- [ ] Check function logs for warnings
- [ ] No 404 errors on API routes
- [ ] No CORS errors in browser console

### Real-time Features
- [ ] Create a new charette
- [ ] Join the charette
- [ ] Send a message
- [ ] Message appears in real-time (or after polling interval)
- [ ] No console errors

## Performance Checks

- [ ] First page load < 3 seconds
- [ ] API response < 200ms
- [ ] No 502/503 errors
- [ ] Cold start time acceptable

## Security Checks

- [ ] No secrets in code
- [ ] No secrets in logs
- [ ] CORS configured correctly
- [ ] Firestore rules restrict access appropriately
- [ ] Environment variables not exposed

## Rollback Plan

If deployment fails:
1. Check Vercel logs for specific error
2. Fix locally and test with `npm run vercel-build`
3. Commit and push to GitHub
4. Vercel will auto-redeploy
5. If critical, disable auto-deploy and manually test

## Troubleshooting

### Build Fails
- [ ] Run `npm run vercel-build` locally
- [ ] Check `client/package.json` for missing dependencies
- [ ] Check for syntax errors in `api/index.js`

### API Returns 404
- [ ] Verify `api/index.js` exists
- [ ] Check `vercel.json` routes
- [ ] Verify `buildCommand` and `outputDirectory`

### Firebase Connection Error
- [ ] Verify environment variables
- [ ] Check Firebase credentials format
- [ ] Ensure Firestore database is created
- [ ] Check Firestore security rules

### Real-time Not Working
- [ ] Check browser console for Socket.IO errors
- [ ] Verify polling is enabled in config
- [ ] Check CORS settings
- [ ] Consider using Pusher/Ably

## Sign-Off

- [ ] All checks passed
- [ ] Deployment successful
- [ ] Ready for production use

---

**Last Updated**: 2024-10-24
**Status**: Ready for Deployment
