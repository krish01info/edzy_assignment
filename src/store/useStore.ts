import { create } from 'zustand';
import { persist, devtools } from 'zustand/middleware';
import type { StoreState } from './types';
import { createToastSlice } from './slices/createToastSlice';
import { createOrderSlice } from './slices/createOrderSlice';
import { createModalSlice } from './slices/createModalSlice';
import { createCartSlice } from './slices/createCartSlice';

export const useStore = create<StoreState>()(
  devtools(
    persist(
      (...a) => ({
        ...createToastSlice(...a),
        ...createOrderSlice(...a),
        ...createModalSlice(...a),
        ...createCartSlice(...a),
      }),
      {
        name: 'canteen_storage',
        // Persist recentOrders and cart across reloads
        partialize: (state) => ({ recentOrders: state.recentOrders, cart: state.cart }),
      }
    ),
    { name: 'CanteenStore' }
  )
);
