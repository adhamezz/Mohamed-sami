import { Link } from 'react-router-dom'
import { Shield, CheckCircle, Phone, AlertTriangle } from 'lucide-react'

export default function CriminalLawPage() {
  const services = [
    'الدفاع في قضايا الجنايات (القتل، السرقة، الاختلاس، التزوير)',
    'الترافع في قضايا الجنح والمخالفات',
    'حضور التحقيقات أمام النيابة العامة مع المتهمين',
    'تقديم طلبات الإفراج والتظلم من قرارات الحبس',
    'الطعن على الأحكام بالاستئناف والنقض',
    'قضايا غسل الأموال والجرائم المالية',
    'الجرائم الإلكترونية وقضايا الإنترنت',
    'حضور عمليات التفتيش والضبط مع العملاء',
  ]

  return (
    <div style={{ direction: 'rtl' }}>
      <section className="relative bg-navy-900 py-16 md:py-24 overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-10 right-10 w-64 h-64 bg-gold-500 rounded-full blur-3xl" />
        </div>
        <div className="relative max-w-5xl mx-auto px-4 text-center">
          <div className="w-16 h-16 bg-gold-500/20 rounded-2xl flex items-center justify-center mx-auto mb-6">
            <Shield size={32} className="text-gold-500" />
          </div>
          <h1 className="text-3xl md:text-5xl font-tajawal font-bold text-white mb-4">قضايا الجنايات والجنح والمخالفات</h1>
          <div className="w-16 h-1 bg-gold-500 mx-auto rounded mb-5" />
          <p className="text-gray-300 font-cairo text-lg max-w-2xl mx-auto leading-relaxed">
            دفاع قوي وحازم عن حقوقك — فريق متخصص في القضايا الجنائية بخبرة واسعة
          </p>
        </div>
      </section>

      <section className="py-14 bg-white">
        <div className="max-w-5xl mx-auto px-4">
          <h2 className="text-2xl font-tajawal font-bold text-navy-900 mb-8 text-center">خدماتنا في القضايا الجنائية</h2>
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

      <section className="py-14 bg-gray-50">
        <div className="max-w-5xl mx-auto px-4">
          <div className="bg-white rounded-2xl p-8 shadow-sm border-r-4 border-gold-500">
            <div className="flex items-start gap-4">
              <AlertTriangle size={28} className="text-gold-500 flex-shrink-0 mt-1" />
              <div>
                <h3 className="font-tajawal font-bold text-navy-900 text-lg mb-2">في حالة الطوارئ القانونية</h3>
                <p className="font-cairo text-gray-600 text-sm leading-relaxed mb-4">
                  إذا تم القبض عليك أو على أحد أفراد أسرتك، تواصل معنا فورًا. نحن متاحون على مدار الساعة في الحالات الطارئة لضمان حماية حقوقك القانونية من اللحظة الأولى.
                </p>
                <div className="flex flex-wrap gap-3">
                  <a href="tel:+971544525880" className="flex items-center gap-2 bg-gold-500 text-white font-bold px-5 py-2 rounded-lg hover:bg-gold-600 transition-colors font-cairo text-sm">
                    <Phone size={14} /> اتصل الآن
                  </a>
                  <a href="https://wa.me/971506207021" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 bg-[#25D366] text-white font-bold px-5 py-2 rounded-lg hover:opacity-90 transition-opacity font-cairo text-sm">
                    <i className="fab fa-whatsapp" /> واتساب طوارئ
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-navy-900 py-12">
        <div className="max-w-3xl mx-auto px-4 text-center">
          <h2 className="text-2xl font-tajawal font-bold text-white mb-3">تحتاج مستشار قانوني جنائي متخصص؟</h2>
          <p className="text-gray-400 font-cairo mb-6">لا تواجه التهم بمفردك — تواصل معنا الآن</p>
          <Link to="/contact" className="inline-flex items-center gap-2 bg-gold-500 text-white font-bold px-8 py-3 rounded-lg hover:bg-gold-600 transition-colors font-cairo">
            <Phone size={16} /> احجز استشارة
          </Link>
        </div>
      </section>
    </div>
  )
}
