import type { RootState } from '../store';

export const selectAdvItems = (state: RootState) => state.cartAdvanced.items;

export const selectAdvItemCount = (state: RootState) =>
  state.cartAdvanced.items.reduce((t, i) => t + i.quantity, 0);

export const selectAdvTotal = (state: RootState) =>
  state.cartAdvanced.items.reduce((t, i) => t + i.price * i.quantity, 0);
