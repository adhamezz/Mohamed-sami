import { useState, useEffect } from 'react'
import { ChevronUp } from 'lucide-react'

const ScrollToTopButton = () => {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const onScroll = () => {
      setVisible(window.scrollY > 400)
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <button
      onClick={scrollToTop}
      className={`fixed bottom-24 right-6 z-40 w-11 h-11 rounded-full bg-navy-900 text-white shadow-md hover:bg-navy-800 hover:shadow-lg hover:-translate-y-0.5 transition-all duration-300 flex items-center justify-center ${
        visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4 pointer-events-none'
      }`}
      aria-label="العودة للأعلى"
      title="العودة للأعلى"
    >
      <ChevronUp size={20} />
    </button>
  )
}

export default ScrollToTopButton
