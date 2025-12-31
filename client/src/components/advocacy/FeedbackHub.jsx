import React, { useState } from 'react';
import { Heart, MessageCircle, Star, Send } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import advocacyService from '../../services/advocacyService';

const FeedbackHub = ({ advocacyUser }) => {
  const [feedbackType] = useState('suggestion');
  const [wasHelpful, setWasHelpful] = useState(null);
  const [stillStuck, setStillStuck] = useState('');
  const [suggestions, setSuggestions] = useState('');
  const [rating, setRating] = useState(0);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async () => {
    try {
      await advocacyService.submitFeedback({
        userId: advocacyUser.userId,
        moduleType: feedbackType,
        wasHelpful,
        stillStuck,
        suggestions,
        rating,
        submittedAt: new Date().toISOString()
      });
      setSubmitted(true);
      setTimeout(() => {
        setSubmitted(false);
        setWasHelpful(null);
        setStillStuck('');
        setSuggestions('');
        setRating(0);
      }, 3000);
    } catch (error) {
      console.error('Error submitting feedback:', error);
    }
  };

  if (submitted) {
    return (
      <Card>
        <CardContent className="py-12 text-center">
          <Heart className="h-16 w-16 text-primary mx-auto mb-4" />
          <h3 className="text-2xl font-bold mb-2">Thank You!</h3>
          <p className="text-muted-foreground">
            Your feedback helps us improve the Servant Advocacy module for everyone
          </p>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Heart className="h-6 w-6 text-primary" />
            <span>Feedback & Co-Creation</span>
          </CardTitle>
          <CardDescription>
            Help us improve by sharing your experience and ideas
          </CardDescription>
        </CardHeader>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Quick Check-In</CardTitle>
          <CardDescription>Tell us about your experience</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div>
            <label className="block font-semibold mb-3">
              Did this module help you deal with rules or limits you're facing?
            </label>
            <div className="flex space-x-3">
              <Button
                variant={wasHelpful === true ? 'default' : 'outline'}
                onClick={() => setWasHelpful(true)}
                className="flex-1"
              >
                Yes, it helped
              </Button>
              <Button
                variant={wasHelpful === false ? 'default' : 'outline'}
                onClick={() => setWasHelpful(false)}
                className="flex-1"
              >
                Not really
              </Button>
            </div>
          </div>

          <div>
            <label className="block font-semibold mb-3">
              Where do you still feel stuck?
            </label>
            <textarea
              value={stillStuck}
              onChange={(e) => setStillStuck(e.target.value)}
              placeholder="Share what's still challenging..."
              className="w-full min-h-[100px] p-3 border rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </div>

          <div>
            <label className="block font-semibold mb-3">
              Rate your overall experience
            </label>
            <div className="flex space-x-2">
              {[1, 2, 3, 4, 5].map(value => (
                <button
                  key={value}
                  onClick={() => setRating(value)}
                  className="transition-transform hover:scale-110"
                >
                  <Star
                    className={`h-8 w-8 ${
                      value <= rating
                        ? 'fill-yellow-400 text-yellow-400'
                        : 'text-muted-foreground'
                    }`}
                  />
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="block font-semibold mb-3">
              Suggestions for improvement
            </label>
            <textarea
              value={suggestions}
              onChange={(e) => setSuggestions(e.target.value)}
              placeholder="What would make this better?"
              className="w-full min-h-[100px] p-3 border rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </div>

          <Button
            onClick={handleSubmit}
            disabled={wasHelpful === null}
            className="w-full"
            size="lg"
          >
            <Send className="h-5 w-5 mr-2" />
            Submit Feedback
          </Button>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <MessageCircle className="h-6 w-6 text-primary" />
            <span>Co-Creation Space</span>
          </CardTitle>
          <CardDescription>
            Submit your own scenarios, affirmations, or leadership dilemmas
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-3 gap-4">
            <Card className="cursor-pointer hover:shadow-lg transition-shadow">
              <CardContent className="pt-6 text-center">
                <div className="text-4xl mb-3">📝</div>
                <h4 className="font-semibold mb-2">Submit a Scenario</h4>
                <p className="text-sm text-muted-foreground mb-4">
                  Share a real situation others can learn from
                </p>
                <Button size="sm" className="w-full">Submit</Button>
              </CardContent>
            </Card>

            <Card className="cursor-pointer hover:shadow-lg transition-shadow">
              <CardContent className="pt-6 text-center">
                <div className="text-4xl mb-3">💬</div>
                <h4 className="font-semibold mb-2">Share an Affirmation</h4>
                <p className="text-sm text-muted-foreground mb-4">
                  Contribute a powerful peer support message
                </p>
                <Button size="sm" className="w-full">Submit</Button>
              </CardContent>
            </Card>

            <Card className="cursor-pointer hover:shadow-lg transition-shadow">
              <CardContent className="pt-6 text-center">
                <div className="text-4xl mb-3">🤔</div>
                <h4 className="font-semibold mb-2">Leadership Dilemma</h4>
                <p className="text-sm text-muted-foreground mb-4">
                  Propose a servant leadership challenge
                </p>
                <Button size="sm" className="w-full">Submit</Button>
              </CardContent>
            </Card>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default FeedbackHub;
