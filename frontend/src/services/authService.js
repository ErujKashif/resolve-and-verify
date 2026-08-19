import api from './api';

export const authService = {
  sendOTP: async (email) => {
    return api('/auth/send-otp', {
      method: 'POST',
      body: JSON.stringify({ email }),
    });
  },

  verifyOTP: async (email, otp) => {
    const response = await api('/auth/verify-otp', {
      method: 'POST',
      body: JSON.stringify({ email, otp }),
    });

    console.log('📨 Verify OTP response:', response);

    if (response.token && response.user) {
      // ✅ Ensure the user object is stored correctly
      localStorage.setItem('token', response.token);
      localStorage.setItem('user', JSON.stringify(response.user));
      console.log('💾 Stored user with role:', response.user.role);
    } else {
      console.warn('⚠️ Missing token or user in response');
    }

    return response;
  },

  getCurrentUser: async () => {
    return api('/auth/me', { method: 'GET' });
  },

  logout: () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    console.log('🗑️ Local storage cleared');
  },

  isAuthenticated: () => {
    const token = localStorage.getItem('token');
    return !!token;
  },

  getUser: () => {
    const user = localStorage.getItem('user');
    if (user) {
      try {
        const parsed = JSON.parse(user);
        console.log('📖 Retrieved user from storage:', parsed);
        return parsed;
      } catch (e) {
        console.error('❌ Error parsing user:', e);
        return null;
      }
    }
    return null;
  },

  getToken: () => {
    const token = localStorage.getItem('token');
    console.log('🔑 Retrieved token:', token ? 'exists' : 'none');
    return token;
  },
};