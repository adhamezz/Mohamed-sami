/**
 * ConfirmDialog.jsx
 * ------------------
 * Modal confirmation dialog for destructive actions.
 * Usage:
 *   <ConfirmDialog
 *     open={showConfirm}
 *     message="هل تريد حذف هذا المقال؟"
 *     onConfirm={handleDelete}
 *     onCancel={() => setShowConfirm(false)}
 *   />
 */
export default function ConfirmDialog({ open, message, onConfirm, onCancel }) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50" role="dialog" aria-modal="true">
      <div className="bg-white rounded-2xl shadow-xl p-6 w-full max-w-sm mx-4 text-center">
        <div className="w-14 h-14 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <span className="text-red-600 text-2xl">⚠</span>
        </div>
        <p className="text-gray-700 font-medium mb-6">{message}</p>
        <div className="flex gap-3 justify-center">
          <button
            onClick={onConfirm}
            className="px-5 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition font-medium"
          >
            تأكيد الحذف
          </button>
          <button
            onClick={onCancel}
            className="px-5 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition font-medium"
          >
            إلغاء
          </button>
        </div>
      </div>
    </div>
  );
}
