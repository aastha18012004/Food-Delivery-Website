// Simple test script for authentication endpoints
require('dotenv').config();
const axios = require('axios');

const API_URL = `http://localhost:${process.env.PORT || 5000}/api/auth`;

// Test user data
const testUser = {
  name: 'Test User',
  email: 'test@example.com',
  password: 'Password123!'
};

let token = null;

// Function to test signup
async function testSignup() {
  try {
    console.log('Testing signup endpoint...');
    const response = await axios.post(`${API_URL}/signup`, testUser);
    console.log('Signup successful:', response.data);
    return response.data;
  } catch (error) {
    console.error('Signup failed:', error.response ? error.response.data : error.message);
    // If user already exists, we can proceed with login
    if (error.response && error.response.data.message.includes('already exists')) {
      console.log('User already exists, proceeding with login test');
      return { success: false, userExists: true };
    }
    return { success: false };
  }
}

// Function to test login
async function testLogin() {
  try {
    console.log('Testing login endpoint...');
    const response = await axios.post(`${API_URL}/signin`, {
      email: testUser.email,
      password: testUser.password
    });
    console.log('Login successful:', response.data);
    token = response.data.token;
    return { success: true, token };
  } catch (error) {
    console.error('Login failed:', error.response ? error.response.data : error.message);
    return { success: false };
  }
}

// Function to test protected route
async function testProtectedRoute() {
  if (!token) {
    console.error('No token available for protected route test');
    return { success: false };
  }
  
  try {
    console.log('Testing protected route...');
    const response = await axios.get(`${API_URL}/me`, {
      headers: { Authorization: `Bearer ${token}` }
    });
    console.log('Protected route access successful:', response.data);
    return { success: true, data: response.data };
  } catch (error) {
    console.error('Protected route access failed:', error.response ? error.response.data : error.message);
    return { success: false };
  }
}

// Run tests sequentially
async function runTests() {
  console.log('Starting authentication tests...');
  
  // Test signup
  const signupResult = await testSignup();
  
  // Test login
  const loginResult = await testLogin();
  if (!loginResult.success) {
    console.error('Login test failed. Stopping tests.');
    return;
  }
  
  // Test protected route
  const protectedResult = await testProtectedRoute();
  
  // Summary
  console.log('\nTest Summary:');
  console.log('Signup:', signupResult.success || signupResult.userExists ? 'PASSED' : 'FAILED');
  console.log('Login:', loginResult.success ? 'PASSED' : 'FAILED');
  console.log('Protected Route:', protectedResult.success ? 'PASSED' : 'FAILED');
  
  if (loginResult.success && protectedResult.success) {
    console.log('\nAll tests PASSED! Authentication flow is working correctly.');
  } else {
    console.log('\nSome tests FAILED. Please check the authentication implementation.');
  }
}

// Run the tests
runTests().catch(err => {
  console.error('Test execution error:', err);
});