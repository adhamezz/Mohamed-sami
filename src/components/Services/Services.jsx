import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import {
  Briefcase,
  Gavel,
  Shield,
  DollarSign,
  Home,
  Users,
} from 'lucide-react'
import './Services.css'

const Services = () => {
  const services = [
    {
      icon: Gavel,
      title: 'قانون جنائي',
      description:
        'التمثيل القانوني الشامل في القضايا الجنائية مع دفاع قوي وفعال',
    },
    {
      icon: Briefcase,
      title: 'قانون تجاري',
      description:
        'استشارات متخصصة في العقود والشراكات والقضايا التجارية المعقدة',
    },
    {
      icon: Shield,
      title: 'قانون الأسرة',
      description:
        'خدمات قانونية في قضايا الزواج والطلاق والحضانة والميراث',
    },
    {
      icon: Home,
      title: 'قانون العقارات',
      description: 'استشارات شاملة في شراء وبيع وتأجير العقارات والملكيات',
    },
    {
      icon: DollarSign,
      title: 'قانون العمل',
      description:
        'حماية حقوق العمال والموظفين والشركات في النزاعات العمالية',
    },
    {
      icon: Users,
      title: 'قانون الضرائب',
      description:
        'استشارات ضريبية متخصصة وتمثيل أمام السلطات الضريبية',
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
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: 'easeOut',
      },
    },
  }

  return (
    <section
      id="services"
      className="section-container bg-gradient-to-br from-white to-navy-50"
      style={{ direction: 'rtl' }}
    >
      {/* Section Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="text-center mb-16"
      >
        <h2 className="section-title">خدماتنا المتخصصة</h2>
        <div className="flex justify-center mb-6">
          <div className="w-20 h-1 bg-gradient-to-r from-gold-400 to-gold-600 rounded-full" />
        </div>
        <p className="section-subtitle">
          نقدم خدمات قانونية متنوعة وشاملة لتلبية احتياجات جميع عملائنا
        </p>
      </motion.div>

      {/* Services Grid */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-100px' }}
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
      >
        {services.map((service, index) => {
          const Icon = service.icon
          return (
            <motion.div
              key={index}
              variants={itemVariants}
              whileHover={{
                y: -10,
                boxShadow: '0 30px 80px rgba(212, 175, 55, 0.2)',
              }}
              className="card card-hover p-8 group"
            >
              {/* Icon */}
              <motion.div
                whileHover={{ scale: 1.1, rotate: 5 }}
                className="mb-6"
              >
                <div className="w-16 h-16 rounded-lg bg-gradient-to-br from-gold-500 to-gold-600 flex items-center justify-center group-hover:shadow-premium transition-all duration-300">
                  <Icon size={32} className="text-white" />
                </div>
              </motion.div>

              {/* Title */}
              <h3 className="text-xl font-tajawal font-bold text-navy-900 mb-4">
                {service.title}
              </h3>

              {/* Description */}
              <p className="text-gray-600 font-cairo leading-relaxed mb-6">
                {service.description}
              </p>

              {/* Learn More Link */}
              <Link
                to="/contact"
                className="text-gold-500 font-bold flex items-end gap-2 cursor-pointer hover:text-gold-600 transition-colors duration-200"
              >
                <span>استفسر الآن</span>
                <svg
                  className="w-4 h-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 5l7 7-7 7"
                  />
                </svg>
              </Link>
            </motion.div>
          )
        })}
      </motion.div>

      {/* Bottom CTA */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.5, duration: 0.6 }}
        className="text-center mt-16 pt-12 border-t border-gray-200"
      >
        <p className="text-lg text-gray-700 mb-6 font-cairo">
          هل تحتاج إلى خدمة قانونية متخصصة؟
        </p>
        <Link to="/contact">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="px-8 py-4 rounded-lg bg-navy-900 text-white font-bold font-tajawal hover:bg-navy-800 transition-all duration-200 shadow-premium"
          >
            احجز استشارتك المجانية
          </motion.button>
        </Link>
      </motion.div>
    </section>
  )
}

export default Services
