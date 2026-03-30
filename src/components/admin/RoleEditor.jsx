/**
 * RoleEditor.jsx
 * ---------------
 * Modal for creating / editing a role and its permissions.
 */
import { useState } from 'react';
import { X, Shield, Check } from 'lucide-react';
import { PERMISSION_GROUPS, PERMISSION_LABELS } from '../../utils/permissions';

export default function RoleEditor({ role, onSave, onClose }) {
  const isNew = !role?.id;
  const [form, setForm] = useState({
    name: role?.name || '',
    nameAr: role?.nameAr || '',
    description: role?.description || '',
    color: role?.color || '#1e3a5f',
    permissions: role?.permissions ? [...role.permissions] : [],
  });

  const togglePermission = (perm) => {
    setForm(prev => ({
      ...prev,
      permissions: prev.permissions.includes(perm)
        ? prev.permissions.filter(p => p !== perm)
        : [...prev.permissions, perm],
    }));
  };

  const toggleGroup = (groupPerms) => {
    const allSelected = groupPerms.every(p => form.permissions.includes(p));
    setForm(prev => ({
      ...prev,
      permissions: allSelected
        ? prev.permissions.filter(p => !groupPerms.includes(p))
        : [...new Set([...prev.permissions, ...groupPerms])],
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.name.trim() || !form.nameAr.trim()) return;
    onSave(form);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4" dir="rtl">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-lg max-h-[90vh] flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b">
          <div className="flex items-center gap-2">
            <Shield size={20} className="text-[#1e3a5f]" />
            <h2 className="font-bold text-lg text-gray-800">
              {isNew ? 'إضافة دور جديد' : `تعديل: ${role.nameAr}`}
            </h2>
          </div>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600 transition">
            <X size={20} />
          </button>
        </div>

        {/* Body */}
        <form onSubmit={handleSubmit} className="flex-1 overflow-y-auto p-6 space-y-5">
          {/* Basic Info */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">الاسم بالعربية *</label>
              <input
                value={form.nameAr}
                onChange={e => setForm(p => ({ ...p, nameAr: e.target.value }))}
                className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#1e3a5f]/30"
                placeholder="مثال: مشرف المحتوى"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">الاسم بالإنجليزية *</label>
              <input
                value={form.name}
                onChange={e => setForm(p => ({ ...p, name: e.target.value }))}
                className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#1e3a5f]/30"
                placeholder="e.g. Content Moderator"
                required
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">الوصف</label>
            <input
              value={form.description}
              onChange={e => setForm(p => ({ ...p, description: e.target.value }))}
              className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#1e3a5f]/30"
              placeholder="وصف مختصر لدور هذا المستخدم"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">لون الدور</label>
            <div className="flex items-center gap-3">
              <input
                type="color"
                value={form.color}
                onChange={e => setForm(p => ({ ...p, color: e.target.value }))}
                className="w-10 h-10 rounded-lg border border-gray-200 cursor-pointer p-0.5"
              />
              <span className="text-sm text-gray-500">{form.color}</span>
            </div>
          </div>

          {/* Permissions */}
          <div>
            <h3 className="text-sm font-semibold text-gray-700 mb-3 flex items-center gap-2">
              <Shield size={14} /> الصلاحيات ({form.permissions.length} محددة)
            </h3>
            <div className="space-y-4">
              {PERMISSION_GROUPS.map(group => {
                const allSelected = group.permissions.every(p => form.permissions.includes(p));
                return (
                  <div key={group.label} className="bg-gray-50 rounded-xl p-4">
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-xs font-semibold text-gray-600 uppercase tracking-wide">{group.label}</span>
                      <button
                        type="button"
                        onClick={() => toggleGroup(group.permissions)}
                        className={`text-xs px-2 py-0.5 rounded-full transition ${allSelected ? 'bg-[#1e3a5f] text-white' : 'bg-gray-200 text-gray-600'}`}
                      >
                        {allSelected ? 'إلغاء الكل' : 'تحديد الكل'}
                      </button>
                    </div>
                    <div className="grid grid-cols-1 gap-2">
                      {group.permissions.map(perm => (
                        <label key={perm} className="flex items-center gap-2 cursor-pointer">
                          <button
                            type="button"
                            onClick={() => togglePermission(perm)}
                            className={`w-5 h-5 rounded flex items-center justify-center border transition shrink-0 ${
                              form.permissions.includes(perm)
                                ? 'bg-[#1e3a5f] border-[#1e3a5f]'
                                : 'border-gray-300 bg-white'
                            }`}
                          >
                            {form.permissions.includes(perm) && <Check size={11} className="text-white" />}
                          </button>
                          <span className="text-sm text-gray-700">{PERMISSION_LABELS[perm]}</span>
                        </label>
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </form>

        {/* Footer */}
        <div className="border-t px-6 py-4 flex gap-3 justify-end">
          <button type="button" onClick={onClose}
            className="px-4 py-2 text-sm rounded-lg border border-gray-200 text-gray-600 hover:bg-gray-50 transition">
            إلغاء
          </button>
          <button
            onClick={handleSubmit}
            className="px-5 py-2 text-sm rounded-lg bg-[#1e3a5f] text-white hover:bg-[#152b47] transition font-medium">
            {isNew ? 'إضافة الدور' : 'حفظ التعديلات'}
          </button>
        </div>
      </div>
    </div>
  );
}
