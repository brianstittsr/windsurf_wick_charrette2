// Sample data for seeding the Servant Advocacy & Peer Support module
// Use this to populate Firestore with initial content

export const sampleLearningPaths = [
  {
    id: 'intro-peer-support',
    title: 'Introduction to Positive Peer Support',
    description: 'Learn the foundations of supporting peers with strength-based approaches',
    targetAgeGroup: ['youth', 'adult'],
    targetRoles: ['student', 'parent', 'educator', 'faith_leader'],
    level: 1,
    estimatedMinutes: 15,
    prerequisites: [],
    isActive: true,
    modules: [
      {
        id: 'module-1',
        title: 'What is Positive Peer Support?',
        content: `Positive peer support means recognizing the strengths in others and helping them build on those strengths.

Instead of focusing on what's wrong or what someone can't do, positive peer support:
• Notices what people are already doing well
• Helps them see their own resilience and capacity
• Believes in their ability to solve their own problems
• Stands alongside them without taking over

This approach is powerful because it treats people as experts in their own lives. You're not fixing them—you're helping them recognize the strength they already have.`,
        scenario: {
          situation: 'Your friend is struggling with a difficult class and says "I\'m just not smart enough for this."',
          options: [
            {
              id: 'opt-1',
              text: 'Tell them "Don\'t say that! You\'re really smart!"'
            },
            {
              id: 'opt-2',
              text: 'Say "I\'ve seen you work through hard things before. What helped you then?"'
            },
            {
              id: 'opt-3',
              text: 'Offer to do their homework for them'
            }
          ],
          feedback: {
            'opt-1': {
              alignment: 'constrained',
              explanation: 'While encouraging, this dismisses their feelings and doesn\'t help them identify their own strengths and strategies.'
            },
            'opt-2': {
              alignment: 'positive_support',
              explanation: 'Perfect! You\'re helping them recognize their own resilience and problem-solving abilities. This is positive peer support in action.'
            },
            'opt-3': {
              alignment: 'harmful',
              explanation: 'This takes away their opportunity to build confidence and skills. It also doesn\'t help them long-term.'
            }
          }
        },
        reflectionPrompts: [
          'Think of a time someone supported you well. What did they do that helped?',
          'How can you apply positive peer support in your daily life?'
        ],
        keyTakeaways: [
          'Positive peer support recognizes existing strengths',
          'It helps people build on what\'s already working',
          'It believes in people\'s capacity to solve their own problems',
          'It stands alongside, not above or below'
        ]
      }
    ]
  },
  {
    id: 'active-advocacy',
    title: 'From Noticing to Active Advocacy',
    description: 'Learn to move from observing problems to taking action for change',
    targetAgeGroup: ['youth', 'adult'],
    targetRoles: ['student', 'parent', 'community_organizer', 'nonprofit_staff'],
    level: 2,
    estimatedMinutes: 20,
    prerequisites: ['intro-peer-support'],
    isActive: true,
    modules: [
      {
        id: 'module-1',
        title: 'What is Active Advocacy?',
        content: `Active advocacy means moving from noticing unfairness to taking action to change it.

It's the difference between:
• Seeing someone left out → Inviting them in
• Noticing a rule is unfair → Speaking up about it
• Hearing about a problem → Organizing others to address it

Active advocacy requires:
1. Noticing what's not fair or what's leaving people out
2. Understanding the difference between individual, peer, and policy-level action
3. Taking concrete steps within your sphere of influence
4. Knowing when to escalate to those with more power

You don't have to fix everything yourself. But you can always do something.`,
        scenario: {
          situation: 'You notice that the after-school program always fills up before kids without internet access can sign up online. Several kids you know miss out every time.',
          options: [
            {
              id: 'opt-1',
              text: 'Feel bad about it but don\'t say anything'
            },
            {
              id: 'opt-2',
              text: 'Tell your friends to sign up faster next time'
            },
            {
              id: 'opt-3',
              text: 'Talk to the program coordinator about adding phone or in-person registration'
            },
            {
              id: 'opt-4',
              text: 'Help your friends get to a library to sign up online'
            }
          ],
          feedback: {
            'opt-1': {
              alignment: 'harmful',
              explanation: 'Noticing is the first step, but active advocacy means taking action. Staying silent allows the unfairness to continue.'
            },
            'opt-2': {
              alignment: 'constrained',
              explanation: 'This doesn\'t address the real problem—that the system excludes people without internet access.'
            },
            'opt-3': {
              alignment: 'positive_support',
              explanation: 'Excellent! You\'re advocating for a system change that would help everyone. This is active advocacy at the policy level.'
            },
            'opt-4': {
              alignment: 'positive_support',
              explanation: 'Good! You\'re taking peer-level action to help in the short term. Even better would be combining this with advocating for system change.'
            }
          }
        },
        reflectionPrompts: [
          'What\'s something unfair you\'ve noticed in your community?',
          'What\'s one action you could take—individually, with peers, or by advocating for policy change?'
        ],
        keyTakeaways: [
          'Active advocacy means taking action, not just noticing',
          'Different problems require different levels of action',
          'You can advocate while respecting constraints',
          'Small actions can lead to bigger changes'
        ]
      }
    ]
  }
];

