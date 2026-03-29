import { Link } from 'react-router-dom'
import { Building2, CheckCircle, Phone, ArrowRight } from 'lucide-react'

export default function CompanyFormationPage() {
  const companyTypes = [
    { title: 'شركة ذات مسؤولية محدودة', desc: 'الأنسب للمشروعات المتوسطة والصغيرة — مسؤولية الشركاء محدودة بحصصهم' },
    { title: 'شركة مساهمة', desc: 'للمشروعات الكبرى — رأس مال مقسم إلى أسهم متساوية القيمة' },
    { title: 'شركة توصية بسيطة', desc: 'تجمع بين شركاء متضامنين وشركاء موصين بمسؤولية محدودة' },
    { title: 'شركة تضامن', desc: 'جميع الشركاء مسؤولون بالتضامن عن ديون الشركة' },
    { title: 'شركة الشخص الواحد', desc: 'يمكن لشخص واحد تأسيس شركة ذات مسؤولية محدودة' },
    { title: 'فروع الشركات الأجنبية', desc: 'تأسيس فروع ومكاتب تمثيل للشركات الأجنبية في مصر' },
  ]

  const steps = [
    'اختيار نوع الشركة المناسب لنشاطك',
    'إعداد وصياغة عقد التأسيس والنظام الأساسي',
    'توثيق العقد في الشهر العقاري',
    'التسجيل في السجل التجاري',
    'استخراج البطاقة الضريبية',
    'فتح الملف التأميني واستخراج التراخيص',
  ]

  return (
    <div style={{ direction: 'rtl' }}>
      <section className="relative bg-navy-900 py-16 md:py-24 overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-10 right-10 w-64 h-64 bg-gold-500 rounded-full blur-3xl" />
        </div>
        <div className="relative max-w-5xl mx-auto px-4 text-center">
          <div className="w-16 h-16 bg-gold-500/20 rounded-2xl flex items-center justify-center mx-auto mb-6">
            <Building2 size={32} className="text-gold-500" />
          </div>
          <h1 className="text-3xl md:text-5xl font-tajawal font-bold text-white mb-4">تأسيس الشركات</h1>
          <div className="w-16 h-1 bg-gold-500 mx-auto rounded mb-5" />
          <p className="text-gray-300 font-cairo text-lg max-w-2xl mx-auto leading-relaxed">
            نتولى جميع إجراءات تأسيس شركتك من الألف إلى الياء بأسرع وقت وأقل تكلفة
          </p>
        </div>
      </section>

      <section className="py-14 bg-white">
        <div className="max-w-5xl mx-auto px-4">
          <h2 className="text-2xl font-tajawal font-bold text-navy-900 mb-8 text-center">أنواع الشركات</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {companyTypes.map((c, i) => (
              <div key={i} className="bg-gray-50 rounded-xl p-6 hover:shadow-md transition-shadow border-t-2 border-transparent hover:border-gold-500">
                <Building2 size={24} className="text-gold-500 mb-3" />
                <h3 className="font-tajawal font-bold text-navy-900 mb-2">{c.title}</h3>
                <p className="text-gray-500 font-cairo text-sm leading-relaxed">{c.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-14 bg-gray-50">
        <div className="max-w-3xl mx-auto px-4">
          <h2 className="text-2xl font-tajawal font-bold text-navy-900 mb-8 text-center">خطوات التأسيس</h2>
          <div className="space-y-4">
            {steps.map((s, i) => (
              <div key={i} className="flex items-center gap-4 bg-white p-5 rounded-xl shadow-sm">
                <div className="w-10 h-10 bg-gold-500 text-white rounded-full flex items-center justify-center font-bold flex-shrink-0">{i + 1}</div>
                <p className="font-cairo text-gray-700 text-sm leading-relaxed">{s}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-navy-900 py-12">
        <div className="max-w-3xl mx-auto px-4 text-center">
          <h2 className="text-2xl font-tajawal font-bold text-white mb-3">جاهز لتأسيس شركتك؟</h2>
          <p className="text-gray-400 font-cairo mb-6">تواصل معنا للحصول على استشارة مجانية حول أفضل نوع لشركتك</p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link to="/contact" className="flex items-center gap-2 bg-gold-500 text-white font-bold px-8 py-3 rounded-lg hover:bg-gold-600 transition-colors font-cairo">
              <Phone size={16} /> ابدأ الآن
            </Link>
            <Link to="/services" className="flex items-center gap-2 bg-white/10 text-white font-bold px-8 py-3 rounded-lg hover:bg-white/20 transition-colors font-cairo">
              <ArrowRight size={16} className="rotate-180" /> جميع الخدمات
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
