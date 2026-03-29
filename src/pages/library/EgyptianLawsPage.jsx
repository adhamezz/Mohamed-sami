import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Scale, Search, FileText, ChevronDown, ChevronUp, ArrowRight, Calendar, Hash, Download } from 'lucide-react'
import { downloadDocument } from '../../utils/downloadHelper'

const laws = [
  { id: 1, title: 'القانون المدني المصري', number: 'رقم 131 لسنة 1948', category: 'قانون مدني', year: 1948, articles: 1149, description: 'ينظم العلاقات المدنية بين الأفراد والالتزامات والعقود والحقوق العينية', lastAmendment: '2023', url: 'https://manshurat.org/node/14677' },
  { id: 2, title: 'قانون العقوبات المصري', number: 'رقم 58 لسنة 1937', category: 'قانون جنائي', year: 1937, articles: 395, description: 'يحدد الجرائم والعقوبات المقررة لها في القانون المصري', lastAmendment: '2024', url: 'https://manshurat.org/node/14766' },
  { id: 3, title: 'قانون الإجراءات الجنائية', number: 'رقم 150 لسنة 1950', category: 'قانون جنائي', year: 1950, articles: 560, description: 'ينظم إجراءات الدعوى الجنائية من التحقيق حتى صدور الحكم', lastAmendment: '2024', url: 'https://manshurat.org/node/14769' },
  { id: 4, title: 'قانون المرافعات المدنية والتجارية', number: 'رقم 13 لسنة 1968', category: 'قانون المرافعات', year: 1968, articles: 301, description: 'ينظم إجراءات التقاضي أمام المحاكم المدنية والتجارية', lastAmendment: '2023', url: 'https://manshurat.org/node/14686' },
  { id: 5, title: 'قانون الأحوال الشخصية', number: 'رقم 25 لسنة 1929', category: 'أحوال شخصية', year: 1929, articles: 180, description: 'ينظم أحكام الزواج والطلاق والنفقة والحضانة', lastAmendment: '2024', url: 'https://manshurat.org/node/14700' },
  { id: 6, title: 'قانون العمل', number: 'رقم 12 لسنة 2003', category: 'قانون عمل', year: 2003, articles: 257, description: 'ينظم علاقات العمل بين أصحاب الأعمال والعمال', lastAmendment: '2023', url: 'https://manshurat.org/node/14715' },
  { id: 7, title: 'قانون التجارة', number: 'رقم 17 لسنة 1999', category: 'قانون تجاري', year: 1999, articles: 735, description: 'ينظم الأعمال التجارية والتجار والشركات التجارية', lastAmendment: '2022', url: 'https://manshurat.org/node/14718' },
  { id: 8, title: 'قانون الشركات', number: 'رقم 159 لسنة 1981', category: 'قانون تجاري', year: 1981, articles: 178, description: 'ينظم تأسيس الشركات المساهمة والتوصية وذات المسؤولية المحدودة', lastAmendment: '2024', url: 'https://manshurat.org/node/14720' },
  { id: 9, title: 'قانون الإثبات', number: 'رقم 25 لسنة 1968', category: 'قانون مدني', year: 1968, articles: 103, description: 'ينظم طرق الإثبات في المواد المدنية والتجارية', lastAmendment: '2021', url: 'https://manshurat.org/node/14690' },
  { id: 10, title: 'قانون مجلس الدولة', number: 'رقم 47 لسنة 1972', category: 'قانون إداري', year: 1972, articles: 90, description: 'ينظم اختصاصات محاكم مجلس الدولة الإدارية', lastAmendment: '2023', url: 'https://manshurat.org/node/14695' },
  { id: 11, title: 'قانون المحكمة الدستورية العليا', number: 'رقم 48 لسنة 1979', category: 'قانون دستوري', year: 1979, articles: 56, description: 'ينظم اختصاصات المحكمة الدستورية العليا وإجراءات التقاضي أمامها', lastAmendment: '2022', url: 'https://manshurat.org/node/14698' },
  { id: 12, title: 'قانون حماية الملكية الفكرية', number: 'رقم 82 لسنة 2002', category: 'ملكية فكرية', year: 2002, articles: 188, description: 'ينظم حماية حقوق المؤلف وبراءات الاختراع والعلامات التجارية', lastAmendment: '2023', url: 'https://manshurat.org/node/14730' },
  { id: 13, title: 'قانون الإيجارات', number: 'رقم 136 لسنة 1981', category: 'قانون مدني', year: 1981, articles: 26, description: 'ينظم العلاقة الإيجارية بين المؤجر والمستأجر', lastAmendment: '2024', url: 'https://manshurat.org/node/14685' },
  { id: 14, title: 'قانون السلطة القضائية', number: 'رقم 46 لسنة 1972', category: 'قانون قضائي', year: 1972, articles: 162, description: 'ينظم شؤون السلطة القضائية وتعيين القضاة واختصاصاتهم', lastAmendment: '2023', url: 'https://manshurat.org/node/14697' },
  { id: 15, title: 'قانون الطفل', number: 'رقم 12 لسنة 1996', category: 'أحوال شخصية', year: 1996, articles: 144, description: 'ينظم حقوق الطفل والحماية المقررة له في مجالات الصحة والتعليم والرعاية', lastAmendment: '2023', url: 'https://manshurat.org/node/14705' },
  { id: 16, title: 'قانون البيئة', number: 'رقم 4 لسنة 1994', category: 'قانون إداري', year: 1994, articles: 107, description: 'ينظم حماية البيئة من التلوث ويحدد المعايير والاشتراطات البيئية', lastAmendment: '2024', url: 'https://manshurat.org/node/14740' },
  { id: 17, title: 'قانون الجنسية المصرية', number: 'رقم 26 لسنة 1975', category: 'قانون دستوري', year: 1975, articles: 26, description: 'ينظم أحكام اكتساب الجنسية المصرية وفقدها وردها والتجنس', lastAmendment: '2022', url: 'https://manshurat.org/node/14702' },
  { id: 18, title: 'قانون حماية المستهلك', number: 'رقم 181 لسنة 2018', category: 'قانون تجاري', year: 2018, articles: 75, description: 'ينظم حماية المستهلك وحقوقه الأساسية ومسؤولية المورد والمعلن', lastAmendment: '2024', url: 'https://manshurat.org/node/14745' },
  { id: 19, title: 'قانون التأمين الاجتماعي والمعاشات', number: 'رقم 148 لسنة 2019', category: 'قانون عمل', year: 2019, articles: 160, description: 'ينظم نظام التأمينات الاجتماعية والمعاشات للعاملين بالقطاعين العام والخاص', lastAmendment: '2024', url: 'https://manshurat.org/node/14750' },
  { id: 20, title: 'قانون مكافحة غسل الأموال', number: 'رقم 80 لسنة 2002', category: 'قانون جنائي', year: 2002, articles: 42, description: 'ينظم مكافحة جرائم غسل الأموال وتمويل الإرهاب', lastAmendment: '2023', url: 'https://manshurat.org/node/14755' },
]

