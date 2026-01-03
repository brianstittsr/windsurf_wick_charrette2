# Charette System - Complete Website Architecture & Backend Features

**Version:** 2.0  
**Last Updated:** December 31, 2024  
**Organization:** Wick Enterprises

---

## Executive Summary

The Charette System is a full-stack web application featuring real-time collaboration, AI-powered analysis, and comprehensive advocacy tools. This document details the complete website architecture, backend services, API infrastructure, database operations, and all integrated features.

---

## 1. System Architecture Overview

### 1.1 Technology Stack

**Frontend:**
- React 18.3.1 - Component-based UI
- Material UI 5.x - Component library
- Socket.IO Client 4.x - Real-time communication
- TailwindCSS + shadcn/ui - Modern styling

**Backend:**
- Node.js 18+ - Runtime environment
- Express 4.x - Web framework
- Socket.IO 4.x - WebSocket server
- Firebase Firestore - NoSQL database
- Firebase Authentication - User management

**Infrastructure:**
- Vercel - Frontend hosting
- Firebase Cloud Functions - Serverless backend
- GitHub - Version control

### 1.2 Architecture Diagram

```
┌─────────────────────────────────────────────────────────┐
│                   FRONTEND LAYER                        │
│  React SPA + Material UI + Socket.IO Client            │
│  8 Client Services (API, Advocacy, Gamification, etc.) │
└─────────────────────────────────────────────────────────┘
                          ↕ HTTPS/WSS
┌─────────────────────────────────────────────────────────┐
│                   BACKEND LAYER                         │
│  Node.js + Express + Socket.IO Server                  │
│  RESTful API + WebSocket Event Handlers                │
└─────────────────────────────────────────────────────────┘
                          ↕
┌─────────────────────────────────────────────────────────┐
│                  BUSINESS LOGIC                         │
│  Charette | Advocacy | AI Analysis | Research          │
│  Gamification | Reasoning | PDF | Settings             │
└─────────────────────────────────────────────────────────┘
                          ↕
┌─────────────────────────────────────────────────────────┐
│                   DATA LAYER                            │
│  Firebase Firestore + In-Memory Storage (Dev)          │
└─────────────────────────────────────────────────────────┘
```

---

## 2. Backend Infrastructure

### 2.1 Server Architecture (server.js - 516 lines)

**Core Components:**
- HTTP server with Express
- Socket.IO WebSocket server
- CORS configuration for cross-origin requests
- In-memory data storage (development)
- Firebase integration (production)

**Data Storage:**
```javascript
let charettes = {};      // Session data
let messages = {};       // Chat messages by room
let reports = {};        // Generated reports
```

**Phase System:**
6 structured phases guide the charette process:
1. Introduction - Welcome and context
2. Data Collection - Gather information
3. Analysis - Explore constraints (with AI)
4. Ideation - Generate solutions
5. Synthesis - Combine findings
6. Reporting - Generate final report

### 2.2 WebSocket Event System

**Server Events (Socket.IO):**

**Connection Management:**
- `connection` - New client connected
- `disconnect` - Client disconnected

**Session Events:**
- `join-charette` - Join session room
- `leave-charette` - Leave session
- `chat-message` - Send/receive messages
- `next-phase` - Advance to next phase

**Breakout Room Events:**
- `create-breakout-rooms` - Create multiple rooms with questions
- `join-breakout-room` - Join specific room
- `leave-breakout-room` - Leave room
- `add-room-question` - Add question to room
- `remove-room-question` - Remove question
- `room-updated` - Room configuration changed

**Analysis Events:**
- `analysis-update` - Real-time AI analysis results

### 2.3 Real-Time Message Processing

**Message Flow:**
1. Client sends message via Socket.IO
2. Server receives, validates, and stores message
3. Server broadcasts to all participants in room
4. If in Analysis phase, triggers AI analysis
5. Analysis results emitted to analysts/PMs

**Message Structure:**
```javascript
{
  id: "uuid",
  text: "message content",
  userName: "Alice",
  role: "participant",
  roomId: "main",
  timestamp: "2024-12-31T10:00:00Z",
  type: "chat"
}
```

### 2.4 Breakout Room System

**Features:**
- Create multiple rooms simultaneously
- Assign discussion questions to each room
- Auto-assign participants for balanced distribution
- Dynamic question management (add/remove during session)
- Room-scoped messaging
- Participant tracking per room

**Room Structure:**
```javascript
{
  id: "room-1",
  name: "Breakout Room 1",
  questions: [
    "What activities should the park support?",
    "What safety concerns exist?"
  ],
  participants: ["Alice", "Bob"],
  createdAt: "2024-12-31T10:00:00Z"
}
```

### 2.5 AI Reasoning Engine

**Real-Time Analysis:**
Automatically analyzes messages during Analysis phase

