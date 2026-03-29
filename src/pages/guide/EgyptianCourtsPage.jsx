import { useState } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Search, ChevronLeft, MapPin, Phone, Clock, Building2, ExternalLink } from 'lucide-react'

const courts = [
  {
    category: 'محاكم النقض والاستئناف',
    items: [
      { name: 'محكمة النقض', address: 'دار القضاء العالي - شارع 26 يوليو - وسط القاهرة', phone: '02-25770666', hours: '8:00 ص - 3:00 م', governorate: 'القاهرة' },
      { name: 'محكمة استئناف القاهرة', address: 'دار القضاء العالي - ميدان باب الخلق - القاهرة', phone: '02-23909000', hours: '8:00 ص - 3:00 م', governorate: 'القاهرة' },
      { name: 'محكمة استئناف الإسكندرية', address: 'شارع سعد زغلول - محطة الرمل - الإسكندرية', phone: '03-4841771', hours: '8:00 ص - 3:00 م', governorate: 'الإسكندرية' },
      { name: 'محكمة استئناف طنطا', address: 'شارع الجيش - أمام محطة السكة الحديد - طنطا', phone: '040-3317777', hours: '8:00 ص - 3:00 م', governorate: 'الغربية' },
      { name: 'محكمة استئناف المنصورة', address: 'شارع الجمهورية - المنصورة', phone: '050-2222666', hours: '8:00 ص - 3:00 م', governorate: 'الدقهلية' },
      { name: 'محكمة استئناف الإسماعيلية', address: 'شارع الشهداء - الإسماعيلية', phone: '064-3330666', hours: '8:00 ص - 3:00 م', governorate: 'الإسماعيلية' },
      { name: 'محكمة استئناف أسيوط', address: 'شارع الهلالي - أسيوط', phone: '088-2312666', hours: '8:00 ص - 3:00 م', governorate: 'أسيوط' },
      { name: 'محكمة استئناف قنا', address: 'شارع المحكمة - قنا', phone: '096-5222666', hours: '8:00 ص - 3:00 م', governorate: 'قنا' },
    ],
  },
  {
    category: 'المحاكم الابتدائية الكبرى',
    items: [
      { name: 'محكمة شمال القاهرة الابتدائية', address: 'شارع الجيش - العباسية - القاهرة', phone: '02-26854000', hours: '8:00 ص - 3:00 م', governorate: 'القاهرة' },
      { name: 'محكمة جنوب القاهرة الابتدائية', address: 'دار القضاء العالي - باب الخلق - القاهرة', phone: '02-23909111', hours: '8:00 ص - 3:00 م', governorate: 'القاهرة' },
      { name: 'محكمة الجيزة الابتدائية', address: 'ميدان الجيزة - شارع المحكمة - الجيزة', phone: '02-35727000', hours: '8:00 ص - 3:00 م', governorate: 'الجيزة' },
      { name: 'محكمة الإسكندرية الابتدائية', address: 'شارع سعد زغلول - الإسكندرية', phone: '03-4841772', hours: '8:00 ص - 3:00 م', governorate: 'الإسكندرية' },
      { name: 'محكمة بنها الابتدائية', address: 'شارع المحكمة - بنها - القليوبية', phone: '013-3222666', hours: '8:00 ص - 3:00 م', governorate: 'القليوبية' },
      { name: 'محكمة الزقازيق الابتدائية', address: 'شارع المحكمة - الزقازيق - الشرقية', phone: '055-2302666', hours: '8:00 ص - 3:00 م', governorate: 'الشرقية' },
      { name: 'محكمة دمنهور الابتدائية', address: 'شارع المحكمة - دمنهور - البحيرة', phone: '045-3122666', hours: '8:00 ص - 3:00 م', governorate: 'البحيرة' },
      { name: 'محكمة بورسعيد الابتدائية', address: 'شارع المحكمة - بورسعيد', phone: '066-3222666', hours: '8:00 ص - 3:00 م', governorate: 'بورسعيد' },
      { name: 'محكمة السويس الابتدائية', address: 'شارع المحكمة - السويس', phone: '062-3222666', hours: '8:00 ص - 3:00 م', governorate: 'السويس' },
      { name: 'محكمة سوهاج الابتدائية', address: 'شارع المحكمة - سوهاج', phone: '093-2322666', hours: '8:00 ص - 3:00 م', governorate: 'سوهاج' },
      { name: 'محكمة أسوان الابتدائية', address: 'شارع المحكمة - أسوان', phone: '097-2312666', hours: '8:00 ص - 3:00 م', governorate: 'أسوان' },
      { name: 'محكمة المنيا الابتدائية', address: 'شارع المحكمة - المنيا', phone: '086-2312666', hours: '8:00 ص - 3:00 م', governorate: 'المنيا' },
    ],
  },
  {
    category: 'محاكم مجلس الدولة',
    items: [
      { name: 'المحكمة الإدارية العليا', address: 'شارع الجلاء - الدقي - الجيزة', phone: '02-37611000', hours: '9:00 ص - 2:00 م', governorate: 'الجيزة' },
      { name: 'محكمة القضاء الإداري', address: 'شارع الجلاء - الدقي - الجيزة', phone: '02-37611111', hours: '9:00 ص - 2:00 م', governorate: 'الجيزة' },
      { name: 'المحكمة الإدارية بالإسكندرية', address: 'سموحة - الإسكندرية', phone: '03-4250000', hours: '9:00 ص - 2:00 م', governorate: 'الإسكندرية' },
    ],
  },
  {
    category: 'محاكم متخصصة',
    items: [
      { name: 'المحكمة الدستورية العليا', address: 'كورنيش النيل - المعادي - القاهرة', phone: '02-25240066', hours: '9:00 ص - 2:00 م', governorate: 'القاهرة' },
      { name: 'المحكمة الاقتصادية بالقاهرة', address: 'التجمع الخامس - القاهرة الجديدة', phone: '02-26170000', hours: '8:00 ص - 3:00 م', governorate: 'القاهرة' },
      { name: 'محكمة الأسرة بالقاهرة', address: 'شارع العباسية - القاهرة', phone: '02-26854100', hours: '8:00 ص - 3:00 م', governorate: 'القاهرة' },
    ],
  },
]

export default function EgyptianCourtsPage() {
  const [searchTerm, setSearchTerm] = useState('')

  const filteredCourts = courts.map(cat => ({
    ...cat,
    items: cat.items.filter(c =>
      c.name.includes(searchTerm) || c.address.includes(searchTerm) || c.governorate.includes(searchTerm)
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
            <span className="text-gold-400">عناوين المحاكم المصرية</span>
          </nav>
          <h1 className="text-3xl md:text-4xl font-tajawal font-bold text-white mb-4">عناوين المحاكم المصرية</h1>
          <div className="w-14 h-1 bg-gold-500 mx-auto rounded mb-4" />
          <p className="text-gray-300 font-cairo text-base">دليل شامل لعناوين وأرقام هواتف المحاكم المصرية بجميع أنواعها</p>
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
              placeholder="ابحث بالاسم أو المحافظة..."
              className="w-full pr-12 pl-4 py-3.5 rounded-xl border border-gray-200 bg-white font-cairo text-sm focus:outline-none focus:border-gold-500 focus:ring-2 focus:ring-gold-500/20 shadow-sm"
            />
          </div>

          {/* Courts categories */}
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
                    </div>
                    <span className="inline-block mt-3 text-xs font-cairo bg-navy-50 text-navy-700 px-3 py-1 rounded-full">{court.governorate}</span>
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
