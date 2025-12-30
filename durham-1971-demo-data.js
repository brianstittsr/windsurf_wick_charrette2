// Historical Demo Data: 1971 Durham School Desegregation Summit
// Based on the "Save Our Schools" charrette facilitated by Bill Riddick

const { v4: uuidv4 } = require('uuid');

// Use static ID so demo data persists across server restarts
const charetteId = 'durham-1971-demo';

// Key Historical Stakeholders
const participants = [
  { userName: 'Ann Atwater', role: 'analyst', joinedAt: new Date().toISOString() },
  { userName: 'C.P. Ellis', role: 'analyst', joinedAt: new Date().toISOString() },
  { userName: 'Bill Riddick', role: 'analyst', joinedAt: new Date().toISOString() },
  { userName: 'Rev. Leon White', role: 'participant', joinedAt: new Date().toISOString() },
  { userName: 'Mary Ellis', role: 'participant', joinedAt: new Date().toISOString() },
  { userName: 'Howard Fuller', role: 'participant', joinedAt: new Date().toISOString() },
  { userName: 'School Board Member Johnson', role: 'project_manager', joinedAt: new Date().toISOString() },
  { userName: 'Parent - Sarah Mitchell', role: 'participant', joinedAt: new Date().toISOString() },
  { userName: 'Parent - James Washington', role: 'participant', joinedAt: new Date().toISOString() },
  { userName: 'Teacher - Mrs. Henderson', role: 'participant', joinedAt: new Date().toISOString() },
  { userName: 'Principal Davis', role: 'participant', joinedAt: new Date().toISOString() },
  { userName: 'Union Rep - Tom Bradley', role: 'participant', joinedAt: new Date().toISOString() }
];

// Historical Breakout Rooms based on key issues from 1971
const breakoutRooms = [
  {
    id: 'room-1',
    name: 'Transportation & Busing Safety',
    questions: [
      'How can we ensure safe transportation for all students across the city?',
      'What are the legitimate concerns about busing distances and times?',
      'How do we address fears about children traveling to unfamiliar neighborhoods?'
    ],
    participants: ['Parent - Sarah Mitchell', 'Parent - James Washington', 'Principal Davis', 'Union Rep - Tom Bradley'],
    createdAt: new Date(Date.now() - 7200000).toISOString()
  },
  {
    id: 'room-2',
    name: 'Educational Quality & Resources',
    questions: [
      'How do we maintain educational standards during transition?',
      'What resources are needed to support integrated classrooms?',
      'How can we ensure equal access to quality education for all students?'
    ],
    participants: ['Teacher - Mrs. Henderson', 'School Board Member Johnson', 'Howard Fuller'],
    createdAt: new Date(Date.now() - 7200000).toISOString()
  },
  {
    id: 'room-3',
    name: 'Community Concerns & Property Values',
    questions: [
      'How do we address fears about neighborhood changes?',
      'What are the real vs. perceived impacts on property values?',
      'How can we build trust between different communities?'
    ],
    participants: ['C.P. Ellis', 'Rev. Leon White', 'Mary Ellis'],
    createdAt: new Date(Date.now() - 7200000).toISOString()
  },
  {
    id: 'room-4',
    name: 'Student Welfare & Social Integration',
    questions: [
      'How do we protect students from harassment and discrimination?',
      'What support systems need to be in place for students?',
      'How can we foster positive relationships between students of different backgrounds?'
    ],
    participants: ['Ann Atwater', 'Bill Riddick'],
    createdAt: new Date(Date.now() - 7200000).toISOString()
  }
];

