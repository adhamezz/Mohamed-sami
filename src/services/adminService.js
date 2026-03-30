/**
 * adminService.js
 * ----------------
 * Data service layer for the Admin Dashboard.
 * Uses localStorage to simulate a backend API.
 *
 * HOW TO REPLACE WITH REAL API:
 *   Each function contains a "TODO" comment showing the equivalent
 *   HTTP endpoint. Replace the localStorage operations with fetch/axios calls.
 *   Example:
 *     const articles = await fetch('/api/articles').then(r => r.json());
 */

// ─── Storage Keys ───────────────────────────────────────────────
const KEYS = {
  articles: 'admin_articles',
  users: 'admin_users',
  settings: 'admin_settings',
};

// ─── Seed Data ──────────────────────────────────────────────────
const SEED_ARTICLES = [
  {
    id: '1',
    title: 'أحكام قانون العمل الإماراتي الجديد',
    content: 'يتناول هذا المقال التعديلات الجوهرية التي أدخلها قانون العمل الإماراتي الجديد على علاقة العمل بين صاحب العمل والموظف.',
    author: 'محمد سامي',
    category: 'قانون العمل',
    date: '2024-01-15',
    status: 'published',
  },
  {
    id: '2',
    title: 'الملكية الفكرية في عصر التكنولوجيا',
    content: 'مع التطور التكنولوجي المتسارع، باتت قضايا الملكية الفكرية من أكثر القضايا تعقيداً أمام المحاكم.',
    author: 'محمد سامي',
    category: 'القانون الرقمي',
    date: '2024-02-20',
    status: 'published',
  },
  {
    id: '3',
    title: 'إجراءات تأسيس الشركات في الإمارات',
    content: 'دليل شامل لإجراءات تأسيس الشركات في الإمارات العربية المتحدة، من اختيار الشكل القانوني حتى الحصول على الترخيص التجاري.',
    author: 'محمد سامي',
    category: 'قانون الشركات',
    date: '2024-03-10',
    status: 'draft',
  },
];

const SEED_USERS = [
  { id: '1', name: 'أحمد عبدالله', email: 'ahmed@example.com', role: 'user', status: 'active', joinDate: '2024-01-01' },
  { id: '2', name: 'فاطمة الزهراء', email: 'fatima@example.com', role: 'user', status: 'active', joinDate: '2024-01-15' },
  { id: '3', name: 'خالد المنصوري', email: 'khaled@example.com', role: 'moderator', status: 'active', joinDate: '2024-02-01' },
  { id: '4', name: 'سارة الحمادي', email: 'sara@example.com', role: 'user', status: 'inactive', joinDate: '2024-02-10' },
];

const DEFAULT_SETTINGS = {
  siteTitle: 'محمد سامي — مستشار قانوني',
  siteDescription: 'خبرة قانونية متكاملة في الإمارات ومصر',
  primaryColor: '#1e3a5f',
  accentColor: '#d4af37',
  contactEmail: 'mohamedsamy992019@gmail.com',
  whatsapp: '971506207021',
  maintenanceMode: false,
};

// ─── Helpers ─────────────────────────────────────────────────────
function load(key, seed) {
  try {
    const raw = localStorage.getItem(key);
    if (raw) return JSON.parse(raw);
  } catch { /* ignore */ }
  // Initialize with seed data on first run
  localStorage.setItem(key, JSON.stringify(seed));
  return seed;
}

function save(key, data) {
  localStorage.setItem(key, JSON.stringify(data));
}

function generateId() {
  return Date.now().toString(36) + Math.random().toString(36).slice(2);
}

// ─── Articles API ────────────────────────────────────────────────
export const articlesService = {
  /** GET /api/articles */
  getAll: () => load(KEYS.articles, SEED_ARTICLES),

  /** GET /api/articles/:id */
  getById: (id) => load(KEYS.articles, SEED_ARTICLES).find(a => a.id === id) || null,

  /** POST /api/articles */
  create: (data) => {
    const articles = load(KEYS.articles, SEED_ARTICLES);
    const article = { ...data, id: generateId(), date: data.date || new Date().toISOString().split('T')[0] };
    const updated = [...articles, article];
    save(KEYS.articles, updated);
    return article;
  },

  /** PUT /api/articles/:id */
  update: (id, data) => {
    const articles = load(KEYS.articles, SEED_ARTICLES);
    const idx = articles.findIndex(a => a.id === id);
    if (idx === -1) throw new Error('المقال غير موجود');
    const updated = [...articles];
    updated[idx] = { ...updated[idx], ...data };
    save(KEYS.articles, updated);
    return updated[idx];
  },

  /** DELETE /api/articles/:id */
  delete: (id) => {
    const articles = load(KEYS.articles, SEED_ARTICLES);
    const updated = articles.filter(a => a.id !== id);
    save(KEYS.articles, updated);
  },
};

// ─── Users API ───────────────────────────────────────────────────
export const usersService = {
  /** GET /api/users */
  getAll: () => load(KEYS.users, SEED_USERS),

  /** PUT /api/users/:id */
  update: (id, data) => {
    const users = load(KEYS.users, SEED_USERS);
    const idx = users.findIndex(u => u.id === id);
    if (idx === -1) throw new Error('المستخدم غير موجود');
    const updated = [...users];
    updated[idx] = { ...updated[idx], ...data };
    save(KEYS.users, updated);
    return updated[idx];
  },

  /** DELETE /api/users/:id */
  delete: (id) => {
    const users = load(KEYS.users, SEED_USERS);
    const updated = users.filter(u => u.id !== id);
    save(KEYS.users, updated);
  },
};

// ─── Settings API ────────────────────────────────────────────────
export const settingsService = {
  /** GET /api/settings */
  get: () => load(KEYS.settings, DEFAULT_SETTINGS),

  /** PUT /api/settings */
  save: (data) => {
    const settings = { ...load(KEYS.settings, DEFAULT_SETTINGS), ...data };
    save(KEYS.settings, settings);
    return settings;
  },
};

// ─── Dashboard Stats ─────────────────────────────────────────────
export const dashboardService = {
  /** GET /api/dashboard/stats */
  getStats: () => {
    const articles = load(KEYS.articles, SEED_ARTICLES);
    const users = load(KEYS.users, SEED_USERS);
    return {
      totalArticles: articles.length,
      publishedArticles: articles.filter(a => a.status === 'published').length,
      totalUsers: users.length,
      activeUsers: users.filter(u => u.status === 'active').length,
      recentActivity: [
        ...articles.slice(-3).map(a => ({ type: 'article', label: `مقال: ${a.title}`, date: a.date, id: a.id })),
        ...users.slice(-2).map(u => ({ type: 'user', label: `مستخدم: ${u.name}`, date: u.joinDate, id: u.id })),
      ].sort((a, b) => new Date(b.date) - new Date(a.date)).slice(0, 5),
    };
  },
};
