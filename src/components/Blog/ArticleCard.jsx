import { Link } from 'react-router-dom'
import { Clock } from 'lucide-react'
import { formatDate } from '../../utils/formatDate'

const ArticleCard = ({ article }) => {
  return (
    <Link
      to="/blog/article"
      state={{ article }}
      className="block bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-300 group"
    >
      {/* Image */}
      <div className="relative h-48 overflow-hidden bg-gray-100">
        <img
          src={article.image}
          alt={article.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          loading="lazy"
          onError={(e) => {
            e.target.src = 'https://images.unsplash.com/photo-1589829545856-d10d557cf95f?w=600&h=400&fit=crop'
          }}
        />
        {article.source?.name && (
          <span className="absolute top-3 right-3 bg-navy-900/80 text-white text-[11px] font-cairo px-2.5 py-1 rounded-md backdrop-blur-sm">
            {article.source.name}
          </span>
        )}
      </div>

      {/* Content */}
      <div className="p-5">
        {/* Date */}
        {article.publishedAt && (
          <div className="flex items-center gap-1.5 text-gray-400 text-xs font-cairo mb-2">
            <Clock size={12} />
            <span>{formatDate(article.publishedAt)}</span>
          </div>
        )}

        {/* Title */}
        <h3 className="text-base font-tajawal font-bold text-navy-900 mb-2 line-clamp-2 leading-relaxed group-hover:text-gold-500 transition-colors">
          {article.title}
        </h3>

        {/* Description */}
        <p className="text-gray-500 font-cairo text-sm leading-relaxed line-clamp-2 mb-4">
          {article.description}
        </p>

        {/* Read more */}
        <span className="text-gold-500 font-bold text-sm font-cairo group-hover:underline">
          اقرأ المزيد ←
        </span>
      </div>
    </Link>
  )
}

export default ArticleCard
