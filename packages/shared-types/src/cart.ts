/**
 * Cart entity types
 */

export interface CartItem {
  id: string;
  productId: string;
  name: string;
  image: string;
  price: number;
  mrp: number;
  unit: string;
  quantity: number;
}

export interface Cart {
  id: string;
  userId: string;
  items: CartItem[];
  updatedAt: string;
}

export interface CartSummary {
  itemCount: number;
  subtotal: number;
  mrpTotal: number;
  savings: number;
  deliveryFee: number;
  discount: number;
  total: number;
}

export interface AddToCartRequest {
  productId: string;
  quantity: number;
}

export interface UpdateCartItemRequest {
  productId: string;
  quantity: number;
}

export interface CartResponse {
  cart: Cart;
  summary: CartSummary;
}

export interface ApplyCouponRequest {
  couponCode: string;
}

export interface ApplyCouponResponse {
  success: boolean;
  discount: number;
  message: string;
}
