import { useSearchParams, Link } from 'react-router-dom'
import { useState, useEffect } from 'react'
import { Search, ArrowLeft } from 'lucide-react'
import { searchSite } from '../data/searchData'

const categoryColors = {
  'خدمات': 'bg-blue-100 text-blue-700',
  'مقالات': 'bg-green-100 text-green-700',
  'أخبار': 'bg-amber-100 text-amber-700',
  'مكتبة': 'bg-purple-100 text-purple-700',
  'عني': 'bg-navy-100 text-navy-700',
  'تواصل': 'bg-gold-100 text-gold-700',
}

export default function SearchResultsPage() {
  const [searchParams] = useSearchParams()
  const query = searchParams.get('q') || ''
  const [results, setResults] = useState([])
  const [localQuery, setLocalQuery] = useState(query)

  useEffect(() => {
    setLocalQuery(query)
    if (query) {
      setResults(searchSite(query))
    } else {
      setResults([])
    }
  }, [query])

  const handleSearch = (e) => {
    e.preventDefault()
    if (localQuery.trim()) {
      const url = new URL(window.location)
      url.pathname = '/search'
      url.searchParams.set('q', localQuery.trim())
      window.history.pushState({}, '', url)
      setResults(searchSite(localQuery.trim()))
    }
  }

  const highlightMatch = (text, q) => {
    if (!q || !q.trim()) return text
    const words = q.trim().split(/\s+/).filter(w => w.length >= 2)
    if (words.length === 0) return text
    const pattern = new RegExp(`(${words.map(w => w.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')).join('|')})`, 'gi')
    const parts = text.split(pattern)
    return parts.map((part, i) =>
      pattern.test(part)
        ? <mark key={i} className="bg-gold-200 text-navy-900 px-0.5 rounded">{part}</mark>
        : part
    )
  }

  return (
    <div className="min-h-screen bg-gray-50" style={{ direction: 'rtl' }}>
      {/* Header */}
      <div className="bg-navy-900 py-12">
        <div className="max-w-3xl mx-auto px-4">
          <h1 className="text-2xl md:text-3xl font-tajawal font-bold text-white mb-6 text-center">
            البحث في الموقع
          </h1>
          <form onSubmit={handleSearch} className="flex items-center gap-3">
            <input
              type="text"
              value={localQuery}
              onChange={(e) => setLocalQuery(e.target.value)}
              placeholder="اكتب كلمة البحث..."
              className="flex-1 px-5 py-3.5 rounded-lg text-navy-800 font-cairo text-base focus:outline-none focus:ring-2 focus:ring-gold-500 border-0"
            />
            <button
              type="submit"
              className="px-6 py-3.5 bg-gold-500 text-white rounded-lg font-bold hover:bg-gold-600 transition-colors duration-200 flex items-center gap-2"
            >
              <Search size={18} />
              <span className="hidden sm:inline">بحث</span>
            </button>
          </form>
        </div>
      </div>

      {/* Results */}
      <div className="max-w-3xl mx-auto px-4 py-10">
        {query && (
          <p className="text-gray-500 font-cairo mb-6">
            نتائج البحث عن: <span className="font-bold text-navy-900">"{query}"</span>
            {' '} — {results.length} {results.length === 1 ? 'نتيجة' : 'نتائج'}
          </p>
        )}

        {!query && (
          <p className="text-center text-gray-400 font-cairo text-lg py-16">
            اكتب كلمة للبحث في محتوى الموقع
          </p>
        )}

        {query && results.length === 0 && (
          <div className="text-center py-16">
            <div className="text-6xl mb-4">🔍</div>
            <p className="text-gray-500 font-cairo text-lg mb-2">لا توجد نتائج لـ "{query}"</p>
            <p className="text-gray-400 font-cairo text-sm">جرّب كلمات مختلفة أو أقصر</p>
          </div>
        )}

        <div className="space-y-4">
          {results.map((item, index) => (
            <Link
              key={index}
              to={item.path}
              className="block bg-white rounded-lg shadow-sm hover:shadow-md border border-gray-100 p-5 transition-all duration-200 group"
            >
              <div className="flex items-start gap-4">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <span className={`text-xs font-bold px-2.5 py-1 rounded-full ${categoryColors[item.category] || 'bg-gray-100 text-gray-600'}`}>
                      {item.category}
                    </span>
                  </div>
                  <h3 className="text-lg font-tajawal font-bold text-navy-900 mb-1.5 group-hover:text-gold-500 transition-colors">
                    {highlightMatch(item.title, query)}
                  </h3>
                  <p className="text-gray-500 font-cairo text-sm leading-relaxed line-clamp-2">
                    {highlightMatch(item.content, query)}
                  </p>
                </div>
                <ArrowLeft size={18} className="text-gray-300 group-hover:text-gold-500 mt-2 transition-colors flex-shrink-0" />
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
}
