import { useForm } from 'react-hook-form';
import { useState, useMemo, useEffect } from 'react';
import { useCreateStudent } from '../../hooks/useCreateStudent';
import { getUserMessage } from '../../api/errors';
import Modal from '../ui/Modal';
import FieldError from '../ui/FieldError';
import SubmitButton from '../ui/SubmitButton';
import ApiErrorBanner from '../ui/ApiErrorBanner';

interface CreateStudentFormValues {
  name: string;
}

interface CreateStudentFormProps {
  onSuccess: () => void;
  onClose: () => void;
}

// Generate a random referral code
const generateReferralCode = (): string => {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  let code = '';
  for (let i = 0; i < 6; i++) {
    code += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return `STU-${code}`;
};

export default function CreateStudentForm({ onSuccess, onClose }: CreateStudentFormProps) {
  const referralCode = useMemo(() => generateReferralCode(), []);
  const [apiError, setApiError] = useState('');

  const {
    register,
    handleSubmit,
    formState: { errors },
    setFocus,
  } = useForm<CreateStudentFormValues>({
    defaultValues: { name: '' },
  });

  useEffect(() => {
    setFocus('name');
  }, [setFocus]);

  const mutation = useCreateStudent({
    onSuccess: () => {
      onSuccess();
      onClose();
    },
    onError: (error) => {
      setApiError(getUserMessage(error));
    },
  });

  const onFormSubmit = (data: CreateStudentFormValues) => {
    setApiError('');
    mutation.mutate({ name: data.name, referralCode });
  };

  return (
    <Modal title="Create New Student" onClose={onClose}>
      <form onSubmit={handleSubmit(onFormSubmit)} className="space-y-5">
        {/* API error */}
        <ApiErrorBanner message={apiError} />

        {/* Name input */}
        <div>
          <label className="block text-sm font-medium text-surface-300 mb-1.5">
            Student Name <span className="text-red-400">*</span>
          </label>
          <input
            type="text"
            {...register('name', {
              required: 'Student name is required',
              minLength: { value: 2, message: 'Name must be at least 2 characters' },
              maxLength: { value: 60, message: 'Name must be at most 60 characters' },
            })}
            placeholder="Enter student name..."
            className="w-full bg-surface-800 border border-surface-700 rounded-xl px-4 py-2.5 text-surface-200 text-sm placeholder:text-surface-600 focus:outline-none focus:ring-2 focus:ring-brand-500/50 focus:border-brand-500 transition-all"
            disabled={mutation.isPending}
          />
          <FieldError message={errors.name?.message} />
        </div>

        {/* Referral code preview */}
        <div>
          <label className="block text-sm font-medium text-surface-300 mb-1.5">
            Referral Code <span className="text-surface-500">(auto-generated)</span>
          </label>
          <div className="w-full bg-surface-800/50 border border-surface-700/50 rounded-xl px-4 py-2.5 flex items-center gap-2">
            <code className="text-sm font-mono text-brand-400 font-semibold">{referralCode}</code>
            <span className="text-xs text-surface-500 bg-surface-700/50 px-2 py-0.5 rounded">read-only</span>
          </div>
        </div>

        {/* Submit */}
        <SubmitButton isLoading={mutation.isPending} loadingText="Creating...">
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
          </svg>
          Create Student
        </SubmitButton>
      </form>
    </Modal>
  );
}
