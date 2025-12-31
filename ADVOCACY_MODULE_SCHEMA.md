# Servant Advocacy & Peer Support Module - Database Schema

## Collections Overview

### 1. `advocacyUsers` Collection
User profiles for the advocacy module with personalized settings.

```javascript
{
  id: "string", // Auto-generated document ID
  userId: "string", // Firebase Auth user ID
  ageGroup: "string", // 'youth', 'adult'
  role: "string", // 'student', 'parent', 'faith_leader', 'nonprofit_staff', etc.
  primaryConcerns: "array", // ['housing', 'education', 'mental_health', 'benefits', 'justice']
  completedPaths: "array", // Array of completed learning path IDs
  currentLevel: "number", // Current progression level
  createdAt: "timestamp",
  updatedAt: "timestamp",
  affirmations: "array", // Saved affirmation scripts
  practiceCommitments: "array" // Active servant leadership commitments
}
```

### 2. `learningPaths` Collection
Structured learning journeys with micro-lessons.

```javascript
{
  id: "string",
  title: "string",
  description: "string",
  targetAgeGroup: "array", // ['youth', 'adult']
  targetRoles: "array", // Roles this path is relevant for
  level: "number", // Progression level (1-5)
  modules: "array", // Array of module objects
  estimatedMinutes: "number",
  prerequisites: "array", // IDs of paths that must be completed first
  createdAt: "timestamp",
  isActive: "boolean"
}
```

**Module Structure:**
```javascript
{
  id: "string",
  title: "string",
  content: "string", // Rich text content
  scenario: {
    situation: "string",
    options: "array", // Multiple choice options
    feedback: "object" // Feedback for each option
  },
  reflectionPrompts: "array",
  keyTakeaways: "array"
}
```

### 3. `userProgress` Collection
Tracks user progress through learning paths.

```javascript
{
  id: "string",
  userId: "string",
  pathId: "string",
  moduleId: "string",
  status: "string", // 'not_started', 'in_progress', 'completed'
  selectedOptions: "array", // User's choices in scenarios
  reflections: "array", // User's written reflections
  completedAt: "timestamp",
  timeSpent: "number" // Minutes
}
```

### 4. `scenarios` Collection
Interactive scenarios tied to real constraints.

```javascript
{
  id: "string",
  title: "string",
  description: "string",
  context: "string", // Background information
  constraintType: "string", // 'school_policy', 'benefits_rule', 'housing_regulation', etc.
  targetAgeGroup: "array",
  targetRoles: "array",
  situation: "string",
  actions: "array", // Available action options
  outcomes: "object", // Outcomes for each action
  advocacySteps: "array", // Concrete next steps
  whatInControl: {
    individual: "array",
    peer: "array",
    policyChange: "array"
  },
  tags: "array",
  difficulty: "number", // 1-5
  createdAt: "timestamp",
  isActive: "boolean"
}
```

**Action Structure:**
```javascript
{
  id: "string",
  text: "string",
  alignment: "string", // 'positive_support', 'constrained', 'harmful'
  explanation: "string",
  nextSteps: "array"
}
```

### 5. `communityNeeds` Collection
Reports of community needs and constraints.

```javascript
{
  id: "string",
  reportedBy: "string", // User ID
  reporterRole: "string",
  domain: "string", // 'school', 'housing', 'healthcare', 'benefits', 'justice', 'other'
  constraintType: "string", // 'policy_rule', 'lack_of_service', 'wait_times', 'access', 'communication'
  description: "string",
  impact: "string",
  location: "string", // Optional geographic area
  affectedPopulation: "string",
  status: "string", // 'reported', 'being_addressed', 'requires_policy_change', 'resolved'
  supportType: "string", // 'peer_support', 'institutional_advocacy', 'both'
  tags: "array",
  upvotes: "number",
  reportedAt: "timestamp",
  updatedAt: "timestamp",
  isAnonymous: "boolean"
}
```

### 6. `advocacyBriefs` Collection
Structured advocacy documents created from stories.

```javascript
{
  id: "string",
  createdBy: "string", // User ID
  needId: "string", // Reference to communityNeeds document
  issue: "string",
  impact: "string",
  relevantPolicy: "string",
  requestedChange: "string",
  supportingData: "array",
  targetAudience: "array", // ['school_board', 'city_council', 'agency_director']
  status: "string", // 'draft', 'submitted', 'under_review', 'implemented'
  createdAt: "timestamp",
  updatedAt: "timestamp"
}
```

### 7. `peerSupportScripts` Collection
User-created affirmations and accountability messages.

```javascript
{
  id: "string",
  createdBy: "string",
  type: "string", // 'affirmation', 'accountability'
  situation: "string",
  script: "string",
  tags: "array",
  isPublic: "boolean",
  usageCount: "number",
  helpfulVotes: "number",
  createdAt: "timestamp"
}
```

### 8. `servantLeadershipAssessments` Collection
Self-assessment results and growth tracking.

```javascript
{
  id: "string",
  userId: "string",
  assessmentDate: "timestamp",
  scores: {
    humility: "number",
    activeListening: "number",
    empathy: "number",
    emotionalIntelligence: "number",
    bigPictureThinking: "number",
    opennessToFeedback: "number",
    balancingGoals: "number"
  },
  strengths: "array",
  growthAreas: "array",
  notes: "string"
}
```

### 9. `practiceCommitments` Collection
Weekly servant leadership practice commitments.

```javascript
{
  id: "string",
  userId: "string",
  trait: "string", // Which leadership trait
  commitment: "string", // Specific behavior to practice
  weekStarting: "timestamp",
  reflections: "array", // Daily/weekly reflections
  completed: "boolean",
  impact: "string" // What changed
}
```

