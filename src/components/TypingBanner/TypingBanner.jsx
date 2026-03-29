import { useState, useEffect, useRef } from 'react'
import { motion, useInView } from 'framer-motion'

const mainText = 'دعم قانوني متخصص لكل جانب من جوانب حياتك وأعمالك'

const rotatingTexts = [
  'نحمي حقوقك بكل احترافية والتزام',
  'شريكك القانوني الأول في كل خطوة',
  'خبرة قانونية تصنع الفارق في قضيتك',
  'عدالتك هدفنا.. ونجاحك التزامنا',
  'حلول قانونية مبتكرة لعالم متغير',
]

const TypingBanner = () => {
  const sectionRef = useRef(null)
  const isInView = useInView(sectionRef, { once: true, margin: '-80px' })

  const [mainDisplayed, setMainDisplayed] = useState('')
  const [mainDone, setMainDone] = useState(false)
  const [rotatingDisplayed, setRotatingDisplayed] = useState('')
  const [rotatingIndex, setRotatingIndex] = useState(0)
  const [isDeleting, setIsDeleting] = useState(false)

  // Type the main text once
  useEffect(() => {
    if (!isInView || mainDone) return
    let i = 0
    const timer = setInterval(() => {
      i++
      setMainDisplayed(mainText.slice(0, i))
      if (i >= mainText.length) {
        clearInterval(timer)
        setMainDone(true)
      }
    }, 45)
    return () => clearInterval(timer)
  }, [isInView, mainDone])

  // Type & delete rotating texts
  useEffect(() => {
    if (!mainDone) return

    const current = rotatingTexts[rotatingIndex]

    if (!isDeleting) {
      if (rotatingDisplayed.length < current.length) {
        const timer = setTimeout(() => {
          setRotatingDisplayed(current.slice(0, rotatingDisplayed.length + 1))
        }, 50)
        return () => clearTimeout(timer)
      } else {
        const timer = setTimeout(() => setIsDeleting(true), 2200)
        return () => clearTimeout(timer)
      }
    } else {
      if (rotatingDisplayed.length > 0) {
        const timer = setTimeout(() => {
          setRotatingDisplayed(rotatingDisplayed.slice(0, -1))
        }, 30)
        return () => clearTimeout(timer)
      } else {
        setIsDeleting(false)
        setRotatingIndex((rotatingIndex + 1) % rotatingTexts.length)
      }
    }
  }, [mainDone, rotatingDisplayed, isDeleting, rotatingIndex])

  return (
    <section
      ref={sectionRef}
      className="relative overflow-hidden py-24 md:py-32"
      style={{ direction: 'rtl' }}
    >
      {/* Animated gradient background */}
      <div className="absolute inset-0 bg-gradient-to-br from-navy-900 via-navy-800 to-navy-900" />

      {/* Floating shapes */}
      <motion.div
        animate={{ x: [0, 40, 0], y: [0, -30, 0] }}
        transition={{ duration: 14, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute top-10 right-[8%] w-72 h-72 bg-gold-500/[0.06] rounded-full blur-3xl pointer-events-none"
      />
      <motion.div
        animate={{ x: [0, -30, 0], y: [0, 25, 0] }}
        transition={{ duration: 18, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute bottom-10 left-[12%] w-96 h-96 bg-gold-400/[0.04] rounded-full blur-3xl pointer-events-none"
      />
      <motion.div
        animate={{ scale: [1, 1.3, 1], opacity: [0.04, 0.08, 0.04] }}
        transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-gold-500/[0.03] rounded-full blur-3xl pointer-events-none"
      />

      {/* Particle dots */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {[...Array(6)].map((_, i) => (
          <motion.div
            key={i}
            animate={{
              y: [0, -15, 0],
              opacity: [0.2, 0.5, 0.2],
            }}
            transition={{
              duration: 3 + i * 0.7,
              repeat: Infinity,
              delay: i * 0.5,
            }}
            className="absolute w-1.5 h-1.5 bg-gold-400 rounded-full"
            style={{
              top: `${15 + i * 14}%`,
              left: `${10 + i * 15}%`,
            }}
          />
        ))}
      </div>

      {/* Decorative lines */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-gold-500/30 to-transparent" />
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-gold-500/30 to-transparent" />

      {/* Content */}
      <div className="relative z-10 max-w-5xl mx-auto px-4 text-center">
        {/* Gold accent */}
        <motion.div
          initial={{ width: 0 }}
          animate={isInView ? { width: 80 } : {}}
          transition={{ duration: 0.8 }}
          className="h-1 bg-gradient-to-r from-gold-400 to-gold-600 mx-auto rounded-full mb-10"
        />

        {/* Main typed text */}
        <div className="min-h-[4.5rem] md:min-h-[5.5rem] flex items-center justify-center mb-8">
          <h2 className="text-2xl sm:text-3xl md:text-[2.7rem] md:leading-[1.4] font-tajawal font-bold text-white">
            {mainDisplayed}
            {!mainDone && (
              <span className="inline-block w-[3px] h-[1.1em] bg-gold-500 mr-1 align-middle animate-blink" />
            )}
          </h2>
        </div>

        {/* Divider */}
        {mainDone && (
          <motion.div
            initial={{ opacity: 0, scaleX: 0 }}
            animate={{ opacity: 1, scaleX: 1 }}
            transition={{ duration: 0.6 }}
            className="w-24 h-[2px] bg-gold-500/40 mx-auto mb-8 rounded-full"
          />
        )}

        {/* Rotating typed text */}
        {mainDone && (
          <div className="min-h-[3rem] md:min-h-[3.5rem] flex items-center justify-center">
            <p className="text-lg sm:text-xl md:text-2xl font-cairo text-gold-400/90">
              {rotatingDisplayed}
              <span className="inline-block w-[2px] h-[1em] bg-gold-400 mr-1 align-middle animate-blink" />
            </p>
          </div>
        )}

        {/* Bottom accent */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={mainDone ? { opacity: 1 } : {}}
          transition={{ delay: 0.5, duration: 0.8 }}
          className="mt-10"
        >
          <div className="flex items-center justify-center gap-3">
            <div className="w-2 h-2 rounded-full bg-gold-500/50" />
            <div className="w-3 h-3 rounded-full bg-gold-500" />
            <div className="w-2 h-2 rounded-full bg-gold-500/50" />
          </div>
        </motion.div>
      </div>
    </section>
  )
}

export default TypingBanner
