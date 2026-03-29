import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { Download, FileText } from 'lucide-react'
import './Library.css'

const Library = () => {
  const library = [
    {
      id: 1,
      title: 'قانون العمل الكويتي',
      type: 'PDF',
      size: '2.5 MB',
      category: 'قانون',
    },
    {
      id: 2,
      title: 'نماذج العقود الأساسية',
      type: 'Word',
      size: '1.2 MB',
      category: 'نماذج',
    },
    {
      id: 3,
      title: 'أحكام محكمة التمييز المهمة',
      type: 'PDF',
      size: '3.8 MB',
      category: 'أحكام',
    },
    {
      id: 4,
      title: 'دليل الإجراءات المدنية',
      type: 'PDF',
      size: '2.1 MB',
      category: 'إجراءات',
    },
    {
      id: 5,
      title: 'نماذج شكاوى جنائية',
      type: 'Word',
      size: '0.9 MB',
      category: 'نماذج',
    },
    {
      id: 6,
      title: 'قضايا عملية محلولة',
      type: 'PDF',
      size: '4.2 MB',
      category: 'حالات عملية',
    },
  ]

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.08,
        delayChildren: 0.2,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, scale: 0.95 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: { duration: 0.5 },
    },
  }

  return (
    <section
      id="library"
      className="section-container bg-gradient-to-br from-white to-navy-50"
      style={{ direction: 'rtl' }}
    >
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-center mb-16"
      >
        <h2 className="section-title">المكتبة القانونية</h2>
        <div className="flex justify-center mb-6">
          <div className="w-20 h-1 bg-gradient-to-r from-gold-400 to-gold-600 rounded-full" />
        </div>
        <p className="section-subtitle">مجموعة شاملة من الموارد والمستندات القانونية</p>
      </motion.div>

      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-100px' }}
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
      >
        {library.map((doc, index) => (
          <motion.div
            key={index}
            variants={itemVariants}
            whileHover={{
              y: -10,
              boxShadow: '0 30px 80px rgba(212, 175, 55, 0.2)',
            }}
            className="card p-6 flex flex-col justify-between group cursor-pointer"
          >
            <div className="mb-4">
              <div className="flex items-center gap-3 mb-4">
                <div className="bg-gradient-to-br from-gold-500 to-gold-600 p-3 rounded-lg">
                  <FileText size={24} className="text-white" />
                </div>
                <span className="text-xs font-bold text-gold-500 uppercase px-2 py-1 bg-gold-50 rounded">
                  {doc.type}
                </span>
              </div>

              <h3 className="text-lg font-tajawal font-bold text-navy-900 mb-2 line-clamp-2 group-hover:text-gold-500 transition-colors">
                {doc.title}
              </h3>

              <div className="flex items-center justify-between text-sm text-gray-500">
                <span className="font-cairo">{doc.category}</span>
                <span className="font-cairo">{doc.size}</span>
              </div>
            </div>

            <Link to="/library" className="w-full mt-4 block">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="w-full px-4 py-2 bg-navy-900 text-white font-bold rounded-lg hover:bg-navy-800 transition-all flex items-center justify-center gap-2 font-tajawal"
              >
                <Download size={16} />
                تحميل
              </motion.button>
            </Link>
          </motion.div>
        ))}
      </motion.div>
    </section>
  )
}

export default Library
