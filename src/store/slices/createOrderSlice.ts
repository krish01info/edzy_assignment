import type { StateCreator } from 'zustand';
import type { StoreState, OrderSlice } from '../types';

const MAX_RECENT_ORDERS = 20;

export const createOrderSlice: StateCreator<
  StoreState,
  [['zustand/devtools', never], ['zustand/persist', unknown]],
  [],
  OrderSlice
> = (set) => ({
  recentOrders: [],
  addRecentOrder: (order) => {
    set((state) => ({
      recentOrders: [order, ...state.recentOrders].slice(0, MAX_RECENT_ORDERS),
    }), false, 'orders/addRecentOrder');
  },
  clearRecentOrders: () => set({ recentOrders: [] }, false, 'orders/clearRecentOrders'),
});
