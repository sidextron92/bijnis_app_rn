/**
 * Authentication types
 */

import { User } from './user';

export interface AuthTokens {
  accessToken: string;
  refreshToken: string;
  expiresIn: number;
}

export interface AuthResponse {
  user: User;
  token: string;
  refreshToken: string;
}

export interface SendOTPRequest {
  phone: string;
}

export interface SendOTPResponse {
  success: boolean;
  message: string;
  expiresIn: number; // OTP expiry in seconds
}

export interface VerifyOTPRequest {
  phone: string;
  otp: string;
}

export interface VerifyOTPResponse extends AuthResponse {}

export interface RefreshTokenRequest {
  refreshToken: string;
}

export interface RefreshTokenResponse {
  accessToken: string;
  refreshToken: string;
}

export interface Session {
  id: string;
  userId: string;
  deviceInfo?: string;
  createdAt: string;
  expiresAt: string;
}
