import { authApi as mockAuthApi } from '@/mocks';

// Use mock API for development
const USE_MOCK = true;

export const authApi = {
  sendOTP: async (phone: string) => {
    if (USE_MOCK) {
      const response = await mockAuthApi.sendOtp(phone);
      if (!response.success) {
        throw new Error(response.error);
      }
      return { data: response.data };
    }
    // Real API call would go here
    throw new Error('Real API not implemented');
  },

  verifyOTP: async (phone: string, otp: string) => {
    if (USE_MOCK) {
      const response = await mockAuthApi.verifyOtp(phone, otp, 'session');
      if (!response.success) {
        throw new Error(response.error);
      }
      return { data: response.data };
    }
    throw new Error('Real API not implemented');
  },

  refreshToken: async (_refreshToken: string) => {
    // Mock implementation - just return success
    return { data: { token: `new_token_${Date.now()}` } };
  },

  logout: async () => {
    if (USE_MOCK) {
      await mockAuthApi.logout();
      return { data: null };
    }
    throw new Error('Real API not implemented');
  },

  getProfile: async () => {
    if (USE_MOCK) {
      const response = await mockAuthApi.getProfile();
      if (!response.success) {
        throw new Error(response.error);
      }
      return { data: response.data };
    }
    throw new Error('Real API not implemented');
  },

  updateProfile: async (data: { name?: string; email?: string }) => {
    if (USE_MOCK) {
      const response = await mockAuthApi.updateProfile(data);
      if (!response.success) {
        throw new Error(response.error);
      }
      return { data: response.data };
    }
    throw new Error('Real API not implemented');
  },
};
