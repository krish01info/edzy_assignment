import { useMutation, useQueryClient, type InvalidateQueryFilters } from '@tanstack/react-query';
import { getUserMessage } from '../api/errors';
import { useStore } from '../store/useStore';

interface UseMutationWithToastOptions<TData, TVariables> {
  /** The mutation function to call */
  mutationFn: (variables: TVariables) => Promise<TData>;
  /** Toast message on success */
  successMessage: string;
  /** Prefix for the error toast (the specific error message is appended) */
  errorPrefix: string;
  /** Query keys to invalidate on success */
  invalidateKeys?: InvalidateQueryFilters['queryKey'][];
  /** Extra query keys derived from the mutation result */
  invalidateKeysFromData?: (data: TData) => InvalidateQueryFilters['queryKey'][];
  /** Callback after a successful mutation */
  onSuccess?: (data: TData) => void;
  /** Callback after a failed mutation (in addition to the toast) */
  onError?: (error: unknown) => void;
  /** Whether to show a toast on error (defaults to true) */
  showErrorToast?: boolean;
}

/**
 * Reusable mutation hook that handles:
 * - Toast notifications (success + error with specific messages)
 * - Query cache invalidation
 * - Single hook for all mutation-with-feedback patterns
 */
export function useMutationWithToast<TData, TVariables>({
  mutationFn,
  successMessage,
  errorPrefix,
  invalidateKeys,
  invalidateKeysFromData,
  onSuccess,
  onError,
  showErrorToast = true,
}: UseMutationWithToastOptions<TData, TVariables>) {
  const queryClient = useQueryClient();
  const addToast = useStore((s) => s.addToast);

  return useMutation({
    mutationFn,
    onSuccess: (data) => {
      addToast(successMessage, 'success');

      // Invalidate static keys
      if (invalidateKeys) {
        for (const key of invalidateKeys) {
          queryClient.invalidateQueries({ queryKey: key });
        }
      }

      // Invalidate dynamic keys derived from response data
      if (invalidateKeysFromData) {
        for (const key of invalidateKeysFromData(data)) {
          queryClient.invalidateQueries({ queryKey: key });
        }
      }

      onSuccess?.(data);
    },
    onError: (error: unknown) => {
      if (showErrorToast) {
        const message = getUserMessage(error);
        addToast(`${errorPrefix}: ${message}`, 'error');
      }
      onError?.(error);
    },
  });
}
