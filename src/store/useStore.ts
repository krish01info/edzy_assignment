import { create } from 'zustand';
import { persist, devtools } from 'zustand/middleware';
import type { Toast, Order, Snack } from '../types';

interface ToastSlice {
  toasts: Toast[];
  addToast: (message: string, type: Toast['type']) => void;
  removeToast: (id: string) => void;
  setToastDismissing: (id: string) => void;
}

interface OrderSlice {
  recentOrders: Order[];
  addRecentOrder: (order: Order) => void;
  clearRecentOrders: () => void;
}

interface OrderModalOptions {
  snack?: Snack;
  defaultStudentId?: number;
}

interface ModalSlice {
  isCreateStudentModalOpen: boolean;
  orderModalOptions: OrderModalOptions | null;
  openCreateStudentModal: () => void;
  closeCreateStudentModal: () => void;
  openOrderModal: (options?: OrderModalOptions) => void;
  closeOrderModal: () => void;
}

type StoreState = ToastSlice & OrderSlice & ModalSlice;

let toastCounter = 0;
const MAX_RECENT_ORDERS = 20;

export const useStore = create<StoreState>()(
  devtools(
    persist(
      (set, get) => ({
        // ——— Toast Slice ———
        toasts: [],
        addToast: (message, type) => {
          const id = `toast-${++toastCounter}-${Date.now()}`;
          const toast: Toast = { id, message, type };
          set((state) => ({ toasts: [...state.toasts, toast] }), false, 'toasts/addToast');

          setTimeout(() => {
            get().setToastDismissing(id);
            setTimeout(() => {
              get().removeToast(id);
            }, 300);
          }, 4000);
        },
        removeToast: (id) => {
          set((state) => ({ toasts: state.toasts.filter((t) => t.id !== id) }), false, 'toasts/removeToast');
        },
        setToastDismissing: (id) => {
          set((state) => ({
            toasts: state.toasts.map((t) =>
              t.id === id ? { ...t, dismissing: true } : t
            ),
          }), false, 'toasts/setToastDismissing');
        },

        // ——— Order Slice ———
        recentOrders: [],
        addRecentOrder: (order) => {
          set((state) => ({
            recentOrders: [order, ...state.recentOrders].slice(0, MAX_RECENT_ORDERS),
          }), false, 'orders/addRecentOrder');
        },
        clearRecentOrders: () => set({ recentOrders: [] }, false, 'orders/clearRecentOrders'),

        // ——— Modal Slice ———
        isCreateStudentModalOpen: false,
        orderModalOptions: null,
        openCreateStudentModal: () => set({ isCreateStudentModalOpen: true }, false, 'modals/openCreateStudentModal'),
        closeCreateStudentModal: () => set({ isCreateStudentModalOpen: false }, false, 'modals/closeCreateStudentModal'),
        openOrderModal: (options) => set({ orderModalOptions: options || {} }, false, 'modals/openOrderModal'),
        closeOrderModal: () => set({ orderModalOptions: null }, false, 'modals/closeOrderModal'),
      }),
      {
        name: 'canteen_storage',
        // Only persist recentOrders
        partialize: (state) => ({ recentOrders: state.recentOrders }),
      }
    ),
    { name: 'CanteenStore' }
  )
);
