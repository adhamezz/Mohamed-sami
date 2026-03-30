import { useState, useEffect, useRef, useMemo } from 'react'
import { Link } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import heroImg from '../../images/hero.jpg'
import consultImg from '../../images/service_02.jpg'
import caseImg from '../../images/service_03 (1).jpg'
import { useCMS } from '../../context/CMSContext'
import './Hero.css'

const Hero = () => {
  const [currentSlide, setCurrentSlide] = useState(0)
  const [isVisible, setIsVisible] = useState(false)
  const intervalRef = useRef(null)
  const { siteSettings } = useCMS()

  const slides = useMemo(() => ([
    {
      image: heroImg,
      title: siteSettings?.heroTitle || 'محمد سامي — مستشار قانوني',
      subtitle: siteSettings?.heroSubtitle || 'أقدم كافة الخدمات القانونية كالتمثيل القانوني أمام المحاكم والاستشارات القانونية وصياغة المذكرات القانونية والعقود.',
    },
    {
      image: consultImg,
      title: 'استشارات قانونية متخصصة على أعلى مستوى',
      subtitle: 'مستشار قانوني بخبرة واسعة في كافة فروع القانون المصري والعربي.',
    },
    {
      image: caseImg,
      title: 'إدارة القضايا والمنازعات باحترافية',
      subtitle: 'تمثيل قانوني شامل أمام جميع المحاكم المصرية والعربية مع التزام تام بحماية حقوق موكلينا.',
    },
  ]), [siteSettings?.heroTitle, siteSettings?.heroSubtitle])

  useEffect(() => {
    // Trigger entrance animation
    const timer = setTimeout(() => setIsVisible(true), 100)
    return () => clearTimeout(timer)
  }, [])

  useEffect(() => {
    intervalRef.current = setInterval(() => {
      setCurrentSlide(prev => (prev + 1) % slides.length)
    }, 6000)
    return () => clearInterval(intervalRef.current)
  }, [])

  return (
    <section id="home" className="hero-section w-full min-h-[550px] md:min-h-[650px] relative overflow-hidden flex items-center justify-center">
      {/* Sliding Background Images */}
      <AnimatePresence mode="wait">
        <motion.div
          key={currentSlide}
          className="absolute inset-0"
          initial={{ scale: 1.15, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 1.05, opacity: 0 }}
          transition={{ duration: 1.2, ease: 'easeInOut' }}
        >
          <div
            className="w-full h-full"
            style={{
              backgroundImage: `url(${slides[currentSlide].image})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
            }}
          />
        </motion.div>
      </AnimatePresence>

      {/* Dark Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-navy-900/90 via-navy-900/60 to-navy-900/40" />

      {/* Animated Particles / Decorative Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 right-10 w-2 h-2 bg-gold-400 rounded-full animate-pulse opacity-60" />
        <div className="absolute top-40 left-20 w-1.5 h-1.5 bg-gold-300 rounded-full animate-ping opacity-40" style={{ animationDuration: '3s' }} />
        <div className="absolute bottom-32 right-1/4 w-1 h-1 bg-gold-500 rounded-full animate-pulse opacity-50" style={{ animationDelay: '1s' }} />
        <div className="absolute top-1/3 left-1/3 w-2 h-2 bg-white rounded-full animate-ping opacity-20" style={{ animationDuration: '4s' }} />
      </div>

      {/* Content — slides up from bottom on load */}
      <div className="relative z-10 text-center max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16" style={{ direction: 'rtl' }}>
        {/* Gold accent line */}
        <motion.div
          initial={{ width: 0 }}
          animate={isVisible ? { width: 64 } : {}}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="h-1 bg-gold-500 mx-auto mb-8 rounded"
        />

        {/* Headline — animate from bottom */}
        <AnimatePresence mode="wait">
          <motion.h1
            key={`title-${currentSlide}`}
            initial={{ opacity: 0, y: 60 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -30 }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
            className="text-3xl sm:text-4xl md:text-5xl lg:text-[3.25rem] font-tajawal font-bold text-white mb-6 leading-tight"
          >
            {slides[currentSlide].title}
          </motion.h1>
        </AnimatePresence>

        {/* Description — animate from bottom with delay */}
        <AnimatePresence mode="wait">
          <motion.p
            key={`sub-${currentSlide}`}
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.8, delay: 0.15, ease: 'easeOut' }}
            className="text-base sm:text-lg md:text-xl text-gray-200 mb-10 max-w-3xl mx-auto font-cairo leading-relaxed"
          >
            {slides[currentSlide].subtitle}
          </motion.p>
        </AnimatePresence>

        {/* CTA Buttons — animate from bottom */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <Link
            to="/contact"
            className="inline-block px-10 py-3.5 rounded-md bg-gold-500 text-white font-bold text-lg hover:bg-gold-600 transition-all duration-300 shadow-lg hover:shadow-xl hover:-translate-y-0.5"
          >
            طلب استشارة قانونية
          </Link>
          <Link
            to="/services"
            className="inline-block px-10 py-3.5 rounded-md border-2 border-white/40 text-white font-bold text-lg hover:bg-white/10 transition-all duration-300 hover:-translate-y-0.5"
          >
            مزيد من التفاصيل
          </Link>
        </motion.div>

        {/* Slide indicators */}
        <div className="flex items-center justify-center gap-3 mt-10">
          {slides.map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrentSlide(i)}
              className={`transition-all duration-500 rounded-full ${
                i === currentSlide
                  ? 'w-8 h-2.5 bg-gold-500'
                  : 'w-2.5 h-2.5 bg-white/40 hover:bg-white/70'
              }`}
              aria-label={`Slide ${i + 1}`}
            />
          ))}
        </div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2 }}
        className="absolute bottom-6 left-1/2 -translate-x-1/2 z-10"
      >
        <div className="w-6 h-10 border-2 border-white/30 rounded-full flex justify-center">
          <motion.div
            animate={{ y: [0, 12, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
            className="w-1.5 h-1.5 bg-gold-400 rounded-full mt-2"
          />
        </div>
      </motion.div>
    </section>
  )
}

export default Hero
