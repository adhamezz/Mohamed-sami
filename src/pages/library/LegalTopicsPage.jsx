import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Lightbulb, Search, ArrowRight, Clock, Tag, ChevronLeft, BookOpen } from 'lucide-react'

const topics = [
  { id: 1, title: 'الفرق بين البطلان المطلق والبطلان النسبي في العقود', category: 'القانون المدني', readTime: '8 دقائق', description: 'دراسة تفصيلية للفرق بين حالات البطلان المطلق والنسبي في العقود المدنية وآثار كل منهما والدفوع المتعلقة بهما', tags: ['عقود', 'بطلان', 'قانون مدني'] },
  { id: 2, title: 'شروط الدفاع الشرعي في القانون الجنائي', category: 'القانون الجنائي', readTime: '10 دقائق', description: 'تحليل شامل لشروط الدفاع الشرعي وحدوده وحالات تجاوزه في ضوء أحكام محكمة النقض', tags: ['دفاع شرعي', 'جنائي'] },
  { id: 3, title: 'أحكام الحضانة في قانون الأسرة', category: 'الأحوال الشخصية', readTime: '12 دقائق', description: 'شرح مفصل لقواعد الحضانة وترتيب أصحاب الحق فيها وحالات سقوطها وانتقالها', tags: ['حضانة', 'أسرة', 'أحوال شخصية'] },
  { id: 4, title: 'المسؤولية المدنية لجهة الإدارة عن أخطاء موظفيها', category: 'القانون الإداري', readTime: '9 دقائق', description: 'دراسة في مسؤولية الدولة عن الأخطاء الشخصية والمرفقية لموظفيها وشروط التعويض', tags: ['مسؤولية', 'إداري'] },
  { id: 5, title: 'التعويض عن الفصل التعسفي', category: 'قانون العمل', readTime: '7 دقائق', description: 'شرح أحكام الفصل التعسفي في قانون العمل والتعويضات المستحقة للعامل', tags: ['فصل تعسفي', 'عمل', 'تعويض'] },
  { id: 6, title: 'إجراءات تأسيس الشركات في مصر', category: 'القانون التجاري', readTime: '15 دقائق', description: 'دليل شامل لإجراءات تأسيس الشركات التجارية في مصر بمختلف أنواعها', tags: ['شركات', 'تأسيس', 'تجاري'] },
  { id: 7, title: 'أحكام الشفعة في القانون المدني', category: 'القانون المدني', readTime: '8 دقائق', description: 'شرح لأحكام حق الشفعة وشروطها وإجراءاتها ومسقطاتها', tags: ['شفعة', 'عقارات', 'مدني'] },
  { id: 8, title: 'الجرائم الإلكترونية وعقوباتها', category: 'القانون الجنائي', readTime: '11 دقائق', description: 'دراسة في القوانين المنظمة للجرائم الإلكترونية والعقوبات المقررة لها في التشريعات العربية', tags: ['جرائم إلكترونية', 'تقنية معلومات'] },
  { id: 9, title: 'التحكيم كوسيلة بديلة لحل المنازعات', category: 'التحكيم', readTime: '13 دقائق', description: 'إطلالة شاملة على نظام التحكيم ومزاياه وعيوبه مقارنة بالقضاء العادي', tags: ['تحكيم', 'منازعات'] },
  { id: 10, title: 'حقوق المرأة في قوانين الأحوال الشخصية العربية', category: 'الأحوال الشخصية', readTime: '14 دقائق', description: 'دراسة مقارنة لحقوق المرأة في قوانين الأحوال الشخصية في مصر والإمارات والكويت', tags: ['حقوق المرأة', 'أحوال شخصية', 'مقارن'] },
]

const categories = ['الكل', 'القانون المدني', 'القانون الجنائي', 'الأحوال الشخصية', 'القانون الإداري', 'قانون العمل', 'القانون التجاري', 'التحكيم']

