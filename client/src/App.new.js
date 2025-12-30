import React, { useState, useEffect, useCallback } from 'react';
import { MessageSquare, Users, FileText, ArrowLeft, Send, Plus, Menu, LogOut } from 'lucide-react';
import { signInWithGoogle, logout, onAuthStateChange } from './firebase';
import { Button } from './components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from './components/ui/card';
import { Badge } from './components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './components/ui/tabs';
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
  const [userRole, setUserRole] = useState('participant');
  const [currentRoom, setCurrentRoom] = useState('main');
  const [activeTab, setActiveTab] = useState('overview');
  const [showCreateDialog, setShowCreateDialog] = useState(false);
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
    const fetchCharettes = async () => {
      try {
        const data = await apiService.getCharettes();
        setCharettes(data);
      } catch (error) {
        console.error('Error fetching charettes:', error);
      }
    };
    fetchCharettes();
  }, []);

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

  const handleCreateCharette = async () => {
    try {
      const charette = await apiService.createCharette(newCharette);
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
                <CardFooter>
                  <Button 
                    onClick={() => handleJoinCharette(charette)} 
                    className="w-full"
                  >
                    Join Session
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

        {/* Create Dialog */}
        {showCreateDialog && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
            <Card className="w-full max-w-2xl max-h-[90vh] overflow-y-auto">
              <CardHeader>
                <CardTitle>Create New Charette</CardTitle>
                <CardDescription>Set up a new collaborative session</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Title</label>
                  <input
                    type="text"
                    value={newCharette.title}
                    onChange={(e) => setNewCharette({...newCharette, title: e.target.value})}
                    className="w-full px-3 py-2 border rounded-md"
                    placeholder="Enter charette title"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Description</label>
                  <textarea
                    value={newCharette.description}
                    onChange={(e) => setNewCharette({...newCharette, description: e.target.value})}
                    className="w-full px-3 py-2 border rounded-md"
                    rows={3}
                    placeholder="Brief description of the charette"
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Scope</label>
                    <input
                      type="text"
                      value={newCharette.scope}
                      onChange={(e) => setNewCharette({...newCharette, scope: e.target.value})}
                      className="w-full px-3 py-2 border rounded-md"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Timeframe</label>
                    <input
                      type="text"
                      value={newCharette.timeframe}
                      onChange={(e) => setNewCharette({...newCharette, timeframe: e.target.value})}
                      className="w-full px-3 py-2 border rounded-md"
                    />
                  </div>
                </div>
              </CardContent>
              <CardFooter className="flex justify-end space-x-2">
                <Button variant="outline" onClick={() => setShowCreateDialog(false)}>
                  Cancel
                </Button>
                <Button onClick={handleCreateCharette}>
                  Create Charette
                </Button>
              </CardFooter>
            </Card>
          </div>
        )}
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
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-4 lg:w-auto">
            <TabsTrigger value="overview" active={activeTab === 'overview'}>
              <FileText className="h-4 w-4 mr-2" />
              Overview
            </TabsTrigger>
            <TabsTrigger value="discussion" active={activeTab === 'discussion'}>
              <MessageSquare className="h-4 w-4 mr-2" />
              Discussion
            </TabsTrigger>
            <TabsTrigger value="rooms" active={activeTab === 'rooms'}>
              <Users className="h-4 w-4 mr-2" />
              Rooms
            </TabsTrigger>
            <TabsTrigger value="progress" active={activeTab === 'progress'}>
              <FileText className="h-4 w-4 mr-2" />
              Progress
            </TabsTrigger>
          </TabsList>

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
        </Tabs>
      </div>
    </div>
  );
}

export default App;
