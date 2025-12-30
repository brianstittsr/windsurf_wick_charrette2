import React, { useState } from 'react';
import PhaseIntroduction from './PhaseIntroduction';
import PhaseDataCollection from './PhaseDataCollection';
import PhaseAnalysis from './PhaseAnalysis';
import PhaseIdeation from './PhaseIdeation';
import PhaseSynthesis from './PhaseSynthesis';
import PhaseReporting from './PhaseReporting';
import { Card, CardContent } from './ui/card';
import { Badge } from './ui/badge';
import { CheckCircle, Circle } from 'lucide-react';

const PHASES = [
  { id: 0, name: 'Introduction', component: PhaseIntroduction },
  { id: 1, name: 'Data Collection', component: PhaseDataCollection },
  { id: 2, name: 'Analysis', component: PhaseAnalysis },
  { id: 3, name: 'Ideation', component: PhaseIdeation },
  { id: 4, name: 'Synthesis', component: PhaseSynthesis },
  { id: 5, name: 'Reporting', component: PhaseReporting }
];

export default function CharetteWorkflow({ 
  charette, 
  messages, 
  participants,
  onPhaseComplete,
  onCreateBreakoutRooms,
  onUploadDocument 
}) {
  const [currentPhase, setCurrentPhase] = useState(charette?.currentPhase || 0);
  const [phaseData, setPhaseData] = useState({
    documents: [],
    notes: '',
    breakoutRooms: charette?.breakoutRooms || [],
    ideas: [],
    solutions: []
  });

  const handlePhaseComplete = (data = {}) => {
    setPhaseData({ ...phaseData, ...data });
    const nextPhase = currentPhase + 1;
    
    if (nextPhase < PHASES.length) {
      setCurrentPhase(nextPhase);
      if (onPhaseComplete) {
        onPhaseComplete(nextPhase, { ...phaseData, ...data });
      }
    }
  };

  const handleCreateBreakoutRooms = (topics) => {
    const rooms = topics.map((topic, idx) => ({
      id: `room-${idx + 1}`,
      name: topic.topic,
      questions: topic.questions.filter(q => q),
      participants: [],
      createdAt: new Date().toISOString()
    }));
    
    setPhaseData({ ...phaseData, breakoutRooms: rooms });
    
    if (onCreateBreakoutRooms) {
      onCreateBreakoutRooms(rooms);
    }
  };

  const handleUploadDocument = (files) => {
    setPhaseData({ 
      ...phaseData, 
      documents: [...phaseData.documents, ...files] 
    });
    
    if (onUploadDocument) {
      onUploadDocument(files);
    }
  };

  const CurrentPhaseComponent = PHASES[currentPhase]?.component;

  return (
    <div className="space-y-6">
      {/* Phase Progress Indicator */}
      <Card className="sticky top-0 z-10 bg-background/95 backdrop-blur">
        <CardContent className="py-4">
          <div className="flex items-center justify-between">
            {PHASES.map((phase, idx) => (
              <React.Fragment key={phase.id}>
                <div className="flex flex-col items-center">
                  <div className={`
                    flex items-center justify-center w-10 h-10 rounded-full border-2 transition-all
                    ${idx < currentPhase ? 'bg-green-500 border-green-500 text-white' : ''}
                    ${idx === currentPhase ? 'bg-primary border-primary text-white' : ''}
                    ${idx > currentPhase ? 'bg-muted border-muted-foreground/30 text-muted-foreground' : ''}
                  `}>
                    {idx < currentPhase ? (
                      <CheckCircle className="h-5 w-5" />
                    ) : (
                      <Circle className="h-5 w-5" />
                    )}
                  </div>
                  <div className="mt-2 text-center">
                    <p className={`text-xs font-medium ${idx === currentPhase ? 'text-primary' : 'text-muted-foreground'}`}>
                      {phase.name}
                    </p>
                    {idx === currentPhase && (
                      <Badge variant="secondary" className="mt-1 text-xs">
                        Current
                      </Badge>
                    )}
                  </div>
                </div>
                {idx < PHASES.length - 1 && (
                  <div className={`
                    flex-1 h-0.5 mx-2 transition-all
                    ${idx < currentPhase ? 'bg-green-500' : 'bg-muted-foreground/30'}
                  `} />
                )}
              </React.Fragment>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Current Phase Content */}
      {CurrentPhaseComponent && (
        <CurrentPhaseComponent
          charette={charette}
          messages={messages}
          participants={participants}
          breakoutRooms={phaseData.breakoutRooms}
          ideas={phaseData.ideas}
          solutions={phaseData.solutions}
          onComplete={handlePhaseComplete}
          onCreateBreakoutRooms={handleCreateBreakoutRooms}
          onUploadDocument={handleUploadDocument}
        />
      )}
    </div>
  );
}
