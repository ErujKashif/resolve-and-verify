import React, { createContext, useState, useContext, useEffect } from 'react';
import { authService } from '../services/authService';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const storedUser = authService.getUser();
    const token = authService.getToken();
    if (storedUser && token) {
      setUser(storedUser);
      console.log('🔐 Stored user loaded:', storedUser);
    }
    setLoading(false);
  }, []);

  const login = async (email, otp) => {
    try {
      setError(null);
      const response = await authService.verifyOTP(email, otp);
      
      // Ensure the user object is correctly set
      if (response && response.user) {
        setUser(response.user);
        console.log('✅ Login successful, user:', response.user);
        console.log('🎯 Role:', response.user.role);
      } else {
        throw new Error('User data missing in response');
      }
      return response;
    } catch (err) {
      setError(err.message);
      throw err;
    }
  };

  const sendOTP = async (email) => {
    try {
      setError(null);
      return await authService.sendOTP(email);
    } catch (err) {
      setError(err.message);
      throw err;
    }
  };

  const logout = () => {
    authService.logout();
    setUser(null);
    console.log('🚪 Logged out');
  };

  const value = {
    user,
    loading,
    error,
    login,
    sendOTP,
    logout,
    isAuthenticated: authService.isAuthenticated(),
    isAdmin: user?.role === 'admin',
    isOfficer: user?.role === 'officer',
    isCrew: user?.role === 'crew',
    isCitizen: user?.role === 'citizen',
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};