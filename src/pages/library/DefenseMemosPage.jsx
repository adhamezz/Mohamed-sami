import { useState } from 'react'
import { Link } from 'react-router-dom'
import { ScrollText, Search, Download, ArrowRight, Eye, Tag, Calendar } from 'lucide-react'

const memos = [
  { id: 1, title: 'مذكرة دفاع في دعوى فسخ عقد بيع', category: 'قضايا مدنية', court: 'المحكمة الابتدائية', description: 'مذكرة دفاع شاملة في دعوى فسخ عقد بيع لإخلال البائع بالتزاماته التعاقدية مع طلب التعويض', date: '2024', format: 'Word', popular: true },
  { id: 2, title: 'مذكرة دفاع في جنحة سرقة', category: 'قضايا جنائية', court: 'محكمة الجنح', description: 'مذكرة دفاع في جنحة سرقة ببراءة المتهم لانعدام القصد الجنائي وعدم كفاية الأدلة', date: '2024', format: 'Word' },
  { id: 3, title: 'مذكرة دفاع في دعوى نفقة زوجية', category: 'قضايا أسرة', court: 'محكمة الأسرة', description: 'مذكرة دفاع عن الزوج في دعوى نفقة زوجية مع بيان الدخل الحقيقي والالتزامات', date: '2024', format: 'Word', popular: true },
  { id: 4, title: 'مذكرة دفاع في دعوى فصل تعسفي', category: 'قضايا عمالية', court: 'محكمة العمال', description: 'مذكرة دفاع عن العامل المفصول تعسفيًا مع المطالبة بالتعويض وحقوق نهاية الخدمة', date: '2024', format: 'Word' },
  { id: 5, title: 'مذكرة في طعن بالاستئناف على حكم مدني', category: 'طعون', court: 'محكمة الاستئناف', description: 'مذكرة أسباب الطعن بالاستئناف على حكم صادر من محكمة أول درجة في دعوى مدنية', date: '2023', format: 'Word' },
  { id: 6, title: 'مذكرة دفاع في دعوى إلغاء قرار إداري', category: 'قضايا إدارية', court: 'محاكم مجلس الدولة', description: 'مذكرة دفاع في دعوى إلغاء قرار إداري سلبي مع طلب التعويض عن الأضرار', date: '2024', format: 'Word' },
  { id: 7, title: 'مذكرة دفاع في جناية ضرب أفضى إلى موت', category: 'قضايا جنائية', court: 'محكمة الجنايات', description: 'مذكرة دفاع شاملة في جناية ضرب أفضى إلى موت مع بيان أوجه الدفاع الجوهرية', date: '2024', format: 'Word' },
  { id: 8, title: 'مذكرة دفاع في دعوى حضانة', category: 'قضايا أسرة', court: 'محكمة الأسرة', description: 'مذكرة دفاع في دعوى ضم حضانة صغير مع إثبات الأصلحية للحضانة', date: '2024', format: 'Word' },
  { id: 9, title: 'مذكرة في منازعة تنفيذ موضوعية', category: 'تنفيذ', court: 'قاضي التنفيذ', description: 'مذكرة دفاع في منازعة تنفيذ موضوعية حول انقضاء الحق المنفذ به', date: '2023', format: 'Word' },
  { id: 10, title: 'مذكرة دفاع في دعوى إخلاء', category: 'قضايا مدنية', court: 'المحكمة الابتدائية', description: 'مذكرة دفاع عن المستأجر في دعوى إخلاء لثبوت سداد الأجرة', date: '2024', format: 'Word' },
]

const categories = ['الكل', 'قضايا مدنية', 'قضايا جنائية', 'قضايا أسرة', 'قضايا عمالية', 'قضايا إدارية', 'طعون', 'تنفيذ']

