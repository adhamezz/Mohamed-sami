import { useState } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Facebook, Linkedin, Mail, Phone, MapPin, MessageCircle, Send, ArrowUp, Scale, Shield, FileText, Instagram } from 'lucide-react'
import logoImg from '../../images/logo.jpg'
import { useCMS } from '../../context/CMSContext'
import './Footer.css'

const Footer = () => {
  const [email, setEmail] = useState('')
  const [subscribed, setSubscribed] = useState(false)
  const { siteSettings } = useCMS()

  const handleSubscribe = (e) => {
    e.preventDefault()
    if (!email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return
    const subscribers = JSON.parse(localStorage.getItem('subscribers') || '[]')
    subscribers.push({ email: email.trim(), date: new Date().toISOString() })
    localStorage.setItem('subscribers', JSON.stringify(subscribers))
    const subject = encodeURIComponent('اشتراك جديد في النشرة القانونية')
    const body = encodeURIComponent(`اشتراك جديد:\nالبريد: ${email.trim()}`)
    const adminEmail = siteSettings?.email || 'mohamedsamy992019@gmail.com'
    window.open(`mailto:${adminEmail}?subject=${subject}&body=${body}`, '_self')
    setSubscribed(true)
    setTimeout(() => { setSubscribed(false); setEmail('') }, 3000)
  }

  const whatsappNumber = siteSettings?.whatsapp || '971506207021'
  const adminEmail = siteSettings?.email || 'mohamedsamy992019@gmail.com'
  const logoSrc = siteSettings?.logo || logoImg
  const siteName = siteSettings?.siteName || 'محمد سامي'
  const footerAbout = siteSettings?.aboutText || siteSettings?.siteDescription || 'مستشار قانوني متخصص يقدم حلولاً قانونية للأفراد والشركات مع تركيز على الدقة والسرعة وحماية مصالح العملاء.'

  const socialLinks = [
    siteSettings?.facebook && { icon: Facebook, label: 'Facebook', href: siteSettings.facebook },
    siteSettings?.whatsapp && { icon: MessageCircle, label: 'WhatsApp', href: `https://wa.me/${whatsappNumber}` },
    siteSettings?.linkedin && { icon: Linkedin, label: 'LinkedIn', href: siteSettings.linkedin },
    siteSettings?.instagram && { icon: Instagram, label: 'Instagram', href: siteSettings.instagram },
    { icon: Mail, label: 'Email', href: `mailto:${adminEmail}` },
  ].filter(Boolean) || [
    { icon: Facebook, label: 'Facebook', href: 'https://www.facebook.com/mohamd.samy.9' },
    { icon: MessageCircle, label: 'WhatsApp', href: 'https://wa.me/971506207021' },
    { icon: Linkedin, label: 'LinkedIn', href: 'https://www.linkedin.com/in/mohamed-samy-810aa3256/' },
    { icon: Mail, label: 'Email', href: 'mailto:mohamedsamy992019@gmail.com' },
  ]

  const quickLinks = [
    { label: 'الرئيسية', path: '/' },
    { label: 'من نحن', path: '/about' },
    { label: 'خدماتنا', path: '/services' },
    { label: 'الأخبار', path: '/legal-news' },
    { label: 'المقالات', path: '/blog' },
    { label: 'المكتبة القانونية', path: '/library' },
    { label: 'الأسئلة الشائعة', path: '/faq' },
    { label: 'اتصل بنا', path: '/contact' },
  ]

  const services = [
    { label: 'القانون الجنائي', path: '/services/criminal-law', icon: Shield },
    { label: 'القانون التجاري والمدني', path: '/services/civil-commercial', icon: Scale },
    { label: 'قانون الأسرة', path: '/services/family-law', icon: FileText },
    { label: 'الاستشارات القانونية', path: '/services/consultation', icon: MessageCircle },
    { label: 'صياغة العقود', path: '/services/contracts', icon: FileText },
    { label: 'تأسيس الشركات', path: '/services/company-formation', icon: Scale },
    { label: 'القضاء الإداري والعمالي', path: '/services/admin-labor', icon: Shield },
    { label: 'المذكرات القانونية', path: '/services/legal-memos', icon: FileText },
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

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <>
      {/* CTA Banner before footer */}
      <section className="relative overflow-hidden bg-gradient-to-l from-navy-900 via-navy-800 to-navy-900 py-14" style={{ direction: 'rtl' }}>
        <div className="absolute inset-0 pointer-events-none">
          <motion.div animate={{ x: [0, 30, 0], y: [0, -20, 0] }} transition={{ duration: 8, repeat: Infinity }} className="absolute top-4 right-[10%] w-32 h-32 bg-gold-500/10 rounded-full blur-2xl" />
          <motion.div animate={{ x: [0, -20, 0], y: [0, 15, 0] }} transition={{ duration: 10, repeat: Infinity }} className="absolute bottom-4 left-[15%] w-40 h-40 bg-gold-400/5 rounded-full blur-3xl" />
        </div>
        <div className="max-w-5xl mx-auto px-4 text-center relative z-10">
          <motion.h3
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-2xl md:text-3xl font-tajawal font-bold text-white mb-3"
          >
            هل تحتاج استشارة قانونية؟
          </motion.h3>
          <motion.p
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-gray-300 font-cairo mb-8 max-w-xl mx-auto"
          >
            تواصل معنا الآن واحصل على استشارة قانونية متخصصة من خبراء القانون
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            <a
              href={`tel:${(siteSettings?.phone || '+971544525880').replace(/\s/g, '')}`}
              className="inline-flex items-center gap-2 px-8 py-3.5 rounded-lg bg-gold-500 text-navy-900 font-bold font-tajawal hover:bg-gold-400 transition-all duration-300 shadow-lg hover:shadow-xl hover:-translate-y-0.5"
            >
              <Phone size={18} />
              اتصل بنا الآن
            </a>
            <a
              href={`https://wa.me/${whatsappNumber}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-8 py-3.5 rounded-lg border-2 border-white/30 text-white font-bold font-tajawal hover:bg-white/10 transition-all duration-300 hover:-translate-y-0.5"
            >
              <MessageCircle size={18} />
              واتساب
            </a>
          </motion.div>
        </div>
      </section>

      <footer
        className="footer-premium bg-navy-900 text-white pt-16 pb-8 relative"
        style={{ direction: 'rtl' }}
      >
      {/* Decorative top border */}
      <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-gold-500 to-transparent" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Newsletter Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="relative bg-gradient-to-l from-navy-800 to-navy-700/50 rounded-2xl p-8 mb-14 border border-navy-700/50 overflow-hidden"
        >
          <div className="absolute top-0 left-0 w-40 h-40 bg-gold-500/5 rounded-full blur-3xl pointer-events-none" />
          <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="text-center md:text-right">
              <h4 className="text-xl font-tajawal font-bold text-white mb-2 flex items-center gap-2 justify-center md:justify-start">
                <Mail size={20} className="text-gold-400" />
                اشترك في النشرة القانونية
              </h4>
              <p className="text-gray-400 font-cairo text-sm">احصل على آخر الأخبار والمقالات القانونية مباشرة في بريدك</p>
            </div>
            {subscribed ? (
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                className="flex items-center gap-2 text-green-400 font-cairo font-bold"
              >
                ✓ تم الاشتراك بنجاح!
              </motion.div>
            ) : (
              <form onSubmit={handleSubscribe} className="flex w-full md:w-auto gap-2">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="أدخل بريدك الإلكتروني"
                  className="w-full md:w-72 px-4 py-3 rounded-lg bg-navy-900/80 border border-navy-600 text-white font-cairo text-sm placeholder-gray-500 focus:outline-none focus:border-gold-500 transition-colors"
                  dir="ltr"
                />
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  type="submit"
                  className="px-6 py-3 bg-gold-500 hover:bg-gold-400 text-navy-900 font-bold font-tajawal rounded-lg transition-colors whitespace-nowrap flex items-center gap-2"
                >
                  <Send size={16} />
                  اشترك
                </motion.button>
              </form>
            )}
          </div>
        </motion.div>

        {/* Main Footer Content */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12"
        >
          {/* About Company */}
          <motion.div variants={itemVariants} className="space-y-4">
            <div className="flex items-center gap-3 mb-4">
              <motion.img
                whileHover={{ scale: 1.1, rotate: 5 }}
                src={logoSrc}
                alt={siteName}
                className="w-14 h-14 rounded-full object-cover border-2 border-gold-400 shadow-lg shadow-gold-500/20"
              />
              <div>
                <h3 className="text-2xl font-tajawal font-bold text-gold-400">{siteName}</h3>
                <p className="text-xs font-cairo text-gray-400">{siteSettings?.siteDescription || 'مستشار قانوني'}</p>
              </div>
            </div>
            <p className="text-gray-300 font-cairo leading-relaxed text-sm">
              {footerAbout}
            </p>
            <div className="flex gap-3 pt-4">
              {socialLinks.map((social, index) => {
                const Icon = social.icon
                return (
                  <motion.a
                    key={index}
                    href={social.href}
                    target={social.href.startsWith('mailto') ? '_self' : '_blank'}
                    rel="noopener noreferrer"
                    whileHover={{ scale: 1.2, rotate: 10, y: -3 }}
                    whileTap={{ scale: 0.9 }}
                    className="w-10 h-10 rounded-full bg-gold-500/20 hover:bg-gold-500 border border-gold-500/30 hover:border-gold-500 flex items-center justify-center transition-all duration-300"
                    aria-label={social.label}
                  >
                    <Icon size={18} className="text-gold-400 group-hover:text-navy-900" />
                  </motion.a>
                )
              })}
            </div>
          </motion.div>

          {/* Quick Links */}
          <motion.div variants={itemVariants} className="space-y-4">
            <h4 className="text-lg font-tajawal font-bold text-gold-400 mb-6 flex items-center gap-2">
              <div className="w-1 h-5 bg-gold-500 rounded-full" />
              الروابط السريعة
            </h4>
            <ul className="space-y-3">
              {quickLinks.map((link, index) => (
                <li key={index}>
                  <motion.div whileHover={{ x: -5 }}>
                    <Link
                      to={link.path}
                      className="text-gray-300 hover:text-gold-400 transition-all duration-300 font-cairo text-sm flex items-center gap-2 group"
                    >
                      <span className="w-1.5 h-1.5 rounded-full bg-gray-600 group-hover:bg-gold-500 transition-colors" />
                      {link.label}
                    </Link>
                  </motion.div>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Services */}
          <motion.div variants={itemVariants} className="space-y-4">
            <h4 className="text-lg font-tajawal font-bold text-gold-400 mb-6 flex items-center gap-2">
              <div className="w-1 h-5 bg-gold-500 rounded-full" />
              الخدمات القانونية
            </h4>
            <ul className="space-y-3">
              {services.map((service, index) => (
                <li key={index}>
                  <motion.div whileHover={{ x: -5 }}>
                    <Link
                      to={service.path}
                      className="text-gray-300 hover:text-gold-400 transition-all duration-300 font-cairo text-sm flex items-center gap-2 group"
                    >
                      <span className="w-1.5 h-1.5 rounded-full bg-gray-600 group-hover:bg-gold-500 transition-colors" />
                      {service.label}
                    </Link>
                  </motion.div>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Contact Info */}
          <motion.div variants={itemVariants} className="space-y-4">
            <h4 className="text-lg font-tajawal font-bold text-gold-400 mb-6 flex items-center gap-2">
              <div className="w-1 h-5 bg-gold-500 rounded-full" />
              معلومات التواصل
            </h4>
            <div className="space-y-4">
              <a href="https://maps.google.com/?q=Abu+Dhabi+UAE" target="_blank" rel="noopener noreferrer" className="flex items-start gap-3 group hover:translate-x-[-3px] transition-transform">
                <div className="w-8 h-8 rounded-lg bg-gold-500/10 flex items-center justify-center flex-shrink-0 group-hover:bg-gold-500/20 transition-colors">
                  <MapPin size={16} className="text-gold-400" />
                </div>
                <span className="text-gray-300 font-cairo text-sm group-hover:text-gold-400 transition-colors">
                  {siteSettings?.address || 'أبوظبي، الإمارات العربية المتحدة'}
                </span>
              </a>
              {siteSettings?.phone && (
                <a href={`tel:${siteSettings.phone.replace(/\s/g, '')}`} className="flex items-start gap-3 group hover:translate-x-[-3px] transition-transform">
                  <div className="w-8 h-8 rounded-lg bg-gold-500/10 flex items-center justify-center flex-shrink-0 group-hover:bg-gold-500/20 transition-colors">
                    <Phone size={16} className="text-gold-400" />
                  </div>
                  <span className="text-gray-300 font-cairo text-sm group-hover:text-gold-400 transition-colors" dir="ltr">
                    {siteSettings.phone}
                  </span>
                </a>
              )}
              <a href={`https://wa.me/${whatsappNumber}`} target="_blank" rel="noopener noreferrer" className="flex items-start gap-3 group hover:translate-x-[-3px] transition-transform">
                <div className="w-8 h-8 rounded-lg bg-gold-500/10 flex items-center justify-center flex-shrink-0 group-hover:bg-gold-500/20 transition-colors">
                  <MessageCircle size={16} className="text-gold-400" />
                </div>
                <span className="text-gray-300 font-cairo text-sm group-hover:text-gold-400 transition-colors" dir="ltr">
                  +{whatsappNumber}
                </span>
              </a>
              <a href={`mailto:${adminEmail}`} className="flex items-start gap-3 group hover:translate-x-[-3px] transition-transform">
                <div className="w-8 h-8 rounded-lg bg-gold-500/10 flex items-center justify-center flex-shrink-0 group-hover:bg-gold-500/20 transition-colors">
                  <Mail size={16} className="text-gold-400" />
                </div>
                <span className="text-gray-300 font-cairo text-sm group-hover:text-gold-400 transition-colors" dir="ltr">
                  {adminEmail}
                </span>
              </a>
            </div>
          </motion.div>
        </motion.div>

        {/* Divider */}
        <div className="border-t border-navy-700/50 my-8 relative">
          <div className="absolute top-[-1px] left-1/2 -translate-x-1/2 w-24 h-[2px] bg-gradient-to-r from-transparent via-gold-500 to-transparent" />
        </div>

        {/* Bottom Footer */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="flex flex-col md:flex-row justify-between items-center gap-4"
        >
          <p className="text-gray-400 font-cairo text-sm text-center md:text-right">
            © {new Date().getFullYear()} {siteName}. جميع الحقوق محفوظة.
          </p>
          <div className="flex items-center gap-6">
            <Link
              to="/faq"
              className="text-gray-400 hover:text-gold-400 transition-colors font-cairo text-sm"
            >
              الأسئلة الشائعة
            </Link>
            <Link
              to="/about"
              className="text-gray-400 hover:text-gold-400 transition-colors font-cairo text-sm"
            >
              سياسة الخصوصية
            </Link>
            <Link
              to="/about"
              className="text-gray-400 hover:text-gold-400 transition-colors font-cairo text-sm"
            >
              شروط الاستخدام
            </Link>
            <motion.button
              whileHover={{ scale: 1.1, y: -2 }}
              whileTap={{ scale: 0.9 }}
              onClick={scrollToTop}
              className="w-9 h-9 rounded-full bg-gold-500/20 hover:bg-gold-500 border border-gold-500/30 flex items-center justify-center transition-all duration-300"
              aria-label="الذهاب لأعلى"
            >
              <ArrowUp size={16} className="text-gold-400" />
            </motion.button>
          </div>
        </motion.div>
      </div>

      {/* Animated Background Elements */}
      <motion.div
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.03, 0.08, 0.03],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
        }}
        className="absolute bottom-0 right-0 w-96 h-96 bg-gold-500 rounded-full blur-3xl pointer-events-none"
      />
      <motion.div
        animate={{
          scale: [1, 1.1, 1],
          opacity: [0.02, 0.06, 0.02],
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          delay: 2,
        }}
        className="absolute top-20 left-10 w-64 h-64 bg-gold-400 rounded-full blur-3xl pointer-events-none"
      />
    </footer>
    </>
  )
}

export default Footer
