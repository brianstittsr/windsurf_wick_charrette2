# Charette System - Complete Workflow Guide

## 🚀 Quick Start

### Starting the System

1. **Start both servers:**
   ```bash
   npm run dev
   ```
   Or manually:
   ```bash
   # Terminal 1 - API Server
   node api/index.js

   # Terminal 2 - Frontend
   cd client && npm start
   ```

2. **Access the application:**
   - Open browser to `http://localhost:3000`
   - Click **"Continue in Demo Mode"** to explore with historical data
   - Or sign in with Google for full access

## 📋 Complete Workflow Overview

### Phase 1: Introduction
**Purpose:** Establish foundation and ground rules

**What to do:**
- Review session objectives and scope
- Understand stakeholder representation
- Review timeframe and constraints
- Acknowledge ground rules
- Click "Begin Data Collection Phase"

**Key Features:**
- ✅ Session overview cards
- ✅ Ground rules display
- ✅ Acknowledgment checkbox

---

### Phase 2: Data Collection
**Purpose:** Gather information and context

**What to do:**
- Upload relevant documents (PDF, DOC, TXT, images)
- Record initial observations and concerns
- Complete data collection checklist
- Click "Proceed to Analysis Phase"

**Key Features:**
- ✅ Drag-and-drop file upload
- ✅ Notes and observations field
- ✅ Collection checklist
- ✅ File management

**Tips:**
- Upload background materials early
- Document all known constraints
- Note missing information

---

### Phase 3: Analysis
**Purpose:** Identify constraints, assumptions, and opportunities

**What to do:**
- Review AI analysis results for:
  - **Constraints:** Limitations and boundaries
  - **Assumptions:** Hidden beliefs to test
  - **Opportunities:** Areas for innovation
- Create breakout rooms for focused discussions:
  - Add room topics (e.g., "Transportation & Safety")
  - Add discussion questions for each room
  - Click "Create Breakout Rooms"
- Click "Proceed to Ideation Phase"

**Key Features:**
- ✅ Three analysis types (Constraints/Assumptions/Opportunities)
- ✅ AI analysis results display
- ✅ Breakout room creation wizard
- ✅ Dynamic room and question management

**Tips:**
- Create 3-5 breakout rooms for best results
- Each room should have 2-3 focused questions
- Ensure all major topics are covered

---

### Phase 4: Ideation
**Purpose:** Generate creative solutions without constraints

**What to do:**
- Review insights from breakout rooms
- Generate ideas freely:
  - Type ideas in the input field
  - Press Enter or click "Add Idea"
- Vote on promising ideas (thumbs up)
- Star exceptional ideas (star icon)
- Click "Proceed to Synthesis Phase"

**Key Features:**
- ✅ Idea generation interface
- ✅ Voting system
- ✅ Starring for favorites
- ✅ Idea categorization metrics
- ✅ Breakout room insights

**Guidelines:**
- 💡 Quantity over quality
- 🚫 No criticism during ideation
- 🎨 Wild ideas welcome
- 🔗 Build on others' ideas

**Tips:**
- Aim for 20+ ideas minimum
- Combine related ideas
- Don't self-censor

---

### Phase 5: Synthesis
**Purpose:** Evaluate and prioritize actionable solutions

**What to do:**
- Create solution proposals:
  - Add title and description
  - Rate feasibility (High/Medium/Low)
  - Rate impact (High/Medium/Low)
- Review evaluation matrix:
  - **Quick Wins:** High impact, high feasibility
  - **Major Projects:** High impact, low feasibility
  - **Fill-ins:** Low impact, high feasibility
  - **Reconsider:** Low impact, low feasibility
- Select solutions (checkbox) for final report
- Click "Generate Final Report"

**Key Features:**
- ✅ Solution development forms
- ✅ Feasibility/impact assessment
- ✅ 2x2 evaluation matrix
- ✅ Solution selection
- ✅ Recommendations

**Tips:**
- Prioritize "Quick Wins" first
- Ensure solutions address all stakeholder concerns
- Select 3-7 solutions for implementation
- Combine complementary solutions

---

### Phase 6: Reporting
**Purpose:** Document outcomes and next steps

**What to do:**
- Click "Generate Final Report"
- Review:
  - Executive summary with metrics
  - Key findings (constraints, assumptions, opportunities)
  - Recommended solutions with ratings
  - Next steps for implementation
- Export report:
  - Download PDF
  - Email to stakeholders
- Click "Complete Charette"

**Key Features:**
- ✅ Executive summary
- ✅ Participation metrics
- ✅ Key findings display
- ✅ Solution recommendations
- ✅ Export options
- ✅ Next steps checklist

