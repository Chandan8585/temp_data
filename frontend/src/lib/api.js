// Simple API utility for making requests to your API
const API_BASE_URL = 'http://localhost:5001'; // Direct connection to your API

// Helper function to handle API errors
const handleApiError = async (response) => {
  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`API Error: ${response.status} - ${errorText || response.statusText}`);
    
  }
  return response;
};

// GET request helper
export const fetchData = async (endpoint) => {
  try {
    const response = await fetch(`${API_BASE_URL}${endpoint}`);
    await handleApiError(response);
    return await response.json();
  } catch (error) { 
    console.error('API fetch error:', error);
    throw error;
  }
};
export const fetchDataUsingBearerToken = async (endpoint, token) => {
  try {
    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
      method: "GET",
      headers: {
        "Authorization": `Bearer ${token}`,
        "Content-Type": "application/json"
      }
    });

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error('API fetch error:', error);
    throw error;
  }
};
// POST request helper
export const postData = async (endpoint, token, data) => {
  console.log("Endpoint:", endpoint);
  console.log("Token:", token);
  console.log("Data:", JSON.stringify(data));
  try {
    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
      method: 'POST',
      headers: {
        "Authorization": `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: data,
    });
    console.log("Response status:", response);
console.log("Response body:", await response.text());
    await handleApiError(response);
    return await response.json();
  } catch (error) {
    console.error('API post error:', error);
    throw error;
  }
};

// PUT request helper
export const putData = async (endpoint, data) => {
  try {
    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });
    await handleApiError(response);
    return await response.json();
  } catch (error) {
    console.error('API put error:', error);
    throw error;
  }
};

// DELETE request helper
export const deleteData = async (endpoint) => {
  try {
    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
      method: 'DELETE',
    });
    await handleApiError(response);
    return await response.json();
  } catch (error) {
    console.error('API delete error:', error);
    throw error;
  }
};