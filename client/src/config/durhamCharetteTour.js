export const durhamCharetteTourSteps = [
  {
    title: 'Welcome to the Durham 1971 Charette',
    description: 'This guided tour will walk you through the key features of the Charette System using the historic Durham 1971 community planning session as an example. You can exit this tour at any time by clicking the X or "Skip Tour" button.',
    category: 'Introduction',
    benefits: [
      'Learn how to navigate the platform',
      'Understand the structured decision-making process',
      'See real historical data in action'
    ],
    tip: 'Take your time with each step - you can go back and forth using the navigation buttons.'
  },
  {
    title: 'Session Overview',
    targetSelector: '[data-tour="session-header"]',
    description: 'The session header shows the charette title, current phase, and progress. The Durham 1971 Charette demonstrates how communities came together to plan urban development.',
    category: 'Navigation',
    benefits: [
      'Track which phase you\'re in',
      'See overall progress at a glance',
      'Understand the session context'
    ],
    tip: 'The phase indicator shows you where you are in the 6-phase process.'
  },
  {
    title: 'Workflow Phases',
    targetSelector: '[data-tour="workflow-tabs"]',
    description: 'The Charette System guides you through 6 structured phases: Introduction, Data Collection, Ideation, Analysis, Synthesis, and Reporting. Each phase has specific goals and activities.',
    category: 'Process',
    benefits: [
      'Clear structure prevents confusion',
      'Each phase builds on the previous',
      'Ensures comprehensive decision-making'
    ],
    tip: 'Click on different tabs to explore each phase. The workflow keeps everyone aligned.'
  },
  {
    title: 'Real-Time Discussion',
    targetSelector: '[data-tour="discussion-area"]',
    description: 'The discussion tab provides a chat-based interface where participants can share ideas, ask questions, and collaborate in real-time. Messages are organized by room and timestamped.',
    category: 'Collaboration',
    benefits: [
      'Asynchronous participation',
      'All voices can be heard',
      'Complete conversation history'
    ],
    tip: 'Use @mentions to notify specific participants and keep discussions focused.'
  },
  {
    title: 'Breakout Rooms',
    targetSelector: '[data-tour="breakout-rooms"]',
    description: 'Breakout rooms allow parallel discussions on different topics. In the Durham Charette, rooms were organized by neighborhood zones and specific planning concerns.',
    category: 'Collaboration',
    benefits: [
      'Multiple conversations simultaneously',
      'Topic-focused discussions',
      'Smaller groups for deeper engagement'
    ],
    tip: 'Join different rooms to contribute your expertise where it matters most.'
  },
  {
    title: 'AI-Powered Analysis',
    targetSelector: '[data-tour="ai-analysis"]',
    description: 'The AI Analysis panel automatically identifies themes, constraints, and opportunities from all discussions. It detects patterns and cognitive biases that might otherwise be missed.',
    category: 'Intelligence',
    benefits: [
      'Automatic theme detection',
      'Identifies hidden constraints',
      'Surfaces cognitive biases',
      'Saves hours of manual analysis'
    ],
    tip: 'Run analysis after major discussion periods to get fresh insights.'
  },
  {
    title: 'Document Library',
    targetSelector: '[data-tour="documents"]',
    description: 'Upload and organize all relevant documents, maps, reports, and data. The Durham Charette included zoning maps, demographic data, and community surveys.',
    category: 'Resources',
    benefits: [
      'Centralized information repository',
      'Easy access for all participants',
      'Version control and organization'
    ],
    tip: 'Tag documents by topic to make them easier to find during discussions.'
  },
  {
    title: 'Participant Management',
    targetSelector: '[data-tour="participants"]',
    description: 'See who\'s participating, their roles, and their contributions. The Durham Charette included city planners, residents, business owners, and community leaders.',
    category: 'Collaboration',
    benefits: [
      'Know who\'s involved',
      'Understand different perspectives',
      'Track participation levels'
    ],
    tip: 'Diverse stakeholder participation leads to better decisions.'
  },
  {
    title: 'Progress Tracking',
    targetSelector: '[data-tour="progress"]',
    description: 'Monitor completion of each phase, track action items, and see what\'s been accomplished. This keeps the charette moving forward efficiently.',
    category: 'Management',
    benefits: [
      'Clear accountability',
      'Visual progress indicators',
      'Identify bottlenecks early'
    ],
    tip: 'Regular progress reviews help keep the session on track.'
  },
  {
    title: 'Automated Reporting',
    targetSelector: '[data-tour="reporting"]',
    description: 'Generate comprehensive reports automatically from all session data. The system creates executive summaries, detailed findings, and presentation-ready materials.',
    category: 'Output',
    benefits: [
      'Save hours of manual work',
      'Professional documentation',
      'Multiple export formats',
      'Presentation scripts included'
    ],
    tip: 'Reports can be generated at any time, not just at the end of the session.'
  },
  {
    title: 'Settings & Customization',
    targetSelector: '[data-tour="settings"]',
    description: 'Customize the charette settings, manage permissions, configure AI analysis parameters, and adjust the workflow to match your specific needs.',
    category: 'Configuration',
    benefits: [
      'Flexible to your process',
      'Control access and permissions',
      'Adjust AI sensitivity'
    ],
    tip: 'Set up your preferences early to optimize your experience.'
  },
  {
    title: 'Tour Complete!',
    description: 'You\'ve completed the guided tour of the Durham Charette features. You\'re now ready to explore the platform on your own. Remember, you can always restart this tour from the help menu.',
    category: 'Completion',
    benefits: [
      'You understand the core features',
      'You know how to navigate the platform',
      'You can start collaborating effectively'
    ],
    tip: 'Explore the Durham 1971 historical data to see how real communities used this process to make important decisions.'
  }
];

export const quickTourSteps = [
  {
    title: 'Quick Tour: Charette Basics',
    description: 'This quick 3-step tour covers the essentials. Perfect if you\'re short on time!',
    category: 'Quick Start'
  },
  {
    title: 'Navigate Phases',
    targetSelector: '[data-tour="workflow-tabs"]',
    description: 'Use these tabs to move through the 6 phases of the charette process.',
    benefits: ['Structured workflow', 'Clear progression']
  },
  {
    title: 'Collaborate in Real-Time',
    targetSelector: '[data-tour="discussion-area"]',
    description: 'Chat with other participants and share ideas in breakout rooms.',
    benefits: ['Real-time collaboration', 'Organized discussions']
  },
  {
    title: 'Generate Reports',
    targetSelector: '[data-tour="reporting"]',
    description: 'Automatically create comprehensive reports from all session data.',
    benefits: ['Save time', 'Professional output']
  }
];
