import { useState } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Search, BookOpen, ChevronLeft, Scale, FileText, ExternalLink } from 'lucide-react'

const lawCategories = [
  {
    name: 'القانون المدني',
    code: 'قانون رقم 131 لسنة 1948',
    articles: 1149,
    description: 'ينظم العلاقات بين الأفراد من حيث المعاملات المالية والالتزامات والعقود والحقوق العينية.',
    link: 'https://manshurat.org/node/107',
    sections: ['الالتزامات بوجه عام', 'مصادر الالتزام', 'العقد', 'الإرادة المنفردة', 'العمل غير المشروع', 'الإثراء بلا سبب', 'آثار الالتزام', 'الحقوق العينية'],
  },
  {
    name: 'قانون العقوبات',
    code: 'قانون رقم 58 لسنة 1937',
    articles: 395,
    description: 'يحدد الجرائم والعقوبات المقررة لها ويشمل الجنايات والجنح والمخالفات.',
    link: 'https://manshurat.org/node/106',
    sections: ['أحكام عامة', 'الجنايات والجنح المضرة بالمصلحة العامة', 'جنايات وجنح مضرة بالأفراد', 'المخالفات'],
  },
  {
    name: 'قانون الإجراءات الجنائية',
    code: 'قانون رقم 150 لسنة 1950',
    articles: 560,
    description: 'ينظم إجراءات البحث والتحقيق والمحاكمة في المواد الجنائية.',
    link: 'https://manshurat.org/node/108',
    sections: ['الدعوى الجنائية', 'جمع الاستدلالات', 'التحقيق بمعرفة النيابة العامة', 'المحاكمة', 'الطعن في الأحكام'],
  },
  {
    name: 'قانون المرافعات المدنية والتجارية',
    code: 'قانون رقم 13 لسنة 1968',
    articles: 310,
    description: 'ينظم إجراءات التقاضي أمام المحاكم المدنية والتجارية بدرجاتها المختلفة.',
    link: 'https://manshurat.org/node/109',
    sections: ['الاختصاص', 'رفع الدعوى وقيدها', 'حضور الخصوم وغيابهم', 'الأحكام', 'طرق الطعن في الأحكام', 'التنفيذ الجبري'],
  },
  {
    name: 'قانون التجارة',
    code: 'قانون رقم 17 لسنة 1999',
    articles: 735,
    description: 'ينظم الأعمال التجارية والتجار والشركات والأوراق التجارية والإفلاس.',
    link: 'https://manshurat.org/node/110',
    sections: ['التجار', 'الشركات التجارية', 'السجل التجاري', 'الأوراق التجارية', 'عمليات البنوك', 'الإفلاس'],
  },
  {
    name: 'قانون الأحوال الشخصية',
    code: 'قانون رقم 1 لسنة 2000',
    articles: 79,
    description: 'ينظم إجراءات التقاضي في مسائل الأحوال الشخصية كالزواج والطلاق والميراث.',
    link: 'https://manshurat.org/node/111',
    sections: ['الزواج والطلاق', 'النفقات', 'الحضانة', 'الولاية على المال', 'المواريث والوصايا'],
  },
  {
    name: 'قانون العمل',
    code: 'قانون رقم 12 لسنة 2003',
    articles: 257,
    description: 'ينظم علاقات العمل بين العمال وأصحاب الأعمال ويحمي حقوق العمال.',
    link: 'https://manshurat.org/node/112',
    sections: ['عقد العمل الفردي', 'الأجور', 'ساعات العمل والإجازات', 'تشغيل النساء', 'تشغيل الأطفال', 'السلامة والصحة المهنية'],
  },
  {
    name: 'قانون الإيجارات',
    code: 'قانون رقم 136 لسنة 1981',
    articles: 42,
    description: 'ينظم العلاقة الإيجارية بين المؤجر والمستأجر وتحديد الأجرة.',
    link: 'https://manshurat.org/node/113',
    sections: ['تحديد الأجرة', 'حقوق المستأجر', 'التزامات المؤجر', 'إنهاء العلاقة الإيجارية'],
  },
  {
    name: 'قانون الشركات',
    code: 'قانون رقم 159 لسنة 1981',
    articles: 177,
    description: 'ينظم تأسيس الشركات المساهمة وشركات التوصية بالأسهم والشركات ذات المسؤولية المحدودة.',
    link: 'https://manshurat.org/node/114',
    sections: ['الشركات المساهمة', 'شركات التوصية بالأسهم', 'الشركات ذات المسؤولية المحدودة'],
  },
  {
    name: 'قانون المحاماة',
    code: 'قانون رقم 17 لسنة 1983',
    articles: 214,
    description: 'ينظم مهنة المحاماة وشروط القيد بنقابة المحامين وحقوق وواجبات المحامي.',
    link: 'https://manshurat.org/node/115',
    sections: ['شروط قيد المحامي', 'حقوق المحامي', 'واجبات المحامي', 'المسؤولية التأديبية', 'صندوق الرعاية'],
  },
  {
    name: 'قانون مجلس الدولة',
    code: 'قانون رقم 47 لسنة 1972',
    articles: 129,
    description: 'ينظم القضاء الإداري ومحاكم مجلس الدولة واختصاصاتها.',
    link: 'https://manshurat.org/node/116',
    sections: ['محكمة القضاء الإداري', 'المحاكم الإدارية', 'المحكمة الإدارية العليا', 'هيئة مفوضي الدولة'],
  },
  {
    name: 'قانون الإثبات',
    code: 'قانون رقم 25 لسنة 1968',
    articles: 104,
    description: 'ينظم طرق الإثبات في المواد المدنية والتجارية كالكتابة والشهادة والقرائن.',
    link: 'https://manshurat.org/node/117',
    sections: ['الأدلة الكتابية', 'شهادة الشهود', 'القرائن', 'الإقرار', 'اليمين', 'المعاينة والخبرة'],
  },
]

