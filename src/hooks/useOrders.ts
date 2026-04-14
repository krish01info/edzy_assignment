import { createOrder } from '../api/client';
import { useStore } from '../store/useStore';
import { useMutationWithToast } from './useMutationWithToast';
import type { CreateOrderPayload } from '../types';

export const useCreateOrder = () => {
  const addRecentOrder = useStore((s) => s.addRecentOrder);

  return useMutationWithToast({
    mutationFn: (payload: CreateOrderPayload) => createOrder(payload),
    successMessage: 'Order placed successfully! 🎉',
    errorPrefix: 'Order failed',
    invalidateKeys: [['snacks'], ['students']],
    invalidateKeysFromData: (order) => [['student', order.studentId]],
    onSuccess: (order) => {
      addRecentOrder(order);
    },
  });
};
