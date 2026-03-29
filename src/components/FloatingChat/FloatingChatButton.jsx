import { useState, useEffect } from 'react'
import { MessageCircle, X, Send, Phone } from 'lucide-react'
import logoImg from '../../images/logo.jpg'

const FloatingChatButton = () => {
  const [isOpen, setIsOpen] = useState(false)
  const [hasNotification, setHasNotification] = useState(true)
  const [showBubble, setShowBubble] = useState(false)

  useEffect(() => {
    // Show notification bubble after 3 seconds
    const timer = setTimeout(() => setShowBubble(true), 3000)
    return () => clearTimeout(timer)
  }, [])

  const handleOpen = () => {
    setIsOpen(!isOpen)
    setHasNotification(false)
    setShowBubble(false)
  }

  const handleWhatsApp = () => {
    const message = encodeURIComponent('مرحباً، أود التواصل معكم بخصوص خدماتكم القانونية.')
    window.open(`https://wa.me/971506207021?text=${message}`, '_blank', 'noopener,noreferrer')
  }

  const handleCall = () => {
    window.location.href = 'tel:+971544525880'
  }

  return (
    <div className="fixed bottom-24 left-6 z-50" style={{ direction: 'rtl' }}>
      {/* Chat Popup */}
      {isOpen && (
        <div className="absolute bottom-16 left-0 w-80 bg-white rounded-2xl shadow-2xl overflow-hidden animate-in slide-in-from-bottom-4 duration-300 border border-gray-100">
          {/* Header */}
          <div className="bg-gradient-to-l from-navy-900 to-navy-800 p-4 text-white">
            <div className="flex items-center justify-between">
              <button onClick={handleOpen} className="text-white/70 hover:text-white transition-colors">
                <X size={18} />
              </button>
              <div className="flex items-center gap-3">
                <div className="text-right">
                  <h3 className="font-tajawal font-bold text-sm">محمد سامي</h3>
                  <p className="text-gold-400 text-xs font-cairo">متصل الآن</p>
                </div>
                <img src={logoImg} alt="محمد سامي" className="w-10 h-10 rounded-full object-cover border border-white/20" />
              </div>
            </div>
          </div>

          {/* Message */}
          <div className="p-4 bg-gray-50">
            <div className="bg-white rounded-xl p-3 shadow-sm border border-gray-100 max-w-[85%] mr-auto">
              <p className="text-navy-900 text-sm font-cairo leading-relaxed">
                مرحباً بك! 👋
                <br />
                كيف يمكننا مساعدتك؟ اختر طريقة التواصل المناسبة.
              </p>
              <span className="text-[10px] text-gray-400 font-cairo mt-1 block">الآن</span>
            </div>
          </div>

          {/* Actions */}
          <div className="p-4 space-y-2">
            <button
              onClick={handleWhatsApp}
              className="w-full flex items-center justify-center gap-2 bg-[#25D366] hover:bg-[#1fb855] text-white font-cairo font-bold py-3 rounded-xl transition-all duration-200 hover:-translate-y-0.5 shadow-sm"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.67-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
              </svg>
              تواصل عبر واتساب
            </button>
            <button
              onClick={handleCall}
              className="w-full flex items-center justify-center gap-2 bg-navy-900 hover:bg-navy-800 text-white font-cairo font-bold py-3 rounded-xl transition-all duration-200 hover:-translate-y-0.5 shadow-sm"
            >
              <Phone size={18} />
              اتصل بنا الآن
            </button>
            <a
              href="https://www.facebook.com/mohamd.samy.9"
              target="_blank"
              rel="noopener noreferrer"
              className="w-full flex items-center justify-center gap-2 bg-gold-500 hover:bg-gold-600 text-white font-cairo font-bold py-3 rounded-xl transition-all duration-200 hover:-translate-y-0.5 shadow-sm"
            >
              <Send size={18} />
              زيارة فيسبوك
            </a>
          </div>
        </div>
      )}

      {/* Notification Bubble */}
      {showBubble && !isOpen && (
        <div
          className="absolute bottom-16 left-0 bg-white rounded-xl shadow-lg p-3 w-56 border border-gray-100 cursor-pointer animate-bounce-subtle"
          onClick={handleOpen}
        >
          <p className="text-navy-900 text-sm font-cairo font-bold">مرحباً! 👋</p>
          <p className="text-gray-500 text-xs font-cairo mt-0.5">كيف يمكننا مساعدتك اليوم؟</p>
          <button
            onClick={(e) => { e.stopPropagation(); setShowBubble(false) }}
            className="absolute -top-2 -right-2 w-5 h-5 bg-gray-200 rounded-full flex items-center justify-center text-gray-500 hover:bg-gray-300 text-xs"
          >
            ×
          </button>
        </div>
      )}

      {/* Main Chat Button */}
      <button
        onClick={handleOpen}
        className={`relative w-14 h-14 rounded-full shadow-lg flex items-center justify-center transition-all duration-300 hover:scale-110 ${
          isOpen
            ? 'bg-gray-600 hover:bg-gray-700'
            : 'bg-gradient-to-br from-navy-800 to-navy-900 hover:shadow-xl'
        }`}
        aria-label="تواصل معنا"
      >
        {isOpen ? (
          <X size={24} className="text-white" />
        ) : (
          <MessageCircle size={24} className="text-white" />
        )}

        {/* Notification Badge */}
        {hasNotification && !isOpen && (
          <span className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 rounded-full flex items-center justify-center text-white text-[10px] font-bold animate-pulse shadow-sm">
            1
          </span>
        )}

        {/* Pulse ring */}
        {!isOpen && (
          <span className="absolute inset-0 rounded-full bg-navy-800 animate-ping opacity-20" />
        )}
      </button>
    </div>
  )
}

export default FloatingChatButton
