import { useEffect, useRef } from 'react';
import type { Toast as ToastType } from '../../types';

interface ToastProps {
  toast: ToastType;
  onDismiss: (id: string) => void;
}

const typeStyles: Record<ToastType['type'], { bg: string; icon: string; border: string }> = {
  success: {
    bg: 'bg-emerald-500/10 backdrop-blur-xl',
    icon: '✓',
    border: 'border-emerald-500/30',
  },
  error: {
    bg: 'bg-red-500/10 backdrop-blur-xl',
    icon: '✕',
    border: 'border-red-500/30',
  },
  info: {
    bg: 'bg-blue-500/10 backdrop-blur-xl',
    icon: 'ℹ',
    border: 'border-blue-500/30',
  },
};

const iconColors: Record<ToastType['type'], string> = {
  success: 'bg-emerald-500 text-white',
  error: 'bg-red-500 text-white',
  info: 'bg-blue-500 text-white',
};

export default function Toast({ toast, onDismiss }: ToastProps) {
  const progressRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (progressRef.current) {
      progressRef.current.style.transition = 'width 4s linear';
      progressRef.current.style.width = '0%';
    }
  }, []);

  const style = typeStyles[toast.type];
  const iconColor = iconColors[toast.type];

  return (
    <div
      className={`
        ${style.bg} ${style.border} border
        ${toast.dismissing ? 'animate-toast-out' : 'animate-toast-in'}
        rounded-xl shadow-2xl shadow-black/20 p-4 min-w-[320px] max-w-[420px]
        relative overflow-hidden
      `}
      role="alert"
    >
      <div className="flex items-start gap-3">
        <span
          className={`${iconColor} w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0 mt-0.5`}
        >
          {style.icon}
        </span>
        <p className="text-sm text-surface-100 font-medium flex-1 leading-relaxed">
          {toast.message}
        </p>
        <button
          onClick={() => onDismiss(toast.id)}
          className="text-surface-400 hover:text-surface-200 transition-colors flex-shrink-0 ml-2"
          aria-label="Dismiss"
        >
          <svg className="w-4 h-4" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
          </svg>
        </button>
      </div>
      {/* Progress bar */}
      <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-white/5">
        <div
          ref={progressRef}
          className={`h-full w-full ${
            toast.type === 'success' ? 'bg-emerald-400' :
            toast.type === 'error' ? 'bg-red-400' : 'bg-blue-400'
          }`}
        />
      </div>
    </div>
  );
}