// Historical messages reflecting actual tensions and breakthroughs
const messages = {
  [charetteId]: {
    'main': [
      {
        id: uuidv4(),
        text: 'Welcome everyone to this critical 10-day charrette. We are here to find solutions for Durham Public Schools that work for ALL our children. This will not be easy, but it is necessary.',
        userName: 'Bill Riddick',
        role: 'analyst',
        roomId: 'main',
        timestamp: new Date(Date.now() - 10800000).toISOString(),
        type: 'chat'
      },
      {
        id: uuidv4(),
        text: 'I want to be clear from the start - I am here representing the concerns of working-class white families who feel their voices have not been heard. We have legitimate worries about our children and our neighborhoods.',
        userName: 'C.P. Ellis',
        role: 'analyst',
        roomId: 'main',
        timestamp: new Date(Date.now() - 10500000).toISOString(),
        type: 'chat'
      },
      {
        id: uuidv4(),
        text: 'And I am here representing Black families who have been fighting for equal education for generations. Our children deserve the same quality schools, the same resources, the same opportunities. That is not negotiable.',
        userName: 'Ann Atwater',
        role: 'analyst',
        roomId: 'main',
        timestamp: new Date(Date.now() - 10200000).toISOString(),
        type: 'chat'
      },
      {
        id: uuidv4(),
        text: 'I hear both of you. What I am hearing is that you both care deeply about children - your children and all children. That is our common ground. Let us start there.',
        userName: 'Bill Riddick',
        role: 'analyst',
        roomId: 'main',
        timestamp: new Date(Date.now() - 9900000).toISOString(),
        type: 'chat'
      },
      {
        id: uuidv4(),
        text: 'The court has mandated integration. That is not up for debate. What we need to decide is HOW we implement this in a way that serves our students and community.',
        userName: 'School Board Member Johnson',
        role: 'project_manager',
        roomId: 'main',
        timestamp: new Date(Date.now() - 9600000).toISOString(),
        type: 'chat'
      },
      {
        id: uuidv4(),
        text: 'My concern is practical - how do we bus children safely across town? Some of these routes would be 45 minutes each way. That is a lot of time away from learning and family.',
        userName: 'Parent - Sarah Mitchell',
        role: 'participant',
        roomId: 'main',
        timestamp: new Date(Date.now() - 9300000).toISOString(),
        type: 'chat'
      },
      {
        id: uuidv4(),
        text: 'Black children have been bused past white schools to get to inferior schools for years. Now suddenly busing is a problem? We need to be honest about what this is really about.',
        userName: 'Howard Fuller',
        role: 'participant',
        roomId: 'main',
        timestamp: new Date(Date.now() - 9000000).toISOString(),
        type: 'chat'
      },
      {
        id: uuidv4(),
        text: 'I think we need to separate legitimate logistical concerns from resistance to integration itself. Both exist, and we need to address both honestly.',
        userName: 'Rev. Leon White',
        role: 'participant',
        roomId: 'main',
        timestamp: new Date(Date.now() - 8700000).toISOString(),
        type: 'chat'
      },
      {
        id: uuidv4(),
        text: 'As a teacher, I can tell you that our students are more adaptable than we give them credit for. The adults are the ones struggling with this change. We need to model the behavior we want to see.',
        userName: 'Teacher - Mrs. Henderson',
        role: 'participant',
        roomId: 'main',
        timestamp: new Date(Date.now() - 8400000).toISOString(),
        type: 'chat'
      },
      {
        id: uuidv4(),
        text: 'I propose we break into smaller groups to tackle specific issues: transportation, educational quality, community concerns, and student welfare. Each group reports back with concrete recommendations.',
        userName: 'Bill Riddick',
        role: 'analyst',
        roomId: 'main',
        timestamp: new Date(Date.now() - 8100000).toISOString(),
        type: 'chat'
      }
    ],
    'room-1': [
      {
        id: uuidv4(),
        text: 'Welcome to the Transportation and Busing Safety discussion. Let us focus on the practical aspects. What are the actual safety concerns versus what are fears based on prejudice?',
        userName: 'Principal Davis',
        role: 'participant',
        roomId: 'room-1',
        timestamp: new Date(Date.now() - 7800000).toISOString(),
        type: 'chat'
      },
      {
        id: uuidv4(),
        text: 'I worry about my daughter being on a bus for that long. She is only 7 years old. What if something happens? What if the bus breaks down in an unfamiliar neighborhood?',
        userName: 'Parent - Sarah Mitchell',
        role: 'participant',
        roomId: 'room-1',
        timestamp: new Date(Date.now() - 7750000).toISOString(),
        type: 'chat'
      },
      {
        id: uuidv4(),
        text: 'Unfamiliar to who? My neighborhood? You mean you are afraid of Black neighborhoods. Let us be honest about what we are really saying here.',
        userName: 'Parent - James Washington',
        role: 'participant',
        roomId: 'room-1',
        timestamp: new Date(Date.now() - 7700000).toISOString(),
        type: 'chat'
      },
      {
        id: uuidv4(),
        text: 'Now hold on - I did not mean it that way. I just meant... my daughter does not know those areas. Any parent would be concerned about their child in a place they do not know.',
        userName: 'Parent - Sarah Mitchell',
        role: 'participant',
        roomId: 'room-1',
        timestamp: new Date(Date.now() - 7650000).toISOString(),
        type: 'chat'
      },
      {
        id: uuidv4(),
        text: 'My son has been riding the bus across town for years - past three white schools - to get to the Black school on the other side of Durham. He was 6 years old when he started. Where was your concern then?',
        userName: 'Parent - James Washington',
        role: 'participant',
        roomId: 'room-1',
        timestamp: new Date(Date.now() - 7600000).toISOString(),
        type: 'chat'
      },
      {
        id: uuidv4(),
        text: 'I... I did not know that. I am sorry. I guess I never thought about it from that perspective.',
        userName: 'Parent - Sarah Mitchell',
        role: 'participant',
        roomId: 'room-1',
        timestamp: new Date(Date.now() - 7550000).toISOString(),
        type: 'chat'
      },
      {
        id: uuidv4(),
        text: 'This is good - we are getting to the real issues. Let me ask both of you: what would make you feel your children are safe on a bus, regardless of where it goes?',
        userName: 'Principal Davis',
        role: 'participant',
        roomId: 'room-1',
        timestamp: new Date(Date.now() - 7500000).toISOString(),
        type: 'chat'
      },
      {
        id: uuidv4(),
        text: 'Well-trained drivers. Someone who knows how to handle emergencies and treats all children with respect.',
        userName: 'Parent - Sarah Mitchell',
        role: 'participant',
        roomId: 'room-1',
        timestamp: new Date(Date.now() - 7450000).toISOString(),
        type: 'chat'
      },
      {
        id: uuidv4(),
        text: 'Good buses that are maintained properly. Not the old broken-down buses they have been using for Black routes.',
        userName: 'Parent - James Washington',
        role: 'participant',
        roomId: 'room-1',
        timestamp: new Date(Date.now() - 7400000).toISOString(),
        type: 'chat'
      },
      {
        id: uuidv4(),
        text: 'The union can guarantee proper training for all drivers. We can establish certification requirements and ongoing safety training. No driver should be on the road without proper credentials.',
        userName: 'Union Rep - Tom Bradley',
        role: 'participant',
        roomId: 'room-1',
        timestamp: new Date(Date.now() - 7350000).toISOString(),
        type: 'chat'
      },
      {
        id: uuidv4(),
        text: 'What about bus monitors? An adult on each bus to supervise and help in emergencies?',
        userName: 'Parent - Sarah Mitchell',
        role: 'participant',
        roomId: 'room-1',
        timestamp: new Date(Date.now() - 7300000).toISOString(),
        type: 'chat'
      },
      {
        id: uuidv4(),
        text: 'That would be good. Especially for the younger children. And those monitors should reflect the diversity of the students - Black and white adults working together.',
        userName: 'Parent - James Washington',
        role: 'participant',
        roomId: 'room-1',
        timestamp: new Date(Date.now() - 7250000).toISOString(),
        type: 'chat'
      },
      {
        id: uuidv4(),
        text: 'What about route times? Some of these proposed routes are 45 minutes to an hour. That is too long for small children.',
        userName: 'Parent - Sarah Mitchell',
        role: 'participant',
        roomId: 'room-1',
        timestamp: new Date(Date.now() - 7200000).toISOString(),
        type: 'chat'
      },
      {
        id: uuidv4(),
        text: 'Agreed. My son has been doing that for years and it is exhausting for him. Can we look at the routes and see if there are ways to reduce travel time for ALL students?',
        userName: 'Parent - James Washington',
        role: 'participant',
        roomId: 'room-1',
        timestamp: new Date(Date.now() - 7150000).toISOString(),
        type: 'chat'
      },
      {
        id: uuidv4(),
        text: 'We need to look at school pairings strategically. Maybe some schools can be paired that are closer together. The goal is integration, not maximum distance.',
        userName: 'Principal Davis',
        role: 'participant',
        roomId: 'room-1',
        timestamp: new Date(Date.now() - 7100000).toISOString(),
        type: 'chat'
      },
      {
        id: uuidv4(),
        text: 'What about communication? If there is a problem or delay, how do parents know?',
        userName: 'Parent - Sarah Mitchell',
        role: 'participant',
        roomId: 'room-1',
        timestamp: new Date(Date.now() - 7050000).toISOString(),
        type: 'chat'
      },
      {
        id: uuidv4(),
        text: 'Two-way radios on every bus. Direct line to the transportation office. And a phone tree system so parents can be notified quickly.',
        userName: 'Union Rep - Tom Bradley',
        role: 'participant',
        roomId: 'room-1',
        timestamp: new Date(Date.now() - 7000000).toISOString(),
        type: 'chat'
      },
      {
        id: uuidv4(),
        text: 'I want to say something. When we started this discussion, I was defensive. But listening to you talk about your son riding past white schools all these years... I realize my children have had privileges I never acknowledged.',
        userName: 'Parent - Sarah Mitchell',
        role: 'participant',
        roomId: 'room-1',
        timestamp: new Date(Date.now() - 6950000).toISOString(),
        type: 'chat'
      },
      {
        id: uuidv4(),
        text: 'I appreciate you saying that. And I understand your fears are real - they are the same fears I have had for years. Maybe we can work together to make sure ALL our children are safe.',
        userName: 'Parent - James Washington',
        role: 'participant',
        roomId: 'room-1',
        timestamp: new Date(Date.now() - 6900000).toISOString(),
        type: 'chat'
      },
      {
        id: uuidv4(),
        text: 'Let me summarize what I am hearing: Equal quality buses for all routes, certified trained drivers, bus monitors especially for younger children, optimized routes to minimize travel time, and clear communication systems. Is that right?',
        userName: 'Principal Davis',
        role: 'participant',
        roomId: 'room-1',
        timestamp: new Date(Date.now() - 6850000).toISOString(),
        type: 'chat'
      },
      {
        id: uuidv4(),
        text: 'Yes. And one more thing - regular safety drills so children know what to do in emergencies. Make it routine, not scary.',
        userName: 'Parent - Sarah Mitchell',
        role: 'participant',
        roomId: 'room-1',
        timestamp: new Date(Date.now() - 6800000).toISOString(),
        type: 'chat'
      },
      {
        id: uuidv4(),
        text: 'And accountability. If there are problems, there needs to be a clear process for parents to report concerns and get them addressed quickly.',
        userName: 'Parent - James Washington',
        role: 'participant',
        roomId: 'room-1',
        timestamp: new Date(Date.now() - 6750000).toISOString(),
        type: 'chat'
      },
      {
        id: uuidv4(),
        text: 'The union will commit to those standards. We want safe transportation for all children - that is not negotiable.',
        userName: 'Union Rep - Tom Bradley',
        role: 'participant',
        roomId: 'room-1',
        timestamp: new Date(Date.now() - 6700000).toISOString(),
        type: 'chat'
      },
      {
        id: uuidv4(),
        text: 'I think we have some solid recommendations to bring back to the full group. This was harder than I expected, but I think we found common ground.',
        userName: 'Principal Davis',
        role: 'participant',
        roomId: 'room-1',
        timestamp: new Date(Date.now() - 6650000).toISOString(),
        type: 'chat'
      }
    ],
    'room-2': [
      {
        id: uuidv4(),
        text: 'Welcome everyone. Our focus is Educational Quality and Resources. We need to ensure that integration does not mean lowering standards. How do we maintain academic excellence while creating diverse classrooms?',
        userName: 'Teacher - Mrs. Henderson',
        role: 'participant',
        roomId: 'room-2',
        timestamp: new Date(Date.now() - 7800000).toISOString(),
        type: 'chat'
      },
      {
        id: uuidv4(),
        text: 'I need to stop you right there. The assumption that Black students will lower standards is exactly the kind of racism we are fighting. Many Black students are academically advanced but have been held back by inferior resources.',
        userName: 'Howard Fuller',
        role: 'participant',
        roomId: 'room-2',
        timestamp: new Date(Date.now() - 7750000).toISOString(),
        type: 'chat'
      },
      {
        id: uuidv4(),
        text: 'I apologize - that came out wrong. I did not mean to imply that Black students are less capable. I meant how do we ensure quality education during this transition period for ALL students.',
        userName: 'Teacher - Mrs. Henderson',
        role: 'participant',
        roomId: 'room-2',
        timestamp: new Date(Date.now() - 7700000).toISOString(),
        type: 'chat'
      },
      {
        id: uuidv4(),
        text: 'Let me share some facts. At Hillside High School, the Black school, we have students scoring in the top percentiles on national tests. But they are doing it with textbooks from 1955 and science labs with broken equipment.',
        userName: 'Howard Fuller',
        role: 'participant',
        roomId: 'room-2',
        timestamp: new Date(Date.now() - 7650000).toISOString(),
        type: 'chat'
      },
      {
        id: uuidv4(),
        text: 'I did not know the conditions were that bad. That is unacceptable.',
        userName: 'Teacher - Mrs. Henderson',
        role: 'participant',
        roomId: 'room-2',
        timestamp: new Date(Date.now() - 7600000).toISOString(),
        type: 'chat'
      },
      {
        id: uuidv4(),
        text: 'That is the point. Separate has never been equal. Integration is not just about putting Black and white children in the same building - it is about finally providing equal resources.',
        userName: 'Howard Fuller',
        role: 'participant',
        roomId: 'room-2',
        timestamp: new Date(Date.now() - 7550000).toISOString(),
        type: 'chat'
      },
      {
        id: uuidv4(),
        text: 'You are absolutely right. What we need is equitable distribution of resources - good teachers, updated textbooks, proper facilities - across ALL schools regardless of racial composition.',
        userName: 'School Board Member Johnson',
        role: 'project_manager',
        roomId: 'room-2',
        timestamp: new Date(Date.now() - 7500000).toISOString(),
        type: 'chat'
      },
      {
        id: uuidv4(),
        text: 'How do we ensure that happens? Because I have heard promises before.',
        userName: 'Howard Fuller',
        role: 'participant',
        roomId: 'room-2',
        timestamp: new Date(Date.now() - 7450000).toISOString(),
        type: 'chat'
      },
      {
        id: uuidv4(),
        text: 'We need a transparent budget process. Every school should have the same per-pupil spending for materials, facilities, and teacher salaries. No exceptions.',
        userName: 'School Board Member Johnson',
        role: 'project_manager',
        roomId: 'room-2',
        timestamp: new Date(Date.now() - 7400000).toISOString(),
        type: 'chat'
      },
      {
        id: uuidv4(),
        text: 'What about teacher quality? I have been teaching for 15 years. How do we make sure experienced teachers do not all flee to certain schools?',
        userName: 'Teacher - Mrs. Henderson',
        role: 'participant',
        roomId: 'room-2',
        timestamp: new Date(Date.now() - 7350000).toISOString(),
        type: 'chat'
      },
      {
        id: uuidv4(),
        text: 'Incentives for teaching in integrated schools. Extra pay, smaller class sizes, better support. Make it attractive for good teachers to stay.',
        userName: 'Howard Fuller',
        role: 'participant',
        roomId: 'room-2',
        timestamp: new Date(Date.now() - 7300000).toISOString(),
        type: 'chat'
      },
      {
        id: uuidv4(),
        text: 'And training. Teachers need training on how to teach diverse classrooms, how to recognize and address our own biases, how to create inclusive curriculum.',
        userName: 'Teacher - Mrs. Henderson',
        role: 'participant',
        roomId: 'room-2',
        timestamp: new Date(Date.now() - 7250000).toISOString(),
        type: 'chat'
      },
      {
        id: uuidv4(),
        text: 'Yes! And that curriculum needs to include Black history and contributions. Not just in February, but integrated throughout the year.',
        userName: 'Howard Fuller',
        role: 'participant',
        roomId: 'room-2',
        timestamp: new Date(Date.now() - 7200000).toISOString(),
        type: 'chat'
      },
      {
        id: uuidv4(),
        text: 'I can commit to funding for professional development. We can bring in experts to train teachers over the summer before integration begins.',
        userName: 'School Board Member Johnson',
        role: 'project_manager',
        roomId: 'room-2',
        timestamp: new Date(Date.now() - 7150000).toISOString(),
        type: 'chat'
      },
      {
        id: uuidv4(),
        text: 'What about tracking? Some schools separate students by ability level. That often ends up segregating within the school.',
        userName: 'Howard Fuller',
        role: 'participant',
        roomId: 'room-2',
        timestamp: new Date(Date.now() - 7100000).toISOString(),
        type: 'chat'
      },
      {
        id: uuidv4(),
        text: 'That is a real concern. But we also need to challenge advanced students. Maybe we need more flexible grouping - not permanent tracks, but fluid groups based on specific skills and subjects.',
        userName: 'Teacher - Mrs. Henderson',
        role: 'participant',
        roomId: 'room-2',
        timestamp: new Date(Date.now() - 7050000).toISOString(),
        type: 'chat'
      },
      {
        id: uuidv4(),
        text: 'And we need to make sure Black students have equal access to advanced classes. No more assumptions about who belongs in which level.',
        userName: 'Howard Fuller',
        role: 'participant',
        roomId: 'room-2',
        timestamp: new Date(Date.now() - 7000000).toISOString(),
        type: 'chat'
      },
      {
        id: uuidv4(),
        text: 'Agreed. Placement should be based on objective criteria and parent input, not teacher assumptions.',
        userName: 'Teacher - Mrs. Henderson',
        role: 'participant',
        roomId: 'room-2',
        timestamp: new Date(Date.now() - 6950000).toISOString(),
        type: 'chat'
      },
      {
        id: uuidv4(),
        text: 'What about extracurriculars? Sports, music, clubs. Those are where a lot of integration can happen naturally.',
        userName: 'School Board Member Johnson',
        role: 'project_manager',
        roomId: 'room-2',
        timestamp: new Date(Date.now() - 6900000).toISOString(),
        type: 'chat'
      },
      {
        id: uuidv4(),
        text: 'Equal funding for all programs. And we need to make sure Black students feel welcome in all activities, not just basketball and football.',
        userName: 'Howard Fuller',
        role: 'participant',
        roomId: 'room-2',
        timestamp: new Date(Date.now() - 6850000).toISOString(),
        type: 'chat'
      },
      {
        id: uuidv4(),
        text: 'I want to say something. When we started, I was defensive. But you have opened my eyes to inequities I never saw. I am committed to being part of the solution.',
        userName: 'Teacher - Mrs. Henderson',
        role: 'participant',
        roomId: 'room-2',
        timestamp: new Date(Date.now() - 6800000).toISOString(),
        type: 'chat'
      },
      {
        id: uuidv4(),
        text: 'That means a lot. And I appreciate your willingness to learn. We need teachers like you who care about doing this right.',
        userName: 'Howard Fuller',
        role: 'participant',
        roomId: 'room-2',
        timestamp: new Date(Date.now() - 6750000).toISOString(),
        type: 'chat'
      },
      {
        id: uuidv4(),
        text: 'Let me summarize our recommendations: Equal per-pupil funding, teacher training on diversity and inclusion, incentives for quality teachers, flexible ability grouping, equal access to advanced classes, inclusive curriculum, and equal extracurricular funding.',
        userName: 'School Board Member Johnson',
        role: 'project_manager',
        roomId: 'room-2',
        timestamp: new Date(Date.now() - 6700000).toISOString(),
        type: 'chat'
      },
      {
        id: uuidv4(),
        text: 'And accountability measures to ensure these commitments are kept.',
        userName: 'Howard Fuller',
        role: 'participant',
        roomId: 'room-2',
        timestamp: new Date(Date.now() - 6650000).toISOString(),
        type: 'chat'
      },
      {
        id: uuidv4(),
        text: 'Absolutely. Regular reporting to the community on progress.',
        userName: 'School Board Member Johnson',
        role: 'project_manager',
        roomId: 'room-2',
        timestamp: new Date(Date.now() - 6600000).toISOString(),
        type: 'chat'
      }
    ],
    'room-3': [
      {
        id: uuidv4(),
        text: 'Welcome to Community Concerns and Property Values. I have been told that property values will drop if schools integrate. People are afraid of losing their life savings invested in their homes. This is what I am hearing from working-class white families.',
        userName: 'C.P. Ellis',
        role: 'analyst',
        roomId: 'room-3',
        timestamp: new Date(Date.now() - 7800000).toISOString(),
        type: 'chat'
      },
      {
        id: uuidv4(),
        text: 'That fear has been used to keep communities divided for too long. Real estate agents have been using scare tactics - blockbusting they call it - to profit from racial fears. The real threat to property values is white flight and disinvestment, not integration itself.',
        userName: 'Rev. Leon White',
        role: 'participant',
        roomId: 'room-3',
        timestamp: new Date(Date.now() - 7750000).toISOString(),
        type: 'chat'
      },
      {
        id: uuidv4(),
        text: 'But I have seen it happen. A Black family moves in, and within a year, half the white families have moved out. Property values do drop.',
        userName: 'C.P. Ellis',
        role: 'analyst',
        roomId: 'room-3',
        timestamp: new Date(Date.now() - 7700000).toISOString(),
        type: 'chat'
      },
      {
        id: uuidv4(),
        text: 'But WHY do they drop? Because white families panic and sell. Because banks redline Black neighborhoods and refuse mortgages. Because the city stops investing in infrastructure. It is a self-fulfilling prophecy.',
        userName: 'Rev. Leon White',
        role: 'participant',
        roomId: 'room-3',
        timestamp: new Date(Date.now() - 7650000).toISOString(),
        type: 'chat'
      },
      {
        id: uuidv4(),
        text: 'I never thought about it that way. If everyone stays and invests in making our schools better, maybe we all benefit. But how do we overcome the fear? It is real for people.',
        userName: 'Mary Ellis',
        role: 'participant',
        roomId: 'room-3',
        timestamp: new Date(Date.now() - 7600000).toISOString(),
        type: 'chat'
      },
      {
        id: uuidv4(),
        text: 'You are right that the fear is real. But we need to ask - who benefits from that fear? Not working-class white families. Not Black families. The people who benefit are the real estate speculators and the politicians who use racial division to stay in power.',
        userName: 'Rev. Leon White',
        role: 'participant',
        roomId: 'room-3',
        timestamp: new Date(Date.now() - 7550000).toISOString(),
        type: 'chat'
      },
      {
        id: uuidv4(),
        text: 'I have been in the Klan. I have said terrible things about Black people. But sitting here, listening to you... I am starting to see that I have been played. They told me Black people were the enemy, but maybe the real enemy is the system that keeps all of us poor and fighting each other.',
        userName: 'C.P. Ellis',
        role: 'analyst',
        roomId: 'room-3',
        timestamp: new Date(Date.now() - 7500000).toISOString(),
        type: 'chat'
      },
      {
        id: uuidv4(),
        text: 'That is a profound realization, C.P. And it takes courage to say that out loud.',
        userName: 'Rev. Leon White',
        role: 'participant',
        roomId: 'room-3',
        timestamp: new Date(Date.now() - 7450000).toISOString(),
        type: 'chat'
      },
      {
        id: uuidv4(),
        text: 'So what do we do? How do we convince people to stay in their neighborhoods when schools integrate?',
        userName: 'Mary Ellis',
        role: 'participant',
        roomId: 'room-3',
        timestamp: new Date(Date.now() - 7400000).toISOString(),
        type: 'chat'
      },
      {
        id: uuidv4(),
        text: 'We need to show them that integrated schools can be excellent schools. Better facilities, better programs, more resources. Make staying the attractive option.',
        userName: 'Rev. Leon White',
        role: 'participant',
        roomId: 'room-3',
        timestamp: new Date(Date.now() - 7350000).toISOString(),
        type: 'chat'
      },
      {
        id: uuidv4(),
        text: 'And we need community events. Bring families together - Black and white - around things we all care about. Sports, music, neighborhood cleanups. Let people see each other as neighbors, not threats.',
        userName: 'Mary Ellis',
        role: 'participant',
        roomId: 'room-3',
        timestamp: new Date(Date.now() - 7300000).toISOString(),
        type: 'chat'
      },
      {
        id: uuidv4(),
        text: 'What about the banks? If they keep redlining, property values will drop regardless of what we do.',
        userName: 'C.P. Ellis',
        role: 'analyst',
        roomId: 'room-3',
        timestamp: new Date(Date.now() - 7250000).toISOString(),
        type: 'chat'
      },
      {
        id: uuidv4(),
        text: 'We need to pressure the banks. Federal regulations are changing. We can demand fair lending practices. And we can support credit unions and community banks that will serve all neighborhoods equally.',
        userName: 'Rev. Leon White',
        role: 'participant',
        roomId: 'room-3',
        timestamp: new Date(Date.now() - 7200000).toISOString(),
        type: 'chat'
      },
      {
        id: uuidv4(),
        text: 'I own a small gas station. I have been worried about losing customers if the neighborhood changes. But maybe if we all commit to staying and supporting local businesses, we can all do better.',
        userName: 'C.P. Ellis',
        role: 'analyst',
        roomId: 'room-3',
        timestamp: new Date(Date.now() - 7150000).toISOString(),
        type: 'chat'
      },
      {
        id: uuidv4(),
        text: 'Exactly! Black families have money to spend too. An integrated neighborhood means more customers, not fewer. But only if businesses treat everyone with respect.',
        userName: 'Rev. Leon White',
        role: 'participant',
        roomId: 'room-3',
        timestamp: new Date(Date.now() - 7100000).toISOString(),
        type: 'chat'
      },
      {
        id: uuidv4(),
        text: 'What about crime? People say crime will go up with integration.',
        userName: 'Mary Ellis',
        role: 'participant',
        roomId: 'room-3',
        timestamp: new Date(Date.now() - 7050000).toISOString(),
        type: 'chat'
      },
      {
        id: uuidv4(),
        text: 'That is another racist myth. Crime is related to poverty and lack of opportunity, not race. If we invest in our schools, create jobs, provide services - crime goes down for everyone.',
        userName: 'Rev. Leon White',
        role: 'participant',
        roomId: 'room-3',
        timestamp: new Date(Date.now() - 7000000).toISOString(),
        type: 'chat'
      },
      {
        id: uuidv4(),
        text: 'I have to be honest. I have believed these things my whole life. My daddy believed them, his daddy believed them. It is hard to let go of what you have always been taught.',
        userName: 'C.P. Ellis',
        role: 'analyst',
        roomId: 'room-3',
        timestamp: new Date(Date.now() - 6950000).toISOString(),
        type: 'chat'
      },
      {
        id: uuidv4(),
        text: 'I respect your honesty, C.P. Change is hard. But you are here, you are listening, you are questioning. That is more than most people do.',
        userName: 'Rev. Leon White',
        role: 'participant',
        roomId: 'room-3',
        timestamp: new Date(Date.now() - 6900000).toISOString(),
        type: 'chat'
      },
      {
        id: uuidv4(),
        text: 'Can I ask you something, Reverend? Do you think white people and Black people can really live together peacefully? Or is this all just wishful thinking?',
        userName: 'C.P. Ellis',
        role: 'analyst',
        roomId: 'room-3',
        timestamp: new Date(Date.now() - 6850000).toISOString(),
        type: 'chat'
      },
      {
        id: uuidv4(),
        text: 'I believe we can. Not because people are naturally good, but because we have no choice. We are all stuck in Durham together. We can keep fighting and all suffer, or we can work together and all benefit. It is that simple.',
        userName: 'Rev. Leon White',
        role: 'participant',
        roomId: 'room-3',
        timestamp: new Date(Date.now() - 6800000).toISOString(),
        type: 'chat'
      },
      {
        id: uuidv4(),
        text: 'I like that. Practical, not preachy. What are our recommendations for the full group?',
        userName: 'C.P. Ellis',
        role: 'analyst',
        roomId: 'room-3',
        timestamp: new Date(Date.now() - 6750000).toISOString(),
        type: 'chat'
      },
      {
        id: uuidv4(),
        text: 'Invest in integrated schools to make them excellent. Community events to build relationships. Pressure banks for fair lending. Support local businesses that serve everyone. Address poverty and opportunity, not just race.',
        userName: 'Rev. Leon White',
        role: 'participant',
        roomId: 'room-3',
        timestamp: new Date(Date.now() - 6700000).toISOString(),
        type: 'chat'
      },
      {
        id: uuidv4(),
        text: 'And education. People need to understand that their fears are being manipulated. The truth will set us free, as they say.',
        userName: 'Mary Ellis',
        role: 'participant',
        roomId: 'room-3',
        timestamp: new Date(Date.now() - 6650000).toISOString(),
        type: 'chat'
      },
      {
        id: uuidv4(),
        text: 'I never thought I would be sitting in a room with a Black minister, agreeing on anything. But here we are. Maybe there is hope after all.',
        userName: 'C.P. Ellis',
        role: 'analyst',
        roomId: 'room-3',
        timestamp: new Date(Date.now() - 6600000).toISOString(),
        type: 'chat'
      }
    ],
    'room-4': [
      {
        id: uuidv4(),
        text: 'Welcome to Student Welfare and Social Integration. Our primary concern must be the safety and well-being of students. How do we protect children from harassment, bullying, and discrimination during this transition?',
        userName: 'Ann Atwater',
        role: 'analyst',
        roomId: 'room-4',
        timestamp: new Date(Date.now() - 7800000).toISOString(),
        type: 'chat'
      },
      {
        id: uuidv4(),
        text: 'We need clear policies, trained staff, and swift consequences for any discriminatory behavior. But we also need positive programming - activities that bring students together around common interests.',
        userName: 'Bill Riddick',
        role: 'analyst',
        roomId: 'room-4',
        timestamp: new Date(Date.now() - 7750000).toISOString(),
        type: 'chat'
      },
      {
        id: uuidv4(),
        text: 'I have been fighting for Black children my whole life. They have been called names, spit on, denied opportunities. This integration cannot just move them into hostile environments. We need guarantees.',
        userName: 'Ann Atwater',
        role: 'analyst',
        roomId: 'room-4',
        timestamp: new Date(Date.now() - 7700000).toISOString(),
        type: 'chat'
      },
      {
        id: uuidv4(),
        text: 'You are absolutely right. Zero tolerance for racial slurs, physical harassment, or exclusion. First offense - immediate consequences. No warnings, no excuses.',
        userName: 'Bill Riddick',
        role: 'analyst',
        roomId: 'room-4',
        timestamp: new Date(Date.now() - 7650000).toISOString(),
        type: 'chat'
      },
      {
        id: uuidv4(),
        text: 'But what about the white children? Some of them have been taught to hate. We cannot just punish children for what their parents taught them.',
        userName: 'Ann Atwater',
        role: 'analyst',
        roomId: 'room-4',
        timestamp: new Date(Date.now() - 7600000).toISOString(),
        type: 'chat'
      },
      {
        id: uuidv4(),
        text: 'Consequences, yes. But also education. Counseling. Help them unlearn the hatred. Give them a chance to be better than their parents.',
        userName: 'Bill Riddick',
        role: 'analyst',
        roomId: 'room-4',
        timestamp: new Date(Date.now() - 7550000).toISOString(),
        type: 'chat'
      },
      {
        id: uuidv4(),
        text: 'What about the teachers? If a teacher has racist attitudes, that poisons the whole classroom.',
        userName: 'Ann Atwater',
        role: 'analyst',
        roomId: 'room-4',
        timestamp: new Date(Date.now() - 7500000).toISOString(),
        type: 'chat'
      },
      {
        id: uuidv4(),
        text: 'Teacher training is essential. But also accountability. If a teacher shows bias in grading, discipline, or expectations - there must be a process to address it. And parents need to be able to report concerns without fear.',
        userName: 'Bill Riddick',
        role: 'analyst',
        roomId: 'room-4',
        timestamp: new Date(Date.now() - 7450000).toISOString(),
        type: 'chat'
      },
      {
        id: uuidv4(),
        text: 'I want Black children to feel proud of who they are. Not ashamed. The curriculum needs to include Black history, Black achievements, Black culture. Not as an add-on, but as part of American history.',
        userName: 'Ann Atwater',
        role: 'analyst',
        roomId: 'room-4',
        timestamp: new Date(Date.now() - 7400000).toISOString(),
        type: 'chat'
      },
      {
        id: uuidv4(),
        text: 'Agreed. And that benefits white children too. They need to learn the full truth of American history, not a sanitized version.',
        userName: 'Bill Riddick',
        role: 'analyst',
        roomId: 'room-4',
        timestamp: new Date(Date.now() - 7350000).toISOString(),
        type: 'chat'
      },
      {
        id: uuidv4(),
        text: 'What about social activities? Lunch, recess, after-school programs. That is where a lot of the real integration happens - or does not happen.',
        userName: 'Ann Atwater',
        role: 'analyst',
        roomId: 'room-4',
        timestamp: new Date(Date.now() - 7300000).toISOString(),
        type: 'chat'
      },
      {
        id: uuidv4(),
        text: 'We need structured integration at first. Assigned lunch tables that mix students. Group projects with diverse teams. Clubs and sports that actively recruit across racial lines.',
        userName: 'Bill Riddick',
        role: 'analyst',
        roomId: 'room-4',
        timestamp: new Date(Date.now() - 7250000).toISOString(),
        type: 'chat'
      },
      {
        id: uuidv4(),
        text: 'Some people will say that is forced. That children should choose their own friends.',
        userName: 'Ann Atwater',
        role: 'analyst',
        roomId: 'room-4',
        timestamp: new Date(Date.now() - 7200000).toISOString(),
        type: 'chat'
      },
      {
        id: uuidv4(),
        text: 'Children naturally segregate if left alone, because that is what they see adults doing. We need to create opportunities for them to discover they have more in common than they think.',
        userName: 'Bill Riddick',
        role: 'analyst',
        roomId: 'room-4',
        timestamp: new Date(Date.now() - 7150000).toISOString(),
        type: 'chat'
      },
      {
        id: uuidv4(),
        text: 'What about peer mediation? Train students to help resolve conflicts between each other. Give them ownership of creating a positive school culture.',
        userName: 'Ann Atwater',
        role: 'analyst',
        roomId: 'room-4',
        timestamp: new Date(Date.now() - 7100000).toISOString(),
        type: 'chat'
      },
      {
        id: uuidv4(),
        text: 'Excellent idea. Students often respond better to other students than to adults. And it teaches leadership and empathy.',
        userName: 'Bill Riddick',
        role: 'analyst',
        roomId: 'room-4',
        timestamp: new Date(Date.now() - 7050000).toISOString(),
        type: 'chat'
      },
      {
        id: uuidv4(),
        text: 'We need counselors. More counselors. Children are going to struggle with this transition. They need adults they can talk to who understand what they are going through.',
        userName: 'Ann Atwater',
        role: 'analyst',
        roomId: 'room-4',
        timestamp: new Date(Date.now() - 7000000).toISOString(),
        type: 'chat'
      },
      {
        id: uuidv4(),
        text: 'And those counselors need to reflect the diversity of the students. Black counselors for Black students who need someone who understands their experience.',
        userName: 'Bill Riddick',
        role: 'analyst',
        roomId: 'room-4',
        timestamp: new Date(Date.now() - 6950000).toISOString(),
        type: 'chat'
      },
      {
        id: uuidv4(),
        text: 'What about parent involvement? Parents need to model the behavior we want to see. If parents are hostile to integration, children will be too.',
        userName: 'Ann Atwater',
        role: 'analyst',
        roomId: 'room-4',
        timestamp: new Date(Date.now() - 6900000).toISOString(),
        type: 'chat'
      },
      {
        id: uuidv4(),
        text: 'Parent education programs. Bring parents together - Black and white - to discuss concerns, share experiences, build relationships. Make them partners in integration, not obstacles.',
        userName: 'Bill Riddick',
        role: 'analyst',
        roomId: 'room-4',
        timestamp: new Date(Date.now() - 6850000).toISOString(),
        type: 'chat'
      },
      {
        id: uuidv4(),
        text: 'I want to see Black children thrive, not just survive. They deserve to feel safe, valued, and capable of achieving anything.',
        userName: 'Ann Atwater',
        role: 'analyst',
        roomId: 'room-4',
        timestamp: new Date(Date.now() - 6800000).toISOString(),
        type: 'chat'
      },
      {
        id: uuidv4(),
        text: 'And white children deserve to grow up without the poison of racism. Integration done right benefits everyone. It makes us all more human.',
        userName: 'Bill Riddick',
        role: 'analyst',
        roomId: 'room-4',
        timestamp: new Date(Date.now() - 6750000).toISOString(),
        type: 'chat'
      },
      {
        id: uuidv4(),
        text: 'Let me summarize: Zero tolerance for discrimination with swift consequences, teacher training and accountability, inclusive curriculum, structured social integration, peer mediation programs, adequate counseling staff, and parent education.',
        userName: 'Ann Atwater',
        role: 'analyst',
        roomId: 'room-4',
        timestamp: new Date(Date.now() - 6700000).toISOString(),
        type: 'chat'
      },
      {
        id: uuidv4(),
        text: 'And regular assessment. We need to measure how students are doing - academically, socially, emotionally. Adjust our approach based on what is working and what is not.',
        userName: 'Bill Riddick',
        role: 'analyst',
        roomId: 'room-4',
        timestamp: new Date(Date.now() - 6650000).toISOString(),
        type: 'chat'
      },
      {
        id: uuidv4(),
        text: 'This is good. Real protections, not just promises. I can take this back to the community.',
        userName: 'Ann Atwater',
        role: 'analyst',
        roomId: 'room-4',
        timestamp: new Date(Date.now() - 6600000).toISOString(),
        type: 'chat'
      }
    ]
  }
};

