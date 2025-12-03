import { User, Address } from 'shared-types';

export const mockAddresses: Address[] = [
  {
    id: 'addr-1',
    userId: 'user-1',
    label: 'Home',
    fullAddress: '123, Green Park, Sector 45, Gurugram, Haryana 122003',
    landmark: 'Near Central Park',
    latitude: 28.4595,
    longitude: 77.0266,
    isDefault: true,
    createdAt: '2024-01-15T10:00:00Z',
    updatedAt: '2024-01-15T10:00:00Z',
  },
  {
    id: 'addr-2',
    userId: 'user-1',
    label: 'Work',
    fullAddress: '456, Cyber Hub, DLF Phase 2, Gurugram, Haryana 122002',
    landmark: 'Tower A, 5th Floor',
    latitude: 28.4949,
    longitude: 77.0886,
    isDefault: false,
    createdAt: '2024-01-20T14:30:00Z',
    updatedAt: '2024-01-20T14:30:00Z',
  },
];

export const mockUser: User = {
  id: 'user-1',
  phone: '+919876543210',
  name: 'John Doe',
  email: 'john@example.com',
  avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100',
  addresses: mockAddresses,
  defaultAddressId: 'addr-1',
  createdAt: '2024-01-01T00:00:00Z',
  updatedAt: '2024-01-15T10:00:00Z',
};

// Test phone numbers for mock login
export const validTestPhones = [
  '+919876543210',
  '+919999999999',
  '+918888888888',
  '9876543210',
  '9999999999',
];

// Test OTP (always use 123456 for testing)
export const TEST_OTP = '123456';
