/**
 * AdminBrandingPage.jsx
 * ----------------------
 * تخصيص هوية الموقع: الشعار، الألوان، المعلومات الأساسية، الروابط الاجتماعية.
 */
import { useState, useEffect, useRef } from 'react';
import {
  Save, RefreshCw, Upload, X, Palette, Globe, Phone,
  Mail, MapPin, Clock, Facebook, Instagram, Linkedin,
  Twitter, MessageCircle, Eye, CheckCircle,
} from 'lucide-react';
import { siteSettingsService } from '../../services/adminService';
import Toast from '../../components/admin/Toast';

const FIELD = ({ label, children, hint }) => (
  <div>
    <label className="block text-sm font-medium text-gray-700 mb-1">{label}</label>
    {children}
    {hint && <p className="text-xs text-gray-400 mt-1">{hint}</p>}
  </div>
);

const PRESET_COLORS = [
  { primary: '#1e3a5f', accent: '#d4af37', label: 'أزرق ذهبي (افتراضي)' },
  { primary: '#1a1a2e', accent: '#e94560', label: 'أسود أحمر' },
  { primary: '#0f3460', accent: '#16213e', label: 'أزرق داكن' },
  { primary: '#2d6a4f', accent: '#40916c', label: 'أخضر طبيعي' },
  { primary: '#6a0572', accent: '#e040fb', label: 'بنفسجي' },
  { primary: '#7c3009', accent: '#c05621', label: 'بني كلاسيكي' },
];

