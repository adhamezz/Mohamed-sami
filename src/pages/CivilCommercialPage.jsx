import { Link } from 'react-router-dom'
import { Scale, CheckCircle, Phone, Briefcase } from 'lucide-react'

export default function CivilCommercialPage() {
  const civilCases = [
    'دعاوى التعويض عن الأضرار المادية والمعنوية',
    'دعاوى الملكية والحيازة والإخلاء',
    'دعاوى العقود والالتزامات',
    'دعاوى المطالبة بالحقوق المالية',
    'دعاوى التنفيذ وإشكالاته',
    'قضايا الإيجارات',
  ]

  const commercialCases = [
    'المنازعات التجارية بين الشركات والتجار',
    'قضايا الإفلاس والتصفية والحراسة القضائية',
    'منازعات الشيكات والأوراق التجارية',
    'قضايا الوكالات التجارية والتوزيع',
    'منازعات الامتياز التجاري (الفرانشايز)',
    'قضايا المنافسة غير المشروعة',
  ]

  return (
    <div style={{ direction: 'rtl' }}>
      <section className="relative bg-navy-900 py-16 md:py-24 overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-10 right-10 w-64 h-64 bg-gold-500 rounded-full blur-3xl" />
        </div>
        <div className="relative max-w-5xl mx-auto px-4 text-center">
          <div className="w-16 h-16 bg-gold-500/20 rounded-2xl flex items-center justify-center mx-auto mb-6">
            <Scale size={32} className="text-gold-500" />
          </div>
          <h1 className="text-3xl md:text-5xl font-tajawal font-bold text-white mb-4">القضايا المدنية والتجارية</h1>
          <div className="w-16 h-1 bg-gold-500 mx-auto rounded mb-5" />
          <p className="text-gray-300 font-cairo text-lg max-w-2xl mx-auto leading-relaxed">
            خبرة واسعة في التعامل مع القضايا المدنية والتجارية بجميع أنواعها ودرجاتها
          </p>
        </div>
      </section>

      <section className="py-14 bg-white">
        <div className="max-w-5xl mx-auto px-4 grid grid-cols-1 lg:grid-cols-2 gap-10">
          <div>
            <h2 className="text-xl font-tajawal font-bold text-navy-900 mb-6 flex items-center gap-2">
              <div className="w-2 h-6 bg-gold-500 rounded" /> القضايا المدنية
            </h2>
            <div className="space-y-3">
              {civilCases.map((s, i) => (
                <div key={i} className="flex items-start gap-3 bg-gray-50 p-4 rounded-xl">
                  <CheckCircle size={18} className="text-gold-500 mt-0.5 flex-shrink-0" />
                  <p className="font-cairo text-gray-700 text-sm leading-relaxed">{s}</p>
                </div>
              ))}
            </div>
          </div>
          <div>
            <h2 className="text-xl font-tajawal font-bold text-navy-900 mb-6 flex items-center gap-2">
              <div className="w-2 h-6 bg-gold-500 rounded" /> القضايا التجارية
            </h2>
            <div className="space-y-3">
              {commercialCases.map((s, i) => (
                <div key={i} className="flex items-start gap-3 bg-gray-50 p-4 rounded-xl">
                  <Briefcase size={18} className="text-gold-500 mt-0.5 flex-shrink-0" />
                  <p className="font-cairo text-gray-700 text-sm leading-relaxed">{s}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="bg-navy-900 py-12">
        <div className="max-w-3xl mx-auto px-4 text-center">
          <h2 className="text-2xl font-tajawal font-bold text-white mb-3">لديك قضية مدنية أو تجارية؟</h2>
          <p className="text-gray-400 font-cairo mb-6">نتولى القضية من البداية حتى تحقيق النتيجة المرجوة</p>
          <Link to="/contact" className="inline-flex items-center gap-2 bg-gold-500 text-white font-bold px-8 py-3 rounded-lg hover:bg-gold-600 transition-colors font-cairo">
            <Phone size={16} /> تواصل معنا
          </Link>
        </div>
      </section>
    </div>
  )
}
