import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import type { CartItem, Product } from 'shared-types';
import type { RootState } from '@/store';

interface CartState {
  items: CartItem[];
  isLoading: boolean;
  error: string | null;
}

const initialState: CartState = {
  items: [],
  isLoading: false,
  error: null,
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart: (state, action: PayloadAction<Product>) => {
      const existingItem = state.items.find(item => item.productId === action.payload.id);

      if (existingItem) {
        existingItem.quantity += 1;
      } else {
        state.items.push({
          id: `cart-${action.payload.id}-${Date.now()}`,
          productId: action.payload.id,
          name: action.payload.name,
          image: action.payload.images[0] || '',
          price: action.payload.sellingPrice,
          mrp: action.payload.mrp,
          quantity: 1,
          unit: action.payload.unit,
        });
      }
    },
    removeFromCart: (state, action: PayloadAction<string>) => {
      state.items = state.items.filter(item => item.productId !== action.payload);
    },
    updateQuantity: (state, action: PayloadAction<{ productId: string; quantity: number }>) => {
      const item = state.items.find(item => item.productId === action.payload.productId);

      if (item) {
        if (action.payload.quantity <= 0) {
          state.items = state.items.filter(i => i.productId !== action.payload.productId);
        } else {
          item.quantity = action.payload.quantity;
        }
      }
    },
    incrementQuantity: (state, action: PayloadAction<string>) => {
      const item = state.items.find(item => item.productId === action.payload);
      if (item) {
        item.quantity += 1;
      }
    },
    decrementQuantity: (state, action: PayloadAction<string>) => {
      const item = state.items.find(item => item.productId === action.payload);
      if (item) {
        if (item.quantity <= 1) {
          state.items = state.items.filter(i => i.productId !== action.payload);
        } else {
          item.quantity -= 1;
        }
      }
    },
    clearCart: state => {
      state.items = [];
    },
    setCartItems: (state, action: PayloadAction<CartItem[]>) => {
      state.items = action.payload;
    },
  },
});

export const {
  addToCart,
  removeFromCart,
  updateQuantity,
  incrementQuantity,
  decrementQuantity,
  clearCart,
  setCartItems,
} = cartSlice.actions;

// Selectors
export const selectCartItems = (state: RootState) => state.cart.items;
export const selectCartItemCount = (state: RootState) =>
  state.cart.items.reduce((total, item) => total + item.quantity, 0);
export const selectCartTotal = (state: RootState) =>
  state.cart.items.reduce((total, item) => total + item.price * item.quantity, 0);
export const selectCartMrpTotal = (state: RootState) =>
  state.cart.items.reduce((total, item) => total + item.mrp * item.quantity, 0);
export const selectCartSavings = (state: RootState) => {
  const mrpTotal = state.cart.items.reduce((total, item) => total + item.mrp * item.quantity, 0);
  const priceTotal = state.cart.items.reduce((total, item) => total + item.price * item.quantity, 0);
  return mrpTotal - priceTotal;
};
export const selectItemQuantity = (productId: string) => (state: RootState) =>
  state.cart.items.find(item => item.productId === productId)?.quantity || 0;

export default cartSlice.reducer;
