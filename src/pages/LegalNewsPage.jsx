import { useState, useEffect, useCallback } from 'react'
import { Link } from 'react-router-dom'
import { Loader2, RefreshCw, AlertCircle, Clock, Newspaper, Filter } from 'lucide-react'
import { fetchNewsArticles } from '../services/newsApi'
import { formatDate } from '../utils/formatDate'

function timeAgo(dateStr) {
  try {
    const diff = Date.now() - new Date(dateStr).getTime()
    const mins = Math.floor(diff / 60000)
    if (mins < 60) return `منذ ${mins} دقيقة`
    const hrs = Math.floor(mins / 60)
    if (hrs < 24) return `منذ ${hrs} ساعة`
    const days = Math.floor(hrs / 24)
    return `منذ ${days} يوم`
  } catch { return '' }
}

export default function LegalNewsPage() {
  const [articles, setArticles] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [lastUpdated, setLastUpdated] = useState(null)
  const [filter, setFilter] = useState('all') // 'all' | 'eg' | 'ae'

  const loadArticles = useCallback(async (showSpinner = true) => {
    if (showSpinner) setLoading(true)
    try {
      const data = await fetchNewsArticles()
      setArticles(data)
      setLastUpdated(new Date())
      setError(null)
    } catch {
      setError('فشل في تحميل الأخبار')
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    loadArticles(true)
    const interval = setInterval(() => loadArticles(false), 60000)
    return () => clearInterval(interval)
  }, [loadArticles])

  // Simple country detection from source name or title
  const getCountry = (article) => {
    const text = `${article.title} ${article.description} ${article.source?.name || ''}`
    if (/إمارات|دبي|أبوظبي|الشارقة|البيان|الاتحاد الإماراتي|WAM/i.test(text)) return 'ae'
    return 'eg'
  }

  const filteredArticles = filter === 'all'
    ? articles
    : articles.filter((a) => getCountry(a) === filter)

  return (
    <div style={{ direction: 'rtl' }}>
      {/* Hero */}
      <section className="relative bg-navy-900 py-16 md:py-24 overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-10 right-10 w-64 h-64 bg-gold-500 rounded-full blur-3xl" />
        </div>
        <div className="relative max-w-5xl mx-auto px-4 text-center">
          <div className="w-16 h-16 bg-gold-500/20 rounded-2xl flex items-center justify-center mx-auto mb-6">
            <Newspaper size={32} className="text-gold-500" />
          </div>
          <h1 className="text-3xl md:text-5xl font-tajawal font-bold text-white mb-4">الأخبار القانونية</h1>
          <div className="w-16 h-1 bg-gold-500 mx-auto rounded mb-5" />
          <p className="text-gray-300 font-cairo text-lg max-w-2xl mx-auto leading-relaxed">
            آخر الأخبار والمستجدات القانونية من مصر والإمارات — تحديث مباشر
          </p>
          {lastUpdated && (
            <p className="text-gray-500 font-cairo text-xs mt-4 flex items-center justify-center gap-1.5">
              <RefreshCw size={11} className="animate-spin" style={{ animationDuration: '4s' }} />
              آخر تحديث: {lastUpdated.toLocaleTimeString('ar-EG')}
            </p>
          )}
        </div>
      </section>

      {/* Filter Bar */}
      <section className="bg-white border-b border-gray-100 sticky top-[104px] z-30">
        <div className="max-w-5xl mx-auto px-4 py-3 flex items-center gap-3 overflow-x-auto">
          <Filter size={16} className="text-gray-400 flex-shrink-0" />
          {[
            { key: 'all', label: 'جميع الأخبار' },
            { key: 'eg', label: '🇪🇬 أخبار مصر' },
            { key: 'ae', label: '🇦🇪 أخبار الإمارات' },
          ].map((f) => (
            <button
              key={f.key}
              onClick={() => setFilter(f.key)}
              className={`px-4 py-1.5 rounded-full text-sm font-cairo font-medium transition-all whitespace-nowrap ${
                filter === f.key
                  ? 'bg-navy-900 text-white shadow-sm'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              {f.label}
            </button>
          ))}
          <span className="text-gray-300 text-xs font-cairo mr-auto flex-shrink-0">
            {filteredArticles.length} خبر
          </span>
        </div>
      </section>

      {/* Content */}
      <section className="py-10 bg-gray-50 min-h-[60vh]">
        <div className="max-w-5xl mx-auto px-4">
          {loading && (
            <div className="flex flex-col items-center justify-center py-20">
              <Loader2 size={36} className="text-gold-500 animate-spin mb-4" />
              <p className="text-gray-500 font-cairo">جاري تحميل الأخبار...</p>
            </div>
          )}

          {!loading && error && (
            <div className="flex flex-col items-center justify-center py-20 text-center">
              <AlertCircle size={40} className="text-red-400 mb-4" />
              <p className="text-gray-600 font-cairo mb-4">{error}</p>
              <button onClick={() => loadArticles(true)} className="px-6 py-2.5 bg-gold-500 text-white font-bold rounded-lg hover:bg-gold-600 transition-colors font-cairo">
                إعادة المحاولة
              </button>
            </div>
          )}

          {!loading && !error && (
            <div className="space-y-8">
              {/* Featured (first article) */}
              {filteredArticles.length > 0 && (
                <Link to="/blog/article" state={{ article: filteredArticles[0] }} className="block group">
                  <div className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-lg transition-all grid grid-cols-1 md:grid-cols-2">
                    <div className="h-64 md:h-80 overflow-hidden relative">
                      <img
                        src={filteredArticles[0].image}
                        alt={filteredArticles[0].title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        onError={(e) => { e.target.src = 'https://images.unsplash.com/photo-1589829545856-d10d557cf95f?w=600&h=400&fit=crop' }}
                      />
                      {/* Live badge */}
                      <span className="absolute top-4 right-4 bg-red-500 text-white text-[10px] font-bold font-cairo px-2.5 py-1 rounded-md flex items-center gap-1.5">
                        <span className="w-1.5 h-1.5 bg-white rounded-full animate-pulse" />
                        مباشر
                      </span>
                    </div>
                    <div className="p-6 md:p-8 flex flex-col justify-center">
                      <div className="flex items-center gap-2 mb-3">
                        {filteredArticles[0].source?.name && (
                          <span className="bg-gold-100 text-gold-700 text-xs font-cairo px-3 py-1 rounded-md">{filteredArticles[0].source.name}</span>
                        )}
                        <span className="text-xs font-cairo text-gray-400">
                          {getCountry(filteredArticles[0]) === 'ae' ? '🇦🇪' : '🇪🇬'}
                        </span>
                      </div>
                      <h2 className="text-xl md:text-2xl font-tajawal font-bold text-navy-900 mb-3 leading-relaxed group-hover:text-gold-500 transition-colors">
                        {filteredArticles[0].title}
                      </h2>
                      <p className="text-gray-500 font-cairo text-sm leading-relaxed mb-4 line-clamp-3">{filteredArticles[0].description}</p>
                      <div className="flex items-center gap-3 text-gray-400 text-xs font-cairo">
                        <span className="flex items-center gap-1">
                          <Clock size={12} />
                          {timeAgo(filteredArticles[0].publishedAt)}
                        </span>
                        <span>•</span>
                        <span>{formatDate(filteredArticles[0].publishedAt)}</span>
                      </div>
                    </div>
                  </div>
                </Link>
              )}

              {/* Rest of articles */}
              {filteredArticles.length > 1 && (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {filteredArticles.slice(1).map((article, i) => (
                    <Link key={i} to="/blog/article" state={{ article }} className="block group bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-md hover:-translate-y-1 transition-all">
                      <div className="h-44 overflow-hidden relative">
                        <img
                          src={article.image}
                          alt={article.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                          onError={(e) => { e.target.src = 'https://images.unsplash.com/photo-1589829545856-d10d557cf95f?w=600&h=400&fit=crop' }}
                        />
                        <span className="absolute top-3 left-3 text-sm">
                          {getCountry(article) === 'ae' ? '🇦🇪' : '🇪🇬'}
                        </span>
                      </div>
                      <div className="p-5">
                        {article.source?.name && (
                          <span className="text-[11px] font-cairo text-gold-600 bg-gold-50 px-2 py-0.5 rounded">{article.source.name}</span>
                        )}
                        <h3 className="text-base font-tajawal font-bold text-navy-900 mt-2 mb-2 line-clamp-2 leading-relaxed group-hover:text-gold-500 transition-colors">
                          {article.title}
                        </h3>
                        <p className="text-gray-500 font-cairo text-sm line-clamp-2 mb-3">{article.description}</p>
                        <div className="flex items-center justify-between">
                          <span className="flex items-center gap-1 text-gray-400 text-xs font-cairo">
                            <Clock size={11} /> {timeAgo(article.publishedAt)}
                          </span>
                          <span className="text-gold-500 font-bold text-xs font-cairo">اقرأ المزيد ←</span>
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
              )}

              {filteredArticles.length === 0 && (
                <div className="text-center py-16 bg-white rounded-xl">
                  <p className="text-gray-400 font-cairo text-lg mb-2">لا توجد أخبار لهذا الفلتر</p>
                  <button onClick={() => setFilter('all')} className="text-gold-500 font-cairo text-sm font-bold hover:underline">عرض جميع الأخبار</button>
                </div>
              )}
            </div>
          )}
        </div>
      </section>
    </div>
  )
}
