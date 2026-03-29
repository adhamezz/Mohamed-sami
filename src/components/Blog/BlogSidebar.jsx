import { Link } from 'react-router-dom'
import { Search, Clock } from 'lucide-react'
import { formatDate } from '../../utils/formatDate'

const BlogSidebar = ({ articles, searchQuery, onSearchChange }) => {
  // Show latest 5 articles in sidebar
  const latestArticles = articles.slice(0, 5)

  return (
    <aside className="space-y-6">
      {/* Search Box */}
      <div className="bg-white rounded-xl shadow-sm p-5">
        <h3 className="text-base font-tajawal font-bold text-navy-900 mb-3">بحث في المقالات</h3>
        <div className="relative">
          <Search size={16} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder="ابحث عن مقال..."
            className="w-full pr-10 pl-4 py-2.5 border border-gray-200 rounded-lg text-sm font-cairo focus:outline-none focus:border-gold-500 focus:ring-1 focus:ring-gold-500 transition-colors"
          />
        </div>
      </div>

      {/* Latest Articles */}
      <div className="bg-white rounded-xl shadow-sm p-5">
        <h3 className="text-base font-tajawal font-bold text-navy-900 mb-4">أحدث المقالات</h3>
        <div className="space-y-4">
          {latestArticles.map((article, i) => (
            <Link
              key={i}
              to="/blog/article"
              state={{ article }}
              className="flex gap-3 group"
            >
              <div className="w-16 h-16 rounded-lg overflow-hidden flex-shrink-0 bg-gray-100">
                <img
                  src={article.image}
                  alt={article.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                  loading="lazy"
                  onError={(e) => {
                    e.target.src = 'https://images.unsplash.com/photo-1589829545856-d10d557cf95f?w=200&h=200&fit=crop'
                  }}
                />
              </div>
              <div className="flex-1 min-w-0">
                <h4 className="text-sm font-tajawal font-bold text-navy-900 line-clamp-2 leading-relaxed group-hover:text-gold-500 transition-colors">
                  {article.title}
                </h4>
                {article.publishedAt && (
                  <div className="flex items-center gap-1 text-gray-400 text-xs font-cairo mt-1">
                    <Clock size={10} />
                    <span>{formatDate(article.publishedAt)}</span>
                  </div>
                )}
              </div>
            </Link>
          ))}
        </div>
      </div>

      {/* Categories */}
      <div className="bg-white rounded-xl shadow-sm p-5">
        <h3 className="text-base font-tajawal font-bold text-navy-900 mb-3">التصنيفات</h3>
        <div className="flex flex-wrap gap-2">
          {['قانون جنائي', 'أحوال شخصية', 'قانون تجاري', 'قانون عمل', 'عقارات', 'شركات'].map((cat) => (
            <span
              key={cat}
              className="text-xs font-cairo bg-navy-50 text-navy-700 px-3 py-1.5 rounded-full hover:bg-gold-50 hover:text-gold-600 cursor-pointer transition-colors"
            >
              {cat}
            </span>
          ))}
        </div>
      </div>
    </aside>
  )
}

export default BlogSidebar
