import { useState } from 'react';
import { useQueryClient } from '@tanstack/react-query';
import { createOrder } from '../api/client';
import { useStore } from '../store/useStore';
import { getUserMessage } from '../api/errors';
import type { CartItem } from '../types';

export const useCheckoutCart = () => {
  const [isCheckingOut, setIsCheckingOut] = useState(false);
  const queryClient = useQueryClient();
  const { removeFromCart, closeCartModal, addToast, addRecentOrder } = useStore();

  const checkout = async (studentId: number, cart: CartItem[]) => {
    setIsCheckingOut(true);
    let successCount = 0;
    
    try {
      // Execute sequentially to avoid json-server read-modify-write race conditions
      // on the same student totalSpent or snack ordersCount.
      for (const item of cart) {
        const order = await createOrder({
          studentId,
          snackId: item.snack.id,
          quantity: item.quantity,
        });
        
        addRecentOrder(order);
        // Remove item immediately on success, so a subsequent fail won't replay it
        removeFromCart(item.snack.id);
        successCount++;
      }

      // If we got here, everything succeeded
      addToast('Your cart order has been placed! 🎉', 'success');
      closeCartModal();

    } catch (error) {
      console.error('Checkout failed:', error);
      const message = getUserMessage(error);
      
      if (successCount > 0) {
        addToast(`Partial checkout: ${successCount} item(s) ordered, but an error occurred: ${message}`, 'error');
        // Do not close the modal, allowing the user to view/retry remaining failed items
      } else {
        addToast(`Checkout failed: ${message}`, 'error');
      }
    } finally {
      // Refresh global data if at least one thing succeeded
      if (successCount > 0) {
        queryClient.invalidateQueries({ queryKey: ['snacks'] });
        queryClient.invalidateQueries({ queryKey: ['students'] });
        queryClient.invalidateQueries({ queryKey: ['student', Number(studentId)] });
      }
      setIsCheckingOut(false);
    }
  };

  return { checkout, isCheckingOut };
};
