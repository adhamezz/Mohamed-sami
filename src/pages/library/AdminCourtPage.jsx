import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Landmark, Search, ChevronDown, ChevronUp, ArrowRight, Calendar, BookOpen, Gavel } from 'lucide-react'

const rulings = [
  { id: 1, title: 'مبدأ المشروعية وسيادة القانون', number: 'الطعن رقم 12345 لسنة 69 ق.ع', date: '2024-01-20', category: 'القانون الإداري', principle: 'جهة الإدارة ملزمة بالتقيد بأحكام القانون في جميع تصرفاتها ولا يجوز لها الخروج عن حدود اختصاصها', ruling: 'إلغاء القرار الإداري المطعون فيه لمخالفته مبدأ المشروعية' },
  { id: 2, title: 'شروط قبول دعوى الإلغاء', number: 'الطعن رقم 23456 لسنة 68 ق.ع', date: '2023-12-10', category: 'القانون الإداري', principle: 'يشترط لقبول دعوى الإلغاء أن يكون الطعن موجهًا إلى قرار إداري نهائي صادر من سلطة إدارية وطنية وأن يكون الطاعن ذا مصلحة شخصية ومباشرة', ruling: 'قبول الدعوى شكلاً لتوافر شروط قبول دعوى الإلغاء المقررة قانوناً' },
  { id: 3, title: 'مبدأ عدم رجعية القرارات الإدارية', number: 'الطعن رقم 34567 لسنة 70 ق.ع', date: '2024-02-15', category: 'القانون الإداري', principle: 'لا يجوز للقرار الإداري أن يرتب آثاره على الماضي إلا في حالات محددة حصراً ينص عليها القانون', ruling: 'بطلان القرار الإداري المطعون فيه لمخالفته مبدأ عدم رجعية القرارات الإدارية' },
  { id: 4, title: 'حق الموظف في التظلم الإداري', number: 'الطعن رقم 45678 لسنة 69 ق.ع', date: '2024-01-05', category: 'الوظيفة العامة', principle: 'التظلم الإداري وجوبي قبل رفع الدعوى في بعض الحالات ويجب أن يقدم خلال المواعيد المقررة قانوناً', ruling: 'عدم قبول الدعوى لعدم سبقها بالتظلم الإداري الوجوبي المنصوص عليه قانوناً' },
  { id: 5, title: 'مسؤولية الإدارة عن القرارات الخاطئة', number: 'الطعن رقم 56789 لسنة 68 ق.ع', date: '2023-11-20', category: 'القانون الإداري', principle: 'تسأل جهة الإدارة عن تعويض الأضرار الناتجة عن قراراتها غير المشروعة', ruling: 'إلزام جهة الإدارة بالتعويض المناسب عن الأضرار المادية والأدبية الناتجة عن القرار المعيب' },
  { id: 6, title: 'ضوابط سلطة التأديب', number: 'الطعن رقم 67890 لسنة 70 ق.ع', date: '2024-03-01', category: 'الوظيفة العامة', principle: 'يجب أن تكون العقوبة التأديبية متناسبة مع المخالفة المرتكبة ومقترنة بضمانات التحقيق', ruling: 'تعديل الجزاء التأديبي لعدم تناسبه مع ماهية المخالفة المرتكبة' },
]

const categories = ['الكل', 'القانون الإداري', 'الوظيفة العامة']

