import { getUserMessage } from '../../api/errors';

interface ErrorStateProps {
  message?: string;
  error?: unknown;
  onRetry?: () => void;
}

export default function ErrorState({
  message,
  error,
  onRetry,
}: ErrorStateProps) {
  // Derive display message: prefer explicit message, then extract from error, then fallback
  const displayMessage = message || (error ? getUserMessage(error) : 'Something went wrong. Please try again.');

  return (
    <div className="flex flex-col items-center justify-center py-20 px-6 animate-fade-in">
      <div className="w-16 h-16 rounded-2xl bg-red-500/10 border border-red-500/20 flex items-center justify-center mb-6">
        <svg className="w-8 h-8 text-red-400" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z" />
        </svg>
      </div>
      <p className="text-surface-400 text-lg text-center max-w-md mb-2 leading-relaxed">
        {displayMessage}
      </p>

      {/* Contextual suggestion */}
      <p className="text-surface-500 text-sm text-center max-w-sm mb-6">
        {displayMessage.includes('connect') || displayMessage.includes('offline')
          ? 'Make sure the JSON server is running with: npm run server'
          : 'If this keeps happening, try refreshing the page.'}
      </p>

      {onRetry && (
        <button
          onClick={onRetry}
          className="px-6 py-2.5 bg-surface-700 hover:bg-surface-600 text-surface-200 font-semibold rounded-xl transition-all duration-200 flex items-center gap-2 active:scale-95"
        >
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0l3.181 3.183a8.25 8.25 0 0013.803-3.7M4.031 9.865a8.25 8.25 0 0113.803-3.7l3.181 3.182" />
          </svg>
          Try again
        </button>
      )}
    </div>
  );
}
