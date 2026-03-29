import Contact from '../components/Contact/Contact'
import SEO from '../components/SEO'

export default function ContactPage() {
  return (
    <div style={{ direction: 'rtl' }}>
      <SEO title="اتصل بنا" description="تواصل مع المستشار القانوني محمد سامي — استشارات قانونية فورية عبر الهاتف أو الواتساب أو البريد الإلكتروني. فريقنا القانوني جاهز لخدمتك." path="/contact" />
      {/* Hero Banner */}
      <section className="bg-navy-900 py-16 md:py-20 text-center">
        <h1 className="text-3xl md:text-5xl font-tajawal font-bold text-white mb-3">
          اتصل بنا
        </h1>
        <div className="w-14 h-1 bg-gold-500 mx-auto rounded mb-4" />
        <p className="text-gray-300 font-cairo text-base md:text-lg max-w-md mx-auto px-4">
          نسعد بتواصلك معنا — فريقنا القانوني جاهز لخدمتك
        </p>
      </section>

      <Contact />
    </div>
  )
}
