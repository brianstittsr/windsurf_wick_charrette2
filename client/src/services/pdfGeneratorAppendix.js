// Advanced Reframing Methods Appendix for PDF Generator
// Comprehensive implementation of all reframing techniques

export function addCognitiveRestructuringAppendix() {
  this.checkPageBreak(30);
  
  this.doc.setFillColor(230, 230, 250);
  this.doc.rect(this.margin, this.currentY, this.pageWidth - 2 * this.margin, 8, 'F');
  
  this.doc.setFontSize(11);
  this.doc.setFont(undefined, 'bold');
  this.doc.text('1. Cognitive Restructuring (CBT)', this.margin + 3, this.currentY + 5);
  
  this.currentY += 12;
  this.doc.setFontSize(9);
  this.doc.setFont(undefined, 'italic');
  this.addWrappedText('Systematic approach to identifying and changing distorted thought patterns');
  
  this.currentY += 8;
  this.doc.setFont(undefined, 'bold');
  this.doc.text('Five-Step Process:', this.margin, this.currentY);
  
  this.currentY += 5;
  this.doc.setFont(undefined, 'normal');
  const steps = [
    '1. Identify the automatic negative thought',
    '2. Examine the evidence for and against the thought',
    '3. Generate alternative, more balanced thoughts',
    '4. Evaluate the emotional impact of the new thought',
    '5. Practice and reinforce the new thinking pattern'
  ];
  
  steps.forEach(step => {
    this.checkPageBreak(6);
    this.doc.text(step, this.margin + 5, this.currentY);
    this.currentY += 5;
  });
  
  this.currentY += 5;
  this.doc.setFont(undefined, 'bold');
  this.doc.text('Applied Example:', this.margin, this.currentY);
  
  this.currentY += 5;
  this.doc.setFillColor(255, 240, 240);
  this.doc.rect(this.margin, this.currentY, this.pageWidth - 2 * this.margin, 25, 'F');
  
  this.doc.setFont(undefined, 'normal');
  this.doc.setFontSize(8);
  this.currentY += 4;
  this.doc.text('Situation: Resistance to school integration plan', this.margin + 3, this.currentY);
  this.currentY += 4;
  this.doc.setTextColor(200, 0, 0);
  this.doc.text('Automatic Thought: "This change will destroy our community and harm our children"', this.margin + 3, this.currentY);
  this.currentY += 4;
  this.doc.setTextColor(0, 0, 0);
  this.doc.text('Evidence FOR: Fear of unknown, past experiences, safety concerns', this.margin + 3, this.currentY);
  this.currentY += 4;
  this.doc.text('Evidence AGAINST: No evidence of harm yet, other communities succeeded, children resilient', this.margin + 3, this.currentY);
  this.currentY += 4;
  this.doc.setTextColor(0, 150, 0);
  this.doc.text('Balanced Thought: "This brings uncertainty, but with planning we can create better education"', this.margin + 3, this.currentY);
  this.currentY += 4;
  this.doc.setTextColor(0, 0, 200);
  this.doc.text('Emotional Shift: From fear and resistance → to cautious optimism and engagement', this.margin + 3, this.currentY);
  
  this.doc.setTextColor(0, 0, 0);
  this.currentY += 8;
}

export function addSocraticQuestioningAppendix() {
  this.checkPageBreak(30);
  
  this.doc.setFillColor(230, 240, 255);
  this.doc.rect(this.margin, this.currentY, this.pageWidth - 2 * this.margin, 8, 'F');
  
  this.doc.setFontSize(11);
  this.doc.setFont(undefined, 'bold');
  this.doc.text('2. Socratic Questioning', this.margin + 3, this.currentY + 5);
  
  this.currentY += 12;
  this.doc.setFontSize(9);
  this.doc.setFont(undefined, 'italic');
  this.addWrappedText('Disciplined questioning to examine assumptions and uncover deeper understanding');
  
  this.currentY += 8;
  
  const categories = [
    {
      type: 'Clarification Questions',
      examples: [
        'What exactly do you mean by "our way of life"?',
        'Can you give a specific example of what concerns you?'
      ]
    },
    {
      type: 'Probing Assumptions',
      examples: [
        'What are you assuming about how children will interact?',
        'Is this based on direct experience or what you\'ve heard?'
      ]
    },
    {
      type: 'Probing Reasons & Evidence',
      examples: [
        'What evidence supports this view?',
        'Are there examples that contradict this belief?'
      ]
    },
    {
      type: 'Exploring Implications',
      examples: [
        'If we follow this path, what are the likely outcomes?',
        'How might this affect the community in 10 years?'
      ]
    },
    {
      type: 'Alternative Perspectives',
      examples: [
        'How might someone with a different background view this?',
        'What would future generations say about this decision?'
      ]
    }
  ];
  
  categories.forEach(cat => {
    this.checkPageBreak(20);
    
    this.doc.setFont(undefined, 'bold');
    this.doc.setFontSize(9);
    this.doc.text(cat.type + ':', this.margin, this.currentY);
    
    this.currentY += 5;
    this.doc.setFont(undefined, 'normal');
    this.doc.setFontSize(8);
    
    cat.examples.forEach(ex => {
      this.checkPageBreak(5);
      this.doc.text('• ' + ex, this.margin + 5, this.currentY);
      this.currentY += 4;
    });
    
    this.currentY += 3;
  });
}

