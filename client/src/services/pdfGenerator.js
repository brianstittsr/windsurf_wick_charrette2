// Professional PDF Report Generator for Charette System
// Includes CBT analysis, language reframing, and comprehensive appendix

import jsPDF from 'jspdf';
import 'jspdf-autotable';
import {
  addCognitiveRestructuringAppendix,
  addSocraticQuestioningAppendix,
  addNLPReframingAppendix,
  addSixStepReframingAppendix,
  addDiscourseAnalysisAppendix
} from './pdfGeneratorAppendix';

export class CharettePDFGenerator {
  constructor(charette, messages, analysis, solutions) {
    this.charette = charette;
    this.messages = messages;
    this.analysis = analysis;
    this.solutions = solutions;
    this.doc = new jsPDF();
    this.pageWidth = this.doc.internal.pageSize.getWidth();
    this.pageHeight = this.doc.internal.pageSize.getHeight();
    this.margin = 20;
    this.currentY = this.margin;
    
    // Bind appendix methods to this instance
    this.addCognitiveRestructuringAppendix = addCognitiveRestructuringAppendix.bind(this);
    this.addSocraticQuestioningAppendix = addSocraticQuestioningAppendix.bind(this);
    this.addNLPReframingAppendix = addNLPReframingAppendix.bind(this);
    this.addSixStepReframingAppendix = addSixStepReframingAppendix.bind(this);
    this.addDiscourseAnalysisAppendix = addDiscourseAnalysisAppendix.bind(this);
  }

  generate() {
    this.addCoverPage();
    this.addExecutiveSummary();
    this.addAIKeyFindings();
    this.addAIRecommendations();
    this.addAINextSteps();
    this.addCognitiveAnalysis();
    this.addLanguageReframing();
    this.addBreakthroughStrategies();
    this.addSolutions();
    this.addAppendix();
    
    return this.doc;
  }

  addCoverPage() {
    this.currentY = 80;
    
    // Title
    this.doc.setFontSize(28);
    this.doc.setFont(undefined, 'bold');
    this.doc.text('CHARETTE REPORT', this.pageWidth / 2, this.currentY, { align: 'center' });
    
    this.currentY += 20;
    this.doc.setFontSize(20);
    this.doc.text(this.charette.title, this.pageWidth / 2, this.currentY, { align: 'center' });
    
    this.currentY += 30;
    this.doc.setFontSize(12);
    this.doc.setFont(undefined, 'normal');
    this.doc.text(this.charette.description, this.pageWidth / 2, this.currentY, { 
      align: 'center',
      maxWidth: this.pageWidth - 2 * this.margin 
    });
    
    // Date
    this.currentY = this.pageHeight - 40;
    this.doc.setFontSize(10);
    this.doc.text(`Generated: ${new Date().toLocaleDateString()}`, this.pageWidth / 2, this.currentY, { align: 'center' });
    
    // Subtitle
    this.currentY += 10;
    this.doc.setFont(undefined, 'italic');
    this.doc.text('AI-Enhanced Analysis with Cognitive Behavioral Techniques', this.pageWidth / 2, this.currentY, { align: 'center' });
    
    this.addNewPage();
  }

  addExecutiveSummary() {
    this.addSectionHeader('Executive Summary');
    
    const participants = this.charette.participants?.length || 0;
    const messageCount = this.messages?.length || 0;
    const solutionCount = this.solutions?.filter(s => s.selected)?.length || 0;
    
    this.doc.setFontSize(10);
    this.doc.text(`Participants: ${participants}`, this.margin, this.currentY);
    this.currentY += 6;
    this.doc.text(`Messages Exchanged: ${messageCount}`, this.margin, this.currentY);
    this.currentY += 6;
    this.doc.text(`Solutions Proposed: ${solutionCount}`, this.margin, this.currentY);
    this.currentY += 6;
    this.doc.text(`Phases Completed: 6`, this.margin, this.currentY);
    
    this.currentY += 15;
    this.doc.setFont(undefined, 'normal');
    const summaryText = `This charette brought together diverse stakeholders to collaboratively address complex challenges. Through structured phases of data collection, analysis, ideation, and synthesis, participants engaged in meaningful dialogue that identified key constraints, challenged assumptions, and discovered opportunities for breakthrough solutions. AI-enhanced analysis using cognitive behavioral therapy (CBT) techniques revealed underlying patterns and language reframing opportunities that can transform stalemate discussions into win-win outcomes.`;
    
    this.addWrappedText(summaryText);
    this.currentY += 10;
  }

