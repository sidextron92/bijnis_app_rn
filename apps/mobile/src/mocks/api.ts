/**
 * Mock API Service
 * Simulates API calls with realistic delays
 */

import { mockCategories } from './data/categories';
import { mockProducts } from './data/products';
import { mockUser, mockAddresses, validTestPhones, TEST_OTP } from './data/users';
import { mockOrders } from './data/orders';
import { mockHomeLayout } from './data/homeLayout';
import type {
  User,
  Product,
  Category,
  Order,
  Address,
  CartItem,
  SDUIPageLayout,
} from 'shared-types';

// Simulate network delay
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

// Random delay between min and max ms
const randomDelay = (min = 200, max = 800) =>
  delay(Math.floor(Math.random() * (max - min + 1)) + min);

// Mock response wrapper
interface MockResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
}

function success<T>(data: T, message?: string): MockResponse<T> {
  return { success: true, data, message };
}

function error<T>(message: string): MockResponse<T> {
  return { success: false, error: message };
}

// ============== AUTH APIs ==============

export const authApi = {
  async sendOtp(phone: string): Promise<MockResponse<{ sessionId: string }>> {
    await randomDelay(500, 1000);

    // Normalize phone number
    const normalizedPhone = phone.replace(/\D/g, '').slice(-10);

    // Check if valid test phone
    const isValid = validTestPhones.some(p => p.includes(normalizedPhone));

    if (!isValid) {
      // Still allow any phone for demo purposes
      console.log('Demo mode: Allowing any phone number');
    }

    return success(
      { sessionId: `session_${Date.now()}` },
      'OTP sent successfully. Use 123456 for testing.'
    );
  },

  async verifyOtp(
    phone: string,
    otp: string,
    _sessionId: string
  ): Promise<MockResponse<{ user: User; token: string }>> {
    await randomDelay(500, 1000);

    if (otp !== TEST_OTP) {
      return error('Invalid OTP. Use 123456 for testing.');
    }

    return success({
      user: mockUser,
      token: `mock_token_${Date.now()}`,
    });
  },

  async getProfile(): Promise<MockResponse<User>> {
    await randomDelay();
    return success(mockUser);
  },

  async updateProfile(data: Partial<User>): Promise<MockResponse<User>> {
    await randomDelay();
    const updatedUser = { ...mockUser, ...data };
    return success(updatedUser);
  },

  async logout(): Promise<MockResponse<null>> {
    await randomDelay(200, 400);
    return success(null, 'Logged out successfully');
  },
};

// ============== PRODUCTS APIs ==============

export const productsApi = {
  async getProducts(params?: {
    categoryId?: string;
    search?: string;
    page?: number;
    limit?: number;
  }): Promise<MockResponse<{ products: Product[]; total: number; hasMore: boolean }>> {
    await randomDelay();

    let filtered = [...mockProducts];

    if (params?.categoryId) {
      filtered = filtered.filter(p => p.categoryId === params.categoryId);
    }

    if (params?.search) {
      const searchLower = params.search.toLowerCase();
      filtered = filtered.filter(
        p =>
          p.name.toLowerCase().includes(searchLower) ||
          p.description?.toLowerCase().includes(searchLower)
      );
    }

    const page = params?.page || 1;
    const limit = params?.limit || 20;
    const start = (page - 1) * limit;
    const end = start + limit;
    const paginated = filtered.slice(start, end);

    return success({
      products: paginated,
      total: filtered.length,
      hasMore: end < filtered.length,
    });
  },

  async getProduct(id: string): Promise<MockResponse<Product>> {
    await randomDelay();

    const product = mockProducts.find(p => p.id === id);
    if (!product) {
      return error('Product not found');
    }

    return success(product);
  },

  async searchProducts(query: string): Promise<MockResponse<Product[]>> {
    await randomDelay(300, 600);

    const searchLower = query.toLowerCase();
    const results = mockProducts.filter(
      p =>
        p.name.toLowerCase().includes(searchLower) ||
        p.description?.toLowerCase().includes(searchLower) ||
        p.tags?.some(t => t.toLowerCase().includes(searchLower))
    );

    return success(results.slice(0, 10));
  },
};

// ============== CATEGORIES APIs ==============

export const categoriesApi = {
  async getCategories(): Promise<MockResponse<Category[]>> {
    await randomDelay();
    return success(mockCategories);
  },

  async getCategory(id: string): Promise<MockResponse<Category>> {
    await randomDelay();

    const category = mockCategories.find(c => c.id === id);
    if (!category) {
      return error('Category not found');
    }

    return success(category);
  },
};

// ============== CART APIs ==============

// In-memory cart storage
let cartItems: CartItem[] = [];

