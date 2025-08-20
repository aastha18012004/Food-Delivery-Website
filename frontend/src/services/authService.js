import axios from 'axios';

const API_URL = 'http://localhost:5000/api/auth';

// Register user
export const register = async (userData) => {
  try {
    const response = await axios.post(`${API_URL}/signup`, userData);
    if (response.data) {
      localStorage.setItem('user', JSON.stringify(response.data));
    }
    return response.data;
  } catch (error) {
    throw error.response?.data?.message || 'An error occurred during registration';
  }
};

// Login user
export const login = async (userData) => {
  try {
    const response = await axios.post(`${API_URL}/signin`, userData);
    if (response.data) {
      localStorage.setItem('user', JSON.stringify(response.data));
    }
    return response.data;
  } catch (error) {
    throw error.response?.data?.message || 'An error occurred during login';
  }
};

// Logout user
export const logout = () => {
  localStorage.removeItem('user');
};

// Get current user
export const getCurrentUser = () => {
  const user = localStorage.getItem('user');
  return user ? JSON.parse(user) : null;
};

// Get token for authenticated requests
export const getToken = () => {
  const user = getCurrentUser();
  return user ? user.token : null;
};

// Get user profile
export const getUserProfile = async () => {
  try {
    const user = getCurrentUser();
    if (!user) throw new Error('User not authenticated');
    
    const config = {
      headers: {
        Authorization: `Bearer ${user.token}`
      }
    };
    
    const response = await axios.get(`${API_URL}/me`, config);
    return response.data;
  } catch (error) {
    throw error.response?.data?.message || 'Failed to fetch user profile';
  }
};