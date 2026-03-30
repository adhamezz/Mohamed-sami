/**
 * AdminServicesPage.jsx
 * ----------------------
 * CRUD for legal services displayed on the public site.
 */
import { useState, useEffect } from 'react';
import { Plus, Pencil, Trash2, Save, X, Briefcase, ChevronUp, ChevronDown } from 'lucide-react';
import { cmsServicesService } from '../../services/adminService';
import Toast from '../../components/admin/Toast';
import ConfirmDialog from '../../components/admin/ConfirmDialog';

const ICONS = ['Shield', 'Scale', 'Heart', 'MessageCircle', 'FileText', 'Building', 'Briefcase', 'Star', 'Users', 'Globe'];

const EMPTY = { title: '', description: '', icon: 'Briefcase', price: '', order: 0 };

function ServiceForm({ initial, onSave, onCancel }) {
  const [form, setForm] = useState(initial || EMPTY);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.title.trim()) return;
    onSave(form);
  };

  return (
    <form onSubmit={handleSubmit} className="bg-[#1e3a5f]/5 rounded-2xl p-5 space-y-4 border border-[#1e3a5f]/10">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="sm:col-span-2">
          <label className="label">عنوان الخدمة *</label>
          <input name="title" value={form.title} onChange={handleChange} className="input" required />
        </div>
        <div className="sm:col-span-2">
          <label className="label">وصف الخدمة</label>
          <textarea name="description" value={form.description} onChange={handleChange} className="input resize-none" rows={3} />
        </div>
        <div>
          <label className="label">أيقونة</label>
          <select name="icon" value={form.icon} onChange={handleChange} className="input">
            {ICONS.map(i => <option key={i} value={i}>{i}</option>)}
          </select>
        </div>
        <div>
          <label className="label">السعر (اختياري)</label>
          <input name="price" value={form.price} onChange={handleChange} className="input" placeholder="مثال: 500 درهم" />
        </div>
        <div>
          <label className="label">الترتيب</label>
          <input type="number" name="order" value={form.order} onChange={handleChange} className="input" min={0} />
        </div>
      </div>
      <div className="flex gap-3">
        <button type="submit" className="btn-primary flex items-center gap-2">
          <Save size={15} /> حفظ
        </button>
        <button type="button" onClick={onCancel} className="btn-secondary flex items-center gap-2">
          <X size={15} /> إلغاء
        </button>
      </div>
    </form>
  );
}

export default function AdminServicesPage() {
  const [services, setServices] = useState([]);
  const [adding, setAdding] = useState(false);
  const [editing, setEditing] = useState(null);
  const [toast, setToast] = useState(null);
  const [confirmDelete, setConfirmDelete] = useState(null);

  useEffect(() => {
    setServices(cmsServicesService.getAll().sort((a, b) => (a.order || 0) - (b.order || 0)));
  }, []);

  const refresh = () => setServices(cmsServicesService.getAll().sort((a, b) => (a.order || 0) - (b.order || 0)));

  const handleAdd = (data) => {
    cmsServicesService.create({ ...data, order: services.length });
    refresh();
    setAdding(false);
    setToast({ type: 'success', message: 'تمت إضافة الخدمة بنجاح' });
  };

  const handleEdit = (data) => {
    cmsServicesService.update(editing.id, data);
    refresh();
    setEditing(null);
    setToast({ type: 'success', message: 'تم تحديث الخدمة بنجاح' });
  };

  const handleDelete = (id) => {
    cmsServicesService.delete(id);
    refresh();
    setConfirmDelete(null);
    setToast({ type: 'success', message: 'تم حذف الخدمة' });
  };

  const move = (idx, dir) => {
    const arr = [...services];
    const target = idx + dir;
    if (target < 0 || target >= arr.length) return;
    [arr[idx], arr[target]] = [arr[target], arr[idx]];
    arr.forEach((s, i) => cmsServicesService.update(s.id, { order: i }));
    setServices(arr.map((s, i) => ({ ...s, order: i })));
  };

  return (
    <div className="space-y-6" dir="rtl">
      <Toast toast={toast} onClose={() => setToast(null)} />
      <ConfirmDialog
        open={!!confirmDelete}
        title="حذف الخدمة"
        message={`هل تريد حذف الخدمة "${confirmDelete?.title}"؟ لا يمكن التراجع.`}
        onConfirm={() => handleDelete(confirmDelete.id)}
        onCancel={() => setConfirmDelete(null)}
      />

      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">إدارة الخدمات</h1>
          <p className="text-sm text-gray-500 mt-1">{services.length} خدمة</p>
        </div>
        <button onClick={() => { setAdding(true); setEditing(null); }} className="btn-primary flex items-center gap-2">
          <Plus size={16} /> إضافة خدمة
        </button>
      </div>

      {adding && (
        <ServiceForm onSave={handleAdd} onCancel={() => setAdding(false)} />
      )}

      <div className="space-y-3">
        {services.length === 0 && !adding && (
          <div className="bg-white rounded-2xl shadow-sm p-10 text-center text-gray-400">
            <Briefcase size={40} className="mx-auto mb-3 opacity-30" />
            <p>لا توجد خدمات. أضف أولى خدماتك!</p>
          </div>
        )}

        {services.map((svc, idx) => (
          <div key={svc.id}>
            {editing?.id === svc.id ? (
              <ServiceForm initial={svc} onSave={handleEdit} onCancel={() => setEditing(null)} />
            ) : (
              <div className="bg-white rounded-2xl shadow-sm p-4 flex items-center gap-4">
                <div className="flex flex-col gap-1">
                  <button onClick={() => move(idx, -1)} disabled={idx === 0}
                    className="p-1 rounded hover:bg-gray-100 disabled:opacity-30 text-gray-400">
                    <ChevronUp size={14} />
                  </button>
                  <button onClick={() => move(idx, 1)} disabled={idx === services.length - 1}
                    className="p-1 rounded hover:bg-gray-100 disabled:opacity-30 text-gray-400">
                    <ChevronDown size={14} />
                  </button>
                </div>
                <div className="w-10 h-10 rounded-xl bg-[#1e3a5f]/10 flex items-center justify-center text-[#1e3a5f] shrink-0">
                  <Briefcase size={18} />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-semibold text-gray-800 truncate">{svc.title}</p>
                  {svc.description && <p className="text-sm text-gray-500 truncate">{svc.description}</p>}
                  {svc.price && <span className="text-xs bg-green-100 text-green-700 px-2 py-0.5 rounded-full">{svc.price}</span>}
                </div>
                <div className="flex gap-2 shrink-0">
                  <button onClick={() => { setEditing(svc); setAdding(false); }}
                    className="p-2 rounded-lg hover:bg-blue-50 text-blue-600 transition">
                    <Pencil size={16} />
                  </button>
                  <button onClick={() => setConfirmDelete(svc)}
                    className="p-2 rounded-lg hover:bg-red-50 text-red-500 transition">
                    <Trash2 size={16} />
                  </button>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
