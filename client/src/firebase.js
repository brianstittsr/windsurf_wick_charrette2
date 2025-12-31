// Firebase configuration and initialization
import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider, signInWithPopup, signOut, onAuthStateChanged } from 'firebase/auth';
import { getFirestore, collection, doc, getDoc, getDocs, addDoc, updateDoc, query, where, orderBy, onSnapshot, Timestamp } from 'firebase/firestore';

// Check if we're in demo mode
const isDemoMode = process.env.REACT_APP_DEMO_MODE === 'true';

const firebaseConfig = {
  // Use demo config if in demo mode, otherwise use environment variables
  apiKey: isDemoMode ? "demo-api-key" : process.env.REACT_APP_FIREBASE_API_KEY || "your-api-key-here",
  authDomain: isDemoMode ? "demo-project.firebaseapp.com" : process.env.REACT_APP_FIREBASE_AUTH_DOMAIN || "your-project.firebaseapp.com",
  projectId: isDemoMode ? "charette-system-demo" : process.env.REACT_APP_FIREBASE_PROJECT_ID || "your-project-id",
  storageBucket: isDemoMode ? "charette-system-demo.appspot.com" : process.env.REACT_APP_FIREBASE_STORAGE_BUCKET || "your-project.appspot.com",
  messagingSenderId: isDemoMode ? "123456789" : process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID || "123456789",
  appId: isDemoMode ? "1:123456789:web:demo123456" : process.env.REACT_APP_FIREBASE_APP_ID || "1:123456789:web:abcdef123456"
};

// Initialize Firebase only if not in demo mode
let app, auth, db, googleProvider;

if (!isDemoMode) {
  app = initializeApp(firebaseConfig);
  auth = getAuth(app);
  db = getFirestore(app);
  googleProvider = new GoogleAuthProvider();
  googleProvider.setCustomParameters({
    prompt: 'select_account'
  });
} else {
  // Create mock objects for demo mode
  auth = {
    currentUser: { displayName: 'Demo User', email: 'demo@example.com', uid: 'demo-user-id' }
  };
  db = {};
  googleProvider = {};
}

// Demo mode mock functions
const demoAuthFunctions = {
  signInWithGoogle: async () => {
    return {
      user: {
        displayName: 'Demo User',
        email: 'demo@example.com',
        uid: 'demo-user-id'
      }
    };
  },
  logout: async () => {},
  onAuthStateChange: (callback) => {
    // Immediately call callback with demo user
    setTimeout(() => callback({
      displayName: 'Demo User',
      email: 'demo@example.com',
      uid: 'demo-user-id'
    }), 100);
    return () => {}; // Return unsubscribe function
  }
};

const demoDbFunctions = {
  createCharette: async (charetteData) => {
    const id = `demo-charette-${Date.now()}`;
    console.log('Demo: Creating charette', charetteData);
    return { id, ...charetteData };
  },
  getCharettes: async () => {
    return [
      {
        id: 'demo-charette-1',
        title: 'Demo Charette Session',
        description: 'Sample collaborative facilitation session',
        currentPhase: 0,
        createdAt: new Date(),
        participants: [],
        isActive: true
      }
    ];
  },
  getCharette: async (charetteId) => {
    return {
      id: charetteId,
      title: 'Demo Charette Session',
      description: 'Sample collaborative facilitation session',
      currentPhase: 0,
      participants: [],
      breakoutRooms: [],
      isActive: true
    };
  },
  updateCharette: async (charetteId, updates) => {
    console.log('Demo: Updating charette', charetteId, updates);
  },
  addMessage: async (charetteId, messageData) => {
    const id = `demo-message-${Date.now()}`;
    console.log('Demo: Adding message', messageData);
    return { id, ...messageData };
  },
  getMessages: async (charetteId, roomId = null) => {
    return [
      {
        id: 'demo-message-1',
        text: 'Welcome to the demo charette session!',
        userName: 'Demo User',
        role: 'analyst',
        timestamp: new Date(),
        roomId: roomId || 'main'
      }
    ];
  },
  addParticipant: async (charetteId, participantData) => {
    const id = `demo-participant-${Date.now()}`;
    console.log('Demo: Adding participant', participantData);
    return { id, ...participantData };
  },
  getParticipants: async (charetteId) => {
    return [
      {
        id: 'demo-participant-1',
        userName: 'Demo User',
        role: 'analyst',
        userId: 'demo-user-id'
      }
    ];
  },
  createBreakoutRooms: async (charetteId, roomsData) => {
    console.log('Demo: Creating breakout rooms', roomsData);
    return roomsData.map((room, index) => ({
      id: `demo-room-${index}`,
      ...room
    }));
  },
  getBreakoutRooms: async (charetteId) => {
    return [];
  },
  updateBreakoutRoom: async (roomId, updates) => {
    console.log('Demo: Updating breakout room', roomId, updates);
  },
  saveReport: async (charetteId, reportData) => {
    const id = `demo-report-${Date.now()}`;
    console.log('Demo: Saving report', reportData);
    return { id, ...reportData };
  },
  getReports: async (charetteId) => {
    return [];
  },
  subscribeToCharette: (charetteId, callback) => {
    // No real-time updates in demo mode
    return () => {};
  },
  subscribeToMessages: (charetteId, roomId, callback) => {
    // No real-time updates in demo mode
    return () => {};
  },
  subscribeToBreakoutRooms: (charetteId, callback) => {
    // No real-time updates in demo mode
    return () => {};
  }
};

