import React, { useState, useEffect } from 'react';
import { MessageSquare, Users, FileText, ArrowLeft, Send, Plus, LogOut, Workflow, Settings, Database, Edit2, Trash2 } from 'lucide-react';
import { signInWithGoogle, logout, onAuthStateChange } from './firebase';
import { Button } from './components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from './components/ui/card';
import { Badge } from './components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './components/ui/tabs';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from './components/ui/alert-dialog';
import HomePage from './components/HomePage';
import CharetteWorkflow from './components/CharetteWorkflow';
import SettingsTab from './components/SettingsTab';
import AIAnalysisPanel from './components/AIAnalysisPanel';
import DocumentLibrary from './components/DocumentLibrary';
import CharetteCreationWizard from './components/CharetteCreationWizard';
import EditCharetteDialog from './components/EditCharetteDialog';
import apiService from './services/api';
import { usePolling } from './hooks/usePolling';
import { POLLING_INTERVAL } from './config';
import { cn } from './lib/utils';

const API_URL = process.env.REACT_APP_API_URL || (process.env.NODE_ENV === 'development' ? 'http://localhost:5000' : '');

console.log('Using polling-based architecture - Vercel compatible');

function App() {
  const [user, setUser] = useState(null);
  const [charettes, setCharettes] = useState([]);
  const [currentCharette, setCurrentCharette] = useState(null);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const [userName, setUserName] = useState('');
  const [userRole] = useState('participant');
  const [currentRoom, setCurrentRoom] = useState('main');
  const [activeTab, setActiveTab] = useState('overview');
  const [showCreateDialog, setShowCreateDialog] = useState(false);
  const [showEditDialog, setShowEditDialog] = useState(false);
  const [editingCharette, setEditingCharette] = useState(null);
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [deletingCharetteId, setDeletingCharetteId] = useState(null);
  const [documents, setDocuments] = useState([]);
  const [analysisRunning, setAnalysisRunning] = useState(false);
  const [showHomePage, setShowHomePage] = useState(true);
  const [newCharette, setNewCharette] = useState({
    title: '',
    description: '',
    scope: '',
    stakeholders: '',
    objectives: '',
    constraints: '',
    timeframe: '',
    desiredOutcomes: ''
  });

  // Demo mode handler
  const handleDemoMode = () => {
    const demoUser = {
      email: 'demo@charettesystem.com',
      displayName: 'Demo User',
      uid: 'demo-user-id'
    };
    setUser(demoUser);
    setUserName('Demo User');
    setShowHomePage(false);
  };

  // Handle demo request submission
  const handleDemoRequest = async (formData) => {
    // In production, send to backend/CRM
    console.log('Demo request:', formData);
    // Could integrate with email service, CRM, etc.
  };

  // Authentication
  useEffect(() => {
    const unsubscribe = onAuthStateChange((user) => {
      setUser(user);
      if (user) {
        setUserName(user.displayName || user.email);
      }
    });
    return () => unsubscribe();
  }, []);

  // Fetch charettes
  useEffect(() => {
    if (!user) return; // Only fetch when user is logged in
    
    const fetchCharettes = async () => {
      try {
        const data = await apiService.getCharettes();
        setCharettes(data);
      } catch (error) {
        console.error('Error fetching charettes:', error);
      }
    };
    fetchCharettes();
  }, [user]);

  // Polling for messages
  usePolling(async () => {
    if (currentCharette) {
      try {
        const msgs = await apiService.getMessages(currentCharette.id, currentRoom);
        setMessages(msgs);
      } catch (error) {
        console.error('Error polling messages:', error);
      }
    }
  }, POLLING_INTERVAL, [currentCharette, currentRoom]);

  const handleLogin = async () => {
    try {
      await signInWithGoogle();
    } catch (error) {
      console.error('Login error:', error);
    }
  };

  const handleLogout = async () => {
    try {
      await logout();
      setUser(null);
      setCurrentCharette(null);
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  const handleCreateCharette = async (formData) => {
    try {
      const charetteData = formData || newCharette;
      const charette = await apiService.createCharette(charetteData);
      setCharettes([...charettes, charette]);
      setShowCreateDialog(false);
      setNewCharette({
        title: '',
        description: '',
        scope: '',
        stakeholders: '',
        objectives: '',
        constraints: '',
        timeframe: '',
        desiredOutcomes: ''
      });
    } catch (error) {
      console.error('Error creating charette:', error);
    }
  };

  const handleEditCharette = (charette) => {
    setEditingCharette(charette);
    setShowEditDialog(true);
  };

  const handleSaveCharette = async (updatedCharette) => {
    try {
      await apiService.updateCharette(updatedCharette.id, updatedCharette);
      setCharettes(charettes.map(c => c.id === updatedCharette.id ? updatedCharette : c));
      setShowEditDialog(false);
      setEditingCharette(null);
    } catch (error) {
      console.error('Error updating charette:', error);
      alert('Failed to update charette. Please try again.');
    }
  };

  const handleDeleteCharette = (charetteId) => {
    setDeletingCharetteId(charetteId);
    setShowDeleteDialog(true);
  };

  const confirmDeleteCharette = async () => {
    if (!deletingCharetteId) return;
    
    try {
      await apiService.deleteCharette(deletingCharetteId);
      setCharettes(charettes.filter(c => c.id !== deletingCharetteId));
      setShowDeleteDialog(false);
      setDeletingCharetteId(null);
    } catch (error) {
      console.error('Error deleting charette:', error);
      setShowDeleteDialog(false);
      setDeletingCharetteId(null);
    }
  };

  const handleJoinCharette = async (charette) => {
    try {
      await apiService.joinCharette(charette.id, userName, userRole);
      setCurrentCharette(charette);
      setCurrentRoom('main');
      const msgs = await apiService.getMessages(charette.id, 'main');
      setMessages(msgs);
    } catch (error) {
      console.error('Error joining charette:', error);
    }
  };

  const handleSendMessage = async () => {
    if (!newMessage.trim() || !userName.trim()) return;
    
    try {
      await apiService.sendMessage(currentCharette.id, {
        message: newMessage,
        userName,
        role: userRole,
        roomId: currentRoom
      });
      setNewMessage('');
      const msgs = await apiService.getMessages(currentCharette.id, currentRoom);
      setMessages(msgs);
    } catch (error) {
      console.error('Error sending message:', error);
    }
  };

  const handleJoinRoom = async (roomId) => {
    try {
      if (currentRoom !== 'main') {
        await apiService.leaveRoom(currentCharette.id, currentRoom, userName);
      }
      if (roomId !== 'main') {
        await apiService.joinRoom(currentCharette.id, roomId, userName);
      }
      setCurrentRoom(roomId);
      const msgs = await apiService.getMessages(currentCharette.id, roomId);
      setMessages(msgs);
    } catch (error) {
      console.error('Error joining room:', error);
    }
  };

  const handleNextPhase = async () => {
    try {
      await apiService.nextPhase(currentCharette.id);
      const updatedCharette = await apiService.getCharette(currentCharette.id);
      setCurrentCharette(updatedCharette);
    } catch (error) {
      console.error('Error advancing phase:', error);
    }
  };

  // Home Page (before login)
  if (!user && showHomePage) {
    return (
      <HomePage 
        onGetStarted={handleDemoMode}
        onRequestDemo={handleDemoRequest}
      />
    );
  }

  // Login Screen
  if (!user) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
        <Card className="w-full max-w-md">
          <CardHeader className="text-center">
            <CardTitle className="text-3xl">Charette System</CardTitle>
            <CardDescription>Collaborative decision-making platform</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-center text-muted-foreground">
              Sign in to join or create charette sessions
            </p>
            <Button onClick={handleLogin} className="w-full" size="lg">
              <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24">
                <path fill="currentColor" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                <path fill="currentColor" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                <path fill="currentColor" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                <path fill="currentColor" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
              </svg>
              Sign in with Google
            </Button>
            
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <span className="w-full border-t" />
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-card px-2 text-muted-foreground">Or</span>
              </div>
            </div>
            
            <Button onClick={handleDemoMode} variant="outline" className="w-full" size="lg">
              <Users className="h-5 w-5 mr-2" />
              Continue in Demo Mode
            </Button>
            
            <p className="text-xs text-center text-muted-foreground">
              Demo mode lets you explore the system with pre-loaded historical data
            </p>
          </CardContent>
        </Card>
      </div>
    );
  }

  // Charette List Screen
  if (!currentCharette) {
    return (
      <div className="min-h-screen bg-background">
        {/* Header */}
        <header className="border-b bg-card">
          <div className="container mx-auto px-4 py-4 flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <MessageSquare className="h-8 w-8 text-primary" />
              <h1 className="text-2xl font-bold">Charette System</h1>
            </div>
            <div className="flex items-center space-x-4">
              <span className="text-sm text-muted-foreground">{user.email}</span>
              <Button variant="outline" size="sm" onClick={handleLogout}>
                <LogOut className="h-4 w-4 mr-2" />
                Logout
              </Button>
            </div>
          </div>
        </header>

        {/* Main Content */}
        <main className="container mx-auto px-4 py-8">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="text-3xl font-bold tracking-tight">Charette Sessions</h2>
              <p className="text-muted-foreground mt-2">Join an existing session or create a new one</p>
            </div>
            <Button onClick={() => setShowCreateDialog(true)} size="lg">
              <Plus className="h-5 w-5 mr-2" />
              New Charette
            </Button>
          </div>

          {/* Charette Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {charettes.map((charette) => (
              <Card key={charette.id} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <CardTitle className="text-xl">{charette.title}</CardTitle>
                    <Badge variant="secondary">
                      Phase {charette.currentPhase + 1}
                    </Badge>
                  </div>
                  <CardDescription className="line-clamp-2">
                    {charette.description}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2 text-sm">
                    <div className="flex items-center text-muted-foreground">
                      <Users className="h-4 w-4 mr-2" />
                      {charette.participants?.length || 0} participants
                    </div>
                    {charette.breakoutRooms && charette.breakoutRooms.length > 0 && (
                      <div className="flex items-center text-muted-foreground">
                        <MessageSquare className="h-4 w-4 mr-2" />
                        {charette.breakoutRooms.length} breakout rooms
                      </div>
                    )}
                  </div>
                </CardContent>
                <CardFooter className="flex gap-2">
                  <Button 
                    onClick={() => handleJoinCharette(charette)} 
                    className="flex-1"
                  >
                    Join Session
                  </Button>
                  <Button 
                    variant="outline" 
                    size="icon"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleEditCharette(charette);
                    }}
                    title="Edit Charette"
                  >
                    <Edit2 className="h-4 w-4" />
                  </Button>
                  <Button 
                    variant="outline" 
                    size="icon"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleDeleteCharette(charette.id);
                    }}
                    className="text-red-600 hover:text-red-700 hover:bg-red-50"
                    title="Delete Charette"
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>

          {charettes.length === 0 && (
            <Card className="text-center py-12">
              <CardContent>
                <MessageSquare className="h-16 w-16 mx-auto text-muted-foreground mb-4" />
                <h3 className="text-lg font-semibold mb-2">No charettes yet</h3>
                <p className="text-muted-foreground mb-4">Create your first charette session to get started</p>
                <Button onClick={() => setShowCreateDialog(true)}>
                  <Plus className="h-4 w-4 mr-2" />
                  Create Charette
                </Button>
              </CardContent>
            </Card>
          )}
        </main>

        {/* Create Wizard */}
        {showCreateDialog && (
          <CharetteCreationWizard
            onClose={() => setShowCreateDialog(false)}
            onCreate={handleCreateCharette}
          />
        )}

        {/* Edit Dialog */}
        {showEditDialog && editingCharette && (
          <EditCharetteDialog
            charette={editingCharette}
            onClose={() => {
              setShowEditDialog(false);
              setEditingCharette(null);
            }}
            onSave={handleSaveCharette}
          />
        )}

        {/* Delete Confirmation Dialog */}
        <AlertDialog open={showDeleteDialog} onOpenChange={setShowDeleteDialog}>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Are you sure?</AlertDialogTitle>
              <AlertDialogDescription>
                This will permanently delete this charette and all associated data. This action cannot be undone.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel onClick={() => {
                setShowDeleteDialog(false);
                setDeletingCharetteId(null);
              }}>
                Cancel
              </AlertDialogCancel>
              <AlertDialogAction
                onClick={confirmDeleteCharette}
                className="bg-red-600 hover:bg-red-700"
              >
                Delete
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </div>
    );
  }

  // Charette Session Screen
  const currentRoomData = currentCharette.breakoutRooms?.find(r => r.id === currentRoom);
  const roomMessages = messages.filter(m => m.roomId === currentRoom);

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Header */}
      <header className="border-b bg-card sticky top-0 z-10">
        <div className="container mx-auto px-4 py-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Button variant="ghost" size="sm" onClick={() => setCurrentCharette(null)}>
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back
              </Button>
              <div>
                <h1 className="text-xl font-bold">{currentCharette.title}</h1>
                <p className="text-sm text-muted-foreground">
                  Phase {currentCharette.currentPhase + 1} of {currentCharette.phases?.length || 6}
                </p>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <Badge variant="outline">{userName}</Badge>
              <Badge>{userRole}</Badge>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="flex-1 container mx-auto px-4 py-6">
        <Tabs className="space-y-6">
          <TabsList className="grid w-full grid-cols-8 lg:w-auto">
            <TabsTrigger 
              active={activeTab === 'workflow'}
              onClick={() => setActiveTab('workflow')}
            >
              <Workflow className="h-4 w-4 mr-2" />
              Workflow
            </TabsTrigger>
            <TabsTrigger 
              active={activeTab === 'overview'}
              onClick={() => setActiveTab('overview')}
            >
              <FileText className="h-4 w-4 mr-2" />
              Overview
            </TabsTrigger>
            <TabsTrigger 
              active={activeTab === 'discussion'}
              onClick={() => setActiveTab('discussion')}
            >
              <MessageSquare className="h-4 w-4 mr-2" />
              Discussion
            </TabsTrigger>
            <TabsTrigger 
              active={activeTab === 'rooms'}
              onClick={() => setActiveTab('rooms')}
            >
              <Users className="h-4 w-4 mr-2" />
              Rooms
            </TabsTrigger>
            <TabsTrigger 
              active={activeTab === 'ai-analysis'}
              onClick={() => setActiveTab('ai-analysis')}
            >
              <Workflow className="h-4 w-4 mr-2" />
              AI Analysis
            </TabsTrigger>
            <TabsTrigger 
              active={activeTab === 'documents'}
              onClick={() => setActiveTab('documents')}
            >
              <Database className="h-4 w-4 mr-2" />
              Documents
            </TabsTrigger>
            <TabsTrigger 
              active={activeTab === 'progress'}
              onClick={() => setActiveTab('progress')}
            >
              <FileText className="h-4 w-4 mr-2" />
              Progress
            </TabsTrigger>
            <TabsTrigger 
              active={activeTab === 'settings'}
              onClick={() => setActiveTab('settings')}
            >
              <Settings className="h-4 w-4 mr-2" />
              Settings
            </TabsTrigger>
          </TabsList>

          {/* Workflow Tab */}
          <TabsContent value="workflow" className={activeTab === 'workflow' ? '' : 'hidden'}>
            <CharetteWorkflow
              charette={currentCharette}
              messages={messages}
              participants={currentCharette.participants}
              onPhaseComplete={async (phase, data) => {
                try {
                  await apiService.nextPhase(currentCharette.id);
                  const updatedCharette = await apiService.getCharette(currentCharette.id);
                  setCurrentCharette(updatedCharette);
                } catch (error) {
                  console.error('Error advancing phase:', error);
                }
              }}
              onCreateBreakoutRooms={async (rooms) => {
                try {
                  await apiService.createBreakoutRooms(
                    currentCharette.id,
                    rooms.length,
                    rooms.map(r => r.questions).flat()
                  );
                  const updatedCharette = await apiService.getCharette(currentCharette.id);
                  setCurrentCharette(updatedCharette);
                } catch (error) {
                  console.error('Error creating breakout rooms:', error);
                }
              }}
              onUploadDocument={(files) => {
                console.log('Documents uploaded:', files);
              }}
            />
          </TabsContent>

          {/* Overview Tab */}
          <TabsContent value="overview" className={activeTab === 'overview' ? '' : 'hidden'}>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <Card className="lg:col-span-2">
                <CardHeader>
                  <CardTitle>Session Details</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <h4 className="font-medium mb-1">Description</h4>
                    <p className="text-muted-foreground">{currentCharette.description}</p>
                  </div>
                  {currentCharette.metadata && (
                    <>
                      {currentCharette.metadata.scope && (
                        <div>
                          <h4 className="font-medium mb-1">Scope</h4>
                          <p className="text-muted-foreground">{currentCharette.metadata.scope}</p>
                        </div>
                      )}
                      {currentCharette.metadata.objectives && (
                        <div>
                          <h4 className="font-medium mb-1">Objectives</h4>
                          <p className="text-muted-foreground">{currentCharette.metadata.objectives}</p>
                        </div>
                      )}
                    </>
                  )}
                </CardContent>
              </Card>

              <div className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Participants</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      {currentCharette.participants?.map((p, i) => (
                        <div key={i} className="flex items-center justify-between">
                          <span className="text-sm">{p.userName}</span>
                          <Badge variant="secondary" className="text-xs">{p.role}</Badge>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Phase Control</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <Button onClick={handleNextPhase} className="w-full">
                      Advance to Next Phase
                    </Button>
                  </CardContent>
                </Card>
              </div>
            </div>
          </TabsContent>

          {/* Discussion Tab */}
          <TabsContent value="discussion" className={activeTab === 'discussion' ? '' : 'hidden'}>
            <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
              {/* Room List */}
              <Card className="lg:col-span-1">
                <CardHeader>
                  <CardTitle className="text-lg">Rooms</CardTitle>
                </CardHeader>
                <CardContent className="space-y-2">
                  <button
                    onClick={() => handleJoinRoom('main')}
                    className={cn(
                      "w-full text-left px-3 py-2 rounded-md transition-colors",
                      currentRoom === 'main' 
                        ? "bg-primary text-primary-foreground" 
                        : "hover:bg-accent"
                    )}
                  >
                    <div className="font-medium">Main Room</div>
                    <div className="text-xs opacity-80">General discussion</div>
                  </button>
                  
                  {currentCharette.breakoutRooms?.map((room) => (
                    <button
                      key={room.id}
                      onClick={() => handleJoinRoom(room.id)}
                      className={cn(
                        "w-full text-left px-3 py-2 rounded-md transition-colors",
                        currentRoom === room.id 
                          ? "bg-primary text-primary-foreground" 
                          : "hover:bg-accent"
                      )}
                    >
                      <div className="font-medium">{room.name}</div>
                      <div className="text-xs opacity-80">
                        {room.participants?.length || 0} participants
                      </div>
                    </button>
                  ))}
                </CardContent>
              </Card>

              {/* Chat Area */}
              <Card className="lg:col-span-3 flex flex-col h-[600px]">
                <CardHeader className="border-b">
                  <CardTitle>
                    {currentRoom === 'main' ? 'Main Room' : currentRoomData?.name}
                  </CardTitle>
                  <CardDescription>
                    {currentRoom === 'main' 
                      ? 'General discussion area' 
                      : currentRoomData?.questions?.[0] || 'Breakout discussion'}
                  </CardDescription>
                </CardHeader>
                
                {/* Messages */}
                <CardContent className="flex-1 overflow-y-auto p-4 space-y-4">
                  {roomMessages.map((msg, i) => (
                    <div key={i} className={cn(
                      "flex",
                      msg.userName === userName ? "justify-end" : "justify-start"
                    )}>
                      <div className={cn(
                        "max-w-[70%] rounded-lg px-4 py-2",
                        msg.userName === userName 
                          ? "bg-primary text-primary-foreground" 
                          : "bg-muted"
                      )}>
                        <div className="flex items-center space-x-2 mb-1">
                          <span className="text-xs font-medium">{msg.userName}</span>
                          <Badge variant="outline" className="text-xs">{msg.role}</Badge>
                        </div>
                        <p className="text-sm">{msg.text}</p>
                        <span className="text-xs opacity-70">
                          {new Date(msg.timestamp).toLocaleTimeString()}
                        </span>
                      </div>
                    </div>
                  ))}
                </CardContent>

                {/* Input */}
                <CardFooter className="border-t p-4">
                  <div className="flex w-full space-x-2">
                    <input
                      type="text"
                      value={newMessage}
                      onChange={(e) => setNewMessage(e.target.value)}
                      onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                      placeholder="Type your message..."
                      className="flex-1 px-3 py-2 border rounded-md"
                    />
                    <Button onClick={handleSendMessage}>
                      <Send className="h-4 w-4" />
                    </Button>
                  </div>
                </CardFooter>
              </Card>
            </div>
          </TabsContent>

          {/* Rooms Tab */}
          <TabsContent value="rooms" className={activeTab === 'rooms' ? '' : 'hidden'}>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {currentCharette.breakoutRooms?.map((room) => (
                <Card key={room.id} className="hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <CardTitle>{room.name}</CardTitle>
                    <CardDescription>
                      {room.participants?.length || 0} participants
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      {room.questions?.map((q, i) => (
                        <p key={i} className="text-sm text-muted-foreground">• {q}</p>
                      ))}
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Button 
                      onClick={() => {
                        handleJoinRoom(room.id);
                        setActiveTab('discussion');
                      }}
                      className="w-full"
                      variant={currentRoom === room.id ? "default" : "outline"}
                    >
                      {currentRoom === room.id ? "Current Room" : "Join Room"}
                    </Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* AI Analysis Tab */}
          <TabsContent value="ai-analysis" className={activeTab === 'ai-analysis' ? '' : 'hidden'}>
            <AIAnalysisPanel
              charette={currentCharette}
              messages={messages}
              breakoutRooms={currentCharette.breakoutRooms}
              onAnalyze={async (roomId) => {
                try {
                  // Call AI analysis API
                  const response = await fetch(`${API_URL}/api/ai/analyze`, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                      charetteId: currentCharette.id,
                      roomId,
                      messages: roomId === 'all' ? messages : messages.filter(m => m.roomId === roomId)
                    })
                  });
                  return await response.json();
                } catch (error) {
                  console.error('AI analysis error:', error);
                  // Return mock data for now
                  return {
                    summary: 'Comprehensive analysis of discussion patterns and themes',
                    cognitiveDistortions: 'All-or-nothing thinking and overgeneralization detected',
                    assumptions: 'Core beliefs about fairness and safety driving positions',
                    emotionalTriggers: 'Fear of change and loss of control',
                    reframingOpportunities: [],
                    breakthroughs: []
                  };
                }
              }}
            />
          </TabsContent>

          {/* Progress Tab */}
          <TabsContent value="progress" className={activeTab === 'progress' ? '' : 'hidden'}>
            <Card>
              <CardHeader>
                <CardTitle>Charette Progress</CardTitle>
                <CardDescription>Track the phases and milestones</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {currentCharette.phases?.map((phase, i) => (
                    <div key={i} className="flex items-center space-x-4">
                      <div className={cn(
                        "w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium",
                        i <= currentCharette.currentPhase 
                          ? "bg-primary text-primary-foreground" 
                          : "bg-muted text-muted-foreground"
                      )}>
                        {i + 1}
                      </div>
                      <div className="flex-1">
                        <h4 className="font-medium">{phase.name}</h4>
                        <p className="text-sm text-muted-foreground">{phase.description}</p>
                      </div>
                      {i === currentCharette.currentPhase && (
                        <Badge>Current</Badge>
                      )}
                      {i < currentCharette.currentPhase && (
                        <Badge variant="secondary">Complete</Badge>
                      )}
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Documents Tab */}
          <TabsContent value="documents" className={activeTab === 'documents' ? '' : 'hidden'}>
            <DocumentLibrary
              charetteId={currentCharette.id}
              documents={documents}
              analysisRunning={analysisRunning}
              onUpload={async (uploadedDocs) => {
                try {
                  // Add documents to state
                  setDocuments([...documents, ...uploadedDocs]);
                  
                  // Save to API
                  await fetch(`${API_URL}/api/charettes/${currentCharette.id}/documents`, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ documents: uploadedDocs })
                  });
                  
                  console.log('Documents uploaded:', uploadedDocs.length);
                } catch (error) {
                  console.error('Error uploading documents:', error);
                }
              }}
              onDelete={async (docIds) => {
                try {
                  // Remove from state
                  setDocuments(documents.filter(d => !docIds.includes(d.id)));
                  
                  // Delete from API
                  await fetch(`${API_URL}/api/charettes/${currentCharette.id}/documents`, {
                    method: 'DELETE',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ documentIds: docIds })
                  });
                  
                  console.log('Documents deleted:', docIds.length);
                } catch (error) {
                  console.error('Error deleting documents:', error);
                }
              }}
              onRerunAnalysis={async (docs) => {
                try {
                  setAnalysisRunning(true);
                  
                  // Call AI analysis with documents
                  const response = await fetch(`${API_URL}/api/ai/analyze-with-documents`, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                      charetteId: currentCharette.id,
                      messages: messages,
                      documents: docs
                    })
                  });
                  
                  const result = await response.json();
                  console.log('Analysis complete with documents:', result);
                  
                  // Switch to AI Analysis tab to show results
                  setActiveTab('ai-analysis');
                  
                  alert('Analysis complete! View results in the AI Analysis tab.');
                } catch (error) {
                  console.error('Error running analysis:', error);
                  alert('Analysis failed. Using mock data for now.');
                } finally {
                  setAnalysisRunning(false);
                }
              }}
            />
          </TabsContent>

          {/* Settings Tab */}
          <TabsContent value="settings" className={activeTab === 'settings' ? '' : 'hidden'}>
            <SettingsTab
              onSave={(settings) => {
                console.log('Settings saved:', settings);
              }}
            />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}

export default App;
