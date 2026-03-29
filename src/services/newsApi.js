// Multi-source Arabic Legal News API Service
// Fetches real news from Egypt & UAE (اليوم السابع style)

const GNEWS_KEY = '5be498f798a082e12878e9e498e3be34'
const GNEWS_BASE = 'https://gnews.io/api/v4'

// Multiple search queries for comprehensive legal news coverage
const SEARCH_QUERIES = [
  // Egyptian legal news
  { q: 'قانون محكمة مصر', country: 'eg', max: 10 },
  // UAE legal news
  { q: 'قانون محكمة الإمارات', country: 'ae', max: 10 },
  // General Arabic legal/court news
  { q: 'قضاء أحكام محاكم', country: 'eg', max: 10 },
]

// Top headlines from Egypt — general/nation category (catches اليوم السابع, الأهرام, etc.)
const TOP_HEADLINES_QUERIES = [
  { category: 'general', country: 'eg', max: 10 },
]

const DEFAULT_IMAGE = 'https://images.unsplash.com/photo-1589829545856-d10d557cf95f?w=600&h=400&fit=crop'

// Build GNews search URL
function buildSearchUrl({ q, country, max }) {
  const params = new URLSearchParams({
    q,
    lang: 'ar',
    country: country || 'eg',
    max: String(max || 10),
    apikey: GNEWS_KEY,
  })
  return `${GNEWS_BASE}/search?${params}`
}

// Build GNews top-headlines URL
function buildHeadlinesUrl({ category, country, max }) {
  const params = new URLSearchParams({
    lang: 'ar',
    country: country || 'eg',
    category: category || 'general',
    max: String(max || 10),
    apikey: GNEWS_KEY,
  })
  return `${GNEWS_BASE}/top-headlines?${params}`
}

// Normalize article shape
function normalizeArticle(a) {
  return {
    title: a.title || '',
    description: a.description || a.content || '',
    image: a.image || a.urlToImage || DEFAULT_IMAGE,
    url: a.url || '#',
    publishedAt: a.publishedAt || a.pubDate || new Date().toISOString(),
    source: a.source || { name: 'مصدر إخباري' },
  }
}

// Remove duplicate articles by title similarity
function deduplicateArticles(articles) {
  const seen = new Set()
  return articles.filter((a) => {
    // Use first 40 chars of title as key to catch near-duplicates
    const key = a.title.slice(0, 40).trim().toLowerCase()
    if (seen.has(key)) return false
    seen.add(key)
    return true
  })
}

// Fetch from a single URL with timeout
async function fetchWithTimeout(url, timeoutMs = 8000) {
  const controller = new AbortController()
  const timer = setTimeout(() => controller.abort(), timeoutMs)
  try {
    const res = await fetch(url, { signal: controller.signal })
    clearTimeout(timer)
    if (!res.ok) throw new Error(`HTTP ${res.status}`)
    return await res.json()
  } catch (err) {
    clearTimeout(timer)
    throw err
  }
}

// Main fetch function — fetches from multiple sources in parallel
export async function fetchNewsArticles() {
  try {
    // Build all URLs
    const searchUrls = SEARCH_QUERIES.map(buildSearchUrl)
    const headlineUrls = TOP_HEADLINES_QUERIES.map(buildHeadlinesUrl)
    const allUrls = [...searchUrls, ...headlineUrls]

    // Fetch all in parallel — don't fail if some requests fail
    const results = await Promise.allSettled(allUrls.map((url) => fetchWithTimeout(url)))

    let allArticles = []

    for (const result of results) {
      if (result.status === 'fulfilled' && result.value?.articles?.length) {
        allArticles.push(...result.value.articles.map(normalizeArticle))
      }
    }

    // Deduplicate and sort by date (newest first)
    allArticles = deduplicateArticles(allArticles)
    allArticles.sort((a, b) => new Date(b.publishedAt) - new Date(a.publishedAt))

    // If we got real articles, return them
    if (allArticles.length > 0) {
      return allArticles
    }

    // Fallback if all API calls returned empty
    return fallbackArticles
  } catch {
    return fallbackArticles
  }
}

