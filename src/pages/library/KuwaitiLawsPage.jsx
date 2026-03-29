import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Scale, Search, FileText, ChevronDown, ChevronUp, ArrowRight, Calendar, Hash, Download } from 'lucide-react'
import { downloadDocument } from '../../utils/downloadHelper'

const laws = [
  { id: 1, title: 'القانون المدني الكويتي', number: 'مرسوم بالقانون رقم 67 لسنة 1980', category: 'قانون مدني', year: 1980, articles: 1082, description: 'ينظم العلاقات المدنية والالتزامات والعقود في دولة الكويت', lastAmendment: '2023', url: 'https://www.kna.kw/clt-html5/run.asp?id=1096' },
  { id: 2, title: 'قانون الجزاء الكويتي', number: 'رقم 16 لسنة 1960', category: 'قانون جنائي', year: 1960, articles: 282, description: 'يحدد الجرائم والعقوبات المقررة في القانون الكويتي', lastAmendment: '2024', url: 'https://www.kna.kw/clt-html5/run.asp?id=1097' },
  { id: 3, title: 'قانون المرافعات المدنية والتجارية', number: 'مرسوم بالقانون رقم 38 لسنة 1980', category: 'قانون المرافعات', year: 1980, articles: 290, description: 'ينظم إجراءات التقاضي أمام المحاكم المدنية والتجارية الكويتية', lastAmendment: '2023', url: 'https://www.kna.kw/clt-html5/run.asp?id=1098' },
  { id: 4, title: 'قانون الأحوال الشخصية', number: 'رقم 51 لسنة 1984', category: 'أحوال شخصية', year: 1984, articles: 347, description: 'ينظم أحكام الزواج والطلاق والنفقة والحضانة والميراث', lastAmendment: '2023', url: 'https://www.kna.kw/clt-html5/run.asp?id=1099' },
  { id: 5, title: 'قانون التجارة', number: 'مرسوم بالقانون رقم 68 لسنة 1980', category: 'قانون تجاري', year: 1980, articles: 393, description: 'ينظم الأعمال التجارية والتجار في الكويت', lastAmendment: '2022', url: 'https://www.kna.kw/clt-html5/run.asp?id=1100' },
  { id: 6, title: 'قانون الشركات التجارية', number: 'رقم 1 لسنة 2016', category: 'قانون تجاري', year: 2016, articles: 310, description: 'ينظم تأسيس الشركات وإدارتها في الكويت', lastAmendment: '2024', url: 'https://www.kna.kw/clt-html5/run.asp?id=1101' },
  { id: 7, title: 'قانون العمل في القطاع الأهلي', number: 'رقم 6 لسنة 2010', category: 'قانون عمل', year: 2010, articles: 150, description: 'ينظم علاقات العمل في القطاع الخاص الكويتي', lastAmendment: '2023', url: 'https://www.kna.kw/clt-html5/run.asp?id=1102' },
  { id: 8, title: 'قانون الإيجارات', number: 'المرسوم بالقانون رقم 35 لسنة 1978', category: 'قانون مدني', year: 1978, articles: 28, description: 'ينظم العلاقة بين المؤجر والمستأجر', lastAmendment: '2022', url: 'https://www.kna.kw/clt-html5/run.asp?id=1103' },
  { id: 9, title: 'قانون الإجراءات والمحاكمات الجزائية', number: 'رقم 17 لسنة 1960', category: 'قانون جنائي', year: 1960, articles: 244, description: 'ينظم إجراءات المحاكمات الجزائية من التحقيق حتى التنفيذ', lastAmendment: '2023', url: 'https://www.kna.kw/clt-html5/run.asp?id=1104' },
  { id: 10, title: 'قانون التحكيم القضائي', number: 'رقم 11 لسنة 1995', category: 'تحكيم', year: 1995, articles: 45, description: 'ينظم التحكيم كوسيلة بديلة لحل المنازعات في الكويت', lastAmendment: '2022', url: 'https://www.kna.kw/clt-html5/run.asp?id=1105' },
  { id: 11, title: 'قانون الجنسية الكويتية', number: 'مرسوم أميري رقم 15 لسنة 1959', category: 'قانون دستوري', year: 1959, articles: 22, description: 'ينظم أحكام الجنسية الكويتية واكتسابها وفقدانها وسحبها', lastAmendment: '2024', url: 'https://www.kna.kw/clt-html5/run.asp?id=1106' },
  { id: 12, title: 'قانون تنظيم القضاء', number: 'مرسوم بالقانون رقم 23 لسنة 1990', category: 'قانون قضائي', year: 1990, articles: 88, description: 'ينظم تشكيل المحاكم واختصاصاتها وتعيين القضاة', lastAmendment: '2023', url: 'https://www.kna.kw/clt-html5/run.asp?id=1107' },
  { id: 13, title: 'قانون حماية الملكية الفكرية', number: 'رقم 64 لسنة 1999', category: 'ملكية فكرية', year: 1999, articles: 54, description: 'ينظم حماية حقوق المؤلف والحقوق المجاورة وبراءات الاختراع', lastAmendment: '2023', url: 'https://www.kna.kw/clt-html5/run.asp?id=1108' },
  { id: 14, title: 'قانون البيئة', number: 'رقم 42 لسنة 2014', category: 'قانون إداري', year: 2014, articles: 180, description: 'ينظم حماية البيئة والموارد الطبيعية ومكافحة التلوث في الكويت', lastAmendment: '2024', url: 'https://www.kna.kw/clt-html5/run.asp?id=1109' },
  { id: 15, title: 'قانون مكافحة غسل الأموال وتمويل الإرهاب', number: 'رقم 106 لسنة 2013', category: 'قانون جنائي', year: 2013, articles: 72, description: 'ينظم مكافحة جرائم غسل الأموال وتمويل الإرهاب', lastAmendment: '2023', url: 'https://www.kna.kw/clt-html5/run.asp?id=1110' },
]

