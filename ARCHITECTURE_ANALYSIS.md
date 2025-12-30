# Charette System - Architecture Analysis & Vercel Optimization

## Current Architecture Overview

### Stack
- **Frontend**: React 18 + Material UI (SPA)
- **Backend**: Node.js + Express + Socket.IO
- **Real-time**: WebSocket via Socket.IO
- **Database**: In-memory (development) / Firebase Firestore (production)
- **Deployment**: Vercel (attempted)

### Current Structure Issues for Vercel

#### 1. **Monorepo Complexity**
- Root `package.json` defines backend (Express)
- `client/package.json` defines frontend (React)
- Vercel expects either:
  - Single Node.js app, OR
  - Proper monorepo configuration with build outputs
- **Current Problem**: `vercel.json` routes all requests to `index.js` (a simple stub), not the full server

#### 2. **Missing Full Server Integration**
- `index.js` is a minimal stub that doesn't handle Socket.IO or API routes
- `server.js` contains the actual logic but isn't being used by Vercel
- React build output (`client/build`) isn't being served properly

#### 3. **Build Process Issues**
- `package.json` build script: `cd client && npm install && npm run build`
- Creates `client/build/` directory
- Vercel doesn't automatically serve this static output
- No proper static file serving configuration in `vercel.json`

#### 4. **Socket.IO on Serverless**
- Socket.IO requires persistent connections
- Vercel Functions are stateless and timeout after 60 seconds
- WebSocket support exists but requires proper configuration
- Current CORS settings assume traditional server, not serverless

#### 5. **Environment & Secrets**
- `.env.local` exists but not properly integrated with Vercel secrets
- Firebase credentials need secure handling
- Database initialization (`init-database.js`) runs on server startup

---

## Recommended Vercel-Optimized Architecture

### Option A: **Hybrid Approach (Recommended)**
Separate frontend and backend deployments for maximum flexibility:

```
Frontend (Vercel)
├── React SPA (client/)
├── Static build output
└── API calls to backend

Backend (Vercel Functions or Alternative)
├── Express server
├── Socket.IO (via Vercel WebSockets or external service)
└── Firebase integration
```

**Pros:**
- Clean separation of concerns
- Frontend scales independently
- Backend can use alternative hosting if needed
- Easier debugging and monitoring

**Cons:**
- Two deployments to manage
- CORS configuration required
- Potential latency between services

### Option B: **Monorepo with Vercel Build Output**
Keep everything together but restructure for Vercel:

```
Root
├── api/
│   ├── index.js (Express app)
│   ├── server.js (moved here)
│   └── phases.js
├── client/
│   ├── src/
│   └── build/ (output)
├── vercel.json (proper config)
└── package.json
```

**Pros:**
- Single deployment
- Simpler workflow
- Shared dependencies

**Cons:**
- Socket.IO limitations on serverless
- Build complexity
- Cold start issues

---

## Critical Issues to Fix

### 1. **Socket.IO on Serverless**
**Problem**: Socket.IO requires persistent connections; Vercel Functions timeout.

**Solutions**:
- Use Vercel WebSockets (beta feature)
- Move Socket.IO to external service (Pusher, Ably, Socket.io Cloud)
- Use polling instead of WebSockets (less efficient)

**Recommended**: Pusher or Ably for managed WebSocket service

### 2. **Static File Serving**
**Problem**: React build files not served by current `vercel.json`

**Fix**:
```json
{
  "version": 2,
  "builds": [
    {
      "src": "client/package.json",
      "use": "@vercel/static-build",
      "config": { "distDir": "client/build" }
    },
    {
      "src": "api/index.js",
      "use": "@vercel/node"
    }
  ],
  "routes": [
    { "src": "/api/(.*)", "dest": "/api/index.js" },
    { "src": "/(.*)", "dest": "/client/build/$1" },
    { "src": "/(.*)", "dest": "/client/build/index.html" }
  ]
}
```

### 3. **Database Initialization**
**Problem**: In-memory storage lost on cold starts; Firebase needs async initialization

**Fix**:
- Use Firebase Firestore exclusively (not in-memory)
- Initialize Firebase on first request
- Cache initialization state

### 4. **Environment Variables**
**Problem**: `.env.local` not synced to Vercel

**Fix**:
- Add all secrets to Vercel project settings
- Use `process.env` for all configuration
- Never commit `.env.local`

### 5. **Build Output Directory**
**Problem**: `client/build` might not exist or be in wrong location

**Fix**:
- Ensure `npm run build` creates proper output
- Configure `vercel.json` to point to correct directory
- Add build output to `.vercelignore` if needed

---

## Implementation Roadmap

### Phase 1: Frontend Optimization (Immediate)
1. ✅ Verify React build output location
2. ✅ Update `vercel.json` for proper static serving
3. ✅ Test build locally: `npm run build`
4. ✅ Verify environment variables in Vercel dashboard

### Phase 2: Backend Restructuring (Short-term)
1. Move server logic to `api/index.js`
2. Implement Firebase Firestore (remove in-memory storage)
3. Add error handling for cold starts
4. Test API endpoints locally

### Phase 3: Real-time Communication (Medium-term)
1. Evaluate WebSocket options (Pusher/Ably vs. Vercel WebSockets)
2. Implement fallback to polling
3. Update Socket.IO configuration
4. Test real-time features on Vercel

### Phase 4: Production Hardening (Long-term)
1. Add request logging and monitoring
2. Implement rate limiting
3. Add health checks
4. Set up error tracking (Sentry)
5. Performance optimization

---

## Quick Wins (Do First)

1. **Fix `vercel.json`** - Proper routing for SPA + API
2. **Move `server.js` logic to `api/index.js`** - Vercel expects this structure
3. **Add Vercel environment variables** - Firebase config, API keys
4. **Test build locally** - Ensure `client/build` is created
5. **Add `.vercelignore`** - Exclude unnecessary files

---

## File Structure After Optimization

```
charette-system/
├── api/
│   ├── index.js           # Main Express app (Vercel entry point)
│   ├── server.js          # Server logic (imported by index.js)
│   ├── phases.js          # Phase definitions
│   └── [other backend files]
├── client/
│   ├── src/               # React source
│   ├── public/
│   ├── build/             # Build output (generated)
│   └── package.json
├── vercel.json            # Updated config
├── package.json           # Root dependencies
└── .vercelignore
```

---

## Next Steps

1. **Confirm deployment target**: Option A (separate) or Option B (monorepo)?
2. **WebSocket strategy**: Vercel WebSockets, Pusher, Ably, or polling?
3. **Database**: Commit to Firebase Firestore or alternative?
4. **Timeline**: Immediate fixes vs. full refactor?

Would you like me to implement these optimizations?
