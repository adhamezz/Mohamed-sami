import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { User, BookOpen } from 'lucide-react'
import './Articles.css'

const Articles = () => {
  const articles = [
    {
      id: 1,
      title: 'حقوقك القانونية عند توقيع عقد عمل',
      author: 'د. محمد الدعيج',
      category: 'قانون العمل',
      readTime: '5 دقائق',
      excerpt:
        'موضوع شامل عن الحقوق الأساسية للموظف عند التوقيع على عقد عمل جديد والبنود الواجب الانتباه لها...',
    },
    {
      id: 2,
      title: 'الدليل الشامل للعقود الإلكترونية',
      author: 'أ. فاطمة الخاطر',
      category: 'قانون رقمي',
      readTime: '8 دقائق',
      excerpt:
        'شرح مفصل عن صحة العقود المبرمة إلكترونياً والآثار القانونية وكيفية حماية حقوقك...',
    },
    {
      id: 3,
      title: 'الضرائب على الشركات: ما تحتاج معرفته',
      author: 'م. أحمد السعيد',
      category: 'القانون الضريبي',
      readTime: '6 دقائق',
      excerpt:
        'استعراض شامل للالتزامات الضريبية للشركات وكيفية تحضير الإقرارات الضريبية بشكل صحيح...',
    },
    {
      id: 4,
      title: 'الحماية القانونية للملكية الفكرية',
      author: 'د. سارة النومان',
      category: 'الملكية الفكرية',
      readTime: '7 دقائق',
      excerpt:
        'شرح تفصيلي لقوانين حماية براءات الاختراع والعلامات التجارية والنماذج الصناعية...',
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
      id="articles"
      className="section-container bg-white"
      style={{ direction: 'rtl' }}
    >
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-center mb-16"
      >
        <h2 className="section-title">مقالات قانونية</h2>
        <div className="flex justify-center mb-6">
          <div className="w-20 h-1 bg-gradient-to-r from-gold-400 to-gold-600 rounded-full" />
        </div>
      </motion.div>

      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-100px' }}
        className="grid grid-cols-1 md:grid-cols-2 gap-8"
      >
        {articles.map((article, index) => (
          <Link key={index} to="/blog">
          <motion.div
            variants={itemVariants}
            whileHover={{ boxShadow: '0 30px 80px rgba(212, 175, 55, 0.2)' }}
            className="card p-8 group cursor-pointer"
          >
            <div className="flex items-start gap-3 mb-4">
              <div className="bg-gold-500 p-2 rounded-lg">
                <BookOpen size={20} className="text-white" />
              </div>
              <span className="text-xs font-bold text-gold-500 uppercase px-3 py-1 bg-gold-50 rounded-full">
                {article.category}
              </span>
            </div>

            <h3 className="text-lg font-tajawal font-bold text-navy-900 mb-3 line-clamp-2 group-hover:text-gold-500 transition-colors">
              {article.title}
            </h3>

            <p className="text-gray-600 font-cairo text-sm leading-relaxed mb-4 line-clamp-2">
              {article.excerpt}
            </p>

            <div className="flex items-center justify-between text-sm text-gray-500 pt-4 border-t border-gray-200">
              <div className="flex items-center gap-2">
                <User size={16} />
                <span className="font-cairo">{article.author}</span>
              </div>
              <span className="font-cairo">{article.readTime}</span>
            </div>
          </motion.div>
          </Link>
        ))}
      </motion.div>
    </section>
  )
}

export default Articles
