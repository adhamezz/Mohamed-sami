/**
 * AdminTestimonialsPage.jsx
 * --------------------------
 * CRUD for client testimonials / reviews.
 */
import { useState, useEffect } from 'react';
import { Plus, Pencil, Trash2, Save, X, Star } from 'lucide-react';
import { cmsTestimonialsService } from '../../services/adminService';
import Toast from '../../components/admin/Toast';
import ConfirmDialog from '../../components/admin/ConfirmDialog';

const EMPTY = { name: '', position: '', text: '', rating: 5, date: new Date().toISOString().split('T')[0] };

function StarRating({ value, onChange }) {
  return (
    <div className="flex gap-1">
      {[1, 2, 3, 4, 5].map(n => (
        <button key={n} type="button" onClick={() => onChange(n)}
          className={`text-xl transition ${n <= value ? 'text-[#d4af37]' : 'text-gray-300'}`}>
          ★
        </button>
      ))}
    </div>
  );
}

function TestimonialForm({ initial, onSave, onCancel }) {
  const [form, setForm] = useState(initial || EMPTY);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.name.trim() || !form.text.trim()) return;
    onSave(form);
  };

  return (
    <form onSubmit={handleSubmit} className="bg-[#1e3a5f]/5 rounded-2xl p-5 space-y-4 border border-[#1e3a5f]/10">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="label">اسم العميل *</label>
          <input name="name" value={form.name} onChange={handleChange} className="input" required />
        </div>
        <div>
          <label className="label">المنصب / الوظيفة</label>
          <input name="position" value={form.position} onChange={handleChange} className="input" />
        </div>
        <div className="sm:col-span-2">
          <label className="label">نص التقييم *</label>
          <textarea name="text" value={form.text} onChange={handleChange} className="input resize-none" rows={3} required />
        </div>
        <div>
          <label className="label">التقييم</label>
          <StarRating value={form.rating} onChange={v => setForm(p => ({ ...p, rating: v }))} />
        </div>
        <div>
          <label className="label">التاريخ</label>
          <input type="date" name="date" value={form.date} onChange={handleChange} className="input" />
        </div>
      </div>
      <div className="flex gap-3">
        <button type="submit" className="btn-primary flex items-center gap-2"><Save size={15} /> حفظ</button>
        <button type="button" onClick={onCancel} className="btn-secondary flex items-center gap-2"><X size={15} /> إلغاء</button>
      </div>
    </form>
  );
}

export default function AdminTestimonialsPage() {
  const [items, setItems] = useState([]);
  const [adding, setAdding] = useState(false);
  const [editing, setEditing] = useState(null);
  const [toast, setToast] = useState(null);
  const [confirmDelete, setConfirmDelete] = useState(null);

  useEffect(() => { setItems(cmsTestimonialsService.getAll()); }, []);

  const refresh = () => setItems(cmsTestimonialsService.getAll());

  const handleAdd = (data) => {
    cmsTestimonialsService.create(data);
    refresh(); setAdding(false);
    setToast({ type: 'success', message: 'تمت إضافة التقييم بنجاح' });
  };

  const handleEdit = (data) => {
    cmsTestimonialsService.update(editing.id, data);
    refresh(); setEditing(null);
    setToast({ type: 'success', message: 'تم تحديث التقييم' });
  };

  const handleDelete = (id) => {
    cmsTestimonialsService.delete(id);
    refresh(); setConfirmDelete(null);
    setToast({ type: 'success', message: 'تم حذف التقييم' });
  };

  return (
    <div className="space-y-6" dir="rtl">
      <Toast toast={toast} onClose={() => setToast(null)} />
      <ConfirmDialog
        open={!!confirmDelete}
        title="حذف التقييم"
        message={`هل تريد حذف تقييم "${confirmDelete?.name}"؟`}
        onConfirm={() => handleDelete(confirmDelete.id)}
        onCancel={() => setConfirmDelete(null)}
      />

      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">إدارة التقييمات والشهادات</h1>
          <p className="text-sm text-gray-500 mt-1">{items.length} تقييم</p>
        </div>
        <button onClick={() => { setAdding(true); setEditing(null); }} className="btn-primary flex items-center gap-2">
          <Plus size={16} /> إضافة تقييم
        </button>
      </div>

      {adding && <TestimonialForm onSave={handleAdd} onCancel={() => setAdding(false)} />}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {items.length === 0 && !adding && (
          <div className="col-span-2 bg-white rounded-2xl shadow-sm p-10 text-center text-gray-400">
            <Star size={40} className="mx-auto mb-3 opacity-30" />
            <p>لا توجد تقييمات. أضف أول تقييم!</p>
          </div>
        )}

        {items.map(item => (
          <div key={item.id}>
            {editing?.id === item.id ? (
              <TestimonialForm initial={item} onSave={handleEdit} onCancel={() => setEditing(null)} />
            ) : (
              <div className="bg-white rounded-2xl shadow-sm p-5 space-y-3">
                <div className="flex items-start justify-between gap-3">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-[#1e3a5f]/10 flex items-center justify-center text-[#1e3a5f] font-bold">
                      {item.name?.[0] || '?'}
                    </div>
                    <div>
                      <p className="font-semibold text-gray-800">{item.name}</p>
                      {item.position && <p className="text-xs text-gray-500">{item.position}</p>}
                    </div>
                  </div>
                  <div className="flex gap-1">
                    <button onClick={() => { setEditing(item); setAdding(false); }}
                      className="p-2 rounded-lg hover:bg-blue-50 text-blue-600 transition"><Pencil size={14} /></button>
                    <button onClick={() => setConfirmDelete(item)}
                      className="p-2 rounded-lg hover:bg-red-50 text-red-500 transition"><Trash2 size={14} /></button>
                  </div>
                </div>
                <div className="flex gap-0.5">
                  {[1, 2, 3, 4, 5].map(n => (
                    <span key={n} className={`text-lg ${n <= item.rating ? 'text-[#d4af37]' : 'text-gray-200'}`}>★</span>
                  ))}
                </div>
                <p className="text-sm text-gray-600 italic">"{item.text}"</p>
                {item.date && <p className="text-xs text-gray-400">{new Date(item.date).toLocaleDateString('ar-EG')}</p>}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
