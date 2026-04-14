import type { Toast, Order, Snack, CartItem } from '../types';

export interface ToastSlice {
  toasts: Toast[];
  addToast: (message: string, type: Toast['type']) => void;
  removeToast: (id: string) => void;
  setToastDismissing: (id: string) => void;
}

export interface OrderSlice {
  recentOrders: Order[];
  addRecentOrder: (order: Order) => void;
  clearRecentOrders: () => void;
}

export interface OrderModalOptions {
  snack?: Snack;
  defaultStudentId?: number;
}

export interface ModalSlice {
  isCreateStudentModalOpen: boolean;
  orderModalOptions: OrderModalOptions | null;
  isCartModalOpen: boolean;
  openCreateStudentModal: () => void;
  closeCreateStudentModal: () => void;
  openOrderModal: (options?: OrderModalOptions) => void;
  closeOrderModal: () => void;
  openCartModal: () => void;
  closeCartModal: () => void;
}

export interface CartSlice {
  cart: CartItem[];
  addToCart: (snack: Snack, quantity?: number) => void;
  removeFromCart: (snackId: number) => void;
  updateCartQuantity: (snackId: number, quantity: number) => void;
  clearCart: () => void;
}

export type StoreState = ToastSlice & OrderSlice & ModalSlice & CartSlice;
