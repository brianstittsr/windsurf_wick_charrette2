// BMad Analyst utilities for Charette facilitation
export const analyzeMessagesForConsensus = (messages) => {
  if (!messages || messages.length < 3) {
    return ['Not enough messages to analyze consensus yet.'];
  }

  const insights = [];

  // Analyze message content for patterns
  const messageTexts = messages.map(m => m.text.toLowerCase());

  // Look for agreement indicators
  const agreementWords = ['agree', 'yes', 'good point', 'I support', 'I think so too', 'same here', 'concurs', 'aligned'];
  const disagreementWords = ['disagree', 'no', 'however', 'but', 'concern', 'issue', 'problem', 'challenge'];

  const agreements = messageTexts.filter(text =>
    agreementWords.some(word => text.includes(word))
  ).length;

  const disagreements = messageTexts.filter(text =>
    disagreementWords.some(word => text.includes(word))
  ).length;

  if (agreements > disagreements) {
    insights.push(`📈 Consensus building: ${agreements} expressions of agreement vs ${disagreements} disagreements`);
  } else if (disagreements > agreements) {
    insights.push(`⚠️ Areas of disagreement: ${disagreements} concerns raised, ${agreements} agreements found`);
  }

  // Identify key topics
  const topics = extractTopicsFromMessages(messages);
  if (topics.length > 0) {
    insights.push(`🎯 Key discussion topics: ${topics.join(', ')}`);
  }

  return insights;
};

export const extractTopicsFromMessages = (messages) => {
  const topics = [];
  const commonTopics = ['budget', 'timeline', 'quality', 'design', 'implementation', 'resources', 'risk', 'priority'];

  messages.forEach(message => {
    const text = message.text.toLowerCase();
    commonTopics.forEach(topic => {
      if (text.includes(topic) && !topics.includes(topic)) {
        topics.push(topic);
      }
    });
  });

  return topics;
};

export const generateFacilitationSuggestions = (messages, agreements, disagreements, currentPhase, analysisResults) => {
  const suggestions = [];

  if (agreements > disagreements * 2) {
    suggestions.push('💡 Consider documenting areas of agreement to build momentum');
  }

  if (disagreements > agreements) {
    suggestions.push('🤝 Suggest breakout discussions for conflicting viewpoints');
    suggestions.push('❓ Ask clarifying questions about underlying concerns');
  }

  if (messages && messages.length > 10) {
    suggestions.push('📝 Propose summarizing key points discussed so far');
  }

  if (currentPhase === 2 && analysisResults && analysisResults.length > 0) {
    suggestions.push('🔍 Review live analysis results to identify patterns');
  }

  return suggestions;
};

export const identifyConsensusAreas = (messages) => {
  if (!messages) return [];

  const consensus = [];
  const messageTexts = messages.map(m => m.text.toLowerCase());

  // Look for repeated positive sentiments
  const positiveIndicators = ['good', 'great', 'excellent', 'agree', 'support', 'yes'];

  positiveIndicators.forEach(indicator => {
    const count = messageTexts.filter(text => text.includes(indicator)).length;
    if (count >= 2) {
      consensus.push(`${count} participants expressed positive sentiment about ${indicator}`);
    }
  });

  return consensus;
};

export const generateClarifyingQuestion = (userName, topic) => {
  const questions = {
    'budget': `Could you elaborate on your budget concerns, ${userName}? What specific aspects are most important?`,
    'timeline': `What timeline considerations are you thinking about, ${userName}? Are there any critical deadlines?`,
    'quality': `When you mention quality, ${userName}, what standards or expectations do you have in mind?`,
    'resources': `What resources do you think we'll need, ${userName}? Are there any constraints we should consider?`,
    'default': `Thanks for sharing that perspective, ${userName}. Could you tell us more about why this is important to you?`
  };

  return questions[topic] || questions['default'];
};

export const analyzeParticipantBeliefs = (messages, userName) => {
  if (!messages || !userName) return null;

  const userMessages = messages.filter(m => m.userName === userName);
  if (userMessages.length === 0) return null;

  const analysis = {
    userName,
    messageCount: userMessages.length,
    concerns: [],
    supports: [],
    questions: []
  };

  userMessages.forEach(message => {
    const text = message.text.toLowerCase();

    // Identify concerns
    if (text.includes('concern') || text.includes('issue') || text.includes('problem') || text.includes('worry')) {
      analysis.concerns.push(message.text);
    }

    // Identify supports
    if (text.includes('support') || text.includes('agree') || text.includes('good') || text.includes('yes')) {
      analysis.supports.push(message.text);
    }

    // Identify questions
    if (text.includes('?') || text.includes('what') || text.includes('how') || text.includes('why')) {
      analysis.questions.push(message.text);
    }
  });

  return analysis;
};
