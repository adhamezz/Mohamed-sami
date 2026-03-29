import { useState } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Search, ChevronLeft, MapPin, Phone, Clock, Building2, Globe } from 'lucide-react'

const courts = [
  {
    category: 'المحاكم الاتحادية',
    items: [
      { name: 'المحكمة الاتحادية العليا', address: 'شارع الكورنيش - أبوظبي', phone: '+971-2-6811000', hours: '7:30 ص - 2:30 م', emirate: 'أبوظبي', website: 'https://www.adjd.gov.ae' },
      { name: 'محكمة النقض الاتحادية', address: 'شارع الشيخ زايد - أبوظبي', phone: '+971-2-6265000', hours: '7:30 ص - 2:30 م', emirate: 'أبوظبي', website: 'https://www.adjd.gov.ae' },
      { name: 'محكمة الاستئناف الاتحادية - أبوظبي', address: 'المنطقة القضائية - جزيرة الريم - أبوظبي', phone: '+971-2-4444000', hours: '7:30 ص - 2:30 م', emirate: 'أبوظبي', website: 'https://www.adjd.gov.ae' },
    ],
  },
  {
    category: 'محاكم أبوظبي',
    items: [
      { name: 'دائرة القضاء - أبوظبي', address: 'جزيرة الريم - المنطقة القضائية - أبوظبي', phone: '+971-2-4444000', hours: '7:30 ص - 2:30 م', emirate: 'أبوظبي', website: 'https://www.adjd.gov.ae' },
      { name: 'محكمة أبوظبي الابتدائية', address: 'المنطقة القضائية - جزيرة الريم', phone: '+971-2-4444111', hours: '7:30 ص - 2:30 م', emirate: 'أبوظبي', website: 'https://www.adjd.gov.ae' },
      { name: 'محكمة العين الابتدائية', address: 'شارع الشيخ خليفة - العين', phone: '+971-3-7640000', hours: '7:30 ص - 2:30 م', emirate: 'أبوظبي', website: 'https://www.adjd.gov.ae' },
      { name: 'محكمة الأسرة - أبوظبي', address: 'جزيرة الريم - أبوظبي', phone: '+971-2-4444222', hours: '7:30 ص - 2:30 م', emirate: 'أبوظبي', website: 'https://www.adjd.gov.ae' },
    ],
  },
  {
    category: 'محاكم دبي',
    items: [
      { name: 'محاكم دبي - المقر الرئيسي', address: 'شارع عمر بن الخطاب - بر دبي', phone: '+971-4-3347777', hours: '7:30 ص - 2:30 م', emirate: 'دبي', website: 'https://www.dc.gov.ae' },
      { name: 'محكمة دبي الابتدائية', address: 'مبنى محاكم دبي - بر دبي', phone: '+971-4-3347777', hours: '7:30 ص - 2:30 م', emirate: 'دبي', website: 'https://www.dc.gov.ae' },
      { name: 'محكمة الاستئناف - دبي', address: 'مبنى محاكم دبي - بر دبي', phone: '+971-4-3347888', hours: '7:30 ص - 2:30 م', emirate: 'دبي', website: 'https://www.dc.gov.ae' },
      { name: 'محكمة التمييز - دبي', address: 'مبنى محاكم دبي - بر دبي', phone: '+971-4-3347999', hours: '7:30 ص - 2:30 م', emirate: 'دبي', website: 'https://www.dc.gov.ae' },
      { name: 'مركز العدل - محكمة الأحوال الشخصية', address: 'القوز - شارع الشيخ زايد - دبي', phone: '+971-4-3340440', hours: '7:30 ص - 2:30 م', emirate: 'دبي', website: 'https://www.dc.gov.ae' },
      { name: 'مركز DIFC للمحاكم', address: 'مركز دبي المالي العالمي - دبي', phone: '+971-4-4279999', hours: '8:00 ص - 4:00 م', emirate: 'دبي', website: 'https://www.difccourts.ae' },
    ],
  },
  {
    category: 'محاكم الشارقة',
    items: [
      { name: 'دائرة الشؤون القانونية - الشارقة', address: 'منطقة المحاكم - الشارقة', phone: '+971-6-5121111', hours: '7:30 ص - 2:30 م', emirate: 'الشارقة', website: 'https://www.shjcourts.gov.ae' },
      { name: 'محكمة الشارقة الابتدائية', address: 'منطقة المحاكم - شارع الوحدة - الشارقة', phone: '+971-6-5121222', hours: '7:30 ص - 2:30 م', emirate: 'الشارقة', website: 'https://www.shjcourts.gov.ae' },
      { name: 'محكمة استئناف الشارقة', address: 'منطقة المحاكم - الشارقة', phone: '+971-6-5121333', hours: '7:30 ص - 2:30 م', emirate: 'الشارقة', website: 'https://www.shjcourts.gov.ae' },
    ],
  },
  {
    category: 'محاكم الإمارات الأخرى',
    items: [
      { name: 'محكمة عجمان الابتدائية', address: 'منطقة المحاكم - عجمان', phone: '+971-6-7454000', hours: '7:30 ص - 2:30 م', emirate: 'عجمان', website: '' },
      { name: 'محكمة رأس الخيمة الابتدائية', address: 'شارع المحكمة - رأس الخيمة', phone: '+971-7-2274000', hours: '7:30 ص - 2:30 م', emirate: 'رأس الخيمة', website: 'https://www.rak.ae' },
      { name: 'محكمة الفجيرة الابتدائية', address: 'شارع المحكمة - الفجيرة', phone: '+971-9-2241000', hours: '7:30 ص - 2:30 م', emirate: 'الفجيرة', website: '' },
      { name: 'محكمة أم القيوين الابتدائية', address: 'شارع الملك فيصل - أم القيوين', phone: '+971-6-7641000', hours: '7:30 ص - 2:30 م', emirate: 'أم القيوين', website: '' },
    ],
  },
]