**Detection Categories:**
- **Constraints:** Limitations, blockers, restrictions
- **Assumptions:** Beliefs, presumptions, expectations
- **Opportunities:** Possibilities, potential solutions

**Keywords:**
- Constraints: "cannot", "must not", "blocked by", "limited to"
- Assumptions: "assume", "believe", "think", "expect"
- Opportunities: "could", "might", "potential", "opportunity"

**Analysis Output:**
```javascript
{
  constraints: [
    {
      keyword: "cannot",
      context: "We cannot proceed without budget",
      user: "Alice"
    }
  ],
  assumptions: [...],
  opportunities: [...],
  timestamp: "2024-12-31T10:05:00Z"
}
```

### 2.6 Report Generation

**Comprehensive Reports Include:**
- Session overview (duration, participants, phases)
- Phase-by-phase findings
- Breakout room contributions
- Constraint/assumption/opportunity analysis
- Action items extraction
- Recommendations

---

## 3. Service Layer (8 Client Services)

### 3.1 API Service (api.js - 215 lines)

**Central API client for all backend communication**

**Endpoints:**
- Charette CRUD operations
- Participant management
- Message handling
- Phase progression
- Breakout room operations
- Report generation
- AI analysis requests

**Key Methods:**
```javascript
// Session Management
getCharettes()
createCharette(data)
getCharette(id)
addParticipant(id, userName, role)

// Messaging
getMessages(id, roomId, after)
sendMessage(id, messageData)

// Phase Control
changePhase(id, action)
nextPhase(id)

// Breakout Rooms
createBreakoutRooms(id, count, questions)
joinBreakoutRoom(id, roomId, userName)
leaveBreakoutRoom(id, roomId, userName)

// Reporting & Analysis
generateReport(id)
analyzeIntent(text, id, userName)
extractAssumptions(text, id, userName)
generateClarifications(text, context, id)
getAIInsights(id)
```

### 3.2 Advocacy Service (advocacyService.js - 360 lines)

**Firebase Firestore operations for advocacy module**

**Collections Managed:**
- advocacyUsers - User profiles
- learningPaths - Learning journeys
- userProgress - Completion tracking
- scenarios - Practice scenarios
- peerSupportScripts - Affirmations
- communityNeeds - Reported needs
- advocacyBriefs - Generated briefs
- servantLeadershipAssessments - Assessments
- practiceCommitments - User goals
- resources - Resource directory
- moduleFeedback - User feedback

**Key Operations:**
```javascript
// User Management
getAdvocacyUser(userId)
createAdvocacyUser(userData)

// Learning
getLearningPaths(ageGroup, role)
getUserProgress(userId)
saveModuleProgress(progressData)
completePathForUser(userId, pathId)

// Scenarios
getScenarios(filters)

// Community Needs
getCommunityNeeds()
createNeedReport(reportData)
upvoteNeed(needId)

// Advocacy Briefs
getAdvocacyBriefs(userId)
createAdvocacyBrief(briefData)

// Leadership
getLatestAssessment(userId)
saveAssessment(assessmentData)
getActiveCommitments(userId)
createCommitment(commitmentData)
```

### 3.3 Gamification Service (gamificationService.js - 462 lines)

**Points, badges, levels, and achievements**

**Points System (27 actions):**
- Complete onboarding: 50 points
- Complete learning path: 100 points
- Complete scenario: 30 points
- Create advocacy brief: 60 points
- Daily login: 5 points
- Weekly streak: 25 points

**Badge System:**
- Bronze tier: First achievements
- Silver tier: Intermediate achievements
- Gold tier: Master achievements
- Special tier: Unique achievements

**Categories:**
- Getting Started
- Learning
- Peer Support
- Community Advocacy
- Leadership Development
- Scenario Mastery
- Consistency

**Level System (10 levels):**
1. Newcomer (0-99 points)
2. Learner (100-249)
3. Practitioner (250-499)
4. Advocate (500-999)
5. Champion (1000-1999)
6. Leader (2000-3999)
7. Mentor (4000-7999)
8. Hero (8000-15999)
9. Legend (16000-31999)
10. Icon (32000+)

**Key Methods:**
```javascript
getUserLevel(totalPoints)
getLevelProgress(totalPoints)
awardPoints(userId, action, amount)
checkBadges(userId, action, count)
getUserStats(userId)
getLeaderboard(timeframe, limit)
trackAction(userId, action, metadata)
```

### 3.4 Research Service (researchService.js - 309 lines)

**Academic research integration**

**Sources:**
- PubMed - Medical/health research
- Google Scholar - Cross-disciplinary
- JSTOR - Social sciences
- arXiv - Preprints
- Semantic Scholar - AI-powered
- ERIC - Education research
- SSRN - Social science

