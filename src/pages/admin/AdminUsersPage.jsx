/**
 * AdminUsersPage.jsx
 * -------------------
 * View, edit, and delete users.
 * Features: search, sort, pagination, confirmation, toast.
 *
 * TODO: Replace usersService calls with real API endpoints:
 *   GET    /api/users
 *   PUT    /api/users/:id
 *   DELETE /api/users/:id
 */
import { useState, useEffect, useMemo } from 'react';
import { Search, Edit2, Trash2, ChevronUp, ChevronDown, X } from 'lucide-react';
import { usersService } from '../../services/adminService';
import Toast from '../../components/admin/Toast';
import ConfirmDialog from '../../components/admin/ConfirmDialog';

const ROLES = ['user', 'moderator', 'admin'];
const PAGE_SIZE = 5;

// ── Edit User Modal ───────────────────────────────────────────────
function UserModal({ user, onSave, onClose }) {
  const [form, setForm] = useState({ ...user });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(form);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4" dir="rtl">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md">
        <div className="flex items-center justify-between px-6 py-4 border-b">
          <h2 className="font-bold text-lg text-gray-800">تعديل المستخدم</h2>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600"><X size={20} /></button>
        </div>
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <div>
            <label className="label">الاسم</label>
            <input name="name" value={form.name} onChange={handleChange} className="input" required />
          </div>
          <div>
            <label className="label">البريد الإلكتروني</label>
            <input type="email" name="email" value={form.email} onChange={handleChange} className="input" required />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="label">الدور</label>
              <select name="role" value={form.role} onChange={handleChange} className="input">
                {ROLES.map(r => <option key={r}>{r}</option>)}
              </select>
            </div>
            <div>
              <label className="label">الحالة</label>
              <select name="status" value={form.status} onChange={handleChange} className="input">
                <option value="active">نشط</option>
                <option value="inactive">غير نشط</option>
              </select>
            </div>
          </div>
          <div className="flex gap-3 pt-2">
            <button type="submit" className="btn-primary flex-1">حفظ</button>
            <button type="button" onClick={onClose} className="btn-secondary flex-1">إلغاء</button>
          </div>
        </form>
      </div>
    </div>
  );
}

// ── Sort Icon ─────────────────────────────────────────────────────
function SortIcon({ field, sortField, sortDir }) {
  if (sortField !== field) return <ChevronUp size={14} className="opacity-20" />;
  return sortDir === 'asc' ? <ChevronUp size={14} /> : <ChevronDown size={14} />;
}

