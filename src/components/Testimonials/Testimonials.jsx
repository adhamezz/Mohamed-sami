import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Star, Quote, ChevronLeft, ChevronRight } from 'lucide-react'

const testimonials = [
  {
    name: 'أحمد عبدالله',
    role: 'رجل أعمال',
    rating: 5,
    text: 'تعاملت مع الأستاذ محمد سامي في قضية تجارية معقدة وكان أداؤه ممتازاً. استطاع تحقيق نتيجة رائعة في وقت قياسي. أنصح بشدة بالتعامل معه.',
    date: '2024',
  },
  {
    name: 'فاطمة الزهراء',
    role: 'سيدة أعمال',
    rating: 5,
    text: 'خبرة قانونية استثنائية في مجال الأحوال الشخصية. ساعدني في قضية حضانة صعبة وحصلت على حقي كاملاً. شكراً جزيلاً.',
    date: '2024',
  },
  {
    name: 'خالد المنصوري',
    role: 'مدير شركة',
    rating: 5,
    text: 'من أفضل المستشارين القانونيين الذين تعاملت معهم. ساعدنا في تأسيس شركتنا وصياغة جميع العقود بشكل احترافي ودقيق.',
    date: '2023',
  },
  {
    name: 'سارة الحمادي',
    role: 'موظفة حكومية',
    rating: 5,
    text: 'استشارة قانونية ممتازة ومتابعة مستمرة للقضية. الأستاذ محمد سامي يتميز بالاحترافية العالية والالتزام التام بمواعيده.',
    date: '2024',
  },
  {
    name: 'عمر الشامسي',
    role: 'مستثمر عقاري',
    rating: 5,
    text: 'تعامل راقٍ واحترافي في مجال العقود العقارية. صياغة دقيقة وحماية كاملة لحقوقي. أوصي بالتعامل مع مكتب الأستاذ محمد.',
    date: '2023',
  },
  {
    name: 'نورة العلي',
    role: 'طبيبة',
    rating: 5,
    text: 'ساعدني في قضية عمالية وحصلت على جميع مستحقاتي. تواصل سريع واهتمام بأدق التفاصيل. محامي ممتاز وجدير بالثقة.',
    date: '2024',
  },
]

