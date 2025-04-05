import axios from "axios";

const API_BASE_URL = "http://localhost:5001";

// Centralized error handling
const handleError = (error) => {
  console.error("API Error:", error.message || error.response?.data || "An unknown error occurred");
  throw error;
};

// Token management
let token = localStorage.getItem("token");
const getToken = () => {
  if (!token) {
    token = localStorage.getItem("token");
  }
  return token;
};

// Default axios configuration
axios.defaults.baseURL = API_BASE_URL;
axios.defaults.headers.common["Content-Type"] = "application/json";

if (token) {
  axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
}

// API service methods
export const apiService = {
  get: async (endpoint) => {
    try {
      return await axios.get(endpoint);
    } catch (error) {
      handleError(error);
    }
  },

  post: async (endpoint, data, headers = {}) => {
    const authToken = getToken();
    if (!authToken) throw new Error("Authorization token is missing");

    try {
      return await axios.post(endpoint, data, {
        headers: {
          Authorization: `Bearer ${authToken}`,
          ...headers,
        },
      });
    } catch (error) {
      handleError(error);
    }
  },

  put: async (endpoint, data) => {
    try {
      return await axios.put(endpoint, data);
    } catch (error) {
      handleError(error);
    }
  },

  delete: async (endpoint) => {
    try {
      return await axios.delete(endpoint);
    } catch (error) {
      handleError(error);
    }
  },
};
