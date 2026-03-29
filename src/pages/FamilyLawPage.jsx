import { Link } from 'react-router-dom'
import { Heart, CheckCircle, Phone, Users, Shield } from 'lucide-react'

export default function FamilyLawPage() {
  const caseTypes = [
    { title: 'قضايا الطلاق', desc: 'نتولى إجراءات الطلاق بأنواعه (للضرر، الخلع، الغيابي) مع حماية حقوق موكلنا' },
    { title: 'قضايا النفقة', desc: 'نفقة الزوجة والأولاد ونفقة العدة والمتعة وتعديل النفقة بالزيادة أو النقصان' },
    { title: 'قضايا الحضانة', desc: 'الحصول على حق الحضانة وضم الصغير وتنظيم حق الرؤية' },
    { title: 'قضايا الميراث', desc: 'تقسيم التركات وإعلام الوراثة ودعاوى الحصول على الحقوق الميراثية' },
    { title: 'قضايا النسب', desc: 'إثبات النسب ونفيه والقضايا المتعلقة بالبنوة والأبوة' },
    { title: 'قضايا الولاية', desc: 'الولاية على المال والولاية التعليمية والإذن بالسفر' },
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
            <Heart size={32} className="text-gold-500" />
          </div>
          <h1 className="text-3xl md:text-5xl font-tajawal font-bold text-white mb-4">
            قضايا الأحوال الشخصية
          </h1>
          <div className="w-16 h-1 bg-gold-500 mx-auto rounded mb-5" />
          <p className="text-gray-300 font-cairo text-lg max-w-2xl mx-auto leading-relaxed">
            نتعامل مع قضايا الأسرة بأعلى درجات السرية والحساسية لحماية حقوق جميع أفراد الأسرة
          </p>
        </div>
      </section>

      {/* Case Types */}
      <section className="py-14 bg-white">
        <div className="max-w-5xl mx-auto px-4">
          <h2 className="text-2xl font-tajawal font-bold text-navy-900 mb-8 text-center">أنواع قضايا الأحوال الشخصية</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {caseTypes.map((c, i) => (
              <div key={i} className="bg-gray-50 rounded-xl p-6 hover:shadow-md transition-shadow">
                <div className="w-10 h-10 bg-gold-100 rounded-lg flex items-center justify-center mb-4">
                  <Heart size={20} className="text-gold-600" />
                </div>
                <h3 className="font-tajawal font-bold text-navy-900 mb-2">{c.title}</h3>
                <p className="text-gray-500 font-cairo text-sm leading-relaxed">{c.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why choose us */}
      <section className="py-14 bg-gray-50">
        <div className="max-w-5xl mx-auto px-4">
          <h2 className="text-2xl font-tajawal font-bold text-navy-900 mb-8 text-center">لماذا تختارنا في قضايا الأسرة؟</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {[
              'خبرة طويلة في قضايا الأحوال الشخصية أمام محاكم الأسرة',
              'تعامل بسرية تامة وحساسية عالية مع جميع القضايا',
              'نسبة نجاح عالية في قضايا الحضانة والنفقة',
              'دعم قانوني ونفسي للعملاء خلال مراحل القضية',
              'تسوية ودية كلما أمكن حفاظًا على استقرار الأسرة',
              'متابعة مستمرة لتنفيذ الأحكام بعد صدورها',
            ].map((item, i) => (
              <div key={i} className="flex items-start gap-3 bg-white p-4 rounded-xl shadow-sm">
                <CheckCircle size={20} className="text-gold-500 mt-0.5 flex-shrink-0" />
                <p className="font-cairo text-gray-700 text-sm leading-relaxed">{item}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-navy-900 py-12">
        <div className="max-w-3xl mx-auto px-4 text-center">
          <Users size={36} className="text-gold-500 mx-auto mb-4" />
          <h2 className="text-2xl font-tajawal font-bold text-white mb-3">نحن هنا لمساعدتك</h2>
          <p className="text-gray-400 font-cairo mb-6">تواصل معنا بسرية تامة — جلستك الاستشارية الأولى مجانية</p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link to="/contact" className="flex items-center gap-2 bg-gold-500 text-white font-bold px-8 py-3 rounded-lg hover:bg-gold-600 transition-colors font-cairo">
              <Phone size={16} /> تواصل معنا
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
