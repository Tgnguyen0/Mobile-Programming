import type { RootState } from '../store';

const DISCOUNT_RATES: Record<string, number> = {
  SUMMER10: 0.1,
  SPECIAL20: 0.2,
};

export const selectCartItems = (state: RootState) => state.cart.items;

export const selectSubtotal = (state: RootState) =>
  state.cart.items.reduce((t, i) => t + i.price * i.quantity, 0);

export const selectDiscount = (state: RootState) =>
  selectSubtotal(state) * (DISCOUNT_RATES[state.cart.discountCode ?? ''] ?? 0);

// Thuế tính trên số tiền sau giảm giá
export const selectTax = (state: RootState) =>
  (selectSubtotal(state) - selectDiscount(state)) * state.cart.taxRate;

export const selectCartTotal = (state: RootState) => {
  if (state.cart.items.length === 0) return 0;
  return (
    selectSubtotal(state) -
    selectDiscount(state) +
    selectTax(state) +
    state.cart.shippingCost
  );
};

export const selectItemCount = (state: RootState) =>
  state.cart.items.reduce((c, i) => c + i.quantity, 0);
