# Servant Advocacy & Peer Support Module - Integration Guide

## Overview

The Servant Advocacy & Peer Support module is a comprehensive feature set designed to teach, coach, and respond to community needs in real time, while surfacing where governmental and institutional constraints create gaps.

## Module Structure

### Core Components

```
client/src/components/advocacy/
├── AdvocacyModule.jsx          # Main module container with tab navigation
├── OnboardingQuiz.jsx          # User profile setup and role identification
├── LearningJourneys.jsx        # Learning path browser and progress tracker
├── MicroLesson.jsx             # Individual lesson with scenarios and reflections
├── ScenarioEngine.jsx          # Interactive constraint-based scenarios
├── PeerSupportTools.jsx        # Tools container with three sub-tools
├── AffirmationBuilder.jsx      # Create peer support affirmations
├── AccountabilityCoach.jsx     # Practice accountability with kindness
├── YouthPracticeRoom.jsx       # Kid-friendly peer support practice
├── CommunityNeeds.jsx          # Needs reporting and tracking
├── NeedReportForm.jsx          # Form for reporting community needs
├── NeedsHeatmap.jsx            # Visual analytics of reported needs
├── AdvocacyBriefBuilder.jsx    # Turn needs into advocacy documents
├── ServantLeadership.jsx       # Leadership development hub
├── LeadershipAssessment.jsx    # Self-assessment tool
├── PracticeCommitments.jsx     # Weekly practice commitments
├── TeamTrainings.jsx           # Group training modules
├── ResourceNavigator.jsx       # Community resource directory
└── FeedbackHub.jsx             # User feedback and co-creation
```

### Service Layer

```
client/src/services/advocacyService.js
```

Handles all Firebase Firestore operations for the advocacy module.

## Integration Steps

### 1. Add to Main App Navigation

Update `client/src/App.js` to include the Advocacy module as a top-level navigation option:

```javascript
import { Heart } from 'lucide-react'; // Add to imports
import AdvocacyModule from './components/advocacy/AdvocacyModule';

// In the charette list screen, add a new section or button:
<div className="mb-8">
  <Card className="bg-gradient-to-r from-pink-50 to-purple-50 border-pink-200">
    <CardHeader>
      <div className="flex items-center space-x-3">
        <Heart className="h-8 w-8 text-pink-600" />
        <div>
          <CardTitle>Servant Advocacy & Peer Support</CardTitle>
          <CardDescription>
            Learn, practice, and advocate for positive change in your community
          </CardDescription>
        </div>
      </div>
    </CardHeader>
    <CardContent>
      <Button onClick={() => setShowAdvocacyModule(true)} size="lg">
        Enter Advocacy Module
      </Button>
    </CardContent>
  </Card>
</div>

// Add state management:
const [showAdvocacyModule, setShowAdvocacyModule] = useState(false);

// Add conditional rendering:
if (showAdvocacyModule) {
  return <AdvocacyModule user={user} onBack={() => setShowAdvocacyModule(false)} />;
}
```

### 2. Update AdvocacyModule.jsx

Add a back button to return to the main app:

```javascript
// In AdvocacyModule.jsx header section:
{onBack && (
  <Button variant="ghost" onClick={onBack} className="mb-4">
    <ArrowLeft className="h-4 w-4 mr-2" />
    Back to Main App
  </Button>
)}
```

### 3. Firebase Setup

Ensure Firebase is properly configured in `client/src/firebase.js` and create the necessary Firestore collections:

```javascript
// Collections needed:
- advocacyUsers
- learningPaths
- userProgress
- scenarios
- communityNeeds
- advocacyBriefs
- peerSupportScripts
- servantLeadershipAssessments
- practiceCommitments
- resources
- peerCircles
- coCreationSubmissions
- moduleFeedback
```

### 4. Firestore Security Rules

Add the security rules from `ADVOCACY_MODULE_SCHEMA.md` to your `firestore.rules` file.

### 5. Firestore Indexes

Create composite indexes in Firebase Console:

**advocacyUsers:**
- `ageGroup` (Ascending) + `role` (Ascending)

