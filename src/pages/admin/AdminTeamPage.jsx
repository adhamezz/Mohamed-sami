/**
 * AdminTeamPage.jsx
 * ------------------
 * CRUD for team / staff members.
 */
import { useState, useEffect, useRef } from 'react';
import { Plus, Pencil, Trash2, Save, X, Users, Upload } from 'lucide-react';
import { cmsTeamService } from '../../services/adminService';
import Toast from '../../components/admin/Toast';
import ConfirmDialog from '../../components/admin/ConfirmDialog';

const EMPTY = { name: '', position: '', image: null, email: '', phone: '', bio: '' };

function MemberForm({ initial, onSave, onCancel }) {
  const [form, setForm] = useState(initial || EMPTY);
  const imgRef = useRef(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  };

  const handleImg = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (ev) => setForm(prev => ({ ...prev, image: ev.target.result }));
    reader.readAsDataURL(file);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.name.trim()) return;
    onSave(form);
  };

  return (
    <form onSubmit={handleSubmit} className="bg-[#1e3a5f]/5 rounded-2xl p-5 space-y-4 border border-[#1e3a5f]/10">
      <div className="flex gap-4 items-start">
        <div className="shrink-0">
          {form.image ? (
            <div className="relative w-20 h-20">
              <img src={form.image} alt="" className="w-20 h-20 object-cover rounded-xl border border-gray-200" />
              <button type="button" onClick={() => setForm(p => ({ ...p, image: null }))}
                className="absolute -top-2 -left-2 w-6 h-6 bg-red-500 text-white rounded-full flex items-center justify-center">
                <X size={12} />
              </button>
            </div>
          ) : (
            <button type="button" onClick={() => imgRef.current?.click()}
              className="w-20 h-20 rounded-xl border-2 border-dashed border-gray-300 flex flex-col items-center justify-center text-gray-400 text-xs gap-1 hover:border-[#1e3a5f]/50 transition">
              <Upload size={18} />
              <span>صورة</span>
            </button>
          )}
          <input ref={imgRef} type="file" accept="image/*" className="hidden" onChange={handleImg} />
        </div>
        <div className="flex-1 grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="label">الاسم *</label>
            <input name="name" value={form.name} onChange={handleChange} className="input" required />
          </div>
          <div>
            <label className="label">المنصب</label>
            <input name="position" value={form.position} onChange={handleChange} className="input" />
          </div>
          <div>
            <label className="label">البريد الإلكتروني</label>
            <input type="email" name="email" value={form.email} onChange={handleChange} className="input" dir="ltr" />
          </div>
          <div>
            <label className="label">رقم الجوال</label>
            <input name="phone" value={form.phone} onChange={handleChange} className="input" dir="ltr" />
          </div>
          <div className="sm:col-span-2">
            <label className="label">نبذة تعريفية</label>
            <textarea name="bio" value={form.bio} onChange={handleChange} className="input resize-none" rows={3} />
          </div>
        </div>
      </div>
      <div className="flex gap-3">
        <button type="submit" className="btn-primary flex items-center gap-2"><Save size={15} /> حفظ</button>
        <button type="button" onClick={onCancel} className="btn-secondary flex items-center gap-2"><X size={15} /> إلغاء</button>
      </div>
    </form>
  );
}

export default function AdminTeamPage() {
  const [members, setMembers] = useState([]);
  const [adding, setAdding] = useState(false);
  const [editing, setEditing] = useState(null);
  const [toast, setToast] = useState(null);
  const [confirmDelete, setConfirmDelete] = useState(null);

  useEffect(() => { setMembers(cmsTeamService.getAll()); }, []);

  const refresh = () => setMembers(cmsTeamService.getAll());

  const handleAdd = (data) => {
    cmsTeamService.create(data);
    refresh(); setAdding(false);
    setToast({ type: 'success', message: 'تمت إضافة العضو بنجاح' });
  };

  const handleEdit = (data) => {
    cmsTeamService.update(editing.id, data);
    refresh(); setEditing(null);
    setToast({ type: 'success', message: 'تم تحديث بيانات العضو' });
  };

  const handleDelete = (id) => {
    cmsTeamService.delete(id);
    refresh(); setConfirmDelete(null);
    setToast({ type: 'success', message: 'تم حذف العضو' });
  };

  return (
    <div className="space-y-6" dir="rtl">
      <Toast toast={toast} onClose={() => setToast(null)} />
      <ConfirmDialog
        open={!!confirmDelete}
        title="حذف عضو الفريق"
        message={`هل تريد حذف "${confirmDelete?.name}"؟`}
        onConfirm={() => handleDelete(confirmDelete.id)}
        onCancel={() => setConfirmDelete(null)}
      />

      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">إدارة الفريق</h1>
          <p className="text-sm text-gray-500 mt-1">{members.length} عضو</p>
        </div>
        <button onClick={() => { setAdding(true); setEditing(null); }} className="btn-primary flex items-center gap-2">
          <Plus size={16} /> إضافة عضو
        </button>
      </div>

      {adding && <MemberForm onSave={handleAdd} onCancel={() => setAdding(false)} />}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {members.length === 0 && !adding && (
          <div className="col-span-3 bg-white rounded-2xl shadow-sm p-10 text-center text-gray-400">
            <Users size={40} className="mx-auto mb-3 opacity-30" />
            <p>لا يوجد أعضاء فريق. أضف أول عضو!</p>
          </div>
        )}

        {members.map(member => (
          <div key={member.id}>
            {editing?.id === member.id ? (
              <MemberForm initial={member} onSave={handleEdit} onCancel={() => setEditing(null)} />
            ) : (
              <div className="bg-white rounded-2xl shadow-sm p-4 flex flex-col items-center text-center gap-3">
                {member.image ? (
                  <img src={member.image} alt={member.name} className="w-20 h-20 rounded-full object-cover border-2 border-[#d4af37]" />
                ) : (
                  <div className="w-20 h-20 rounded-full bg-[#1e3a5f]/10 flex items-center justify-center text-[#1e3a5f] text-2xl font-bold">
                    {member.name?.[0] || '?'}
                  </div>
                )}
                <div>
                  <p className="font-bold text-gray-800">{member.name}</p>
                  {member.position && <p className="text-sm text-[#1e3a5f]">{member.position}</p>}
                  {member.email && <p className="text-xs text-gray-400 mt-1">{member.email}</p>}
                  {member.phone && <p className="text-xs text-gray-400">{member.phone}</p>}
                  {member.bio && <p className="text-xs text-gray-500 mt-2 line-clamp-2">{member.bio}</p>}
                </div>
                <div className="flex gap-2">
                  <button onClick={() => { setEditing(member); setAdding(false); }}
                    className="p-2 rounded-lg hover:bg-blue-50 text-blue-600 transition"><Pencil size={15} /></button>
                  <button onClick={() => setConfirmDelete(member)}
                    className="p-2 rounded-lg hover:bg-red-50 text-red-500 transition"><Trash2 size={15} /></button>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
