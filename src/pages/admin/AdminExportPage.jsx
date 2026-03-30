/**
 * AdminExportPage.jsx
 * --------------------
 * تصدير واستيراد البيانات — نسخ احتياطي للموقع
 */
import { useState } from 'react';
import {
  Download, Upload, Trash2, AlertTriangle, CheckCircle,
  FileText, Briefcase, Users, Star, Image, Mail, Globe,
  UserCheck, Database, RefreshCw,
} from 'lucide-react';
import Toast from '../../components/admin/Toast';

const DATA_KEYS = [
  { key: 'cms_site_settings', label: 'إعدادات الموقع', icon: Globe, color: 'text-blue-600' },
  { key: 'cms_business_profile', label: 'الملف المهني', icon: UserCheck, color: 'text-indigo-600' },
  { key: 'admin_articles', label: 'المقالات', icon: FileText, color: 'text-[#1e3a5f]' },
  { key: 'cms_services', label: 'الخدمات', icon: Briefcase, color: 'text-cyan-600' },
  { key: 'cms_team', label: 'الفريق', icon: Users, color: 'text-yellow-600' },
  { key: 'cms_gallery', label: 'المعرض', icon: Image, color: 'text-pink-600' },
  { key: 'cms_testimonials', label: 'التقييمات', icon: Star, color: 'text-amber-600' },
  { key: 'contactMessages', label: 'الرسائل', icon: Mail, color: 'text-green-600' },
  { key: 'admin_users', label: 'المستخدمون', icon: Users, color: 'text-teal-600' },
];

function getSize(key) {
  try {
    const val = localStorage.getItem(key);
    if (!val) return null;
    const bytes = new Blob([val]).size;
    if (bytes < 1024) return `${bytes} B`;
    return `${(bytes / 1024).toFixed(1)} KB`;
  } catch {
    return null;
  }
}

function getCount(key) {
  try {
    const val = localStorage.getItem(key);
    if (!val) return null;
    const parsed = JSON.parse(val);
    if (Array.isArray(parsed)) return parsed.length;
    return typeof parsed === 'object' ? 'إعدادات' : null;
  } catch {
    return null;
  }
}

