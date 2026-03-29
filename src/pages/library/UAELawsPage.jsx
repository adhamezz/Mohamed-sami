import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Scale, Search, FileText, ChevronDown, ChevronUp, ArrowRight, Calendar, Hash, Download } from 'lucide-react'
import { downloadDocument } from '../../utils/downloadHelper'

const laws = [
  { id: 1, title: 'قانون المعاملات المدنية الاتحادي', number: 'رقم 5 لسنة 1985', category: 'قانون مدني', year: 1985, articles: 1033, description: 'ينظم المعاملات المدنية والالتزامات والعقود في الإمارات', lastAmendment: '2023', url: 'https://elaws.moj.gov.ae/UAE-MOJ_LC-Ar/00_CIVIL%20TRANSACTIONS%20AND%20LAWS/UAE-LC-Ar_1985-00005.html' },
  { id: 2, title: 'قانون العقوبات الاتحادي', number: 'مرسوم بقانون اتحادي رقم 31 لسنة 2021', category: 'قانون جنائي', year: 2021, articles: 452, description: 'قانون العقوبات الاتحادي المحدث الذي حل محل القانون رقم 3 لسنة 1987', lastAmendment: '2024', url: 'https://elaws.moj.gov.ae/UAE-MOJ_LC-Ar/01_PENAL%20LAWS%20AND%20PROCEDURES/UAE-LC-Ar_2021-00031.html' },
  { id: 3, title: 'قانون الإجراءات المدنية', number: 'مرسوم بقانون اتحادي رقم 42 لسنة 2022', category: 'قانون المرافعات', year: 2022, articles: 310, description: 'ينظم إجراءات التقاضي أمام المحاكم المدنية والتجارية', lastAmendment: '2024', url: 'https://elaws.moj.gov.ae/UAE-MOJ_LC-Ar/00_CIVIL%20TRANSACTIONS%20AND%20LAWS/UAE-LC-Ar_2022-00042.html' },
  { id: 4, title: 'قانون الأحوال الشخصية', number: 'رقم 28 لسنة 2005', category: 'أحوال شخصية', year: 2005, articles: 363, description: 'ينظم أحكام الزواج والطلاق والنفقة والميراث', lastAmendment: '2023', url: 'https://elaws.moj.gov.ae/UAE-MOJ_LC-Ar/02_PERSONAL%20STATUS/UAE-LC-Ar_2005-00028.html' },
  { id: 5, title: 'قانون المعاملات التجارية', number: 'رقم 18 لسنة 1993', category: 'قانون تجاري', year: 1993, articles: 408, description: 'ينظم الأعمال التجارية والتجار والأوراق التجارية', lastAmendment: '2023', url: 'https://elaws.moj.gov.ae/UAE-MOJ_LC-Ar/03_COMMERCIAL%20TRANSACTIONS/UAE-LC-Ar_1993-00018.html' },
  { id: 6, title: 'قانون الشركات التجارية', number: 'مرسوم بقانون اتحادي رقم 32 لسنة 2021', category: 'قانون تجاري', year: 2021, articles: 379, description: 'ينظم تأسيس الشركات وإدارتها وتصفيتها', lastAmendment: '2024', url: 'https://elaws.moj.gov.ae/UAE-MOJ_LC-Ar/03_COMMERCIAL%20TRANSACTIONS/UAE-LC-Ar_2021-00032.html' },
  { id: 7, title: 'قانون تنظيم علاقات العمل', number: 'مرسوم بقانون اتحادي رقم 33 لسنة 2021', category: 'قانون عمل', year: 2021, articles: 74, description: 'قانون العمل الإماراتي الجديد الذي دخل حيز التنفيذ فبراير 2022', lastAmendment: '2024', url: 'https://elaws.moj.gov.ae/UAE-MOJ_LC-Ar/04_LABOR/UAE-LC-Ar_2021-00033.html' },
  { id: 8, title: 'قانون الإيجارات في إمارة دبي', number: 'رقم 26 لسنة 2007', category: 'قانون مدني', year: 2007, articles: 36, description: 'ينظم العلاقة بين المؤجر والمستأجر في إمارة دبي', lastAmendment: '2023', url: 'https://dlp.dubai.gov.ae/ar/Pages/LegislationSearch.aspx' },
  { id: 9, title: 'قانون مكافحة الجرائم الإلكترونية', number: 'مرسوم بقانون اتحادي رقم 34 لسنة 2021', category: 'قانون جنائي', year: 2021, articles: 78, description: 'ينظم مكافحة جرائم تقنية المعلومات والشائعات الإلكترونية', lastAmendment: '2023', url: 'https://elaws.moj.gov.ae/UAE-MOJ_LC-Ar/01_PENAL%20LAWS%20AND%20PROCEDURES/UAE-LC-Ar_2021-00034.html' },
  { id: 10, title: 'قانون التحكيم', number: 'رقم 6 لسنة 2018', category: 'تحكيم', year: 2018, articles: 61, description: 'ينظم التحكيم كوسيلة بديلة لحل المنازعات', lastAmendment: '2022', url: 'https://elaws.moj.gov.ae/UAE-MOJ_LC-Ar/00_CIVIL%20TRANSACTIONS%20AND%20LAWS/UAE-LC-Ar_2018-00006.html' },
  { id: 11, title: 'قانون الإثبات في المعاملات المدنية والتجارية', number: 'مرسوم بقانون اتحادي رقم 35 لسنة 2022', category: 'قانون مدني', year: 2022, articles: 89, description: 'ينظم قواعد الإثبات أمام المحاكم المدنية والتجارية', lastAmendment: '2023', url: 'https://elaws.moj.gov.ae/UAE-MOJ_LC-Ar/00_CIVIL%20TRANSACTIONS%20AND%20LAWS/UAE-LC-Ar_2022-00035.html' },
  { id: 12, title: 'قانون حماية الملكية الفكرية', number: 'رقم 38 لسنة 2021', category: 'ملكية فكرية', year: 2021, articles: 67, description: 'ينظم حماية حقوق المؤلف والحقوق المجاورة', lastAmendment: '2023', url: 'https://elaws.moj.gov.ae/UAE-MOJ_LC-Ar/06_INTELLECTUAL%20PROPERTY/UAE-LC-Ar_2021-00038.html' },
  { id: 13, title: 'قانون الإجراءات الجزائية', number: 'مرسوم بقانون اتحادي رقم 38 لسنة 2022', category: 'قانون جنائي', year: 2022, articles: 348, description: 'ينظم إجراءات الدعوى الجزائية من التحقيق وحتى التنفيذ', lastAmendment: '2024', url: 'https://elaws.moj.gov.ae/UAE-MOJ_LC-Ar/01_PENAL%20LAWS%20AND%20PROCEDURES/UAE-LC-Ar_2022-00038.html' },
  { id: 14, title: 'قانون الجنسية وجوازات السفر', number: 'رقم 17 لسنة 1972', category: 'قانون دستوري', year: 1972, articles: 32, description: 'ينظم أحكام الجنسية الإماراتية واكتسابها وفقدانها وجوازات السفر', lastAmendment: '2023', url: 'https://elaws.moj.gov.ae/UAE-MOJ_LC-Ar/08_NATIONALITY%20AND%20PASSPORTS/UAE-LC-Ar_1972-00017.html' },
  { id: 15, title: 'قانون تنظيم مهنة المحاماة', number: 'رقم 23 لسنة 1991', category: 'قانون قضائي', year: 1991, articles: 58, description: 'ينظم مزاولة مهنة المحاماة وشروط القيد بالجدول والتزامات المحامين', lastAmendment: '2022', url: 'https://elaws.moj.gov.ae/UAE-MOJ_LC-Ar/07_JUDICIARY/UAE-LC-Ar_1991-00023.html' },
  { id: 16, title: 'قانون حماية المستهلك', number: 'رقم 15 لسنة 2020', category: 'قانون تجاري', year: 2020, articles: 44, description: 'ينظم حماية حقوق المستهلك ومسؤولية المزود والمعلن', lastAmendment: '2024', url: 'https://elaws.moj.gov.ae/UAE-MOJ_LC-Ar/03_COMMERCIAL%20TRANSACTIONS/UAE-LC-Ar_2020-00015.html' },
  { id: 17, title: 'قانون الإفلاس', number: 'مرسوم بقانون اتحادي رقم 51 لسنة 2023', category: 'قانون تجاري', year: 2023, articles: 235, description: 'ينظم إجراءات الإفلاس وإعادة الهيكلة والتصفية للشركات والتجار', lastAmendment: '2024', url: 'https://elaws.moj.gov.ae/UAE-MOJ_LC-Ar/03_COMMERCIAL%20TRANSACTIONS/UAE-LC-Ar_2023-00051.html' },
  { id: 18, title: 'قانون حماية البيانات الشخصية', number: 'مرسوم بقانون اتحادي رقم 45 لسنة 2021', category: 'ملكية فكرية', year: 2021, articles: 50, description: 'ينظم حماية خصوصية بيانات الأشخاص الطبيعيين ومعالجتها', lastAmendment: '2023', url: 'https://elaws.moj.gov.ae/UAE-MOJ_LC-Ar/06_INTELLECTUAL%20PROPERTY/UAE-LC-Ar_2021-00045.html' },
]

