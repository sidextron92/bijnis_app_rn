/**
 * User entity types
 */

export interface User {
  id: string;
  phone: string;
  name?: string;
  email?: string;
  avatar?: string;
  isVerified: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface UserProfile extends User {
  addresses: Address[];
  defaultAddressId?: string;
}

export interface Address {
  id: string;
  userId: string;
  label: 'Home' | 'Work' | 'Other';
  fullAddress: string;
  landmark?: string;
  latitude: number;
  longitude: number;
  isDefault: boolean;
  createdAt: string;
  updatedAt: string;
}

export type CreateUserInput = Pick<User, 'phone' | 'name' | 'email'>;

export type UpdateUserInput = Partial<Pick<User, 'name' | 'email' | 'avatar'>>;
