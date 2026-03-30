import { useState, useEffect, useRef, useMemo } from 'react'
import { motion, useInView, useScroll, useTransform } from 'framer-motion'
import { Link } from 'react-router-dom'
import aboutImg from '../../images/about.jpg'
import { Check, Sparkles } from 'lucide-react'
import { useCMS } from '../../context/CMSContext'
import './About.css'

function AnimatedNumber({ end, suffix = '' }) {
  const [count, setCount] = useState(0)
  const ref = useRef(null)
  const inView = useInView(ref, { once: true })

  useEffect(() => {
    if (!inView) return
    let current = 0
    const step = end / 50
    const timer = setInterval(() => {
      current += step
      if (current >= end) { setCount(end); clearInterval(timer) }
      else setCount(Math.floor(current))
    }, 30)
    return () => clearInterval(timer)
  }, [inView, end])

  return <span ref={ref}>{count}{suffix}</span>
}

const features = [
  'خبرة أكثر من 15 سنة في المجال القانوني',
  'تمثيل قانوني شامل أمام جميع المحاكم',
  'استشارات قانونية فورية ومتخصصة',
  'حلول مخصصة لكل عميل',
  'سرية تامة والتزام مهني',
  'معدل نجاح عالي جداً',
]

const About = () => {
  const sectionRef = useRef(null)
  const { siteSettings } = useCMS()
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  })

  const bgY = useTransform(scrollYProgress, [0, 1], [60, -60])
  const imgScale = useTransform(scrollYProgress, [0, 0.5], [0.92, 1])
  const textX = useTransform(scrollYProgress, [0, 0.4], [40, 0])
  const textOpacity = useTransform(scrollYProgress, [0, 0.3], [0, 1])

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1, delayChildren: 0.05 },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.65, ease: [0.22, 1, 0.36, 1] },
    },
  }

  const featureVariants = {
    hidden: { opacity: 0, x: 40, scale: 0.95 },
    visible: (i) => ({
      opacity: 1,
      x: 0,
      scale: 1,
      transition: { delay: i * 0.08, duration: 0.5, ease: [0.22, 1, 0.36, 1] },
    }),
  }

  const siteName = siteSettings?.siteName || 'محمد سامي'
  const aboutTitle = siteSettings?.aboutTitle || 'نبذة عني'
  const aboutText = siteSettings?.aboutText || 'مستشار قانوني متخصص في تقديم حلول قانونية شاملة وعالية الجودة للأفراد والشركات، بخبرة عميقة والتزام كامل بحماية حقوق موكليّ.'
  const aboutParagraphs = useMemo(
    () => aboutText.split(/\n+/).map(p => p.trim()).filter(Boolean),
    [aboutText]
  )

  return (
    <section
      ref={sectionRef}
      id="about"
      className="about-section relative"
      style={{ direction: 'rtl' }}
    >
      {/* Animated background blobs */}
      <div className="about-bg-shapes">
        <motion.div
          style={{ y: bgY }}
          className="about-shape about-shape-1"
        />
        <motion.div
          animate={{ x: [0, -30, 0], y: [0, 25, 0], scale: [1, 1.1, 1] }}
          transition={{ duration: 18, repeat: Infinity, ease: 'easeInOut' }}
          className="about-shape about-shape-2"
        />
        <motion.div
          animate={{ scale: [0.8, 1.2, 0.8], opacity: [0.3, 0.7, 0.3] }}
          transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut' }}
          className="about-shape about-shape-3"
        />
      </div>

      {/* Gold particles */}
      <div className="about-particles">
        {[...Array(8)].map((_, i) => (
          <motion.span
            key={i}
            animate={{
              y: [0, -(20 + i * 8), 0],
              x: [0, (i % 2 === 0 ? 10 : -10), 0],
              opacity: [0.15, 0.5, 0.15],
            }}
            transition={{
              duration: 4 + i * 0.6,
              repeat: Infinity,
              delay: i * 0.4,
              ease: 'easeInOut',
            }}
            className="about-particle"
            style={{
              top: `${12 + i * 11}%`,
              left: `${5 + i * 12}%`,
              width: `${3 + (i % 3)}px`,
              height: `${3 + (i % 3)}px`,
            }}
          />
        ))}
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-28 relative z-10">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-60px' }}
          className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center"
        >
          {/* ─── Text Content ─── */}
          <motion.div
            style={{ x: textX, opacity: textOpacity }}
            className="space-y-5 order-2 lg:order-1"
          >
            <motion.div variants={itemVariants}>
              <motion.span
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ type: 'spring', stiffness: 200, damping: 15 }}
                className="inline-flex items-center gap-1.5 text-gold-500 font-cairo text-sm font-bold tracking-wider mb-2 bg-gold-50 px-3 py-1 rounded-full"
              >
                <Sparkles size={14} />
                تعرف عليّ
              </motion.span>
              <h2 className="about-title text-3xl md:text-4xl font-tajawal font-bold text-navy-900 mt-3 mb-2">
                {aboutTitle}
              </h2>
              <motion.div
                initial={{ scaleX: 0 }}
                whileInView={{ scaleX: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
                className="h-1 w-16 bg-gradient-to-r from-gold-400 to-gold-600 rounded-full mb-5 origin-right"
              />
            </motion.div>

            {aboutParagraphs.map((paragraph, index) => (
              <motion.p
                key={index}
                variants={itemVariants}
                className="text-gray-600 leading-[1.9] font-cairo text-[0.95rem]"
              >
                {paragraph}
              </motion.p>
            ))}

            {/* Features — staggered slide-in */}
            <div className="space-y-2.5 pt-4">
              {features.map((feature, i) => (
                <motion.div
                  key={i}
                  custom={i}
                  variants={featureVariants}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  whileHover={{ x: -6, backgroundColor: 'rgba(212,175,55,0.04)' }}
                  className="flex items-center gap-3 group cursor-default px-3 py-2 rounded-lg transition-colors"
                >
                  <motion.div
                    whileHover={{ scale: 1.25, rotate: 15 }}
                    transition={{ type: 'spring', stiffness: 300 }}
                    className="flex-shrink-0 w-7 h-7 rounded-full bg-gradient-to-br from-gold-400 to-gold-600 flex items-center justify-center shadow-md shadow-gold-500/20"
                  >
                    <Check size={14} className="text-white" />
                  </motion.div>
                  <p className="text-gray-700 font-cairo text-[0.95rem] group-hover:text-navy-900 transition-colors duration-200">
                    {feature}
                  </p>
                </motion.div>
              ))}
            </div>

            {/* CTA */}
            <motion.div variants={itemVariants} className="pt-2">
              <Link to="/contact">
                <motion.button
                  whileHover={{
                    scale: 1.05,
                    boxShadow: '0 12px 32px rgba(212,175,55,0.35)',
                  }}
                  whileTap={{ scale: 0.96 }}
                  className="about-cta-btn mt-4 px-9 py-3.5 rounded-xl bg-gradient-to-r from-gold-500 to-gold-600 text-white font-bold font-tajawal transition-all duration-300 shadow-lg relative overflow-hidden"
                >
                  <span className="relative z-10">تواصل معي الآن</span>
                </motion.button>
              </Link>
            </motion.div>
          </motion.div>

          {/* ─── Image Side ─── */}
          <motion.div
            variants={itemVariants}
            className="relative order-1 lg:order-2"
          >
            {/* Animated tilted bg frame */}
            <motion.div
              animate={{ rotate: [-2, -3.5, -2] }}
              transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
              className="absolute inset-2 bg-gradient-to-br from-gold-500/15 via-gold-400/5 to-navy-900/8 rounded-3xl pointer-events-none"
            />

            {/* Image with parallax scale */}
            <motion.div
              style={{ scale: imgScale }}
              className="relative rounded-2xl overflow-hidden shadow-2xl aspect-[4/5] max-h-[540px] about-image-wrapper"
            >
              <motion.img
                initial={{ scale: 1.15 }}
                whileInView={{ scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 1.4, ease: [0.22, 1, 0.36, 1] }}
                src={aboutImg}
                alt={siteName}
                className="w-full h-full object-cover"
              />
              {/* Overlay shimmer */}
              <div className="absolute inset-0 about-shimmer" />
              <div className="absolute inset-0 bg-gradient-to-t from-navy-900/35 via-transparent to-transparent" />
            </motion.div>

            {/* Floating card — experience */}
            <motion.div
              initial={{ opacity: 0, y: 30, scale: 0.8 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4, type: 'spring', stiffness: 150, damping: 14 }}
              className="absolute -bottom-4 -right-2 sm:right-3 z-10"
            >
              <motion.div
                animate={{ y: [0, -7, 0] }}
                transition={{ duration: 3.5, repeat: Infinity, ease: 'easeInOut' }}
                whileHover={{ scale: 1.08 }}
                className="about-float-card bg-white/95 backdrop-blur-sm p-4 rounded-xl shadow-xl border border-gold-100"
              >
                <p className="text-xs font-bold text-navy-900 font-tajawal mb-0.5">سنوات الخبرة</p>
                <p className="text-3xl font-tajawal font-bold text-gold-500 leading-none">
                  <AnimatedNumber end={15} suffix="+" />
                </p>
              </motion.div>
            </motion.div>

            {/* Floating card — cases */}
            <motion.div
              initial={{ opacity: 0, y: -30, scale: 0.8 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.6, type: 'spring', stiffness: 150, damping: 14 }}
              className="absolute -top-3 -left-2 sm:left-3 z-10"
            >
              <motion.div
                animate={{ y: [0, 6, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut', delay: 0.8 }}
                whileHover={{ scale: 1.08 }}
                className="about-float-card bg-white/95 backdrop-blur-sm p-3.5 rounded-xl shadow-xl border border-gold-100"
              >
                <p className="text-xs font-bold text-navy-900 font-tajawal mb-0.5">قضايا ناجحة</p>
                <p className="text-2xl font-tajawal font-bold text-gold-500 leading-none">
                  <AnimatedNumber end={500} suffix="+" />
                </p>
              </motion.div>
            </motion.div>

            {/* Animated ring */}
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
              className="about-ring absolute -top-5 right-10 w-14 h-14 hidden sm:block"
            />

            {/* Pulsing dots */}
            <motion.div
              animate={{ scale: [1, 1.5, 1], opacity: [0.6, 1, 0.6] }}
              transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut' }}
              className="absolute -top-2 right-[4.5rem] w-4 h-4 bg-gold-500 rounded-full shadow-lg shadow-gold-500/30 hidden sm:block"
            />
            <motion.div
              animate={{ scale: [1, 1.4, 1], opacity: [0.5, 1, 0.5] }}
              transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
              className="absolute bottom-16 -left-2 w-3.5 h-3.5 bg-navy-800 rounded-full shadow-lg hidden sm:block"
            />
            <motion.div
              animate={{ y: [0, -12, 0], opacity: [0.4, 0.9, 0.4] }}
              transition={{ duration: 3.5, repeat: Infinity, ease: 'easeInOut', delay: 0.5 }}
              className="absolute top-1/2 -right-3 w-2.5 h-2.5 bg-gold-400 rounded-full shadow-md hidden sm:block"
            />
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}

export default About