export const sampleScenarios = [
  {
    id: 'school-discipline-1',
    title: 'Zero-Tolerance Policy Dilemma',
    description: 'Navigate supporting a friend facing strict school discipline',
    context: 'Your school has a zero-tolerance policy for any physical altercation. Your friend got into a fight while defending a younger student from bullying. Under the policy, both students face automatic suspension.',
    constraintType: 'school_policy',
    targetAgeGroup: ['youth'],
    targetRoles: ['student'],
    situation: 'Your friend is facing suspension for defending someone. They\'re scared and don\'t know what to do. What\'s your response?',
    difficulty: 2,
    isActive: true,
    actions: [
      {
        id: 'action-1',
        text: 'Tell them the policy is stupid and they should fight it',
        alignment: 'harmful',
        explanation: 'While the policy may be problematic, this doesn\'t help your friend navigate the immediate situation.'
      },
      {
        id: 'action-2',
        text: 'Support them emotionally and help prepare for the disciplinary meeting',
        alignment: 'positive_support',
        explanation: 'Excellent! You\'re providing immediate peer support while helping them navigate the constraint.'
      },
      {
        id: 'action-3',
        text: 'Organize students to document what happened and write support letters',
        alignment: 'positive_support',
        explanation: 'Great! You\'re taking peer-level action to support your friend within the system.'
      },
      {
        id: 'action-4',
        text: 'Request a meeting with administration to discuss policy alternatives',
        alignment: 'positive_support',
        explanation: 'Perfect! You\'re advocating for policy change while supporting your friend.'
      }
    ],
    outcomes: {
      'action-1': 'Your friend feels more angry but no more prepared. The suspension proceeds.',
      'action-2': 'Your friend feels supported and goes into the meeting prepared and calm.',
      'action-3': 'The letters show the context and your friend\'s character. The administration considers it.',
      'action-4': 'You start a conversation about restorative justice alternatives to zero-tolerance.'
    },
    whatInControl: {
      individual: [
        'Be there for your friend emotionally',
        'Help them prepare their statement',
        'Attend the meeting if allowed as support'
      ],
      peer: [
        'Organize peers to write support letters',
        'Document what actually happened',
        'Show up for your friend during the process',
        'Help them keep up with schoolwork during suspension'
      ],
      policyChange: [
        'Request a policy review with student input',
        'Present research on zero-tolerance policy impacts',
        'Propose restorative justice alternatives',
        'Organize parent and student voices',
        'Present to school board'
      ]
    },
    advocacySteps: [
      'Document the specific situation and policy impact',
      'Research alternatives to zero-tolerance policies',
      'Request a meeting with school administration',
      'Present data on restorative justice outcomes',
      'Organize student, parent, and teacher voices',
      'Propose a pilot program for alternative approaches',
      'Follow up with school board if needed'
    ],
    tags: ['school', 'discipline', 'bullying', 'zero-tolerance', 'youth']
  },
  {
    id: 'benefits-1',
    title: 'Benefits Eligibility Gap',
    description: 'Help a family navigate benefits they almost qualify for',
    context: 'A family you know makes $50 more per month than the eligibility cutoff for food assistance. They\'re struggling to afford groceries but don\'t qualify for help.',
    constraintType: 'benefits_rule',
    targetAgeGroup: ['adult'],
    targetRoles: ['parent', 'social_worker', 'nonprofit_staff'],
    situation: 'The family is caught in the benefits cliff—making too much to qualify but not enough to afford food. How do you help?',
    difficulty: 3,
    isActive: true,
    actions: [
      {
        id: 'action-1',
        text: 'Tell them to quit their job so they qualify',
        alignment: 'harmful',
        explanation: 'This creates more problems than it solves and doesn\'t address the systemic issue.'
      },
      {
        id: 'action-2',
        text: 'Connect them with food pantries and community resources',
        alignment: 'positive_support',
        explanation: 'Good! You\'re providing immediate peer support while they navigate the constraint.'
      },
      {
        id: 'action-3',
        text: 'Help them document their situation and request a hardship exception',
        alignment: 'positive_support',
        explanation: 'Excellent! You\'re helping them advocate within the existing system.'
      },
      {
        id: 'action-4',
        text: 'Document this case and others to advocate for benefits cliff reform',
        alignment: 'positive_support',
        explanation: 'Perfect! You\'re working toward policy change while providing immediate support.'
      }
    ],
    outcomes: {
      'action-1': 'The family loses income and stability. The problem gets worse.',
      'action-2': 'The family gets immediate help. The systemic problem remains.',
      'action-3': 'The agency reviews the case. Even if denied, the family feels heard.',
      'action-4': 'You build a case for policy reform while helping families now.'
    },
    whatInControl: {
      individual: [
        'Connect family with food pantries',
        'Help them apply for hardship exceptions',
        'Share information about other resources'
      ],
      peer: [
        'Organize community food sharing',
        'Create a local mutual aid network',
        'Pool resources to help families in the gap'
      ],
      policyChange: [
        'Document benefits cliff cases',
        'Present data to legislators',
        'Advocate for graduated benefits phase-out',
        'Join coalitions working on benefits reform'
      ]
    },
    advocacySteps: [
      'Document multiple cases of benefits cliff impact',
      'Calculate the actual cost of the cliff to families',
      'Research graduated phase-out models',
      'Present findings to agency leadership',
      'Organize affected families to share stories',
      'Advocate with state legislators',
      'Propose specific policy changes'
    ],
    tags: ['benefits', 'food-security', 'eligibility', 'policy', 'adult']
  }
];

