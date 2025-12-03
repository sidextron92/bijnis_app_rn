import { combineReducers } from '@reduxjs/toolkit';
import authReducer from '@/features/auth/store/authSlice';
import cartReducer from '@/features/cart/store/cartSlice';
import productsReducer from '@/features/products/store/productsSlice';
import ordersReducer from '@/features/orders/store/ordersSlice';

export const rootReducer = combineReducers({
  auth: authReducer,
  cart: cartReducer,
  products: productsReducer,
  orders: ordersReducer,
});
