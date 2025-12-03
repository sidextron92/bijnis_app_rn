/**
 * Order entity types
 */

import { Address } from './user';

export type OrderStatus =
  | 'PENDING'
  | 'CONFIRMED'
  | 'PREPARING'
  | 'OUT_FOR_DELIVERY'
  | 'DELIVERED'
  | 'CANCELLED';

export type PaymentStatus = 'PENDING' | 'PAID' | 'FAILED' | 'REFUNDED';

export type PaymentMethod = 'COD' | 'UPI' | 'CARD' | 'WALLET';

export interface OrderItem {
  id: string;
  orderId: string;
  productId: string;
  productName: string;
  productImage?: string;
  quantity: number;
  unitPrice: number;
  totalPrice: number;
}

export interface OrderTimeline {
  id: string;
  orderId: string;
  status: OrderStatus;
  message?: string;
  timestamp: string;
}

export interface Order {
  id: string;
  orderNumber: string;
  userId: string;
  addressId: string;
  status: OrderStatus;
  subtotal: number;
  deliveryFee: number;
  discount: number;
  total: number;
  paymentMethod: PaymentMethod;
  paymentStatus: PaymentStatus;
  deliverySlot?: string;
  instructions?: string;
  estimatedDelivery?: string;
  deliveredAt?: string;
  createdAt: string;
  updatedAt: string;
  items: OrderItem[];
}

export interface OrderDetail extends Order {
  address: Address;
  timeline: OrderTimeline[];
  rider?: RiderInfo;
}

export interface RiderInfo {
  name: string;
  phone: string;
  photo?: string;
  currentLocation?: {
    latitude: number;
    longitude: number;
  };
}

export interface CreateOrderRequest {
  addressId: string;
  paymentMethod: PaymentMethod;
  deliverySlot?: string;
  instructions?: string;
  couponCode?: string;
}

export interface CreateOrderResponse {
  order: Order;
  paymentUrl?: string; // For online payments
}

export interface OrderListResponse {
  orders: Order[];
  total: number;
  page: number;
  limit: number;
}

export interface OrderTrackingUpdate {
  orderId: string;
  status: OrderStatus;
  riderLocation?: {
    latitude: number;
    longitude: number;
  };
  estimatedArrival?: string;
}