**userProgress:**
- `userId` (Ascending) + `pathId` (Ascending) + `moduleId` (Ascending)
- `userId` (Ascending) + `status` (Ascending)

**scenarios:**
- `targetAgeGroup` (Array) + `difficulty` (Ascending)
- `tags` (Array)

**communityNeeds:**
- `domain` (Ascending) + `reportedAt` (Descending)
- `status` (Ascending) + `reportedAt` (Descending)
- `tags` (Array)

**learningPaths:**
- `isActive` (Ascending) + `level` (Ascending)

**servantLeadershipAssessments:**
- `userId` (Ascending) + `assessmentDate` (Descending)

**practiceCommitments:**
- `userId` (Ascending) + `completed` (Ascending)

**resources:**
- `type` (Ascending)
- `location` (Ascending)
- `tags` (Array)

## Sample Data Seeding

### Learning Paths

Create initial learning paths in Firestore:

```javascript
// Example learning path
{
  title: "Introduction to Positive Peer Support",
  description: "Learn the foundations of supporting peers with strength-based approaches",
  targetAgeGroup: ["youth", "adult"],
  targetRoles: ["student", "parent", "educator"],
  level: 1,
  estimatedMinutes: 15,
  prerequisites: [],
  isActive: true,
  modules: [
    {
      id: "module-1",
      title: "What is Positive Peer Support?",
      content: "Positive peer support means recognizing the strengths in others and helping them build on those strengths...",
      scenario: {
        situation: "Your friend is struggling with a difficult class...",
        options: [
          {
            id: "opt-1",
            text: "Tell them they're smart and can do it"
          },
          {
            id: "opt-2",
            text: "Say 'I've seen you work through hard things before. What helped you then?'"
          }
        ],
        feedback: {
          "opt-1": {
            alignment: "constrained",
            explanation: "While encouraging, this doesn't help them identify their own strengths and strategies."
          },
          "opt-2": {
            alignment: "positive_support",
            explanation: "Perfect! You're helping them recognize their own resilience and problem-solving abilities."
          }
        }
      },
      reflectionPrompts: [
        "Think of a time someone supported you well. What did they do?",
        "How can you apply positive peer support in your daily life?"
      ],
      keyTakeaways: [
        "Positive peer support recognizes existing strengths",
        "It helps people build on what's already working",
        "It believes in people's capacity to solve their own problems"
      ]
    }
  ]
}
```

### Scenarios

```javascript
// Example scenario
{
  title: "School Discipline Policy",
  description: "Navigate a zero-tolerance policy while supporting a friend",
  context: "Your school has a strict zero-tolerance policy for fighting...",
  constraintType: "school_policy",
  targetAgeGroup: ["youth"],
  targetRoles: ["student"],
  situation: "Your friend got into a fight defending someone being bullied...",
  difficulty: 2,
  isActive: true,
  actions: [
    {
      id: "action-1",
      text: "Tell the principal the policy is unfair",
      alignment: "constrained",
      explanation: "While the policy may be unfair, this approach is unlikely to help your friend immediately."
    },
    {
      id: "action-2",
      text: "Support your friend emotionally and help them prepare for the disciplinary meeting",
      alignment: "positive_support",
      explanation: "Great! You're providing immediate peer support while the policy process unfolds."
    }
  ],
  outcomes: {
    "action-1": "The principal explains they must follow the policy. Your friend still faces consequences.",
    "action-2": "Your friend feels supported and prepared. You help them articulate what happened clearly."
  },
  whatInControl: {
    individual: [
      "Be there for your friend emotionally",
      "Help them prepare their statement",
      "Attend the meeting if allowed"
    ],
    peer: [
      "Organize peers to write support letters",
      "Document what actually happened",
      "Show up for your friend during the process"
    ],
    policyChange: [
      "Request a policy review with student input",
      "Present data on zero-tolerance impacts",
      "Propose alternative approaches to the school board"
    ]
  },
  advocacySteps: [
    "Document the situation and policy impact",
    "Request a meeting with school administration",
    "Present alternative approaches backed by research",
    "Organize student and parent voices",
    "Follow up with school board if needed"
  ],
  tags: ["school", "discipline", "bullying", "zero-tolerance"]
}
```

### Resources