  addAIKeyFindings() {
    this.addSectionHeader('AI-Generated Key Findings');
    
    const findings = this.analysis?.keyFindings || [
      {
        category: 'Constraints Identified',
        finding: 'Time, budget, and regulatory limitations were clearly defined and acknowledged by all stakeholders.',
        color: [255, 200, 150]
      },
      {
        category: 'Assumptions Challenged',
        finding: 'Several key assumptions were identified and tested through Socratic questioning, leading to breakthrough insights.',
        color: [200, 180, 255]
      },
      {
        category: 'Opportunities Discovered',
        finding: 'Multiple areas of alignment and potential for innovative solutions were identified through values clarification.',
        color: [180, 255, 200]
      }
    ];
    
    findings.forEach(item => {
      this.checkPageBreak(30);
      
      // Category box
      this.doc.setFillColor(...item.color);
      this.doc.rect(this.margin, this.currentY, this.pageWidth - 2 * this.margin, 8, 'F');
      
      this.doc.setFontSize(10);
      this.doc.setFont(undefined, 'bold');
      this.doc.text(item.category, this.margin + 3, this.currentY + 5);
      
      this.currentY += 10;
      this.doc.setFont(undefined, 'normal');
      this.doc.setFontSize(9);
      this.addWrappedText(item.finding);
      this.currentY += 8;
    });
  }

  addAIRecommendations() {
    this.addSectionHeader('AI-Generated Recommendations');
    
    const recommendations = this.analysis?.recommendations || [
      'Prioritize "Quick Wins" - high impact, high feasibility solutions for immediate implementation',
      'Establish joint oversight committee to address control and autonomy needs of all stakeholders',
      'Implement pilot program to test assumptions with real-world evidence before full rollout',
      'Use language reframing techniques in all stakeholder communications to maintain collaborative tone',
      'Schedule regular check-ins using CBT-based reflection to monitor progress and adjust approach'
    ];
    
    recommendations.forEach((rec, idx) => {
      this.checkPageBreak(15);
      this.doc.setFontSize(9);
      this.doc.setFont(undefined, 'bold');
      this.doc.text(`${idx + 1}.`, this.margin, this.currentY);
      this.doc.setFont(undefined, 'normal');
      this.addWrappedText(rec, this.margin + 8);
      this.currentY += 5;
    });
  }

  addAINextSteps() {
    this.addSectionHeader('AI-Generated Next Steps');
    
    const nextSteps = this.analysis?.nextSteps || [
      {
        step: 'Review and approve recommended solutions with all stakeholders',
        timeline: 'Week 1',
        owner: 'Steering Committee'
      },
      {
        step: 'Develop detailed implementation plans with timelines and resources',
        timeline: 'Weeks 2-3',
        owner: 'Project Manager'
      },
      {
        step: 'Assign responsibilities and establish accountability measures',
        timeline: 'Week 4',
        owner: 'Leadership Team'
      },
      {
        step: 'Launch pilot program with selected solutions',
        timeline: 'Month 2',
        owner: 'Implementation Team'
      },
      {
        step: 'Schedule follow-up sessions to track progress and adjust',
        timeline: 'Monthly',
        owner: 'Facilitator'
      }
    ];
    
    // Create table
    const tableData = nextSteps.map(item => [item.step, item.timeline, item.owner]);
    
    this.doc.autoTable({
      startY: this.currentY,
      head: [['Action', 'Timeline', 'Owner']],
      body: tableData,
      theme: 'grid',
      headStyles: { fillColor: [66, 139, 202] },
      margin: { left: this.margin, right: this.margin },
      styles: { fontSize: 9 }
    });
    
    this.currentY = this.doc.lastAutoTable.finalY + 10;
  }

