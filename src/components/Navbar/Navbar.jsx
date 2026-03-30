import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Menu, X, Phone, ChevronDown } from 'lucide-react'
import logoImg from '../../images/logo.jpg'
import { useCMS } from '../../context/CMSContext'
import './Navbar.css'

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [openDropdown, setOpenDropdown] = useState(null)
  const { siteSettings } = useCMS()

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const servicesSubmenu = [
    { label: 'صياغة المذكرات القانونية والعقود', path: '/services/legal-memos' },
    { label: 'إدارة القضايا والمنازعات', path: '/services/case-management' },
    { label: 'الاستشارات القانونية', path: '/services/consultation' },
    { label: 'صياغة العقود', path: '/services/contracts' },
    { label: 'صياغة العقود باللغة الإنجليزية', path: '/services/contracts-english' },
    { label: 'قضايا الأحوال الشخصية (قضايا الأسرة)', path: '/services/family-law' },
    { label: 'قضايا الجنايات والجنح والمخالفات', path: '/services/criminal-law' },
    { label: 'القضايا المدنية والتجارية', path: '/services/civil-commercial' },
    { label: 'تأسيس الشركات', path: '/services/company-formation' },
    { label: 'دعاوى القضاء الإداري (مجلس الدولة) والقضايا العمالية', path: '/services/admin-labor' },
  ]

  const blogSubmenu = [
    { label: 'مقالات قانونية', path: '/blog' },
    { label: 'اخبار قانونية', path: '/legal-news' },
    { label: 'اسئلة شائعة', path: '/faq' },
  ]

  const librarySubmenu = [
    { label: 'كتب قانونية', path: '/library/legal-books' },
    { label: 'القوانين والتشريعات المصرية', path: '/library/egyptian-laws' },
    { label: 'القوانين والتشريعات الاماراتية', path: '/library/uae-laws' },
    { label: 'قوانين وتشريعات الكويت', path: '/library/kuwaiti-laws' },
    { label: 'مبادئ واحكام النقض المصرية', path: '/library/cassation-rulings' },
    { label: 'احكام ومبادئ المحكمة الادارية العليا', path: '/library/admin-court' },
    { label: 'احكام المحكمة الدستورية العليا', path: '/library/constitutional-court' },
    { label: 'صيغ الدعاوي', path: '/library/lawsuit-forms' },
    { label: 'صيغ العقود', path: '/library/contract-forms' },
    { label: 'صيغ الاعلانات والانذارات والطلبات', path: '/library/notices-forms' },
    { label: 'المواضيع القانونية', path: '/library/legal-topics' },
    { label: 'مذاكرات دفاع', path: '/library/defense-memos' },
  ]

  const guideSubmenu = [
    { label: 'أكواد القوانين المصرية', path: '/guide/egyptian-law-codes' },
    { label: 'استعلام عن قضية', path: '/guide/case-inquiry' },
    { label: 'استعلام عن الرقم التأميني', path: '/guide/insurance-inquiry' },
    { label: 'عناوين المحاكم المصرية', path: '/guide/egyptian-courts' },
    { label: 'عناوين المحاكم الاماراتية', path: '/guide/uae-courts' },
  ]

  const menuItems = [
    { label: 'المدونة', path: '/blog', submenu: blogSubmenu },
    { label: 'الخدمات القانونية', path: '/services', submenu: servicesSubmenu },
    { label: 'المكتبة القانونية', path: '/library', submenu: librarySubmenu },
    { label: 'دليل المستشار', path: '/guide/egyptian-law-codes', submenu: guideSubmenu },
  ]

  const logoSrc = siteSettings?.logo || logoImg
  const siteName = siteSettings?.siteName || 'محمد سامي'
  const siteDescription = siteSettings?.siteDescription || 'مستشار قانوني'
  const phone = siteSettings?.phone || '+971544525880'
  const whatsappNumber = siteSettings?.whatsapp || '971506207021'
  const whatsappDisplay = whatsappNumber.startsWith('+') ? whatsappNumber : `+${whatsappNumber}`
  const whatsappHref = `https://wa.me/${whatsappNumber.replace(/\D/g, '')}`
  const phoneHref = `tel:${phone.replace(/\s/g, '')}`
  const facebookLink = siteSettings?.facebook || 'https://www.facebook.com/mohamd.samy.9'
  const linkedinLink = siteSettings?.linkedin || 'https://www.linkedin.com/in/mohamed-samy-810aa3256/'

  return (
    <>
      {/* Top Bar */}
      <div className="topbar fixed top-0 left-0 right-0 z-50 bg-navy-900 text-white" style={{ direction: 'rtl' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-8 h-10">
            <div className="flex items-center gap-6 text-sm">
              <span className="text-gold-400 font-bold">للاستشارات القانونية</span>
            </div>
            <div className="flex items-center gap-6 text-sm">
              <a href={phoneHref} className="flex items-center gap-2 hover:text-gold-400 transition-colors">
                <Phone size={13} />
                <span dir="ltr">{phone}</span>
              </a>
              <a href={whatsappHref} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 hover:text-gold-400 transition-colors">
                <Phone size={13} />
                <span dir="ltr">{whatsappDisplay}</span>
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Main Navbar */}
      <nav
        className={`main-navbar fixed top-10 left-0 right-0 z-40 transition-all duration-300 ${
          scrolled ? 'bg-white shadow-lg' : 'bg-white shadow-sm'
        }`}
        style={{ direction: 'rtl' }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <Link to="/" className="flex-shrink-0 flex items-center gap-3">
              <img src={logoSrc} alt={siteName} className="w-10 h-10 rounded-full object-cover border border-gold-200 shadow-sm" />
              <div>
                <div className="text-lg font-tajawal font-bold text-navy-900 leading-tight">{siteName}</div>
                <div className="text-[11px] text-gold-500 font-cairo -mt-0.5">{siteDescription}</div>
              </div>
            </Link>

            {/* Desktop Menu */}
            <div className="hidden lg:flex items-center gap-0">
              {menuItems.map((item, index) => (
                <div key={index} className="relative group">
                  <Link
                    to={item.path}
                    className="navbar-link px-4 py-5 text-sm font-semibold text-navy-800 hover:text-gold-500 transition-colors duration-200 flex items-center gap-1"
                  >
                    {item.label}
                    {item.submenu && (
                      <ChevronDown size={14} className="text-navy-400 group-hover:text-gold-500 transition-transform duration-200 group-hover:rotate-180" />
                    )}
                  </Link>

                  {item.submenu && (
                    <div className={`dropdown-menu absolute right-0 top-full bg-white rounded-b-lg shadow-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 z-50 border-t-2 border-gold-500 ${
                      item.submenu.length > 6 ? 'w-[540px]' : 'w-72'
                    }`}>
                      <div className={item.submenu.length > 6 ? 'grid grid-cols-2' : ''}>
                        {item.submenu.map((subitem, subindex) => (
                          <Link
                            key={subindex}
                            to={subitem.path}
                            className="block px-5 py-3 text-sm text-navy-700 hover:bg-navy-50 hover:text-gold-500 hover:pr-7 transition-all duration-200 border-b border-gray-100 last:border-b-0 last:rounded-b-lg"
                          >
                            {subitem.label}
                          </Link>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              ))}

              {/* Social Media Icons */}
              <div className="flex items-center gap-2 px-3 border-r border-gray-200 mr-1">
                <a href={facebookLink} target="_blank" rel="noopener noreferrer" className="w-8 h-8 rounded-full bg-navy-50 flex items-center justify-center text-navy-700 hover:bg-[#1877F2] hover:text-white transition-all duration-200" aria-label="Facebook">
                  <i className="fab fa-facebook-f text-sm" />
                </a>
                <a href={whatsappHref} target="_blank" rel="noopener noreferrer" className="w-8 h-8 rounded-full bg-navy-50 flex items-center justify-center text-navy-700 hover:bg-[#25D366] hover:text-white transition-all duration-200" aria-label="WhatsApp">
                  <i className="fab fa-whatsapp text-sm" />
                </a>
                <a href={linkedinLink} target="_blank" rel="noopener noreferrer" className="w-8 h-8 rounded-full bg-navy-50 flex items-center justify-center text-navy-700 hover:bg-[#0A66C2] hover:text-white transition-all duration-200" aria-label="LinkedIn">
                  <i className="fab fa-linkedin-in text-sm" />
                </a>
              </div>

              {/* اتصل بنا */}
              <Link to="/contact" className="navbar-link px-4 py-5 text-sm font-semibold text-navy-800 hover:text-gold-500 transition-colors duration-200">
                اتصل بنا
              </Link>
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="lg:hidden text-navy-900 p-2 rounded-md hover:bg-gray-100 transition-colors"
              aria-label="Toggle menu"
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        <div className={`lg:hidden overflow-hidden bg-white border-t border-gray-200 transition-all duration-300 ${isOpen ? 'max-h-[80vh] overflow-y-auto' : 'max-h-0'}`}>
          <div className="px-4 pt-2 pb-4 space-y-1">
            {menuItems.map((item, index) => (
              <div key={index}>
                <div className="flex items-center justify-between">
                  <Link
                    to={item.path}
                    onClick={() => { if (!item.submenu) setIsOpen(false) }}
                    className="flex-1 block px-3 py-2.5 rounded-md text-base font-semibold text-navy-800 hover:bg-navy-50 hover:text-gold-500 transition-colors duration-200"
                  >
                    {item.label}
                  </Link>
                  {item.submenu && (
                    <button
                      onClick={() => setOpenDropdown(openDropdown === item.label ? null : item.label)}
                      className="px-3 py-2.5 text-navy-600 hover:text-gold-500 transition-colors"
                    >
                      <ChevronDown size={16} className={`transition-transform duration-200 ${openDropdown === item.label ? 'rotate-180' : ''}`} />
                    </button>
                  )}
                </div>

                {item.submenu && (
                  <div className={`overflow-hidden transition-all duration-300 ${openDropdown === item.label ? 'max-h-[600px]' : 'max-h-0'}`}>
                    <div className="bg-gray-50 rounded-md mr-4 mt-1">
                      {item.submenu.map((subitem, subindex) => (
                        <Link
                          key={subindex}
                          to={subitem.path}
                          onClick={() => setIsOpen(false)}
                          className="block px-5 py-2.5 text-sm text-navy-700 hover:bg-gold-50 hover:text-gold-500 transition-colors duration-200 border-b border-gray-100 last:border-b-0"
                        >
                          {subitem.label}
                        </Link>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ))}

            {/* Mobile: اتصل بنا */}
            <Link to="/contact" onClick={() => setIsOpen(false)} className="block px-3 py-2.5 rounded-md text-base font-semibold text-navy-800 hover:bg-navy-50 hover:text-gold-500 transition-colors duration-200">
              اتصل بنا
            </Link>

            {/* Mobile: Social Icons */}
            <div className="flex items-center gap-3 px-3 pt-3">
              <a href="https://www.facebook.com/mohamd.samy.9" target="_blank" rel="noopener noreferrer" className="w-9 h-9 rounded-full bg-navy-50 flex items-center justify-center text-navy-700 hover:bg-[#1877F2] hover:text-white transition-all duration-200">
                <i className="fab fa-facebook-f" />
              </a>
              <a href="https://wa.me/971506207021" target="_blank" rel="noopener noreferrer" className="w-9 h-9 rounded-full bg-navy-50 flex items-center justify-center text-navy-700 hover:bg-[#25D366] hover:text-white transition-all duration-200">
                <i className="fab fa-whatsapp" />
              </a>
              <a href="https://www.linkedin.com/in/mohamed-samy-810aa3256/" target="_blank" rel="noopener noreferrer" className="w-9 h-9 rounded-full bg-navy-50 flex items-center justify-center text-navy-700 hover:bg-[#0A66C2] hover:text-white transition-all duration-200">
                <i className="fab fa-linkedin-in" />
              </a>
            </div>
          </div>
        </div>
      </nav>

      {/* Spacer for fixed navbar */}
      <div className="h-[104px]" />
    </>
  )
}

export default Navbar
