/**
 * AdminArticlesPage.jsx
 * ----------------------
 * Full CRUD for articles: list, add, edit, delete.
 * Features: search, sort, pagination, confirmation dialog, toast.
 *
 * TODO: Replace articlesService calls with real API endpoints:
 *   GET    /api/articles
 *   POST   /api/articles
 *   PUT    /api/articles/:id
 *   DELETE /api/articles/:id
 */
import { useState, useEffect, useMemo } from 'react';
import { Plus, Search, Edit2, Trash2, ChevronUp, ChevronDown, X } from 'lucide-react';
import { articlesService } from '../../services/adminService';
import Toast from '../../components/admin/Toast';
import ConfirmDialog from '../../components/admin/ConfirmDialog';

const CATEGORIES = ['قانون العمل', 'القانون الجنائي', 'قانون الشركات', 'القانون الرقمي', 'القانون التجاري', 'الأحوال الشخصية', 'أخرى'];
const PAGE_SIZE = 5;

// ── Article Form Modal ────────────────────────────────────────────
function ArticleModal({ article, onSave, onClose }) {
  const isEdit = !!article?.id;
  const [form, setForm] = useState({
    title: '',
    content: '',
    author: 'محمد سامي',
    category: CATEGORIES[0],
    date: new Date().toISOString().split('T')[0],
    status: 'published',
    ...article,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.title.trim() || !form.content.trim()) return;
    onSave(form);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4" dir="rtl">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b">
          <h2 className="font-bold text-lg text-gray-800">{isEdit ? 'تعديل المقال' : 'إضافة مقال جديد'}</h2>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600"><X size={20} /></button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Title */}
            <div className="sm:col-span-2">
              <label className="label">عنوان المقال *</label>
              <input
                name="title"
                value={form.title}
                onChange={handleChange}
                required
                className="input"
                placeholder="أدخل عنوان المقال"
              />
            </div>

            {/* Author */}
            <div>
              <label className="label">الكاتب</label>
              <input name="author" value={form.author} onChange={handleChange} className="input" />
            </div>

            {/* Category */}
            <div>
              <label className="label">التصنيف</label>
              <select name="category" value={form.category} onChange={handleChange} className="input">
                {CATEGORIES.map(c => <option key={c}>{c}</option>)}
              </select>
            </div>

            {/* Date */}
            <div>
              <label className="label">التاريخ</label>
              <input type="date" name="date" value={form.date} onChange={handleChange} className="input" />
            </div>

            {/* Status */}
            <div>
              <label className="label">الحالة</label>
              <select name="status" value={form.status} onChange={handleChange} className="input">
                <option value="published">منشور</option>
                <option value="draft">مسودة</option>
              </select>
            </div>

            {/* Content */}
            <div className="sm:col-span-2">
              <label className="label">المحتوى *</label>
              <textarea
                name="content"
                value={form.content}
                onChange={handleChange}
                required
                rows={5}
                className="input resize-none"
                placeholder="أدخل محتوى المقال..."
              />
            </div>
          </div>

          {/* Actions */}
          <div className="flex gap-3 pt-2">
            <button type="submit" className="btn-primary flex-1">
              {isEdit ? 'حفظ التعديلات' : 'إضافة المقال'}
            </button>
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
export default function AdminArticlesPage() {
  const [articles, setArticles] = useState([]);
  const [search, setSearch] = useState('');
  const [sortField, setSortField] = useState('date');
  const [sortDir, setSortDir] = useState('desc');
  const [page, setPage] = useState(1);
  const [modal, setModal] = useState(null); // null | 'add' | article object
  const [deleteId, setDeleteId] = useState(null);
  const [toast, setToast] = useState(null);

  // Load articles on mount
  useEffect(() => {
    // TODO: Replace with: const data = await fetch('/api/articles').then(r => r.json());
    setArticles(articlesService.getAll());
  }, []);

  // Filter + sort + paginate
  const filtered = useMemo(() => {
    let list = articles.filter(a =>
      a.title.toLowerCase().includes(search.toLowerCase()) ||
      a.author.toLowerCase().includes(search.toLowerCase()) ||
      a.category.toLowerCase().includes(search.toLowerCase())
    );
    list = [...list].sort((a, b) => {
      const va = a[sortField] ?? '';
      const vb = b[sortField] ?? '';
      return sortDir === 'asc' ? va.localeCompare(vb) : vb.localeCompare(va);
    });
    return list;
  }, [articles, search, sortField, sortDir]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const paginated = filtered.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  const handleSort = (field) => {
    if (sortField === field) setSortDir(d => d === 'asc' ? 'desc' : 'asc');
    else { setSortField(field); setSortDir('asc'); }
  };

  const handleSave = (form) => {
    try {
      if (form.id) {
        // TODO: PUT /api/articles/:id
        const updated = articlesService.update(form.id, form);
        setArticles(prev => prev.map(a => a.id === updated.id ? updated : a));
        setToast({ type: 'success', message: 'تم تحديث المقال بنجاح' });
      } else {
        // TODO: POST /api/articles
        const created = articlesService.create(form);
        setArticles(prev => [...prev, created]);
        setToast({ type: 'success', message: 'تم إضافة المقال بنجاح' });
      }
      setModal(null);
    } catch (err) {
      setToast({ type: 'error', message: err.message });
    }
  };

  const handleDelete = () => {
    try {
      // TODO: DELETE /api/articles/:id
      articlesService.delete(deleteId);
      setArticles(prev => prev.filter(a => a.id !== deleteId));
      setToast({ type: 'success', message: 'تم حذف المقال' });
    } catch (err) {
      setToast({ type: 'error', message: err.message });
    } finally {
      setDeleteId(null);
    }
  };

  return (
    <div className="space-y-5" dir="rtl">
      <Toast toast={toast} onClose={() => setToast(null)} />
      <ConfirmDialog
        open={!!deleteId}
        message="هل تريد حذف هذا المقال نهائياً؟"
        onConfirm={handleDelete}
        onCancel={() => setDeleteId(null)}
      />
      {modal !== null && (
        <ArticleModal
          article={modal === 'add' ? null : modal}
          onSave={handleSave}
          onClose={() => setModal(null)}
        />
      )}

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">إدارة المقالات</h1>
          <p className="text-sm text-gray-500">{articles.length} مقال إجمالاً</p>
        </div>
        <button onClick={() => setModal('add')} className="btn-primary flex items-center gap-2 self-start sm:self-auto">
          <Plus size={18} /> إضافة مقال
        </button>
      </div>

      {/* Search */}
      <div className="bg-white rounded-2xl shadow-sm p-4">
        <div className="relative max-w-sm">
          <Search size={16} className="absolute top-1/2 right-3 -translate-y-1/2 text-gray-400" />
          <input
            value={search}
            onChange={e => { setSearch(e.target.value); setPage(1); }}
            placeholder="البحث بالعنوان أو الكاتب أو التصنيف..."
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
                  { field: 'title', label: 'العنوان' },
                  { field: 'author', label: 'الكاتب' },
                  { field: 'category', label: 'التصنيف' },
                  { field: 'date', label: 'التاريخ' },
                  { field: 'status', label: 'الحالة' },
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
                paginated.map(article => (
                  <tr key={article.id} className="hover:bg-gray-50 transition">
                    <td className="px-4 py-3 font-medium text-gray-800 max-w-[200px] truncate">{article.title}</td>
                    <td className="px-4 py-3 text-gray-600">{article.author}</td>
                    <td className="px-4 py-3">
                      <span className="px-2 py-1 bg-[#1e3a5f]/10 text-[#1e3a5f] rounded-full text-xs">
                        {article.category}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-gray-500">{article.date}</td>
                    <td className="px-4 py-3">
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                        article.status === 'published'
                          ? 'bg-green-100 text-green-700'
                          : 'bg-yellow-100 text-yellow-700'
                      }`}>
                        {article.status === 'published' ? 'منشور' : 'مسودة'}
                      </span>
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => setModal(article)}
                          className="p-1.5 text-blue-600 hover:bg-blue-50 rounded-lg transition"
                          aria-label="تعديل"
                        >
                          <Edit2 size={15} />
                        </button>
                        <button
                          onClick={() => setDeleteId(article.id)}
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
