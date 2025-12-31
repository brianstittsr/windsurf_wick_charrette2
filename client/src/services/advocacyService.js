import { db } from '../firebase';
import {
  collection,
  doc,
  getDoc,
  getDocs,
  addDoc,
  updateDoc,
  query,
  where,
  orderBy,
  limit,
  serverTimestamp,
  increment
} from 'firebase/firestore';

const advocacyService = {
  // Advocacy User Management
  async getAdvocacyUser(userId) {
    try {
      const userDoc = await getDoc(doc(db, 'advocacyUsers', userId));
      if (userDoc.exists()) {
        return { id: userDoc.id, ...userDoc.data() };
      }
      return null;
    } catch (error) {
      console.error('Error getting advocacy user:', error);
      throw error;
    }
  },

  async createAdvocacyUser(userData) {
    try {
      const userRef = doc(db, 'advocacyUsers', userData.userId);
      await updateDoc(userRef, {
        ...userData,
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp()
      }).catch(async () => {
        await addDoc(collection(db, 'advocacyUsers'), {
          ...userData,
          createdAt: serverTimestamp(),
          updatedAt: serverTimestamp()
        });
      });
      return await this.getAdvocacyUser(userData.userId);
    } catch (error) {
      console.error('Error creating advocacy user:', error);
      throw error;
    }
  },

  // Learning Paths
  async getLearningPaths(ageGroup, role) {
    try {
      const pathsRef = collection(db, 'learningPaths');
      const q = query(
        pathsRef,
        where('isActive', '==', true),
        orderBy('level', 'asc')
      );
      const snapshot = await getDocs(q);
      const paths = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      
      return paths.filter(path =>
        (!path.targetAgeGroup || path.targetAgeGroup.includes(ageGroup)) &&
        (!path.targetRoles || path.targetRoles.includes(role))
      );
    } catch (error) {
      console.error('Error getting learning paths:', error);
      return [];
    }
  },

  async getUserProgress(userId) {
    try {
      const progressRef = collection(db, 'userProgress');
      const q = query(progressRef, where('userId', '==', userId));
      const snapshot = await getDocs(q);
      return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    } catch (error) {
      console.error('Error getting user progress:', error);
      return [];
    }
  },

  async saveModuleProgress(progressData) {
    try {
      await addDoc(collection(db, 'userProgress'), {
        ...progressData,
        completedAt: serverTimestamp()
      });
    } catch (error) {
      console.error('Error saving module progress:', error);
      throw error;
    }
  },

  async completePathForUser(userId, pathId) {
    try {
      const userRef = doc(db, 'advocacyUsers', userId);
      const userDoc = await getDoc(userRef);
      if (userDoc.exists()) {
        const completedPaths = userDoc.data().completedPaths || [];
        if (!completedPaths.includes(pathId)) {
          await updateDoc(userRef, {
            completedPaths: [...completedPaths, pathId],
            currentLevel: increment(1),
            updatedAt: serverTimestamp()
          });
        }
      }
    } catch (error) {
      console.error('Error completing path:', error);
      throw error;
    }
  },

  // Scenarios
  async getScenarios(filters) {
    try {
      const scenariosRef = collection(db, 'scenarios');
      let q = query(scenariosRef, where('isActive', '==', true));
      
      if (filters.constraintType && filters.constraintType !== 'all') {
        q = query(q, where('constraintType', '==', filters.constraintType));
      }
      
      const snapshot = await getDocs(q);
      let scenarios = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      
      scenarios = scenarios.filter(scenario =>
        (!scenario.targetAgeGroup || scenario.targetAgeGroup.includes(filters.ageGroup)) &&
        (!scenario.targetRoles || scenario.targetRoles.includes(filters.role))
      );
      
      if (filters.difficulty && filters.difficulty !== 'all') {
        scenarios = scenarios.filter(s => s.difficulty === parseInt(filters.difficulty));
      }
      
      return scenarios;
    } catch (error) {
      console.error('Error getting scenarios:', error);
      return [];
    }
  },

  // Peer Support Scripts
  async getUserAffirmations(userId) {
    try {
      const scriptsRef = collection(db, 'peerSupportScripts');
      const q = query(
        scriptsRef,
        where('createdBy', '==', userId),
        where('type', '==', 'affirmation')
      );
      const snapshot = await getDocs(q);
      return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    } catch (error) {
      console.error('Error getting affirmations:', error);
      return [];
    }
  },

  async saveAffirmation(affirmationData) {
    try {
      await addDoc(collection(db, 'peerSupportScripts'), {
        ...affirmationData,
        usageCount: 0,
        helpfulVotes: 0,
        createdAt: serverTimestamp()
      });
    } catch (error) {
      console.error('Error saving affirmation:', error);
      throw error;
    }
  },

  // Community Needs
  async getCommunityNeeds() {
    try {
      const needsRef = collection(db, 'communityNeeds');
      const q = query(needsRef, orderBy('reportedAt', 'desc'));
      const snapshot = await getDocs(q);
      return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    } catch (error) {
      console.error('Error getting community needs:', error);
      return [];
    }
  },

  async createNeedReport(reportData) {
    try {
      await addDoc(collection(db, 'communityNeeds'), {
        ...reportData,
        upvotes: 0,
        status: 'reported',
        reportedAt: serverTimestamp(),
        updatedAt: serverTimestamp()
      });
    } catch (error) {
      console.error('Error creating need report:', error);
      throw error;
    }
  },

  async upvoteNeed(needId) {
    try {
      const needRef = doc(db, 'communityNeeds', needId);
      await updateDoc(needRef, {
        upvotes: increment(1)
      });
    } catch (error) {
      console.error('Error upvoting need:', error);
      throw error;
    }
  },

  // Advocacy Briefs
  async getAdvocacyBriefs(userId) {
    try {
      const briefsRef = collection(db, 'advocacyBriefs');
      const q = query(briefsRef, where('createdBy', '==', userId));
      const snapshot = await getDocs(q);
      return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    } catch (error) {
      console.error('Error getting advocacy briefs:', error);
      return [];
    }
  },

  async createAdvocacyBrief(briefData) {
    try {
      await addDoc(collection(db, 'advocacyBriefs'), {
        ...briefData,
        status: 'draft',
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp()
      });
    } catch (error) {
      console.error('Error creating advocacy brief:', error);
      throw error;
    }
  },

  // Servant Leadership
  async getLatestAssessment(userId) {
    try {
      const assessmentsRef = collection(db, 'servantLeadershipAssessments');
      const q = query(
        assessmentsRef,
        where('userId', '==', userId),
        orderBy('assessmentDate', 'desc'),
        limit(1)
      );
      const snapshot = await getDocs(q);
      if (!snapshot.empty) {
        return { id: snapshot.docs[0].id, ...snapshot.docs[0].data() };
      }
      return null;
    } catch (error) {
      console.error('Error getting latest assessment:', error);
      return null;
    }
  },

  async saveAssessment(assessmentData) {
    try {
      await addDoc(collection(db, 'servantLeadershipAssessments'), {
        ...assessmentData,
        assessmentDate: serverTimestamp()
      });
    } catch (error) {
      console.error('Error saving assessment:', error);
      throw error;
    }
  },

  async getActiveCommitments(userId) {
    try {
      const commitmentsRef = collection(db, 'practiceCommitments');
      const q = query(
        commitmentsRef,
        where('userId', '==', userId),
        where('completed', '==', false)
      );
      const snapshot = await getDocs(q);
      return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    } catch (error) {
      console.error('Error getting active commitments:', error);
      return [];
    }
  },

  async createCommitment(commitmentData) {
    try {
      await addDoc(collection(db, 'practiceCommitments'), {
        ...commitmentData,
        completed: false,
        reflections: []
      });
    } catch (error) {
      console.error('Error creating commitment:', error);
      throw error;
    }
  },

  async updateCommitment(commitmentId, updates) {
    try {
      const commitmentRef = doc(db, 'practiceCommitments', commitmentId);
      await updateDoc(commitmentRef, updates);
    } catch (error) {
      console.error('Error updating commitment:', error);
      throw error;
    }
  },

  // Resources
  async getResources() {
    try {
      const resourcesRef = collection(db, 'resources');
      const q = query(resourcesRef, where('isActive', '==', true));
      const snapshot = await getDocs(q);
      return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    } catch (error) {
      console.error('Error getting resources:', error);
      return [];
    }
  },

  // Feedback
  async submitFeedback(feedbackData) {
    try {
      await addDoc(collection(db, 'moduleFeedback'), {
        ...feedbackData,
        submittedAt: serverTimestamp()
      });
    } catch (error) {
      console.error('Error submitting feedback:', error);
      throw error;
    }
  },

  // Co-Creation
  async submitCoCreation(submissionData) {
    try {
      await addDoc(collection(db, 'coCreationSubmissions'), {
        ...submissionData,
        status: 'pending',
        submittedAt: serverTimestamp()
      });
    } catch (error) {
      console.error('Error submitting co-creation:', error);
      throw error;
    }
  }
};

export default advocacyService;
