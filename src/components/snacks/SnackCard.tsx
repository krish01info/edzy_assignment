import { useStore } from '../../store/useStore';
import type { Snack } from '../../types';
import { getSnackEmoji } from '../../types';

interface SnackCardProps {
  snack: Snack;
}

export default function SnackCard({ snack }: SnackCardProps) {
  const emoji = getSnackEmoji(snack.name);
  const { addToCart, addToast } = useStore();

  const handleAddToCart = () => {
    addToCart(snack);
    addToast(`${snack.name} added to cart!`, 'success');
  };

  return (
    <div className="group relative bg-surface-800/40 border border-surface-700/40 rounded-2xl p-6 transition-all duration-300 hover:bg-surface-800/70 hover:border-surface-600/50 hover:shadow-xl hover:shadow-black/20 hover:-translate-y-1 animate-fade-in">
      {/* Glow effect on hover */}
      <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-brand-500/5 to-amber-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />

      <div className="relative">
        {/* Emoji icon */}
        <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-brand-500/20 to-amber-500/20 border border-brand-500/10 flex items-center justify-center text-3xl mb-4 group-hover:scale-110 transition-transform duration-300">
          {emoji}
        </div>

        {/* Name */}
        <h3 className="text-lg font-bold text-surface-100 mb-1.5 group-hover:text-white transition-colors">
          {snack.name}
        </h3>

        {/* Price & Orders */}
        <div className="flex items-center justify-between mb-5">
          <span className="text-2xl font-bold bg-gradient-to-r from-brand-400 to-amber-400 bg-clip-text text-transparent">
            ${snack.price.toFixed(2)}
          </span>
          <span className="text-xs text-surface-500 bg-surface-800 px-2.5 py-1 rounded-full border border-surface-700/50">
            {snack.ordersCount} orders
          </span>
        </div>

        {/* Order button */}
        <button
          onClick={handleAddToCart}
          className="w-full py-2.5 px-4 bg-gradient-to-r from-brand-500 to-brand-600 hover:from-brand-400 hover:to-brand-500 text-white font-semibold rounded-xl transition-all duration-200 hover:shadow-lg hover:shadow-brand-500/25 active:scale-[0.98] flex items-center justify-center gap-2"
        >
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 10.5V6a3.75 3.75 0 10-7.5 0v4.5m11.356-1.993l1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 01-1.12-1.243l1.264-12A1.125 1.125 0 015.513 7.5h12.974c.576 0 1.059.435 1.119 1.007zM8.625 10.5a.375.375 0 11-.75 0 .375.375 0 01.75 0zm7.5 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z" />
          </svg>
          Add to Cart
        </button>
      </div>
    </div>
  );
}
