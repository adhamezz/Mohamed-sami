import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Bell, Search, Download, ArrowRight, Eye, Tag } from 'lucide-react'

const forms = [
  { id: 1, title: 'إنذار رسمي على يد محضر', category: 'إنذارات', description: 'نموذج إنذار رسمي على يد محضر بفسخ عقد أو بسداد مبلغ مالي', format: 'Word', popular: true },
  { id: 2, title: 'إنذار بالإخلاء للتأخر في سداد الأجرة', category: 'إنذارات', description: 'نموذج إنذار المستأجر بسداد الأجرة المتأخرة خلال مهلة محددة', format: 'Word' },
  { id: 3, title: 'إنذار عرض وإيداع', category: 'إنذارات', description: 'نموذج عرض مبلغ مالي على الدائن وإيداعه خزانة المحكمة عند رفض الاستلام', format: 'Word' },
  { id: 4, title: 'إعلان صحيفة دعوى', category: 'إعلانات', description: 'نموذج إعلان صحيفة دعوى للمدعى عليه على يد محضر', format: 'Word', popular: true },
  { id: 5, title: 'إعلان حكم قضائي', category: 'إعلانات', description: 'نموذج إعلان حكم قضائي للمحكوم عليه لبدء مواعيد الطعن', format: 'Word' },
  { id: 6, title: 'طلب صورة رسمية من حكم', category: 'طلبات', description: 'نموذج طلب استخراج صورة رسمية من حكم صادر من المحكمة', format: 'Word' },
  { id: 7, title: 'طلب شهادة عدم استئناف', category: 'طلبات', description: 'نموذج طلب الحصول على شهادة بعدم حصول استئناف أو طعن', format: 'Word' },
  { id: 8, title: 'طلب تأجيل نظر الدعوى', category: 'طلبات', description: 'نموذج طلب تأجيل نظر جلسة الدعوى لسبب قانوني', format: 'Word' },
  { id: 9, title: 'طلب رد محكمة', category: 'طلبات', description: 'نموذج طلب رد القاضي لأسباب قانونية محددة في قانون المرافعات', format: 'Word' },
  { id: 10, title: 'إنذار فسخ عقد عمل', category: 'إنذارات', description: 'نموذج إنذار العامل أو صاحب العمل بفسخ عقد العمل وفقاً للقانون', format: 'Word' },
  { id: 11, title: 'طلب تنفيذ حكم', category: 'طلبات', description: 'نموذج طلب تنفيذ حكم قضائي بوضع الصيغة التنفيذية', format: 'Word', popular: true },
  { id: 12, title: 'إعلان بالحضور للتحقيق', category: 'إعلانات', description: 'نموذج إعلان شاهد أو طرف بالحضور للتحقيق أمام المحكمة', format: 'Word' },
]

const categories = ['الكل', 'إنذارات', 'إعلانات', 'طلبات']

