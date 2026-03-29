import { useState } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ChevronLeft, Shield, ExternalLink, AlertCircle, CheckCircle, FileText, HelpCircle } from 'lucide-react'

const steps = [
  {
    title: 'الدخول على موقع التأمينات الاجتماعية',
    description: 'قم بزيارة الموقع الرسمي للهيئة القومية للتأمينات الاجتماعية.',
    url: 'https://www.nosi.gov.eg',
  },
  {
    title: 'اختيار خدمة الاستعلام',
    description: 'من القائمة الرئيسية اختر "الخدمات الإلكترونية" ثم "الاستعلام عن الرقم التأميني".',
  },
  {
    title: 'إدخال البيانات المطلوبة',
    description: 'أدخل الرقم القومي المكون من 14 رقم الموجود على بطاقة الرقم القومي.',
  },
  {
    title: 'عرض النتائج',
    description: 'ستظهر بيانات التأمين الاجتماعي الخاصة بك شاملة الرقم التأميني وبيانات جهة العمل.',
  },
]

const alternativeMethods = [
  {
    title: 'تطبيق التأمينات الاجتماعية',
    description: 'تحميل تطبيق التأمينات الاجتماعية من Google Play أو App Store والاستعلام مباشرة.',
    icon: '📱',
  },
  {
    title: 'خدمة *9528#',
    description: 'اتصل بالكود *9528# من هاتفك المحمول للاستعلام عن الرقم التأميني.',
    icon: '📞',
  },
  {
    title: 'مكاتب التأمينات',
    description: 'التوجه لأقرب مكتب تأمينات اجتماعية ومعك بطاقة الرقم القومي الخاصة بك.',
    icon: '🏢',
  },
  {
    title: 'بوابة مصر الرقمية',
    description: 'يمكنك الاستعلام أيضاً عبر بوابة مصر الرقمية digital.gov.eg.',
    icon: '🌐',
    url: 'https://digital.gov.eg',
  },
]

const requiredDocs = [
  'صورة بطاقة الرقم القومي (سارية)',
  'رقم قومي صحيح مكون من 14 رقم',
  'بيان قيد بالتأمينات (في حال التقدم لمكتب التأمينات)',
]

const faqs = [
  {
    q: 'ما هو الرقم التأميني؟',
    a: 'هو رقم فريد يُمنح لكل مواطن مشترك في نظام التأمينات الاجتماعية، ويستخدم في جميع المعاملات التأمينية والحصول على المعاش.',
  },
  {
    q: 'هل يمكن الاستعلام بدون الرقم القومي؟',
    a: 'لا، الرقم القومي هو الوسيلة الأساسية للاستعلام عن الرقم التأميني إلكترونياً.',
  },
  {
    q: 'ماذا أفعل إذا لم يظهر رقمي التأميني؟',
    a: 'في حال عدم ظهور بياناتك، توجه لأقرب مكتب تأمينات ومعك بطاقة الرقم القومي لتسوية وضعك التأميني.',
  },
  {
    q: 'هل خدمة الاستعلام مجانية؟',
    a: 'نعم، خدمة الاستعلام عن الرقم التأميني مجانية بالكامل سواء إلكترونياً أو عبر مكاتب التأمينات.',
  },
]

export default function InsuranceInquiryPage() {
  const [openFaq, setOpenFaq] = useState(null)

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
            <span className="text-gold-400">استعلام عن الرقم التأميني</span>
          </nav>
          <h1 className="text-3xl md:text-4xl font-tajawal font-bold text-white mb-4">استعلام عن الرقم التأميني</h1>
          <div className="w-14 h-1 bg-gold-500 mx-auto rounded mb-4" />
          <p className="text-gray-300 font-cairo text-base">دليلك الشامل للاستعلام عن الرقم التأميني في مصر</p>
        </div>
      </section>

      <section className="bg-gray-50 py-10">
        <div className="max-w-5xl mx-auto px-4">
          {/* Steps */}
          <div className="mb-10">
            <h2 className="text-xl font-tajawal font-bold text-navy-900 mb-6 flex items-center gap-2">
              <Shield size={24} className="text-gold-500" /> خطوات الاستعلام الإلكتروني
            </h2>
            <div className="space-y-4">
              {steps.map((step, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: 30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="bg-white rounded-xl shadow-sm border border-gray-100 p-5 flex items-start gap-4"
                >
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-gold-500 to-gold-600 flex items-center justify-center text-white font-bold text-lg flex-shrink-0">
                    {i + 1}
                  </div>
                  <div className="flex-1">
                    <h3 className="font-tajawal font-bold text-navy-900">{step.title}</h3>
                    <p className="text-gray-600 font-cairo text-sm mt-1">{step.description}</p>
                    {step.url && (
                      <a href={step.url} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 text-sm text-gold-600 hover:text-gold-700 font-cairo mt-2">
                        <ExternalLink size={14} /> زيارة الموقع
                      </a>
                    )}
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Alternative Methods */}
          <div className="mb-10">
            <h2 className="text-xl font-tajawal font-bold text-navy-900 mb-6">طرق بديلة للاستعلام</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {alternativeMethods.map((m, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="bg-white rounded-xl shadow-sm p-5 flex items-start gap-4 border border-gray-100"
                >
                  <span className="text-3xl">{m.icon}</span>
                  <div>
                    <h3 className="font-tajawal font-bold text-navy-900 text-sm">{m.title}</h3>
                    <p className="text-gray-600 font-cairo text-xs mt-1 leading-relaxed">{m.description}</p>
                    {m.url && (
                      <a href={m.url} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 text-xs text-gold-600 font-cairo mt-1">
                        <ExternalLink size={12} /> زيارة
                      </a>
                    )}
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Required Documents */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 mb-10">
            <h3 className="font-tajawal font-bold text-navy-900 text-lg mb-4 flex items-center gap-2">
              <FileText size={20} className="text-gold-500" /> المستندات المطلوبة
            </h3>
            <ul className="space-y-2">
              {requiredDocs.map((doc, i) => (
                <li key={i} className="flex items-center gap-3 text-sm font-cairo text-gray-700">
                  <CheckCircle size={16} className="text-green-500 flex-shrink-0" />
                  {doc}
                </li>
              ))}
            </ul>
          </div>

          {/* FAQs */}
          <div className="mb-10">
            <h2 className="text-xl font-tajawal font-bold text-navy-900 mb-6 flex items-center gap-2">
              <HelpCircle size={24} className="text-gold-500" /> أسئلة شائعة
            </h2>
            <div className="space-y-3">
              {faqs.map((faq, i) => (
                <div
                  key={i}
                  className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden"
                >
                  <button
                    onClick={() => setOpenFaq(openFaq === i ? null : i)}
                    className="w-full text-right p-4 flex items-center justify-between"
                  >
                    <h3 className="font-tajawal font-bold text-navy-900 text-sm">{faq.q}</h3>
                    <ChevronLeft size={16} className={`text-gray-400 transition-transform ${openFaq === i ? '-rotate-90' : ''}`} />
                  </button>
                  {openFaq === i && (
                    <div className="px-4 pb-4">
                      <p className="text-gray-600 font-cairo text-sm leading-relaxed border-t border-gray-100 pt-3">{faq.a}</p>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
