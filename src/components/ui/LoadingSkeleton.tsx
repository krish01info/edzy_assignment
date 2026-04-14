interface LoadingSkeletonProps {
  rows?: number;
  variant?: 'card' | 'list';
}

function SkeletonCard() {
  return (
    <div className="bg-surface-800/50 border border-surface-700/50 rounded-2xl p-6 space-y-4 animate-pulse-soft">
      {/* Emoji placeholder */}
      <div className="w-14 h-14 rounded-xl bg-surface-700/60" />
      {/* Title */}
      <div className="h-5 bg-surface-700/60 rounded-lg w-3/4" />
      {/* Price */}
      <div className="h-4 bg-surface-700/40 rounded-lg w-1/2" />
      {/* Button */}
      <div className="h-10 bg-surface-700/30 rounded-xl w-full mt-4" />
    </div>
  );
}

function SkeletonListItem() {
  return (
    <div className="bg-surface-800/50 border border-surface-700/50 rounded-xl p-4 flex items-center gap-4 animate-pulse-soft">
      <div className="w-10 h-10 rounded-full bg-surface-700/60 flex-shrink-0" />
      <div className="flex-1 space-y-2">
        <div className="h-4 bg-surface-700/60 rounded w-1/3" />
        <div className="h-3 bg-surface-700/40 rounded w-1/2" />
      </div>
      <div className="h-8 w-24 bg-surface-700/30 rounded-lg" />
    </div>
  );
}

export default function LoadingSkeleton({ rows = 6, variant = 'card' }: LoadingSkeletonProps) {
  const items = Array.from({ length: rows }, (_, i) => i);

  if (variant === 'list') {
    return (
      <div className="space-y-3">
        {items.map((i) => (
          <SkeletonListItem key={i} />
        ))}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
      {items.map((i) => (
        <SkeletonCard key={i} />
      ))}
    </div>
  );
}
