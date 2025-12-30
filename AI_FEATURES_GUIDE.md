# AI-Powered Continuous Questioning System

## Overview

The Charette System now features **AI-powered continuous questioning** that replaces traditional realtime chat with intelligent, asynchronous dialogue analysis. This system understands participant intent, challenges assumptions, and guides discussions toward meaningful outcomes.

---

## 🧠 Core AI Features

### 1. Intent Analysis

**Purpose**: Understand the underlying purpose and motivation behind participant statements.

**How It Works**:
- Analyzes message text using pattern matching and keyword detection
- Classifies primary intent into categories
- Identifies emotional tone and underlying motivations
- Stores analysis for trend tracking

**Intent Categories**:
- **Concern**: Identifies risks, problems, or worries
- **Proposal**: Detects suggestions or recommendations
- **Inquiry**: Recognizes questions or requests for clarification
- **Agreement**: Spots support or endorsement
- **Disagreement**: Flags opposition or alternative views
- **Statement**: General information sharing

**Motivations Detected**:
- Efficiency (speed, time-saving)
- Cost-effectiveness (budget, affordability)
- Quality (excellence, superiority)
- User-focus (customer-centric)
- Innovation (creativity, novelty)

**Example**:
```javascript
Input: "I'm concerned that this approach might be too expensive for our budget"

Output: {
  primary: "concern",
  confidence: 0.75,
  underlyingMotivations: ["cost-effectiveness"],
  emotionalTone: "concerned"
}
```

---

### 2. Assumption Extraction

**Purpose**: Surface hidden assumptions and cognitive biases that may limit thinking.

**Detection Patterns**:
- Explicit assumptions: "assume", "presume", "suppose"
- Implicit assumptions: "obviously", "clearly", "everyone knows"
- Absolute language: "always", "never", "all", "none"
- Certainty markers: "definitely", "certainly", "undoubtedly"

**Challenge Questions Generated**:
1. "What evidence supports this assumption?"
2. "What would happen if this assumption were false?"
3. "Are there alternative perspectives on this?"

**Bias Detection**:
- **Absolutism**: Use of absolute language
- **Certainty Bias**: Overconfidence markers
- **Groupthink**: "Everyone agrees" statements

**Example**:
```javascript
Input: "Obviously all users will prefer the new interface"

Output: {
  assumptions: ["all users will prefer the new interface"],
  challengingQuestions: [
    {
      assumption: "all users will prefer the new interface",
      questions: [
        "What evidence supports this assumption?",
        "What would happen if this assumption were false?",
        "Are there alternative perspectives on this?"
      ]
    }
  ],
  hiddenBiases: [
    { type: "absolutism", indicator: "absolute language detected" },
    { type: "certainty-bias", indicator: "overconfidence markers" }
  ]
}
```

---

### 3. Clarification Generator

**Purpose**: Identify ambiguity and generate targeted follow-up questions.

**Ambiguity Detection**:
- Vague terms: "thing", "stuff", "it", "that", "this"
- Pronouns without clear antecedents
- Undefined quantities: "some", "many", "few"

**Follow-Up Question Types**:
- **Decision Criteria**: "What are the specific criteria for making this decision?"
- **Root Cause**: "Can you describe the root cause of this problem?"
- **Drawbacks**: "What are the potential drawbacks of this approach?"
- **Success Metrics**: "How would you measure success?"

**Information Gap Detection**:
- Missing rationale (no "because", "since", "due to")
- Lacking evidence (no "data", "evidence", "example")
- Unclear outcomes (no "impact", "effect", "result")

**Example**:
```javascript
Input: "We should implement this solution soon"

Output: {
  ambiguousTerms: [
    { term: "this", suggestion: "Clarify what 'this' refers to" }
  ],
  followUpQuestions: [
    "What are the specific criteria for making this decision?",
    "How would you measure success?"
  ],
  missingInformation: [
    "Missing rationale or reasoning",
    "Unclear about expected outcomes"
  ],
  suggestedProbes: [
    "Can you provide a specific example?",
    "How does this relate to the overall goal?"
  ]
}
```

---

### 4. Position Mapping

**Purpose**: Visualize participant stances and track evolution of positions over time.

**Data Collected**:
- Individual participant stances
- Key themes per participant
- Agreement patterns
- Disagreement patterns
- Reasoning chains

**Position Map Structure**:
```javascript
{
  userName: "Alice",
  role: "participant",
  stances: [
    {
      text: "I believe we should prioritize user experience",
      intent: "proposal",
      timestamp: "2025-12-29T21:00:00.000Z"
    }
  ],
  keyThemes: ["user experience", "design"],
  agreementsWith: ["Bob", "Carol"],
  disagreementsWith: ["Dave"]
}
```

**Use Cases**:
- Identify consensus areas
- Spot divergence points
- Track position evolution
- Facilitate synthesis

---

### 5. AI Insights Dashboard

**Purpose**: Provide facilitators with real-time intelligence about the discussion.

**Insights Provided**:

#### Consensus Areas
- Topics with broad agreement
- Strength of consensus (weak, moderate, strong)
- Participating voices

#### Divergence Points
- Areas of disagreement
- Severity of divergence
- Key opposing viewpoints

#### Suggested Next Steps
- Based on discussion patterns
- Prioritized by importance
- Actionable recommendations

