import { motion } from 'framer-motion'
import Articles from '../components/Articles/Articles'

export default function ArticlesPage() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      {/* Page Header */}
      <motion.section
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="section-container bg-gradient-to-b from-gold-50 to-white pt-16"
        style={{ direction: 'rtl' }}
      >
        <div className="text-center mb-8">
          <h1 className="text-4xl md:text-5xl font-bold text-navy-900 mb-4">مقالات قانونية</h1>
          <div className="w-20 h-1 bg-gradient-to-r from-gold-400 to-gold-600 rounded-full mx-auto" />
          <p className="text-lg text-gray-600 mt-4">نصائح وتحليلات قانونية متخصصة</p>
        </div>
      </motion.section>

      <Articles />
    </motion.div>
  )
}
