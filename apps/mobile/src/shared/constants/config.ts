// API Configuration
export const API_BASE_URL = process.env.EXPO_PUBLIC_API_URL || 'http://localhost:3000/api';

// App Configuration
export const APP_CONFIG = {
  name: 'Quick Commerce',
  version: '1.0.0',
  minDeliveryAmount: 99,
  freeDeliveryThreshold: 199,
  deliveryFee: 25,
  maxCartItems: 50,
} as const;

// Feature Flags
export const FEATURES = {
  enableNotifications: true,
  enableAnalytics: true,
  enableCrashReporting: true,
  enableDarkMode: false,
} as const;

// Pagination
export const PAGINATION = {
  defaultPageSize: 20,
  maxPageSize: 50,
} as const;
