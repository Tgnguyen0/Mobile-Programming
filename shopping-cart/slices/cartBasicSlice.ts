import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface BasicItem {
  id: number;
  name: string;
  price: number;
}

interface State {
  items: BasicItem[];
}

const initialState: State = { items: [] };

const cartBasicSlice = createSlice({
  name: 'cartBasic',
  initialState,
  reducers: {
    addToCart: (state, action: PayloadAction<BasicItem>) => {
      state.items.push(action.payload);
    },
    removeFromCart: (state, action: PayloadAction<number>) => {
      state.items = state.items.filter((i) => i.id !== action.payload);
    },
    clearCart: (state) => {
      state.items = [];
    },
  },
});

export default cartBasicSlice.reducer;
export const { addToCart, removeFromCart, clearCart } = cartBasicSlice.actions;
