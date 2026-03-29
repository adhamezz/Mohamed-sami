import { Link } from 'react-router-dom'
import { FileSignature, CheckCircle, Phone, ArrowRight, Shield } from 'lucide-react'

export default function ContractDraftingPage() {
  const contractTypes = [
    { title: 'عقود البيع والشراء', desc: 'عقود بيع العقارات والمنقولات والأصول التجارية بضمانات قانونية كاملة' },
    { title: 'عقود الإيجار', desc: 'صياغة عقود إيجار المحلات والشقق والعقارات التجارية وفقًا لأحدث التشريعات' },
    { title: 'عقود الشراكة', desc: 'عقود تأسيس الشراكات وتنظيم حقوق والتزامات الشركاء' },
    { title: 'عقود العمل', desc: 'صياغة عقود العمل الفردية والجماعية وفقًا لقانون العمل المصري' },
    { title: 'عقود التوريد والمقاولات', desc: 'عقود توريد البضائع والمواد وعقود المقاولات والأعمال الإنشائية' },
    { title: 'عقود الامتياز والترخيص', desc: 'عقود منح حقوق الامتياز والتراخيص التجارية والصناعية' },
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
            <FileSignature size={32} className="text-gold-500" />
          </div>
          <h1 className="text-3xl md:text-5xl font-tajawal font-bold text-white mb-4">
            صياغة العقود
          </h1>
          <div className="w-16 h-1 bg-gold-500 mx-auto rounded mb-5" />
          <p className="text-gray-300 font-cairo text-lg max-w-2xl mx-auto leading-relaxed">
            صياغة عقود قانونية محكمة ومتوازنة تحمي حقوقك وتضمن التزام جميع الأطراف
          </p>
        </div>
      </section>

      {/* Contract Types */}
      <section className="py-14 bg-white">
        <div className="max-w-5xl mx-auto px-4">
          <h2 className="text-2xl font-tajawal font-bold text-navy-900 mb-8 text-center">أنواع العقود التي نصيغها</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {contractTypes.map((c, i) => (
              <div key={i} className="bg-gray-50 rounded-xl p-6 hover:shadow-md transition-shadow border-r-4 border-gold-500">
                <h3 className="font-tajawal font-bold text-navy-900 mb-3">{c.title}</h3>
                <p className="text-gray-500 font-cairo text-sm leading-relaxed">{c.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Guarantees */}
      <section className="py-14 bg-gray-50">
        <div className="max-w-5xl mx-auto px-4">
          <h2 className="text-2xl font-tajawal font-bold text-navy-900 mb-8 text-center">ضماناتنا في صياغة العقود</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {[
              'صياغة قانونية دقيقة تحمي حقوق جميع الأطراف',
              'مراجعة شاملة لكل بنود العقد قبل التسليم',
              'ضمان توافق العقد مع القوانين والتشريعات السارية',
              'إمكانية التعديل والمراجعة حتى رضا العميل التام',
              'تسليم في المواعيد المتفق عليها',
              'سرية تامة لجميع المعلومات والبيانات',
            ].map((g, i) => (
              <div key={i} className="flex items-start gap-3 bg-white p-4 rounded-xl shadow-sm">
                <Shield size={20} className="text-gold-500 mt-0.5 flex-shrink-0" />
                <p className="font-cairo text-gray-700 text-sm leading-relaxed">{g}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-navy-900 py-12">
        <div className="max-w-3xl mx-auto px-4 text-center">
          <h2 className="text-2xl font-tajawal font-bold text-white mb-3">تحتاج إلى صياغة عقد؟</h2>
          <p className="text-gray-400 font-cairo mb-6">نقدم لك عقدًا محكمًا يحمي حقوقك — تواصل معنا الآن</p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link to="/contact" className="flex items-center gap-2 bg-gold-500 text-white font-bold px-8 py-3 rounded-lg hover:bg-gold-600 transition-colors font-cairo">
              <Phone size={16} /> طلب صياغة عقد
            </Link>
            <Link to="/services/contracts-english" className="flex items-center gap-2 bg-white/10 text-white font-bold px-8 py-3 rounded-lg hover:bg-white/20 transition-colors font-cairo">
              <ArrowRight size={16} className="rotate-180" /> عقود باللغة الإنجليزية
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
