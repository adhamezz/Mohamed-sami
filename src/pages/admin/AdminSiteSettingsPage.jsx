/**
 * AdminSiteSettingsPage.jsx
 * -------------------------
 * Full CMS site settings: company info, contact details,
 * social links, working hours, hero/about content, logo upload.
 */
import { useState, useEffect, useRef } from 'react';
import { Save, RefreshCw, Upload, X, Globe, Phone, Mail, MapPin, Clock, MessageCircle } from 'lucide-react';
import { siteSettingsService } from '../../services/adminService';
import Toast from '../../components/admin/Toast';

const FIELD = ({ label, children, hint }) => (
  <div>
    <label className="label">{label}</label>
    {children}
    {hint && <p className="text-xs text-gray-400 mt-1">{hint}</p>}
  </div>
);

export default function AdminSiteSettingsPage() {
  const [form, setForm] = useState(null);
  const [saving, setSaving] = useState(false);
  const [toast, setToast] = useState(null);
  const logoRef = useRef(null);

  useEffect(() => {
    setForm(siteSettingsService.get());
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  };

  const handleLogoChange = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (!file.type.startsWith('image/')) {
      setToast({ type: 'error', message: 'الملف يجب أن يكون صورة' });
      return;
    }
    const reader = new FileReader();
    reader.onload = (ev) => setForm(prev => ({ ...prev, logo: ev.target.result }));
    reader.readAsDataURL(file);
  };

  const handleRemoveLogo = () => setForm(prev => ({ ...prev, logo: null }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    await new Promise(r => setTimeout(r, 400));
    try {
      siteSettingsService.save(form);
      setToast({ type: 'success', message: 'تم حفظ الإعدادات بنجاح ✓' });
    } catch {
      setToast({ type: 'error', message: 'فشل الحفظ، حاول مرة أخرى' });
    } finally {
      setSaving(false);
    }
  };

  const handleReset = () => {
    if (!window.confirm('هل تريد إعادة تعيين جميع الإعدادات للقيم الافتراضية؟')) return;
    setForm(siteSettingsService.reset());
    setToast({ type: 'success', message: 'تم إعادة التعيين' });
  };

  if (!form) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="w-8 h-8 border-4 border-[#1e3a5f] border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="space-y-6 max-w-4xl" dir="rtl">
      <Toast toast={toast} onClose={() => setToast(null)} />

      <div>
        <h1 className="text-2xl font-bold text-gray-800">إعدادات الموقع الشاملة</h1>
        <p className="text-sm text-gray-500 mt-1">تحكم في كل محتوى الموقع من هنا — التغييرات تظهر فوراً</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* ── Logo ── */}
        <section className="bg-white rounded-2xl shadow-sm p-6">
          <h2 className="font-bold text-gray-700 mb-5 pb-2 border-b flex items-center gap-2">
            <Globe size={18} className="text-[#1e3a5f]" /> الشعار والهوية
          </h2>
          <div className="flex items-start gap-6">
            <div className="shrink-0">
              {form.logo ? (
                <div className="relative w-24 h-24">
                  <img src={form.logo} alt="Logo" className="w-24 h-24 object-contain rounded-xl border border-gray-200 bg-gray-50" />
                  <button type="button" onClick={handleRemoveLogo}
                    className="absolute -top-2 -left-2 w-6 h-6 bg-red-500 text-white rounded-full flex items-center justify-center hover:bg-red-600">
                    <X size={12} />
                  </button>
                </div>
              ) : (
                <div className="w-24 h-24 rounded-xl border-2 border-dashed border-gray-300 flex flex-col items-center justify-center text-gray-400 text-xs gap-1 bg-gray-50">
                  <Globe size={24} />
                  <span>الشعار</span>
                </div>
              )}
            </div>
            <div className="flex-1 space-y-3">
              <button type="button" onClick={() => logoRef.current?.click()}
                className="btn-secondary flex items-center gap-2 text-sm">
                <Upload size={15} /> رفع شعار
              </button>
              <input ref={logoRef} type="file" accept="image/*" className="hidden" onChange={handleLogoChange} />
              <p className="text-xs text-gray-400">PNG أو JPG أو SVG، يُفضل خلفية شفافة (PNG)</p>
              <FIELD label="اسم الموقع / الشركة">
                <input name="siteName" value={form.siteName} onChange={handleChange} className="input" />
              </FIELD>
              <FIELD label="وصف الموقع" hint="يُستخدم في الـ SEO">
                <textarea name="siteDescription" value={form.siteDescription} onChange={handleChange} className="input resize-none" rows={2} />
              </FIELD>
            </div>
          </div>
        </section>

        {/* ── Contact Info ── */}
        <section className="bg-white rounded-2xl shadow-sm p-6">
          <h2 className="font-bold text-gray-700 mb-5 pb-2 border-b flex items-center gap-2">
            <Phone size={18} className="text-[#1e3a5f]" /> معلومات التواصل
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <FIELD label="رقم الهاتف">
              <input name="phone" value={form.phone} onChange={handleChange} className="input" dir="ltr" />
            </FIELD>
            <FIELD label="رقم الفاكس">
              <input name="fax" value={form.fax} onChange={handleChange} className="input" dir="ltr" />
            </FIELD>
            <FIELD label="البريد الإلكتروني">
              <input type="email" name="email" value={form.email} onChange={handleChange} className="input" dir="ltr" />
            </FIELD>
            <FIELD label="رقم واتساب" hint="بدون + مثال: 971506207021">
              <input name="whatsapp" value={form.whatsapp} onChange={handleChange} className="input" dir="ltr" />
            </FIELD>
            <div className="sm:col-span-2">
              <FIELD label="العنوان">
                <input name="address" value={form.address} onChange={handleChange} className="input" />
              </FIELD>
            </div>
            <div className="sm:col-span-2">
              <FIELD label="ساعات العمل">
                <input name="workingHours" value={form.workingHours} onChange={handleChange} className="input" />
              </FIELD>
            </div>
          </div>
        </section>

        {/* ── Social Links ── */}
        <section className="bg-white rounded-2xl shadow-sm p-6">
          <h2 className="font-bold text-gray-700 mb-5 pb-2 border-b flex items-center gap-2">
            <MessageCircle size={18} className="text-[#1e3a5f]" /> الروابط الاجتماعية
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <FIELD label="Facebook">
              <input name="facebook" value={form.facebook} onChange={handleChange} className="input" dir="ltr" placeholder="https://facebook.com/..." />
            </FIELD>
            <FIELD label="Instagram">
              <input name="instagram" value={form.instagram} onChange={handleChange} className="input" dir="ltr" placeholder="https://instagram.com/..." />
            </FIELD>
            <FIELD label="LinkedIn">
              <input name="linkedin" value={form.linkedin} onChange={handleChange} className="input" dir="ltr" placeholder="https://linkedin.com/in/..." />
            </FIELD>
            <FIELD label="Twitter / X">
              <input name="twitter" value={form.twitter || ''} onChange={handleChange} className="input" dir="ltr" placeholder="https://x.com/..." />
            </FIELD>
          </div>
        </section>

        {/* ── Page Content ── */}
        <section className="bg-white rounded-2xl shadow-sm p-6">
          <h2 className="font-bold text-gray-700 mb-5 pb-2 border-b flex items-center gap-2">
            <Globe size={18} className="text-[#1e3a5f]" /> محتوى الصفحات
          </h2>
          <div className="space-y-4">
            <FIELD label="رسالة الترحيب (تظهر في البانر الرئيسي)">
              <input name="welcomeMessage" value={form.welcomeMessage} onChange={handleChange} className="input" />
            </FIELD>
            <FIELD label="عنوان الصفحة الرئيسية (Hero Title)">
              <input name="heroTitle" value={form.heroTitle} onChange={handleChange} className="input" />
            </FIELD>
            <FIELD label="وصف الصفحة الرئيسية (Hero Subtitle)">
              <textarea name="heroSubtitle" value={form.heroSubtitle} onChange={handleChange} className="input resize-none" rows={3} />
            </FIELD>
            <FIELD label="عنوان قسم عن المستشار">
              <input name="aboutTitle" value={form.aboutTitle} onChange={handleChange} className="input" />
            </FIELD>
            <FIELD label="نص قسم عن المستشار">
              <textarea name="aboutText" value={form.aboutText} onChange={handleChange} className="input resize-none" rows={4} />
            </FIELD>
          </div>
        </section>

        {/* ── Colors ── */}
        <section className="bg-white rounded-2xl shadow-sm p-6">
          <h2 className="font-bold text-gray-700 mb-5 pb-2 border-b">الألوان</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <div>
              <label className="label">اللون الرئيسي</label>
              <div className="flex items-center gap-3">
                <input type="color" name="primaryColor" value={form.primaryColor} onChange={handleChange}
                  className="w-12 h-10 rounded-lg border border-gray-200 cursor-pointer p-1" />
                <input name="primaryColor" value={form.primaryColor} onChange={handleChange} className="input flex-1 font-mono" />
              </div>
            </div>
            <div>
              <label className="label">اللون المميز</label>
              <div className="flex items-center gap-3">
                <input type="color" name="accentColor" value={form.accentColor} onChange={handleChange}
                  className="w-12 h-10 rounded-lg border border-gray-200 cursor-pointer p-1" />
                <input name="accentColor" value={form.accentColor} onChange={handleChange} className="input flex-1 font-mono" />
              </div>
            </div>
            <div className="sm:col-span-2 flex gap-3">
              <div className="flex-1 h-12 rounded-xl flex items-center justify-center text-white text-sm font-medium"
                style={{ backgroundColor: form.primaryColor }}>اللون الرئيسي</div>
              <div className="flex-1 h-12 rounded-xl flex items-center justify-center text-white text-sm font-medium"
                style={{ backgroundColor: form.accentColor }}>اللون المميز</div>
            </div>
          </div>
        </section>

        <div className="flex gap-3">
          <button type="submit" disabled={saving} className="btn-primary flex items-center gap-2 px-6">
            {saving ? <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" /> : <Save size={16} />}
            {saving ? 'جارٍ الحفظ...' : 'حفظ الإعدادات'}
          </button>
          <button type="button" onClick={handleReset} className="btn-secondary flex items-center gap-2 px-6">
            <RefreshCw size={16} /> إعادة التعيين
          </button>
        </div>
      </form>
    </div>
  );
}
