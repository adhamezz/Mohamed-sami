import { Link } from 'react-router-dom'
import { Landmark, CheckCircle, Phone, Briefcase } from 'lucide-react'

export default function AdminLaborPage() {
  const adminCases = [
    'الطعن على القرارات الإدارية أمام مجلس الدولة',
    'دعاوى الإلغاء والتعويض ضد الجهات الحكومية',
    'قضايا التعيين والترقية والنقل في الجهاز الإداري',
    'المنازعات المتعلقة بالعقود الإدارية',
    'دعاوى التأديب والفصل من الخدمة',
    'الطعن على نتائج المناقصات والمزايدات',
  ]

  const laborCases = [
    'قضايا الفصل التعسفي والتعويض عنه',
    'المطالبة بمستحقات نهاية الخدمة والمكافآت',
    'منازعات عقود العمل وشروطها',
    'قضايا إصابات العمل والأمراض المهنية',
    'نزاعات الأجور والعلاوات والحوافز',
    'قضايا التأمينات الاجتماعية والمعاشات',
  ]

  return (
    <div style={{ direction: 'rtl' }}>
      <section className="relative bg-navy-900 py-16 md:py-24 overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-10 right-10 w-64 h-64 bg-gold-500 rounded-full blur-3xl" />
        </div>
        <div className="relative max-w-5xl mx-auto px-4 text-center">
          <div className="w-16 h-16 bg-gold-500/20 rounded-2xl flex items-center justify-center mx-auto mb-6">
            <Landmark size={32} className="text-gold-500" />
          </div>
          <h1 className="text-3xl md:text-5xl font-tajawal font-bold text-white mb-4">القضاء الإداري والقضايا العمالية</h1>
          <div className="w-16 h-1 bg-gold-500 mx-auto rounded mb-5" />
          <p className="text-gray-300 font-cairo text-lg max-w-2xl mx-auto leading-relaxed">
            دفاع متخصص أمام مجلس الدولة ومحاكم العمل لحماية حقوق الموظفين والعمال
          </p>
        </div>
      </section>

      <section className="py-14 bg-white">
        <div className="max-w-5xl mx-auto px-4 grid grid-cols-1 lg:grid-cols-2 gap-10">
          <div>
            <h2 className="text-xl font-tajawal font-bold text-navy-900 mb-6 flex items-center gap-2">
              <div className="w-2 h-6 bg-gold-500 rounded" /> دعاوى القضاء الإداري
            </h2>
            <div className="space-y-3">
              {adminCases.map((s, i) => (
                <div key={i} className="flex items-start gap-3 bg-gray-50 p-4 rounded-xl">
                  <Landmark size={18} className="text-gold-500 mt-0.5 flex-shrink-0" />
                  <p className="font-cairo text-gray-700 text-sm leading-relaxed">{s}</p>
                </div>
              ))}
            </div>
          </div>
          <div>
            <h2 className="text-xl font-tajawal font-bold text-navy-900 mb-6 flex items-center gap-2">
              <div className="w-2 h-6 bg-gold-500 rounded" /> القضايا العمالية
            </h2>
            <div className="space-y-3">
              {laborCases.map((s, i) => (
                <div key={i} className="flex items-start gap-3 bg-gray-50 p-4 rounded-xl">
                  <Briefcase size={18} className="text-gold-500 mt-0.5 flex-shrink-0" />
                  <p className="font-cairo text-gray-700 text-sm leading-relaxed">{s}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="py-14 bg-gray-50">
        <div className="max-w-5xl mx-auto px-4">
          <h2 className="text-2xl font-tajawal font-bold text-navy-900 mb-8 text-center">مميزاتنا</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { title: 'خبرة أمام مجلس الدولة', desc: 'ترافعنا أمام محاكم مجلس الدولة بجميع دوائره وتخصصاته' },
              { title: 'متابعة شاملة', desc: 'نتابع القضية من أول إجراء حتى تنفيذ الحكم النهائي' },
              { title: 'استشارات وقائية', desc: 'نقدم استشارات لتجنب النزاعات قبل وقوعها' },
            ].map((item, i) => (
              <div key={i} className="bg-white rounded-xl p-6 shadow-sm text-center">
                <CheckCircle size={28} className="text-gold-500 mx-auto mb-4" />
                <h3 className="font-tajawal font-bold text-navy-900 mb-2">{item.title}</h3>
                <p className="text-gray-500 font-cairo text-sm leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-navy-900 py-12">
        <div className="max-w-3xl mx-auto px-4 text-center">
          <h2 className="text-2xl font-tajawal font-bold text-white mb-3">تحتاج مساعدة قانونية؟</h2>
          <p className="text-gray-400 font-cairo mb-6">سواء كنت موظفًا أو عاملاً أو صاحب عمل — نحن هنا لمساعدتك</p>
          <Link to="/contact" className="inline-flex items-center gap-2 bg-gold-500 text-white font-bold px-8 py-3 rounded-lg hover:bg-gold-600 transition-colors font-cairo">
            <Phone size={16} /> تواصل معنا
          </Link>
        </div>
      </section>
    </div>
  )
}
