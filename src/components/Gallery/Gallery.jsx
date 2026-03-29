import { Link } from 'react-router-dom'
import { Gavel, MessageSquare, FileSignature, ArrowLeft } from 'lucide-react'
import caseImg from '../../images/service_03 (1).jpg'
import consultImg from '../../images/service_02.jpg'
import contractImg from '../../images/gallery-1.jpg'
import './Gallery.css'

const services = [
  {
    title: 'إدارة القضايا والمنازعات',
    desc: 'من أهم أهدافنا هو تقديم خدمة ذات جودة عالية وبأداء احترافي في تمثيل موكلينا أمام الهيئات القضائية سواء برفع الدعاوى لاسترجاع حقوقهم أو بالدفاع عنهم في الدعاوى التي ترفع ضدهم.',
    image: caseImg,
    icon: Gavel,
    path: '/services/case-management',
    color: 'from-amber-500 to-yellow-600',
  },
  {
    title: 'الاستشارات القانونية',
    desc: 'من أفضل الخدمات التي أقدمها بل والأهم هي تقديم المشورة القانونية المناسبة لموكليّ في كافة الأمور القانونية المختلفة لتجنب الموكل أي خطأ يؤثر على حقوقه.',
    image: consultImg,
    icon: MessageSquare,
    path: '/services/consultation',
    color: 'from-blue-500 to-indigo-600',
  },
  {
    title: 'صياغة العقود',
    desc: 'أتميز بصياغة العقود صياغة قانونية متخصصة بشكل صحيح وملزم ولديّ خبرة واسعة في ترجمة وصياغة العقود باللغة الإنجليزية كعقد الامتياز التجاري المعروف بعقد الفرانشايز.',
    image: contractImg,
    icon: FileSignature,
    path: '/services/contracts',
    color: 'from-emerald-500 to-teal-600',
  },
]

const Gallery = () => {
  return (
    <section id="gallery" className="gallery-section" style={{ direction: 'rtl' }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-28">
        {/* Header */}
        <div className="text-center mb-16">
          <span className="inline-block text-gold-500 font-cairo text-sm font-bold tracking-wider mb-3">ماذا أقدم</span>
          <h2 className="text-3xl md:text-4xl font-tajawal font-bold text-navy-900 mb-4">أبرز الخدمات</h2>
          <div className="w-16 h-1 bg-gradient-to-r from-gold-400 to-gold-600 mx-auto rounded-full mb-5" />
          <p className="text-gray-500 font-cairo text-base max-w-xl mx-auto leading-relaxed">
            ألتزم بتقديم أعلى معايير الخدمة القانونية لحماية حقوق موكليّ
          </p>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <Link
              key={index}
              to={service.path}
              className="service-card group relative bg-white rounded-2xl overflow-hidden"
            >
              {/* Image */}
              <div className="relative h-56 overflow-hidden">
                <img
                  src={service.image}
                  alt={service.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                {/* Gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-navy-900/90 via-navy-900/40 to-transparent" />

                {/* Icon badge */}
                <div className={`absolute top-4 right-4 w-12 h-12 rounded-xl bg-gradient-to-br ${service.color} flex items-center justify-center shadow-lg transform transition-all duration-500 group-hover:scale-110 group-hover:rotate-6`}>
                  <service.icon size={22} className="text-white" />
                </div>

                {/* Title on image */}
                <div className="absolute bottom-4 right-5 left-5">
                  <h3 className="text-xl font-tajawal font-bold text-white leading-relaxed drop-shadow-lg">
                    {service.title}
                  </h3>
                </div>
              </div>

              {/* Content */}
              <div className="p-6 relative">
                {/* Gold top border that expands on hover */}
                <div className="absolute top-0 right-0 left-0 h-[3px] bg-gradient-to-r from-gold-400 to-gold-600 origin-right scale-x-0 group-hover:scale-x-100 transition-transform duration-500" />

                <p className="font-cairo text-gray-600 text-sm leading-[1.9] mb-5">
                  {service.desc}
                </p>

                {/* CTA */}
                <div className="flex items-center gap-2 text-gold-500 font-bold font-cairo text-sm group-hover:gap-3 transition-all duration-300">
                  <span>اعرف المزيد</span>
                  <ArrowLeft size={16} className="transition-transform duration-300 group-hover:-translate-x-1" />
                </div>
              </div>

              {/* Hover glow border */}
              <div className="absolute inset-0 rounded-2xl border-2 border-transparent group-hover:border-gold-500/30 transition-colors duration-500 pointer-events-none" />
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Gallery
