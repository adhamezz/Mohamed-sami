import { useState } from 'react'
import { X, Mail, User, Bell } from 'lucide-react'

const FloatingSubscribeButton = () => {
  const [isOpen, setIsOpen] = useState(false)
  const [formData, setFormData] = useState({ name: '', email: '' })
  const [errors, setErrors] = useState({})
  const [success, setSuccess] = useState(false)

  const validate = () => {
    const newErrors = {}
    if (!formData.name.trim()) newErrors.name = 'الاسم مطلوب'
    if (!formData.email.trim()) {
      newErrors.email = 'البريد الإلكتروني مطلوب'
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'البريد الإلكتروني غير صالح'
    }
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!validate()) return

    // Save to localStorage
    const subscribers = JSON.parse(localStorage.getItem('subscribers') || '[]')
    subscribers.push({
      name: formData.name.trim(),
      email: formData.email.trim(),
      date: new Date().toISOString(),
    })
    localStorage.setItem('subscribers', JSON.stringify(subscribers))

    // Send email notification
    const subject = encodeURIComponent('اشتراك جديد في النشرة القانونية')
    const body = encodeURIComponent(`اشتراك جديد في النشرة القانونية:\n\nالاسم: ${formData.name.trim()}\nالبريد الإلكتروني: ${formData.email.trim()}\nتاريخ الاشتراك: ${new Date().toLocaleDateString('ar-EG')}`)
    window.open(`mailto:mohamedsamy992019@gmail.com?subject=${subject}&body=${body}`, '_self')

    setSuccess(true)
    setTimeout(() => {
      setSuccess(false)
      setIsOpen(false)
      setFormData({ name: '', email: '' })
      setErrors({})
    }, 2000)
  }

  return (
    <>
      {/* Floating Button - Right side */}
      <button
        onClick={() => setIsOpen(true)}
        className="subscribe-float-btn fixed right-0 top-1/2 -translate-y-1/2 z-40 bg-navy-900 text-white px-3 py-4 rounded-l-lg shadow-lg hover:bg-navy-800 hover:shadow-xl hover:px-4 transition-all duration-300 flex flex-col items-center gap-2 group"
        style={{ writingMode: 'vertical-rl', direction: 'rtl' }}
        title="اشترك الآن"
      >
        <Bell size={18} className="group-hover:animate-bounce" style={{ writingMode: 'horizontal-tb' }} />
        <span className="text-sm font-bold font-cairo tracking-wider">اشترك الآن</span>
      </button>

      {/* Modal Backdrop + Form */}
      {isOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-4"
          onClick={() => { if (!success) setIsOpen(false) }}
        >
          <div
            className="bg-white rounded-xl shadow-2xl w-full max-w-md p-0 overflow-hidden animate-scale-in"
            onClick={(e) => e.stopPropagation()}
            style={{ direction: 'rtl' }}
          >
            {/* Header */}
            <div className="bg-navy-900 px-6 py-5 flex items-center justify-between">
              <div>
                <h3 className="text-lg font-tajawal font-bold text-white">اشترك في النشرة القانونية</h3>
                <p className="text-gray-300 text-sm font-cairo mt-1">احصل على آخر الأخبار والمقالات القانونية</p>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="text-gray-400 hover:text-white transition-colors p-1"
              >
                <X size={20} />
              </button>
            </div>

            {/* Success State */}
            {success ? (
              <div className="px-6 py-10 text-center">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <h4 className="text-xl font-tajawal font-bold text-navy-900 mb-2">تم الاشتراك بنجاح</h4>
                <p className="text-gray-500 font-cairo text-sm">شكراً لاشتراكك، ستصلك آخر المستجدات القانونية.</p>
              </div>
            ) : (
              /* Form */
              <form onSubmit={handleSubmit} className="px-6 py-6 space-y-4">
                {/* Name */}
                <div>
                  <label className="block text-sm font-bold text-navy-800 font-cairo mb-1.5">الاسم</label>
                  <div className="relative">
                    <User size={16} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400" />
                    <input
                      type="text"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder="أدخل اسمك"
                      className={`w-full pr-10 pl-4 py-2.5 border rounded-lg font-cairo text-sm focus:outline-none focus:ring-2 focus:ring-gold-500 transition-colors ${
                        errors.name ? 'border-red-400 bg-red-50' : 'border-gray-300'
                      }`}
                    />
                  </div>
                  {errors.name && <p className="text-red-500 text-xs font-cairo mt-1">{errors.name}</p>}
                </div>

                {/* Email */}
                <div>
                  <label className="block text-sm font-bold text-navy-800 font-cairo mb-1.5">البريد الإلكتروني</label>
                  <div className="relative">
                    <Mail size={16} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400" />
                    <input
                      type="email"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="example@email.com"
                      dir="ltr"
                      className={`w-full pr-10 pl-4 py-2.5 border rounded-lg font-cairo text-sm text-right focus:outline-none focus:ring-2 focus:ring-gold-500 transition-colors ${
                        errors.email ? 'border-red-400 bg-red-50' : 'border-gray-300'
                      }`}
                    />
                  </div>
                  {errors.email && <p className="text-red-500 text-xs font-cairo mt-1">{errors.email}</p>}
                </div>

                {/* Submit */}
                <button
                  type="submit"
                  className="w-full py-3 bg-gold-500 text-white font-bold font-tajawal rounded-lg hover:bg-gold-600 transition-colors duration-200 shadow-md hover:shadow-lg"
                >
                  اشترك
                </button>
              </form>
            )}
          </div>
        </div>
      )}
    </>
  )
}

export default FloatingSubscribeButton
