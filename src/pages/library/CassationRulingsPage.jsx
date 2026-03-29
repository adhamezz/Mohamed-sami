import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Gavel, Search, ChevronDown, ChevronUp, ArrowRight, Calendar, FileText, BookOpen } from 'lucide-react'

const rulings = [
  { id: 1, title: 'مبدأ حسن النية في تنفيذ العقود', court: 'محكمة النقض - الدائرة المدنية', number: 'الطعن رقم 1234 لسنة 93 ق', date: '2024-01-15', category: 'القانون المدني', principle: 'تنفيذ العقد يجب أن يكون وفقًا لمبدأ حسن النية وما يوجبه العرف والقانون والعدالة وفقًا لطبيعة الالتزام', ruling: 'قضت المحكمة بأن مبدأ حسن النية في تنفيذ العقود لا يقتصر على الالتزام بنصوص العقد بل يمتد ليشمل كل ما هو من مستلزماته وفقاً للقانون والعرف والعدالة' },
  { id: 2, title: 'شروط قبول الدعوى - المصلحة', court: 'محكمة النقض - الدائرة المدنية', number: 'الطعن رقم 5678 لسنة 92 ق', date: '2024-02-20', category: 'قانون المرافعات', principle: 'المصلحة شرط لقبول الدعوى ويجب أن تكون قائمة وحالة ومباشرة وشخصية', ruling: 'لا يكفي مجرد احتمال وقوع الضرر بل يجب أن يكون الضرر محققاً أو وشيك الوقوع' },
  { id: 3, title: 'مسؤولية المتبوع عن أعمال التابع', court: 'محكمة النقض - الدائرة المدنية', number: 'الطعن رقم 2345 لسنة 91 ق', date: '2023-11-10', category: 'القانون المدني', principle: 'مسؤولية المتبوع عن التابع تقوم على أساس خطأ مفترض في جانب المتبوع فرضاً لا يقبل إثبات العكس', ruling: 'يكفي لتحقق مسؤولية المتبوع أن يكون الخطأ قد وقع من التابع حال تأدية وظيفته أو بسببها' },
  { id: 4, title: 'الدفع بعدم التنفيذ في العقود الملزمة للجانبين', court: 'محكمة النقض - الدائرة التجارية', number: 'الطعن رقم 8901 لسنة 93 ق', date: '2024-03-01', category: 'القانون التجاري', principle: 'يحق لكل متعاقد في العقود الملزمة للجانبين أن يمتنع عن تنفيذ التزامه إذا لم يقم المتعاقد الآخر بتنفيذ ما التزم به', ruling: 'الدفع بعدم التنفيذ وسيلة دفاع وقتية لا تحتاج لحكم قضائي' },
  { id: 5, title: 'التقادم في الدعاوى الجنائية', court: 'محكمة النقض - الدائرة الجنائية', number: 'الطعن رقم 3456 لسنة 94 ق', date: '2024-01-25', category: 'القانون الجنائي', principle: 'انقضاء الدعوى الجنائية بمضي المدة يسري من تاريخ وقوع الجريمة أو من تاريخ آخر إجراء صحيح فيها', ruling: 'التقادم في المواد الجنائية من النظام العام وتقضي به المحكمة من تلقاء نفسها' },
  { id: 6, title: 'حجية الأمر المقضي فيه', court: 'محكمة النقض - الدائرة المدنية', number: 'الطعن رقم 7890 لسنة 92 ق', date: '2023-12-15', category: 'قانون المرافعات', principle: 'الأحكام التي حازت قوة الأمر المقضي فيه تكون حجة فيما فصلت فيه من الخصومة', ruling: 'يشترط لقيام حجية الأمر المقضي: وحدة الموضوع والسبب والخصوم' },
  { id: 7, title: 'مبدأ الإثراء بلا سبب', court: 'محكمة النقض - الدائرة المدنية', number: 'الطعن رقم 4567 لسنة 93 ق', date: '2024-02-10', category: 'القانون المدني', principle: 'كل شخص أثرى على حساب آخر بدون سبب قانوني يلتزم بتعويضه في حدود ما أثرى به', ruling: 'دعوى الإثراء بلا سبب دعوى احتياطية لا يجوز اللجوء إليها إلا عند عدم وجود أساس قانوني آخر' },
  { id: 8, title: 'بطلان الإجراءات لعيب الشكل', court: 'محكمة النقض - الدائرة الجنائية', number: 'الطعن رقم 6789 لسنة 93 ق', date: '2024-01-30', category: 'القانون الجنائي', principle: 'البطلان جزاء إجرائي يترتب على مخالفة القواعد الجوهرية في الإجراءات', ruling: 'لا يترتب البطلان على مخالفة الأشكال إلا إذا نص القانون صراحة على ذلك أو إذا شاب الإجراء عيب لم تتحقق بسببه الغاية منه' },
]

const categories = ['الكل', 'القانون المدني', 'قانون المرافعات', 'القانون الجنائي', 'القانون التجاري']

