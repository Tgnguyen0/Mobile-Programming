import { configureStore } from '@reduxjs/toolkit';
import AsyncStorage from '@react-native-async-storage/async-storage';
import cartBasicReducer from './slices/cartBasicSlice';
import cartAdvancedReducer from './slices/cartAdvancedSlice';
import cartReducer, { STORAGE_KEY } from './slices/cartSlice';
import productsReducer from './slices/productsSlice';

const store = configureStore({
  reducer: {
    cartBasic: cartBasicReducer,
    cartAdvanced: cartAdvancedReducer,
    cart: cartReducer,
    products: productsReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

// Lưu giỏ hàng Level 3 mỗi khi thay đổi (chỉ sau khi đã khôi phục xong)
let lastSaved = '';
store.subscribe(() => {
  const { items, discountCode, shippingCost, hydrated } = store.getState().cart;
  if (!hydrated) return;
  const json = JSON.stringify({ items, discountCode, shippingCost });
  if (json === lastSaved) return;
  lastSaved = json;
  AsyncStorage.setItem(STORAGE_KEY, json).catch(() => {});
});

export default store;
