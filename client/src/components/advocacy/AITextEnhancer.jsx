import React, { useState } from 'react';
import { Sparkles, Loader2 } from 'lucide-react';
import { Button } from '../ui/button';

const AITextEnhancer = ({ text, onEnhanced, placeholder = "Enter text to enhance...", context = "" }) => {
  const [isEnhancing, setIsEnhancing] = useState(false);

  const enhanceText = async () => {
    if (!text || !text.trim()) {
      return;
    }

    setIsEnhancing(true);

    try {
      // Simulate AI enhancement with improved clarity and structure
      // In production, this would call an actual AI API
      await new Promise(resolve => setTimeout(resolve, 1500));

      const enhanced = generateEnhancedText(text, context);
      onEnhanced(enhanced);
    } catch (error) {
      console.error('Error enhancing text:', error);
    } finally {
      setIsEnhancing(false);
    }
  };

  const generateEnhancedText = (originalText, context) => {
    // Demo enhancement logic - makes text more clear and structured
    const trimmed = originalText.trim();
    
    // Add context-specific improvements
    if (context === 'need-description') {
      return enhanceNeedDescription(trimmed);
    } else if (context === 'impact') {
      return enhanceImpact(trimmed);
    } else if (context === 'issue-statement') {
      return enhanceIssueStatement(trimmed);
    } else if (context === 'requested-change') {
      return enhanceRequestedChange(trimmed);
    } else if (context === 'affirmation') {
      return enhanceAffirmation(trimmed);
    }
    
    return enhanceGeneral(trimmed);
  };

  const enhanceNeedDescription = (text) => {
    // Structure: What's happening + Who's affected + Why it's a problem
    if (text.length < 50) {
      return `${text}\n\nThis situation affects community members who need access to essential services. The current constraint creates barriers that prevent people from getting the support they deserve.`;
    }
    
    // Add clarity and structure if text is already substantial
    const sentences = text.split(/[.!?]+/).filter(s => s.trim());
    if (sentences.length === 1) {
      return `${text.trim()}. This creates significant challenges for those who are already facing difficult circumstances. The policy or practice needs to be reconsidered to ensure fair access for everyone.`;
    }
    
    return text;
  };

  const enhanceImpact = (text) => {
    // Focus on human impact and consequences
    if (text.length < 40) {
      return `${text}\n\nThis impacts people's ability to access critical resources and services. Families and individuals are left without the support they need, creating additional stress and hardship in their daily lives.`;
    }
    
    const hasNumbers = /\d+/.test(text);
    if (!hasNumbers && text.length < 100) {
      return `${text.trim()}. This affects multiple community members on a daily basis, creating barriers to essential services and opportunities. The ripple effects extend to families, schools, and the broader community.`;
    }
    
    return text;
  };

  const enhanceIssueStatement = (text) => {
    // Make it clear, specific, and actionable
    if (text.length < 50) {
      return `The core issue is: ${text.trim()}. This problem stems from current policies or practices that create unnecessary barriers. A clear solution is needed to address this systemic constraint.`;
    }
    
    // Ensure it starts with a clear statement
    if (!text.toLowerCase().startsWith('the issue') && !text.toLowerCase().startsWith('the problem')) {
      return `The issue is: ${text}`;
    }
    
    return text;
  };

  const enhanceRequestedChange = (text) => {
    // Make it specific and actionable
    if (text.length < 40) {
      return `We request that decision-makers: ${text.trim()}. This change would directly address the identified barrier and create more equitable access to services. Implementation should prioritize those most affected by the current policy.`;
    }
    
    // Add specificity if missing
    if (!text.toLowerCase().includes('we request') && !text.toLowerCase().includes('we ask')) {
      return `We respectfully request: ${text}`;
    }
    
    return text;
  };

  const enhanceAffirmation = (text) => {
    // Make it warm, supportive, and specific
    if (text.length < 30) {
      return `${text.trim()}. I see your strength and your courage. You're not alone in this journey, and your efforts matter. Keep going - you're making a difference.`;
    }
    
    // Add warmth if it seems clinical
    const hasEmotionalWords = /(see|hear|witness|believe|support|care|matter|value|appreciate)/i.test(text);
    if (!hasEmotionalWords) {
      return `I want you to know: ${text.trim()}. Your presence and your voice matter to this community. We're here to support you every step of the way.`;
    }
    
    return text;
  };

  const enhanceGeneral = (text) => {
    // General improvements for clarity and completeness
    if (text.length < 50) {
      return `${text.trim()}. This is an important consideration that deserves careful attention and thoughtful action.`;
    }
    return text;
  };

  const canEnhance = text && text.trim().length > 0;

  return (
    <Button
      type="button"
      variant="outline"
      size="sm"
      onClick={enhanceText}
      disabled={!canEnhance || isEnhancing}
      className="gap-2"
    >
      {isEnhancing ? (
        <>
          <Loader2 className="h-4 w-4 animate-spin" />
          Enhancing...
        </>
      ) : (
        <>
          <Sparkles className="h-4 w-4" />
          Enhance with AI
        </>
      )}
    </Button>
  );
};

export default AITextEnhancer;