export default function EgyptianLawCodesPage() {
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedCategory, setSelectedCategory] = useState(null)

  const filtered = lawCategories.filter(law =>
    law.name.includes(searchTerm) || law.description.includes(searchTerm) || law.code.includes(searchTerm)
  )

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
            <span className="text-gold-400">أكواد القوانين المصرية</span>
          </nav>
          <h1 className="text-3xl md:text-4xl font-tajawal font-bold text-white mb-4">أكواد القوانين المصرية</h1>
          <div className="w-14 h-1 bg-gold-500 mx-auto rounded mb-4" />
          <p className="text-gray-300 font-cairo text-base">دليل شامل لأهم القوانين والتشريعات المصرية المعمول بها</p>
        </div>
      </section>

      <section className="bg-gray-50 py-10">
        <div className="max-w-6xl mx-auto px-4">
          {/* Search */}
          <div className="relative max-w-xl mx-auto mb-10">
            <Search size={20} className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              value={searchTerm}
              onChange={e => setSearchTerm(e.target.value)}
              placeholder="ابحث عن قانون..."
              className="w-full pr-12 pl-4 py-3.5 rounded-xl border border-gray-200 bg-white font-cairo text-sm focus:outline-none focus:border-gold-500 focus:ring-2 focus:ring-gold-500/20 shadow-sm"
            />
          </div>

          {/* Laws Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filtered.map((law, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05, duration: 0.4 }}
                className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-lg transition-all duration-300 group cursor-pointer"
                onClick={() => setSelectedCategory(selectedCategory === i ? null : i)}
              >
                <div className="h-1.5 bg-gradient-to-l from-gold-500 to-gold-600" />
                <div className="p-5">
                  <div className="flex items-start gap-3 mb-3">
                    <div className="w-12 h-12 bg-navy-50 rounded-lg flex items-center justify-center flex-shrink-0 group-hover:bg-gold-50 transition-colors">
                      <Scale size={22} className="text-navy-600 group-hover:text-gold-500 transition-colors" />
                    </div>
                    <div>
                      <h3 className="font-tajawal font-bold text-navy-900 text-base">{law.name}</h3>
                      <p className="text-xs font-cairo text-gold-600 mt-0.5">{law.code}</p>
                    </div>
                  </div>
                  <p className="text-gray-600 font-cairo text-sm leading-relaxed mb-3">{law.description}</p>
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-cairo text-gray-400">عدد المواد: {law.articles}</span>
                    <a
                      href={law.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={e => e.stopPropagation()}
                      className="text-xs font-cairo text-gold-600 hover:text-gold-700 flex items-center gap-1"
                    >
                      <ExternalLink size={12} /> اطلع على القانون
                    </a>
                  </div>
                  {/* Expanded sections */}
                  {selectedCategory === i && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      className="mt-4 pt-4 border-t border-gray-100"
                    >
                      <h4 className="text-sm font-tajawal font-bold text-navy-900 mb-2 flex items-center gap-2">
                        <FileText size={14} className="text-gold-500" /> أبواب القانون
                      </h4>
                      <ul className="space-y-1.5">
                        {law.sections.map((sec, j) => (
                          <li key={j} className="text-xs font-cairo text-gray-600 flex items-center gap-2">
                            <span className="w-1.5 h-1.5 bg-gold-500 rounded-full flex-shrink-0" />
                            {sec}
                          </li>
                        ))}
                      </ul>
                    </motion.div>
                  )}
                </div>
              </motion.div>
            ))}
          </div>

          {filtered.length === 0 && (
            <div className="text-center py-16">
              <BookOpen size={48} className="text-gray-300 mx-auto mb-4" />
              <p className="text-gray-500 font-cairo">لا توجد نتائج للبحث</p>
            </div>
          )}
        </div>
      </section>
    </div>
  )
}
