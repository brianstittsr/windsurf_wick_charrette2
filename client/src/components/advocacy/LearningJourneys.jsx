import React, { useState, useEffect } from 'react';
import { BookOpen, Lock, CheckCircle, Clock, ArrowRight, Star } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import MicroLesson from './MicroLesson';
import advocacyService from '../../services/advocacyService';

const LearningJourneys = ({ advocacyUser }) => {
  const [paths, setPaths] = useState([]);
  const [selectedPath, setSelectedPath] = useState(null);
  const [currentModule, setCurrentModule] = useState(null);
  const [userProgress, setUserProgress] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadLearningPaths();
    loadUserProgress();
  }, [advocacyUser]);

  const loadLearningPaths = async () => {
    try {
      const allPaths = await advocacyService.getLearningPaths(
        advocacyUser.ageGroup,
        advocacyUser.role
      );
      setPaths(allPaths);
    } catch (error) {
      console.error('Error loading learning paths:', error);
    } finally {
      setLoading(false);
    }
  };

  const loadUserProgress = async () => {
    try {
      const progress = await advocacyService.getUserProgress(advocacyUser.userId);
      const progressMap = {};
      progress.forEach(p => {
        if (!progressMap[p.pathId]) {
          progressMap[p.pathId] = {};
        }
        progressMap[p.pathId][p.moduleId] = p;
      });
      setUserProgress(progressMap);
    } catch (error) {
      console.error('Error loading user progress:', error);
    }
  };

  const isPathUnlocked = (path) => {
    if (!path.prerequisites || path.prerequisites.length === 0) return true;
    return path.prerequisites.every(prereqId => 
      advocacyUser.completedPaths?.includes(prereqId)
    );
  };

  const getPathProgress = (pathId) => {
    const pathProgressData = userProgress[pathId] || {};
    const completedModules = Object.values(pathProgressData).filter(
      p => p.status === 'completed'
    ).length;
    const path = paths.find(p => p.id === pathId);
    const totalModules = path?.modules?.length || 0;
    return { completed: completedModules, total: totalModules };
  };

  const handleStartPath = (path) => {
    setSelectedPath(path);
    const firstIncompleteModule = path.modules.find(module => {
      const progress = userProgress[path.id]?.[module.id];
      return !progress || progress.status !== 'completed';
    });
    setCurrentModule(firstIncompleteModule || path.modules[0]);
  };

  const handleModuleComplete = async (moduleData) => {
    try {
      await advocacyService.saveModuleProgress({
        userId: advocacyUser.userId,
        pathId: selectedPath.id,
        moduleId: currentModule.id,
        status: 'completed',
        ...moduleData
      });

      const currentIndex = selectedPath.modules.findIndex(m => m.id === currentModule.id);
      
      if (currentIndex < selectedPath.modules.length - 1) {
        setCurrentModule(selectedPath.modules[currentIndex + 1]);
      } else {
        await advocacyService.completePathForUser(advocacyUser.userId, selectedPath.id);
        setSelectedPath(null);
        setCurrentModule(null);
        loadLearningPaths();
        loadUserProgress();
      }
    } catch (error) {
      console.error('Error saving module progress:', error);
    }
  };

  if (currentModule && selectedPath) {
    return (
      <MicroLesson
        module={currentModule}
        path={selectedPath}
        onComplete={handleModuleComplete}
        onBack={() => {
          setCurrentModule(null);
          setSelectedPath(null);
        }}
      />
    );
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-muted-foreground">Loading learning paths...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Your Learning Journey</CardTitle>
          <CardDescription>
            Complete interactive paths to build your skills in positive peer support, active advocacy, and servant leadership
          </CardDescription>
        </CardHeader>
      </Card>

      <div className="grid gap-6">
        {paths.map((path) => {
          const unlocked = isPathUnlocked(path);
          const progress = getPathProgress(path.id);
          const isCompleted = progress.completed === progress.total && progress.total > 0;
          const progressPercent = progress.total > 0 
            ? Math.round((progress.completed / progress.total) * 100) 
            : 0;

          return (
            <Card 
              key={path.id}
              className={`${!unlocked ? 'opacity-60' : 'hover:shadow-lg transition-shadow'}`}
            >
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center space-x-2 mb-2">
                      {isCompleted ? (
                        <CheckCircle className="h-5 w-5 text-green-600" />
                      ) : unlocked ? (
                        <BookOpen className="h-5 w-5 text-primary" />
                      ) : (
                        <Lock className="h-5 w-5 text-muted-foreground" />
                      )}
                      <CardTitle className="text-xl">{path.title}</CardTitle>
                    </div>
                    <CardDescription>{path.description}</CardDescription>
                  </div>
                  <Badge variant={unlocked ? "default" : "secondary"}>
                    Level {path.level}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between text-sm">
                    <div className="flex items-center space-x-4">
                      <div className="flex items-center space-x-1">
                        <Clock className="h-4 w-4 text-muted-foreground" />
                        <span>{path.estimatedMinutes} min</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <BookOpen className="h-4 w-4 text-muted-foreground" />
                        <span>{path.modules?.length || 0} modules</span>
                      </div>
                    </div>
                    {progress.total > 0 && (
                      <span className="text-muted-foreground">
                        {progress.completed}/{progress.total} completed
                      </span>
                    )}
                  </div>

                  {progress.total > 0 && (
                    <div className="w-full bg-muted rounded-full h-2">
                      <div
                        className="bg-primary h-2 rounded-full transition-all"
                        style={{ width: `${progressPercent}%` }}
                      />
                    </div>
                  )}

                  {!unlocked && path.prerequisites && (
                    <div className="p-3 bg-muted rounded-lg">
                      <p className="text-sm text-muted-foreground">
                        Complete the following paths to unlock:
                      </p>
                      <ul className="text-sm mt-1 space-y-1">
                        {path.prerequisites.map(prereqId => {
                          const prereqPath = paths.find(p => p.id === prereqId);
                          return prereqPath ? (
                            <li key={prereqId} className="flex items-center space-x-2">
                              <Star className="h-3 w-3" />
                              <span>{prereqPath.title}</span>
                            </li>
                          ) : null;
                        })}
                      </ul>
                    </div>
                  )}

                  <Button
                    onClick={() => handleStartPath(path)}
                    disabled={!unlocked}
                    className="w-full"
                  >
                    {isCompleted ? (
                      <>Review Path</>
                    ) : progress.completed > 0 ? (
                      <>Continue Learning</>
                    ) : (
                      <>Start Path</>
                    )}
                    <ArrowRight className="h-4 w-4 ml-2" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
};

export default LearningJourneys;