  addCognitiveAnalysis() {
    this.addSectionHeader('Cognitive Behavioral Analysis');
    
    this.doc.setFontSize(9);
    this.doc.setFont(undefined, 'italic');
    this.addWrappedText('Using CBT techniques to identify thinking patterns and emotional drivers');
    this.currentY += 8;
    
    const cognitivePatterns = [
      {
        title: 'Cognitive Distortions Identified',
        patterns: [
          'All-or-nothing thinking: "Either we do it my way or it won\'t work"',
          'Overgeneralization: "They never listen to our concerns"',
          'Emotional reasoning: "I feel unsafe, therefore it must be unsafe"',
          'Catastrophizing: "This will destroy our community"'
        ]
      },
      {
        title: 'Underlying Core Beliefs',
        patterns: [
          'Belief about control: "I need to maintain control to feel safe"',
          'Belief about fairness: "Change is only fair if everyone agrees"',
          'Belief about community: "Our way of life is under threat"',
          'Belief about children: "I must protect my children at all costs"'
        ]
      },
      {
        title: 'Emotional Triggers',
        patterns: [
          'Fear of the unknown and rapid change',
          'Loss of community identity and traditions',
          'Concerns about children\'s safety and wellbeing',
          'Feeling unheard or dismissed by authorities'
        ]
      }
    ];
    
    cognitivePatterns.forEach(section => {
      this.checkPageBreak(40);
      
      this.doc.setFont(undefined, 'bold');
      this.doc.setFontSize(10);
      this.doc.text(section.title, this.margin, this.currentY);
      this.currentY += 7;
      
      this.doc.setFont(undefined, 'normal');
      this.doc.setFontSize(9);
      section.patterns.forEach(pattern => {
        this.checkPageBreak(10);
        this.doc.text('•', this.margin + 3, this.currentY);
        this.addWrappedText(pattern, this.margin + 8);
        this.currentY += 5;
      });
      this.currentY += 5;
    });
  }

  addLanguageReframing() {
    this.addSectionHeader('Language Reframing for Breakthroughs');
    
    this.doc.setFontSize(9);
    this.doc.setFont(undefined, 'italic');
    this.addWrappedText('How changing language can transform stalemate discussions into collaborative problem-solving');
    this.currentY += 10;
    
    const reframingExamples = [
      {
        original: '"They don\'t understand our concerns"',
        reframed: '"We haven\'t yet found the right way to communicate our concerns"',
        technique: 'Ownership & Possibility',
        impact: 'Shifts from blame to collaborative problem-solving, opens door for new approaches'
      },
      {
        original: '"This will never work"',
        reframed: '"What would need to be true for this to work?"',
        technique: 'Possibility Thinking',
        impact: 'Transforms closed thinking into creative exploration of conditions for success'
      },
      {
        original: '"It\'s us versus them"',
        reframed: '"We all want what\'s best for our children"',
        technique: 'Common Ground',
        impact: 'Identifies shared values and unites parties around mutual goals'
      },
      {
        original: '"I have to protect my way of life"',
        reframed: '"How can we preserve what\'s valuable while adapting to change?"',
        technique: 'Both/And Thinking',
        impact: 'Breaks down false dichotomies and allows for nuanced solutions'
      }
    ];
    
    reframingExamples.forEach((example, idx) => {
      this.checkPageBreak(45);
      
      // Example number
      this.doc.setFillColor(255, 240, 200);
      this.doc.rect(this.margin, this.currentY, this.pageWidth - 2 * this.margin, 35, 'F');
      
      this.doc.setFontSize(9);
      this.doc.setFont(undefined, 'bold');
      this.doc.text(`Example ${idx + 1}:`, this.margin + 3, this.currentY + 5);
      
      this.currentY += 8;
      this.doc.setTextColor(200, 0, 0);
      this.doc.setFont(undefined, 'italic');
      this.doc.text('Original:', this.margin + 3, this.currentY);
      this.doc.setFont(undefined, 'normal');
      this.addWrappedText(example.original, this.margin + 20);
      
      this.currentY += 5;
      this.doc.setTextColor(0, 150, 0);
      this.doc.setFont(undefined, 'italic');
      this.doc.text('Reframed:', this.margin + 3, this.currentY);
      this.doc.setFont(undefined, 'normal');
      this.addWrappedText(example.reframed, this.margin + 20);
      
      this.currentY += 5;
      this.doc.setTextColor(0, 0, 0);
      this.doc.setFont(undefined, 'bold');
      this.doc.text(`Technique: ${example.technique}`, this.margin + 3, this.currentY);
      
      this.currentY += 5;
      this.doc.setFont(undefined, 'normal');
      this.doc.text('Impact:', this.margin + 3, this.currentY);
      this.addWrappedText(example.impact, this.margin + 15);
      
      this.currentY += 8;
    });
  }