// Analysis results showing AI detection of constraints, assumptions, and opportunities
const analysisResults = [
  {
    constraints: [
      { keyword: 'court-mandated', context: 'The court has mandated integration', user: 'School Board Member Johnson' },
      { keyword: 'limited resources', context: 'Budget constraints for busing and facilities', user: 'School Board Member Johnson' },
      { keyword: 'time constraint', context: '10-day charrette timeline', user: 'Bill Riddick' }
    ],
    assumptions: [
      { keyword: 'property values', context: 'Assumption that integration lowers property values', user: 'C.P. Ellis' },
      { keyword: 'academic standards', context: 'Assumption about maintaining standards', user: 'Teacher - Mrs. Henderson' },
      { keyword: 'safety fears', context: 'Assumptions about neighborhood safety', user: 'Parent - Sarah Mitchell' }
    ],
    opportunities: [
      { keyword: 'common ground', context: 'Both sides care about children', user: 'Bill Riddick' },
      { keyword: 'shared resources', context: 'Equitable distribution benefits all', user: 'School Board Member Johnson' },
      { keyword: 'community investment', context: 'Staying and investing together', user: 'Rev. Leon White' }
    ],
    timestamp: new Date(Date.now() - 3600000).toISOString()
  }
];

// Final report structure
const report = {
  charetteId: charetteId,
  title: '1971 Durham School Desegregation Summit - Save Our Schools',
  generatedAt: new Date().toISOString(),
  phases: [
    { id: 'introduction', name: 'Introduction', description: 'Welcome and overview' },
    { id: 'data_collection', name: 'Data Collection', description: 'Gather initial information' },
    { id: 'analysis', name: 'Analysis', description: 'Explore constraints and assumptions' },
    { id: 'ideation', name: 'Ideation', description: 'Generate ideas' },
    { id: 'synthesis', name: 'Synthesis', description: 'Combine findings' },
    { id: 'reporting', name: 'Reporting', description: 'Generate final report' }
  ],
  finalPhase: 5,
  summary: {
    totalMessages: Object.values(messages[charetteId]).flat().length,
    totalParticipants: participants.length,
    totalBreakoutRooms: breakoutRooms.length,
    analysisResults: analysisResults,
    reasoningResults: []
  },
  breakoutRooms: breakoutRooms,
  keyFindings: [
    {
      category: 'Transportation & Safety',
      items: [
        'Legitimate concerns about bus safety can be addressed through proper training, maintenance, and supervision',
        'Communication systems and emergency procedures need to be established',
        'Busing distances should be minimized where possible while achieving integration goals'
      ],
      impact: 'High'
    },
    {
      category: 'Educational Quality',
      items: [
        'Integration does not inherently lower academic standards',
        'Equitable resource distribution is essential for all schools',
        'Teacher training and support are critical for successful integration'
      ],
      impact: 'High'
    },
    {
      category: 'Community Trust',
      items: [
        'Fear of property value decline is often unfounded and used to maintain segregation',
        'Community commitment and investment benefit all residents',
        'Building relationships across racial lines strengthens neighborhoods'
      ],
      impact: 'Medium'
    },
    {
      category: 'Student Welfare',
      items: [
        'Clear anti-discrimination policies must be established and enforced',
        'Positive programming can foster cross-cultural friendships',
        'Adult modeling of respectful behavior is essential'
      ],
      impact: 'High'
    }
  ],
  recommendations: [
    {
      priority: 'High',
      action: 'Implement comprehensive bus safety program with trained drivers and clear protocols',
      rationale: 'Addresses legitimate parent concerns while enabling integration'
    },
    {
      priority: 'High',
      action: 'Ensure equitable distribution of resources, teachers, and facilities across all schools',
      rationale: 'Maintains educational quality and demonstrates commitment to all students'
    },
    {
      priority: 'High',
      action: 'Establish clear anti-discrimination policies with swift enforcement',
      rationale: 'Protects student welfare and creates safe learning environment'
    },
    {
      priority: 'Medium',
      action: 'Create community engagement programs to build trust across neighborhoods',
      rationale: 'Reduces fear and builds long-term community cohesion'
    },
    {
      priority: 'Medium',
      action: 'Develop positive student programming that fosters cross-cultural relationships',
      rationale: 'Helps students adapt and builds foundation for integrated society'
    }
  ],
  nextSteps: [
    'School Board to vote on integration plan incorporating charrette recommendations',
    'Establish implementation committee with representatives from all stakeholder groups',
    'Develop detailed transportation and safety protocols',
    'Create teacher training program for integrated classrooms',
    'Launch community education campaign to address fears and build support',
    'Monitor implementation and adjust based on feedback'
  ],
  historicalNote: 'This charrette, facilitated by Bill Riddick in July 1971, brought together unlikely allies Ann Atwater (civil rights activist) and C.P. Ellis (KKK leader) as co-chairs. Through 10 days of intense dialogue, they found common ground in their shared concern for children and working-class families. The charrette successfully developed a school integration plan that was adopted by Durham Public Schools. The story was later documented in the book and film "The Best of Enemies."'
};

// Create the charette object
const charette = {
  id: charetteId,
  title: '1971 Durham School Desegregation Summit',
  description: 'Historic 10-day "Save Our Schools" charrette to develop integration plan for Durham Public Schools',
  currentPhase: 5,
  createdAt: new Date(Date.now() - 864000000).toISOString(), // 10 days ago
  phases: report.phases,
  analysis: analysisResults,
  participants: participants,
  breakoutRooms: breakoutRooms,
  metadata: {
    title: '1971 Durham School Desegregation Summit',
    scope: 'Develop actionable integration plan for Durham Public Schools following court-mandated desegregation',
    stakeholders: 'Parents (Black and white), teachers, school administrators, community activists, KKK members, civil rights leaders, union representatives, school board members',
    objectives: 'Create integration plan that ensures student safety, maintains educational quality, addresses community concerns, and complies with court mandate',
    constraints: 'Court deadline, limited budget, deep racial tensions, fear and mistrust between communities, 10-day timeline',
    timeframe: '10 days (July 1971)',
    desiredOutcomes: 'Consensus-based integration plan, improved community understanding, concrete safety and quality assurance measures, commitment from all stakeholders'
  }
};

module.exports = {
  charette,
  messages,
  report
};
