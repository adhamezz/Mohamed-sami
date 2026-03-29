import { useState } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Search, ChevronLeft, FileSearch, ExternalLink, AlertCircle, CheckCircle } from 'lucide-react'

const inquiryMethods = [
  {
    title: 'بوابة العدالة - وزارة العدل المصرية',
    description: 'الموقع الرسمي لوزارة العدل للاستعلام عن القضايا المنظورة أمام جميع المحاكم المصرية بأنواعها.',
    url: 'https://www.justice.gov.eg',
    steps: [
      'ادخل على بوابة العدالة الرقمية',
      'اختر "خدمات التقاضي"',
      'اختر "الاستعلام عن القضايا"',
      'أدخل رقم الدعوى والسنة القضائية',
      'اختر نوع المحكمة (جزئي / كلي / استئنافي / نقض)',
      'اضغط على "بحث" لعرض تفاصيل القضية',
    ],
    color: 'from-blue-500 to-blue-600',
  },
  {
    title: 'بوابة الحكومة المصرية',
    description: 'خدمات الاستعلام القضائي عبر البوابة الحكومية الموحدة مصر الرقمية.',
    url: 'https://digital.gov.eg',
    steps: [
      'ادخل على بوابة مصر الرقمية',
      'سجل الدخول أو أنشئ حساب',
      'اختر "خدمات العدالة"',
      'اختر "الاستعلام عن قضية"',
      'أدخل بيانات القضية المطلوبة',
    ],
    color: 'from-green-500 to-green-600',
  },
  {
    title: 'نظام معلومات النيابة العامة',
    description: 'الاستعلام عن القضايا المنظورة أمام النيابة العامة ومعرفة مراحل التحقيق.',
    url: 'https://www.ppo.gov.eg',
    steps: [
      'ادخل على موقع النيابة العامة',
      'اختر "الخدمات الإلكترونية"',
      'أدخل رقم المحضر أو القضية',
      'حدد النيابة المختصة',
      'عرض حالة القضية والقرارات',
    ],
    color: 'from-purple-500 to-purple-600',
  },
  {
    title: 'الاستعلام عن أحكام محكمة النقض',
    description: 'البحث في أحكام ومبادئ محكمة النقض المصرية وطعون النقض.',
    url: 'https://www.cc.gov.eg',
    steps: [
      'ادخل على موقع محكمة النقض',
      'اختر "الاستعلام عن الطعون"',
      'أدخل رقم الطعن والسنة القضائية',
      'يمكنك أيضاً البحث بالموضوع أو المبدأ القانوني',
    ],
    color: 'from-amber-500 to-amber-600',
  },
  {
    title: 'مجلس الدولة - المحاكم الإدارية',
    description: 'الاستعلام عن الدعاوى الإدارية المنظورة أمام محاكم مجلس الدولة.',
    url: 'https://www.scc-egypt.gov.eg',
    steps: [
      'ادخل على موقع مجلس الدولة',
      'اختر "الخدمات الإلكترونية"',
      'اختر "الاستعلام عن الدعاوى"',
      'أدخل رقم الدعوى وبيانات المحكمة',
    ],
    color: 'from-red-500 to-red-600',
  },
  // ===== الإمارات =====
  {
    title: 'دائرة القضاء - أبوظبي (ADJD)',
    description: 'البوابة الرسمية لدائرة القضاء في أبوظبي للاستعلام عن القضايا وجلسات المحاكمة ومتابعة حالة الدعاوى في جميع محاكم إمارة أبوظبي.',
    url: 'https://www.adjd.gov.ae',
    steps: [
      'ادخل على موقع دائرة القضاء أبوظبي adjd.gov.ae',
      'اختر "الخدمات الإلكترونية" من القائمة الرئيسية',
      'اختر "الاستعلام عن القضايا"',
      'أدخل رقم الدعوى أو الرقم الموحد للقضية',
      'يمكنك أيضاً الاستعلام عبر رقم الهوية الإماراتية',
      'ستظهر تفاصيل القضية وموعد الجلسة القادمة',
    ],
    color: 'from-teal-500 to-teal-600',
  },
  {
    title: 'تطبيق "عدالة" - أبوظبي',
    description: 'تطبيق عدالة الذكي من دائرة القضاء بأبوظبي يتيح الاستعلام عن القضايا ومتابعة الجلسات وتقديم الطلبات إلكترونياً عبر الهاتف.',
    url: 'https://www.adjd.gov.ae/AR/Pages/SmartServices.aspx',
    steps: [
      'حمّل تطبيق "عدالة" من App Store أو Google Play',
      'سجّل الدخول بالهوية الرقمية UAE Pass',
      'اختر "قضاياي" لعرض جميع القضايا المرتبطة بك',
      'يمكنك متابعة حالة القضية والإشعارات الفورية',
      'يتيح التطبيق أيضاً الدفع الإلكتروني للرسوم',
    ],
    color: 'from-sky-500 to-sky-600',
  },
  {
    title: 'محاكم دبي - الخدمات الإلكترونية',
    description: 'البوابة الرسمية لمحاكم دبي توفر خدمة الاستعلام عن القضايا والأحكام والجلسات في جميع محاكم إمارة دبي بكافة درجاتها.',
    url: 'https://www.dc.gov.ae',
    steps: [
      'ادخل على موقع محاكم دبي dc.gov.ae',
      'اختر "الخدمات الإلكترونية"',
      'اختر "الاستعلام عن قضية"',
      'أدخل رقم القضية أو رقم الهوية الإماراتية',
      'اختر نوع المحكمة (ابتدائية / استئناف / تمييز)',
      'يمكنك أيضاً الاستعلام عن مواعيد الجلسات والأحكام',
    ],
    color: 'from-indigo-500 to-indigo-600',
  },
  {
    title: 'تطبيق محاكم دبي الذكي',
    description: 'التطبيق الرسمي لمحاكم دبي يتيح رفع الدعاوى والاستعلام عنها وحضور الجلسات عن بُعد والدفع الإلكتروني.',
    url: 'https://www.dc.gov.ae/pub/ar/eservices',
    steps: [
      'حمّل تطبيق "محاكم دبي" من متجر التطبيقات',
      'سجّل الدخول عبر UAE Pass',
      'اختر "الاستعلام عن القضايا"',
      'أدخل رقم القضية أو اختر من قضاياك المسجلة',
      'يتيح التطبيق حضور الجلسات عن بُعد (المحاكمة عن بُعد)',
    ],
    color: 'from-violet-500 to-violet-600',
  },
  {
    title: 'محاكم مركز دبي المالي العالمي (DIFC)',
    description: 'محاكم مركز دبي المالي العالمي المتخصصة في النزاعات التجارية والمالية الدولية داخل المنطقة الحرة.',
    url: 'https://www.difccourts.ae',
    steps: [
      'ادخل على موقع محاكم DIFC difccourts.ae',
      'اختر "Case Search" من القائمة',
      'أدخل رقم القضية أو اسم الأطراف',
      'القضايا والأحكام متاحة باللغة الإنجليزية',
    ],
    color: 'from-rose-500 to-rose-600',
  },
  {
    title: 'وزارة العدل الاتحادية - الإمارات',
    description: 'البوابة الرسمية لوزارة العدل الاتحادية الإماراتية للاستعلام عن القضايا الاتحادية وتنفيذ الأحكام.',
    url: 'https://www.moj.gov.ae',
    steps: [
      'ادخل على موقع وزارة العدل moj.gov.ae',
      'اختر "الخدمات الإلكترونية"',
      'اختر "الاستعلام عن القضايا الاتحادية"',
      'أدخل رقم القضية والمحكمة المختصة',
      'يمكنك أيضاً الاستعلام عن التنفيذ والتوثيق',
    ],
    color: 'from-orange-500 to-orange-600',
  },
]