export default function DefenseMemosPage() {
  const [search, setSearch] = useState('')
  const [activeCategory, setActiveCategory] = useState('الكل')

  const filtered = memos.filter(m => {
    const matchSearch = !search || m.title.includes(search) || m.description.includes(search)
    const matchCat = activeCategory === 'الكل' || m.category === activeCategory
    return matchSearch && matchCat
  })

  return (
    <div style={{ direction: 'rtl' }}>
      <section className="relative bg-navy-900 py-16 md:py-24 overflow-hidden">
        <div className="absolute inset-0 opacity-10"><div className="absolute top-10 right-10 w-64 h-64 bg-gold-500 rounded-full blur-3xl" /></div>
        <div className="relative max-w-5xl mx-auto px-4 text-center">
          <div className="w-16 h-16 bg-gold-500/20 rounded-2xl flex items-center justify-center mx-auto mb-6"><ScrollText size={32} className="text-gold-500" /></div>
          <h1 className="text-3xl md:text-5xl font-tajawal font-bold text-white mb-4">مذكرات دفاع</h1>
          <div className="w-16 h-1 bg-gold-500 mx-auto rounded mb-5" />
          <p className="text-gray-300 font-cairo text-lg max-w-2xl mx-auto leading-relaxed">نماذج مذكرات دفاع قانونية احترافية في مختلف أنواع القضايا</p>
          <Link to="/library" className="inline-flex items-center gap-2 mt-6 text-gold-400 hover:text-gold-300 font-cairo text-sm transition-colors"><ArrowRight size={14} /> العودة للمكتبة</Link>
        </div>
      </section>

      <section className="bg-white border-b border-gray-100 sticky top-[104px] z-30">
        <div className="max-w-5xl mx-auto px-4 py-4">
          <div className="flex flex-col md:flex-row gap-3">
            <div className="relative flex-1">
              <Search size={16} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400" />
              <input type="text" value={search} onChange={e => setSearch(e.target.value)} placeholder="ابحث في مذكرات الدفاع..." className="w-full pr-10 pl-4 py-2.5 border border-gray-200 rounded-lg font-cairo text-sm focus:outline-none focus:border-gold-500" />
            </div>
            <div className="flex gap-2 overflow-x-auto pb-1">
              {categories.slice(0, 5).map(c => (
                <button key={c} onClick={() => setActiveCategory(c)} className={`px-3 py-2 rounded-lg text-xs font-cairo font-medium whitespace-nowrap transition-all ${activeCategory === c ? 'bg-navy-900 text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}>{c}</button>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="py-10 bg-gray-50 min-h-[60vh]">
        <div className="max-w-5xl mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {filtered.map(m => (
              <div key={m.id} className="bg-white rounded-xl shadow-sm hover:shadow-md transition-all p-6 group relative overflow-hidden hover:-translate-y-0.5">
                {m.popular && <span className="absolute top-0 left-0 bg-gold-500 text-white text-[10px] font-cairo font-bold px-3 py-1 rounded-br-lg">نموذج مميز</span>}
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-indigo-50 rounded-xl flex items-center justify-center flex-shrink-0 group-hover:bg-gold-50 transition-colors">
                    <ScrollText size={22} className="text-indigo-600 group-hover:text-gold-500 transition-colors" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1.5 flex-wrap">
                      <span className="text-[11px] font-cairo bg-indigo-50 text-indigo-700 px-2 py-0.5 rounded">{m.category}</span>
                      <span className="text-[11px] font-cairo text-gray-400 flex items-center gap-1"><Tag size={9} />{m.court}</span>
                    </div>
                    <h3 className="text-base font-tajawal font-bold text-navy-900 mb-1.5 group-hover:text-gold-500 transition-colors">{m.title}</h3>
                    <p className="text-gray-500 font-cairo text-sm leading-relaxed mb-3">{m.description}</p>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <button className="flex items-center gap-1.5 text-gold-500 hover:text-gold-600 font-cairo text-xs font-bold transition-colors"><Download size={13} /> تحميل</button>
                        <button className="flex items-center gap-1.5 text-navy-500 hover:text-navy-700 font-cairo text-xs transition-colors"><Eye size={13} /> معاينة</button>
                      </div>
                      <span className="text-[11px] font-cairo text-gray-400 flex items-center gap-1"><Calendar size={10} />{m.date}</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
          {filtered.length === 0 && (
            <div className="text-center py-16 bg-white rounded-xl"><ScrollText size={48} className="text-gray-300 mx-auto mb-4" /><p className="text-gray-400 font-cairo text-lg">لا توجد نتائج</p></div>
          )}
        </div>
      </section>

      <section className="py-14 bg-navy-900">
        <div className="max-w-3xl mx-auto px-4 text-center">
          <h2 className="text-2xl font-tajawal font-bold text-white mb-4">تحتاج مذكرة دفاع مخصصة لقضيتك؟</h2>
          <p className="text-gray-300 font-cairo mb-6">فريقنا القانوني يقدم خدمة إعداد مذكرات الدفاع المتخصصة بأعلى معايير الجودة</p>
          <Link to="/contact" className="inline-block px-8 py-3 bg-gold-500 text-white font-bold font-cairo rounded-lg hover:bg-gold-600 transition-colors">تواصل معنا</Link>
        </div>
      </section>
    </div>
  )
}
