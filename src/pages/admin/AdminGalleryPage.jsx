/**
 * AdminGalleryPage.jsx
 * ---------------------
 * Upload and organize gallery images with categories.
 */
import { useState, useEffect, useRef } from 'react';
import { Plus, Trash2, Upload, Image, X } from 'lucide-react';
import { cmsGalleryService } from '../../services/adminService';
import Toast from '../../components/admin/Toast';
import ConfirmDialog from '../../components/admin/ConfirmDialog';

const CATEGORIES = ['عام', 'مكتب', 'فريق', 'فعاليات', 'شهادات'];

export default function AdminGalleryPage() {
  const [items, setItems] = useState([]);
  const [filterCat, setFilterCat] = useState('الكل');
  const [toast, setToast] = useState(null);
  const [confirmDelete, setConfirmDelete] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [newItem, setNewItem] = useState({ title: '', category: 'عام', image: null });
  const fileRef = useRef(null);
  const [showForm, setShowForm] = useState(false);

  useEffect(() => { setItems(cmsGalleryService.getAll()); }, []);

  const refresh = () => setItems(cmsGalleryService.getAll());

  const handleFileChange = (e) => {
    const files = Array.from(e.target.files || []);
    if (!files.length) return;
    // If multiple files, upload each as separate items
    files.forEach(file => {
      const reader = new FileReader();
      reader.onload = (ev) => {
        if (files.length > 1) {
          // batch upload without form
          cmsGalleryService.create({ title: file.name.replace(/\.[^.]+$/, ''), category: 'عام', image: ev.target.result });
          refresh();
          setToast({ type: 'success', message: 'تم رفع الصور بنجاح' });
        } else {
          setNewItem(prev => ({ ...prev, image: ev.target.result }));
          setShowForm(true);
        }
      };
      reader.readAsDataURL(file);
    });
  };

  const handleAdd = (e) => {
    e.preventDefault();
    if (!newItem.image) return;
    setUploading(true);
    setTimeout(() => {
      cmsGalleryService.create(newItem);
      refresh();
      setNewItem({ title: '', category: 'عام', image: null });
      setShowForm(false);
      setUploading(false);
      setToast({ type: 'success', message: 'تمت إضافة الصورة' });
    }, 300);
  };

  const handleDelete = (id) => {
    cmsGalleryService.delete(id);
    refresh();
    setConfirmDelete(null);
    setToast({ type: 'success', message: 'تم حذف الصورة' });
  };

  const allCats = ['الكل', ...CATEGORIES];
  const filtered = filterCat === 'الكل' ? items : items.filter(i => i.category === filterCat);

  return (
    <div className="space-y-6" dir="rtl">
      <Toast toast={toast} onClose={() => setToast(null)} />
      <ConfirmDialog
        open={!!confirmDelete}
        title="حذف الصورة"
        message="هل تريد حذف هذه الصورة؟ لا يمكن التراجع."
        onConfirm={() => handleDelete(confirmDelete)}
        onCancel={() => setConfirmDelete(null)}
      />

      <div className="flex items-center justify-between flex-wrap gap-3">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">إدارة المعرض</h1>
          <p className="text-sm text-gray-500 mt-1">{items.length} صورة</p>
        </div>
        <button onClick={() => fileRef.current?.click()} className="btn-primary flex items-center gap-2">
          <Upload size={16} /> رفع صور
        </button>
        <input ref={fileRef} type="file" accept="image/*" multiple className="hidden" onChange={handleFileChange} />
      </div>

      {/* Add form */}
      {showForm && (
        <form onSubmit={handleAdd} className="bg-[#1e3a5f]/5 rounded-2xl p-5 space-y-4 border border-[#1e3a5f]/10">
          <div className="flex gap-4 items-start">
            {newItem.image && (
              <div className="relative shrink-0">
                <img src={newItem.image} alt="" className="w-24 h-24 object-cover rounded-xl border" />
                <button type="button" onClick={() => { setNewItem(p => ({ ...p, image: null })); setShowForm(false); }}
                  className="absolute -top-2 -left-2 w-6 h-6 bg-red-500 text-white rounded-full flex items-center justify-center">
                  <X size={12} />
                </button>
              </div>
            )}
            <div className="flex-1 grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="label">عنوان الصورة</label>
                <input value={newItem.title} onChange={e => setNewItem(p => ({ ...p, title: e.target.value }))} className="input" />
              </div>
              <div>
                <label className="label">التصنيف</label>
                <select value={newItem.category} onChange={e => setNewItem(p => ({ ...p, category: e.target.value }))} className="input">
                  {CATEGORIES.map(c => <option key={c} value={c}>{c}</option>)}
                </select>
              </div>
            </div>
          </div>
          <div className="flex gap-3">
            <button type="submit" disabled={uploading} className="btn-primary flex items-center gap-2">
              {uploading ? <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" /> : <Plus size={15} />}
              إضافة
            </button>
            <button type="button" onClick={() => { setShowForm(false); setNewItem({ title: '', category: 'عام', image: null }); }}
              className="btn-secondary flex items-center gap-2"><X size={15} /> إلغاء</button>
          </div>
        </form>
      )}

      {/* Category Filter */}
      <div className="flex gap-2 flex-wrap">
        {allCats.map(cat => (
          <button key={cat} onClick={() => setFilterCat(cat)}
            className={`px-4 py-1.5 rounded-full text-sm font-medium transition ${filterCat === cat ? 'bg-[#1e3a5f] text-white' : 'bg-white text-gray-600 hover:bg-gray-100 border border-gray-200'}`}>
            {cat}
          </button>
        ))}
      </div>

      {/* Grid */}
      {filtered.length === 0 ? (
        <div className="bg-white rounded-2xl shadow-sm p-10 text-center text-gray-400">
          <Image size={40} className="mx-auto mb-3 opacity-30" />
          <p>لا توجد صور. ارفع أول صورة!</p>
        </div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3">
          {filtered.map(item => (
            <div key={item.id} className="group relative rounded-xl overflow-hidden border border-gray-200 bg-gray-50 aspect-square">
              <img src={item.image} alt={item.title} className="w-full h-full object-cover" />
              <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition flex flex-col items-center justify-center gap-2 p-2">
                {item.title && <p className="text-white text-xs text-center font-medium line-clamp-2">{item.title}</p>}
                <span className="text-xs bg-white/20 text-white px-2 py-0.5 rounded-full">{item.category}</span>
                <button onClick={() => setConfirmDelete(item.id)}
                  className="w-8 h-8 bg-red-500 rounded-full flex items-center justify-center text-white hover:bg-red-600 transition">
                  <Trash2 size={14} />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