export default function AdminBrandingPage() {
  const [form, setForm] = useState(null);
  const [saving, setSaving] = useState(false);
  const [toast, setToast] = useState(null);
  const [activeTab, setActiveTab] = useState('identity');
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

  const handlePreset = (preset) => {
    setForm(prev => ({ ...prev, primaryColor: preset.primary, accentColor: preset.accent }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    await new Promise(r => setTimeout(r, 400));
    try {
      siteSettingsService.save(form);
      setToast({ type: 'success', message: 'تم حفظ هوية الموقع بنجاح ✓' });
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

  const TABS = [
    { id: 'identity', label: 'الهوية البصرية', icon: Palette },
    { id: 'contact', label: 'معلومات التواصل', icon: Phone },
    { id: 'social', label: 'الشبكات الاجتماعية', icon: Globe },
    { id: 'content', label: 'محتوى الصفحات', icon: Globe },
  ];

  return (
    <div className="space-y-6 max-w-4xl" dir="rtl">
      <Toast toast={toast} onClose={() => setToast(null)} />

      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">هوية الموقع والتخصيص</h1>
          <p className="text-sm text-gray-500 mt-1">تحكم في مظهر وهوية الموقع بالكامل</p>
        </div>
        <a href="/" target="_blank" rel="noopener noreferrer"
          className="hidden sm:flex items-center gap-2 text-sm text-[#1e3a5f] border border-[#1e3a5f]/30 rounded-lg px-3 py-2 hover:bg-[#1e3a5f]/5 transition">
          <Eye size={15} /> معاينة الموقع
        </a>
      </div>

      {/* Tabs */}
      <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
        <div className="flex border-b overflow-x-auto">
          {TABS.map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-2 px-5 py-3 text-sm font-medium whitespace-nowrap transition border-b-2 -mb-px
                ${activeTab === tab.id
                  ? 'border-[#1e3a5f] text-[#1e3a5f] bg-[#1e3a5f]/5'
                  : 'border-transparent text-gray-500 hover:text-gray-700'}`}
            >
              <tab.icon size={15} />
              {tab.label}
            </button>
          ))}
        </div>

        <form onSubmit={handleSubmit}>
          <div className="p-6 space-y-6">

            {/* ── Identity Tab ── */}
            {activeTab === 'identity' && (
              <>
                {/* Logo Section */}
                <section>
                  <h3 className="font-semibold text-gray-700 mb-4 flex items-center gap-2">
                    <Globe size={16} className="text-[#1e3a5f]" /> الشعار
                  </h3>
                  <div className="flex items-start gap-6">
                    <div className="shrink-0">
                      {form.logo ? (
                        <div className="relative w-28 h-28">
                          <img src={form.logo} alt="Logo"
                            className="w-28 h-28 object-contain rounded-xl border-2 border-gray-200 bg-gray-50 p-2" />
                          <button type="button" onClick={() => setForm(prev => ({ ...prev, logo: null }))}
                            className="absolute -top-2 -left-2 w-6 h-6 bg-red-500 text-white rounded-full flex items-center justify-center hover:bg-red-600 shadow">
                            <X size={12} />
                          </button>
                        </div>
                      ) : (
                        <div className="w-28 h-28 rounded-xl border-2 border-dashed border-gray-300 flex flex-col items-center justify-center text-gray-400 text-xs gap-2 bg-gray-50">
                          <Globe size={28} />
                          <span>الشعار</span>
                        </div>
                      )}
                    </div>
                    <div className="flex-1 space-y-3">
                      <button type="button" onClick={() => logoRef.current?.click()}
                        className="inline-flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg text-sm text-gray-700 hover:bg-gray-50 transition">
                        <Upload size={15} /> رفع شعار جديد
                      </button>
                      <input ref={logoRef} type="file" accept="image/*" className="hidden" onChange={handleLogoChange} />
                      <p className="text-xs text-gray-400">PNG أو SVG بخلفية شفافة يُفضل — الحجم المقترح 200×200px</p>
                      <FIELD label="اسم الموقع / الشركة">
                        <input name="siteName" value={form.siteName} onChange={handleChange}
                          className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#1e3a5f]/30" />
                      </FIELD>
                      <FIELD label="وصف الموقع" hint="يُستخدم في نتائج البحث (SEO)">
                        <textarea name="siteDescription" value={form.siteDescription} onChange={handleChange}
                          className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#1e3a5f]/30 resize-none" rows={2} />
                      </FIELD>
                    </div>
                  </div>
                </section>

                {/* Colors Section */}
                <section>
                  <h3 className="font-semibold text-gray-700 mb-4 flex items-center gap-2">
                    <Palette size={16} className="text-[#1e3a5f]" /> الألوان
                  </h3>

                  {/* Preset Colors */}
                  <div className="mb-5">
                    <p className="text-sm text-gray-500 mb-3">اختر من الأنماط الجاهزة:</p>
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                      {PRESET_COLORS.map((preset, i) => (
                        <button key={i} type="button" onClick={() => handlePreset(preset)}
                          className={`flex items-center gap-3 p-3 rounded-xl border-2 transition hover:shadow-sm
                            ${form.primaryColor === preset.primary && form.accentColor === preset.accent
                              ? 'border-[#1e3a5f] bg-[#1e3a5f]/5'
                              : 'border-gray-200 hover:border-gray-300'}`}>
                          <div className="flex gap-1 shrink-0">
                            <div className="w-5 h-5 rounded-full" style={{ backgroundColor: preset.primary }} />
                            <div className="w-5 h-5 rounded-full" style={{ backgroundColor: preset.accent }} />
                          </div>
                          <span className="text-xs text-gray-600 text-right">{preset.label}</span>
                          {form.primaryColor === preset.primary && form.accentColor === preset.accent && (
                            <CheckCircle size={14} className="text-[#1e3a5f] mr-auto shrink-0" />
                          )}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Custom Colors */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">اللون الرئيسي</label>
                      <div className="flex items-center gap-3">
                        <input type="color" name="primaryColor" value={form.primaryColor} onChange={handleChange}
                          className="w-12 h-10 rounded-lg border border-gray-200 cursor-pointer p-1" />
                        <input name="primaryColor" value={form.primaryColor} onChange={handleChange}
                          className="flex-1 border border-gray-300 rounded-lg px-3 py-2 text-sm font-mono focus:outline-none focus:ring-2 focus:ring-[#1e3a5f]/30" />
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">اللون المميز (الذهبي)</label>
                      <div className="flex items-center gap-3">
                        <input type="color" name="accentColor" value={form.accentColor} onChange={handleChange}
                          className="w-12 h-10 rounded-lg border border-gray-200 cursor-pointer p-1" />
                        <input name="accentColor" value={form.accentColor} onChange={handleChange}
                          className="flex-1 border border-gray-300 rounded-lg px-3 py-2 text-sm font-mono focus:outline-none focus:ring-2 focus:ring-[#1e3a5f]/30" />
                      </div>
                    </div>
                    <div className="sm:col-span-2">
                      <p className="text-sm text-gray-500 mb-2">معاينة الألوان:</p>
                      <div className="flex gap-3 rounded-xl overflow-hidden border border-gray-200">
                        <div className="flex-1 h-14 flex items-center justify-center text-white text-sm font-medium"
                          style={{ backgroundColor: form.primaryColor }}>اللون الرئيسي</div>
                        <div className="flex-1 h-14 flex items-center justify-center text-white text-sm font-medium"
                          style={{ backgroundColor: form.accentColor }}>اللون المميز</div>
                      </div>
                    </div>
                  </div>
                </section>
              </>
            )}

            {/* ── Contact Tab ── */}
            {activeTab === 'contact' && (
              <section>
                <h3 className="font-semibold text-gray-700 mb-4 flex items-center gap-2">
                  <Phone size={16} className="text-[#1e3a5f]" /> معلومات التواصل
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <FIELD label="رقم الهاتف">
                    <div className="flex items-center gap-2">
                      <Phone size={15} className="text-gray-400 shrink-0" />
                      <input name="phone" value={form.phone} onChange={handleChange}
                        className="flex-1 border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#1e3a5f]/30" dir="ltr" />
                    </div>
                  </FIELD>
                  <FIELD label="رقم الفاكس">
                    <div className="flex items-center gap-2">
                      <Phone size={15} className="text-gray-400 shrink-0" />
                      <input name="fax" value={form.fax} onChange={handleChange}
                        className="flex-1 border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#1e3a5f]/30" dir="ltr" />
                    </div>
                  </FIELD>
                  <FIELD label="البريد الإلكتروني">
                    <div className="flex items-center gap-2">
                      <Mail size={15} className="text-gray-400 shrink-0" />
                      <input type="email" name="email" value={form.email} onChange={handleChange}
                        className="flex-1 border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#1e3a5f]/30" dir="ltr" />
                    </div>
                  </FIELD>
                  <FIELD label="رقم واتساب" hint="بدون + مثال: 971506207021">
                    <div className="flex items-center gap-2">
                      <MessageCircle size={15} className="text-gray-400 shrink-0" />
                      <input name="whatsapp" value={form.whatsapp} onChange={handleChange}
                        className="flex-1 border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#1e3a5f]/30" dir="ltr" />
                    </div>
                  </FIELD>
                  <div className="sm:col-span-2">
                    <FIELD label="العنوان">
                      <div className="flex items-center gap-2">
                        <MapPin size={15} className="text-gray-400 shrink-0" />
                        <input name="address" value={form.address} onChange={handleChange}
                          className="flex-1 border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#1e3a5f]/30" />
                      </div>
                    </FIELD>
                  </div>
                  <div className="sm:col-span-2">
                    <FIELD label="ساعات العمل">
                      <div className="flex items-center gap-2">
                        <Clock size={15} className="text-gray-400 shrink-0" />
                        <input name="workingHours" value={form.workingHours} onChange={handleChange}
                          className="flex-1 border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#1e3a5f]/30" />
                      </div>
                    </FIELD>
                  </div>
                </div>
              </section>
            )}

            {/* ── Social Tab ── */}
            {activeTab === 'social' && (
              <section>
                <h3 className="font-semibold text-gray-700 mb-4 flex items-center gap-2">
                  <Globe size={16} className="text-[#1e3a5f]" /> الشبكات الاجتماعية
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  {[
                    { name: 'facebook', label: 'Facebook', icon: Facebook, placeholder: 'https://facebook.com/...' },
                    { name: 'instagram', label: 'Instagram', icon: Instagram, placeholder: 'https://instagram.com/...' },
                    { name: 'linkedin', label: 'LinkedIn', icon: Linkedin, placeholder: 'https://linkedin.com/in/...' },
                    { name: 'twitter', label: 'Twitter / X', icon: Twitter, placeholder: 'https://x.com/...' },
                    { name: 'youtube', label: 'YouTube', icon: Globe, placeholder: 'https://youtube.com/...' },
                    { name: 'tiktok', label: 'TikTok', icon: Globe, placeholder: 'https://tiktok.com/@...' },
                  ].map(({ name, label, icon: Icon, placeholder }) => (
                    <FIELD key={name} label={label}>
                      <div className="flex items-center gap-2">
                        <Icon size={15} className="text-gray-400 shrink-0" />
                        <input name={name} value={form[name] || ''} onChange={handleChange}
                          placeholder={placeholder}
                          className="flex-1 border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#1e3a5f]/30" dir="ltr" />
                      </div>
                    </FIELD>
                  ))}
                </div>
              </section>
            )}

            {/* ── Content Tab ── */}
            {activeTab === 'content' && (
              <section>
                <h3 className="font-semibold text-gray-700 mb-4 flex items-center gap-2">
                  <Globe size={16} className="text-[#1e3a5f]" /> محتوى الصفحات
                </h3>
                <div className="space-y-4">
                  <FIELD label="رسالة الترحيب (تظهر في شريط الإشعارات)">
                    <input name="welcomeMessage" value={form.welcomeMessage} onChange={handleChange}
                      className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#1e3a5f]/30" />
                  </FIELD>
                  <FIELD label="عنوان الصفحة الرئيسية (Hero)">
                    <input name="heroTitle" value={form.heroTitle} onChange={handleChange}
                      className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#1e3a5f]/30" />
                  </FIELD>
                  <FIELD label="وصف الصفحة الرئيسية">
                    <textarea name="heroSubtitle" value={form.heroSubtitle} onChange={handleChange}
                      className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#1e3a5f]/30 resize-none" rows={3} />
                  </FIELD>
                  <FIELD label='عنوان قسم "عن المستشار"'>
                    <input name="aboutTitle" value={form.aboutTitle} onChange={handleChange}
                      className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#1e3a5f]/30" />
                  </FIELD>
                  <FIELD label='نص قسم "عن المستشار"'>
                    <textarea name="aboutText" value={form.aboutText} onChange={handleChange}
                      className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#1e3a5f]/30 resize-none" rows={5} />
                  </FIELD>
                  <FIELD label="نص التذييل (Footer)">
                    <input name="footerText" value={form.footerText || ''} onChange={handleChange}
                      className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#1e3a5f]/30" />
                  </FIELD>
                </div>
              </section>
            )}
          </div>

          <div className="px-6 pb-6 flex gap-3">
            <button type="submit" disabled={saving}
              className="flex items-center gap-2 px-6 py-2.5 bg-[#1e3a5f] text-white rounded-xl hover:bg-[#162d4a] transition disabled:opacity-60 text-sm font-medium">
              {saving ? <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" /> : <Save size={16} />}
              {saving ? 'جارٍ الحفظ...' : 'حفظ التغييرات'}
            </button>
            <button type="button" onClick={handleReset}
              className="flex items-center gap-2 px-6 py-2.5 border border-gray-300 text-gray-700 rounded-xl hover:bg-gray-50 transition text-sm font-medium">
              <RefreshCw size={16} /> إعادة التعيين
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
