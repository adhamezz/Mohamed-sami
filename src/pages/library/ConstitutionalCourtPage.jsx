import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Shield, Search, ChevronDown, ChevronUp, ArrowRight, Calendar, BookOpen, Gavel } from 'lucide-react'

const rulings = [
  { id: 1, title: 'مبدأ المساواة أمام القانون', number: 'القضية رقم 10 لسنة 25 ق دستورية', date: '2024-01-10', category: 'الحقوق والحريات', principle: 'مبدأ المساواة أمام القانون يعني عدم التمييز بين المراكز القانونية المتماثلة', ruling: 'عدم دستورية النص الطعين لمخالفته مبدأ المساواة المنصوص عليه في الدستور' },
  { id: 2, title: 'حق التقاضي وضماناته', number: 'القضية رقم 15 لسنة 24 ق دستورية', date: '2023-11-20', category: 'الحقوق والحريات', principle: 'حق التقاضي حق مكفول دستورياً ولا يجوز تقييده بما يحول دون ممارسته الفعلية', ruling: 'عدم دستورية النص المطعون فيه لإهداره حق التقاضي' },
  { id: 3, title: 'مبدأ الفصل بين السلطات', number: 'القضية رقم 20 لسنة 26 ق دستورية', date: '2024-02-05', category: 'النظام الدستوري', principle: 'الفصل بين السلطات يقتضي أن تمارس كل سلطة اختصاصاتها المحددة دستورياً دون تدخل في اختصاصات السلطات الأخرى', ruling: 'عدم دستورية النص لتضمنه اعتداءً على اختصاص السلطة القضائية' },
  { id: 4, title: 'حرية التعبير وحدودها', number: 'القضية رقم 8 لسنة 23 ق دستورية', date: '2023-12-15', category: 'الحقوق والحريات', principle: 'حرية الرأي والتعبير مكفولة دستورياً ولا يجوز تقييدها إلا بقانون وفي حدود ما يقتضيه النظام العام', ruling: 'رفض الطعن لعدم مخالفة النص المطعون فيه لحرية التعبير' },
  { id: 5, title: 'مبدأ شرعية الجرائم والعقوبات', number: 'القضية رقم 12 لسنة 25 ق دستورية', date: '2024-01-25', category: 'القانون الجنائي', principle: 'لا جريمة ولا عقوبة إلا بناء على قانون ولا توقع عقوبة إلا بحكم قضائي', ruling: 'عدم دستورية النص لمخالفته مبدأ شرعية الجرائم والعقوبات' },
  { id: 6, title: 'حق الملكية الخاصة', number: 'القضية رقم 18 لسنة 24 ق دستورية', date: '2024-02-20', category: 'الحقوق والحريات', principle: 'الملكية الخاصة مصونة ولا يجوز فرض الحراسة عليها إلا بحكم قضائي', ruling: 'عدم دستورية النص لمساسه بحق الملكية الخاصة دون مبرر دستوري' },
]

const categories = ['الكل', 'الحقوق والحريات', 'النظام الدستوري', 'القانون الجنائي']

