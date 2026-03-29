import { useState } from 'react'
import { Link } from 'react-router-dom'
import { FileSignature, Search, Download, ArrowRight, Eye, Tag } from 'lucide-react'

const contracts = [
  { id: 1, title: 'عقد بيع عقار', category: 'عقود عقارية', description: 'نموذج عقد بيع ابتدائي لعقار (شقة / فيلا / أرض) مع كافة الضمانات القانونية', format: 'Word', popular: true },
  { id: 2, title: 'عقد إيجار سكني', category: 'عقود إيجار', description: 'نموذج عقد إيجار وحدة سكنية وفقاً لأحكام قانون الإيجارات', format: 'Word', popular: true },
  { id: 3, title: 'عقد إيجار تجاري', category: 'عقود إيجار', description: 'نموذج عقد إيجار محل تجاري أو مكتب مع شروط النشاط التجاري', format: 'Word' },
  { id: 4, title: 'عقد عمل محدد المدة', category: 'عقود عمل', description: 'نموذج عقد عمل محدد المدة وفقاً لأحكام قانون العمل', format: 'Word', popular: true },
  { id: 5, title: 'عقد عمل غير محدد المدة', category: 'عقود عمل', description: 'نموذج عقد عمل غير محدد المدة مع شروط الإنهاء والتعويض', format: 'Word' },
  { id: 6, title: 'عقد شراكة تجارية', category: 'عقود شركات', description: 'نموذج عقد شراكة بين طرفين أو أكثر لتأسيس نشاط تجاري مشترك', format: 'Word' },
  { id: 7, title: 'عقد تأسيس شركة ذات مسؤولية محدودة', category: 'عقود شركات', description: 'نموذج عقد تأسيس شركة ذات مسؤولية محدودة مع النظام الأساسي', format: 'Word' },
  { id: 8, title: 'عقد مقاولة', category: 'عقود مقاولات', description: 'نموذج عقد مقاولة لأعمال البناء والتشييد مع شروط التنفيذ والاستلام', format: 'Word' },
  { id: 9, title: 'عقد وكالة قانونية', category: 'عقود وكالة', description: 'نموذج عقد توكيل محامٍ للدفاع والتمثيل أمام المحاكم', format: 'Word' },
  { id: 10, title: 'عقد استشارات قانونية', category: 'عقود خدمات', description: 'نموذج عقد تقديم استشارات قانونية دورية لشركة أو مؤسسة', format: 'Word' },
  { id: 11, title: 'عقد بيع محل تجاري', category: 'عقود تجارية', description: 'نموذج عقد بيع محل تجاري بالمقومات المادية والمعنوية', format: 'Word' },
  { id: 12, title: 'عقد قرض', category: 'عقود مالية', description: 'نموذج عقد قرض مالي بين طرفين مع شروط السداد والضمانات', format: 'Word' },
]

const categories = ['الكل', 'عقود عقارية', 'عقود إيجار', 'عقود عمل', 'عقود شركات', 'عقود مقاولات', 'عقود وكالة', 'عقود خدمات', 'عقود تجارية', 'عقود مالية']

