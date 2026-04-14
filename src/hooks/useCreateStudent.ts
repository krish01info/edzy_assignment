import { createStudent } from '../api/client';
import { useMutationWithToast } from './useMutationWithToast';
import type { CreateStudentPayload } from '../types';

export const useCreateStudent = (callbacks?: {
  onSuccess?: () => void;
  onError?: (error: unknown) => void;
}) => {
  return useMutationWithToast({
    mutationFn: (payload: CreateStudentPayload) => createStudent(payload),
    successMessage: 'Student created successfully! 🎓',
    errorPrefix: 'Failed to create student',
    invalidateKeys: [['students']],
    onSuccess: callbacks?.onSuccess,
    onError: callbacks?.onError,
  });
};