export function addNLPReframingAppendix() {
  this.checkPageBreak(30);
  
  this.doc.setFillColor(230, 255, 230);
  this.doc.rect(this.margin, this.currentY, this.pageWidth - 2 * this.margin, 8, 'F');
  
  this.doc.setFontSize(11);
  this.doc.setFont(undefined, 'bold');
  this.doc.text('3. NLP Reframing Techniques', this.margin + 3, this.currentY + 5);
  
  this.currentY += 12;
  this.doc.setFontSize(9);
  this.doc.setFont(undefined, 'italic');
  this.addWrappedText('Neuro-Linguistic Programming methods to shift perception through context and content changes');
  
  this.currentY += 10;
  
  // Context Reframing
  this.doc.setFont(undefined, 'bold');
  this.doc.setFontSize(9);
  this.doc.text('A. Context Reframing', this.margin, this.currentY);
  this.currentY += 5;
  
  this.doc.setFont(undefined, 'italic');
  this.doc.setFontSize(8);
  this.doc.text('Principle: Every behavior is useful in some context', this.margin + 3, this.currentY);
  this.currentY += 5;
  
  this.doc.setFillColor(255, 245, 230);
  this.doc.rect(this.margin, this.currentY, this.pageWidth - 2 * this.margin, 20, 'F');
  
  this.doc.setFont(undefined, 'normal');
  this.currentY += 4;
  this.doc.setTextColor(200, 0, 0);
  this.doc.text('Original: "Parents are being stubborn and resistant to change"', this.margin + 3, this.currentY);
  this.currentY += 4;
  this.doc.setTextColor(0, 0, 200);
  this.doc.text('Context: In the context of protecting their children', this.margin + 3, this.currentY);
  this.currentY += 4;
  this.doc.setTextColor(0, 150, 0);
  this.addWrappedText('Reframed: "Parents demonstrating strong advocacy - valuable qualities we can channel"', this.margin + 3);
  this.currentY += 4;
  this.doc.setTextColor(0, 0, 0);
  this.doc.text('Shift: From obstacle → to asset', this.margin + 3, this.currentY);
  
  this.currentY += 8;
  
  // Content Reframing
  this.doc.setFont(undefined, 'bold');
  this.doc.setFontSize(9);
  this.doc.text('B. Content Reframing', this.margin, this.currentY);
  this.currentY += 5;
  
  this.doc.setFont(undefined, 'italic');
  this.doc.setFontSize(8);
  this.doc.text('Principle: The meaning depends on the frame in which we perceive it', this.margin + 3, this.currentY);
  this.currentY += 5;
  
  this.doc.setFillColor(255, 245, 230);
  this.doc.rect(this.margin, this.currentY, this.pageWidth - 2 * this.margin, 16, 'F');
  
  this.doc.setFont(undefined, 'normal');
  this.currentY += 4;
  this.doc.setTextColor(200, 0, 0);
  this.doc.text('Original: "We\'re losing our neighborhood schools"', this.margin + 3, this.currentY);
  this.currentY += 4;
  this.doc.setTextColor(0, 150, 0);
  this.addWrappedText('Reframed: "We\'re gaining access to enhanced resources and diverse learning environments"', this.margin + 3);
  this.currentY += 4;
  this.doc.setTextColor(0, 0, 0);
  this.doc.text('Shift: Loss frame → Gain frame', this.margin + 3, this.currentY);
  
  this.doc.setTextColor(0, 0, 0);
  this.currentY += 8;
  
  // Outcome Reframing
  this.doc.setFont(undefined, 'bold');
  this.doc.setFontSize(9);
  this.doc.text('C. Outcome Reframing', this.margin, this.currentY);
  this.currentY += 5;
  
  this.doc.setFont(undefined, 'italic');
  this.doc.setFontSize(8);
  this.doc.text('Focus on desired outcomes rather than problems', this.margin + 3, this.currentY);
  this.currentY += 5;
  
  this.doc.setFillColor(255, 245, 230);
  this.doc.rect(this.margin, this.currentY, this.pageWidth - 2 * this.margin, 16, 'F');
  
  this.doc.setFont(undefined, 'normal');
  this.currentY += 4;
  this.doc.setTextColor(200, 0, 0);
  this.doc.text('Problem: "We don\'t want forced integration"', this.margin + 3, this.currentY);
  this.currentY += 4;
  this.doc.setTextColor(0, 0, 200);
  this.doc.text('Outcome: "We want quality education and safe environments for all children"', this.margin + 3, this.currentY);
  this.currentY += 4;
  this.doc.setTextColor(0, 150, 0);
  this.addWrappedText('Reframed: "Let\'s design a plan that ensures quality and safety for every child"', this.margin + 3);
  this.currentY += 4;
  this.doc.setTextColor(0, 0, 0);
  this.doc.text('Shift: Away from → Toward', this.margin + 3, this.currentY);
  
  this.doc.setTextColor(0, 0, 0);
  this.currentY += 8;
  
  // Presupposition Reframing
  this.doc.setFont(undefined, 'bold');
  this.doc.setFontSize(9);
  this.doc.text('D. Presupposition Reframing', this.margin, this.currentY);
  this.currentY += 5;
  
  this.doc.setFont(undefined, 'italic');
  this.doc.setFontSize(8);
  this.doc.text('Change underlying assumptions in the language', this.margin + 3, this.currentY);
  this.currentY += 5;
  
  this.doc.setFillColor(255, 245, 230);
  this.doc.rect(this.margin, this.currentY, this.pageWidth - 2 * this.margin, 20, 'F');
  
  this.doc.setFont(undefined, 'normal');
  this.currentY += 4;
  this.doc.setTextColor(200, 0, 0);
  this.doc.text('Original: "If we integrate, will our children be safe?"', this.margin + 3, this.currentY);
  this.currentY += 4;
  this.doc.setTextColor(150, 0, 0);
  this.doc.text('Presupposition: Integration threatens safety', this.margin + 3, this.currentY);
  this.currentY += 4;
  this.doc.setTextColor(0, 150, 0);
  this.addWrappedText('Reframed: "How can we ensure all children are safe as we create integrated environments?"', this.margin + 3);
  this.currentY += 4;
  this.doc.setTextColor(0, 100, 0);
  this.doc.text('New Presupposition: Integration is happening, safety is achievable', this.margin + 3, this.currentY);
  
  this.doc.setTextColor(0, 0, 0);
  this.currentY += 10;
}