const categories = ['الكل', 'قانون مدني', 'قانون جنائي', 'قانون المرافعات', 'قانون تجاري', 'أحوال شخصية', 'قانون عمل', 'قانون إداري', 'قانون دستوري']

export default function EgyptianLawsPage() {
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
      {/* Hero */}
      <section className="relative bg-navy-900 py-16 md:py-24 overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-10 right-10 w-64 h-64 bg-gold-500 rounded-full blur-3xl" />
        </div>
        <div className="relative max-w-5xl mx-auto px-4 text-center">
          <div className="w-16 h-16 bg-gold-500/20 rounded-2xl flex items-center justify-center mx-auto mb-6">
            <Scale size={32} className="text-gold-500" />
          </div>
          <div className="flex items-center justify-center gap-3 mb-4">
            <span className="text-3xl">🇪🇬</span>
            <h1 className="text-3xl md:text-5xl font-tajawal font-bold text-white">القوانين والتشريعات المصرية</h1>
          </div>
          <div className="w-16 h-1 bg-gold-500 mx-auto rounded mb-5" />
          <p className="text-gray-300 font-cairo text-lg max-w-2xl mx-auto leading-relaxed">
            مجموعة شاملة من القوانين والتشريعات المصرية المحدثة بآخر التعديلات
          </p>
          <Link to="/library" className="inline-flex items-center gap-2 mt-6 text-gold-400 hover:text-gold-300 font-cairo text-sm transition-colors">
            <ArrowRight size={14} /> العودة للمكتبة
          </Link>
        </div>
      </section>

      {/* Stats */}
      <section className="py-6 bg-white border-b border-gray-100">
        <div className="max-w-5xl mx-auto px-4">
          <div className="grid grid-cols-3 gap-4 text-center">
            <div><span className="text-2xl font-bold text-gold-500 font-tajawal">{laws.length}</span><p className="text-gray-500 font-cairo text-xs mt-1">قانون وتشريع</p></div>
            <div><span className="text-2xl font-bold text-gold-500 font-tajawal">{categories.length - 1}</span><p className="text-gray-500 font-cairo text-xs mt-1">تصنيف قانوني</p></div>
            <div><span className="text-2xl font-bold text-gold-500 font-tajawal">2024</span><p className="text-gray-500 font-cairo text-xs mt-1">آخر تحديث</p></div>
          </div>
        </div>
      </section>

      {/* Search & Filter */}
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

      {/* Laws List */}
      <section className="py-10 bg-gray-50 min-h-[60vh]">
        <div className="max-w-5xl mx-auto px-4 space-y-4">
          {filtered.map(law => (
            <div key={law.id} className="bg-white rounded-xl shadow-sm hover:shadow-md transition-all overflow-hidden">
              <button onClick={() => setExpandedId(expandedId === law.id ? null : law.id)} className="w-full px-6 py-5 flex items-center justify-between text-right">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-1.5 flex-wrap">
                    <span className="text-[11px] font-cairo bg-navy-50 text-navy-700 px-2 py-0.5 rounded">{law.category}</span>
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
                    <span className="flex items-center gap-1">آخر تعديل: {law.lastAmendment}</span>
                  </div>
                  <div className="flex items-center gap-4">
                    <a href={law.url} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-gold-500 hover:text-gold-600 font-cairo text-sm font-bold transition-colors">
                      <FileText size={14} /> عرض نص القانون الكامل
                    </a>
                    <button onClick={() => downloadDocument(law.title, [{ heading: `${law.title} — ${law.number}` }, { text: law.description }, { heading: 'بيانات القانون' }, { list: [`سنة الصدور: ${law.year}`, `عدد المواد: ${law.articles}`, `آخر تعديل: ${law.lastAmendment}`, `التصنيف: ${law.category}`] }], 'law')} className="flex items-center gap-2 text-navy-500 hover:text-navy-700 font-cairo text-sm transition-colors">
                      <Download size={14} /> تحميل ملخص
                    </button>
                  </div>
                </div>
              )}
            </div>
          ))}
          {filtered.length === 0 && (
            <div className="text-center py-16 bg-white rounded-xl">
              <Scale size={48} className="text-gray-300 mx-auto mb-4" />
              <p className="text-gray-400 font-cairo text-lg">لا توجد نتائج لبحثك</p>
            </div>
          )}
        </div>
      </section>

      {/* CTA */}
      <section className="py-14 bg-navy-900">
        <div className="max-w-3xl mx-auto px-4 text-center">
          <h2 className="text-2xl font-tajawal font-bold text-white mb-4">تحتاج استشارة حول قانون معين؟</h2>
          <p className="text-gray-300 font-cairo mb-6">فريقنا القانوني مستعد لمساعدتك في فهم وتطبيق القوانين المصرية</p>
          <Link to="/contact" className="inline-block px-8 py-3 bg-gold-500 text-white font-bold font-cairo rounded-lg hover:bg-gold-600 transition-colors">تواصل معنا</Link>
        </div>
      </section>
    </div>
  )
}
