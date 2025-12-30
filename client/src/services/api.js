const API_BASE_URL = process.env.REACT_APP_API_URL || (() => {
  if (process.env.NODE_ENV === 'development') {
    return 'http://localhost:5000';
  }
  return '';
})();

export const API_ENDPOINTS = {
  CHARETTES: `${API_BASE_URL}/api/charettes`,
  CHARETTE: (id) => `${API_BASE_URL}/api/charettes/${id}`,
  CHARETTE_PARTICIPANTS: (id) => `${API_BASE_URL}/api/charettes/${id}/participants`,
  CHARETTE_MESSAGES: (id) => `${API_BASE_URL}/api/charettes/${id}/messages`,
  CHARETTE_REPORT: (id) => `${API_BASE_URL}/api/charettes/${id}/report`,
  CHARETTE_PHASE: (id) => `${API_BASE_URL}/api/charettes/${id}/phase`,
  CHARETTE_BREAKOUT_ROOMS: (id) => `${API_BASE_URL}/api/charettes/${id}/breakout-rooms`,
  CHARETTE_BREAKOUT_ROOM_JOIN: (id, roomId) => `${API_BASE_URL}/api/charettes/${id}/breakout-rooms/${roomId}/join`,
  CHARETTE_BREAKOUT_ROOM_LEAVE: (id, roomId) => `${API_BASE_URL}/api/charettes/${id}/breakout-rooms/${roomId}/leave`,
  CHARETTE_AI_INSIGHTS: (id) => `${API_BASE_URL}/api/charettes/${id}/ai-insights`,
  REASONING_ANALYZE: `${API_BASE_URL}/api/reasoning/analyze`,
  AI_ANALYZE_INTENT: `${API_BASE_URL}/api/ai/analyze-intent`,
  AI_EXTRACT_ASSUMPTIONS: `${API_BASE_URL}/api/ai/extract-assumptions`,
  AI_GENERATE_CLARIFICATIONS: `${API_BASE_URL}/api/ai/generate-clarifications`,
  AI_MAP_POSITIONS: `${API_BASE_URL}/api/ai/map-positions`,
  HEALTH: `${API_BASE_URL}/api/health`,
};

class ApiService {
  async fetchCharettes() {
    const response = await fetch(API_ENDPOINTS.CHARETTES);
    return response.json();
  }

  async getCharettes() {
    return this.fetchCharettes();
  }

  async createCharette(charetteData) {
    const response = await fetch(API_ENDPOINTS.CHARETTES, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(charetteData)
    });
    return response.json();
  }

  async getCharette(id) {
    const response = await fetch(API_ENDPOINTS.CHARETTE(id));
    return response.json();
  }

  async updateCharette(id, charetteData) {
    const response = await fetch(API_ENDPOINTS.CHARETTE(id), {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(charetteData)
    });
    return response.json();
  }

  async deleteCharette(id) {
    const response = await fetch(API_ENDPOINTS.CHARETTE(id), {
      method: 'DELETE'
    });
    return response.json();
  }

  async addParticipant(charetteId, userName, role) {
    const response = await fetch(API_ENDPOINTS.CHARETTE_PARTICIPANTS(charetteId), {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ userName, role })
    });
    return response.json();
  }

  async joinCharette(charetteId, userName, role) {
    return this.addParticipant(charetteId, userName, role);
  }

  async getMessages(charetteId, roomId = null, after = null) {
    let url = API_ENDPOINTS.CHARETTE_MESSAGES(charetteId);
    const params = new URLSearchParams();
    if (roomId) params.append('roomId', roomId);
    if (after) params.append('after', after);
    
    if (params.toString()) {
      url += `?${params.toString()}`;
    }
    
    const response = await fetch(url);
    return response.json();
  }

  async sendMessage(charetteId, messageData) {
    // Handle both old and new signature
    const data = typeof messageData === 'string' 
      ? { message: messageData, userName: arguments[2], role: arguments[3], roomId: arguments[4] || 'main' }
      : messageData;
    
    const response = await fetch(API_ENDPOINTS.CHARETTE_MESSAGES(charetteId), {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    });
    return response.json();
  }

  async changePhase(charetteId, action) {
    const response = await fetch(API_ENDPOINTS.CHARETTE_PHASE(charetteId), {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ action })
    });
    return response.json();
  }

  async nextPhase(charetteId) {
    return this.changePhase(charetteId, 'next');
  }

  async createBreakoutRooms(charetteId, roomCount, questions) {
    const response = await fetch(API_ENDPOINTS.CHARETTE_BREAKOUT_ROOMS(charetteId), {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ roomCount, questions })
    });
    return response.json();
  }

  async joinBreakoutRoom(charetteId, roomId, userName) {
    const response = await fetch(API_ENDPOINTS.CHARETTE_BREAKOUT_ROOM_JOIN(charetteId, roomId), {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ userName })
    });
    return response.json();
  }

  async joinRoom(charetteId, roomId, userName) {
    return this.joinBreakoutRoom(charetteId, roomId, userName);
  }

  async leaveBreakoutRoom(charetteId, roomId, userName) {
    const response = await fetch(API_ENDPOINTS.CHARETTE_BREAKOUT_ROOM_LEAVE(charetteId, roomId), {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ userName })
    });
    return response.json();
  }

  async leaveRoom(charetteId, roomId, userName) {
    return this.leaveBreakoutRoom(charetteId, roomId, userName);
  }

  async generateReport(charetteId) {
    const response = await fetch(API_ENDPOINTS.CHARETTE_REPORT(charetteId));
    return response.json();
  }

  async analyzeIntent(text, charetteId, userName) {
    const response = await fetch(API_ENDPOINTS.AI_ANALYZE_INTENT, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ text, charetteId, userName })
    });
    return response.json();
  }

  async extractAssumptions(text, charetteId, userName) {
    const response = await fetch(API_ENDPOINTS.AI_EXTRACT_ASSUMPTIONS, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ text, charetteId, userName })
    });
    return response.json();
  }

  async generateClarifications(text, context, charetteId) {
    const response = await fetch(API_ENDPOINTS.AI_GENERATE_CLARIFICATIONS, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ text, context, charetteId })
    });
    return response.json();
  }

  async mapPositions(charetteId) {
    const response = await fetch(API_ENDPOINTS.AI_MAP_POSITIONS, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ charetteId })
    });
    return response.json();
  }

  async getAIInsights(charetteId) {
    const response = await fetch(API_ENDPOINTS.CHARETTE_AI_INSIGHTS(charetteId));
    return response.json();
  }

  async analyzeReasoning(text, type, charetteId) {
    const response = await fetch(API_ENDPOINTS.REASONING_ANALYZE, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ text, type, charetteId })
    });
    return response.json();
  }
}

const apiService = new ApiService();

export default apiService;