### 10. `resources` Collection
Community resource directory.

```javascript
{
  id: "string",
  name: "string",
  type: "string", // 'agency', 'program', 'legal_aid', 'housing', 'education'
  description: "string",
  canDo: "array", // What they can help with
  cannotDo: "array", // Limitations under current rules
  contactInfo: {
    phone: "string",
    email: "string",
    website: "string",
    address: "string"
  },
  eligibility: "string",
  hours: "string",
  languages: "array",
  location: "string",
  tags: "array",
  verifiedAt: "timestamp",
  isActive: "boolean"
}
```

### 11. `peerCircles` Collection
Peer-led support groups.

```javascript
{
  id: "string",
  name: "string",
  description: "string",
  facilitator: "string", // User ID
  meetingType: "string", // 'online', 'in_person', 'hybrid'
  schedule: "string",
  maxParticipants: "number",
  currentParticipants: "array", // User IDs
  focusAreas: "array",
  nextMeeting: "timestamp",
  isActive: "boolean",
  createdAt: "timestamp"
}
```

### 12. `coCreationSubmissions` Collection
User-submitted content for the module.

```javascript
{
  id: "string",
  submittedBy: "string",
  type: "string", // 'scenario', 'affirmation', 'leadership_dilemma'
  content: "object", // Varies by type
  status: "string", // 'pending', 'approved', 'rejected', 'needs_revision'
  moderatorNotes: "string",
  submittedAt: "timestamp",
  reviewedAt: "timestamp"
}
```

### 13. `moduleFeedback` Collection
User feedback on modules and features.

```javascript
{
  id: "string",
  userId: "string",
  moduleType: "string", // 'learning_path', 'scenario', 'tool'
  moduleId: "string",
  wasHelpful: "boolean",
  stillStuck: "string", // Where they feel stuck
  suggestions: "string",
  rating: "number", // 1-5
  submittedAt: "timestamp"
}
```

## Data Relationships

```
advocacyUsers (1) ──── (many) userProgress
    │
    ├── (many) communityNeeds
    ├── (many) advocacyBriefs
    ├── (many) peerSupportScripts
    ├── (many) servantLeadershipAssessments
    ├── (many) practiceCommitments
    └── (many) moduleFeedback

learningPaths (1) ──── (many) userProgress

scenarios (1) ──── (many) userProgress

peerCircles (1) ──── (many) advocacyUsers (participants)

communityNeeds (1) ──── (1) advocacyBriefs
```

## Indexes Required

### advocacyUsers
- Index on `userId` (unique)
- Composite index on `ageGroup` + `role`

### userProgress
- Composite index on `userId` + `pathId` + `moduleId`
- Index on `userId` + `status`

### scenarios
- Composite index on `targetAgeGroup` + `difficulty`
- Index on `tags` (array-contains)

### communityNeeds
- Composite index on `domain` + `reportedAt` (descending)
- Composite index on `status` + `reportedAt` (descending)
- Index on `tags` (array-contains)

### resources
- Index on `type`
- Index on `location`
- Index on `tags` (array-contains)

### peerCircles
- Index on `isActive`
- Composite index on `nextMeeting` + `isActive`

## Security Rules

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    
    // Advocacy users can read/write their own profile
    match /advocacyUsers/{userId} {
      allow read: if request.auth != null;
      allow write: if request.auth != null && request.auth.uid == userId;
    }
    
    // Learning paths are readable by all authenticated users
    match /learningPaths/{pathId} {
      allow read: if request.auth != null;
      allow write: if request.auth != null && 
        get(/databases/$(database)/documents/users/$(request.auth.uid)).data.role == 'admin';
    }
    
    // User progress is private
    match /userProgress/{progressId} {
      allow read, write: if request.auth != null && 
        resource.data.userId == request.auth.uid;
    }
    
    // Scenarios are readable by all
    match /scenarios/{scenarioId} {
      allow read: if request.auth != null;
      allow write: if request.auth != null && 
        get(/databases/$(database)/documents/users/$(request.auth.uid)).data.role == 'admin';
    }
    
    // Community needs can be read by all, written by authenticated users
    match /communityNeeds/{needId} {
      allow read: if request.auth != null;
      allow create: if request.auth != null;
      allow update, delete: if request.auth != null && 
        (resource.data.reportedBy == request.auth.uid || 
         get(/databases/$(database)/documents/users/$(request.auth.uid)).data.role == 'admin');
    }
    
    // Resources are readable by all
    match /resources/{resourceId} {
      allow read: if request.auth != null;
      allow write: if request.auth != null && 
        get(/databases/$(database)/documents/users/$(request.auth.uid)).data.role == 'admin';
    }
    
    // Peer circles
    match /peerCircles/{circleId} {
      allow read: if request.auth != null;
      allow create: if request.auth != null;
      allow update, delete: if request.auth != null && 
        resource.data.facilitator == request.auth.uid;
    }
    
    // Co-creation submissions
    match /coCreationSubmissions/{submissionId} {
      allow read: if request.auth != null;
      allow create: if request.auth != null;
      allow update: if request.auth != null && 
        (resource.data.submittedBy == request.auth.uid || 
         get(/databases/$(database)/documents/users/$(request.auth.uid)).data.role == 'admin');
    }
    
    // Feedback is private to user and admins
    match /moduleFeedback/{feedbackId} {
      allow read, write: if request.auth != null && 
        (resource.data.userId == request.auth.uid || 
         get(/databases/$(database)/documents/users/$(request.auth.uid)).data.role == 'admin');
    }
  }
}
```