export const cartApi = {
  async getCart(): Promise<MockResponse<{ items: CartItem[]; total: number }>> {
    await randomDelay(100, 300);

    const total = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
    return success({ items: cartItems, total });
  },

  async addToCart(
    productId: string,
    quantity: number = 1
  ): Promise<MockResponse<{ items: CartItem[]; total: number }>> {
    await randomDelay(200, 400);

    const product = mockProducts.find(p => p.id === productId);
    if (!product) {
      return error('Product not found');
    }

    const existingIndex = cartItems.findIndex(item => item.productId === productId);

    if (existingIndex >= 0) {
      cartItems[existingIndex].quantity += quantity;
    } else {
      cartItems.push({
        id: `cart-${product.id}-${Date.now()}`,
        productId: product.id,
        name: product.name,
        price: product.sellingPrice,
        mrp: product.mrp,
        quantity,
        image: product.images[0],
        unit: product.unit,
      });
    }

    const total = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
    return success({ items: cartItems, total });
  },

  async updateQuantity(
    productId: string,
    quantity: number
  ): Promise<MockResponse<{ items: CartItem[]; total: number }>> {
    await randomDelay(100, 300);

    const index = cartItems.findIndex(item => item.productId === productId);
    if (index < 0) {
      return error('Item not in cart');
    }

    if (quantity <= 0) {
      cartItems.splice(index, 1);
    } else {
      cartItems[index].quantity = quantity;
    }

    const total = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
    return success({ items: cartItems, total });
  },

  async removeFromCart(
    productId: string
  ): Promise<MockResponse<{ items: CartItem[]; total: number }>> {
    await randomDelay(100, 300);

    cartItems = cartItems.filter(item => item.productId !== productId);
    const total = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
    return success({ items: cartItems, total });
  },

  async clearCart(): Promise<MockResponse<null>> {
    await randomDelay(100, 200);
    cartItems = [];
    return success(null);
  },
};

// ============== ORDERS APIs ==============

let orders = [...mockOrders];

export const ordersApi = {
  async getOrders(): Promise<MockResponse<Order[]>> {
    await randomDelay();
    return success(orders.sort((a, b) =>
      new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    ));
  },

  async getOrder(id: string): Promise<MockResponse<Order>> {
    await randomDelay();

    const order = orders.find(o => o.id === id);
    if (!order) {
      return error('Order not found');
    }

    return success(order);
  },

  async createOrder(data: {
    addressId: string;
    paymentMethod: string;
    deliveryInstructions?: string;
  }): Promise<MockResponse<Order>> {
    await randomDelay(800, 1500);

    if (cartItems.length === 0) {
      return error('Cart is empty');
    }

    const address = mockAddresses.find(a => a.id === data.addressId);
    if (!address) {
      return error('Invalid address');
    }

    const subtotal = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
    const deliveryFee = subtotal > 200 ? 0 : 25;
    const discount = subtotal > 500 ? Math.floor(subtotal * 0.1) : 0;

    const newOrder: Order = {
      id: `order-${Date.now()}`,
      userId: mockUser.id,
      items: [...cartItems],
      status: 'confirmed',
      subtotal,
      deliveryFee,
      discount,
      total: subtotal + deliveryFee - discount,
      address,
      paymentMethod: data.paymentMethod as 'cod' | 'upi' | 'card',
      paymentStatus: data.paymentMethod === 'cod' ? 'pending' : 'completed',
      deliveryInstructions: data.deliveryInstructions,
      estimatedDelivery: new Date(Date.now() + 15 * 60 * 1000).toISOString(), // 15 mins
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    orders.unshift(newOrder);
    cartItems = []; // Clear cart after order

    return success(newOrder, 'Order placed successfully!');
  },

  async cancelOrder(id: string): Promise<MockResponse<Order>> {
    await randomDelay();

    const orderIndex = orders.findIndex(o => o.id === id);
    if (orderIndex < 0) {
      return error('Order not found');
    }

    const order = orders[orderIndex];
    if (!['pending', 'confirmed'].includes(order.status)) {
      return error('Order cannot be cancelled at this stage');
    }

    orders[orderIndex] = {
      ...order,
      status: 'cancelled',
      updatedAt: new Date().toISOString(),
    };

    return success(orders[orderIndex]);
  },
};

// ============== ADDRESS APIs ==============

let addresses = [...mockAddresses];

export const addressApi = {
  async getAddresses(): Promise<MockResponse<Address[]>> {
    await randomDelay();
    return success(addresses);
  },

  async addAddress(data: Omit<Address, 'id' | 'userId' | 'createdAt' | 'updatedAt'>): Promise<MockResponse<Address>> {
    await randomDelay();

    const newAddress: Address = {
      ...data,
      id: `addr-${Date.now()}`,
      userId: mockUser.id,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    if (data.isDefault) {
      addresses = addresses.map(a => ({ ...a, isDefault: false }));
    }

    addresses.push(newAddress);
    return success(newAddress);
  },

  async updateAddress(id: string, data: Partial<Address>): Promise<MockResponse<Address>> {
    await randomDelay();

    const index = addresses.findIndex(a => a.id === id);
    if (index < 0) {
      return error('Address not found');
    }

    if (data.isDefault) {
      addresses = addresses.map(a => ({ ...a, isDefault: false }));
    }

    addresses[index] = {
      ...addresses[index],
      ...data,
      updatedAt: new Date().toISOString(),
    };

    return success(addresses[index]);
  },

  async deleteAddress(id: string): Promise<MockResponse<null>> {
    await randomDelay();

    const index = addresses.findIndex(a => a.id === id);
    if (index < 0) {
      return error('Address not found');
    }

    addresses.splice(index, 1);
    return success(null);
  },
};

// ============== HOME/SDUI APIs ==============

export const homeApi = {
  async getHomeLayout(): Promise<MockResponse<SDUIPageLayout>> {
    await randomDelay(300, 600);
    return success(mockHomeLayout);
  },
};

// Export all APIs
export const mockApi = {
  auth: authApi,
  products: productsApi,
  categories: categoriesApi,
  cart: cartApi,
  orders: ordersApi,
  address: addressApi,
  home: homeApi,
};

export default mockApi;