export default function LegalTopicsPage() {
  const [search, setSearch] = useState('')
  const [activeCategory, setActiveCategory] = useState('الكل')

  const filtered = topics.filter(t => {
    const matchSearch = !search || t.title.includes(search) || t.description.includes(search) || t.tags.some(tag => tag.includes(search))
    const matchCat = activeCategory === 'الكل' || t.category === activeCategory
    return matchSearch && matchCat
  })

  return (
    <div style={{ direction: 'rtl' }}>
      <section className="relative bg-navy-900 py-16 md:py-24 overflow-hidden">
        <div className="absolute inset-0 opacity-10"><div className="absolute top-10 right-10 w-64 h-64 bg-gold-500 rounded-full blur-3xl" /></div>
        <div className="relative max-w-5xl mx-auto px-4 text-center">
          <div className="w-16 h-16 bg-gold-500/20 rounded-2xl flex items-center justify-center mx-auto mb-6"><Lightbulb size={32} className="text-gold-500" /></div>
          <h1 className="text-3xl md:text-5xl font-tajawal font-bold text-white mb-4">المواضيع القانونية</h1>
          <div className="w-16 h-1 bg-gold-500 mx-auto rounded mb-5" />
          <p className="text-gray-300 font-cairo text-lg max-w-2xl mx-auto leading-relaxed">مقالات ودراسات قانونية متعمقة في مختلف فروع القانون</p>
          <Link to="/library" className="inline-flex items-center gap-2 mt-6 text-gold-400 hover:text-gold-300 font-cairo text-sm transition-colors"><ArrowRight size={14} /> العودة للمكتبة</Link>
        </div>
      </section>

      <section className="bg-white border-b border-gray-100 sticky top-[104px] z-30">
        <div className="max-w-5xl mx-auto px-4 py-4">
          <div className="flex flex-col md:flex-row gap-3">
            <div className="relative flex-1">
              <Search size={16} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400" />
              <input type="text" value={search} onChange={e => setSearch(e.target.value)} placeholder="ابحث في المواضيع القانونية..." className="w-full pr-10 pl-4 py-2.5 border border-gray-200 rounded-lg font-cairo text-sm focus:outline-none focus:border-gold-500" />
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
        <div className="max-w-5xl mx-auto px-4 space-y-5">
          {filtered.map(t => (
            <div key={t.id} className="bg-white rounded-xl shadow-sm hover:shadow-md transition-all p-6 group cursor-pointer hover:-translate-y-0.5">
              <div className="flex items-center gap-3 mb-3 flex-wrap">
                <span className="text-[11px] font-cairo bg-purple-50 text-purple-700 px-2 py-0.5 rounded">{t.category}</span>
                <span className="text-[11px] font-cairo text-gray-400 flex items-center gap-1"><Clock size={10} /> {t.readTime} قراءة</span>
              </div>
              <h3 className="text-lg font-tajawal font-bold text-navy-900 mb-2 group-hover:text-gold-500 transition-colors">{t.title}</h3>
              <p className="text-gray-500 font-cairo text-sm leading-relaxed mb-4">{t.description}</p>
              <div className="flex items-center justify-between">
                <div className="flex gap-2 flex-wrap">
                  {t.tags.map(tag => (
                    <span key={tag} className="text-[10px] font-cairo bg-gray-100 text-gray-500 px-2 py-0.5 rounded-full flex items-center gap-1"><Tag size={8} />{tag}</span>
                  ))}
                </div>
                <span className="text-gold-500 font-cairo text-xs font-bold flex items-center gap-1 group-hover:gap-2 transition-all">اقرأ المزيد <ChevronLeft size={12} /></span>
              </div>
            </div>
          ))}
          {filtered.length === 0 && (
            <div className="text-center py-16 bg-white rounded-xl"><Lightbulb size={48} className="text-gray-300 mx-auto mb-4" /><p className="text-gray-400 font-cairo text-lg">لا توجد نتائج</p></div>
          )}
        </div>
      </section>

      <section className="py-14 bg-navy-900">
        <div className="max-w-3xl mx-auto px-4 text-center">
          <h2 className="text-2xl font-tajawal font-bold text-white mb-4">تريد استشارة حول موضوع قانوني؟</h2>
          <p className="text-gray-300 font-cairo mb-6">فريقنا القانوني مستعد لتقديم الاستشارات المتخصصة في جميع فروع القانون</p>
          <Link to="/contact" className="inline-block px-8 py-3 bg-gold-500 text-white font-bold font-cairo rounded-lg hover:bg-gold-600 transition-colors">تواصل معنا</Link>
        </div>
      </section>
    </div>
  )
}
