import type { ReactNode } from 'react';

interface SubmitButtonProps {
  isLoading: boolean;
  loadingText: string;
  children: ReactNode;
  /** Button type. Default: 'submit' */
  type?: 'submit' | 'button';
  /** Full-width button. Default: true */
  fullWidth?: boolean;
}

/**
 * Reusable form submit button with built-in loading spinner.
 * Consistent gradient styling and disabled state.
 */
export default function SubmitButton({
  isLoading,
  loadingText,
  children,
  type = 'submit',
  fullWidth = true,
}: SubmitButtonProps) {
  return (
    <button
      type={type}
      disabled={isLoading}
      className={`${
        fullWidth ? 'w-full' : ''
      } py-3 px-4 bg-gradient-to-r from-brand-500 to-brand-600 hover:from-brand-400 hover:to-brand-500 disabled:from-surface-600 disabled:to-surface-700 disabled:cursor-not-allowed text-white font-semibold rounded-xl transition-all duration-200 hover:shadow-lg hover:shadow-brand-500/25 active:scale-[0.98] flex items-center justify-center gap-2`}
    >
      {isLoading ? (
        <>
          <svg className="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
          </svg>
          {loadingText}
        </>
      ) : (
        children
      )}
    </button>
  );
}
