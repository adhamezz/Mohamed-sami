import { Link } from 'react-router-dom'
import { FileText, CheckCircle, ArrowRight, Scale, Phone } from 'lucide-react'

export default function LegalMemosPage() {
  const features = [
    'صياغة المذكرات القانونية أمام جميع درجات المحاكم',
    'إعداد مذكرات الدفاع والرد في القضايا المدنية والجنائية',
    'صياغة اللوائح الاعتراضية والطعون',
    'إعداد المذكرات الإيضاحية والتفسيرية',
    'صياغة العقود التجارية والمدنية بأعلى معايير الجودة',
    'مراجعة وتعديل العقود القائمة لضمان حماية حقوق العملاء',
    'إعداد عقود الشراكة والتأسيس',
    'صياغة عقود الإيجار والبيع والتوريد',
  ]

  const steps = [
    { title: 'دراسة القضية', desc: 'نقوم بدراسة شاملة للقضية وجمع كافة المستندات والأدلة المتاحة' },
    { title: 'البحث القانوني', desc: 'نبحث في التشريعات والأحكام القضائية ذات الصلة لبناء أقوى حجة قانونية' },
    { title: 'الصياغة والمراجعة', desc: 'نصيغ المذكرة بلغة قانونية دقيقة ونراجعها مراجعة شاملة' },
    { title: 'التسليم والمتابعة', desc: 'نسلم المذكرة في الموعد المحدد ونتابع مع العميل حتى تحقيق النتيجة' },
  ]

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
            <FileText size={32} className="text-gold-500" />
          </div>
          <h1 className="text-3xl md:text-5xl font-tajawal font-bold text-white mb-4">
            صياغة المذكرات القانونية والعقود
          </h1>
          <div className="w-16 h-1 bg-gold-500 mx-auto rounded mb-5" />
          <p className="text-gray-300 font-cairo text-lg max-w-2xl mx-auto leading-relaxed">
            نقدم خدمات صياغة المذكرات القانونية والعقود بأعلى معايير الدقة والاحترافية لحماية حقوقك ومصالحك
          </p>
        </div>
      </section>

      {/* Features */}
      <section className="py-14 bg-white">
        <div className="max-w-5xl mx-auto px-4">
          <h2 className="text-2xl font-tajawal font-bold text-navy-900 mb-8 text-center">ما نقدمه في هذه الخدمة</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {features.map((f, i) => (
              <div key={i} className="flex items-start gap-3 bg-gray-50 p-4 rounded-xl">
                <CheckCircle size={20} className="text-gold-500 mt-0.5 flex-shrink-0" />
                <p className="font-cairo text-gray-700 text-sm leading-relaxed">{f}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Process Steps */}
      <section className="py-14 bg-gray-50">
        <div className="max-w-5xl mx-auto px-4">
          <h2 className="text-2xl font-tajawal font-bold text-navy-900 mb-10 text-center">منهجية العمل</h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {steps.map((s, i) => (
              <div key={i} className="bg-white rounded-xl p-6 text-center shadow-sm hover:shadow-md transition-shadow">
                <div className="w-12 h-12 bg-gold-500 text-white rounded-full flex items-center justify-center mx-auto mb-4 font-bold text-lg">{i + 1}</div>
                <h3 className="font-tajawal font-bold text-navy-900 mb-2">{s.title}</h3>
                <p className="text-gray-500 font-cairo text-sm leading-relaxed">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-navy-900 py-12">
        <div className="max-w-3xl mx-auto px-4 text-center">
          <Scale size={36} className="text-gold-500 mx-auto mb-4" />
          <h2 className="text-2xl font-tajawal font-bold text-white mb-3">تحتاج إلى صياغة مذكرة أو عقد؟</h2>
          <p className="text-gray-400 font-cairo mb-6">تواصل معنا الآن للحصول على استشارة مجانية</p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link to="/contact" className="flex items-center gap-2 bg-gold-500 text-white font-bold px-8 py-3 rounded-lg hover:bg-gold-600 transition-colors font-cairo">
              <Phone size={16} /> تواصل معنا
            </Link>
            <Link to="/blog" className="flex items-center gap-2 bg-white/10 text-white font-bold px-8 py-3 rounded-lg hover:bg-white/20 transition-colors font-cairo">
              <ArrowRight size={16} className="rotate-180" /> تصفح المدونة
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
