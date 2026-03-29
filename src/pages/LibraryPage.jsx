import { Link } from 'react-router-dom'
import { BookOpen, Scale, Gavel, Landmark, Shield, FileText, FileSignature, Bell, Lightbulb, ScrollText, ArrowLeft, Library } from 'lucide-react'

const sections = [
  { title: 'كتب قانونية', description: 'أهم المراجع والكتب القانونية العربية في مختلف فروع القانون', icon: BookOpen, path: '/library/legal-books', color: 'bg-blue-50 text-blue-600', count: '12 كتاب' },
  { title: 'القوانين والتشريعات المصرية', description: 'مجموعة شاملة من القوانين المصرية المحدثة بآخر التعديلات', icon: Scale, path: '/library/egyptian-laws', color: 'bg-red-50 text-red-600', flag: '🇪🇬', count: '14 قانون' },
  { title: 'القوانين والتشريعات الإماراتية', description: 'القوانين الاتحادية لدولة الإمارات العربية المتحدة', icon: Scale, path: '/library/uae-laws', color: 'bg-emerald-50 text-emerald-600', flag: '🇦🇪', count: '12 قانون' },
  { title: 'قوانين وتشريعات الكويت', description: 'القوانين والتشريعات الكويتية المحدثة', icon: Scale, path: '/library/kuwaiti-laws', color: 'bg-green-50 text-green-600', flag: '🇰🇼', count: '10 قوانين' },
  { title: 'مبادئ وأحكام النقض المصرية', description: 'أهم المبادئ القانونية المستقرة في أحكام محكمة النقض', icon: Gavel, path: '/library/cassation-rulings', color: 'bg-gold-50 text-gold-600', count: '8 مبادئ' },
  { title: 'أحكام المحكمة الإدارية العليا', description: 'أحكام ومبادئ المحكمة الإدارية العليا بمجلس الدولة', icon: Landmark, path: '/library/admin-court', color: 'bg-teal-50 text-teal-600', count: '6 أحكام' },
  { title: 'أحكام المحكمة الدستورية العليا', description: 'أبرز الأحكام والمبادئ الدستورية', icon: Shield, path: '/library/constitutional-court', color: 'bg-rose-50 text-rose-600', count: '6 أحكام' },
  { title: 'صيغ الدعاوي', description: 'نماذج صيغ دعاوي قانونية جاهزة أمام مختلف المحاكم', icon: FileText, path: '/library/lawsuit-forms', color: 'bg-sky-50 text-sky-600', count: '12 صيغة' },
  { title: 'صيغ العقود', description: 'نماذج عقود قانونية احترافية جاهزة للتعديل', icon: FileSignature, path: '/library/contract-forms', color: 'bg-amber-50 text-amber-600', count: '12 عقد' },
  { title: 'صيغ الإعلانات والإنذارات والطلبات', description: 'نماذج الإعلانات والإنذارات والطلبات القضائية', icon: Bell, path: '/library/notices-forms', color: 'bg-orange-50 text-orange-600', count: '12 نموذج' },
  { title: 'المواضيع القانونية', description: 'مقالات ودراسات قانونية متعمقة في فروع القانون المختلفة', icon: Lightbulb, path: '/library/legal-topics', color: 'bg-purple-50 text-purple-600', count: '10 مواضيع' },
  { title: 'مذكرات دفاع', description: 'نماذج مذكرات دفاع احترافية في مختلف أنواع القضايا', icon: ScrollText, path: '/library/defense-memos', color: 'bg-indigo-50 text-indigo-600', count: '10 مذكرات' },
]

export default function LibraryPage() {
  return (
    <div style={{ direction: 'rtl' }}>
      {/* Hero */}
      <section className="relative bg-navy-900 py-16 md:py-24 overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-10 right-10 w-64 h-64 bg-gold-500 rounded-full blur-3xl" />
          <div className="absolute bottom-10 left-10 w-48 h-48 bg-gold-400 rounded-full blur-3xl" />
        </div>
        <div className="relative max-w-5xl mx-auto px-4 text-center">
          <div className="w-16 h-16 bg-gold-500/20 rounded-2xl flex items-center justify-center mx-auto mb-6">
            <Library size={32} className="text-gold-500" />
          </div>
          <h1 className="text-3xl md:text-5xl font-tajawal font-bold text-white mb-4">المكتبة القانونية</h1>
          <div className="w-16 h-1 bg-gold-500 mx-auto rounded mb-5" />
          <p className="text-gray-300 font-cairo text-lg max-w-2xl mx-auto leading-relaxed">
            مكتبة قانونية شاملة تضم الكتب والقوانين والتشريعات والأحكام القضائية والنماذج القانونية
          </p>
        </div>
      </section>

      {/* Stats */}
      <section className="py-8 bg-white border-b border-gray-100">
        <div className="max-w-5xl mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            <div><span className="text-3xl font-bold text-gold-500 font-tajawal">12</span><p className="text-gray-500 font-cairo text-sm mt-1">قسم قانوني</p></div>
            <div><span className="text-3xl font-bold text-gold-500 font-tajawal">+120</span><p className="text-gray-500 font-cairo text-sm mt-1">مستند ونموذج</p></div>
            <div><span className="text-3xl font-bold text-gold-500 font-tajawal">3</span><p className="text-gray-500 font-cairo text-sm mt-1">دول عربية</p></div>
            <div><span className="text-3xl font-bold text-gold-500 font-tajawal">2024</span><p className="text-gray-500 font-cairo text-sm mt-1">آخر تحديث</p></div>
          </div>
        </div>
      </section>

      {/* Grid of sections */}
      <section className="py-14 bg-gray-50">
        <div className="max-w-6xl mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {sections.map((s, i) => {
              const Icon = s.icon
              return (
                <Link key={i} to={s.path} className="bg-white rounded-xl shadow-sm hover:shadow-lg transition-all duration-300 hover:-translate-y-1.5 p-6 group overflow-hidden relative">
                  <div className="flex items-start gap-4">
                    <div className={`w-12 h-12 ${s.color.split(' ')[0]} rounded-xl flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform`}>
                      <Icon size={22} className={s.color.split(' ')[1]} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        {s.flag && <span className="text-lg">{s.flag}</span>}
                        <h3 className="text-base font-tajawal font-bold text-navy-900 group-hover:text-gold-500 transition-colors leading-relaxed">{s.title}</h3>
                      </div>
                      <p className="text-gray-500 font-cairo text-sm leading-relaxed mb-3 line-clamp-2">{s.description}</p>
                      <div className="flex items-center justify-between">
                        <span className="text-[11px] font-cairo bg-gray-100 text-gray-500 px-2 py-0.5 rounded">{s.count}</span>
                        <span className="text-gold-500 font-cairo text-xs font-bold flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                          تصفح <ArrowLeft size={12} />
                        </span>
                      </div>
                    </div>
                  </div>
                </Link>
              )
            })}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-14 bg-navy-900">
        <div className="max-w-3xl mx-auto px-4 text-center">
          <h2 className="text-2xl font-tajawal font-bold text-white mb-4">لم تجد ما تبحث عنه؟</h2>
          <p className="text-gray-300 font-cairo mb-6">تواصل معنا وسنساعدك في الحصول على المستند أو المرجع القانوني المناسب لحالتك</p>
          <Link to="/contact" className="inline-block px-8 py-3 bg-gold-500 text-white font-bold font-cairo rounded-lg hover:bg-gold-600 transition-colors">
            تواصل معنا
          </Link>
        </div>
      </section>
    </div>
  )
}