const tips = [
  'تأكد من صحة رقم الدعوى والسنة القضائية قبل البحث.',
  'حدد نوع المحكمة بدقة (جزئي - كلي - استئنافي - نقض - إداري).',
  'يمكنك البحث بالرقم القومي للمتقاضي في بعض المنصات.',
  'احتفظ برقم الدعوى للمتابعة الدورية.',
  'في حال عدم ظهور النتائج تواصل مع المحكمة المختصة.',
  'في الإمارات: استخدم UAE Pass لتسجيل الدخول في جميع خدمات المحاكم الإلكترونية.',
  'محاكم أبوظبي ودبي توفر خدمة حضور الجلسات عن بُعد عبر تطبيقاتها الذكية.',
  'محاكم DIFC تختص بالقضايا التجارية والمالية داخل مركز دبي المالي العالمي فقط.',
]

export default function CaseInquiryPage() {
  const [expanded, setExpanded] = useState(null)

  return (
    <div style={{ direction: 'rtl' }}>
      {/* Hero */}
      <section className="relative bg-navy-900 py-12 md:py-16 overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-10 right-10 w-64 h-64 bg-gold-500 rounded-full blur-3xl" />
        </div>
        <div className="relative max-w-4xl mx-auto px-4 text-center">
          <nav className="flex items-center justify-center gap-2 text-sm font-cairo text-gray-400 mb-6">
            <Link to="/" className="hover:text-gold-400 transition-colors">الرئيسية</Link>
            <ChevronLeft size={14} />
            <Link to="/guide/egyptian-law-codes" className="hover:text-gold-400 transition-colors">دليل المستشار</Link>
            <ChevronLeft size={14} />
            <span className="text-gold-400">استعلام عن قضية</span>
          </nav>
          <h1 className="text-3xl md:text-4xl font-tajawal font-bold text-white mb-4">استعلام عن قضية</h1>
          <div className="w-14 h-1 bg-gold-500 mx-auto rounded mb-4" />
          <p className="text-gray-300 font-cairo text-base">دليل شامل للاستعلام عن القضايا المنظورة أمام المحاكم المصرية</p>
        </div>
      </section>

      <section className="bg-gray-50 py-10">
        <div className="max-w-5xl mx-auto px-4">
          {/* Methods */}
          <div className="space-y-6 mb-10">
            {inquiryMethods.map((method, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden"
              >
                <div className={`h-1.5 bg-gradient-to-l ${method.color}`} />
                <div className="p-6">
                  <div className="flex items-start gap-4 cursor-pointer" onClick={() => setExpanded(expanded === i ? null : i)}>
                    <div className={`w-12 h-12 rounded-lg bg-gradient-to-br ${method.color} flex items-center justify-center flex-shrink-0`}>
                      <FileSearch size={24} className="text-white" />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-tajawal font-bold text-navy-900 text-lg">{method.title}</h3>
                      <p className="text-gray-600 font-cairo text-sm mt-1">{method.description}</p>
                    </div>
                    <a
                      href={method.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={e => e.stopPropagation()}
                      className="flex items-center gap-1 text-sm font-cairo text-gold-600 hover:text-gold-700 bg-gold-50 px-4 py-2 rounded-lg whitespace-nowrap"
                    >
                      <ExternalLink size={14} /> زيارة الموقع
                    </a>
                  </div>

                  {expanded === i && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      className="mt-5 pt-5 border-t border-gray-100"
                    >
                      <h4 className="text-sm font-tajawal font-bold text-navy-900 mb-3">خطوات الاستعلام:</h4>
                      <ol className="space-y-2">
                        {method.steps.map((step, j) => (
                          <li key={j} className="flex items-start gap-3 text-sm font-cairo text-gray-700">
                            <span className="w-6 h-6 bg-gold-50 text-gold-600 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0 mt-0.5">{j + 1}</span>
                            {step}
                          </li>
                        ))}
                      </ol>
                    </motion.div>
                  )}
                </div>
              </motion.div>
            ))}
          </div>

          {/* Tips */}
          <div className="bg-white rounded-xl shadow-sm border border-gold-100 p-6">
            <h3 className="font-tajawal font-bold text-navy-900 text-lg mb-4 flex items-center gap-2">
              <AlertCircle size={20} className="text-gold-500" /> نصائح هامة للاستعلام
            </h3>
            <ul className="space-y-3">
              {tips.map((tip, i) => (
                <li key={i} className="flex items-start gap-3 text-sm font-cairo text-gray-700">
                  <CheckCircle size={16} className="text-green-500 flex-shrink-0 mt-0.5" />
                  {tip}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>
    </div>
  )
}