// Export functions based on demo mode
export const signInWithGoogle = isDemoMode ? demoAuthFunctions.signInWithGoogle : async () => {
  try {
    const result = await signInWithPopup(auth, googleProvider);
    return result.user;
  } catch (error) {
    console.error('Error signing in with Google:', error);
    throw error;
  }
};

export const logout = isDemoMode ? demoAuthFunctions.logout : async () => {
  try {
    await signOut(auth);
  } catch (error) {
    console.error('Error signing out:', error);
    throw error;
  }
};

export const onAuthStateChange = isDemoMode ? demoAuthFunctions.onAuthStateChange : (callback) => {
  return onAuthStateChanged(auth, callback);
};

// Export database functions
const dbFunctions = isDemoMode ? demoDbFunctions : {
  createCharette: async (charetteData) => {
    try {
      const docRef = await addDoc(collection(db, COLLECTIONS.CHARETTES), {
        ...charetteData,
        createdAt: Timestamp.now(),
        updatedAt: Timestamp.now(),
        currentPhase: 0,
        participants: [],
        breakoutRooms: [],
        analysis: [],
        isActive: true
      });
      return { id: docRef.id, ...charetteData };
    } catch (error) {
      console.error('Error creating charette:', error);
      throw error;
    }
  },

  getCharettes: async () => {
    try {
      const querySnapshot = await getDocs(collection(db, COLLECTIONS.CHARETTES));
      return querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    } catch (error) {
      console.error('Error getting charettes:', error);
      throw error;
    }
  },

  getCharette: async (charetteId) => {
    try {
      const docRef = doc(db, COLLECTIONS.CHARETTES, charetteId);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        return { id: docSnap.id, ...docSnap.data() };
      } else {
        throw new Error('Charette not found');
      }
    } catch (error) {
      console.error('Error getting charette:', error);
      throw error;
    }
  },

  updateCharette: async (charetteId, updates) => {
    try {
      const docRef = doc(db, COLLECTIONS.CHARETTES, charetteId);
      await updateDoc(docRef, {
        ...updates,
        updatedAt: Timestamp.now()
      });
    } catch (error) {
      console.error('Error updating charette:', error);
      throw error;
    }
  },

  addMessage: async (charetteId, messageData) => {
    try {
      const docRef = await addDoc(collection(db, COLLECTIONS.MESSAGES), {
        ...messageData,
        charetteId,
        timestamp: Timestamp.now(),
        roomId: messageData.roomId || 'main'
      });
      return { id: docRef.id, ...messageData };
    } catch (error) {
      console.error('Error adding message:', error);
      throw error;
    }
  },

  getMessages: async (charetteId, roomId = null) => {
    try {
      let q;
      if (roomId) {
        q = query(
          collection(db, COLLECTIONS.MESSAGES),
          where('charetteId', '==', charetteId),
          where('roomId', '==', roomId),
          orderBy('timestamp', 'asc')
        );
      } else {
        q = query(
          collection(db, COLLECTIONS.MESSAGES),
          where('charetteId', '==', charetteId),
          orderBy('timestamp', 'asc')
        );
      }
      const querySnapshot = await getDocs(q);
      return querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    } catch (error) {
      console.error('Error getting messages:', error);
      throw error;
    }
  },

  addParticipant: async (charetteId, participantData) => {
    try {
      // First check if participant already exists
      const existingQuery = query(
        collection(db, COLLECTIONS.PARTICIPANTS),
        where('charetteId', '==', charetteId),
        where('userId', '==', participantData.userId)
      );
      const existingDocs = await getDocs(existingQuery);

      if (!existingDocs.empty) {
        // Update existing participant
        const docId = existingDocs.docs[0].id;
        await updateDoc(doc(db, COLLECTIONS.PARTICIPANTS, docId), {
          ...participantData,
          updatedAt: Timestamp.now()
        });
        return { id: docId, ...participantData };
      } else {
        // Add new participant
        const docRef = await addDoc(collection(db, COLLECTIONS.PARTICIPANTS), {
          ...participantData,
          charetteId,
          joinedAt: Timestamp.now(),
          updatedAt: Timestamp.now()
        });
        return { id: docRef.id, ...participantData };
      }
    } catch (error) {
      console.error('Error adding participant:', error);
      throw error;
    }
  },

  getParticipants: async (charetteId) => {
    try {
      const q = query(
        collection(db, COLLECTIONS.PARTICIPANTS),
        where('charetteId', '==', charetteId)
      );
      const querySnapshot = await getDocs(q);
      return querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    } catch (error) {
      console.error('Error getting participants:', error);
      throw error;
    }
  },

  createBreakoutRooms: async (charetteId, roomsData) => {
    try {
      const roomPromises = roomsData.map(roomData =>
        addDoc(collection(db, COLLECTIONS.BREAKOUT_ROOMS), {
          ...roomData,
          charetteId,
          createdAt: Timestamp.now(),
          updatedAt: Timestamp.now(),
          participants: []
        })
      );
      const results = await Promise.all(roomPromises);
      return results.map((docRef, index) => ({ id: docRef.id, ...roomsData[index] }));
    } catch (error) {
      console.error('Error creating breakout rooms:', error);
      throw error;
    }
  },

  getBreakoutRooms: async (charetteId) => {
    try {
      const q = query(
        collection(db, COLLECTIONS.BREAKOUT_ROOMS),
        where('charetteId', '==', charetteId)
      );
      const querySnapshot = await getDocs(q);
      return querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    } catch (error) {
      console.error('Error getting breakout rooms:', error);
      throw error;
    }
  },

  updateBreakoutRoom: async (roomId, updates) => {
    try {
      const docRef = doc(db, COLLECTIONS.BREAKOUT_ROOMS, roomId);
      await updateDoc(docRef, {
        ...updates,
        updatedAt: Timestamp.now()
      });
    } catch (error) {
      console.error('Error updating breakout room:', error);
      throw error;
    }
  },

  saveReport: async (charetteId, reportData) => {
    try {
      const docRef = await addDoc(collection(db, COLLECTIONS.REPORTS), {
        ...reportData,
        charetteId,
        generatedAt: Timestamp.now()
      });
      return { id: docRef.id, ...reportData };
    } catch (error) {
      console.error('Error saving report:', error);
      throw error;
    }
  },

  getReports: async (charetteId) => {
    try {
      const q = query(
        collection(db, COLLECTIONS.REPORTS),
        where('charetteId', '==', charetteId),
        orderBy('generatedAt', 'desc')
      );
      const querySnapshot = await getDocs(q);
      return querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    } catch (error) {
      console.error('Error getting reports:', error);
      throw error;
    }
  },

  subscribeToCharette: (charetteId, callback) => {
    const docRef = doc(db, COLLECTIONS.CHARETTES, charetteId);
    return onSnapshot(docRef, (doc) => {
      if (doc.exists()) {
        callback({ id: doc.id, ...doc.data() });
      }
    });
  },

  subscribeToMessages: (charetteId, roomId = null, callback) => {
    let q;
    if (roomId) {
      q = query(
        collection(db, COLLECTIONS.MESSAGES),
        where('charetteId', '==', charetteId),
        where('roomId', '==', roomId),
        orderBy('timestamp', 'asc')
      );
    } else {
      q = query(
        collection(db, COLLECTIONS.MESSAGES),
        where('charetteId', '==', charetteId),
        orderBy('timestamp', 'asc')
      );
    }
    return onSnapshot(q, (querySnapshot) => {
      const messages = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      callback(messages);
    });
  },

  subscribeToBreakoutRooms: (charetteId, callback) => {
    const q = query(
      collection(db, COLLECTIONS.BREAKOUT_ROOMS),
      where('charetteId', '==', charetteId)
    );
    return onSnapshot(q, (querySnapshot) => {
      const rooms = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      callback(rooms);
    });
  }
};

export const {
  createCharette,
  getCharettes,
  getCharette,
  updateCharette,
  addMessage,
  getMessages,
  addParticipant,
  getParticipants,
  createBreakoutRooms,
  getBreakoutRooms,
  updateBreakoutRoom,
  saveReport,
  getReports,
  subscribeToCharette,
  subscribeToMessages,
  subscribeToBreakoutRooms
} = dbFunctions;
export const COLLECTIONS = {
  CHARETTES: 'charettes',
  MESSAGES: 'messages',
  PARTICIPANTS: 'participants',
  BREAKOUT_ROOMS: 'breakoutRooms',
  REPORTS: 'reports',
  ANALYSIS: 'analysis'
};

// Export db for use in other services
export { db };

export default app;
