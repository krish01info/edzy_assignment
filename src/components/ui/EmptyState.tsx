interface EmptyStateProps {
  message: string;
  ctaLabel?: string;
  onCta?: () => void;
  icon?: string;
}

export default function EmptyState({ message, ctaLabel, onCta, icon = '📭' }: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center py-20 px-6 animate-fade-in">
      <span className="text-6xl mb-6 block">{icon}</span>
      <p className="text-surface-400 text-lg text-center max-w-md leading-relaxed">
        {message}
      </p>
      {ctaLabel && onCta && (
        <button
          onClick={onCta}
          className="mt-6 px-6 py-2.5 bg-brand-500 hover:bg-brand-600 text-white font-semibold rounded-xl transition-all duration-200 hover:shadow-lg hover:shadow-brand-500/25 active:scale-95"
        >
          {ctaLabel}
        </button>
      )}
    </div>
  );
}
