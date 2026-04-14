import type { Snack } from '../../types';
import { getSnackEmoji } from '../../types';

interface SnackCardProps {
  snack: Snack;
  onOrder: (snackId: number) => void;
}

export default function SnackCard({ snack, onOrder }: SnackCardProps) {
  const emoji = getSnackEmoji(snack.name);

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
          onClick={() => onOrder(snack.id)}
          className="w-full py-2.5 px-4 bg-gradient-to-r from-brand-500 to-brand-600 hover:from-brand-400 hover:to-brand-500 text-white font-semibold rounded-xl transition-all duration-200 hover:shadow-lg hover:shadow-brand-500/25 active:scale-[0.98] flex items-center justify-center gap-2"
        >
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 00-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 00-16.536-1.84M7.5 14.25L5.106 5.272M6 20.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm12.75 0a.75.75 0 11-1.5 0 .75.75 0 011.5 0z" />
          </svg>
          Order Now
        </button>
      </div>
    </div>
  );
}