export function addSixStepReframingAppendix() {
  this.checkPageBreak(30);
  
  this.doc.setFillColor(255, 240, 220);
  this.doc.rect(this.margin, this.currentY, this.pageWidth - 2 * this.margin, 8, 'F');
  
  this.doc.setFontSize(11);
  this.doc.setFont(undefined, 'bold');
  this.doc.text('4. Six-Step Reframing', this.margin + 3, this.currentY + 5);
  
  this.currentY += 12;
  this.doc.setFontSize(9);
  this.doc.setFont(undefined, 'italic');
  this.addWrappedText('NLP technique for resolving internal conflicts and finding alternative behaviors');
  
  this.currentY += 10;
  
  const steps = [
    {
      num: 1,
      name: 'Identify the Behavior/Conflict',
      desc: 'Clearly define the problematic behavior or internal conflict',
      example: 'Internal conflict: "I want to support integration (equality) but I\'m afraid (security)"'
    },
    {
      num: 2,
      name: 'Establish Communication',
      desc: 'Acknowledge the positive intention behind the behavior',
      example: 'The fear protects my family. The support reflects my belief in fairness.'
    },
    {
      num: 3,
      name: 'Separate Behavior from Intention',
      desc: 'Recognize intention is positive even if behavior isn\'t optimal',
      example: 'I can honor both intentions - security AND equality'
    },
    {
      num: 4,
      name: 'Generate Alternative Behaviors',
      desc: 'Create new ways to achieve the positive intention',
      example: 'Participate in planning, join committees, advocate for resources, build relationships'
    },
    {
      num: 5,
      name: 'Evaluate and Select',
      desc: 'Choose alternatives that honor all positive intentions',
      example: 'Active participation gives me agency (security) while advancing equity (values)'
    },
    {
      num: 6,
      name: 'Ecological Check',
      desc: 'Ensure new behavior doesn\'t create other problems',
      example: 'Does this respect all parts of myself? Will this work in daily life? Align with values?'
    }
  ];
  
  steps.forEach(step => {
    this.checkPageBreak(25);
    
    this.doc.setFillColor(255, 250, 240);
    this.doc.rect(this.margin, this.currentY, this.pageWidth - 2 * this.margin, 18, 'F');
    
    this.doc.setFont(undefined, 'bold');
    this.doc.setFontSize(9);
    this.currentY += 4;
    this.doc.text(`Step ${step.num}: ${step.name}`, this.margin + 3, this.currentY);
    
    this.currentY += 4;
    this.doc.setFont(undefined, 'italic');
    this.doc.setFontSize(8);
    this.addWrappedText(step.desc, this.margin + 3);
    
    this.currentY += 4;
    this.doc.setFont(undefined, 'normal');
    this.doc.setTextColor(0, 0, 200);
    this.addWrappedText('Example: ' + step.example, this.margin + 5);
    
    this.doc.setTextColor(0, 0, 0);
    this.currentY += 6;
  });
  
  this.currentY += 5;
  this.doc.setFont(undefined, 'bold');
  this.doc.setFontSize(9);
  this.doc.text('Application in Group Settings:', this.margin, this.currentY);
  
  this.currentY += 5;
  this.doc.setFont(undefined, 'normal');
  this.doc.setFontSize(8);
  const groupSteps = [
    'Identify the group\'s internal conflict',
    'Acknowledge positive intentions on all sides',
    'Separate positions from intentions',
    'Collaboratively generate alternatives',
    'Evaluate against all stakeholder needs',
    'Check for unintended consequences'
  ];
  
  groupSteps.forEach(s => {
    this.checkPageBreak(5);
    this.doc.text('• ' + s, this.margin + 3, this.currentY);
    this.currentY += 4;
  });
  
  this.currentY += 8;
}