**Report Includes:**
- Total participants and messages
- Selected solutions with feasibility/impact
- Key findings from all phases
- Implementation roadmap

---

## 🎯 Using the Demo Data

### Durham 1971 School Desegregation Summit

The system includes a complete historical demo:

**What's Included:**
- 10 main room messages
- 4 breakout rooms with 98 total messages
- Historical participants (Ann Atwater, C.P. Ellis, Bill Riddick)
- Authentic 1971 dialogue and tensions
- Complete phase data

**How to Use:**
1. Click "Continue in Demo Mode"
2. Click on "1971 Durham School Desegregation Summit"
3. Click "Join Session"
4. Navigate to **"Workflow"** tab
5. Explore all 6 phases with pre-populated data

---

## 💡 Creating a New Charette

### Step-by-Step

1. **From Dashboard:**
   - Click "New Charette" button
   - Fill in the form:
     - Title (required)
     - Description
     - Scope
     - Stakeholders
     - Objectives
     - Constraints
     - Timeframe
     - Desired Outcomes
   - Click "Create Charette"

2. **Join the Charette:**
   - Click "Join Session" on your new charette card
   - You'll start in the Overview tab

3. **Start the Workflow:**
   - Click the **"Workflow"** tab
   - Begin with Phase 1: Introduction
   - Progress through all 6 phases

---

## 🔄 Navigation Tips

### Tab Structure

**Workflow Tab** (NEW!)
- Complete guided process through all 6 phases
- Visual progress indicator
- Phase-by-phase workflow

**Overview Tab**
- Session details and metadata
- Participant list
- Phase control (advance phase manually)

**Discussion Tab**
- Main room and breakout room chat
- Real-time messaging
- Room navigation sidebar

**Rooms Tab**
- Grid view of all breakout rooms
- Quick room joining
- Participant counts

**Progress Tab**
- Phase timeline
- Completion status
- Milestone tracking

---

## 🎨 UI Features

### Visual Elements

**Phase Progress Indicator:**
- Green checkmarks = Completed phases
- Blue highlight = Current phase
- Gray = Upcoming phases
- Connecting lines show progression

**Cards:**
- Muted background = Information display
- Primary border = Selected/active items
- Gradient backgrounds = Important sections

**Badges:**
- Phase numbers
- Participant roles
- Status indicators

---

## 🔧 Troubleshooting

### Common Issues

**Workflow tab not showing:**
- Refresh the browser
- Check that webpack compiled successfully
- Look for console errors

**Can't advance phases:**
- Ensure required fields are completed
- Check acknowledgment checkboxes
- Verify at least one solution is selected (Phase 5)

**Breakout rooms not creating:**
- Fill in room topics
- Add at least one question per room
- Check API server is running

**Demo data not loading:**
- Verify API server shows "Demo data loaded successfully"
- Check charette ID in server logs
- Refresh the frontend

---

## 📊 Best Practices

### For Facilitators

1. **Preparation:**
   - Upload all background documents in Phase 2
   - Create clear breakout room topics in Phase 3
   - Set realistic timeframes

2. **During Sessions:**
   - Guide participants through each phase
   - Encourage full participation in ideation
   - Use voting to identify popular ideas
   - Focus synthesis on actionable solutions

3. **Wrap-up:**
   - Review final report with all participants
   - Assign responsibilities for next steps
   - Schedule follow-up sessions

### For Participants

1. **Be Engaged:**
   - Contribute ideas freely in Phase 4
   - Vote on solutions you support
   - Provide constructive feedback

2. **Stay Focused:**
   - Follow the phase structure
   - Address the discussion questions
   - Build on others' contributions

3. **Think Creatively:**
   - Challenge assumptions
   - Propose innovative solutions
   - Consider all perspectives

---

## 🚀 Next Steps After Completion

1. **Review Report:**
   - Download PDF for distribution
   - Email to all stakeholders
   - Archive for future reference

2. **Implementation:**
   - Assign solution owners
   - Create detailed action plans
   - Set milestones and deadlines

3. **Follow-up:**
   - Schedule progress check-ins
   - Track implementation status
   - Document lessons learned

4. **Continuous Improvement:**
   - Gather feedback on the process
   - Refine for future charettes
   - Build on successes

---

## 📞 Support

For issues or questions:
- Check console logs (F12 in browser)
- Review API server output
- Verify both servers are running
- Check `PHASE_IMPLEMENTATION.md` for technical details

---

**System Status:** ✅ All 6 phases complete and functional
**Demo Data:** ✅ Durham 1971 Summit fully populated
**Integration:** ✅ Workflow tab active in main application

**Ready to use!** Start with demo mode to explore, then create your own charette.
