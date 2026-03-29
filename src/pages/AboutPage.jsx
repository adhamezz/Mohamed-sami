import { motion } from 'framer-motion'
import About from '../components/About/About'
import Gallery from '../components/Gallery/Gallery'
import SEO from '../components/SEO'

export default function AboutPage() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <SEO title="من نحن" description="تعرف على المستشار القانوني محمد سامي — خبرة أكثر من 15 سنة في المحاماة والاستشارات القانونية والتمثيل أمام جميع المحاكم." path="/about" />
      {/* Page Header */}
      <motion.section
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="section-container bg-gradient-to-b from-gold-50 to-white pt-16"
        style={{ direction: 'rtl' }}
      >
        <div className="text-center mb-8">
          <h1 className="text-4xl md:text-5xl font-bold text-navy-900 mb-4">نبذة عني</h1>
          <div className="w-20 h-1 bg-gradient-to-r from-gold-400 to-gold-600 rounded-full mx-auto" />
        </div>
      </motion.section>

      <About />
      <Gallery />
    </motion.div>
  )
}
