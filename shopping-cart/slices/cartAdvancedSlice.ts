import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface AdvItem {
  id: number;
  name: string;
  price: number;
  quantity: number;
}

interface State {
  items: AdvItem[];
}

const initialState: State = { items: [] };

const cartAdvancedSlice = createSlice({
  name: 'cartAdvanced',
  initialState,
  reducers: {
    addToCart: (state, action: PayloadAction<Omit<AdvItem, 'quantity'>>) => {
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
    },
  },
});

export default cartAdvancedSlice.reducer;
export const {
  addToCart,
  increaseQuantity,
  decreaseQuantity,
  removeFromCart,
  clearCart,
} = cartAdvancedSlice.actions;