const categories = ['الكل', 'قانون مدني', 'قانون جنائي', 'قانون المرافعات', 'قانون تجاري', 'أحوال شخصية', 'قانون عمل', 'تحكيم', 'قانون دستوري', 'قانون قضائي', 'ملكية فكرية', 'قانون إداري']

export default function KuwaitiLawsPage() {
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
        <div className="absolute inset-0 opacity-10"><div className="absolute top-10 right-10 w-64 h-64 bg-gold-500 rounded-full blur-3xl" /></div>
        <div className="relative max-w-5xl mx-auto px-4 text-center">
          <div className="w-16 h-16 bg-gold-500/20 rounded-2xl flex items-center justify-center mx-auto mb-6"><Scale size={32} className="text-gold-500" /></div>
          <div className="flex items-center justify-center gap-3 mb-4">
            <span className="text-3xl">🇰🇼</span>
            <h1 className="text-3xl md:text-5xl font-tajawal font-bold text-white">قوانين وتشريعات الكويت</h1>
          </div>
          <div className="w-16 h-1 bg-gold-500 mx-auto rounded mb-5" />
          <p className="text-gray-300 font-cairo text-lg max-w-2xl mx-auto leading-relaxed">مجموعة شاملة من القوانين والتشريعات الكويتية المحدثة</p>
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
                    <span className="text-[11px] font-cairo bg-blue-50 text-blue-700 px-2 py-0.5 rounded">{law.category}</span>
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
            <div className="text-center py-16 bg-white rounded-xl"><Scale size={48} className="text-gray-300 mx-auto mb-4" /><p className="text-gray-400 font-cairo text-lg">لا توجد نتائج</p></div>
          )}
        </div>
      </section>

      <section className="py-14 bg-navy-900">
        <div className="max-w-3xl mx-auto px-4 text-center">
          <h2 className="text-2xl font-tajawal font-bold text-white mb-4">تحتاج استشارة حول التشريعات الكويتية؟</h2>
          <p className="text-gray-300 font-cairo mb-6">فريقنا القانوني مستعد لمساعدتك في فهم وتطبيق القوانين الكويتية</p>
          <Link to="/contact" className="inline-block px-8 py-3 bg-gold-500 text-white font-bold font-cairo rounded-lg hover:bg-gold-600 transition-colors">تواصل معنا</Link>
        </div>
      </section>
    </div>
  )
}
