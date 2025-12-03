import { ordersApi as mockOrdersApi, cartApi as mockCartApi } from '@/mocks';

const USE_MOCK = true;

interface CreateOrderData {
  addressId: string;
  paymentMethod: string;
  deliverySlot?: string;
  instructions?: string;
}

export const ordersApi = {
  getOrders: async () => {
    if (USE_MOCK) {
      const response = await mockOrdersApi.getOrders();
      if (!response.success) {
        throw new Error(response.error);
      }
      return { data: response.data };
    }
    throw new Error('Real API not implemented');
  },

  getOrderById: async (orderId: string) => {
    if (USE_MOCK) {
      const response = await mockOrdersApi.getOrder(orderId);
      if (!response.success) {
        throw new Error(response.error);
      }
      return { data: response.data };
    }
    throw new Error('Real API not implemented');
  },

  createOrder: async (data: CreateOrderData) => {
    if (USE_MOCK) {
      const response = await mockOrdersApi.createOrder({
        addressId: data.addressId,
        paymentMethod: data.paymentMethod,
        deliveryInstructions: data.instructions,
      });
      if (!response.success) {
        throw new Error(response.error);
      }
      return { data: response.data };
    }
    throw new Error('Real API not implemented');
  },

  cancelOrder: async (orderId: string) => {
    if (USE_MOCK) {
      const response = await mockOrdersApi.cancelOrder(orderId);
      if (!response.success) {
        throw new Error(response.error);
      }
      return { data: response.data };
    }
    throw new Error('Real API not implemented');
  },

  reorder: async (orderId: string) => {
    if (USE_MOCK) {
      // Get the order and add items back to cart
      const orderResponse = await mockOrdersApi.getOrder(orderId);
      if (!orderResponse.success || !orderResponse.data) {
        throw new Error(orderResponse.error || 'Order not found');
      }

      // Add each item to cart
      for (const item of orderResponse.data.items) {
        await mockCartApi.addToCart(item.productId, item.quantity);
      }

      return { data: { success: true } };
    }
    throw new Error('Real API not implemented');
  },
};
