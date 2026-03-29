import { Link } from 'react-router-dom'
import { Globe, CheckCircle, Phone, ArrowRight, FileText } from 'lucide-react'

export default function EnglishContractsPage() {
  const services = [
    'صياغة العقود التجارية الدولية باللغة الإنجليزية',
    'ترجمة العقود القانونية من العربية إلى الإنجليزية والعكس',
    'مراجعة العقود الإنجليزية والتأكد من توافقها مع القانون المصري',
    'صياغة عقود الاستثمار الأجنبي والشراكات الدولية',
    'إعداد مذكرات التفاهم (MoU) باللغة الإنجليزية',
    'صياغة اتفاقيات السرية وعدم الإفصاح (NDA)',
    'عقود التوظيف الدولية والامتثال لقوانين العمل',
    'عقود الملكية الفكرية والتراخيص الدولية',
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
            <Globe size={32} className="text-gold-500" />
          </div>
          <h1 className="text-3xl md:text-5xl font-tajawal font-bold text-white mb-4">
            صياغة العقود باللغة الإنجليزية
          </h1>
          <div className="w-16 h-1 bg-gold-500 mx-auto rounded mb-5" />
          <p className="text-gray-300 font-cairo text-lg max-w-2xl mx-auto leading-relaxed">
            خدمات صياغة ومراجعة وترجمة العقود باللغة الإنجليزية للمعاملات الدولية والاستثمارات الأجنبية
          </p>
          <p className="text-gold-400 font-cairo text-sm mt-3" dir="ltr">
            Professional English Contract Drafting & Review Services
          </p>
        </div>
      </section>

      {/* Services */}
      <section className="py-14 bg-white">
        <div className="max-w-5xl mx-auto px-4">
          <h2 className="text-2xl font-tajawal font-bold text-navy-900 mb-8 text-center">خدماتنا في العقود الإنجليزية</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {services.map((s, i) => (
              <div key={i} className="flex items-start gap-3 bg-gray-50 p-4 rounded-xl">
                <CheckCircle size={20} className="text-gold-500 mt-0.5 flex-shrink-0" />
                <p className="font-cairo text-gray-700 text-sm leading-relaxed">{s}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why bilingual */}
      <section className="py-14 bg-gray-50">
        <div className="max-w-5xl mx-auto px-4">
          <h2 className="text-2xl font-tajawal font-bold text-navy-900 mb-8 text-center">لماذا تحتاج عقودًا باللغة الإنجليزية؟</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { title: 'للتعاملات الدولية', desc: 'الإنجليزية هي لغة الأعمال الدولية والعقود العابرة للحدود تتطلب صياغة إنجليزية محترفة' },
              { title: 'للاستثمار الأجنبي', desc: 'المستثمرون الأجانب يحتاجون عقودًا باللغة الإنجليزية تتوافق مع القانون المحلي والدولي' },
              { title: 'للحماية القانونية', desc: 'الصياغة الدقيقة باللغة الإنجليزية تحمي حقوقك في حال نشوء نزاعات دولية' },
            ].map((item, i) => (
              <div key={i} className="bg-white rounded-xl p-6 shadow-sm text-center">
                <Globe size={28} className="text-gold-500 mx-auto mb-4" />
                <h3 className="font-tajawal font-bold text-navy-900 mb-2">{item.title}</h3>
                <p className="text-gray-500 font-cairo text-sm leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-navy-900 py-12">
        <div className="max-w-3xl mx-auto px-4 text-center">
          <FileText size={36} className="text-gold-500 mx-auto mb-4" />
          <h2 className="text-2xl font-tajawal font-bold text-white mb-3">Need an English Contract?</h2>
          <p className="text-gray-400 font-cairo mb-6">تواصل معنا لصياغة عقدك باللغة الإنجليزية بأعلى معايير الاحترافية</p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link to="/contact" className="flex items-center gap-2 bg-gold-500 text-white font-bold px-8 py-3 rounded-lg hover:bg-gold-600 transition-colors font-cairo">
              <Phone size={16} /> تواصل معنا
            </Link>
            <Link to="/services/contracts" className="flex items-center gap-2 bg-white/10 text-white font-bold px-8 py-3 rounded-lg hover:bg-white/20 transition-colors font-cairo">
              <ArrowRight size={16} className="rotate-180" /> عقود باللغة العربية
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
