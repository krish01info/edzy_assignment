import type { StateCreator } from 'zustand';
import type { StoreState, ModalSlice } from '../types';

export const createModalSlice: StateCreator<
  StoreState,
  [['zustand/devtools', never], ['zustand/persist', unknown]],
  [],
  ModalSlice
> = (set) => ({
  isCreateStudentModalOpen: false,
  orderModalOptions: null,
  isCartModalOpen: false,
  openCreateStudentModal: () => set({ isCreateStudentModalOpen: true }, false, 'modals/openCreateStudentModal'),
  closeCreateStudentModal: () => set({ isCreateStudentModalOpen: false }, false, 'modals/closeCreateStudentModal'),
  openOrderModal: (options) => set({ orderModalOptions: options || {} }, false, 'modals/openOrderModal'),
  closeOrderModal: () => set({ orderModalOptions: null }, false, 'modals/closeOrderModal'),
  openCartModal: () => set({ isCartModalOpen: true }, false, 'modals/openCartModal'),
  closeCartModal: () => set({ isCartModalOpen: false }, false, 'modals/closeCartModal'),
});
