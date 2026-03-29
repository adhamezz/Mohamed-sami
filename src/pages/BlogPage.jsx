import { useState, useEffect, useCallback } from 'react'
import { Loader2, RefreshCw, AlertCircle } from 'lucide-react'
import { fetchNewsArticles } from '../services/newsApi'
import ArticleCard from '../components/Blog/ArticleCard'
import BlogSidebar from '../components/Blog/BlogSidebar'
import SEO from '../components/SEO'

const REFRESH_INTERVAL = 60000 // 60 seconds

export default function BlogPage() {
  const [articles, setArticles] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [searchQuery, setSearchQuery] = useState('')
  const [lastUpdated, setLastUpdated] = useState(null)

  const loadArticles = useCallback(async (showLoader = false) => {
    if (showLoader) setLoading(true)
    setError(null)
    try {
      const data = await fetchNewsArticles()
      setArticles(data)
      setLastUpdated(new Date())
    } catch {
      setError('فشل في تحميل المقالات. يرجى المحاولة مرة أخرى.')
    } finally {
      setLoading(false)
    }
  }, [])

  // Initial load + auto-refresh every 60s
  useEffect(() => {
    loadArticles(true)
    const interval = setInterval(() => loadArticles(false), REFRESH_INTERVAL)
    return () => clearInterval(interval)
  }, [loadArticles])

  // Filter articles by search query
  const filteredArticles = articles.filter((article) => {
    if (!searchQuery.trim()) return true
    const q = searchQuery.trim().toLowerCase()
    return (
      article.title.toLowerCase().includes(q) ||
      (article.description && article.description.toLowerCase().includes(q))
    )
  })

  return (
    <div style={{ direction: 'rtl' }}>
      <SEO title="المدونة القانونية" description="مقالات وأخبار قانونية متجددة — آخر المستجدات القانونية والتشريعية في مصر والإمارات والكويت." path="/blog" />
      {/* Page Header */}
      <section className="bg-navy-900 py-14 md:py-18 text-center">
        <h1 className="text-3xl md:text-5xl font-tajawal font-bold text-white mb-3">
          المدونة القانونية
        </h1>
        <div className="w-14 h-1 bg-gold-500 mx-auto rounded mb-4" />
        <p className="text-gray-300 font-cairo text-base md:text-lg max-w-lg mx-auto px-4">
          آخر الأخبار والمقالات القانونية — يتم التحديث تلقائيًا
        </p>
        {lastUpdated && (
          <p className="text-gray-500 font-cairo text-xs mt-3 flex items-center justify-center gap-1.5">
            <RefreshCw size={11} />
            آخر تحديث: {lastUpdated.toLocaleTimeString('ar-EG')}
          </p>
        )}
      </section>

      {/* Main Content */}
      <section className="bg-gray-50 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

          {/* Loading State */}
          {loading && (
            <div className="flex flex-col items-center justify-center py-24">
              <Loader2 size={36} className="text-gold-500 animate-spin mb-4" />
              <p className="text-gray-500 font-cairo">جاري تحميل المقالات...</p>
            </div>
          )}

          {/* Error State */}
          {!loading && error && (
            <div className="flex flex-col items-center justify-center py-24 text-center">
              <AlertCircle size={40} className="text-red-400 mb-4" />
              <p className="text-gray-600 font-cairo mb-4">{error}</p>
              <button
                onClick={() => loadArticles(true)}
                className="px-6 py-2.5 bg-gold-500 text-white font-bold rounded-lg hover:bg-gold-600 transition-colors font-cairo"
              >
                إعادة المحاولة
              </button>
            </div>
          )}

          {/* Content: Grid + Sidebar */}
          {!loading && !error && (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Main Articles Grid — Right (2/3) */}
              <div className="lg:col-span-2">
                {/* Results info */}
                {searchQuery && (
                  <p className="text-gray-500 font-cairo text-sm mb-4">
                    نتائج البحث عن "<span className="font-bold text-navy-900">{searchQuery}</span>" — {filteredArticles.length} مقال
                  </p>
                )}

                {filteredArticles.length > 0 ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {filteredArticles.map((article, index) => (
                      <ArticleCard key={index} article={article} />
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-16 bg-white rounded-xl">
                    <p className="text-gray-400 font-cairo text-lg mb-2">لا توجد مقالات مطابقة</p>
                    <p className="text-gray-300 font-cairo text-sm">جرّب كلمات بحث مختلفة</p>
                  </div>
                )}
              </div>

              {/* Sidebar — Left (1/3) */}
              <div className="lg:col-span-1">
                <BlogSidebar
                  articles={articles}
                  searchQuery={searchQuery}
                  onSearchChange={setSearchQuery}
                />
              </div>
            </div>
          )}
        </div>
      </section>
    </div>
  )
}