**Domains:**
- Peer support
- Youth development
- Community organizing
- Policy advocacy
- Servant leadership
- Behavioral change
- Social determinants
- Civic engagement

**Key Methods:**
```javascript
searchAcademicArticles(query, options)
getArticleDetails(articleId, source)
testHypothesis(hypothesis, domain, evidenceLevel)
getCitationNetwork(articleId)
generateLiteratureReview(topic, options)
```

### 3.5 Community Intelligence Service (communityIntelligenceService.js - 13,255 bytes)

**Multi-level community data gathering**

**Data Sources:**
- US Census Bureau API
- Bureau of Labor Statistics
- Department of Education
- HUD (Housing data)
- CDC (Health data)
- Local government APIs

**Categories:**
- Demographics
- Economics
- Education
- Housing
- Health
- Transportation
- Safety
- Environment

**Geographic Levels:**
- Community (neighborhood)
- County
- State
- Federal

**Key Methods:**
```javascript
getCommunityProfile(location, categories)
getCountyData(countyFIPS, categories)
getStateData(stateCode, categories)
getFederalPolicies(domain)
identifyGaps(communityData)
compareLocations(locations)
generateCommunityReport(location)
```

### 3.6 PDF Generator Service (pdfGenerator.js - 20,885 bytes)

**Professional PDF document generation**

**Report Types:**
- Charette session reports
- Advocacy briefs
- Community profiles
- Assessment results
- Learning certificates

**Features:**
- Professional formatting
- Charts and graphs
- Tables and data visualization
- Custom branding
- Multi-page layouts
- Table of contents
- Appendices

### 3.7 Settings Service (settingsService.js - 6,205 bytes)

**User preferences and application settings**

**Categories:**
- User preferences
- Notification settings
- Privacy settings
- Accessibility options
- Display preferences

### 3.8 Additional Services

- **pdfGeneratorAppendix.js** (20,572 bytes) - Extended PDF features
- **firebase.js** - Firebase configuration and initialization

---

## 4. Database Schema

### 4.1 Firebase Firestore Collections

**charettes**
```javascript
{
  id: string,
  title: string,
  currentPhase: number (0-5),
  createdAt: timestamp,
  participants: array,
  breakoutRooms: array,
  analysis: array,
  status: 'active' | 'completed'
}
```

**messages**
```javascript
{
  id: string,
  charetteId: string,
  roomId: string,
  userName: string,
  role: string,
  text: string,
  timestamp: timestamp,
  aiAnalysis: object
}
```

**advocacyUsers**
```javascript
{
  id: string,
  userName: string,
  totalPoints: number,
  level: number,
  badges: array,
  completedLessons: array,
  streaks: {
    current: number,
    longest: number,
    lastActivity: timestamp
  }
}
```

**learningPaths**
```javascript
{
  id: string,
  title: string,
  modules: array,
  level: number,
  targetAgeGroup: array,
  isActive: boolean
}
```

**scenarios**
```javascript
{
  id: string,
  title: string,
  difficulty: number,
  constraintType: string,
  choices: array,
  targetAgeGroup: array
}
```

**communityNeeds**
```javascript
{
  id: string,
  title: string,
  category: string,
  location: object,
  urgency: string,
  upvotes: number,
  status: string
}
```

**advocacyBriefs**
```javascript
{
  id: string,
  title: string,
  content: {
    problemStatement: string,
    proposedSolutions: array,
    evidenceBase: array
  },
  status: 'draft' | 'published'
}
```

---

## 5. Complete API Reference

### 5.1 Charette Endpoints

**GET /api/charettes**
- List all sessions

**POST /api/charettes**
- Create new session
- Body: `{ title, description }`

**GET /api/charettes/:id**
- Get session details

**POST /api/charettes/:id/participants**
- Add participant
- Body: `{ userName, role }`

**GET /api/charettes/:id/messages**
- Get messages
- Query: `roomId`, `after`

**POST /api/charettes/:id/phase**
- Change phase
- Body: `{ action: 'next' }`

**POST /api/charettes/:id/breakout-rooms**
- Create breakout rooms
- Body: `{ roomCount, questions }`

**GET /api/charettes/:id/report**
- Generate comprehensive report

**GET /api/charettes/:id/ai-insights**
- Get AI analysis dashboard

### 5.2 AI Analysis Endpoints

**POST /api/reasoning/analyze**
- Analyze text with reasoning algorithms
- Body: `{ text, type, charetteId }`

**POST /api/ai/analyze-intent**
- Analyze message intent
- Body: `{ text, charetteId, userName }`

**POST /api/ai/extract-assumptions**
- Extract assumptions
- Body: `{ text, charetteId, userName }`

**POST /api/ai/generate-clarifications**
- Generate clarification questions
- Body: `{ text, context, charetteId }`