// ── Main Page ─────────────────────────────────────────────────────
export default function AdminUsersPage() {
  const [users, setUsers] = useState([]);
  const [search, setSearch] = useState('');
  const [sortField, setSortField] = useState('name');
  const [sortDir, setSortDir] = useState('asc');
  const [page, setPage] = useState(1);
  const [editUser, setEditUser] = useState(null);
  const [deleteId, setDeleteId] = useState(null);
  const [toast, setToast] = useState(null);

  useEffect(() => {
    // TODO: Replace with: const data = await fetch('/api/users').then(r => r.json());
    setUsers(usersService.getAll());
  }, []);

  const filtered = useMemo(() => {
    let list = users.filter(u =>
      u.name.toLowerCase().includes(search.toLowerCase()) ||
      u.email.toLowerCase().includes(search.toLowerCase()) ||
      u.role.toLowerCase().includes(search.toLowerCase())
    );
    list = [...list].sort((a, b) => {
      const va = a[sortField] ?? '';
      const vb = b[sortField] ?? '';
      return sortDir === 'asc' ? va.localeCompare(vb) : vb.localeCompare(va);
    });
    return list;
  }, [users, search, sortField, sortDir]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const paginated = filtered.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  const handleSort = (field) => {
    if (sortField === field) setSortDir(d => d === 'asc' ? 'desc' : 'asc');
    else { setSortField(field); setSortDir('asc'); }
  };

  const handleSave = (form) => {
    try {
      // TODO: PUT /api/users/:id
      const updated = usersService.update(form.id, form);
      setUsers(prev => prev.map(u => u.id === updated.id ? updated : u));
      setToast({ type: 'success', message: 'تم تحديث بيانات المستخدم' });
      setEditUser(null);
    } catch (err) {
      setToast({ type: 'error', message: err.message });
    }
  };

  const handleDelete = () => {
    try {
      // TODO: DELETE /api/users/:id
      usersService.delete(deleteId);
      setUsers(prev => prev.filter(u => u.id !== deleteId));
      setToast({ type: 'success', message: 'تم حذف المستخدم' });
    } catch (err) {
      setToast({ type: 'error', message: err.message });
    } finally {
      setDeleteId(null);
    }
  };

  const roleLabel = (r) => ({ user: 'مستخدم', moderator: 'مشرف', admin: 'أدمن' })[r] || r;

  return (
    <div className="space-y-5" dir="rtl">
      <Toast toast={toast} onClose={() => setToast(null)} />
      <ConfirmDialog
        open={!!deleteId}
        message="هل تريد حذف هذا المستخدم نهائياً؟"
        onConfirm={handleDelete}
        onCancel={() => setDeleteId(null)}
      />
      {editUser && (
        <UserModal user={editUser} onSave={handleSave} onClose={() => setEditUser(null)} />
      )}

      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-gray-800">إدارة المستخدمين</h1>
        <p className="text-sm text-gray-500">{users.length} مستخدم إجمالاً</p>
      </div>

      {/* Search */}
      <div className="bg-white rounded-2xl shadow-sm p-4">
        <div className="relative max-w-sm">
          <Search size={16} className="absolute top-1/2 right-3 -translate-y-1/2 text-gray-400" />
          <input
            value={search}
            onChange={e => { setSearch(e.target.value); setPage(1); }}
            placeholder="البحث بالاسم أو البريد أو الدور..."
            className="w-full pr-9 pl-4 py-2 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#1e3a5f]/20"
          />
        </div>
      </div>

      {/* Table */}
      <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-gray-50 text-gray-600">
              <tr>
                {[
                  { field: 'name', label: 'الاسم' },
                  { field: 'email', label: 'البريد الإلكتروني' },
                  { field: 'role', label: 'الدور' },
                  { field: 'status', label: 'الحالة' },
                  { field: 'joinDate', label: 'تاريخ الانضمام' },
                ].map(({ field, label }) => (
                  <th
                    key={field}
                    className="px-4 py-3 text-right font-medium cursor-pointer hover:bg-gray-100 select-none"
                    onClick={() => handleSort(field)}
                  >
                    <span className="flex items-center gap-1">
                      {label}
                      <SortIcon field={field} sortField={sortField} sortDir={sortDir} />
                    </span>
                  </th>
                ))}
                <th className="px-4 py-3 text-right font-medium">إجراءات</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {paginated.length === 0 ? (
                <tr>
                  <td colSpan={6} className="text-center py-10 text-gray-400">لا توجد نتائج</td>
                </tr>
              ) : (
                paginated.map(user => (
                  <tr key={user.id} className="hover:bg-gray-50 transition">
                    <td className="px-4 py-3 font-medium text-gray-800">
                      <div className="flex items-center gap-2">
                        <div className="w-8 h-8 rounded-full bg-[#1e3a5f] text-white flex items-center justify-center text-xs font-bold">
                          {user.name[0]}
                        </div>
                        {user.name}
                      </div>
                    </td>
                    <td className="px-4 py-3 text-gray-600 font-mono text-xs">{user.email}</td>
                    <td className="px-4 py-3">
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                        user.role === 'admin' ? 'bg-purple-100 text-purple-700'
                          : user.role === 'moderator' ? 'bg-blue-100 text-blue-700'
                          : 'bg-gray-100 text-gray-700'
                      }`}>
                        {roleLabel(user.role)}
                      </span>
                    </td>
                    <td className="px-4 py-3">
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                        user.status === 'active'
                          ? 'bg-green-100 text-green-700'
                          : 'bg-red-100 text-red-700'
                      }`}>
                        {user.status === 'active' ? 'نشط' : 'غير نشط'}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-gray-500">{user.joinDate}</td>
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => setEditUser(user)}
                          className="p-1.5 text-blue-600 hover:bg-blue-50 rounded-lg transition"
                          aria-label="تعديل"
                        >
                          <Edit2 size={15} />
                        </button>
                        <button
                          onClick={() => setDeleteId(user.id)}
                          className="p-1.5 text-red-600 hover:bg-red-50 rounded-lg transition"
                          aria-label="حذف"
                        >
                          <Trash2 size={15} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex items-center justify-between px-4 py-3 border-t text-sm text-gray-500">
            <span>
              عرض {(page - 1) * PAGE_SIZE + 1}–{Math.min(page * PAGE_SIZE, filtered.length)} من {filtered.length}
            </span>
            <div className="flex gap-1">
              {Array.from({ length: totalPages }, (_, i) => i + 1).map(p => (
                <button
                  key={p}
                  onClick={() => setPage(p)}
                  className={`w-8 h-8 rounded-lg text-sm font-medium transition ${
                    p === page
                      ? 'bg-[#1e3a5f] text-white'
                      : 'hover:bg-gray-100 text-gray-600'
                  }`}
                >
                  {p}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
