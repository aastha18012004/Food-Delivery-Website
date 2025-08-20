const axios = require('axios');

const API_URL = 'http://localhost:5000/api';

// Test data
const testUser = {
  name: 'Test Admin',
  email: 'testadmin@example.com',
  password: 'password123'
};

const testFoodItem = {
  name: 'Greek Salad',
  description: 'Food provides essential nutrients for overall health and well-being',
  price: 149,
  image: 'greek_salad.jpg',
  category: 'Salad',
  rating: 4
};

let token;
let foodItemId;

// Test user signup
async function testSignup() {
  try {
    console.log('Testing user signup...');
    const response = await axios.post(`${API_URL}/auth/signup`, testUser);
    console.log('Signup successful!');
    return response.data;
  } catch (error) {
    if (error.response && (error.response.data.message.includes('duplicate') || error.response.data.message.includes('already exists'))) {
      console.log('User already exists, proceeding to login...');
      return null;
    } else {
      console.error('Signup failed:', error.response ? error.response.data : error.message);
      throw error;
    }
  }
}

// Test user login
async function testLogin() {
  try {
    console.log('Testing user login...');
    const response = await axios.post(`${API_URL}/auth/signin`, {
      email: testUser.email,
      password: testUser.password
    });
    token = response.data.token;
    console.log('Login successful! Token received.');
    return response.data;
  } catch (error) {
    console.error('Login failed:', error.response ? error.response.data : error.message);
    throw error;
  }
}

// Test creating a food item
async function testCreateFoodItem() {
  try {
    console.log('Testing food item creation...');
    const response = await axios.post(
      `${API_URL}/food-items`,
      testFoodItem,
      { headers: { Authorization: `Bearer ${token}` } }
    );
    foodItemId = response.data.data.foodItem._id;
    console.log(`Food item created with ID: ${foodItemId}`);
    return response.data;
  } catch (error) {
    console.error('Food item creation failed:', error.response ? error.response.data : error.message);
    throw error;
  }
}

// Test getting all food items
async function testGetAllFoodItems() {
  try {
    console.log('Testing get all food items...');
    const response = await axios.get(`${API_URL}/food-items`);
    console.log(`Retrieved ${response.data.results} food items`);
    return response.data;
  } catch (error) {
    console.error('Get all food items failed:', error.response ? error.response.data : error.message);
    throw error;
  }
}

// Test getting a single food item
async function testGetFoodItem() {
  try {
    console.log(`Testing get food item with ID: ${foodItemId}...`);
    const response = await axios.get(`${API_URL}/food-items/${foodItemId}`);
    console.log('Food item retrieved successfully!');
    return response.data;
  } catch (error) {
    console.error('Get food item failed:', error.response ? error.response.data : error.message);
    throw error;
  }
}

// Test updating a food item
async function testUpdateFoodItem() {
  try {
    console.log(`Testing update food item with ID: ${foodItemId}...`);
    const updatedData = { price: 159, rating: 4.5 };
    const response = await axios.patch(
      `${API_URL}/food-items/${foodItemId}`,
      updatedData,
      { headers: { Authorization: `Bearer ${token}` } }
    );
    console.log('Food item updated successfully!');
    return response.data;
  } catch (error) {
    console.error('Update food item failed:', error.response ? error.response.data : error.message);
    throw error;
  }
}

// Test deleting a food item
async function testDeleteFoodItem() {
  try {
    console.log(`Testing delete food item with ID: ${foodItemId}...`);
    const response = await axios.delete(
      `${API_URL}/food-items/${foodItemId}`,
      { headers: { Authorization: `Bearer ${token}` } }
    );
    console.log('Food item deleted successfully!');
    return response.data;
  } catch (error) {
    console.error('Delete food item failed:', error.response ? error.response.data : error.message);
    throw error;
  }
}

// Run all tests
async function runTests() {
  try {
    await testSignup();
    await testLogin();
    await testCreateFoodItem();
    await testGetAllFoodItems();
    await testGetFoodItem();
    await testUpdateFoodItem();
    await testDeleteFoodItem();
    console.log('All tests completed successfully!');
  } catch (error) {
    console.error('Test suite failed:', error);
  }
}

runTests();