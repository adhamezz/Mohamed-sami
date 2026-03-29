import { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import { BookOpen, Download, ArrowRight, Tag, User, ChevronLeft, Loader2, ThumbsUp, ThumbsDown } from 'lucide-react'
import { fetchBookById, fetchAllLegalBooks } from '../../services/booksApi'

export default function BookDetailPage() {
  const { id } = useParams()
  const [book, setBook] = useState(null)
  const [relatedBooks, setRelatedBooks] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [liked, setLiked] = useState(false)

  useEffect(() => {
    setLoading(true)
    setError(null)
    fetchBookById(id)
      .then(data => {
        setBook(data)
        return fetchAllLegalBooks().then(all => {
          setRelatedBooks(all.filter(b => b.category === data.category && b.id !== data.id).slice(0, 4))
        }).catch(() => {})
      })
      .catch(() => setError('لم يتم العثور على الكتاب'))
      .finally(() => setLoading(false))
  }, [id])

  if (loading) {
    return (
      <div style={{ direction: 'rtl' }} className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <Loader2 size={48} className="text-gold-500 mx-auto mb-4 animate-spin" />
          <p className="text-gray-500 font-cairo text-lg">جاري تحميل بيانات الكتاب...</p>
        </div>
      </div>
    )
  }

  if (error || !book) {
    return (
      <div style={{ direction: 'rtl' }} className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <BookOpen size={64} className="text-gray-300 mx-auto mb-4" />
          <h2 className="text-2xl font-tajawal font-bold text-navy-900 mb-2">الكتاب غير موجود</h2>
          <p className="text-gray-500 font-cairo mb-6">لم يتم العثور على الكتاب المطلوب</p>
          <Link to="/library/legal-books" className="inline-flex items-center gap-2 bg-gold-500 text-white font-cairo font-bold px-6 py-3 rounded-lg hover:bg-gold-600 transition-colors">
            <ArrowRight size={16} /> العودة لمكتبة الكتب
          </Link>
        </div>
      </div>
    )
  }

  const downloadUrl = book.downloadLink || book.previewLink || book.infoLink

  return (
    <div style={{ direction: 'rtl' }}>
      {/* Hero */}
      <section className="relative bg-navy-900 py-10 md:py-14 overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-10 right-10 w-64 h-64 bg-gold-500 rounded-full blur-3xl" />
          <div className="absolute bottom-10 left-20 w-48 h-48 bg-gold-400 rounded-full blur-3xl" />
        </div>
        <div className="relative max-w-4xl mx-auto px-4 text-center">
          <nav className="flex items-center justify-center gap-2 text-sm font-cairo text-gray-400 mb-6">
            <Link to="/" className="hover:text-gold-400 transition-colors">الرئيسية</Link>
            <ChevronLeft size={14} />
            <Link to="/library" className="hover:text-gold-400 transition-colors">المكتبة القانونية</Link>
            <ChevronLeft size={14} />
            <Link to="/library/legal-books" className="hover:text-gold-400 transition-colors">كتب قانونية</Link>
            <ChevronLeft size={14} />
            <span className="text-gold-400">{book.title.length > 40 ? book.title.substring(0, 40) + '...' : book.title}</span>
          </nav>
          <h1 className="text-2xl md:text-4xl font-tajawal font-bold text-white mb-3 leading-relaxed">{book.title}</h1>
          <div className="w-14 h-1 bg-gold-500 mx-auto rounded mb-4" />
          <p className="text-gray-300 font-cairo text-sm md:text-base">
            {book.author} {book.year && `— ${book.year}`}
          </p>
        </div>
      </section>

      {/* Main Content — Single Column like hossamelmowafy.com */}
      <section className="bg-white py-8 min-h-[60vh]">
        <div className="max-w-3xl mx-auto px-4">

          {/* Sidebar-style info on right for desktop */}
          <div className="flex flex-col lg:flex-row gap-8">

            {/* Left sidebar (articles list) */}
            <aside className="hidden lg:block lg:w-64 flex-shrink-0 order-2">
              {relatedBooks.length > 0 && (
                <div className="sticky top-28 space-y-4">
                  <h3 className="text-base font-tajawal font-bold text-navy-900 border-b-2 border-gold-500 pb-2">كتب ذات صلة</h3>
                  <div className="space-y-3">
                    {relatedBooks.map(rb => (
                      <Link
                        key={rb.id}
                        to={`/library/legal-books/${rb.id}`}
                        className="flex items-start gap-3 group"
                      >
                        <div className="w-16 h-20 bg-gray-100 rounded overflow-hidden flex-shrink-0">
                          {rb.thumbnail ? (
                            <img src={rb.thumbnail} alt={rb.title} className="w-full h-full object-cover" />
                          ) : (
                            <div className="w-full h-full bg-navy-50 flex items-center justify-center">
                              <BookOpen size={14} className="text-navy-400" />
                            </div>
                          )}
                        </div>
                        <div className="flex-1 min-w-0 pt-1">
                          <h4 className="text-sm font-tajawal font-bold text-navy-900 line-clamp-2 group-hover:text-gold-600 transition-colors leading-relaxed">{rb.title}</h4>
                        </div>
                      </Link>
                    ))}
                  </div>
                </div>
              )}
            </aside>

            {/* Main content column */}
            <div className="flex-1 order-1">
              {/* Book Cover Image */}
              <div className="mb-6">
                {book.thumbnail ? (
                  <img
                    src={book.thumbnail}
                    alt={book.title}
                    className="mx-auto rounded-lg shadow-md max-h-[400px] object-contain"
                  />
                ) : (
                  <div className="mx-auto max-w-sm bg-gradient-to-br from-navy-900 to-navy-800 rounded-lg p-8 text-center shadow-md">
                    <BookOpen size={56} className="text-gold-500 mx-auto mb-4" />
                    <h3 className="text-white font-tajawal font-bold text-lg leading-relaxed mb-2">{book.title}</h3>
                    <div className="w-12 h-0.5 bg-gold-500 mx-auto rounded mb-3" />
                    <p className="text-gold-400 font-cairo text-sm">{book.author}</p>
                  </div>
                )}
              </div>

              {/* Book Description */}
              <div className="mb-6">
                <p className="text-gray-700 font-cairo text-base leading-loose">{book.description}</p>
              </div>

              {/* Download Button — prominent, centered */}
              {downloadUrl && (
                <div className="text-center mb-8">
                  <a
                    href={downloadUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 bg-navy-900 hover:bg-navy-800 text-white font-cairo font-bold px-8 py-3 rounded-lg transition-colors shadow-md text-lg"
                  >
                    <Download size={20} />
                    للتحميل اضغط هنا
                  </a>
                </div>
              )}

              {/* Embedded Book Reader — always visible */}
              {book.canPreview && book.readerUrl && (
                <div className="mb-6 rounded-lg overflow-hidden border border-gray-200 shadow-sm" style={{ height: '70vh' }}>
                  <iframe
                    src={book.readerUrl}
                    title={book.title}
                    className="w-full h-full"
                    style={{ border: 'none' }}
                    allowFullScreen
                  />
                </div>
              )}

              {/* If no preview, show Open Library link */}
              {!book.canPreview && book.infoLink && (
                <div className="mb-6 text-center bg-gray-50 rounded-lg p-8 border border-gray-200">
                  <BookOpen size={40} className="text-navy-300 mx-auto mb-3" />
                  <p className="text-gray-500 font-cairo mb-4">المعاينة غير متاحة لهذا الكتاب حالياً</p>
                  <a
                    href={book.infoLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-cairo font-bold px-6 py-3 rounded-lg transition-colors"
                  >
                    <BookOpen size={16} /> عرض في Open Library
                  </a>
                </div>
              )}

              {/* Link to source */}
              {book.canPreview && book.previewLink && (
                <div className="text-center mb-6">
                  <a
                    href={book.previewLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm font-cairo text-blue-600 hover:text-blue-800 hover:underline"
                  >
                    {book.title}
                  </a>
                </div>
              )}

              {/* Like / Dislike */}
              <div className="flex items-center gap-4 py-4 border-t border-b border-gray-200 mb-6">
                <button
                  onClick={() => setLiked(!liked)}
                  className={`flex items-center gap-1.5 text-sm font-cairo transition-colors ${liked ? 'text-green-600 font-bold' : 'text-gray-500 hover:text-green-600'}`}
                >
                  <ThumbsUp size={16} /> Like
                </button>
                <button className="flex items-center gap-1.5 text-sm font-cairo text-gray-400 hover:text-red-500 transition-colors">
                  <ThumbsDown size={16} />
                </button>
                <span className="text-xs font-cairo text-gray-400 mr-auto">1</span>
              </div>

              {/* Tags */}
              <div className="flex flex-wrap gap-2 mb-8">
                {[book.category, `أحكام ${book.category}`, `كتب ${book.category}`, 'أحكام محكمة النقض', 'أحكام محكمة النقض'].map((tag, i) => (
                  <Link
                    key={i}
                    to="/library/legal-books"
                    className="text-xs font-cairo bg-navy-900 text-white px-3 py-1.5 rounded hover:bg-gold-600 transition-colors"
                  >
                    #{tag}
                  </Link>
                ))}
              </div>

              {/* Author Section */}
              <div className="bg-gray-50 rounded-xl p-6 mb-8">
                <div className="flex items-center gap-4">
                  <div className="w-16 h-16 bg-gradient-to-br from-navy-900 to-navy-700 rounded-full flex items-center justify-center shadow-lg flex-shrink-0">
                    <User size={28} className="text-gold-500" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-lg font-tajawal font-bold text-navy-900">المستشار محمد سامي</h3>
                    <p className="text-gray-500 font-cairo text-sm leading-relaxed mt-1">
                      مستشار قانوني يقدم محتوى قانوني متخصص في القانون المدني والجنائي والإداري والتجاري.
                    </p>
                  </div>
                </div>
              </div>

              {/* Related on mobile */}
              {relatedBooks.length > 0 && (
                <div className="lg:hidden mb-8">
                  <h3 className="text-lg font-tajawal font-bold text-navy-900 mb-4 border-b-2 border-gold-500 pb-2">كتب ذات صلة</h3>
                  <div className="grid grid-cols-2 gap-3">
                    {relatedBooks.map(rb => (
                      <Link
                        key={rb.id}
                        to={`/library/legal-books/${rb.id}`}
                        className="flex items-start gap-2 group p-2 rounded hover:bg-gray-50"
                      >
                        <div className="w-12 h-14 bg-gray-100 rounded overflow-hidden flex-shrink-0">
                          {rb.thumbnail ? (
                            <img src={rb.thumbnail} alt={rb.title} className="w-full h-full object-cover" />
                          ) : (
                            <div className="w-full h-full bg-navy-50 flex items-center justify-center">
                              <BookOpen size={12} className="text-navy-400" />
                            </div>
                          )}
                        </div>
                        <h4 className="text-xs font-tajawal font-bold text-navy-900 line-clamp-2 group-hover:text-gold-600 transition-colors">{rb.title}</h4>
                      </Link>
                    ))}
                  </div>
                </div>
              )}

              {/* Back to Library */}
              <div className="text-center">
                <Link
                  to="/library/legal-books"
                  className="inline-flex items-center gap-2 bg-gold-500 text-white font-cairo font-bold px-6 py-3 rounded-lg hover:bg-gold-600 transition-colors"
                >
                  <ArrowRight size={16} /> العودة للمكتبة
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
