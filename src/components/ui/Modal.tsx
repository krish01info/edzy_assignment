import { useEffect, type ReactNode } from 'react';

interface ModalProps {
  title: string;
  onClose: () => void;
  children: ReactNode;
  /** Whether the modal header should stick when scrolling. Default: false */
  stickyHeader?: boolean;
}

/**
 * Reusable modal shell with overlay, escape-key handling,
 * body scroll lock, and a consistent header layout.
 */
export default function Modal({
  title,
  onClose,
  children,
  stickyHeader = false,
}: ModalProps) {
  // Lock body scroll when modal is open
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = '';
    };
  }, []);

  // Close on escape key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleEscape);
    return () => window.removeEventListener('keydown', handleEscape);
  }, [onClose]);

  return (
    <div className="fixed inset-0 z-[90] flex items-end md:items-center justify-center">
      {/* Overlay */}
      <div
        className="absolute inset-0 bg-black/60 backdrop-blur-sm animate-modal-overlay"
        onClick={onClose}
      />

      {/* Modal panel */}
      <div className="relative w-full md:max-w-md md:mx-4 bg-surface-900 md:rounded-2xl rounded-t-2xl border border-surface-700/50 shadow-2xl shadow-black/40 animate-modal-content max-h-[90vh] md:max-h-[85vh] overflow-y-auto">
        {/* Header */}
        <div
          className={`border-b border-surface-700/50 px-6 py-4 flex items-center justify-between rounded-t-2xl ${
            stickyHeader
              ? 'sticky top-0 bg-surface-900/95 backdrop-blur-sm z-10'
              : ''
          }`}
        >
          <h2 className="text-lg font-bold text-surface-100">{title}</h2>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-surface-400 hover:text-surface-200 hover:bg-surface-800 transition-colors"
            aria-label="Close modal"
          >
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Body */}
        <div className="p-6">{children}</div>
      </div>
    </div>
  );
}
