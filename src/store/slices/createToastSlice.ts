import type { StateCreator } from 'zustand';
import type { StoreState, ToastSlice } from '../types';

let toastCounter = 0;

export const createToastSlice: StateCreator<
  StoreState,
  [['zustand/devtools', never], ['zustand/persist', unknown]],
  [],
  ToastSlice
> = (set, get) => ({
  toasts: [],
  addToast: (message, type) => {
    const id = `toast-${++toastCounter}-${Date.now()}`;
    const toast = { id, message, type };
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
});
