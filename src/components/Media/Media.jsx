import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { Play } from 'lucide-react'
import './Media.css'

const Media = () => {
  const mediaItems = [
    {
      id: 1,
      title: 'حوار حول التطورات القانونية',
      category: 'فيديو',
      image: '🎬',
    },
    {
      id: 2,
      title: 'الحقوق والواجبات في العقود',
      category: 'مقال',
      image: '📰',
    },
    {
      id: 3,
      title: 'استشارة قانونية فورية مع الخبراء',
      category: 'ويبينار',
      image: '🎤',
    },
    {
      id: 4,
      title: 'آخر التحديثات في القانون الكويتي',
      category: 'أخبار',
      image: '📢',
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
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6 },
    },
  }

  return (
    <section
      id="media"
      className="section-container bg-white"
      style={{ direction: 'rtl' }}
    >
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-center mb-16"
      >
        <h2 className="section-title">المركز الإعلامي</h2>
        <div className="flex justify-center mb-6">
          <div className="w-20 h-1 bg-gradient-to-r from-gold-400 to-gold-600 rounded-full" />
        </div>
      </motion.div>

      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-100px' }}
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
      >
        {mediaItems.map((item, index) => (
          <Link key={index} to="/blog">
          <motion.div
            variants={itemVariants}
            whileHover={{ y: -5 }}
            className="card overflow-hidden cursor-pointer group"
          >
            <div className="relative h-48 bg-gradient-to-br from-navy-500 to-navy-700 flex items-center justify-center overflow-hidden">
              <motion.div
                animate={{ scale: [1, 1.1, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="text-6xl group-hover:scale-110 transition-transform"
              >
                {item.image}
              </motion.div>
              <div className="absolute inset-0 bg-black/30 group-hover:bg-black/50 transition-colors flex items-center justify-center opacity-0 group-hover:opacity-100">
                <Play className="text-white" size={40} />
              </div>
            </div>
            <div className="p-4">
              <span className="text-xs font-bold text-gold-500 uppercase">
                {item.category}
              </span>
              <h3 className="font-tajawal font-bold text-navy-900 mt-2 line-clamp-2">
                {item.title}
              </h3>
            </div>
          </motion.div>
          </Link>
        ))}
      </motion.div>
    </section>
  )
}

export default Media
