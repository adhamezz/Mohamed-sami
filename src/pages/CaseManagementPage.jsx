import { Link } from 'react-router-dom'
import { Gavel, CheckCircle, Shield, Phone, ArrowRight } from 'lucide-react'

export default function CaseManagementPage() {
  const services = [
    'إدارة القضايا المدنية والتجارية أمام جميع درجات المحاكم',
    'متابعة القضايا الجنائية والجنح من التحقيق حتى الحكم النهائي',
    'إدارة قضايا التحكيم المحلي والدولي',
    'تسوية المنازعات وديًا عبر الوساطة والتفاوض',
    'متابعة إجراءات التنفيذ والطعون',
    'إعداد ملفات القضايا والمذكرات القانونية',
    'تمثيل العملاء أمام المحاكم الابتدائية والاستئنافية ومحكمة النقض',
    'إدارة قضايا الإفلاس والتصفية',
  ]

  const stats = [
    { number: '+٥٠٠', label: 'قضية ناجحة' },
    { number: '+١٥', label: 'سنة خبرة' },
    { number: '+٢٠٠', label: 'عميل راضٍ' },
    { number: '٩٨%', label: 'نسبة النجاح' },
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
            <Gavel size={32} className="text-gold-500" />
          </div>
          <h1 className="text-3xl md:text-5xl font-tajawal font-bold text-white mb-4">
            إدارة القضايا والمنازعات
          </h1>
          <div className="w-16 h-1 bg-gold-500 mx-auto rounded mb-5" />
          <p className="text-gray-300 font-cairo text-lg max-w-2xl mx-auto leading-relaxed">
            نتولى إدارة قضاياكم بكفاءة عالية من مرحلة الدراسة والتحليل وحتى صدور الحكم النهائي
          </p>
        </div>
      </section>

      {/* Stats */}
      <section className="py-10 bg-white border-b border-gray-100">
        <div className="max-w-4xl mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {stats.map((s, i) => (
              <div key={i} className="text-center">
                <div className="text-3xl font-bold text-gold-500 font-tajawal mb-1">{s.number}</div>
                <div className="text-gray-500 font-cairo text-sm">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Services list */}
      <section className="py-14 bg-white">
        <div className="max-w-5xl mx-auto px-4">
          <h2 className="text-2xl font-tajawal font-bold text-navy-900 mb-8 text-center">خدماتنا في إدارة القضايا</h2>
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

      {/* Why us */}
      <section className="py-14 bg-gray-50">
        <div className="max-w-5xl mx-auto px-4">
          <h2 className="text-2xl font-tajawal font-bold text-navy-900 mb-8 text-center">لماذا تختارنا؟</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { title: 'خبرة واسعة', desc: 'مستشار قانوني متخصص في مختلف مجالات القانون بخبرة تمتد لأكثر من ١٥ عامًا' },
              { title: 'متابعة مستمرة', desc: 'نوفر لعملائنا تقارير دورية عن سير القضايا ونستجيب لاستفساراتهم في أسرع وقت' },
              { title: 'سرية تامة', desc: 'نلتزم بأعلى معايير السرية والخصوصية في التعامل مع ملفات القضايا ومعلومات العملاء' },
            ].map((item, i) => (
              <div key={i} className="bg-white rounded-xl p-6 shadow-sm text-center">
                <Shield size={28} className="text-gold-500 mx-auto mb-4" />
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
          <h2 className="text-2xl font-tajawal font-bold text-white mb-3">لديك قضية تحتاج إدارة متخصصة؟</h2>
          <p className="text-gray-400 font-cairo mb-6">دعنا نتولى الأمر — تواصل معنا للحصول على تقييم مجاني لقضيتك</p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link to="/contact" className="flex items-center gap-2 bg-gold-500 text-white font-bold px-8 py-3 rounded-lg hover:bg-gold-600 transition-colors font-cairo">
              <Phone size={16} /> تواصل معنا
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
