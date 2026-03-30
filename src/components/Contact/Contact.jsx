import { useState } from 'react'
import { Phone, MessageCircle, MapPin, Clock, Send, CheckCircle } from 'lucide-react'
import { useCMS } from '../../context/CMSContext'
import './Contact.css'

const Contact = () => {
  const [form, setForm] = useState({ name: '', email: '', phone: '', subject: '', message: '' })
  const [errors, setErrors] = useState({})
  const [submitted, setSubmitted] = useState(false)
  const { siteSettings } = useCMS()

  const validate = () => {
    const errs = {}
    if (!form.name.trim()) errs.name = 'الاسم مطلوب'
    if (!form.email.trim()) {
      errs.email = 'البريد الإلكتروني مطلوب'
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      errs.email = 'بريد إلكتروني غير صالح'
    }
    if (!form.message.trim()) errs.message = 'الرسالة مطلوبة'
    setErrors(errs)
    return Object.keys(errs).length === 0
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!validate()) return

    // Save to localStorage
    const messages = JSON.parse(localStorage.getItem('contactMessages') || '[]')
    messages.push({ ...form, date: new Date().toISOString() })
    localStorage.setItem('contactMessages', JSON.stringify(messages))

    // Send via email
    const subjectMap = {
      criminal: 'قضايا جنائية',
      family: 'أحوال شخصية',
      commercial: 'قضايا تجارية',
      labor: 'قضايا عمالية',
      contracts: 'صياغة عقود',
      company: 'تأسيس شركات',
      other: 'أخرى',
    }
    const subjectText = subjectMap[form.subject] || 'استشارة قانونية'
    const emailSubject = encodeURIComponent(`رسالة جديدة: ${subjectText} — من ${form.name}`)
    const emailBody = encodeURIComponent(
      `رسالة جديدة من موقع المستشار القانوني\n` +
      `━━━━━━━━━━━━━━━━━━━━━━━━━━\n\n` +
      `الاسم: ${form.name}\n` +
      `البريد الإلكتروني: ${form.email}\n` +
      `رقم الهاتف: ${form.phone || 'غير محدد'}\n` +
      `موضوع الاستشارة: ${subjectText}\n\n` +
      `الرسالة:\n${form.message}\n\n` +
      `━━━━━━━━━━━━━━━━━━━━━━━━━━\n` +
      `تاريخ الإرسال: ${new Date().toLocaleDateString('ar-EG')} — ${new Date().toLocaleTimeString('ar-EG')}`
    )
    const email = siteSettings?.email || 'mohamedsamy992019@gmail.com'
    window.open(`mailto:${email}?subject=${emailSubject}&body=${emailBody}`, '_self')

    setSubmitted(true)
    setTimeout(() => {
      setSubmitted(false)
      setForm({ name: '', email: '', phone: '', subject: '', message: '' })
    }, 3000)
  }

  const update = (field, value) => {
    setForm({ ...form, [field]: value })
    if (errors[field]) setErrors({ ...errors, [field]: undefined })
  }

  const whatsappNumber = siteSettings?.whatsapp || '971506207021'
  const phone = siteSettings?.phone || '+971 54 452 5880'
  const address = siteSettings?.address || 'أبوظبي — الإمارات'
  const workingHours = siteSettings?.workingHours || 'السبت — الخميس: 9:00 — 17:00'

  const contactCards = [
    { icon: Phone, label: 'الهاتف', value: phone, href: `tel:${phone.replace(/\s/g, '')}`, color: 'bg-blue-500' },
    { icon: MessageCircle, label: 'واتساب', value: `+${whatsappNumber}`, href: `https://wa.me/${whatsappNumber}`, color: 'bg-green-500' },
    { icon: MapPin, label: 'المقر الرئيسي', value: address, href: null, color: 'bg-red-500' },
    { icon: Clock, label: 'ساعات العمل', value: workingHours, href: null, color: 'bg-green-600' },
  ]

  return (
    <section id="contact" className="bg-gray-50 py-16" style={{ direction: 'rtl' }}>
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Main: Form + Contact Info side by side */}
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">

          {/* Form — 3 cols */}
          <div className="lg:col-span-3 bg-white rounded-2xl shadow-sm p-6 md:p-8">
            {submitted ? (
              <div className="flex flex-col items-center justify-center py-16 text-center">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-4">
                  <CheckCircle size={32} className="text-green-500" />
                </div>
                <h3 className="text-xl font-tajawal font-bold text-navy-900 mb-2">تم إرسال رسالتك بنجاح</h3>
                <p className="text-gray-500 font-cairo text-sm">سنتواصل معك في أقرب وقت ممكن</p>
              </div>
            ) : (
              <>
                <h3 className="text-xl font-tajawal font-bold text-navy-900 mb-6 flex items-center gap-2">
                  <Send size={20} className="text-gold-500" />
                  أرسل لنا رسالتك
                </h3>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <input
                        type="text"
                        placeholder="الاسم الكامل *"
                        value={form.name}
                        onChange={(e) => update('name', e.target.value)}
                        className={`contact-input ${errors.name ? 'border-red-400' : ''}`}
                      />
                      {errors.name && <p className="text-red-500 text-xs mt-1 font-cairo">{errors.name}</p>}
                    </div>
                    <div>
                      <input
                        type="email"
                        placeholder="البريد الإلكتروني *"
                        value={form.email}
                        onChange={(e) => update('email', e.target.value)}
                        className={`contact-input ${errors.email ? 'border-red-400' : ''}`}
                      />
                      {errors.email && <p className="text-red-500 text-xs mt-1 font-cairo">{errors.email}</p>}
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <input
                      type="tel"
                      placeholder="رقم الهاتف"
                      value={form.phone}
                      onChange={(e) => update('phone', e.target.value)}
                      className="contact-input"
                    />
                    <select
                      value={form.subject}
                      onChange={(e) => update('subject', e.target.value)}
                      className="contact-input"
                    >
                      <option value="">موضوع الاستشارة</option>
                      <option value="criminal">قضايا جنائية</option>
                      <option value="family">أحوال شخصية</option>
                      <option value="commercial">قضايا تجارية</option>
                      <option value="labor">قضايا عمالية</option>
                      <option value="contracts">صياغة عقود</option>
                      <option value="company">تأسيس شركات</option>
                      <option value="other">أخرى</option>
                    </select>
                  </div>

                  <div>
                    <textarea
                      rows="5"
                      placeholder="اكتب رسالتك هنا... *"
                      value={form.message}
                      onChange={(e) => update('message', e.target.value)}
                      className={`contact-input resize-none ${errors.message ? 'border-red-400' : ''}`}
                    />
                    {errors.message && <p className="text-red-500 text-xs mt-1 font-cairo">{errors.message}</p>}
                  </div>

                  <button
                    type="submit"
                    className="w-full py-3.5 bg-gold-500 text-white font-bold font-tajawal rounded-lg hover:bg-gold-600 transition-colors shadow-md hover:shadow-lg flex items-center justify-center gap-2"
                  >
                    <Send size={18} />
                    إرسال الرسالة
                  </button>
                </form>
              </>
            )}
          </div>

          {/* Contact Info Cards — 2 cols */}
          <div className="lg:col-span-2 flex flex-col gap-5">
            {contactCards.map((card, i) => {
              const Icon = card.icon
              const Wrapper = card.href ? 'a' : 'div'
              const wrapperProps = card.href
                ? { href: card.href, ...(card.href.startsWith('http') ? { target: '_blank', rel: 'noopener noreferrer' } : {}) }
                : {}
              return (
                <Wrapper
                  key={i}
                  {...wrapperProps}
                  className="bg-white rounded-2xl p-6 flex items-center gap-5 shadow-sm hover:shadow-lg transition-all duration-300 group border border-gray-100 hover:border-gold-200"
                >
                  <div className={`w-14 h-14 ${card.color} rounded-xl flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform duration-300 shadow-md`}>
                    <Icon size={26} className="text-white" />
                  </div>
                  <div>
                    <p className="text-xs text-gray-400 font-cairo mb-1">{card.label}</p>
                    <p className="text-base font-bold text-navy-900 font-cairo">{card.value}</p>
                  </div>
                </Wrapper>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}

export default Contact
