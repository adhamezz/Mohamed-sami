import { useState, useEffect, useMemo } from 'react'
import { Link } from 'react-router-dom'
import { BookOpen, Search, Download, Star, ArrowRight, ChevronLeft, ChevronRight, Tag, TrendingUp, BookMarked, Loader2, RefreshCw } from 'lucide-react'
import { fetchAllLegalBooks } from '../../services/booksApi'

const ALL_CATEGORIES = ['الكل', 'القانون المدني', 'القانون الجنائي', 'قانون المرافعات', 'القانون التجاري', 'الأحوال الشخصية', 'القانون الإداري', 'القانون الدستوري', 'الفقه الإسلامي', 'قانون العمل', 'القانون الدولي', 'التحكيم', 'الملكية الفكرية']

const BOOKS_PER_PAGE = 6

export default function LegalBooksPage() {
  const [books, setBooks] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [search, setSearch] = useState('')
  const [activeCategory, setActiveCategory] = useState('الكل')
  const [currentPage, setCurrentPage] = useState(1)

  const loadBooks = async () => {
    setLoading(true)
    setError(null)
    try {
      const data = await fetchAllLegalBooks()
      setBooks(data)
    } catch (err) {
      setError('حدث خطأ في تحميل الكتب. يرجى المحاولة مرة أخرى.')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => { loadBooks() }, [])

  const filtered = useMemo(() => books.filter(b => {
    const matchSearch = !search || b.title.includes(search) || b.author.includes(search) || b.description.includes(search)
    const matchCat = activeCategory === 'الكل' || b.category === activeCategory
    return matchSearch && matchCat
  }), [search, activeCategory, books])

  const totalPages = Math.ceil(filtered.length / BOOKS_PER_PAGE)
  const paginatedBooks = filtered.slice((currentPage - 1) * BOOKS_PER_PAGE, currentPage * BOOKS_PER_PAGE)

  const handleCategoryChange = (cat) => {
    setActiveCategory(cat)
    setCurrentPage(1)
  }
  const handleSearchChange = (val) => {
    setSearch(val)
    setCurrentPage(1)
  }

  const categoryCounts = useMemo(() => {
    const counts = {}
    books.forEach(b => { counts[b.category] = (counts[b.category] || 0) + 1 })
    return counts
  }, [books])

  const topRated = useMemo(() =>
    [...books].sort((a, b) => b.rating - a.rating).slice(0, 5),
    [books]
  )

  const handleDownload = (book) => {
    const url = book.downloadLink || book.previewLink || book.infoLink
    if (url) {
      const a = document.createElement('a')
      a.href = url
      a.target = '_blank'
      a.rel = 'noopener noreferrer'
      document.body.appendChild(a)
      a.click()
      document.body.removeChild(a)
    }
  }

  return (
    <div style={{ direction: 'rtl' }}>
      {/* Hero */}
      <section className="relative bg-navy-900 py-14 md:py-20 overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-10 right-10 w-64 h-64 bg-gold-500 rounded-full blur-3xl" />
        </div>
        <div className="relative max-w-5xl mx-auto px-4 text-center">
          <div className="w-14 h-14 bg-gold-500/20 rounded-2xl flex items-center justify-center mx-auto mb-5">
            <BookOpen size={28} className="text-gold-500" />
          </div>
          <h1 className="text-3xl md:text-5xl font-tajawal font-bold text-white mb-3">كتب قانونية</h1>
          <div className="w-14 h-1 bg-gold-500 mx-auto rounded mb-4" />
          <p className="text-gray-300 font-cairo text-base md:text-lg max-w-2xl mx-auto leading-relaxed">
            مكتبة شاملة من أهم المراجع والكتب القانونية العربية — {books.length} كتاب حقيقي من Google Books
          </p>
          <Link to="/library" className="inline-flex items-center gap-2 mt-5 text-gold-400 hover:text-gold-300 font-cairo text-sm transition-colors">
            <ArrowRight size={14} /> العودة للمكتبة القانونية
          </Link>
        </div>
      </section>

      {/* Main Content */}
      <section className="bg-gray-50 py-10 min-h-[80vh]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

          {/* Loading State */}
          {loading && (
            <div className="text-center py-20">
              <Loader2 size={48} className="text-gold-500 mx-auto mb-4 animate-spin" />
              <p className="text-gray-500 font-cairo text-lg">جاري تحميل الكتب القانونية...</p>
              <p className="text-gray-400 font-cairo text-sm mt-1">يتم جلب الكتب من Google Books API</p>
            </div>
          )}

          {/* Error State */}
          {error && !loading && (
            <div className="text-center py-20">
              <BookOpen size={48} className="text-red-300 mx-auto mb-4" />
              <p className="text-red-500 font-cairo text-lg mb-4">{error}</p>
              <button onClick={loadBooks} className="inline-flex items-center gap-2 bg-gold-500 text-white font-cairo font-bold px-6 py-3 rounded-lg hover:bg-gold-600 transition-colors">
                <RefreshCw size={16} /> إعادة المحاولة
              </button>
            </div>
          )}

          {/* Content */}
          {!loading && !error && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

            {/* ===== Books Grid (Right 2/3) ===== */}
            <div className="lg:col-span-2">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-lg font-tajawal font-bold text-navy-900">
                  {filtered.length} كتاب {activeCategory !== 'الكل' ? `في ${activeCategory}` : 'متاح'}
                </h2>
                <span className="text-xs font-cairo text-gray-400">
                  صفحة {currentPage} من {totalPages || 1}
                </span>
              </div>

              {paginatedBooks.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  {paginatedBooks.map(book => (
                    <div key={book.id} className="bg-white rounded-xl shadow-sm hover:shadow-md transition-all duration-300 hover:-translate-y-1 overflow-hidden group">
                      <div className="h-2 bg-gradient-to-l from-gold-500 to-gold-600" />
                      <div className="p-5">
                        <div className="flex gap-3">
                          {/* Book Thumbnail */}
                          <Link to={`/library/legal-books/${book.id}`} className="flex-shrink-0">
                            {book.thumbnail ? (
                              <img src={book.thumbnail} alt={book.title} className="w-16 h-22 object-cover rounded-lg shadow-sm" />
                            ) : (
                              <div className="w-16 h-22 bg-navy-50 rounded-lg flex items-center justify-center">
                                <BookOpen size={20} className="text-navy-400" />
                              </div>
                            )}
                          </Link>
                          <div className="flex-1 min-w-0">
                            <div className="flex items-start justify-between mb-1">
                              <span className="text-[10px] font-cairo bg-navy-50 text-navy-700 px-2 py-0.5 rounded">{book.category}</span>
                              <div className="flex gap-0.5">
                                {Array.from({ length: book.rating }).map((_, i) => (
                                  <Star key={i} size={10} className="text-gold-500 fill-gold-500" />
                                ))}
                              </div>
                            </div>
                            <Link to={`/library/legal-books/${book.id}`}>
                              <h3 className="text-sm font-tajawal font-bold text-navy-900 mb-1 group-hover:text-gold-500 transition-colors leading-relaxed line-clamp-2">{book.title}</h3>
                            </Link>
                            <p className="text-gold-600 font-cairo text-xs mb-1">{book.author}</p>
                            <p className="text-gray-500 font-cairo text-[11px] leading-relaxed line-clamp-2">{book.description}</p>
                          </div>
                        </div>
                        <div className="flex items-center justify-between pt-3 mt-3 border-t border-gray-100">
                          <div className="flex gap-3 text-[10px] text-gray-400 font-cairo">
                            {book.pages > 0 && <span>{book.pages} صفحة</span>}
                            {book.year && <span>{book.year}</span>}
                            <span className="bg-red-50 text-red-600 px-1.5 py-0.5 rounded">{book.format}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <Link
                              to={`/library/legal-books/${book.id}`}
                              className="flex items-center gap-1 bg-navy-900 hover:bg-navy-800 text-white font-cairo text-[11px] font-bold px-3 py-1.5 rounded-lg transition-colors"
                            >
                              <BookOpen size={12} /> اقرأ المزيد
                            </Link>
                            <button
                              onClick={() => handleDownload(book)}
                              className="flex items-center gap-1 bg-gold-500 hover:bg-gold-600 text-white font-cairo text-[11px] font-bold px-3 py-1.5 rounded-lg transition-colors"
                            >
                              <Download size={12} /> تحميل
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-16 bg-white rounded-xl">
                  <BookOpen size={48} className="text-gray-300 mx-auto mb-4" />
                  <p className="text-gray-400 font-cairo text-lg mb-2">لا توجد نتائج لبحثك</p>
                  <button onClick={() => { setSearch(''); setActiveCategory('الكل'); setCurrentPage(1) }} className="text-gold-500 font-cairo text-sm font-bold hover:underline">عرض جميع الكتب</button>
                </div>
              )}

              {/* ===== Pagination ===== */}
              {totalPages > 1 && (
                <div className="flex items-center justify-center gap-1.5 mt-8">
                  <button
                    onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                    disabled={currentPage === 1}
                    className="w-9 h-9 rounded-lg flex items-center justify-center border border-gray-200 text-gray-500 hover:bg-gold-50 hover:border-gold-300 hover:text-gold-600 disabled:opacity-30 disabled:cursor-not-allowed transition-all"
                  >
                    <ChevronRight size={16} />
                  </button>

                  {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
                    <button
                      key={page}
                      onClick={() => { setCurrentPage(page); window.scrollTo({ top: 400, behavior: 'smooth' }) }}
                      className={`w-9 h-9 rounded-lg flex items-center justify-center font-cairo text-sm font-bold transition-all ${
                        currentPage === page
                          ? 'bg-navy-900 text-white shadow-sm'
                          : 'border border-gray-200 text-gray-600 hover:bg-gold-50 hover:border-gold-300 hover:text-gold-600'
                      }`}
                    >
                      {page}
                    </button>
                  ))}

                  <button
                    onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                    disabled={currentPage === totalPages}
                    className="w-9 h-9 rounded-lg flex items-center justify-center border border-gray-200 text-gray-500 hover:bg-gold-50 hover:border-gold-300 hover:text-gold-600 disabled:opacity-30 disabled:cursor-not-allowed transition-all"
                  >
                    <ChevronLeft size={16} />
                  </button>
                </div>
              )}
            </div>

            {/* ===== Sidebar (Left 1/3) ===== */}
            <div className="lg:col-span-1">
              <aside className="space-y-6">

                {/* Search */}
                <div className="bg-white rounded-xl shadow-sm p-5">
                  <h3 className="text-base font-tajawal font-bold text-navy-900 mb-3">بحث في الكتب</h3>
                  <div className="relative">
                    <Search size={16} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400" />
                    <input
                      type="text"
                      value={search}
                      onChange={e => handleSearchChange(e.target.value)}
                      placeholder="ابحث عن كتاب أو مؤلف..."
                      className="w-full pr-10 pl-4 py-2.5 border border-gray-200 rounded-lg text-sm font-cairo focus:outline-none focus:border-gold-500 focus:ring-1 focus:ring-gold-500 transition-colors"
                    />
                  </div>
                </div>

                {/* Categories */}
                <div className="bg-white rounded-xl shadow-sm p-5">
                  <h3 className="text-base font-tajawal font-bold text-navy-900 mb-3 flex items-center gap-2">
                    <Tag size={14} className="text-gold-500" /> التصنيفات
                  </h3>
                  <div className="space-y-1.5">
                    {ALL_CATEGORIES.map(cat => (
                      <button
                        key={cat}
                        onClick={() => handleCategoryChange(cat)}
                        className={`w-full flex items-center justify-between px-3 py-2 rounded-lg text-sm font-cairo transition-all ${
                          activeCategory === cat
                            ? 'bg-navy-900 text-white'
                            : 'text-gray-600 hover:bg-gray-50'
                        }`}
                      >
                        <span>{cat}</span>
                        <span className={`text-xs ${activeCategory === cat ? 'text-gold-400' : 'text-gray-400'}`}>
                          {cat === 'الكل' ? books.length : categoryCounts[cat] || 0}
                        </span>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Top Rated */}
                <div className="bg-white rounded-xl shadow-sm p-5">
                  <h3 className="text-base font-tajawal font-bold text-navy-900 mb-4 flex items-center gap-2">
                    <TrendingUp size={14} className="text-gold-500" /> الأعلى تقييماً
                  </h3>
                  <div className="space-y-3.5">
                    {topRated.map(book => (
                      <Link to={`/library/legal-books/${book.id}`} key={book.id} className="group">
                        <div className="flex items-start gap-3">
                          <div className="w-10 h-10 bg-navy-50 rounded-lg flex items-center justify-center flex-shrink-0 group-hover:bg-gold-50 transition-colors">
                            <BookMarked size={16} className="text-navy-600 group-hover:text-gold-500 transition-colors" />
                          </div>
                          <div className="flex-1 min-w-0">
                            <h4 className="text-sm font-tajawal font-bold text-navy-900 line-clamp-1 group-hover:text-gold-500 transition-colors">{book.title}</h4>
                            <p className="text-xs font-cairo text-gray-400 mt-0.5">{book.author}</p>
                          </div>
                        </div>
                      </Link>
                    ))}
                  </div>
                </div>

                {/* Stats */}
                <div className="bg-gradient-to-br from-navy-900 to-navy-800 rounded-xl p-5 text-center">
                  <BookOpen size={28} className="text-gold-500 mx-auto mb-3" />
                  <h3 className="text-lg font-tajawal font-bold text-white mb-1">{books.length} كتاب قانوني</h3>
                  <p className="text-gray-400 font-cairo text-xs mb-4">كتب حقيقية من Google Books API</p>
                  <div className="grid grid-cols-2 gap-3">
                    <div className="bg-white/10 rounded-lg py-2">
                      <span className="text-gold-400 font-bold text-lg font-tajawal">{ALL_CATEGORIES.length - 1}</span>
                      <p className="text-gray-400 font-cairo text-[10px]">تصنيف</p>
                    </div>
                    <div className="bg-white/10 rounded-lg py-2">
                      <span className="text-gold-400 font-bold text-lg font-tajawal">API</span>
                      <p className="text-gray-400 font-cairo text-[10px]">مصدر البيانات</p>
                    </div>
                  </div>
                </div>

                {/* CTA */}
                <div className="bg-white rounded-xl shadow-sm p-5 text-center">
                  <h3 className="text-base font-tajawal font-bold text-navy-900 mb-2">تبحث عن كتاب معين؟</h3>
                  <p className="text-gray-500 font-cairo text-xs mb-4">تواصل معنا وسنساعدك في الحصول عليه</p>
                  <Link to="/contact" className="inline-block w-full px-4 py-2.5 bg-gold-500 text-white font-bold font-cairo text-sm rounded-lg hover:bg-gold-600 transition-colors">
                    تواصل معنا
                  </Link>
                </div>
              </aside>
            </div>

          </div>
          )}
        </div>
      </section>
    </div>
  )
}
