import type { StateCreator } from 'zustand';
import type { StoreState, CartSlice } from '../types';

export const createCartSlice: StateCreator<
  StoreState,
  [['zustand/devtools', never], ['zustand/persist', unknown]],
  [],
  CartSlice
> = (set) => ({
  cart: [],
  addToCart: (snack, quantity = 1) => set((state) => {
    const existing = state.cart.find(item => item.snack.id === snack.id);
    if (existing) {
      return {
        cart: state.cart.map(item =>
          item.snack.id === snack.id
            ? { ...item, quantity: Math.min(item.quantity + quantity, 5) }
            : item
        )
      };
    }
    return { cart: [...state.cart, { snack, quantity }] };
  }, false, 'cart/addToCart'),
  removeFromCart: (snackId) => set((state) => ({
    cart: state.cart.filter(item => item.snack.id !== snackId)
  }), false, 'cart/removeFromCart'),
  updateCartQuantity: (snackId, quantity) => set((state) => ({
    cart: state.cart.map(item =>
      item.snack.id === snackId
        ? { ...item, quantity: Math.max(1, Math.min(quantity, 5)) }
        : item
    )
  }), false, 'cart/updateCartQuantity'),
  clearCart: () => set({ cart: [] }, false, 'cart/clearCart'),
});