**POST /api/ai/map-positions**
- Map participant positions
- Body: `{ charetteId }`

---

## 6. AI Features

### 6.1 Intent Analysis

**Classifies messages into 6 categories:**
- Concern - Risks, problems, worries
- Proposal - Suggestions, recommendations
- Inquiry - Questions, clarifications
- Agreement - Support, endorsement
- Disagreement - Opposition, alternatives
- Statement - General information

**Detects motivations:**
- Efficiency
- Cost-effectiveness
- Quality
- User-focus
- Innovation

### 6.2 Assumption Extraction

**Detects:**
- Explicit assumptions ("assume", "presume")
- Implicit assumptions ("obviously", "clearly")
- Absolute language ("always", "never")
- Certainty markers ("definitely", "certainly")

**Generates challenge questions:**
- "What evidence supports this assumption?"
- "What would happen if this were false?"
- "Are there alternative perspectives?"

**Identifies biases:**
- Absolutism
- Certainty bias
- Groupthink
- Confirmation bias

### 6.3 Clarification Generator

**Detects ambiguity:**
- Vague terms ("thing", "stuff", "it")
- Unclear pronouns
- Undefined quantities ("some", "many")

**Generates follow-up questions:**
- Decision criteria questions
- Root cause questions
- Drawback exploration
- Success metric definition

### 6.4 Position Mapping

**Tracks:**
- Individual participant stances
- Key themes per participant
- Agreement patterns
- Disagreement patterns
- Position evolution over time

---

## 7. Frontend Application

### 7.1 Component Structure

**Main Components:**
- HomePage.jsx - Landing page
- AboutPage.jsx - About page
- ProductsPage.jsx - Products showcase
- GuidedTour.jsx - Onboarding tour
- DemoRequestModal.jsx - Demo request

**Advocacy Module (24 components):**
- AdvocacyModule.jsx - Main container
- LearningJourneys.jsx - Learning paths
- ScenarioEngine.jsx - Practice scenarios
- GamificationProgress.jsx - Points/levels
- Leaderboard.jsx - Rankings
- CommunityNeeds.jsx - Needs mapping
- AdvocacyBriefBuilder.jsx - Brief creation
- ServantLeadership.jsx - Leadership dev
- ResourceNavigator.jsx - Resources
- And 15 more specialized components

### 7.2 State Management

**React Hooks Pattern:**
- useState for local state
- useEffect for side effects
- Custom usePolling hook for near-realtime updates

**Polling Strategy:**
- Message polling: 3 seconds
- Charette updates: 6 seconds
- Optimistic UI updates

---

## 8. Deployment

### 8.1 Current Setup

**Frontend:**
- Vercel hosting
- Automatic deployment from GitHub
- Global CDN distribution
- SSL/TLS encryption

**Backend:**
- Firebase Cloud Functions
- Firestore database
- Firebase Authentication
- Firebase Storage

### 8.2 Environment Variables

**Required:**
- REACT_APP_API_URL
- REACT_APP_FIREBASE_API_KEY
- REACT_APP_FIREBASE_AUTH_DOMAIN
- REACT_APP_FIREBASE_PROJECT_ID
- REACT_APP_FIREBASE_STORAGE_BUCKET
- REACT_APP_FIREBASE_MESSAGING_SENDER_ID
- REACT_APP_FIREBASE_APP_ID

---

## 9. Key Features Summary

### 9.1 Charette Platform

- Real-time collaborative sessions
- 6-phase structured process
- Breakout room system with dynamic questions
- AI-powered constraint/assumption analysis
- Automated report generation
- Role-based access (Analyst, PM, Participant)
- WebSocket-based real-time updates

### 9.2 Advocacy Module

- 20+ interactive learning paths
- 50+ practice scenarios
- Gamification (points, badges, 10 levels)
- Community needs mapping
- Advocacy brief builder
- Servant leadership development
- Resource navigator
- Youth-friendly practice room

### 9.3 Research & Intelligence

- Academic research integration (7 sources)
- Hypothesis testing framework
- Community intelligence gathering
- Multi-level data (community, county, state, federal)
- Gap analysis
- Literature review generation

### 9.4 Technical Capabilities

- Sub-second message delivery
- 50+ concurrent users per session
- Real-time database synchronization
- Automatic reconnection handling
- Cross-tab state synchronization
- Professional PDF generation
- Comprehensive API (25+ endpoints)

---

## 10. Performance Metrics

**Platform Performance:**
- Message latency: <100ms
- Database query time: <200ms
- Report generation: <5 seconds
- PDF generation: <10 seconds
- WebSocket reconnection: <2 seconds

**User Capacity:**
- Concurrent sessions: 100+
- Users per session: 50+
- Messages per second: 100+
- Database operations/sec: 1000+

---

**Document End**

*For technical support or questions, contact: support@wickenterprises.com*