export default function NoticesFormsPage() {
  const [search, setSearch] = useState('')
  const [activeCategory, setActiveCategory] = useState('الكل')

  const filtered = forms.filter(f => {
    const matchSearch = !search || f.title.includes(search) || f.description.includes(search)
    const matchCat = activeCategory === 'الكل' || f.category === activeCategory
    return matchSearch && matchCat
  })

  return (
    <div style={{ direction: 'rtl' }}>
      <section className="relative bg-navy-900 py-16 md:py-24 overflow-hidden">
        <div className="absolute inset-0 opacity-10"><div className="absolute top-10 right-10 w-64 h-64 bg-gold-500 rounded-full blur-3xl" /></div>
        <div className="relative max-w-5xl mx-auto px-4 text-center">
          <div className="w-16 h-16 bg-gold-500/20 rounded-2xl flex items-center justify-center mx-auto mb-6"><Bell size={32} className="text-gold-500" /></div>
          <h1 className="text-3xl md:text-5xl font-tajawal font-bold text-white mb-4">صيغ الإعلانات والإنذارات والطلبات</h1>
          <div className="w-16 h-1 bg-gold-500 mx-auto rounded mb-5" />
          <p className="text-gray-300 font-cairo text-lg max-w-2xl mx-auto leading-relaxed">نماذج قانونية جاهزة للإعلانات والإنذارات والطلبات القضائية</p>
          <Link to="/library" className="inline-flex items-center gap-2 mt-6 text-gold-400 hover:text-gold-300 font-cairo text-sm transition-colors"><ArrowRight size={14} /> العودة للمكتبة</Link>
        </div>
      </section>

      <section className="bg-white border-b border-gray-100 sticky top-[104px] z-30">
        <div className="max-w-5xl mx-auto px-4 py-4 flex flex-col md:flex-row gap-3">
          <div className="relative flex-1">
            <Search size={16} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <input type="text" value={search} onChange={e => setSearch(e.target.value)} placeholder="ابحث عن نموذج..." className="w-full pr-10 pl-4 py-2.5 border border-gray-200 rounded-lg font-cairo text-sm focus:outline-none focus:border-gold-500" />
          </div>
          <div className="flex gap-2">
            {categories.map(c => (
              <button key={c} onClick={() => setActiveCategory(c)} className={`px-3 py-2 rounded-lg text-xs font-cairo font-medium whitespace-nowrap transition-all ${activeCategory === c ? 'bg-navy-900 text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}>{c}</button>
            ))}
          </div>
        </div>
      </section>

      <section className="py-10 bg-gray-50 min-h-[60vh]">
        <div className="max-w-5xl mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {filtered.map(f => (
              <div key={f.id} className="bg-white rounded-xl shadow-sm hover:shadow-md transition-all p-6 group relative overflow-hidden">
                {f.popular && <span className="absolute top-0 left-0 bg-gold-500 text-white text-[10px] font-cairo font-bold px-3 py-1 rounded-br-lg">الأكثر طلباً</span>}
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-orange-50 rounded-xl flex items-center justify-center flex-shrink-0 group-hover:bg-gold-50 transition-colors">
                    <Bell size={22} className="text-orange-600 group-hover:text-gold-500 transition-colors" />
                  </div>
                  <div className="flex-1">
                    <span className="text-[11px] font-cairo bg-orange-50 text-orange-700 px-2 py-0.5 rounded">{f.category}</span>
                    <h3 className="text-base font-tajawal font-bold text-navy-900 mt-1.5 mb-1.5 group-hover:text-gold-500 transition-colors">{f.title}</h3>
                    <p className="text-gray-500 font-cairo text-sm leading-relaxed mb-3">{f.description}</p>
                    <div className="flex items-center gap-3">
                      <button className="flex items-center gap-1.5 text-gold-500 hover:text-gold-600 font-cairo text-xs font-bold transition-colors"><Download size={13} /> تحميل {f.format}</button>
                      <button className="flex items-center gap-1.5 text-navy-500 hover:text-navy-700 font-cairo text-xs transition-colors"><Eye size={13} /> معاينة</button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
          {filtered.length === 0 && (
            <div className="text-center py-16 bg-white rounded-xl"><Bell size={48} className="text-gray-300 mx-auto mb-4" /><p className="text-gray-400 font-cairo text-lg">لا توجد نتائج</p></div>
          )}
        </div>
      </section>

      <section className="py-14 bg-navy-900">
        <div className="max-w-3xl mx-auto px-4 text-center">
          <h2 className="text-2xl font-tajawal font-bold text-white mb-4">تحتاج صياغة إنذار أو إعلان مخصص؟</h2>
          <p className="text-gray-300 font-cairo mb-6">فريقنا القانوني يقدم خدمة صياغة الإعلانات والإنذارات القانونية المتخصصة</p>
          <Link to="/contact" className="inline-block px-8 py-3 bg-gold-500 text-white font-bold font-cairo rounded-lg hover:bg-gold-600 transition-colors">تواصل معنا</Link>
        </div>
      </section>
    </div>
  )
}
