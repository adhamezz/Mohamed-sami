/**
 * AdminBusinessProfilePage.jsx
 * ------------------------------
 * ملف تعريفي للمحامي / المكتب القانوني
 * يسمح بتغيير جميع بيانات المحامي لبيع الموقع لمحامٍ آخر
 */
import { useState, useEffect, useRef } from 'react';
import {
  Save, Upload, X, User, Briefcase, Award, Globe,
  Phone, Mail, MapPin, Star, Plus, Trash2,
} from 'lucide-react';
import Toast from '../../components/admin/Toast';

const STORAGE_KEY = 'cms_business_profile';

const DEFAULT_PROFILE = {
  lawyerName: 'محمد سامي',
  lawyerTitle: 'مستشار قانوني',
  lawyerPhoto: null,
  yearsExperience: '15+',
  bio: 'مستشار قانوني بخبرة أكثر من 15 سنة في مجالات القانون المختلفة في مصر والإمارات والكويت. متخصص في قضايا القانون التجاري والمدني والجنائي.',
  shortBio: 'مستشار قانوني متخصص بخبرة 15 عاماً',
  officeName: 'مكتب المستشار محمد سامي',
  officeType: 'lawyer', // lawyer | firm | consultancy
  phone: '+971 50 620 7021',
  email: 'mohamedsamy992019@gmail.com',
  address: 'الإمارات العربية المتحدة',
  licenseNumber: '',
  barAssociation: 'نقابة المحامين',
  languages: ['العربية', 'الإنجليزية'],
  specializations: ['القانون التجاري', 'القانون المدني', 'القانون الجنائي', 'قانون الأسرة'],
  education: [
    { degree: 'ليسانس الحقوق', university: 'جامعة القاهرة', year: '2005' },
  ],
  certifications: [],
  awards: [],
};

function load() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) return { ...DEFAULT_PROFILE, ...JSON.parse(raw) };
  } catch { /* ignore */ }
  return DEFAULT_PROFILE;
}

function saveProfile(data) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  window.dispatchEvent(new Event('cms-updated'));
}

const FIELD = ({ label, children, hint }) => (
  <div>
    <label className="block text-sm font-medium text-gray-700 mb-1">{label}</label>
    {children}
    {hint && <p className="text-xs text-gray-400 mt-1">{hint}</p>}
  </div>
);

const input = 'w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#1e3a5f]/30';