```javascript
// Example resource
{
  name: "City Youth Services",
  type: "agency",
  description: "Provides support services for youth ages 12-24",
  canDo: [
    "Mental health counseling",
    "Educational support and tutoring",
    "Job readiness training",
    "Crisis intervention"
  ],
  cannotDo: [
    "Cannot provide housing directly (can refer)",
    "Cannot override school disciplinary decisions",
    "Cannot provide legal representation"
  ],
  eligibility: "Youth ages 12-24 residing in the city",
  contactInfo: {
    phone: "(555) 123-4567",
    email: "info@cityyouthservices.org",
    website: "https://cityyouthservices.org",
    address: "123 Main St, City, State 12345"
  },
  hours: "Monday-Friday 9am-5pm, Crisis line 24/7",
  languages: ["English", "Spanish"],
  location: "Downtown",
  tags: ["youth", "mental-health", "education", "employment"],
  isActive: true
}
```

## Configuration Options

The module can be configured for different contexts:

### Target User Groups

Set in the onboarding quiz:
- **Age Groups:** youth, adult
- **Roles:** student, parent, faith_leader, nonprofit_staff, educator, social_worker, community_organizer

### Primary Concerns

Users select from:
- Housing & Homelessness
- Education & Schools
- Mental Health
- Benefits & Social Services
- Justice System
- Healthcare Access
- Employment
- Food Security
- Youth Development
- Family Support

### Constraint Types

Scenarios can focus on:
- school_policy
- benefits_rule
- housing_regulation
- justice_system
- healthcare_access
- eligibility
- funding
- communication

## Accessibility Features

The module includes:
- Keyboard navigation support
- Screen reader friendly labels
- Clear visual hierarchy
- High contrast text
- Simple, plain language
- Youth-friendly interfaces (Youth Practice Room)
- Progress indicators
- Clear feedback on actions

## Analytics & Reporting

The module tracks:
- Learning path completion rates
- Scenario performance
- Community needs by domain and constraint type
- Advocacy brief creation and status
- Leadership assessment scores over time
- Practice commitment completion rates
- Resource usage patterns
- User feedback and satisfaction

## Customization

### For Different Organizations

1. **Schools:** Focus on education scenarios, school policies, youth development
2. **Nonprofits:** Emphasize benefits navigation, housing, social services
3. **Faith Communities:** Highlight servant leadership, community support, advocacy
4. **Government Agencies:** Focus on policy constraints, institutional advocacy

### Content Updates

Add new content by creating documents in Firestore:
- Learning paths and modules
- Scenarios with local policy contexts
- Resources specific to your area
- Team trainings for your context

## Best Practices

1. **Start with Onboarding:** Ensure users complete the quiz to get personalized content
2. **Encourage Progression:** Lock advanced paths until prerequisites are complete
3. **Regular Feedback:** Prompt users for feedback after each module
4. **Community Building:** Use peer circles to create ongoing support
5. **Action-Oriented:** Always connect learning to concrete actions
6. **Constraint-Aware:** Clearly distinguish what's in users' control vs. requires policy change
7. **Strength-Based:** Focus on capacity and resilience, not deficits
8. **Youth-Friendly:** Use age-appropriate language and scenarios

## Troubleshooting

### Common Issues

**Module not loading:**
- Check Firebase configuration
- Verify Firestore collections exist
- Check browser console for errors

**User progress not saving:**
- Verify advocacyService.js is properly imported
- Check Firestore security rules
- Ensure user is authenticated

**Scenarios not filtering correctly:**
- Verify user profile has ageGroup and role set
- Check scenario targetAgeGroup and targetRoles arrays
- Review filter logic in ScenarioEngine.jsx

## Future Enhancements

Potential additions:
- Mobile app version
- Offline mode support
- Peer-to-peer messaging
- Video content integration
- Gamification elements
- Certificate generation
- Multi-language support
- AI-powered scenario generation
- Integration with external advocacy tools
- Real-time collaboration features

## Support

For questions or issues:
1. Review this documentation
2. Check the database schema in ADVOCACY_MODULE_SCHEMA.md
3. Review component code and inline comments
4. Test with sample data before deploying to production
