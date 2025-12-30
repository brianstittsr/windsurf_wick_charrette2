/**
 * Firebase Service Module
 * Handles all Firestore database operations for Charette System
 * Supports both production (Firestore) and development (in-memory) modes
 */

const admin = require('firebase-admin');

let db = null;
let isInitialized = false;

/**
 * Initialize Firebase Admin SDK
 * @returns {Promise<void>}
 */
async function initializeFirebase() {
  if (isInitialized) {
    return;
  }

  try {
    // Check if Firebase credentials are provided via environment
    const firebaseConfig = {
      projectId: process.env.FIREBASE_PROJECT_ID,
      privateKey: process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, '\n'),
      clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
    };

    // Only initialize if credentials are available
    if (firebaseConfig.projectId && firebaseConfig.privateKey && firebaseConfig.clientEmail) {
      admin.initializeApp({
        credential: admin.credential.cert(firebaseConfig),
        projectId: firebaseConfig.projectId,
      });
      db = admin.firestore();
      isInitialized = true;
      console.log('Firebase initialized successfully');
    } else {
      console.log('Firebase credentials not found - using in-memory storage');
    }
  } catch (error) {
    console.error('Error initializing Firebase:', error);
    console.log('Falling back to in-memory storage');
  }
}

/**
 * Get all charettes
 * @returns {Promise<Array>}
 */
async function getCharettes() {
  if (!db) {
    return [];
  }

  try {
    const snapshot = await db.collection('charettes').get();
    return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
  } catch (error) {
    console.error('Error fetching charettes:', error);
    return [];
  }
}

/**
 * Get charette by ID
 * @param {string} charetteId
 * @returns {Promise<Object|null>}
 */
async function getCharette(charetteId) {
  if (!db) {
    return null;
  }

  try {
    const doc = await db.collection('charettes').doc(charetteId).get();
    if (doc.exists) {
      return { id: doc.id, ...doc.data() };
    }
    return null;
  } catch (error) {
    console.error('Error fetching charette:', error);
    return null;
  }
}

/**
 * Create new charette
 * @param {Object} charetteData
 * @returns {Promise<Object>}
 */
async function createCharette(charetteData) {
  if (!db) {
    return charetteData;
  }

  try {
    const docRef = await db.collection('charettes').add({
      ...charetteData,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    });
    return { id: docRef.id, ...charetteData };
  } catch (error) {
    console.error('Error creating charette:', error);
    throw error;
  }
}

/**
 * Update charette
 * @param {string} charetteId
 * @param {Object} updates
 * @returns {Promise<void>}
 */
async function updateCharette(charetteId, updates) {
  if (!db) {
    return;
  }

  try {
    await db.collection('charettes').doc(charetteId).update({
      ...updates,
      updatedAt: new Date().toISOString(),
    });
  } catch (error) {
    console.error('Error updating charette:', error);
    throw error;
  }
}

/**
 * Add message to charette
 * @param {string} charetteId
 * @param {Object} messageData
 * @returns {Promise<Object>}
 */
async function addMessage(charetteId, messageData) {
  if (!db) {
    return messageData;
  }

  try {
    const docRef = await db.collection('charettes').doc(charetteId)
      .collection('messages').add({
        ...messageData,
        timestamp: new Date().toISOString(),
      });
    return { id: docRef.id, ...messageData };
  } catch (error) {
    console.error('Error adding message:', error);
    throw error;
  }
}

/**
 * Get messages for charette
 * @param {string} charetteId
 * @param {string} roomId - optional room filter
 * @returns {Promise<Array>}
 */
async function getMessages(charetteId, roomId = null) {
  if (!db) {
    return [];
  }

  try {
    let query = db.collection('charettes').doc(charetteId).collection('messages');
    
    if (roomId) {
      query = query.where('roomId', '==', roomId);
    }
    
    const snapshot = await query.orderBy('timestamp', 'asc').get();
    return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
  } catch (error) {
    console.error('Error fetching messages:', error);
    return [];
  }
}

/**
 * Add participant to charette
 * @param {string} charetteId
 * @param {Object} participantData
 * @returns {Promise<Object>}
 */
async function addParticipant(charetteId, participantData) {
  if (!db) {
    return participantData;
  }

  try {
    const docRef = await db.collection('charettes').doc(charetteId)
      .collection('participants').add({
        ...participantData,
        joinedAt: new Date().toISOString(),
      });
    return { id: docRef.id, ...participantData };
  } catch (error) {
    console.error('Error adding participant:', error);
    throw error;
  }
}

/**
 * Get participants for charette
 * @param {string} charetteId
 * @returns {Promise<Array>}
 */
async function getParticipants(charetteId) {
  if (!db) {
    return [];
  }

  try {
    const snapshot = await db.collection('charettes').doc(charetteId)
      .collection('participants').get();
    return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
  } catch (error) {
    console.error('Error fetching participants:', error);
    return [];
  }
}

/**
 * Store analysis results
 * @param {string} charetteId
 * @param {Object} analysisData
 * @returns {Promise<Object>}
 */
async function storeAnalysis(charetteId, analysisData) {
  if (!db) {
    return analysisData;
  }

  try {
    const docRef = await db.collection('charettes').doc(charetteId)
      .collection('analysis').add({
        ...analysisData,
        timestamp: new Date().toISOString(),
      });
    return { id: docRef.id, ...analysisData };
  } catch (error) {
    console.error('Error storing analysis:', error);
    throw error;
  }
}

/**
 * Get analysis results for charette
 * @param {string} charetteId
 * @returns {Promise<Array>}
 */
async function getAnalysis(charetteId) {
  if (!db) {
    return [];
  }

  try {
    const snapshot = await db.collection('charettes').doc(charetteId)
      .collection('analysis').orderBy('timestamp', 'desc').get();
    return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
  } catch (error) {
    console.error('Error fetching analysis:', error);
    return [];
  }
}

/**
 * Store report
 * @param {string} charetteId
 * @param {Object} reportData
 * @returns {Promise<Object>}
 */
async function storeReport(charetteId, reportData) {
  if (!db) {
    return reportData;
  }

  try {
    const docRef = await db.collection('charettes').doc(charetteId)
      .collection('reports').add({
        ...reportData,
        generatedAt: new Date().toISOString(),
      });
    return { id: docRef.id, ...reportData };
  } catch (error) {
    console.error('Error storing report:', error);
    throw error;
  }
}

/**
 * Get latest report for charette
 * @param {string} charetteId
 * @returns {Promise<Object|null>}
 */
async function getLatestReport(charetteId) {
  if (!db) {
    return null;
  }

  try {
    const snapshot = await db.collection('charettes').doc(charetteId)
      .collection('reports').orderBy('generatedAt', 'desc').limit(1).get();
    
    if (snapshot.docs.length > 0) {
      return { id: snapshot.docs[0].id, ...snapshot.docs[0].data() };
    }
    return null;
  } catch (error) {
    console.error('Error fetching report:', error);
    return null;
  }
}

module.exports = {
  initializeFirebase,
  getCharettes,
  getCharette,
  createCharette,
  updateCharette,
  addMessage,
  getMessages,
  addParticipant,
  getParticipants,
  storeAnalysis,
  getAnalysis,
  storeReport,
  getLatestReport,
};
