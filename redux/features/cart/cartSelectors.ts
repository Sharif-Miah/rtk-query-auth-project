// features/cart/cartSelectors.ts

import { RootState } from "@/redux/store";


export const selectCartItems = (state: RootState) =>
  state.cart.items;

export const selectSubtotal = (state: RootState) =>
  state.cart.items.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

export const selectTax = (state: RootState) => {
  const subtotal = selectSubtotal(state);
  return subtotal * 0.10; // 10% tax
};

export const selectTotal = (state: RootState) => {
  const subtotal = selectSubtotal(state);
  const tax = subtotal * 0.10;
  return subtotal + tax;
};