  addBreakthroughStrategies() {
    this.addSectionHeader('CBT + AI Breakthrough Strategies');
    
    this.doc.setFontSize(9);
    this.addWrappedText('Proven techniques for breaking through stalemates and creating win-win solutions');
    this.currentY += 10;
    
    const strategies = [
      {
        name: 'Socratic Questioning',
        description: 'Use guided questions to help participants examine their assumptions',
        questions: [
          'What evidence supports this belief?',
          'What are alternative explanations?',
          'What would someone with a different view say?',
          'What\'s the worst that could happen? Best case? Most likely?'
        ]
      },
      {
        name: 'Cognitive Restructuring',
        description: 'Help participants identify and challenge unhelpful thought patterns',
        questions: [
          'Is this thought based on facts or feelings?',
          'Am I looking at the whole picture?',
          'What would I tell a friend in this situation?',
          'What\'s a more balanced way to think about this?'
        ]
      },
      {
        name: 'Values Clarification',
        description: 'Focus on shared values rather than positions',
        questions: [
          'What do you value most in this situation?',
          'What are we all trying to protect or achieve?',
          'How can we honor everyone\'s core values?',
          'What principles can we all agree on?'
        ]
      },
      {
        name: 'Behavioral Experiments',
        description: 'Test assumptions with small-scale pilots',
        questions: [
          'What would it take to test this on a small scale?',
          'What evidence would change your mind?',
          'How can we gather real-world data?',
          'What would success look like in a pilot?'
        ]
      }
    ];
    
    strategies.forEach(strategy => {
      this.checkPageBreak(40);
      
      this.doc.setFillColor(230, 240, 255);
      this.doc.rect(this.margin, this.currentY, this.pageWidth - 2 * this.margin, 6, 'F');
      
      this.doc.setFont(undefined, 'bold');
      this.doc.setFontSize(10);
      this.doc.text(strategy.name, this.margin + 3, this.currentY + 4);
      
      this.currentY += 8;
      this.doc.setFont(undefined, 'italic');
      this.doc.setFontSize(9);
      this.addWrappedText(strategy.description);
      
      this.currentY += 5;
      this.doc.setFont(undefined, 'normal');
      strategy.questions.forEach(q => {
        this.checkPageBreak(8);
        this.doc.text('•', this.margin + 5, this.currentY);
        this.addWrappedText(q, this.margin + 10);
        this.currentY += 5;
      });
      this.currentY += 5;
    });
  }

  addSolutions() {
    this.addSectionHeader('Recommended Solutions');
    
    const selectedSolutions = this.solutions?.filter(s => s.selected) || [];
    
    if (selectedSolutions.length === 0) {
      this.doc.setFontSize(9);
      this.doc.setFont(undefined, 'italic');
      this.doc.text('No solutions were selected in the synthesis phase', this.margin, this.currentY);
      return;
    }
    
    selectedSolutions.forEach((solution, idx) => {
      this.checkPageBreak(30);
      
      this.doc.setFontSize(10);
      this.doc.setFont(undefined, 'bold');
      this.doc.text(`Solution ${idx + 1}: ${solution.title}`, this.margin, this.currentY);
      
      this.currentY += 7;
      this.doc.setFontSize(9);
      this.doc.setFont(undefined, 'normal');
      this.addWrappedText(solution.description);
      
      this.currentY += 5;
      this.doc.text(`Feasibility: ${solution.feasibility.toUpperCase()}  |  Impact: ${solution.impact.toUpperCase()}`, this.margin, this.currentY);
      
      this.currentY += 10;
    });
  }

