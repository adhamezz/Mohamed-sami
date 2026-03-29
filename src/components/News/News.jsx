import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { Calendar, ArrowLeft } from 'lucide-react'
import './News.css'

const News = () => {
  const news = [
    {
      id: 1,
      title: 'تعديلات جديدة في قانون العمل الكويتي',
      date: '2024-03-15',
      excerpt:
        'دخلت التعديلات الجديدة على قانون العمل حيز التنفيذ الشهر الماضي...',
    },
    {
      id: 2,
      title: 'فوز بقضية تاريخية في القطاع القانوني',
      date: '2024-03-10',
      excerpt:
        "حققنا نجاحاً كبيراً في الدفاع عن عميلنا في قضية تجارية معقدة...",
    },
    {
      id: 3,
      title: 'الندوة القانونية الربع سنوية - القانون التجاري',
      date: '2024-03-05',
      excerpt:
        'ستقام الندوة القادمة لمناقشة أحدث التطورات في القانون التجاري...',
    },
  ]

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, x: -30 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.6 },
    },
  }

  return (
    <section
      id="news"
      className="section-container bg-gradient-to-br from-white to-gold-50"
      style={{ direction: 'rtl' }}
    >
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-center mb-16"
      >
        <h2 className="section-title">الأخبار والتحديثات</h2>
        <div className="flex justify-center mb-6">
          <div className="w-20 h-1 bg-gradient-to-r from-gold-400 to-gold-600 rounded-full" />
        </div>
      </motion.div>

      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-100px' }}
        className="space-y-6"
      >
        {news.map((item, index) => (
          <motion.div
            key={index}
            variants={itemVariants}
            whileHover={{ x: 10 }}
            className="card p-8 border-r-4 border-r-gold-500"
          >
            <div className="flex items-start gap-6">
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-3">
                  <Calendar size={16} className="text-gold-500" />
                  <span className="text-sm text-gray-500 font-cairo">
                    {new Date(item.date).toLocaleDateString('ar-SA')}
                  </span>
                </div>
                <h3 className="text-xl font-tajawal font-bold text-navy-900 mb-3">
                  {item.title}
                </h3>
                <p className="text-gray-600 font-cairo leading-relaxed mb-4">
                  {item.excerpt}
                </p>
                <Link
                  to="/legal-news"
                  className="text-gold-500 font-bold flex items-center gap-2 w-fit hover:text-gold-600"
                >
                  <span>اقرأ المزيد</span>
                  <ArrowLeft size={16} />
                </Link>
              </div>
            </div>
          </motion.div>
        ))}
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-center mt-12 pt-12 border-t border-gray-200"
      >
        <Link to="/legal-news">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="px-8 py-3 rounded-lg bg-navy-900 text-white font-bold font-tajawal hover:bg-navy-800 transition-all shadow-premium"
          >
            عرض جميع الأخبار
          </motion.button>
        </Link>
      </motion.div>
    </section>
  )
}

export default News
