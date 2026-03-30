/**
 * AdminSettingsPage.jsx
 * ----------------------
 * Site-wide configuration form.
 * Persists settings to localStorage.
 *
 * TODO: Replace settingsService calls with real API endpoints:
 *   GET /api/settings
 *   PUT /api/settings
 */
import { useState, useEffect } from 'react';
import { Save, RefreshCw } from 'lucide-react';
import { settingsService } from '../../services/adminService';
import Toast from '../../components/admin/Toast';

export default function AdminSettingsPage() {
  const [form, setForm] = useState(null);
  const [saving, setSaving] = useState(false);
  const [toast, setToast] = useState(null);

  useEffect(() => {
    // TODO: Replace with: const settings = await fetch('/api/settings').then(r => r.json());
    setForm(settingsService.get());
  }, []);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm(prev => ({ ...prev, [name]: type === 'checkbox' ? checked : value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    await new Promise(r => setTimeout(r, 600)); // Simulate async
    try {
      // TODO: Replace with: await fetch('/api/settings', { method: 'PUT', body: JSON.stringify(form) });
      settingsService.save(form);
      setToast({ type: 'success', message: 'تم حفظ الإعدادات بنجاح' });
    } catch {
      setToast({ type: 'error', message: 'فشل الحفظ، حاول مرة أخرى' });
    } finally {
      setSaving(false);
    }
  };

  const handleReset = () => {
    setForm(settingsService.get());
  };

  if (!form) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="w-8 h-8 border-4 border-[#1e3a5f] border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="space-y-6" dir="rtl">
      <Toast toast={toast} onClose={() => setToast(null)} />

      <div>
        <h1 className="text-2xl font-bold text-gray-800">إعدادات الموقع</h1>
        <p className="text-sm text-gray-500">إدارة الإعدادات العامة للموقع</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* General Settings */}
        <section className="bg-white rounded-2xl shadow-sm p-6">
          <h2 className="font-bold text-gray-700 mb-5 pb-2 border-b">الإعدادات العامة</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <div className="sm:col-span-2">
              <label className="label">اسم الموقع</label>
              <input
                name="siteTitle"
                value={form.siteTitle}
                onChange={handleChange}
                className="input"
                placeholder="اسم موقعك"
              />
            </div>
            <div className="sm:col-span-2">
              <label className="label">وصف الموقع</label>
              <textarea
                name="siteDescription"
                value={form.siteDescription}
                onChange={handleChange}
                className="input resize-none"
                rows={3}
                placeholder="وصف مختصر للموقع..."
              />
              <p className="text-xs text-gray-400 mt-1">يُستخدم في الـ SEO ومحركات البحث</p>
            </div>
            <div>
              <label className="label">البريد الإلكتروني للتواصل</label>
              <input
                type="email"
                name="contactEmail"
                value={form.contactEmail}
                onChange={handleChange}
                className="input"
              />
            </div>
            <div>
              <label className="label">رقم واتساب</label>
              <input
                name="whatsapp"
                value={form.whatsapp}
                onChange={handleChange}
                className="input"
                dir="ltr"
              />
            </div>
          </div>
        </section>

        {/* Theme Settings */}
        <section className="bg-white rounded-2xl shadow-sm p-6">
          <h2 className="font-bold text-gray-700 mb-5 pb-2 border-b">إعدادات المظهر</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <div>
              <label className="label">اللون الرئيسي</label>
              <div className="flex items-center gap-3">
                <input
                  type="color"
                  name="primaryColor"
                  value={form.primaryColor}
                  onChange={handleChange}
                  className="w-12 h-10 rounded-lg border border-gray-200 cursor-pointer p-1"
                />
                <input
                  name="primaryColor"
                  value={form.primaryColor}
                  onChange={handleChange}
                  className="input flex-1 font-mono"
                  placeholder="#1e3a5f"
                />
              </div>
            </div>
            <div>
              <label className="label">اللون المميز</label>
              <div className="flex items-center gap-3">
                <input
                  type="color"
                  name="accentColor"
                  value={form.accentColor}
                  onChange={handleChange}
                  className="w-12 h-10 rounded-lg border border-gray-200 cursor-pointer p-1"
                />
                <input
                  name="accentColor"
                  value={form.accentColor}
                  onChange={handleChange}
                  className="input flex-1 font-mono"
                  placeholder="#d4af37"
                />
              </div>
            </div>
            {/* Color Preview */}
            <div className="sm:col-span-2">
              <p className="label mb-2">معاينة الألوان</p>
              <div className="flex gap-3">
                <div
                  className="flex-1 h-12 rounded-xl flex items-center justify-center text-white text-sm font-medium"
                  style={{ backgroundColor: form.primaryColor }}
                >
                  اللون الرئيسي
                </div>
                <div
                  className="flex-1 h-12 rounded-xl flex items-center justify-center text-white text-sm font-medium"
                  style={{ backgroundColor: form.accentColor }}
                >
                  اللون المميز
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Maintenance Mode */}
        <section className="bg-white rounded-2xl shadow-sm p-6">
          <h2 className="font-bold text-gray-700 mb-5 pb-2 border-b">إعدادات متقدمة</h2>
          <label className="flex items-center gap-3 cursor-pointer select-none">
            <div className="relative">
              <input
                type="checkbox"
                name="maintenanceMode"
                checked={form.maintenanceMode}
                onChange={handleChange}
                className="sr-only"
              />
              <div className={`w-12 h-6 rounded-full transition-colors ${form.maintenanceMode ? 'bg-red-500' : 'bg-gray-300'}`}>
                <div className={`absolute top-1 w-4 h-4 bg-white rounded-full shadow transition-all ${form.maintenanceMode ? 'left-7' : 'left-1'}`} />
              </div>
            </div>
            <div>
              <p className="font-medium text-gray-800">وضع الصيانة</p>
              <p className="text-xs text-gray-500">عند التفعيل، سيُعرض للزوار صفحة صيانة</p>
            </div>
          </label>
        </section>

        {/* Action Buttons */}
        <div className="flex gap-3">
          <button
            type="submit"
            disabled={saving}
            className="btn-primary flex items-center gap-2 px-6"
          >
            {saving
              ? <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
              : <Save size={16} />
            }
            {saving ? 'جارٍ الحفظ...' : 'حفظ الإعدادات'}
          </button>
          <button type="button" onClick={handleReset} className="btn-secondary flex items-center gap-2 px-6">
            <RefreshCw size={16} />
            إعادة التعيين
          </button>
        </div>
      </form>
    </div>
  );
}
