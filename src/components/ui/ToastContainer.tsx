import { useStore } from '../../store/useStore';
import Toast from './Toast';

export default function ToastContainer() {
  const toasts = useStore((s) => s.toasts);
  const setToastDismissing = useStore((s) => s.setToastDismissing);
  const removeToast = useStore((s) => s.removeToast);

  const handleDismiss = (id: string) => {
    setToastDismissing(id);
    setTimeout(() => removeToast(id), 300);
  };

  if (toasts.length === 0) return null;

  return (
    <div className="fixed bottom-6 right-6 z-[100] flex flex-col gap-3 pointer-events-none">
      {toasts.map((toast) => (
        <div key={toast.id} className="pointer-events-auto">
          <Toast toast={toast} onDismiss={handleDismiss} />
        </div>
      ))}
    </div>
  );
}
