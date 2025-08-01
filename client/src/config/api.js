// API Configuration
const API_CONFIG = {
  // Base URL for the API
  BASE_URL: import.meta.env.VITE_API_URL || "http://localhost:5001",

  // API endpoints
  ENDPOINTS: {
    // Admin endpoints
    ADMIN_LOGIN: "/api/admin/login",
    ADMIN_ME: "/api/admin/me",

    // Projects endpoints
    PROJECTS: "/api/projects",
    PROJECT_BY_ID: (id) => `/api/projects/${id}`,

    // Skills endpoints
    SKILLS: "/api/skills",
    SKILL_BY_ID: (id) => `/api/skills/${id}`,

    // Experience endpoints
    EXPERIENCE: "/api/experience",
    EXPERIENCE_BY_ID: (id) => `/api/experience/${id}`,

    // Contact endpoint
    CONTACT: "/api/contact",

    // Upload endpoints
    UPLOAD_IMAGE: "/api/upload/image",
    DELETE_IMAGE: (filename) => `/api/upload/image/${filename}`,
    GET_IMAGE: (filename) => `/api/upload/image/${filename}`,
  },

  // Request timeout in milliseconds
  TIMEOUT: 10000,

  // Default headers
  DEFAULT_HEADERS: {
    "Content-Type": "application/json",
  },
};

// Helper function to get full URL
export const getApiUrl = (endpoint) => {
  return `${API_CONFIG.BASE_URL}${endpoint}`;
};

// Helper function to get authenticated headers
export const getAuthHeaders = () => {
  const token = localStorage.getItem("adminToken");
  return {
    ...API_CONFIG.DEFAULT_HEADERS,
    ...(token && { Authorization: `Bearer ${token}` }),
  };
};

// Export the configuration
export default API_CONFIG;

// Export individual endpoints for convenience
export const API_ENDPOINTS = API_CONFIG.ENDPOINTS;
