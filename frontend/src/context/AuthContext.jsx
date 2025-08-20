import React, { createContext, useState, useEffect } from 'react';
import { getCurrentUser, login, logout, register } from '../services/authService';

export const AuthContext = createContext(null);

const AuthContextProvider = (props) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Check if user is already logged in
    const storedUser = getCurrentUser();
    if (storedUser) {
      setUser(storedUser.data.user);
    }
    setLoading(false);
  }, []);

  // Register new user
  const registerUser = async (userData) => {
    try {
      setLoading(true);
      setError(null);
      const response = await register(userData);
      setUser(response.data.user);
      return response;
    } catch (err) {
      setError(err);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  // Login user
  const loginUser = async (userData) => {
    try {
      setLoading(true);
      setError(null);
      const response = await login(userData);
      setUser(response.data.user);
      return response;
    } catch (err) {
      setError(err);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  // Logout user
  const logoutUser = () => {
    logout();
    setUser(null);
  };

  const contextValue = {
    user,
    loading,
    error,
    registerUser,
    loginUser,
    logoutUser,
    isAuthenticated: !!user
  };

  return (
    <AuthContext.Provider value={contextValue}>
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthContextProvider;