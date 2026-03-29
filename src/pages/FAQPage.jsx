import { useState } from 'react'
import { Link } from 'react-router-dom'
import { HelpCircle, ChevronDown, Phone, Search } from 'lucide-react'
import SEO from '../components/SEO'

const faqData = [
  {
    category: 'استشارات عامة',
    questions: [
      {
        q: 'كيف يمكنني حجز استشارة قانونية؟',
        a: 'يمكنك حجز استشارة عن طريق الاتصال بنا مباشرة أو عبر الواتساب أو من خلال نموذج التواصل على الموقع. سنقوم بتحديد موعد مناسب لك في أقرب وقت.',
      },
      {
        q: 'هل الاستشارة الأولى مجانية؟',
        a: 'نعم، نقدم الاستشارة الأولى مجانًا لتقييم قضيتك وتحديد أفضل طريقة للمساعدة. بعد ذلك يتم الاتفاق على الأتعاب حسب نوع القضية.',
      },
      {
        q: 'ما هي ساعات العمل؟',
        a: 'نعمل من الأحد إلى الخميس من الساعة ٩ صباحًا حتى ٥ مساءً. كما يمكن ترتيب مواعيد خارج ساعات العمل في الحالات العاجلة.',
      },
      {
        q: 'هل يمكن الحصول على استشارة عن بُعد؟',
        a: 'نعم، نقدم استشارات عبر الهاتف والفيديو للعملاء الذين لا يستطيعون الحضور شخصيًا. نستخدم أحدث وسائل الاتصال لضمان تجربة مريحة.',
      },
    ],
  },
  {
    category: 'قضايا الأحوال الشخصية',
    questions: [
      {
        q: 'ما هي إجراءات رفع دعوى طلاق؟',
        a: 'تبدأ إجراءات الطلاق بتقديم طلب إلى مكتب تسوية المنازعات الأسرية، ثم إذا لم تنجح التسوية يتم رفع الدعوى أمام محكمة الأسرة. نقوم بمتابعة جميع الإجراءات بالنيابة عنك.',
      },
      {
        q: 'كيف يتم حساب النفقة؟',
        a: 'يتم تحديد النفقة بناءً على دخل الزوج وحالته المادية واحتياجات الزوجة والأولاد. المحكمة تأخذ في الاعتبار مستوى المعيشة والظروف الاقتصادية.',
      },
      {
        q: 'ما هو سن الحضانة في القانون المصري؟',
        a: 'وفقًا لآخر التعديلات، تستمر حضانة الأم حتى سن ١٥ عامًا للذكور والإناث، ثم يُخيّر المحضون بين الإقامة مع الأم أو الأب.',
      },
    ],
  },
  {
    category: 'العقود والشركات',
    questions: [
      {
        q: 'ما هي أنواع الشركات في القانون المصري؟',
        a: 'يتضمن القانون المصري عدة أنواع: الشركات المساهمة، شركات التوصية بالأسهم، الشركات ذات المسؤولية المحدودة، شركات التوصية البسيطة، وشركات التضامن. كل نوع له خصائصه ومتطلباته.',
      },
      {
        q: 'كم يستغرق تأسيس شركة في مصر؟',
        a: 'تختلف المدة حسب نوع الشركة. عادةً تستغرق العملية من أسبوع إلى ثلاثة أسابيع تشمل إعداد العقد والتوثيق والتسجيل في السجل التجاري والحصول على البطاقة الضريبية.',
      },
      {
        q: 'هل يمكن تعديل عقد بعد توقيعه؟',
        a: 'نعم، يمكن تعديل العقد بموافقة جميع الأطراف من خلال ملحق للعقد الأصلي. لكن التعديل من طرف واحد غير ممكن إلا إذا نص العقد على ذلك صراحةً.',
      },
    ],
  },
  {
    category: 'القضايا الجنائية',
    questions: [
      {
        q: 'ما هي حقوقي عند القبض عليّ؟',
        a: 'من حقك الصمت وعدم الإجابة على أي أسئلة، ومن حقك طلب محامٍ فورًا. لا يجوز احتجازك لأكثر من ٢٤ ساعة دون أمر من النيابة العامة. ومن حقك إبلاغ أسرتك بمكان احتجازك.',
      },
      {
        q: 'ما الفرق بين الجنحة والجناية؟',
        a: 'الجنحة هي جريمة عقوبتها الحبس حتى ٣ سنوات أو الغرامة. أما الجناية فهي جريمة عقوبتها السجن المشدد أو المؤبد أو الإعدام. الجناية أشد خطورة وتُنظر أمام محكمة الجنايات.',
      },
    ],
  },
]