export default function CassationRulingsPage() {
  const [search, setSearch] = useState('')
  const [activeCategory, setActiveCategory] = useState('الكل')
  const [expandedId, setExpandedId] = useState(null)

  const filtered = rulings.filter(r => {
    const matchSearch = !search || r.title.includes(search) || r.principle.includes(search) || r.ruling.includes(search) || r.number.includes(search)
    const matchCat = activeCategory === 'الكل' || r.category === activeCategory
    return matchSearch && matchCat
  })

  return (
    <div style={{ direction: 'rtl' }}>
      <section className="relative bg-navy-900 py-16 md:py-24 overflow-hidden">
        <div className="absolute inset-0 opacity-10"><div className="absolute top-10 right-10 w-64 h-64 bg-gold-500 rounded-full blur-3xl" /></div>
        <div className="relative max-w-5xl mx-auto px-4 text-center">
          <div className="w-16 h-16 bg-gold-500/20 rounded-2xl flex items-center justify-center mx-auto mb-6"><Gavel size={32} className="text-gold-500" /></div>
          <h1 className="text-3xl md:text-5xl font-tajawal font-bold text-white mb-4">مبادئ وأحكام النقض المصرية</h1>
          <div className="w-16 h-1 bg-gold-500 mx-auto rounded mb-5" />
          <p className="text-gray-300 font-cairo text-lg max-w-2xl mx-auto leading-relaxed">أهم المبادئ القانونية المستقرة في أحكام محكمة النقض المصرية</p>
          <Link to="/library" className="inline-flex items-center gap-2 mt-6 text-gold-400 hover:text-gold-300 font-cairo text-sm transition-colors"><ArrowRight size={14} /> العودة للمكتبة</Link>
        </div>
      </section>

      <section className="bg-white border-b border-gray-100 sticky top-[104px] z-30">
        <div className="max-w-5xl mx-auto px-4 py-4">
          <div className="flex flex-col md:flex-row gap-3">
            <div className="relative flex-1">
              <Search size={16} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400" />
              <input type="text" value={search} onChange={e => setSearch(e.target.value)} placeholder="ابحث في المبادئ والأحكام..." className="w-full pr-10 pl-4 py-2.5 border border-gray-200 rounded-lg font-cairo text-sm focus:outline-none focus:border-gold-500" />
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
          {filtered.map(r => (
            <div key={r.id} className="bg-white rounded-xl shadow-sm hover:shadow-md transition-all overflow-hidden border-r-4 border-gold-500">
              <button onClick={() => setExpandedId(expandedId === r.id ? null : r.id)} className="w-full px-6 py-5 flex items-center justify-between text-right">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2 flex-wrap">
                    <span className="text-[11px] font-cairo bg-gold-50 text-gold-700 px-2 py-0.5 rounded">{r.category}</span>
                    <span className="text-[11px] font-cairo text-gray-400">{r.court}</span>
                  </div>
                  <h3 className="text-lg font-tajawal font-bold text-navy-900 mb-1">{r.title}</h3>
                  <p className="text-xs font-cairo text-gray-400">{r.number}</p>
                </div>
                {expandedId === r.id ? <ChevronUp size={18} className="text-gold-500 flex-shrink-0" /> : <ChevronDown size={18} className="text-gray-400 flex-shrink-0" />}
              </button>
              {expandedId === r.id && (
                <div className="px-6 pb-6 border-t border-gray-100 pt-4 space-y-4">
                  <div className="bg-navy-50 rounded-lg p-4">
                    <h4 className="text-sm font-tajawal font-bold text-navy-900 mb-2 flex items-center gap-2"><BookOpen size={14} className="text-gold-500" /> المبدأ القانوني</h4>
                    <p className="text-gray-700 font-cairo text-sm leading-relaxed">{r.principle}</p>
                  </div>
                  <div className="bg-gold-50 rounded-lg p-4">
                    <h4 className="text-sm font-tajawal font-bold text-navy-900 mb-2 flex items-center gap-2"><Gavel size={14} className="text-gold-500" /> حكم المحكمة</h4>
                    <p className="text-gray-700 font-cairo text-sm leading-relaxed">{r.ruling}</p>
                  </div>
                  <div className="flex items-center gap-4 text-xs text-gray-400 font-cairo">
                    <span className="flex items-center gap-1"><Calendar size={12} /> {new Date(r.date).toLocaleDateString('ar-EG', { year: 'numeric', month: 'long', day: 'numeric' })}</span>
                  </div>
                </div>
              )}
            </div>
          ))}
          {filtered.length === 0 && (
            <div className="text-center py-16 bg-white rounded-xl"><Gavel size={48} className="text-gray-300 mx-auto mb-4" /><p className="text-gray-400 font-cairo text-lg">لا توجد نتائج</p></div>
          )}
        </div>
      </section>

      <section className="py-14 bg-navy-900">
        <div className="max-w-3xl mx-auto px-4 text-center">
          <h2 className="text-2xl font-tajawal font-bold text-white mb-4">هل تبحث عن حكم نقض معين؟</h2>
          <p className="text-gray-300 font-cairo mb-6">يمكننا مساعدتك في البحث عن أحكام ومبادئ محكمة النقض ذات الصلة بقضيتك</p>
          <Link to="/contact" className="inline-block px-8 py-3 bg-gold-500 text-white font-bold font-cairo rounded-lg hover:bg-gold-600 transition-colors">تواصل معنا</Link>
        </div>
      </section>
    </div>
  )
}
