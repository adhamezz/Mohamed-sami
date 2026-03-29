import { useRef, useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import Hero from '../components/Hero/Hero'
import About from '../components/About/About'
import Gallery from '../components/Gallery/Gallery'
import Services from '../components/Services/Services'
import Testimonials from '../components/Testimonials/Testimonials'
import TypingBanner from '../components/TypingBanner/TypingBanner'
import SEO from '../components/SEO'
import heroBgImg from '../images/hero.jpg'
import serviceImg1 from '../images/1.png'
import serviceImg2 from '../images/2.png'
import serviceImg3 from '../images/3.png'
import serviceImg4 from '../images/4.png'
import serviceImg5 from '../images/5.png'
import serviceImg6 from '../images/6.png'
import serviceImg7 from '../images/7.png'
import serviceImg8 from '../images/8.png'
import serviceImg9 from '../images/9.png'

const quickServices = [
  { image: serviceImg1, title: 'المذكرات القانونية', path: '/services/legal-memos' },
  { image: serviceImg2, title: 'إدارة القضايا', path: '/services/case-management' },
  { image: serviceImg3, title: 'الاستشارات القانونية', path: '/services/consultation' },
  { image: serviceImg4, title: 'صياغة العقود', path: '/services/contracts' },
  { image: serviceImg5, title: 'العقود الإنجليزية', path: '/services/contracts-english' },
  { image: serviceImg6, title: 'الأحوال الشخصية', path: '/services/family-law' },
  { image: serviceImg7, title: 'القانون الجنائي', path: '/services/criminal-law' },
  { image: serviceImg8, title: 'القضايا المدنية', path: '/services/civil-commercial' },
  { image: serviceImg9, title: 'القضاء الإداري', path: '/services/admin-labor' },
]

function QuickServicesCarousel() {
  const trackRef = useRef(null)
  const [currentIndex, setCurrentIndex] = useState(0)
  const [cardsPerView, setCardsPerView] = useState(3)
  const [stepPx, setStepPx] = useState(0)
  const [isPaused, setIsPaused] = useState(false)
  const dragStartXRef = useRef(null)
  const isPointerDownRef = useRef(false)

  const maxIndex = Math.max(quickServices.length - cardsPerView, 0)

  useEffect(() => {
    const updateViewport = () => {
      if (window.innerWidth < 768) setCardsPerView(1)
      else if (window.innerWidth < 1100) setCardsPerView(2)
      else setCardsPerView(3)
    }

    updateViewport()
    window.addEventListener('resize', updateViewport)
    return () => window.removeEventListener('resize', updateViewport)
  }, [])

  useEffect(() => {
    if (!trackRef.current) return
    const firstCard = trackRef.current.querySelector('[data-slide-card]')
    if (!firstCard) return

    const computedStyle = window.getComputedStyle(trackRef.current)
    const gap = parseFloat(computedStyle.columnGap || computedStyle.gap || '0')
    setStepPx(firstCard.getBoundingClientRect().width + gap)
  }, [cardsPerView])

  useEffect(() => {
    if (currentIndex > maxIndex) setCurrentIndex(0)
  }, [maxIndex, currentIndex])

  useEffect(() => {
    const timer = setInterval(() => {
      if (isPaused) return
      setCurrentIndex(prev => (prev >= maxIndex ? 0 : prev + 1))
    }, 3600)

    return () => clearInterval(timer)
  }, [maxIndex, isPaused])

  const goPrev = () => setCurrentIndex(prev => (prev <= 0 ? maxIndex : prev - 1))
  const goNext = () => setCurrentIndex(prev => (prev >= maxIndex ? 0 : prev + 1))

  const handleDragStart = (x) => {
    isPointerDownRef.current = true
    dragStartXRef.current = x
    setIsPaused(true)
  }

  const handleDragMove = (x) => {
    if (!isPointerDownRef.current || dragStartXRef.current == null) return
    const delta = x - dragStartXRef.current

    if (Math.abs(delta) < 45) return

    if (delta > 0) goPrev()
    else goNext()

    // Reset start point to allow continuous drag navigation
    dragStartXRef.current = x
  }

  const handleDragEnd = () => {
    isPointerDownRef.current = false
    dragStartXRef.current = null
    setIsPaused(false)
  }

  return (
    <section className="relative bg-[#07191c] pt-6 pb-10" style={{ direction: 'rtl' }}>
      <div className="max-w-7xl mx-auto px-3 md:px-4 relative">
        <button onClick={goPrev} className="absolute left-0 md:left-1 top-1/2 -translate-y-1/2 z-20 w-10 h-10 bg-[#f79622] hover:bg-[#df8419] rounded-full flex items-center justify-center text-white shadow-lg transition-all">
          <ChevronLeft size={18} />
        </button>
        <button onClick={goNext} className="absolute right-0 md:right-1 top-1/2 -translate-y-1/2 z-20 w-10 h-10 bg-[#f79622] hover:bg-[#df8419] rounded-full flex items-center justify-center text-white shadow-lg transition-all">
          <ChevronRight size={18} />
        </button>

        <div
          className="overflow-hidden px-8 md:px-11"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => {
            setIsPaused(false)
            handleDragEnd()
          }}
          onMouseDown={(e) => handleDragStart(e.clientX)}
          onMouseMove={(e) => handleDragMove(e.clientX)}
          onMouseUp={handleDragEnd}
          onMouseCancel={handleDragEnd}
          onTouchStart={(e) => handleDragStart(e.touches?.[0]?.clientX || 0)}
          onTouchMove={(e) => {
            const x = e.touches?.[0]?.clientX || 0
            handleDragMove(x)
          }}
          onTouchEnd={handleDragEnd}
        >
          <div
            ref={trackRef}
            className="flex gap-4 md:gap-5 transition-transform duration-500 ease-in-out"
            style={{
              transform: `translate3d(-${currentIndex * stepPx}px, 0, 0)`,
              direction: 'ltr',
            }}
          >
            {quickServices.map((service, i) => (
              <motion.div
                key={i}
                data-slide-card
                initial={{ opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05, duration: 0.35 }}
                className="flex-shrink-0 basis-full md:basis-[calc((100%-20px)/2)] lg:basis-[calc((100%-40px)/3)]"
                style={{ direction: 'rtl' }}
              >
                <Link
                  to={service.path}
                  className="relative block h-[150px] md:h-[168px] overflow-visible border border-white/5 bg-center bg-cover"
                  style={{
                    backgroundImage: `linear-gradient(rgba(7, 18, 21, 0.62), rgba(7, 18, 21, 0.62)), url(${heroBgImg})`,
                  }}
                >
                  <div className="absolute inset-0 bg-gradient-to-l from-transparent via-transparent to-[#081d21]/25" />
                  <div className="absolute top-5 md:top-6 right-4 md:right-6 w-[58%] z-10">
                    <h3 className="text-white font-tajawal font-bold text-[21px] md:text-[24px] leading-[1.2] text-right drop-shadow-md">
                      {service.title}
                    </h3>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

// Counter animation component
function AnimatedCounter({ end, label, suffix = '' }) {
  const [count, setCount] = useState(0)
  const [hasAnimated, setHasAnimated] = useState(false)
  const ref = useRef(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimated) {
          setHasAnimated(true)
          const duration = 2000
          const steps = 60
          const increment = end / steps
          let current = 0
          const timer = setInterval(() => {
            current += increment
            if (current >= end) {
              setCount(end)
              clearInterval(timer)
            } else {
              setCount(Math.floor(current))
            }
          }, duration / steps)
        }
      },
      { threshold: 0.5 }
    )
    if (ref.current) observer.observe(ref.current)
    return () => observer.disconnect()
  }, [end, hasAnimated])

  return (
    <div ref={ref} className="text-center">
      <div className="text-4xl md:text-5xl font-tajawal font-bold text-gold-500 mb-2">
        {count}{suffix}
      </div>
      <p className="text-gray-300 font-cairo text-sm">{label}</p>
    </div>
  )
}

function StatsSection() {
  return (
    <section className="bg-navy-900 py-16" style={{ direction: 'rtl' }}>
      <div className="max-w-5xl mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="grid grid-cols-2 md:grid-cols-4 gap-8"
        >
          <AnimatedCounter end={500} suffix="+" label="قضية ناجحة" />
          <AnimatedCounter end={15} suffix="+" label="سنة خبرة" />
          <AnimatedCounter end={300} suffix="+" label="عميل راضٍ" />
          <AnimatedCounter end={50} suffix="+" label="استشارة شهرياً" />
        </motion.div>
      </div>
    </section>
  )
}

export default function HomePage() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <SEO
        title="الرئيسية"
        description="المستشار القانوني محمد سامي — خبرة أكثر من 15 سنة في المحاماة والاستشارات القانونية. تمثيل قانوني شامل أمام جميع المحاكم في مصر والإمارات والكويت."
        path="/"
      />
      <Hero />
      <QuickServicesCarousel />
      <About />
      <StatsSection />
      <Gallery />
      <TypingBanner />
      <Testimonials />
      <Services />
    </motion.div>
  )
}
