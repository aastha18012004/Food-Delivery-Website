import axios from 'axios';
import { getToken } from './authService';

const API_URL = 'http://localhost:5000/api/food-items';

// Get all food items
export const getAllFoodItems = async () => {
  try {
    const response = await axios.get(API_URL);
    return response.data;
  } catch (error) {
    throw error.response?.data?.message || 'Error fetching food items';
  }
};

// Get food item by ID
export const getFoodItemById = async (id) => {
  try {
    const response = await axios.get(`${API_URL}/${id}`);
    return response.data;
  } catch (error) {
    throw error.response?.data?.message || 'Error fetching food item';
  }
};

// Create new food item (admin only)
export const createFoodItem = async (foodItemData) => {
  try {
    const token = getToken();
    const response = await axios.post(API_URL, foodItemData, {
      headers: { Authorization: `Bearer ${token}` }
    });
    return response.data;
  } catch (error) {
    throw error.response?.data?.message || 'Error creating food item';
  }
};

// Update food item (admin only)
export const updateFoodItem = async (id, foodItemData) => {
  try {
    const token = getToken();
    const response = await axios.patch(`${API_URL}/${id}`, foodItemData, {
      headers: { Authorization: `Bearer ${token}` }
    });
    return response.data;
  } catch (error) {
    throw error.response?.data?.message || 'Error updating food item';
  }
};

// Delete food item (admin only)
export const deleteFoodItem = async (id) => {
  try {
    const token = getToken();
    const response = await axios.delete(`${API_URL}/${id}`, {
      headers: { Authorization: `Bearer ${token}` }
    });
    return response.data;
  } catch (error) {
    throw error.response?.data?.message || 'Error deleting food item';
  }
};

// Get food items by category
export const getFoodItemsByCategory = async (category) => {
  try {
    const response = await axios.get(`${API_URL}?category=${category}`);
    return response.data;
  } catch (error) {
    throw error.response?.data?.message || 'Error fetching food items by category';
  }
};