export default function UAECourtsPage() {
  const [searchTerm, setSearchTerm] = useState('')

  const filteredCourts = courts.map(cat => ({
    ...cat,
    items: cat.items.filter(c =>
      c.name.includes(searchTerm) || c.address.includes(searchTerm) || c.emirate.includes(searchTerm)
    ),
  })).filter(cat => cat.items.length > 0)

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
            <span className="text-gold-400">عناوين المحاكم الاماراتية</span>
          </nav>
          <h1 className="text-3xl md:text-4xl font-tajawal font-bold text-white mb-4">عناوين المحاكم الاماراتية</h1>
          <div className="w-14 h-1 bg-gold-500 mx-auto rounded mb-4" />
          <p className="text-gray-300 font-cairo text-base">دليل شامل لعناوين وأرقام هواتف المحاكم في دولة الإمارات العربية المتحدة</p>
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
              placeholder="ابحث بالاسم أو الإمارة..."
              className="w-full pr-12 pl-4 py-3.5 rounded-xl border border-gray-200 bg-white font-cairo text-sm focus:outline-none focus:border-gold-500 focus:ring-2 focus:ring-gold-500/20 shadow-sm"
            />
          </div>

          {/* Courts */}
          {filteredCourts.map((cat, ci) => (
            <div key={ci} className="mb-10">
              <h2 className="text-lg font-tajawal font-bold text-navy-900 mb-4 flex items-center gap-2">
                <Building2 size={20} className="text-gold-500" />
                {cat.category}
                <span className="text-sm font-cairo text-gray-400 font-normal">({cat.items.length})</span>
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {cat.items.map((court, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.03 }}
                    className="bg-white rounded-xl shadow-sm border border-gray-100 p-5 hover:shadow-md transition-shadow"
                  >
                    <h3 className="font-tajawal font-bold text-navy-900 text-base mb-2">{court.name}</h3>
                    <div className="space-y-2 text-sm font-cairo text-gray-600">
                      <p className="flex items-start gap-2">
                        <MapPin size={14} className="text-gold-500 flex-shrink-0 mt-0.5" />
                        {court.address}
                      </p>
                      <p className="flex items-center gap-2">
                        <Phone size={14} className="text-gold-500 flex-shrink-0" />
                        <span dir="ltr">{court.phone}</span>
                      </p>
                      <p className="flex items-center gap-2">
                        <Clock size={14} className="text-gold-500 flex-shrink-0" />
                        {court.hours}
                      </p>
                      {court.website && (
                        <a href={court.website} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-gold-600 hover:text-gold-700">
                          <Globe size={14} className="flex-shrink-0" />
                          الموقع الرسمي
                        </a>
                      )}
                    </div>
                    <span className="inline-block mt-3 text-xs font-cairo bg-navy-50 text-navy-700 px-3 py-1 rounded-full">{court.emirate}</span>
                  </motion.div>
                ))}
              </div>
            </div>
          ))}

          {filteredCourts.length === 0 && (
            <div className="text-center py-16">
              <Building2 size={48} className="text-gray-300 mx-auto mb-4" />
              <p className="text-gray-500 font-cairo">لا توجد نتائج للبحث</p>
            </div>
          )}
        </div>
      </section>
    </div>
  )
}
