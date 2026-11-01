import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import AsyncStorage from '@react-native-async-storage/async-storage';

export interface CartItem {
  id: number;
  name: string;
  price: number;
  quantity: number;
}

interface CartState {
  items: CartItem[];
  discountCode: string | null;
  taxRate: number; // 0.1 = 10%
  shippingCost: number;
  hydrated: boolean;
}

export const STORAGE_KEY = 'cartState';

// AsyncStorage là bất đồng bộ nên khôi phục giỏ hàng bằng thunk
export const hydrateCart = createAsyncThunk('cart/hydrate', async () => {
  const raw = await AsyncStorage.getItem(STORAGE_KEY);
  return raw
    ? (JSON.parse(raw) as Pick<CartState, 'items' | 'discountCode' | 'shippingCost'>)
    : null;
});

const initialState: CartState = {
  items: [],
  discountCode: null,
  taxRate: 0.1,
  shippingCost: 10,
  hydrated: false,
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart: (state, action: PayloadAction<Omit<CartItem, 'quantity'>>) => {
      const existing = state.items.find((i) => i.id === action.payload.id);
      if (existing) existing.quantity += 1;
      else state.items.push({ ...action.payload, quantity: 1 });
    },
    increaseQuantity: (state, action: PayloadAction<number>) => {
      const item = state.items.find((i) => i.id === action.payload);
      if (item) item.quantity += 1;
    },
    decreaseQuantity: (state, action: PayloadAction<number>) => {
      const item = state.items.find((i) => i.id === action.payload);
      if (item && item.quantity > 1) item.quantity -= 1;
    },
    removeFromCart: (state, action: PayloadAction<number>) => {
      state.items = state.items.filter((i) => i.id !== action.payload);
    },
    clearCart: (state) => {
      state.items = [];
      state.discountCode = null;
    },
    applyDiscount: (state, action: PayloadAction<string | null>) => {
      state.discountCode = action.payload;
    },
    setShippingCost: (state, action: PayloadAction<number>) => {
      state.shippingCost = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(hydrateCart.fulfilled, (state, action) => {
        if (action.payload) {
          state.items = action.payload.items;
          state.discountCode = action.payload.discountCode;
          state.shippingCost = action.payload.shippingCost;
        }
        state.hydrated = true;
      })
      .addCase(hydrateCart.rejected, (state) => {
        state.hydrated = true;
      });
  },
});

export default cartSlice.reducer;
export const {
  addToCart,
  increaseQuantity,
  decreaseQuantity,
  removeFromCart,
  clearCart,
  applyDiscount,
  setShippingCost,
} = cartSlice.actions;
