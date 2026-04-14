import { useForm } from 'react-hook-form';
import type { Student, Snack } from '../../types';
import { getSnackEmoji } from '../../types';
import FieldError from '../ui/FieldError';
import SubmitButton from '../ui/SubmitButton';

interface OrderFormValues {
  studentId: string;
  snackId: string;
  quantity: string;
}

interface OrderFormProps {
  students: Student[];
  snacks: Snack[];
  preSelectedSnack?: Snack | null;
  defaultStudentId?: number;
  onSubmit: (studentId: number, snackId: number, quantity: number) => void;
  isLoading: boolean;
}

export default function OrderForm({
  students,
  snacks,
  preSelectedSnack,
  defaultStudentId,
  onSubmit,
  isLoading,
}: OrderFormProps) {
  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm<OrderFormValues>({
    defaultValues: {
      studentId: defaultStudentId?.toString() || '',
      snackId: preSelectedSnack?.id.toString() || '',
      quantity: '1',
    },
  });

  const watchQuantity = watch('quantity');
  const watchSnackId = watch('snackId');
  const quantity = parseInt(watchQuantity) || 0;
  const selectedSnack = preSelectedSnack || snacks.find((s) => s.id === parseInt(watchSnackId));
  const total = (selectedSnack?.price || 0) * quantity;

  const onFormSubmit = (data: OrderFormValues) => {
    onSubmit(parseInt(data.studentId), parseInt(data.snackId), parseInt(data.quantity));
  };

  return (
    <form onSubmit={handleSubmit(onFormSubmit)} className="space-y-5">
      {/* Snack info or selector */}
      {preSelectedSnack ? (
        <div className="bg-surface-800/50 border border-surface-700/40 rounded-xl p-4 flex items-center gap-4">
          <div className="text-3xl">
            {getSnackEmoji(preSelectedSnack.name)}
          </div>
          <div>
            <h4 className="text-surface-100 font-semibold">{preSelectedSnack.name}</h4>
            <p className="text-brand-400 font-bold">${preSelectedSnack.price.toFixed(2)} each</p>
          </div>
        </div>
      ) : (
        <div>
          <label className="block text-sm font-medium text-surface-300 mb-2">
            Select Snack <span className="text-red-400">*</span>
          </label>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 max-h-[40vh] overflow-y-auto pr-1">
            {snacks.map((s) => {
              const isSelected = parseInt(watchSnackId) === s.id;
              return (
                <button
                  key={s.id}
                  type="button"
                  onClick={() => setValue('snackId', s.id.toString(), { shouldValidate: true })}
                  className={`p-3 rounded-xl border flex items-center gap-3 transition-all text-left group ${
                    isSelected
                      ? 'bg-brand-500/10 border-brand-500 shadow-[0_0_15px_-3px_rgba(56,189,248,0.15)] ring-1 ring-brand-500/50'
                      : 'bg-surface-800/40 border-surface-700/50 hover:bg-surface-800 hover:border-surface-600'
                  }`}
                  disabled={isLoading}
                >
                  <div className={`text-2xl transition-transform ${isSelected ? 'scale-110' : 'group-hover:scale-110'}`}>
                    {getSnackEmoji(s.name)}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className={`text-sm font-semibold truncate transition-colors ${isSelected ? 'text-white' : 'text-surface-200 group-hover:text-white'}`}>
                      {s.name}
                    </p>
                    <p className="text-xs text-brand-400 font-bold mt-0.5">${s.price.toFixed(2)}</p>
                  </div>
                </button>
              );
            })}
          </div>
          {/* Hidden input to hook into react-hook-form's validation mechanics */}
          <input type="hidden" {...register('snackId', { required: 'Please select a snack' })} />
          <FieldError message={errors.snackId?.message} />
        </div>
      )}

      {/* Student selector */}
      <div>
        <label className="block text-sm font-medium text-surface-300 mb-1.5">
          Student <span className="text-red-400">*</span>
        </label>
        <select
          {...register('studentId', {
            required: 'Please select a student',
          })}
          className="w-full bg-surface-800 border border-surface-700 rounded-xl px-4 py-2.5 text-surface-200 text-sm focus:outline-none focus:ring-2 focus:ring-brand-500/50 focus:border-brand-500 transition-all appearance-none cursor-pointer"
          disabled={isLoading}
        >
          <option value="">Select a student...</option>
          {students.map((s) => (
            <option key={s.id} value={s.id}>
              {s.name} ({s.referralCode})
            </option>
          ))}
        </select>
        <FieldError message={errors.studentId?.message} />
      </div>

      {/* Quantity */}
      <div>
        <label className="block text-sm font-medium text-surface-300 mb-1.5">
          Quantity <span className="text-red-400">*</span>
        </label>
        <input
          type="number"
          {...register('quantity', {
            required: 'Quantity is required',
            min: { value: 1, message: 'Minimum quantity is 1' },
            max: { value: 5, message: 'Maximum quantity is 5' },
            validate: (v) => Number.isInteger(Number(v)) || 'Must be a whole number',
          })}
          className="w-full bg-surface-800 border border-surface-700 rounded-xl px-4 py-2.5 text-surface-200 text-sm focus:outline-none focus:ring-2 focus:ring-brand-500/50 focus:border-brand-500 transition-all"
          min={1}
          max={5}
          step={1}
          disabled={isLoading}
        />
        <FieldError message={errors.quantity?.message} />
      </div>

      {/* Total preview */}
      {quantity > 0 && (
        <div className="bg-brand-500/5 border border-brand-500/20 rounded-xl p-4 flex items-center justify-between">
          <span className="text-sm text-surface-300">Total payable</span>
          <span className="text-xl font-bold text-brand-400">${total.toFixed(2)}</span>
        </div>
      )}

      {/* Submit */}
      <SubmitButton isLoading={isLoading} loadingText="Placing Order...">
        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
        </svg>
        Confirm Order
      </SubmitButton>
    </form>
  );
}