export default function AdminBusinessProfilePage() {
  const [form, setForm] = useState(null);
  const [saving, setSaving] = useState(false);
  const [toast, setToast] = useState(null);
  const [activeTab, setActiveTab] = useState('basic');
  const [newLang, setNewLang] = useState('');
  const [newSpec, setNewSpec] = useState('');
  const photoRef = useRef(null);

  useEffect(() => {
    setForm(load());
  }, []);

  const set = (field, value) => setForm(prev => ({ ...prev, [field]: value }));
  const handleChange = (e) => set(e.target.name, e.target.value);

  const handlePhotoChange = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (ev) => set('lawyerPhoto', ev.target.result);
    reader.readAsDataURL(file);
  };

  const addToList = (field, value, setter) => {
    if (!value.trim()) return;
    set(field, [...(form[field] || []), value.trim()]);
    setter('');
  };

  const removeFromList = (field, idx) => {
    set(field, form[field].filter((_, i) => i !== idx));
  };

  const addEducation = () => {
    set('education', [...(form.education || []), { degree: '', university: '', year: '' }]);
  };

  const updateEducation = (idx, key, val) => {
    const updated = [...form.education];
    updated[idx] = { ...updated[idx], [key]: val };
    set('education', updated);
  };

  const removeEducation = (idx) => {
    set('education', form.education.filter((_, i) => i !== idx));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    await new Promise(r => setTimeout(r, 400));
    try {
      saveProfile(form);
      setToast({ type: 'success', message: 'تم حفظ الملف المهني بنجاح ✓' });
    } catch {
      setToast({ type: 'error', message: 'فشل الحفظ، حاول مرة أخرى' });
    } finally {
      setSaving(false);
    }
  };

  if (!form) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="w-8 h-8 border-4 border-[#1e3a5f] border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  const TABS = [
    { id: 'basic', label: 'المعلومات الأساسية', icon: User },
    { id: 'contact', label: 'التواصل والترخيص', icon: Phone },
    { id: 'expertise', label: 'التخصصات والمهارات', icon: Star },
    { id: 'education', label: 'التعليم والشهادات', icon: Award },
  ];

  const OFFICE_TYPES = [
    { value: 'lawyer', label: 'محامٍ فردي' },
    { value: 'firm', label: 'مكتب محاماة' },
    { value: 'consultancy', label: 'شركة استشارات قانونية' },
    { value: 'other', label: 'أخرى' },
  ];

  return (
    <div className="space-y-6 max-w-4xl" dir="rtl">
      <Toast toast={toast} onClose={() => setToast(null)} />

      <div>
        <h1 className="text-2xl font-bold text-gray-800">الملف المهني</h1>
        <p className="text-sm text-gray-500 mt-1">بيانات المحامي / المكتب القانوني — تظهر على الموقع</p>
      </div>

      <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
        {/* Tabs */}
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

            {/* ── Basic Info ── */}
            {activeTab === 'basic' && (
              <>
                {/* Photo */}
                <section>
                  <h3 className="font-semibold text-gray-700 mb-4">الصورة الشخصية</h3>
                  <div className="flex items-start gap-6">
                    <div className="shrink-0">
                      {form.lawyerPhoto ? (
                        <div className="relative w-28 h-28">
                          <img src={form.lawyerPhoto} alt="Photo"
                            className="w-28 h-28 object-cover rounded-2xl border-2 border-gray-200" />
                          <button type="button" onClick={() => set('lawyerPhoto', null)}
                            className="absolute -top-2 -left-2 w-6 h-6 bg-red-500 text-white rounded-full flex items-center justify-center hover:bg-red-600 shadow">
                            <X size={12} />
                          </button>
                        </div>
                      ) : (
                        <div className="w-28 h-28 rounded-2xl border-2 border-dashed border-gray-300 flex flex-col items-center justify-center text-gray-400 text-xs gap-2 bg-gray-50">
                          <User size={28} />
                          <span>الصورة</span>
                        </div>
                      )}
                    </div>
                    <div className="space-y-2">
                      <button type="button" onClick={() => photoRef.current?.click()}
                        className="inline-flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg text-sm text-gray-700 hover:bg-gray-50 transition">
                        <Upload size={15} /> رفع صورة
                      </button>
                      <input ref={photoRef} type="file" accept="image/*" className="hidden" onChange={handlePhotoChange} />
                      <p className="text-xs text-gray-400">صورة احترافية — JPG أو PNG</p>
                    </div>
                  </div>
                </section>

                {/* Basic Fields */}
                <section className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <FIELD label="الاسم الكامل">
                    <input name="lawyerName" value={form.lawyerName} onChange={handleChange} className={input} />
                  </FIELD>
                  <FIELD label="اللقب المهني">
                    <input name="lawyerTitle" value={form.lawyerTitle} onChange={handleChange} className={input}
                      placeholder="مستشار قانوني / محامٍ / مدير..." />
                  </FIELD>
                  <FIELD label="اسم المكتب / الشركة">
                    <input name="officeName" value={form.officeName} onChange={handleChange} className={input} />
                  </FIELD>
                  <FIELD label="نوع النشاط">
                    <select name="officeType" value={form.officeType} onChange={handleChange} className={input}>
                      {OFFICE_TYPES.map(o => (
                        <option key={o.value} value={o.value}>{o.label}</option>
                      ))}
                    </select>
                  </FIELD>
                  <FIELD label="سنوات الخبرة">
                    <input name="yearsExperience" value={form.yearsExperience} onChange={handleChange} className={input}
                      placeholder="مثال: 15+" />
                  </FIELD>
                </section>

                {/* Bio */}
                <section className="space-y-4">
                  <FIELD label="نبذة مختصرة" hint="تظهر في بطاقة المحامي">
                    <input name="shortBio" value={form.shortBio} onChange={handleChange} className={input} />
                  </FIELD>
                  <FIELD label="السيرة الذاتية الكاملة">
                    <textarea name="bio" value={form.bio} onChange={handleChange}
                      className={`${input} resize-none`} rows={6} />
                  </FIELD>
                </section>
              </>
            )}

            {/* ── Contact & License ── */}
            {activeTab === 'contact' && (
              <section className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <FIELD label="رقم الهاتف">
                  <input name="phone" value={form.phone} onChange={handleChange} className={input} dir="ltr" />
                </FIELD>
                <FIELD label="البريد الإلكتروني">
                  <input type="email" name="email" value={form.email} onChange={handleChange} className={input} dir="ltr" />
                </FIELD>
                <div className="sm:col-span-2">
                  <FIELD label="العنوان">
                    <input name="address" value={form.address} onChange={handleChange} className={input} />
                  </FIELD>
                </div>
                <FIELD label="رقم الترخيص / القيد" hint="رقم قيد المحامي في النقابة">
                  <input name="licenseNumber" value={form.licenseNumber} onChange={handleChange} className={input} />
                </FIELD>
                <FIELD label="نقابة / جهة الترخيص">
                  <input name="barAssociation" value={form.barAssociation} onChange={handleChange} className={input} />
                </FIELD>
              </section>
            )}

            {/* ── Expertise & Skills ── */}
            {activeTab === 'expertise' && (
              <div className="space-y-6">
                {/* Specializations */}
                <section>
                  <h3 className="font-semibold text-gray-700 mb-3 flex items-center gap-2">
                    <Briefcase size={16} className="text-[#1e3a5f]" /> التخصصات
                  </h3>
                  <div className="flex flex-wrap gap-2 mb-3">
                    {(form.specializations || []).map((s, i) => (
                      <span key={i} className="flex items-center gap-1 bg-[#1e3a5f]/10 text-[#1e3a5f] text-sm px-3 py-1 rounded-full">
                        {s}
                        <button type="button" onClick={() => removeFromList('specializations', i)}
                          className="hover:text-red-500 transition">
                          <X size={12} />
                        </button>
                      </span>
                    ))}
                  </div>
                  <div className="flex gap-2">
                    <input value={newSpec} onChange={e => setNewSpec(e.target.value)}
                      onKeyDown={e => { if (e.key === 'Enter') { e.preventDefault(); addToList('specializations', newSpec, setNewSpec); } }}
                      placeholder="أضف تخصصاً..."
                      className={`flex-1 ${input}`} />
                    <button type="button" onClick={() => addToList('specializations', newSpec, setNewSpec)}
                      className="px-4 py-2 bg-[#1e3a5f] text-white rounded-lg hover:bg-[#162d4a] transition text-sm">
                      <Plus size={16} />
                    </button>
                  </div>
                </section>

                {/* Languages */}
                <section>
                  <h3 className="font-semibold text-gray-700 mb-3 flex items-center gap-2">
                    <Globe size={16} className="text-[#1e3a5f]" /> اللغات
                  </h3>
                  <div className="flex flex-wrap gap-2 mb-3">
                    {(form.languages || []).map((l, i) => (
                      <span key={i} className="flex items-center gap-1 bg-indigo-50 text-indigo-700 text-sm px-3 py-1 rounded-full">
                        {l}
                        <button type="button" onClick={() => removeFromList('languages', i)}
                          className="hover:text-red-500 transition">
                          <X size={12} />
                        </button>
                      </span>
                    ))}
                  </div>
                  <div className="flex gap-2">
                    <input value={newLang} onChange={e => setNewLang(e.target.value)}
                      onKeyDown={e => { if (e.key === 'Enter') { e.preventDefault(); addToList('languages', newLang, setNewLang); } }}
                      placeholder="أضف لغة..."
                      className={`flex-1 ${input}`} />
                    <button type="button" onClick={() => addToList('languages', newLang, setNewLang)}
                      className="px-4 py-2 bg-[#1e3a5f] text-white rounded-lg hover:bg-[#162d4a] transition text-sm">
                      <Plus size={16} />
                    </button>
                  </div>
                </section>
              </div>
            )}

            {/* ── Education ── */}
            {activeTab === 'education' && (
              <section>
                <h3 className="font-semibold text-gray-700 mb-4 flex items-center gap-2">
                  <Award size={16} className="text-[#1e3a5f]" /> المؤهلات العلمية
                </h3>
                <div className="space-y-3">
                  {(form.education || []).map((edu, idx) => (
                    <div key={idx} className="bg-gray-50 rounded-xl p-4 space-y-3 border border-gray-200">
                      <div className="flex justify-between items-center">
                        <span className="text-sm font-medium text-gray-600">مؤهل #{idx + 1}</span>
                        <button type="button" onClick={() => removeEducation(idx)}
                          className="text-red-400 hover:text-red-600 transition">
                          <Trash2 size={15} />
                        </button>
                      </div>
                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                        <FIELD label="الدرجة العلمية">
                          <input value={edu.degree} onChange={e => updateEducation(idx, 'degree', e.target.value)}
                            className={input} placeholder="ليسانس / ماجستير..." />
                        </FIELD>
                        <FIELD label="الجامعة / المؤسسة">
                          <input value={edu.university} onChange={e => updateEducation(idx, 'university', e.target.value)}
                            className={input} />
                        </FIELD>
                        <FIELD label="سنة التخرج">
                          <input value={edu.year} onChange={e => updateEducation(idx, 'year', e.target.value)}
                            className={input} placeholder="2005" />
                        </FIELD>
                      </div>
                    </div>
                  ))}
                  <button type="button" onClick={addEducation}
                    className="flex items-center gap-2 px-4 py-2 border-2 border-dashed border-gray-300 text-gray-500 rounded-xl hover:border-[#1e3a5f] hover:text-[#1e3a5f] transition text-sm w-full justify-center">
                    <Plus size={16} /> إضافة مؤهل
                  </button>
                </div>
              </section>
            )}
          </div>

          <div className="px-6 pb-6 flex gap-3">
            <button type="submit" disabled={saving}
              className="flex items-center gap-2 px-6 py-2.5 bg-[#1e3a5f] text-white rounded-xl hover:bg-[#162d4a] transition disabled:opacity-60 text-sm font-medium">
              {saving ? <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" /> : <Save size={16} />}
              {saving ? 'جارٍ الحفظ...' : 'حفظ الملف المهني'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