export function addDiscourseAnalysisAppendix() {
  this.checkPageBreak(30);
  
  this.doc.setFillColor(240, 230, 255);
  this.doc.rect(this.margin, this.currentY, this.pageWidth - 2 * this.margin, 8, 'F');
  
  this.doc.setFontSize(11);
  this.doc.setFont(undefined, 'bold');
  this.doc.text('5. Discourse & Narrative Analysis', this.margin + 3, this.currentY + 5);
  
  this.currentY += 12;
  this.doc.setFontSize(9);
  this.doc.setFont(undefined, 'italic');
  this.addWrappedText('Analyzing underlying structures, power dynamics, and narratives that shape meaning');
  
  this.currentY += 10;
  
  // Narrative Structure
  this.doc.setFont(undefined, 'bold');
  this.doc.setFontSize(9);
  this.doc.text('A. Narrative Structure Analysis', this.margin, this.currentY);
  this.currentY += 5;
  
  const narratives = [
    {
      element: 'Hero/Villain Narrative',
      original: '"We are victims of an unjust system forcing change"',
      analysis: 'Positions speaker as victim, system as villain',
      reframe: '"We are advocates shaping a system to serve all children"',
      newNarrative: 'Positions speaker as hero, system as tool'
    },
    {
      element: 'Tragedy vs. Triumph',
      original: '"This is the end of our community"',
      analysis: 'Tragedy narrative - loss, endings, decline',
      reframe: '"This is the evolution into something more inclusive"',
      newNarrative: 'Transformation narrative - growth, progress'
    }
  ];
  
  narratives.forEach(n => {
    this.checkPageBreak(22);
    
    this.doc.setFillColor(250, 245, 255);
    this.doc.rect(this.margin, this.currentY, this.pageWidth - 2 * this.margin, 20, 'F');
    
    this.doc.setFont(undefined, 'bold');
    this.doc.setFontSize(8);
    this.currentY += 4;
    this.doc.text(n.element, this.margin + 3, this.currentY);
    
    this.currentY += 4;
    this.doc.setFont(undefined, 'normal');
    this.doc.setTextColor(200, 0, 0);
    this.addWrappedText('Original: ' + n.original, this.margin + 3);
    this.currentY += 4;
    this.doc.setTextColor(100, 0, 0);
    this.doc.text('Analysis: ' + n.analysis, this.margin + 3, this.currentY);
    this.currentY += 4;
    this.doc.setTextColor(0, 150, 0);
    this.addWrappedText('Reframed: ' + n.reframe, this.margin + 3);
    this.currentY += 4;
    this.doc.setTextColor(0, 100, 0);
    this.doc.text('New Narrative: ' + n.newNarrative, this.margin + 3, this.currentY);
    
    this.doc.setTextColor(0, 0, 0);
    this.currentY += 6;
  });
  
  this.currentY += 5;
  
  // Metaphor Analysis
  this.doc.setFont(undefined, 'bold');
  this.doc.setFontSize(9);
  this.doc.text('B. Metaphor & Frame Analysis', this.margin, this.currentY);
  this.currentY += 5;
  
  const metaphors = [
    {
      old: 'CHANGE IS A THREAT',
      oldLang: '"invasion," "attack," "defend"',
      oldImpl: 'Activates fear, resistance',
      new: 'CHANGE IS GROWTH',
      newLang: '"evolve," "develop," "flourish"',
      newImpl: 'Activates curiosity, openness'
    },
    {
      old: 'COMMUNITY IS A CONTAINER',
      oldLang: '"boundaries," "outsiders," "letting them in"',
      oldImpl: 'Creates in-group/out-group divisions',
      new: 'COMMUNITY IS A NETWORK',
      newLang: '"connections," "relationships," "expanding circle"',
      newImpl: 'Emphasizes relationships over boundaries'
    },
    {
      old: 'EDUCATION IS A COMMODITY',
      oldLang: '"getting my share," "taking from us"',
      oldImpl: 'Zero-sum thinking, competition',
      new: 'EDUCATION IS A GARDEN',
      newLang: '"cultivating potential," "nurturing growth"',
      newImpl: 'Abundance thinking, collaboration'
    }
  ];
  
  metaphors.forEach(m => {
    this.checkPageBreak(20);
    
    this.doc.setFillColor(250, 245, 255);
    this.doc.rect(this.margin, this.currentY, this.pageWidth - 2 * this.margin, 18, 'F');
    
    this.doc.setFont(undefined, 'normal');
    this.doc.setFontSize(8);
    this.currentY += 4;
    this.doc.setTextColor(200, 0, 0);
    this.doc.text(m.old + ': ' + m.oldLang, this.margin + 3, this.currentY);
    this.currentY += 4;
    this.doc.text('→ ' + m.oldImpl, this.margin + 5, this.currentY);
    this.currentY += 4;
    this.doc.setTextColor(0, 150, 0);
    this.doc.text(m.new + ': ' + m.newLang, this.margin + 3, this.currentY);
    this.currentY += 4;
    this.doc.text('→ ' + m.newImpl, this.margin + 5, this.currentY);
    
    this.doc.setTextColor(0, 0, 0);
    this.currentY += 6;
  });
  
  this.currentY += 5;
  
  // Power & Identity
  this.doc.setFont(undefined, 'bold');
  this.doc.setFontSize(9);
  this.doc.text('C. Power & Identity Analysis', this.margin, this.currentY);
  this.currentY += 5;
  
  this.doc.setFillColor(250, 245, 255);
  this.doc.rect(this.margin, this.currentY, this.pageWidth - 2 * this.margin, 22, 'F');
  
  this.doc.setFont(undefined, 'normal');
  this.doc.setFontSize(8);
  this.currentY += 4;
  this.doc.setTextColor(200, 0, 0);
  this.addWrappedText('Original: "We are the taxpayers who built these schools"', this.margin + 3);
  this.currentY += 4;
  this.doc.text('Identity: Based on ownership and historical contribution', this.margin + 3, this.currentY);
  this.currentY += 4;
  this.doc.text('Power Dynamic: Establishes hierarchy - "we" have more right', this.margin + 3, this.currentY);
  this.currentY += 4;
  this.doc.setTextColor(0, 150, 0);
  this.addWrappedText('Reframed: "We are all stakeholders invested in our children\'s future"', this.margin + 3);
  this.currentY += 4;
  this.doc.text('New Identity: Shared identity based on common interest', this.margin + 3, this.currentY);
  this.currentY += 4;
  this.doc.text('New Power: Equalizes stakeholders, shifts from past to future', this.margin + 3, this.currentY);
  
  this.doc.setTextColor(0, 0, 0);
  this.currentY += 10;
}

export default {
  addCognitiveRestructuringAppendix,
  addSocraticQuestioningAppendix,
  addNLPReframingAppendix,
  addSixStepReframingAppendix,
  addDiscourseAnalysisAppendix
};