const Testimonials = () => {
  const [current, setCurrent] = useState(0)
  const [isPaused, setIsPaused] = useState(false)
  const intervalRef = useRef(null)

  const itemsPerView = typeof window !== 'undefined' && window.innerWidth < 768 ? 1 : 2

  useEffect(() => {
    intervalRef.current = setInterval(() => {
      if (!isPaused) {
        setCurrent(prev => (prev + itemsPerView >= testimonials.length ? 0 : prev + 1))
      }
    }, 5000)
    return () => clearInterval(intervalRef.current)
  }, [isPaused, itemsPerView])

  const goNext = () => setCurrent(prev => (prev + itemsPerView >= testimonials.length ? 0 : prev + 1))
  const goPrev = () => setCurrent(prev => (prev <= 0 ? testimonials.length - itemsPerView : prev - 1))

  const visibleTestimonials = testimonials.slice(current, current + itemsPerView)
  if (visibleTestimonials.length < itemsPerView) {
    visibleTestimonials.push(...testimonials.slice(0, itemsPerView - visibleTestimonials.length))
  }

  return (
    <section className="bg-gradient-to-b from-gray-50 to-white py-20 md:py-24 overflow-hidden" style={{ direction: 'rtl' }}>
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-14"
        >
          <span className="inline-block text-gold-500 font-cairo text-sm font-bold tracking-wider mb-3">آراء العملاء</span>
          <h2 className="text-3xl md:text-4xl font-tajawal font-bold text-navy-900 mb-4">ماذا يقول عملاؤنا</h2>
          <div className="w-16 h-1 bg-gradient-to-r from-gold-400 to-gold-600 mx-auto rounded-full mb-5" />
          <p className="text-gray-500 font-cairo text-base max-w-xl mx-auto">
            نفخر بثقة عملائنا وتقييماتهم الإيجابية لخدماتنا القانونية
          </p>
        </motion.div>

        {/* Testimonials Carousel */}
        <div
          className="relative"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
        >
          {/* Navigation Buttons */}
          <button
            onClick={goPrev}
            className="absolute -left-2 md:left-0 top-1/2 -translate-y-1/2 z-10 w-10 h-10 bg-white rounded-full shadow-lg flex items-center justify-center hover:bg-gold-50 transition-colors border border-gray-100"
          >
            <ChevronLeft size={18} className="text-navy-900" />
          </button>
          <button
            onClick={goNext}
            className="absolute -right-2 md:right-0 top-1/2 -translate-y-1/2 z-10 w-10 h-10 bg-white rounded-full shadow-lg flex items-center justify-center hover:bg-gold-50 transition-colors border border-gray-100"
          >
            <ChevronRight size={18} className="text-navy-900" />
          </button>

          {/* Cards */}
          <div className="mx-8 md:mx-14">
            <AnimatePresence mode="wait">
              <motion.div
                key={current}
                initial={{ opacity: 0, x: 40 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -40 }}
                transition={{ duration: 0.4 }}
                className="grid grid-cols-1 md:grid-cols-2 gap-6"
              >
                {visibleTestimonials.map((t, idx) => (
                  <div
                    key={`${t.name}-${idx}`}
                    className="bg-white rounded-2xl p-7 shadow-sm hover:shadow-xl transition-all duration-500 border border-gray-100 hover:border-gold-200 relative group"
                  >
                    {/* Quote icon */}
                    <div className="absolute top-5 left-5 opacity-10 group-hover:opacity-20 transition-opacity">
                      <Quote size={40} className="text-gold-500" />
                    </div>

                    {/* Stars */}
                    <div className="flex gap-1 mb-4">
                      {[...Array(t.rating)].map((_, i) => (
                        <Star key={i} size={16} className="text-gold-500 fill-gold-500" />
                      ))}
                    </div>

                    {/* Review text */}
                    <p className="text-gray-600 font-cairo text-sm leading-[1.9] mb-6 relative z-10">
                      &ldquo;{t.text}&rdquo;
                    </p>

                    {/* Author */}
                    <div className="flex items-center gap-3 pt-4 border-t border-gray-100">
                      <div className="w-11 h-11 rounded-full bg-gradient-to-br from-gold-400 to-gold-600 flex items-center justify-center shadow-md">
                        <span className="text-white font-tajawal font-bold text-sm">
                          {t.name.charAt(0)}
                        </span>
                      </div>
                      <div>
                        <p className="font-tajawal font-bold text-navy-900 text-sm">{t.name}</p>
                        <p className="text-gray-400 font-cairo text-xs">{t.role} • {t.date}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Dots */}
          <div className="flex items-center justify-center gap-2 mt-8">
            {testimonials.map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrent(i)}
                className={`transition-all duration-300 rounded-full ${
                  i === current ? 'w-7 h-2.5 bg-gold-500' : 'w-2.5 h-2.5 bg-gray-300 hover:bg-gray-400'
                }`}
              />
            ))}
          </div>
        </div>

        {/* Summary Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-14 flex flex-wrap items-center justify-center gap-8 md:gap-16"
        >
          <div className="text-center">
            <div className="flex items-center justify-center gap-1 mb-1">
              {[...Array(5)].map((_, i) => (
                <Star key={i} size={18} className="text-gold-500 fill-gold-500" />
              ))}
            </div>
            <p className="text-gray-500 font-cairo text-sm">تقييم 5/5 من العملاء</p>
          </div>
          <div className="text-center">
            <p className="text-3xl font-tajawal font-bold text-navy-900">+300</p>
            <p className="text-gray-500 font-cairo text-sm">عميل راضٍ</p>
          </div>
          <div className="text-center">
            <p className="text-3xl font-tajawal font-bold text-navy-900">98%</p>
            <p className="text-gray-500 font-cairo text-sm">نسبة رضا العملاء</p>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

export default Testimonials