export default function ContractFormsPage() {
  const [search, setSearch] = useState('')
  const [activeCategory, setActiveCategory] = useState('الكل')

  const filtered = contracts.filter(f => {
    const matchSearch = !search || f.title.includes(search) || f.description.includes(search)
    const matchCat = activeCategory === 'الكل' || f.category === activeCategory
    return matchSearch && matchCat
  })

  return (
    <div style={{ direction: 'rtl' }}>
      <section className="relative bg-navy-900 py-16 md:py-24 overflow-hidden">
        <div className="absolute inset-0 opacity-10"><div className="absolute top-10 right-10 w-64 h-64 bg-gold-500 rounded-full blur-3xl" /></div>
        <div className="relative max-w-5xl mx-auto px-4 text-center">
          <div className="w-16 h-16 bg-gold-500/20 rounded-2xl flex items-center justify-center mx-auto mb-6"><FileSignature size={32} className="text-gold-500" /></div>
          <h1 className="text-3xl md:text-5xl font-tajawal font-bold text-white mb-4">صيغ العقود</h1>
          <div className="w-16 h-1 bg-gold-500 mx-auto rounded mb-5" />
          <p className="text-gray-300 font-cairo text-lg max-w-2xl mx-auto leading-relaxed">نماذج عقود قانونية احترافية جاهزة للتعديل والاستخدام</p>
          <Link to="/library" className="inline-flex items-center gap-2 mt-6 text-gold-400 hover:text-gold-300 font-cairo text-sm transition-colors"><ArrowRight size={14} /> العودة للمكتبة</Link>
        </div>
      </section>

      <section className="bg-white border-b border-gray-100 sticky top-[104px] z-30">
        <div className="max-w-6xl mx-auto px-4 py-4">
          <div className="flex flex-col md:flex-row gap-3">
            <div className="relative flex-1">
              <Search size={16} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400" />
              <input type="text" value={search} onChange={e => setSearch(e.target.value)} placeholder="ابحث عن نموذج عقد..." className="w-full pr-10 pl-4 py-2.5 border border-gray-200 rounded-lg font-cairo text-sm focus:outline-none focus:border-gold-500" />
            </div>
            <div className="flex gap-2 overflow-x-auto pb-1">
              {categories.slice(0, 6).map(c => (
                <button key={c} onClick={() => setActiveCategory(c)} className={`px-3 py-2 rounded-lg text-xs font-cairo font-medium whitespace-nowrap transition-all ${activeCategory === c ? 'bg-navy-900 text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}>{c}</button>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="py-10 bg-gray-50 min-h-[60vh]">
        <div className="max-w-6xl mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {filtered.map(f => (
              <div key={f.id} className="bg-white rounded-xl shadow-sm hover:shadow-md hover:-translate-y-1 transition-all p-5 group relative overflow-hidden">
                {f.popular && <span className="absolute top-0 left-0 bg-gold-500 text-white text-[10px] font-cairo font-bold px-3 py-1 rounded-br-lg">الأكثر طلباً</span>}
                <div className="w-10 h-10 bg-amber-50 rounded-lg flex items-center justify-center mb-3 group-hover:bg-gold-100 transition-colors">
                  <FileSignature size={20} className="text-amber-600" />
                </div>
                <span className="text-[11px] font-cairo bg-amber-50 text-amber-700 px-2 py-0.5 rounded">{f.category}</span>
                <h3 className="text-base font-tajawal font-bold text-navy-900 mt-2 mb-1.5 group-hover:text-gold-500 transition-colors">{f.title}</h3>
                <p className="text-gray-500 font-cairo text-sm leading-relaxed mb-4 line-clamp-2">{f.description}</p>
                <div className="flex items-center gap-3 pt-3 border-t border-gray-100">
                  <button className="flex items-center gap-1.5 text-gold-500 hover:text-gold-600 font-cairo text-xs font-bold transition-colors"><Download size={13} /> تحميل</button>
                  <button className="flex items-center gap-1.5 text-navy-500 hover:text-navy-700 font-cairo text-xs transition-colors"><Eye size={13} /> معاينة</button>
                </div>
              </div>
            ))}
          </div>
          {filtered.length === 0 && (
            <div className="text-center py-16 bg-white rounded-xl"><FileSignature size={48} className="text-gray-300 mx-auto mb-4" /><p className="text-gray-400 font-cairo text-lg">لا توجد نتائج</p></div>
          )}
        </div>
      </section>

      <section className="py-14 bg-navy-900">
        <div className="max-w-3xl mx-auto px-4 text-center">
          <h2 className="text-2xl font-tajawal font-bold text-white mb-4">تحتاج عقد مخصص لحالتك؟</h2>
          <p className="text-gray-300 font-cairo mb-6">نقدم خدمة صياغة العقود المتخصصة وفقاً لمتطلباتك القانونية</p>
          <Link to="/contact" className="inline-block px-8 py-3 bg-gold-500 text-white font-bold font-cairo rounded-lg hover:bg-gold-600 transition-colors">تواصل معنا</Link>
        </div>
      </section>
    </div>
  )
}
