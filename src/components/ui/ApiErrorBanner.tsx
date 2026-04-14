interface ApiErrorBannerProps {
  message: string;
}

/**
 * Reusable inline API error banner for forms.
 * Shows a red error box with icon + message at the top of a form.
 */
export default function ApiErrorBanner({ message }: ApiErrorBannerProps) {
  if (!message) return null;

  return (
    <div className="bg-red-500/10 border border-red-500/20 rounded-xl p-3 text-sm text-red-400 flex items-center gap-2">
      <svg className="w-4 h-4 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
        <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
      </svg>
      {message}
    </div>
  );
}
