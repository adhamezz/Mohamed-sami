import { Link } from 'react-router-dom'
import { MessageSquare, CheckCircle, Clock, Phone, ArrowRight, Users } from 'lucide-react'

export default function LegalConsultPage() {
  const consultTypes = [
    { title: 'استشارات الشركات', desc: 'تأسيس وإدارة الشركات، عقود الشراكة، الاندماج والاستحواذ، وحوكمة الشركات' },
    { title: 'استشارات العقود', desc: 'مراجعة وصياغة العقود التجارية والمدنية وعقود العمل وعقود الإيجار' },
    { title: 'استشارات عقارية', desc: 'معاملات البيع والشراء، التسجيل العقاري، قضايا الإيجارات والملكية' },
    { title: 'استشارات أسرية', desc: 'قضايا الزواج والطلاق والنفقة والحضانة وتقسيم الميراث' },
    { title: 'استشارات جنائية', desc: 'الدفاع في القضايا الجنائية، حقوق المتهم، إجراءات التحقيق' },
    { title: 'استشارات ضريبية', desc: 'التخطيط الضريبي، المنازعات الضريبية، الالتزامات الضريبية للشركات' },
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
            <MessageSquare size={32} className="text-gold-500" />
          </div>
          <h1 className="text-3xl md:text-5xl font-tajawal font-bold text-white mb-4">
            الاستشارات القانونية
          </h1>
          <div className="w-16 h-1 bg-gold-500 mx-auto rounded mb-5" />
          <p className="text-gray-300 font-cairo text-lg max-w-2xl mx-auto leading-relaxed">
            نقدم استشارات قانونية شاملة ومتخصصة لمساعدتك في اتخاذ القرارات الصحيحة وحماية حقوقك القانونية
          </p>
        </div>
      </section>

      {/* How it works */}
      <section className="py-12 bg-white border-b border-gray-100">
        <div className="max-w-4xl mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { icon: Phone, title: 'تواصل معنا', desc: 'اتصل بنا أو أرسل استفسارك عبر النموذج' },
              { icon: Users, title: 'جلسة استشارية', desc: 'نحدد موعدًا لمناقشة تفاصيل قضيتك' },
              { icon: CheckCircle, title: 'الرأي القانوني', desc: 'نقدم لك رأيًا قانونيًا مفصلًا وخطة عمل' },
            ].map((s, i) => (
              <div key={i} className="text-center p-6">
                <div className="w-14 h-14 bg-gold-50 rounded-xl flex items-center justify-center mx-auto mb-4">
                  <s.icon size={24} className="text-gold-500" />
                </div>
                <h3 className="font-tajawal font-bold text-navy-900 mb-2">{s.title}</h3>
                <p className="text-gray-500 font-cairo text-sm">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Consultation Types */}
      <section className="py-14 bg-gray-50">
        <div className="max-w-5xl mx-auto px-4">
          <h2 className="text-2xl font-tajawal font-bold text-navy-900 mb-8 text-center">مجالات الاستشارات القانونية</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {consultTypes.map((c, i) => (
              <div key={i} className="bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow border-t-2 border-transparent hover:border-gold-500">
                <h3 className="font-tajawal font-bold text-navy-900 mb-3 text-lg">{c.title}</h3>
                <p className="text-gray-500 font-cairo text-sm leading-relaxed">{c.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section className="py-14 bg-white">
        <div className="max-w-5xl mx-auto px-4">
          <h2 className="text-2xl font-tajawal font-bold text-navy-900 mb-8 text-center">مميزات استشاراتنا</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {[
              'استشارات من مستشار قانوني متخصص بخبرة واسعة',
              'سرعة الاستجابة والتواصل المستمر مع العميل',
              'تقديم حلول قانونية عملية وقابلة للتنفيذ',
              'متابعة مستمرة حتى حل المشكلة بالكامل',
              'سرية تامة في التعامل مع كافة المعلومات',
              'أسعار تنافسية وشفافية كاملة في التكاليف',
            ].map((b, i) => (
              <div key={i} className="flex items-start gap-3 bg-gray-50 p-4 rounded-xl">
                <CheckCircle size={20} className="text-gold-500 mt-0.5 flex-shrink-0" />
                <p className="font-cairo text-gray-700 text-sm leading-relaxed">{b}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-navy-900 py-12">
        <div className="max-w-3xl mx-auto px-4 text-center">
          <Clock size={36} className="text-gold-500 mx-auto mb-4" />
          <h2 className="text-2xl font-tajawal font-bold text-white mb-3">احصل على استشارتك القانونية الآن</h2>
          <p className="text-gray-400 font-cairo mb-6">لا تتردد في التواصل معنا — جلستك الاستشارية الأولى مجانية</p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link to="/contact" className="flex items-center gap-2 bg-gold-500 text-white font-bold px-8 py-3 rounded-lg hover:bg-gold-600 transition-colors font-cairo">
              <Phone size={16} /> احجز استشارة
            </Link>
            <a href="https://wa.me/971506207021" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 bg-[#25D366] text-white font-bold px-8 py-3 rounded-lg hover:opacity-90 transition-opacity font-cairo">
              <i className="fab fa-whatsapp" /> واتساب
            </a>
          </div>
        </div>
      </section>
    </div>
  )
}