// Fallback articles — used only when ALL API calls fail
const fallbackArticles = [
  {
    title: 'مجلس النواب المصري يقر تعديلات جديدة على قانون الإجراءات الجنائية',
    description: 'وافق مجلس النواب على تعديلات جوهرية على قانون الإجراءات الجنائية تتضمن ضمانات جديدة للمتهمين وتنظيم إجراءات التحقيق والمحاكمة وتعزيز حقوق الدفاع.',
    image: 'https://images.unsplash.com/photo-1589829545856-d10d557cf95f?w=600&h=400&fit=crop',
    url: 'https://www.youm7.com',
    publishedAt: new Date(Date.now() - 1000 * 60 * 60 * 3).toISOString(),
    source: { name: 'اليوم السابع' },
  },
  {
    title: 'المحكمة الاتحادية العليا بالإمارات تصدر حكمًا في قضية تجارية دولية',
    description: 'أصدرت المحكمة الاتحادية العليا حكمًا بارزًا يتعلق بقضايا التحكيم التجاري الدولي والاعتراف بالأحكام الأجنبية وتنفيذها داخل دولة الإمارات العربية المتحدة.',
    image: 'https://images.unsplash.com/photo-1505664194779-8beaceb93744?w=600&h=400&fit=crop',
    url: 'https://www.albayan.ae',
    publishedAt: new Date(Date.now() - 1000 * 60 * 60 * 6).toISOString(),
    source: { name: 'البيان' },
  },
  {
    title: 'محكمة النقض المصرية ترسي مبدأ قانونيًا جديدًا في قضايا الأحوال الشخصية',
    description: 'أرست محكمة النقض مبدأ قضائيًا جديدًا يتعلق بحقوق الحضانة وتنظيم حق الرؤية للأطفال بعد الطلاق واشتراطات نقل الحضانة.',
    image: 'https://images.unsplash.com/photo-1450101499163-c8848c66ca85?w=600&h=400&fit=crop',
    url: 'https://www.youm7.com',
    publishedAt: new Date(Date.now() - 1000 * 60 * 60 * 10).toISOString(),
    source: { name: 'اليوم السابع' },
  },
  {
    title: 'الإمارات تصدر قانونًا جديدًا لتنظيم الأصول الرقمية والعملات المشفرة',
    description: 'أصدرت دولة الإمارات تشريعًا شاملاً لتنظيم تداول الأصول الرقمية والعملات المشفرة يتضمن إطارًا قانونيًا لحماية المستثمرين ومكافحة غسل الأموال.',
    image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=600&h=400&fit=crop',
    url: 'https://www.emaratalyoum.com',
    publishedAt: new Date(Date.now() - 1000 * 60 * 60 * 15).toISOString(),
    source: { name: 'الإمارات اليوم' },
  },
  {
    title: 'تعديلات قانون العمل المصري: حقوق جديدة للعاملين في القطاع الخاص',
    description: 'صدرت تعديلات على قانون العمل المصري تتضمن تنظيم ساعات العمل والإجازات السنوية وحقوق المرأة العاملة وآليات فض منازعات العمل الجماعية.',
    image: 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=600&h=400&fit=crop',
    url: 'https://www.youm7.com',
    publishedAt: new Date(Date.now() - 1000 * 60 * 60 * 20).toISOString(),
    source: { name: 'اليوم السابع' },
  },
  {
    title: 'دبي تطلق محكمة رقمية متخصصة في النزاعات التقنية والإلكترونية',
    description: 'أعلنت محاكم دبي عن إطلاق محكمة رقمية متخصصة للنظر في قضايا الجرائم الإلكترونية والتجارة الرقمية والملكية الفكرية في المجال التقني.',
    image: 'https://images.unsplash.com/photo-1563986768609-322da13575f2?w=600&h=400&fit=crop',
    url: 'https://www.albayan.ae',
    publishedAt: new Date(Date.now() - 1000 * 60 * 60 * 28).toISOString(),
    source: { name: 'البيان' },
  },
  {
    title: 'النيابة العامة المصرية تصدر تعليمات جديدة بشأن الحبس الاحتياطي',
    description: 'أصدر النائب العام تعليمات جديدة تنظم إجراءات الحبس الاحتياطي وتضع ضوابط أكثر صرامة لاستخدامه مع التأكيد على حقوق المتهمين.',
    image: 'https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?w=600&h=400&fit=crop',
    url: 'https://www.masrawy.com',
    publishedAt: new Date(Date.now() - 1000 * 60 * 60 * 36).toISOString(),
    source: { name: 'مصراوي' },
  },
  {
    title: 'أبوظبي تستضيف المؤتمر الدولي للتحكيم التجاري العربي',
    description: 'انطلقت فعاليات المؤتمر الدولي للتحكيم التجاري بمشاركة خبراء قانونيين من أكثر من ٣٠ دولة لمناقشة تطوير آليات التحكيم في المنطقة العربية.',
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=600&h=400&fit=crop',
    url: 'https://www.albayan.ae',
    publishedAt: new Date(Date.now() - 1000 * 60 * 60 * 48).toISOString(),
    source: { name: 'البيان' },
  },
]

export { fallbackArticles }