export default function ConstitutionalCourtPage() {
  const [search, setSearch] = useState('')
  const [activeCategory, setActiveCategory] = useState('الكل')
  const [expandedId, setExpandedId] = useState(null)

  const filtered = rulings.filter(r => {
    const matchSearch = !search || r.title.includes(search) || r.principle.includes(search) || r.ruling.includes(search)
    const matchCat = activeCategory === 'الكل' || r.category === activeCategory
    return matchSearch && matchCat
  })

  return (
    <div style={{ direction: 'rtl' }}>
      <section className="relative bg-navy-900 py-16 md:py-24 overflow-hidden">
        <div className="absolute inset-0 opacity-10"><div className="absolute top-10 right-10 w-64 h-64 bg-gold-500 rounded-full blur-3xl" /></div>
        <div className="relative max-w-5xl mx-auto px-4 text-center">
          <div className="w-16 h-16 bg-gold-500/20 rounded-2xl flex items-center justify-center mx-auto mb-6"><Shield size={32} className="text-gold-500" /></div>
          <h1 className="text-3xl md:text-5xl font-tajawal font-bold text-white mb-4">أحكام المحكمة الدستورية العليا</h1>
          <div className="w-16 h-1 bg-gold-500 mx-auto rounded mb-5" />
          <p className="text-gray-300 font-cairo text-lg max-w-2xl mx-auto leading-relaxed">أبرز الأحكام والمبادئ الدستورية الصادرة عن المحكمة الدستورية العليا</p>
          <Link to="/library" className="inline-flex items-center gap-2 mt-6 text-gold-400 hover:text-gold-300 font-cairo text-sm transition-colors"><ArrowRight size={14} /> العودة للمكتبة</Link>
        </div>
      </section>

      <section className="bg-white border-b border-gray-100 sticky top-[104px] z-30">
        <div className="max-w-5xl mx-auto px-4 py-4 flex flex-col md:flex-row gap-3">
          <div className="relative flex-1">
            <Search size={16} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <input type="text" value={search} onChange={e => setSearch(e.target.value)} placeholder="ابحث في أحكام المحكمة الدستورية..." className="w-full pr-10 pl-4 py-2.5 border border-gray-200 rounded-lg font-cairo text-sm focus:outline-none focus:border-gold-500" />
          </div>
          <div className="flex gap-2">
            {categories.map(c => (
              <button key={c} onClick={() => setActiveCategory(c)} className={`px-3 py-2 rounded-lg text-xs font-cairo font-medium whitespace-nowrap transition-all ${activeCategory === c ? 'bg-navy-900 text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}>{c}</button>
            ))}
          </div>
        </div>
      </section>

      <section className="py-10 bg-gray-50 min-h-[60vh]">
        <div className="max-w-5xl mx-auto px-4 space-y-4">
          {filtered.map(r => (
            <div key={r.id} className="bg-white rounded-xl shadow-sm hover:shadow-md transition-all overflow-hidden border-r-4 border-red-500">
              <button onClick={() => setExpandedId(expandedId === r.id ? null : r.id)} className="w-full px-6 py-5 flex items-center justify-between text-right">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2 flex-wrap">
                    <span className="text-[11px] font-cairo bg-red-50 text-red-700 px-2 py-0.5 rounded">{r.category}</span>
                    <span className="text-[11px] font-cairo text-gray-400">{r.number}</span>
                  </div>
                  <h3 className="text-lg font-tajawal font-bold text-navy-900">{r.title}</h3>
                </div>
                {expandedId === r.id ? <ChevronUp size={18} className="text-gold-500 flex-shrink-0" /> : <ChevronDown size={18} className="text-gray-400 flex-shrink-0" />}
              </button>
              {expandedId === r.id && (
                <div className="px-6 pb-6 border-t border-gray-100 pt-4 space-y-4">
                  <div className="bg-navy-50 rounded-lg p-4">
                    <h4 className="text-sm font-tajawal font-bold text-navy-900 mb-2 flex items-center gap-2"><BookOpen size={14} className="text-gold-500" /> المبدأ الدستوري</h4>
                    <p className="text-gray-700 font-cairo text-sm leading-relaxed">{r.principle}</p>
                  </div>
                  <div className="bg-red-50 rounded-lg p-4">
                    <h4 className="text-sm font-tajawal font-bold text-navy-900 mb-2 flex items-center gap-2"><Gavel size={14} className="text-red-600" /> حكم المحكمة</h4>
                    <p className="text-gray-700 font-cairo text-sm leading-relaxed">{r.ruling}</p>
                  </div>
                  <span className="flex items-center gap-1 text-xs text-gray-400 font-cairo"><Calendar size={12} /> {new Date(r.date).toLocaleDateString('ar-EG', { year: 'numeric', month: 'long', day: 'numeric' })}</span>
                </div>
              )}
            </div>
          ))}
          {filtered.length === 0 && (
            <div className="text-center py-16 bg-white rounded-xl"><Shield size={48} className="text-gray-300 mx-auto mb-4" /><p className="text-gray-400 font-cairo text-lg">لا توجد نتائج</p></div>
          )}
        </div>
      </section>

      <section className="py-14 bg-navy-900">
        <div className="max-w-3xl mx-auto px-4 text-center">
          <h2 className="text-2xl font-tajawal font-bold text-white mb-4">تحتاج استشارة دستورية؟</h2>
          <p className="text-gray-300 font-cairo mb-6">فريقنا القانوني متخصص في القضايا الدستورية والطعون أمام المحكمة الدستورية العليا</p>
          <Link to="/contact" className="inline-block px-8 py-3 bg-gold-500 text-white font-bold font-cairo rounded-lg hover:bg-gold-600 transition-colors">تواصل معنا</Link>
        </div>
      </section>
    </div>
  )
}
