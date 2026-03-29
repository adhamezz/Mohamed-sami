// Open Library API Service for Arabic Legal Books
// Fetches real legal books freely with no rate limits

const SEARCH_URL = 'https://openlibrary.org/search.json'
const COVERS_URL = 'https://covers.openlibrary.org/b/id'

const LEGAL_SEARCHES = [
  { q: 'القانون المدني', cat: 'القانون المدني' },
  { q: 'قانون العقوبات', cat: 'القانون الجنائي' },
  { q: 'المرافعات المدنية', cat: 'قانون المرافعات' },
  { q: 'القانون التجاري', cat: 'القانون التجاري' },
  { q: 'الأحوال الشخصية', cat: 'الأحوال الشخصية' },
  { q: 'القانون الإداري', cat: 'القانون الإداري' },
  { q: 'القانون الدستوري', cat: 'القانون الدستوري' },
  { q: 'الفقه الإسلامي', cat: 'الفقه الإسلامي' },
  { q: 'قانون العمل', cat: 'قانون العمل' },
  { q: 'القانون الدولي', cat: 'القانون الدولي' },
  { q: 'التحكيم التجاري', cat: 'التحكيم' },
  { q: 'الملكية الفكرية', cat: 'الملكية الفكرية' },
]

const CACHE_KEY = 'legal_books_ol_cache'
const CACHE_DURATION = 1000 * 60 * 60 * 6 // 6 hours

function mapBook(doc, category) {
  const coverId = doc.cover_i
  const thumbnail = coverId ? `${COVERS_URL}/${coverId}-M.jpg` : ''
  const workKey = doc.key // e.g. /works/OL12345W

  return {
    id: workKey?.replace('/works/', '') || doc.edition_key?.[0] || String(Math.random()).slice(2, 10),
    title: doc.title || 'بدون عنوان',
    author: doc.author_name?.join('، ') || 'غير معروف',
    category,
    year: doc.first_publish_year ? String(doc.first_publish_year) : '',
    pages: doc.number_of_pages_median || 0,
    rating: doc.ratings_average ? Math.min(5, Math.round(doc.ratings_average)) : 4,
    description: doc.subtitle || (doc.subject?.slice(0, 3).join(' — ')) || 'كتاب قانوني متخصص في ' + category,
    format: 'PDF',
    size: doc.number_of_pages_median ? `${Math.round(doc.number_of_pages_median * 0.04)} MB` : '',
    thumbnail,
    previewLink: doc.ia?.[0] ? `https://archive.org/details/${doc.ia[0]}` : '',
    infoLink: workKey ? `https://openlibrary.org${workKey}` : '',
    readerUrl: doc.ia?.[0] ? `https://archive.org/embed/${doc.ia[0]}` : '',
    canPreview: !!doc.ia?.[0],
    downloadLink: doc.ia?.[0] ? `https://archive.org/download/${doc.ia[0]}` : '',
    publisher: doc.publisher?.slice(0, 2).join('، ') || '',
    language: 'ar',
  }
}

export async function fetchAllLegalBooks() {
  // Check sessionStorage cache
  try {
    const cached = sessionStorage.getItem(CACHE_KEY)
    if (cached) {
      const { data, timestamp } = JSON.parse(cached)
      if (Date.now() - timestamp < CACHE_DURATION && data.length > 0) return data
    }
  } catch { /* ignore */ }

  const allBooks = []
  const batchSize = 3

  for (let i = 0; i < LEGAL_SEARCHES.length; i += batchSize) {
    const batch = LEGAL_SEARCHES.slice(i, i + batchSize)
    const results = await Promise.allSettled(
      batch.map(async ({ q, cat }) => {
        const params = new URLSearchParams({ q, limit: '8', fields: 'key,title,author_name,cover_i,first_publish_year,number_of_pages_median,subject,subtitle,publisher,ia,edition_key,ratings_average' })
        const res = await fetch(`${SEARCH_URL}?${params}`)
        if (!res.ok) throw new Error(res.statusText)
        const data = await res.json()
        return (data.docs || []).map(doc => mapBook(doc, cat))
      })
    )
    results
      .filter(r => r.status === 'fulfilled')
      .forEach(r => allBooks.push(...r.value))
  }

  // Deduplicate by id
  const seen = new Set()
  const unique = allBooks.filter(b => {
    if (seen.has(b.id)) return false
    seen.add(b.id)
    return true
  })

  // Cache results
  try {
    sessionStorage.setItem(CACHE_KEY, JSON.stringify({ data: unique, timestamp: Date.now() }))
  } catch { /* ignore */ }

  return unique
}

export async function fetchBookById(id) {
  // Check cache first
  try {
    const cached = sessionStorage.getItem(CACHE_KEY)
    if (cached) {
      const { data } = JSON.parse(cached)
      const found = data.find(b => b.id === id)
      if (found) return found
    }
  } catch { /* ignore */ }

  // Fetch from Open Library works API
  const res = await fetch(`https://openlibrary.org/works/${encodeURIComponent(id)}.json`)
  if (!res.ok) throw new Error('الكتاب غير موجود')
  const work = await res.json()

  // Get editions for more details
  let editionData = {}
  try {
    const edRes = await fetch(`https://openlibrary.org/works/${encodeURIComponent(id)}/editions.json?limit=1`)
    if (edRes.ok) {
      const ed = await edRes.json()
      editionData = ed.entries?.[0] || {}
    }
  } catch { /* ignore */ }

  const coverId = work.covers?.[0] || editionData.covers?.[0]
  const iaId = editionData.ocaid || editionData.ia_loaded_id?.[0]

  return {
    id,
    title: work.title || 'بدون عنوان',
    author: 'غير معروف',
    category: work.subjects?.find(s => s.includes('قانون') || s.includes('Law')) || 'قانون',
    year: editionData.publish_date || '',
    pages: editionData.number_of_pages || 0,
    rating: 4,
    description: typeof work.description === 'string' ? work.description : work.description?.value || 'كتاب قانوني',
    format: 'PDF',
    size: editionData.number_of_pages ? `${Math.round(editionData.number_of_pages * 0.04)} MB` : '',
    thumbnail: coverId ? `${COVERS_URL}/${coverId}-M.jpg` : '',
    previewLink: iaId ? `https://archive.org/details/${iaId}` : '',
    infoLink: `https://openlibrary.org/works/${id}`,
    readerUrl: iaId ? `https://archive.org/embed/${iaId}` : '',
    canPreview: !!iaId,
    downloadLink: iaId ? `https://archive.org/download/${iaId}` : '',
    publisher: editionData.publishers?.join('، ') || '',
    language: 'ar',
  }
}
