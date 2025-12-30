/**
 * API Configuration
 * Handles API endpoint configuration for both development and production
 * Updated for Vercel deployment - no WebSocket/Socket.IO support
 */

const API_BASE_URL = process.env.REACT_APP_API_URL || (() => {
  // Development: use localhost
  if (process.env.NODE_ENV === 'development') {
    return 'http://localhost:5000';
  }
  
  // Production: use relative URL (same domain as frontend)
  return '';
})();

// Polling interval for near-realtime updates (in milliseconds)
export const POLLING_INTERVAL = 3000; // 3 seconds

export const API_ENDPOINTS = {
  // Charette endpoints
  CHARETTES: `${API_BASE_URL}/api/charettes`,
  CHARETTE: (id) => `${API_BASE_URL}/api/charettes/${id}`,
  CHARETTE_PARTICIPANTS: (id) => `${API_BASE_URL}/api/charettes/${id}/participants`,
  CHARETTE_MESSAGES: (id) => `${API_BASE_URL}/api/charettes/${id}/messages`,
  CHARETTE_REPORT: (id) => `${API_BASE_URL}/api/charettes/${id}/report`,
  CHARETTE_PHASE: (id) => `${API_BASE_URL}/api/charettes/${id}/phase`,
  CHARETTE_BREAKOUT_ROOMS: (id) => `${API_BASE_URL}/api/charettes/${id}/breakout-rooms`,
  CHARETTE_AI_INSIGHTS: (id) => `${API_BASE_URL}/api/charettes/${id}/ai-insights`,
  
  // Analysis endpoints
  REASONING_ANALYZE: `${API_BASE_URL}/api/reasoning/analyze`,
  
  // AI endpoints
  AI_ANALYZE_INTENT: `${API_BASE_URL}/api/ai/analyze-intent`,
  AI_EXTRACT_ASSUMPTIONS: `${API_BASE_URL}/api/ai/extract-assumptions`,
  AI_GENERATE_CLARIFICATIONS: `${API_BASE_URL}/api/ai/generate-clarifications`,
  AI_MAP_POSITIONS: `${API_BASE_URL}/api/ai/map-positions`,
  
  // Health check
  HEALTH: `${API_BASE_URL}/api/health`,
};

const config = {
  API_BASE_URL,
  API_ENDPOINTS,
  POLLING_INTERVAL,
};

export default config;