export const sampleResources = [
  {
    id: 'resource-1',
    name: 'City Youth Services',
    type: 'agency',
    description: 'Comprehensive support services for youth ages 12-24 including mental health, education, and employment support',
    canDo: [
      'Individual and group counseling',
      'Educational support and tutoring',
      'Job readiness training and placement',
      'Crisis intervention 24/7',
      'Life skills workshops',
      'Peer support groups'
    ],
    cannotDo: [
      'Cannot provide housing directly (can refer to housing programs)',
      'Cannot override school disciplinary decisions',
      'Cannot provide legal representation (can refer to legal aid)',
      'Cannot provide medical care (can refer to clinics)'
    ],
    eligibility: 'Youth ages 12-24 residing in the city. No income requirements. Services are free.',
    contactInfo: {
      phone: '(555) 123-4567',
      email: 'info@cityyouthservices.org',
      website: 'https://cityyouthservices.org',
      address: '123 Main St, City, State 12345'
    },
    hours: 'Monday-Friday 9am-5pm, Drop-in hours 3pm-5pm, Crisis line 24/7',
    languages: ['English', 'Spanish', 'Vietnamese'],
    location: 'Downtown, accessible by bus routes 5, 12, 18',
    tags: ['youth', 'mental-health', 'education', 'employment', 'crisis'],
    isActive: true
  },
  {
    id: 'resource-2',
    name: 'Family Support Center',
    type: 'program',
    description: 'Holistic family support including benefits navigation, parenting classes, and emergency assistance',
    canDo: [
      'Benefits application assistance',
      'Emergency food and clothing',
      'Parenting classes and support groups',
      'Utility assistance (limited funds)',
      'School supply distribution',
      'Tax preparation assistance'
    ],
    cannotDo: [
      'Cannot provide ongoing cash assistance',
      'Cannot pay rent or deposits',
      'Cannot provide transportation',
      'Cannot guarantee benefits approval'
    ],
    eligibility: 'Families with children under 18. Income at or below 200% federal poverty level. Must provide proof of residency.',
    contactInfo: {
      phone: '(555) 234-5678',
      email: 'help@familysupportcenter.org',
      website: 'https://familysupportcenter.org',
      address: '456 Oak Ave, City, State 12345'
    },
    hours: 'Monday, Wednesday, Friday 10am-4pm. Call ahead for appointments.',
    languages: ['English', 'Spanish'],
    location: 'West side, near elementary school',
    tags: ['family', 'benefits', 'emergency-assistance', 'parenting'],
    isActive: true
  }
];

// Function to seed data to Firestore
export async function seedAdvocacyData(db) {
  const { collection, addDoc } = await import('firebase/firestore');
  
  try {
    // Seed learning paths
    for (const path of sampleLearningPaths) {
      await addDoc(collection(db, 'learningPaths'), path);
    }
    console.log('Learning paths seeded successfully');

    // Seed scenarios
    for (const scenario of sampleScenarios) {
      await addDoc(collection(db, 'scenarios'), scenario);
    }
    console.log('Scenarios seeded successfully');

    // Seed resources
    for (const resource of sampleResources) {
      await addDoc(collection(db, 'resources'), resource);
    }
    console.log('Resources seeded successfully');

    return { success: true, message: 'All advocacy data seeded successfully' };
  } catch (error) {
    console.error('Error seeding advocacy data:', error);
    return { success: false, error: error.message };
  }
}
