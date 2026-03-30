/**
 * Toast.jsx
 * ----------
 * Simple toast notification component.
 * Usage:
 *   const [toast, setToast] = useState(null);
 *   setToast({ type: 'success', message: 'تم الحفظ بنجاح' });
 *   <Toast toast={toast} onClose={() => setToast(null)} />
 */
import { useEffect } from 'react';
import { CheckCircle, XCircle, X } from 'lucide-react';

export default function Toast({ toast, onClose }) {
  // Auto-dismiss after 4 seconds
  useEffect(() => {
    if (!toast) return;
    const t = setTimeout(onClose, 4000);
    return () => clearTimeout(t);
  }, [toast, onClose]);

  if (!toast) return null;

  const isSuccess = toast.type === 'success';

  return (
    <div
      className={`fixed top-6 left-1/2 -translate-x-1/2 z-50 flex items-center gap-3 px-5 py-3 rounded-xl shadow-lg text-white text-sm font-medium transition-all animate-fade-in ${
        isSuccess ? 'bg-green-600' : 'bg-red-600'
      }`}
      role="alert"
    >
      {isSuccess ? <CheckCircle size={18} /> : <XCircle size={18} />}
      <span>{toast.message}</span>
      <button onClick={onClose} className="ml-2 hover:opacity-75">
        <X size={16} />
      </button>
    </div>
  );
}