const categories = ['الكل', 'قانون مدني', 'قانون جنائي', 'قانون المرافعات', 'قانون تجاري', 'أحوال شخصية', 'قانون عمل', 'تحكيم', 'ملكية فكرية']

export default function UAELawsPage() {
  const [search, setSearch] = useState('')
  const [activeCategory, setActiveCategory] = useState('الكل')
  const [expandedId, setExpandedId] = useState(null)

  const filtered = laws.filter(l => {
    const matchSearch = !search || l.title.includes(search) || l.number.includes(search) || l.description.includes(search)
    const matchCat = activeCategory === 'الكل' || l.category === activeCategory
    return matchSearch && matchCat
  })

  return (
    <div style={{ direction: 'rtl' }}>
      <section className="relative bg-navy-900 py-16 md:py-24 overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-10 right-10 w-64 h-64 bg-gold-500 rounded-full blur-3xl" />
        </div>
        <div className="relative max-w-5xl mx-auto px-4 text-center">
          <div className="w-16 h-16 bg-gold-500/20 rounded-2xl flex items-center justify-center mx-auto mb-6">
            <Scale size={32} className="text-gold-500" />
          </div>
          <div className="flex items-center justify-center gap-3 mb-4">
            <span className="text-3xl">🇦🇪</span>
            <h1 className="text-3xl md:text-5xl font-tajawal font-bold text-white">القوانين والتشريعات الإماراتية</h1>
          </div>
          <div className="w-16 h-1 bg-gold-500 mx-auto rounded mb-5" />
          <p className="text-gray-300 font-cairo text-lg max-w-2xl mx-auto leading-relaxed">
            مجموعة شاملة من القوانين والتشريعات الاتحادية لدولة الإمارات العربية المتحدة
          </p>
          <Link to="/library" className="inline-flex items-center gap-2 mt-6 text-gold-400 hover:text-gold-300 font-cairo text-sm transition-colors"><ArrowRight size={14} /> العودة للمكتبة</Link>
        </div>
      </section>

      <section className="py-6 bg-white border-b border-gray-100">
        <div className="max-w-5xl mx-auto px-4 grid grid-cols-3 gap-4 text-center">
          <div><span className="text-2xl font-bold text-gold-500 font-tajawal">{laws.length}</span><p className="text-gray-500 font-cairo text-xs mt-1">قانون وتشريع</p></div>
          <div><span className="text-2xl font-bold text-gold-500 font-tajawal">{categories.length - 1}</span><p className="text-gray-500 font-cairo text-xs mt-1">تصنيف قانوني</p></div>
          <div><span className="text-2xl font-bold text-gold-500 font-tajawal">2024</span><p className="text-gray-500 font-cairo text-xs mt-1">آخر تحديث</p></div>
        </div>
      </section>

      <section className="bg-white border-b border-gray-100 sticky top-[104px] z-30">
        <div className="max-w-5xl mx-auto px-4 py-4">
          <div className="flex flex-col md:flex-row gap-3">
            <div className="relative flex-1">
              <Search size={16} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400" />
              <input type="text" value={search} onChange={e => setSearch(e.target.value)} placeholder="ابحث عن قانون أو تشريع..." className="w-full pr-10 pl-4 py-2.5 border border-gray-200 rounded-lg font-cairo text-sm focus:outline-none focus:border-gold-500" />
            </div>
            <div className="flex gap-2 overflow-x-auto pb-1">
              {categories.map(c => (
                <button key={c} onClick={() => setActiveCategory(c)} className={`px-3 py-2 rounded-lg text-xs font-cairo font-medium whitespace-nowrap transition-all ${activeCategory === c ? 'bg-navy-900 text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}>{c}</button>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="py-10 bg-gray-50 min-h-[60vh]">
        <div className="max-w-5xl mx-auto px-4 space-y-4">
          {filtered.map(law => (
            <div key={law.id} className="bg-white rounded-xl shadow-sm hover:shadow-md transition-all overflow-hidden">
              <button onClick={() => setExpandedId(expandedId === law.id ? null : law.id)} className="w-full px-6 py-5 flex items-center justify-between text-right">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-1.5 flex-wrap">
                    <span className="text-[11px] font-cairo bg-emerald-50 text-emerald-700 px-2 py-0.5 rounded">{law.category}</span>
                    <span className="text-[11px] font-cairo text-gray-400 flex items-center gap-1"><Hash size={10} />{law.number}</span>
                  </div>
                  <h3 className="text-lg font-tajawal font-bold text-navy-900">{law.title}</h3>
                </div>
                {expandedId === law.id ? <ChevronUp size={18} className="text-gold-500 flex-shrink-0" /> : <ChevronDown size={18} className="text-gray-400 flex-shrink-0" />}
              </button>
              {expandedId === law.id && (
                <div className="px-6 pb-5 border-t border-gray-100 pt-4">
                  <p className="text-gray-600 font-cairo text-sm leading-relaxed mb-4">{law.description}</p>
                  <div className="flex flex-wrap gap-4 text-xs text-gray-400 font-cairo mb-4">
                    <span className="flex items-center gap-1"><Calendar size={12} /> صدر عام: {law.year}</span>
                    <span className="flex items-center gap-1"><FileText size={12} /> عدد المواد: {law.articles}</span>
                    <span>آخر تعديل: {law.lastAmendment}</span>
                  </div>
                  <div className="flex items-center gap-4">
                    <a href={law.url} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-gold-500 hover:text-gold-600 font-cairo text-sm font-bold transition-colors"><FileText size={14} /> عرض نص القانون الكامل</a>
                    <button onClick={() => downloadDocument(law.title, [{ heading: `${law.title} — ${law.number}` }, { text: law.description }, { heading: 'بيانات القانون' }, { list: [`سنة الصدور: ${law.year}`, `عدد المواد: ${law.articles}`, `آخر تعديل: ${law.lastAmendment}`, `التصنيف: ${law.category}`] }], 'law')} className="flex items-center gap-2 text-navy-500 hover:text-navy-700 font-cairo text-sm transition-colors"><Download size={14} /> تحميل ملخص</button>
                  </div>
                </div>
              )}
            </div>
          ))}
          {filtered.length === 0 && (
            <div className="text-center py-16 bg-white rounded-xl"><Scale size={48} className="text-gray-300 mx-auto mb-4" /><p className="text-gray-400 font-cairo text-lg">لا توجد نتائج لبحثك</p></div>
          )}
        </div>
      </section>

      <section className="py-14 bg-navy-900">
        <div className="max-w-3xl mx-auto px-4 text-center">
          <h2 className="text-2xl font-tajawal font-bold text-white mb-4">تحتاج استشارة حول التشريعات الإماراتية؟</h2>
          <p className="text-gray-300 font-cairo mb-6">فريقنا القانوني متخصص في القوانين الإماراتية الاتحادية والمحلية</p>
          <Link to="/contact" className="inline-block px-8 py-3 bg-gold-500 text-white font-bold font-cairo rounded-lg hover:bg-gold-600 transition-colors">تواصل معنا</Link>
        </div>
      </section>
    </div>
  )
}
