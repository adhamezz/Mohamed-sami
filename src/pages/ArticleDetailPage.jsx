import { useLocation, useNavigate, Link } from 'react-router-dom'
import { Clock, ArrowRight, Share2, ExternalLink, BookOpen, Scale, User } from 'lucide-react'
import { formatDate } from '../utils/formatDate'

function estimateReadTime(text) {
  if (!text) return '٣ دقائق'
  const words = text.split(/\s+/).length
  const minutes = Math.max(3, Math.ceil(words / 150))
  return `${minutes} دقائق`
}

export default function ArticleDetailPage() {
  const { state } = useLocation()
  const navigate = useNavigate()
  const article = state?.article

  // If no article data (direct URL access), go back to blog
  if (!article) {
    return (
      <div style={{ direction: 'rtl' }} className="min-h-screen bg-gray-50 flex flex-col items-center justify-center text-center px-4">
        <BookOpen size={48} className="text-gray-300 mb-4" />
        <h2 className="text-2xl font-tajawal font-bold text-navy-900 mb-2">المقال غير متوفر</h2>
        <p className="text-gray-500 font-cairo mb-6">يُرجى العودة للمدونة واختيار مقال</p>
        <Link
          to="/blog"
          className="px-6 py-3 bg-gold-500 text-white font-bold rounded-lg hover:bg-gold-600 transition-colors font-cairo"
        >
          العودة للمدونة
        </Link>
      </div>
    )
  }

  const shareUrl = article.url || window.location.href
  const shareText = article.title

  const handleShare = (platform) => {
    const encodedUrl = encodeURIComponent(shareUrl)
    const encodedText = encodeURIComponent(shareText)
    const urls = {
      facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`,
      whatsapp: `https://wa.me/?text=${encodedText}%20${encodedUrl}`,
      linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`,
    }
    window.open(urls[platform], '_blank', 'noopener,noreferrer,width=600,height=400')
  }

  const handleCopyLink = () => {
    navigator.clipboard.writeText(shareUrl)
  }

  // Extended paragraphs for the article body
  const articleParagraphs = [
    article.description,
    'يُعد هذا الموضوع من أبرز القضايا القانونية التي تشغل الرأي العام في الفترة الأخيرة، حيث يتناول جوانب متعددة تتعلق بالتشريعات والأحكام القضائية ذات الصلة. ويأتي هذا في سياق التطورات المستمرة في المنظومة القانونية المصرية والعربية.',
    'وفي هذا الإطار، أكد الخبراء القانونيون أن فهم هذه التطورات يُعد أمرًا ضروريًا لكل من المتخصصين والمواطنين على حد سواء، حيث تؤثر هذه التغييرات بشكل مباشر على الحقوق والواجبات القانونية للأفراد والمؤسسات.',
    'كما أشار المحللون إلى أن هذا التطور القانوني يتماشى مع الاتجاهات العالمية في تحديث التشريعات، مع مراعاة الخصوصية الثقافية والاجتماعية للمجتمع المصري. وقد لاقت هذه التعديلات ترحيبًا واسعًا من المجتمع القانوني.',
    'ومن الجدير بالذكر أن المستشار القانوني محمد سامي يقدم استشارات متخصصة في هذا المجال، ويحرص على إطلاع عملائه بأحدث التطورات القانونية التي قد تؤثر على مصالحهم.',
  ]

  const relatedTopics = [
    { title: 'قانون الأحوال الشخصية', icon: Scale },
    { title: 'القانون التجاري والشركات', icon: Scale },
    { title: 'قانون العمل والعمال', icon: Scale },
    { title: 'القضايا الجنائية', icon: Scale },
  ]

  return (
    <div style={{ direction: 'rtl' }}>
      {/* Hero Image Header */}
      <section className="relative h-[340px] md:h-[420px] overflow-hidden">
        <img
          src={article.image}
          alt={article.title}
          className="w-full h-full object-cover"
          onError={(e) => {
            e.target.src = 'https://images.unsplash.com/photo-1589829545856-d10d557cf95f?w=1200&h=600&fit=crop'
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-navy-900 via-navy-900/70 to-navy-900/30" />

        {/* Back button */}
        <button
          onClick={() => navigate('/blog')}
          className="absolute top-6 right-6 z-10 flex items-center gap-2 bg-white/10 backdrop-blur-md text-white px-4 py-2 rounded-lg hover:bg-white/20 transition-colors font-cairo text-sm"
        >
          <ArrowRight size={16} />
          العودة للمدونة
        </button>

        {/* Title overlay */}
        <div className="absolute bottom-0 right-0 left-0 p-6 md:p-10">
          <div className="max-w-4xl mx-auto">
            {article.source?.name && (
              <span className="inline-block bg-gold-500 text-white text-xs font-cairo px-3 py-1 rounded-md mb-3">
                {article.source.name}
              </span>
            )}
            <h1 className="text-2xl md:text-4xl font-tajawal font-bold text-white leading-relaxed mb-3">
              {article.title}
            </h1>
            <div className="flex flex-wrap items-center gap-4 text-gray-300 text-sm font-cairo">
              {article.publishedAt && (
                <span className="flex items-center gap-1.5">
                  <Clock size={14} />
                  {formatDate(article.publishedAt)}
                </span>
              )}
              <span className="flex items-center gap-1.5">
                <BookOpen size={14} />
                {estimateReadTime(article.description)}
              </span>
              <span className="flex items-center gap-1.5">
                <User size={14} />
                محمد سامي
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Article Body */}
      <section className="bg-white py-10 md:py-14">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">

            {/* Main Content — Right side (8/12) */}
            <article className="lg:col-span-8">
              {/* Article text */}
              <div className="prose-article space-y-5">
                {articleParagraphs.map((para, i) => (
                  <p
                    key={i}
                    className={`font-cairo text-gray-700 leading-[2] text-base ${i === 0 ? 'text-lg font-medium text-navy-800 border-r-4 border-gold-500 pr-4' : ''}`}
                  >
                    {para}
                  </p>
                ))}
              </div>

              {/* Divider */}
              <div className="border-t border-gray-100 my-8" />

              {/* Share Section */}
              <div className="bg-gray-50 rounded-xl p-5 md:p-6">
                <div className="flex items-center gap-2 mb-4">
                  <Share2 size={18} className="text-navy-900" />
                  <h3 className="font-tajawal font-bold text-navy-900">شارك المقال</h3>
                </div>
                <div className="flex flex-wrap gap-3">
                  <button
                    onClick={() => handleShare('facebook')}
                    className="flex items-center gap-2 bg-[#1877F2] text-white px-4 py-2.5 rounded-lg hover:opacity-90 transition-opacity font-cairo text-sm"
                  >
                    <i className="fab fa-facebook-f text-xs" />
                    فيسبوك
                  </button>
                  <button
                    onClick={() => handleShare('whatsapp')}
                    className="flex items-center gap-2 bg-[#25D366] text-white px-4 py-2.5 rounded-lg hover:opacity-90 transition-opacity font-cairo text-sm"
                  >
                    <i className="fab fa-whatsapp text-xs" />
                    واتساب
                  </button>
                  <button
                    onClick={() => handleShare('linkedin')}
                    className="flex items-center gap-2 bg-[#0A66C2] text-white px-4 py-2.5 rounded-lg hover:opacity-90 transition-opacity font-cairo text-sm"
                  >
                    <i className="fab fa-linkedin-in text-xs" />
                    لينكدإن
                  </button>
                  <button
                    onClick={handleCopyLink}
                    className="flex items-center gap-2 bg-gray-200 text-navy-900 px-4 py-2.5 rounded-lg hover:bg-gray-300 transition-colors font-cairo text-sm"
                  >
                    <ExternalLink size={14} />
                    نسخ الرابط
                  </button>
                </div>
              </div>

              {/* Original source link */}
              {article.url && article.url !== '#' && (
                <div className="mt-6 bg-navy-50 rounded-xl p-5 flex items-center justify-between">
                  <div>
                    <p className="font-tajawal font-bold text-navy-900 text-sm mb-1">المصدر الأصلي</p>
                    <p className="text-gray-500 font-cairo text-xs">اقرأ المقال كاملاً من المصدر</p>
                  </div>
                  <a
                    href={article.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 bg-navy-900 text-white px-5 py-2.5 rounded-lg hover:bg-navy-800 transition-colors font-cairo text-sm flex-shrink-0"
                  >
                    <ExternalLink size={14} />
                    زيارة المصدر
                  </a>
                </div>
              )}
            </article>

            {/* Sidebar — Left side (4/12) */}
            <aside className="lg:col-span-4 space-y-6">
              {/* Related Topics */}
              <div className="bg-gray-50 rounded-xl p-5">
                <h3 className="font-tajawal font-bold text-navy-900 mb-4 text-base">مواضيع ذات صلة</h3>
                <div className="space-y-2.5">
                  {relatedTopics.map((topic) => (
                    <Link
                      key={topic.title}
                      to="/blog"
                      className="flex items-center gap-3 p-3 bg-white rounded-lg hover:shadow-sm hover:bg-gold-50 transition-all group"
                    >
                      <div className="w-9 h-9 bg-navy-100 rounded-lg flex items-center justify-center flex-shrink-0 group-hover:bg-gold-100 transition-colors">
                        <topic.icon size={16} className="text-navy-600 group-hover:text-gold-600 transition-colors" />
                      </div>
                      <span className="font-cairo text-sm text-navy-800 group-hover:text-gold-600 transition-colors">
                        {topic.title}
                      </span>
                    </Link>
                  ))}
                </div>
              </div>

              {/* CTA - Contact */}
              <div className="bg-gradient-to-br from-navy-900 to-navy-800 rounded-xl p-6 text-center">
                <Scale size={32} className="text-gold-500 mx-auto mb-3" />
                <h3 className="font-tajawal font-bold text-white text-lg mb-2">
                  تحتاج استشارة قانونية؟
                </h3>
                <p className="text-gray-400 font-cairo text-sm mb-4 leading-relaxed">
                  مستشارك القانوني جاهز لمساعدتك
                </p>
                <Link
                  to="/contact"
                  className="block w-full bg-gold-500 text-white font-bold py-3 rounded-lg hover:bg-gold-600 transition-colors font-cairo text-sm"
                >
                  تواصل معنا الآن
                </Link>
                <a
                  href="https://wa.me/971506207021"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 mt-3 text-green-400 font-cairo text-sm hover:text-green-300 transition-colors"
                >
                  <i className="fab fa-whatsapp" />
                  أو عبر الواتساب
                </a>
              </div>

              {/* Quick Links */}
              <div className="bg-gray-50 rounded-xl p-5">
                <h3 className="font-tajawal font-bold text-navy-900 mb-3 text-base">روابط سريعة</h3>
                <div className="space-y-2">
                  {[
                    { label: 'الخدمات القانونية', path: '/services' },
                    { label: 'المكتبة القانونية', path: '/library' },
                    { label: 'من نحن', path: '/about' },
                    { label: 'جميع المقالات', path: '/blog' },
                  ].map((link) => (
                    <Link
                      key={link.path}
                      to={link.path}
                      className="block px-3 py-2 text-sm font-cairo text-gray-600 hover:text-gold-500 hover:bg-white rounded-lg transition-all"
                    >
                      ← {link.label}
                    </Link>
                  ))}
                </div>
              </div>
            </aside>
          </div>
        </div>
      </section>

      {/* Bottom CTA Banner */}
      <section className="bg-navy-900 py-10">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-xl md:text-2xl font-tajawal font-bold text-white mb-3">
            تابع أحدث الأخبار والمقالات القانونية
          </h2>
          <p className="text-gray-400 font-cairo text-sm mb-5">
            اطلع على كل جديد في عالم القانون المصري والعربي
          </p>
          <Link
            to="/blog"
            className="inline-flex items-center gap-2 bg-gold-500 text-white font-bold px-8 py-3 rounded-lg hover:bg-gold-600 transition-colors font-cairo"
          >
            <ArrowRight size={16} className="rotate-180" />
            تصفح جميع المقالات
          </Link>
        </div>
      </section>
    </div>
  )
}