  addAppendix() {
    this.addNewPage();
    this.addSectionHeader('APPENDIX A: Advanced Reframing Methods');
    
    this.doc.setFontSize(9);
    this.doc.setFont(undefined, 'italic');
    this.addWrappedText('Comprehensive guide to language analysis and manipulation techniques for breakthrough thinking');
    this.currentY += 10;
    
    // Add all advanced reframing methods
    this.addCognitiveRestructuringAppendix();
    this.addSocraticQuestioningAppendix();
    this.addNLPReframingAppendix();
    this.addSixStepReframingAppendix();
    this.addDiscourseAnalysisAppendix();
    
    // Then add raw discussion content
    this.addNewPage();
    this.addSectionHeader('APPENDIX B: Raw Discussion Content');
    
    this.doc.setFontSize(9);
    this.doc.setFont(undefined, 'italic');
    this.addWrappedText('Complete transcript of all breakout room discussions for reference and further analysis');
    this.currentY += 10;
    
    // Group messages by room
    const messagesByRoom = {};
    this.messages?.forEach(msg => {
      const roomId = msg.roomId || 'main';
      if (!messagesByRoom[roomId]) {
        messagesByRoom[roomId] = [];
      }
      messagesByRoom[roomId].push(msg);
    });
    
    // Add each room's messages
    Object.entries(messagesByRoom).forEach(([roomId, msgs]) => {
      this.checkPageBreak(20);
      
      const roomName = roomId === 'main' ? 'Main Room' : 
        this.charette.breakoutRooms?.find(r => r.id === roomId)?.name || roomId;
      
      this.doc.setFillColor(240, 240, 240);
      this.doc.rect(this.margin, this.currentY, this.pageWidth - 2 * this.margin, 7, 'F');
      
      this.doc.setFont(undefined, 'bold');
      this.doc.setFontSize(10);
      this.doc.text(`${roomName} (${msgs.length} messages)`, this.margin + 3, this.currentY + 5);
      
      this.currentY += 10;
      
      msgs.forEach(msg => {
        this.checkPageBreak(15);
        
        this.doc.setFontSize(8);
        this.doc.setFont(undefined, 'bold');
        this.doc.text(`${msg.userName}:`, this.margin + 3, this.currentY);
        
        this.doc.setFont(undefined, 'normal');
        this.addWrappedText(msg.text, this.margin + 3);
        this.currentY += 4;
      });
      
      this.currentY += 5;
    });
  }

  addSectionHeader(title) {
    this.checkPageBreak(20);
    
    this.doc.setFillColor(66, 139, 202);
    this.doc.rect(this.margin, this.currentY, this.pageWidth - 2 * this.margin, 10, 'F');
    
    this.doc.setTextColor(255, 255, 255);
    this.doc.setFontSize(14);
    this.doc.setFont(undefined, 'bold');
    this.doc.text(title, this.margin + 3, this.currentY + 7);
    
    this.doc.setTextColor(0, 0, 0);
    this.currentY += 15;
  }

  addWrappedText(text, x = this.margin) {
    const maxWidth = this.pageWidth - 2 * this.margin - (x - this.margin);
    const lines = this.doc.splitTextToSize(text, maxWidth);
    
    lines.forEach(line => {
      this.checkPageBreak(6);
      this.doc.text(line, x, this.currentY);
      this.currentY += 5;
    });
  }

  checkPageBreak(requiredSpace) {
    if (this.currentY + requiredSpace > this.pageHeight - this.margin) {
      this.addNewPage();
    }
  }

  addNewPage() {
    this.doc.addPage();
    this.currentY = this.margin;
    
    // Add page number
    const pageNum = this.doc.internal.getNumberOfPages();
    this.doc.setFontSize(8);
    this.doc.setFont(undefined, 'normal');
    this.doc.text(`Page ${pageNum}`, this.pageWidth - this.margin, this.pageHeight - 10, { align: 'right' });
  }

  save(filename) {
    this.doc.save(filename || `charette-report-${Date.now()}.pdf`);
  }
}

export default CharettePDFGenerator;