export default function AdminExportPage() {
  const [toast, setToast] = useState(null);
  const [importing, setImporting] = useState(false);

  const exportAll = () => {
    try {
      const backup = {};
      DATA_KEYS.forEach(({ key }) => {
        const val = localStorage.getItem(key);
        if (val) backup[key] = JSON.parse(val);
      });
      const blob = new Blob([JSON.stringify(backup, null, 2)], { type: 'application/json' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `site-backup-${new Date().toISOString().split('T')[0]}.json`;
      a.click();
      URL.revokeObjectURL(url);
      setToast({ type: 'success', message: 'تم تصدير النسخة الاحتياطية بنجاح ✓' });
    } catch {
      setToast({ type: 'error', message: 'فشل التصدير' });
    }
  };

  const exportSingle = (key, label) => {
    try {
      const val = localStorage.getItem(key);
      if (!val) {
        setToast({ type: 'error', message: `لا توجد بيانات لـ ${label}` });
        return;
      }
      const blob = new Blob([val], { type: 'application/json' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `${key}-${new Date().toISOString().split('T')[0]}.json`;
      a.click();
      URL.revokeObjectURL(url);
      setToast({ type: 'success', message: `تم تصدير ${label} بنجاح` });
    } catch {
      setToast({ type: 'error', message: 'فشل التصدير' });
    }
  };

  const handleImport = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setImporting(true);
    const reader = new FileReader();
    reader.onload = (ev) => {
      try {
        const data = JSON.parse(ev.target.result);
        let count = 0;
        DATA_KEYS.forEach(({ key }) => {
          if (data[key] !== undefined) {
            localStorage.setItem(key, JSON.stringify(data[key]));
            count++;
          }
        });
        window.dispatchEvent(new Event('cms-updated'));
        setToast({ type: 'success', message: `تم استيراد ${count} مجموعة بيانات بنجاح ✓` });
      } catch {
        setToast({ type: 'error', message: 'ملف غير صالح — تأكد أنه ملف JSON صحيح' });
      } finally {
        setImporting(false);
        e.target.value = '';
      }
    };
    reader.readAsText(file);
  };

  const clearKey = (key, label) => {
    if (!window.confirm(`هل تريد حذف بيانات "${label}" نهائياً؟`)) return;
    localStorage.removeItem(key);
    window.dispatchEvent(new Event('cms-updated'));
    setToast({ type: 'success', message: `تم حذف بيانات ${label}` });
  };

  const clearAll = () => {
    if (!window.confirm('تحذير: سيتم حذف جميع البيانات المحفوظة وإعادة تعيين الموقع. هل أنت متأكد؟')) return;
    DATA_KEYS.forEach(({ key }) => localStorage.removeItem(key));
    window.dispatchEvent(new Event('cms-updated'));
    setToast({ type: 'success', message: 'تم إعادة تعيين جميع البيانات' });
  };

  return (
    <div className="space-y-6 max-w-3xl" dir="rtl">
      <Toast toast={toast} onClose={() => setToast(null)} />

      <div>
        <h1 className="text-2xl font-bold text-gray-800">النسخ الاحتياطي والتصدير</h1>
        <p className="text-sm text-gray-500 mt-1">احتفظ بنسخة من بياناتك أو انقلها لموقع آخر</p>
      </div>

      {/* Export All */}
      <div className="bg-white rounded-2xl shadow-sm p-6">
        <h2 className="font-bold text-gray-700 mb-2 flex items-center gap-2">
          <Database size={17} className="text-[#1e3a5f]" /> تصدير كامل
        </h2>
        <p className="text-sm text-gray-500 mb-4">تصدير جميع بيانات الموقع كملف JSON واحد — مناسب للنسخ الاحتياطي أو نقل الموقع</p>
        <button onClick={exportAll}
          className="flex items-center gap-2 px-5 py-2.5 bg-[#1e3a5f] text-white rounded-xl hover:bg-[#162d4a] transition text-sm font-medium">
          <Download size={16} /> تصدير نسخة احتياطية كاملة
        </button>
      </div>

      {/* Import */}
      <div className="bg-white rounded-2xl shadow-sm p-6">
        <h2 className="font-bold text-gray-700 mb-2 flex items-center gap-2">
          <Upload size={17} className="text-[#1e3a5f]" /> استيراد بيانات
        </h2>
        <p className="text-sm text-gray-500 mb-4">استيراد نسخة احتياطية من ملف JSON — سيتم استبدال البيانات الحالية</p>
        <div className="flex items-center gap-3">
          <label className="flex items-center gap-2 px-5 py-2.5 border border-[#1e3a5f] text-[#1e3a5f] rounded-xl hover:bg-[#1e3a5f]/5 transition text-sm font-medium cursor-pointer">
            {importing
              ? <span className="w-4 h-4 border-2 border-[#1e3a5f] border-t-transparent rounded-full animate-spin" />
              : <Upload size={16} />}
            اختر ملف JSON
            <input type="file" accept=".json" className="hidden" onChange={handleImport} />
          </label>
          <p className="text-xs text-gray-400">ملفات .json فقط</p>
        </div>
      </div>

      {/* Individual Data Keys */}
      <div className="bg-white rounded-2xl shadow-sm p-6">
        <h2 className="font-bold text-gray-700 mb-4 flex items-center gap-2">
          <RefreshCw size={17} className="text-[#1e3a5f]" /> إدارة البيانات المنفردة
        </h2>
        <div className="space-y-2">
          {DATA_KEYS.map(({ key, label, icon: Icon, color }) => {
            const size = getSize(key);
            const count = getCount(key);
            const hasData = size !== null;
            return (
              <div key={key}
                className="flex items-center gap-3 p-3 rounded-xl border border-gray-100 hover:bg-gray-50 transition">
                <Icon size={17} className={color} />
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-gray-700">{label}</p>
                  <p className="text-xs text-gray-400">
                    {hasData
                      ? <><span className="text-green-600">✓</span> {typeof count === 'number' ? `${count} عنصر` : count} · {size}</>
                      : <span className="text-gray-400">لا توجد بيانات</span>}
                  </p>
                </div>
                <div className="flex items-center gap-2 shrink-0">
                  <button onClick={() => exportSingle(key, label)} disabled={!hasData}
                    className="p-1.5 text-gray-400 hover:text-[#1e3a5f] disabled:opacity-30 transition rounded-lg hover:bg-gray-100"
                    title="تصدير">
                    <Download size={14} />
                  </button>
                  <button onClick={() => clearKey(key, label)} disabled={!hasData}
                    className="p-1.5 text-gray-400 hover:text-red-500 disabled:opacity-30 transition rounded-lg hover:bg-red-50"
                    title="حذف">
                    <Trash2 size={14} />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Danger Zone */}
      <div className="bg-white rounded-2xl shadow-sm p-6 border border-red-100">
        <h2 className="font-bold text-red-700 mb-2 flex items-center gap-2">
          <AlertTriangle size={17} /> منطقة الخطر
        </h2>
        <p className="text-sm text-gray-500 mb-4">إعادة تعيين كاملة للموقع — سيتم حذف جميع البيانات المخصصة وإعادة البيانات الافتراضية</p>
        <button onClick={clearAll}
          className="flex items-center gap-2 px-5 py-2.5 bg-red-600 text-white rounded-xl hover:bg-red-700 transition text-sm font-medium">
          <Trash2 size={16} /> إعادة تعيين كاملة
        </button>
      </div>

      {/* Instructions */}
      <div className="bg-[#1e3a5f]/5 rounded-2xl p-5">
        <h3 className="font-semibold text-[#1e3a5f] mb-3 flex items-center gap-2">
          <CheckCircle size={16} /> تعليمات النقل لمحامٍ آخر
        </h3>
        <ol className="space-y-2 text-sm text-gray-600 list-decimal list-inside">
          <li>صدّر النسخة الاحتياطية الكاملة</li>
          <li>افتح لوحة تحكم الموقع الجديد</li>
          <li>في صفحة التصدير، استورد الملف</li>
          <li>انتقل إلى &ldquo;هوية الموقع&rdquo; وغيّر الاسم والألوان</li>
          <li>انتقل إلى &ldquo;الملف المهني&rdquo; وغيّر بيانات المحامي</li>
          <li>احفظ التغييرات وشاهد الموقع محدثاً فوراً</li>
        </ol>
      </div>
    </div>
  );
}
