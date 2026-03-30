/**
 * AdminRolesPage.jsx
 * -------------------
 * List and manage roles. Allows adding, editing, and deleting custom roles.
 */
import { useState } from 'react';
import { Plus, Edit2, Trash2, Shield, Lock } from 'lucide-react';
import { useRoles } from '../../context/RoleContext';
import RoleEditor from '../../components/admin/RoleEditor';
import ConfirmDialog from '../../components/admin/ConfirmDialog';
import Toast from '../../components/admin/Toast';

export default function AdminRolesPage() {
  const { roles, addRole, updateRole, deleteRole } = useRoles();
  const [editingRole, setEditingRole] = useState(null); // null=closed, {}=new, role=edit
  const [confirmDelete, setConfirmDelete] = useState(null);
  const [toast, setToast] = useState(null);

  const showToast = (message, type = 'success') => {
    setToast({ message, type });
  };

  const handleSave = (formData) => {
    if (editingRole?.id) {
      updateRole(editingRole.id, formData);
      showToast('تم تحديث الدور بنجاح');
    } else {
      addRole(formData);
      showToast('تم إضافة الدور الجديد');
    }
    setEditingRole(null);
  };

  const handleDelete = (role) => {
    deleteRole(role.id);
    setConfirmDelete(null);
    showToast('تم حذف الدور', 'error');
  };

  return (
    <div className="space-y-6" dir="rtl">
      {toast && <Toast toast={toast} onClose={() => setToast(null)} />}

      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-800 flex items-center gap-2">
            <Shield size={22} className="text-[#1e3a5f]" /> إدارة الأدوار
          </h1>
          <p className="text-gray-500 text-sm mt-1">أضف أو عدّل الأدوار وصلاحياتها</p>
        </div>
        <button
          onClick={() => setEditingRole({})}
          className="flex items-center gap-2 bg-[#1e3a5f] text-white px-4 py-2 rounded-xl text-sm font-medium hover:bg-[#152b47] transition"
        >
          <Plus size={16} /> دور جديد
        </button>
      </div>

      {/* Roles Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
        {roles.map(role => (
          <div key={role.id} className="bg-white rounded-2xl shadow-sm p-5 flex flex-col gap-3">
            <div className="flex items-start justify-between">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full" style={{ backgroundColor: role.color }} />
                <span className="font-bold text-gray-800">{role.nameAr}</span>
              </div>
              {role.isBuiltIn ? (
                <span className="text-xs text-gray-400 flex items-center gap-1">
                  <Lock size={11} /> مدمج
                </span>
              ) : (
                <div className="flex gap-1">
                  <button
                    onClick={() => setEditingRole(role)}
                    className="p-1.5 rounded-lg text-gray-400 hover:bg-gray-100 hover:text-[#1e3a5f] transition"
                  >
                    <Edit2 size={14} />
                  </button>
                  <button
                    onClick={() => setConfirmDelete(role)}
                    className="p-1.5 rounded-lg text-gray-400 hover:bg-red-50 hover:text-red-500 transition"
                  >
                    <Trash2 size={14} />
                  </button>
                </div>
              )}
            </div>

            <p className="text-xs text-gray-500 leading-relaxed">{role.description}</p>

            <div className="mt-auto">
              <span
                className="inline-block text-xs px-2 py-0.5 rounded-full text-white font-medium"
                style={{ backgroundColor: role.color }}
              >
                {role.name}
              </span>
            </div>

            <div className="border-t border-gray-100 pt-3">
              <p className="text-xs text-gray-400">{role.permissions.length} صلاحية</p>
            </div>
          </div>
        ))}
      </div>

      {/* Role Editor Modal */}
      {editingRole !== null && (
        <RoleEditor
          role={editingRole?.id ? editingRole : null}
          onSave={handleSave}
          onClose={() => setEditingRole(null)}
        />
      )}

      {/* Confirm Delete */}
      {confirmDelete && (
        <ConfirmDialog
          open={true}
          message={`هل أنت متأكد من حذف دور "${confirmDelete.nameAr}"؟`}
          onConfirm={() => handleDelete(confirmDelete)}
          onCancel={() => setConfirmDelete(null)}
        />
      )}
    </div>
  );
}