**Example Output**:
```javascript
{
  intentAnalysis: [
    { userName: "Alice", intent: { primary: "proposal" }, timestamp: "..." }
  ],
  assumptionAnalysis: [
    { userName: "Bob", assumptions: ["..."], timestamp: "..." }
  ],
  consensusAreas: [
    {
      topic: "User experience is priority",
      participants: ["Alice", "Bob", "Carol"],
      strength: "strong"
    }
  ],
  divergencePoints: [
    {
      topic: "Implementation timeline",
      participants: ["Dave", "Eve"],
      severity: "moderate"
    }
  ],
  suggestedNextSteps: [
    "Review and validate identified assumptions",
    "Synthesize diverse perspectives into common themes",
    "Generate follow-up questions for areas needing clarification"
  ]
}
```

---

## 🔄 Near-Realtime Implementation

### Polling Strategy

**Message Polling**:
- Interval: 3 seconds
- Fetches only new messages using `after` timestamp
- Stops when not in active charette

**Charette Updates Polling**:
- Interval: 6 seconds
- Checks for phase changes
- Updates breakout room status

**Optimistic UI**:
- Immediate feedback when sending messages
- Background sync with server
- Conflict resolution if needed

---

## 💡 Usage Patterns

### For Facilitators

**During Introduction Phase**:
1. Monitor intent analysis to gauge participant engagement
2. Use clarification suggestions to deepen understanding
3. Track emotional tone to adjust facilitation style

**During Analysis Phase**:
1. Review assumption extraction results
2. Challenge participants with generated questions
3. Map positions to identify patterns

**During Synthesis Phase**:
1. Use AI insights dashboard for consensus areas
2. Address divergence points systematically
3. Generate summary based on position maps

### For Participants

**Automatic Analysis**:
- Every message is analyzed for intent and assumptions
- Receive AI-generated clarification questions
- See how your position relates to others

**AI Feedback**:
- Understand how your statements are interpreted
- Challenge your own assumptions
- Refine arguments with follow-up questions

---

## 🎯 Best Practices

### Writing Effective Messages

**Be Specific**:
- ❌ "This won't work"
- ✅ "The proposed timeline conflicts with our Q2 product launch"

**Provide Rationale**:
- ❌ "We should use React"
- ✅ "We should use React because our team has 5 years of experience with it"

**Acknowledge Assumptions**:
- ❌ "Users will love this"
- ✅ "Based on our user research, we believe users will appreciate this feature"

**Use Concrete Language**:
- ❌ "It might be better"
- ✅ "The alternative approach reduces development time by 30%"

---

## 🔮 Future Enhancements

### Planned Features

**OpenAI Integration**:
- GPT-4 powered intent analysis
- More sophisticated assumption detection
- Natural language question generation

**Sentiment Analysis**:
- Track emotional trajectory
- Detect frustration or disengagement
- Suggest intervention points

**Argument Mapping**:
- Visual representation of reasoning chains
- Identify logical fallacies
- Strengthen weak arguments

**Consensus Prediction**:
- Predict likelihood of agreement
- Suggest compromise positions
- Identify blockers early

**Multi-Language Support**:
- Translate messages in real-time
- Cross-cultural communication patterns
- Localized assumption detection

---

## 🛠️ Technical Implementation

### API Integration

```javascript
// Analyze message intent
const intent = await apiService.analyzeIntent(
  messageText,
  charetteId,
  userName
);

// Extract assumptions
const assumptions = await apiService.extractAssumptions(
  messageText,
  charetteId,
  userName
);

// Generate clarifications
const clarifications = await apiService.generateClarifications(
  messageText,
  context,
  charetteId
);

// Get AI insights
const insights = await apiService.getAIInsights(charetteId);
```

### Custom Hook for Polling

```javascript
import { usePolling } from './hooks/usePolling';

// Poll for new messages every 3 seconds
usePolling(pollMessages, 3000, !!currentCharette?.id);
```

---

## 📊 Metrics & Analytics

### Tracked Metrics

**Engagement**:
- Messages per participant
- Average response time
- Active participation rate

**Quality**:
- Assumption detection rate
- Clarification question response rate
- Position evolution tracking

**Outcomes**:
- Consensus achievement rate
- Divergence resolution time
- Action item completion

---

## 🎓 Training & Onboarding

### For New Users

1. **Introduction**: Understand AI features overview
2. **Practice Session**: Try AI-powered questioning
3. **Feedback Loop**: Learn from AI analysis
4. **Advanced Techniques**: Master assumption challenging

### For Facilitators

1. **Dashboard Training**: Navigate AI insights
2. **Intervention Strategies**: When to use AI suggestions
3. **Pattern Recognition**: Identify discussion trends
4. **Synthesis Techniques**: Combine AI insights with human judgment

---

## 🔐 Privacy & Ethics

### Data Handling

- Messages analyzed in real-time
- Analysis stored with charette data
- No external AI services by default (pattern-based)
- Optional OpenAI integration (user consent required)

### Ethical Considerations

- AI suggestions are advisory, not prescriptive
- Human facilitator maintains control
- Transparent about AI analysis
- Respect participant autonomy

---

## 📞 Support

For questions or issues with AI features:
- Review API documentation
- Check server logs for analysis errors
- Test with sample data
- Contact system administrator

---

**The AI-powered continuous questioning system transforms traditional charettes into intelligent, insight-driven collaborative sessions.** 🚀
