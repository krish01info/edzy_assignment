import { useStore } from '../store/useStore';
import { useSnacks } from '../hooks/useSnacks';
import SnackCard from '../components/snacks/SnackCard';
import LoadingSkeleton from '../components/ui/LoadingSkeleton';
import ErrorState from '../components/ui/ErrorState';
import EmptyState from '../components/ui/EmptyState';
import type { Snack } from '../types';

export default function SnacksPage() {
  const { data: snacks, isLoading, isError, error, refetch } = useSnacks();

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Page header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-white mb-2">
          Snack Menu <span className="text-2xl">🍿</span>
        </h1>
        <p className="text-surface-400">
          Browse our delicious selection and place your order
        </p>
      </div>

      {/* Content */}
      {isLoading ? (
        <LoadingSkeleton rows={8} variant="card" />
      ) : isError ? (
        <ErrorState
          message="Failed to load snacks. The canteen server might be down."
          error={error}
          onRetry={() => refetch()}
        />
      ) : !snacks || snacks.length === 0 ? (
        <EmptyState
          message="No snacks available right now. Check back later!"
          icon="🍽️"
        />
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
          {snacks.map((snack, index) => (
            <div
              key={snack.id}
              style={{ animationDelay: `${index * 50}ms` }}
              className="animate-slide-up opacity-0 [animation-fill-mode:forwards]"
            >
              <SnackCard snack={snack} />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