export default function FAQPage() {
  const [openIndex, setOpenIndex] = useState(null)
  const [searchQuery, setSearchQuery] = useState('')

  const toggle = (key) => {
    setOpenIndex(openIndex === key ? null : key)
  }

  const filteredFaq = faqData.map((cat) => ({
    ...cat,
    questions: cat.questions.filter(
      (item) =>
        !searchQuery.trim() ||
        item.q.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.a.toLowerCase().includes(searchQuery.toLowerCase())
    ),
  })).filter((cat) => cat.questions.length > 0)

  return (
    <div style={{ direction: 'rtl' }}>
      <SEO title="الأسئلة الشائعة" description="إجابات على أكثر الأسئلة شيوعاً حول الخدمات القانونية، الاستشارات، الأتعاب، وإجراءات التقاضي." path="/faq" />
      {/* Hero */}
      <section className="relative bg-navy-900 py-16 md:py-24 overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-10 right-10 w-64 h-64 bg-gold-500 rounded-full blur-3xl" />
        </div>
        <div className="relative max-w-5xl mx-auto px-4 text-center">
          <div className="w-16 h-16 bg-gold-500/20 rounded-2xl flex items-center justify-center mx-auto mb-6">
            <HelpCircle size={32} className="text-gold-500" />
          </div>
          <h1 className="text-3xl md:text-5xl font-tajawal font-bold text-white mb-4">الأسئلة الشائعة</h1>
          <div className="w-16 h-1 bg-gold-500 mx-auto rounded mb-5" />
          <p className="text-gray-300 font-cairo text-lg max-w-2xl mx-auto leading-relaxed">
            إجابات على أكثر الأسئلة القانونية شيوعًا — إذا لم تجد إجابتك تواصل معنا مباشرة
          </p>
        </div>
      </section>

      {/* Search */}
      <section className="bg-white py-8 border-b border-gray-100">
        <div className="max-w-3xl mx-auto px-4">
          <div className="relative">
            <Search size={18} className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="ابحث في الأسئلة الشائعة..."
              className="w-full pr-12 pl-4 py-3.5 border border-gray-200 rounded-xl text-sm font-cairo focus:outline-none focus:border-gold-500 focus:ring-1 focus:ring-gold-500 transition-colors"
            />
          </div>
        </div>
      </section>

      {/* FAQ Accordion */}
      <section className="py-14 bg-gray-50">
        <div className="max-w-3xl mx-auto px-4">
          {filteredFaq.length > 0 ? (
            <div className="space-y-8">
              {filteredFaq.map((cat, ci) => (
                <div key={ci}>
                  <h2 className="text-lg font-tajawal font-bold text-navy-900 mb-4 flex items-center gap-2">
                    <div className="w-2 h-6 bg-gold-500 rounded" />
                    {cat.category}
                  </h2>
                  <div className="space-y-3">
                    {cat.questions.map((item, qi) => {
                      const key = `${ci}-${qi}`
                      const isOpen = openIndex === key
                      return (
                        <div key={key} className="bg-white rounded-xl shadow-sm overflow-hidden">
                          <button
                            onClick={() => toggle(key)}
                            className="w-full flex items-center justify-between p-5 text-right hover:bg-gray-50 transition-colors"
                          >
                            <span className="font-cairo font-medium text-navy-900 text-sm leading-relaxed pr-0 pl-4">{item.q}</span>
                            <ChevronDown
                              size={18}
                              className={`text-gold-500 flex-shrink-0 transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`}
                            />
                          </button>
                          <div
                            className={`overflow-hidden transition-all duration-300 ${isOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'}`}
                          >
                            <div className="px-5 pb-5 pt-0">
                              <div className="border-t border-gray-100 pt-4">
                                <p className="font-cairo text-gray-600 text-sm leading-[1.9]">{item.a}</p>
                              </div>
                            </div>
                          </div>
                        </div>
                      )
                    })}
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-16">
              <p className="text-gray-400 font-cairo text-lg mb-2">لا توجد نتائج مطابقة</p>
              <p className="text-gray-300 font-cairo text-sm">جرّب كلمات بحث مختلفة</p>
            </div>
          )}
        </div>
      </section>

      {/* CTA */}
      <section className="bg-navy-900 py-12">
        <div className="max-w-3xl mx-auto px-4 text-center">
          <h2 className="text-2xl font-tajawal font-bold text-white mb-3">لم تجد إجابتك؟</h2>
          <p className="text-gray-400 font-cairo mb-6">تواصل معنا مباشرة وسنجيب على جميع استفساراتك القانونية</p>
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