export default function AdminCourtPage() {
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
          <div className="w-16 h-16 bg-gold-500/20 rounded-2xl flex items-center justify-center mx-auto mb-6"><Landmark size={32} className="text-gold-500" /></div>
          <h1 className="text-3xl md:text-5xl font-tajawal font-bold text-white mb-4">أحكام ومبادئ المحكمة الإدارية العليا</h1>
          <div className="w-16 h-1 bg-gold-500 mx-auto rounded mb-5" />
          <p className="text-gray-300 font-cairo text-lg max-w-2xl mx-auto leading-relaxed">أهم الأحكام والمبادئ القانونية الصادرة عن المحكمة الإدارية العليا بمجلس الدولة</p>
          <Link to="/library" className="inline-flex items-center gap-2 mt-6 text-gold-400 hover:text-gold-300 font-cairo text-sm transition-colors"><ArrowRight size={14} /> العودة للمكتبة</Link>
        </div>
      </section>

      <section className="bg-white border-b border-gray-100 sticky top-[104px] z-30">
        <div className="max-w-5xl mx-auto px-4 py-4 flex flex-col md:flex-row gap-3">
          <div className="relative flex-1">
            <Search size={16} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <input type="text" value={search} onChange={e => setSearch(e.target.value)} placeholder="ابحث في الأحكام والمبادئ..." className="w-full pr-10 pl-4 py-2.5 border border-gray-200 rounded-lg font-cairo text-sm focus:outline-none focus:border-gold-500" />
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
            <div key={r.id} className="bg-white rounded-xl shadow-sm hover:shadow-md transition-all overflow-hidden border-r-4 border-emerald-500">
              <button onClick={() => setExpandedId(expandedId === r.id ? null : r.id)} className="w-full px-6 py-5 flex items-center justify-between text-right">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2 flex-wrap">
                    <span className="text-[11px] font-cairo bg-emerald-50 text-emerald-700 px-2 py-0.5 rounded">{r.category}</span>
                    <span className="text-[11px] font-cairo text-gray-400">{r.number}</span>
                  </div>
                  <h3 className="text-lg font-tajawal font-bold text-navy-900">{r.title}</h3>
                </div>
                {expandedId === r.id ? <ChevronUp size={18} className="text-gold-500 flex-shrink-0" /> : <ChevronDown size={18} className="text-gray-400 flex-shrink-0" />}
              </button>
              {expandedId === r.id && (
                <div className="px-6 pb-6 border-t border-gray-100 pt-4 space-y-4">
                  <div className="bg-navy-50 rounded-lg p-4">
                    <h4 className="text-sm font-tajawal font-bold text-navy-900 mb-2 flex items-center gap-2"><BookOpen size={14} className="text-gold-500" /> المبدأ القانوني</h4>
                    <p className="text-gray-700 font-cairo text-sm leading-relaxed">{r.principle}</p>
                  </div>
                  <div className="bg-emerald-50 rounded-lg p-4">
                    <h4 className="text-sm font-tajawal font-bold text-navy-900 mb-2 flex items-center gap-2"><Gavel size={14} className="text-emerald-600" /> حكم المحكمة</h4>
                    <p className="text-gray-700 font-cairo text-sm leading-relaxed">{r.ruling}</p>
                  </div>
                  <span className="flex items-center gap-1 text-xs text-gray-400 font-cairo"><Calendar size={12} /> {new Date(r.date).toLocaleDateString('ar-EG', { year: 'numeric', month: 'long', day: 'numeric' })}</span>
                </div>
              )}
            </div>
          ))}
          {filtered.length === 0 && (
            <div className="text-center py-16 bg-white rounded-xl"><Landmark size={48} className="text-gray-300 mx-auto mb-4" /><p className="text-gray-400 font-cairo text-lg">لا توجد نتائج</p></div>
          )}
        </div>
      </section>

      <section className="py-14 bg-navy-900">
        <div className="max-w-3xl mx-auto px-4 text-center">
          <h2 className="text-2xl font-tajawal font-bold text-white mb-4">تبحث عن حكم المحكمة الإدارية العليا؟</h2>
          <p className="text-gray-300 font-cairo mb-6">يمكننا مساعدتك في البحث عن الأحكام ذات الصلة بقضيتك الإدارية</p>
          <Link to="/contact" className="inline-block px-8 py-3 bg-gold-500 text-white font-bold font-cairo rounded-lg hover:bg-gold-600 transition-colors">تواصل معنا</Link>
        </div>
      </section>
    </div>
  )
}
