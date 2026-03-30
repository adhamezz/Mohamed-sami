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
  siteSettings: 'cms_site_settings',
  services: 'cms_services',
  team: 'cms_team',
  gallery: 'cms_gallery',
  testimonials: 'cms_testimonials',
  messages: 'contactMessages',
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
    const services = load(KEYS.services, SEED_SERVICES);
    const team = load(KEYS.team, SEED_TEAM);
    const messages = load(KEYS.messages, []);
    return {
      totalArticles: articles.length,
      publishedArticles: articles.filter(a => a.status === 'published').length,
      totalUsers: users.length,
      activeUsers: users.filter(u => u.status === 'active').length,
      totalServices: services.length,
      totalTeam: team.length,
      totalMessages: messages.length,
      recentActivity: [
        ...articles.slice(-3).map(a => ({ type: 'article', label: `مقال: ${a.title}`, date: a.date, id: a.id })),
        ...users.slice(-2).map(u => ({ type: 'user', label: `مستخدم: ${u.name}`, date: u.joinDate, id: u.id })),
      ].sort((a, b) => new Date(b.date) - new Date(a.date)).slice(0, 5),
    };
  },
};

// ─── CMS Site Settings ───────────────────────────────────────────
const DEFAULT_SITE_SETTINGS = {
  siteName: 'محمد سامي — مستشار قانوني',
  siteDescription: 'خبرة قانونية متكاملة في الإمارات ومصر',
  logo: null,
  phone: '+971 50 620 7021',
  fax: '',
  email: 'mohamedsamy992019@gmail.com',
  address: 'الإمارات العربية المتحدة',
  facebook: 'https://www.facebook.com/mohamd.samy.9',
  instagram: '',
  linkedin: 'https://www.linkedin.com/in/mohamed-samy-810aa3256/',
  whatsapp: '971506207021',
  workingHours: 'السبت - الخميس: 9 صباحاً - 6 مساءً',
  welcomeMessage: 'مرحباً بكم في مكتب المستشار القانوني محمد سامي',
  heroTitle: 'محمد سامي — مستشار قانوني',
  heroSubtitle: 'أقدم كافة الخدمات القانونية كالتمثيل القانوني أمام المحاكم والاستشارات القانونية وصياغة المذكرات القانونية والعقود.',
  aboutTitle: 'عن المستشار محمد سامي',
  aboutText: 'مستشار قانوني بخبرة أكثر من 15 سنة في مجالات القانون المختلفة في مصر والإمارات والكويت.',
  primaryColor: '#1e3a5f',
  accentColor: '#d4af37',
  twitter: '',
};

export const siteSettingsService = {
  get: () => load(KEYS.siteSettings, DEFAULT_SITE_SETTINGS),
  save: (data) => {
    const settings = { ...load(KEYS.siteSettings, DEFAULT_SITE_SETTINGS), ...data };
    save(KEYS.siteSettings, settings);
    window.dispatchEvent(new Event('cms-updated'));
    return settings;
  },
  reset: () => {
    save(KEYS.siteSettings, DEFAULT_SITE_SETTINGS);
    window.dispatchEvent(new Event('cms-updated'));
    return DEFAULT_SITE_SETTINGS;
  },
};

// ─── CMS Services ────────────────────────────────────────────────
const SEED_SERVICES = [
  { id: '1', title: 'القانون الجنائي', description: 'دفاع قانوني متخصص في القضايا الجنائية أمام جميع المحاكم.', icon: 'Shield', price: '', order: 1 },
  { id: '2', title: 'القانون التجاري والمدني', description: 'تمثيل في المنازعات التجارية والمدنية وصياغة العقود.', icon: 'Scale', price: '', order: 2 },
  { id: '3', title: 'قانون الأسرة', description: 'حلول قانونية شاملة في قضايا الطلاق والحضانة والميراث.', icon: 'Heart', price: '', order: 3 },
  { id: '4', title: 'الاستشارات القانونية', description: 'استشارات قانونية فورية ومتخصصة في جميع المجالات.', icon: 'MessageCircle', price: '', order: 4 },
  { id: '5', title: 'صياغة العقود', description: 'صياغة ومراجعة جميع أنواع العقود التجارية والمدنية.', icon: 'FileText', price: '', order: 5 },
  { id: '6', title: 'تأسيس الشركات', description: 'إجراءات تأسيس الشركات والحصول على التراخيص التجارية.', icon: 'Building', price: '', order: 6 },
];

export const cmsServicesService = {
  getAll: () => load(KEYS.services, SEED_SERVICES),
  create: (data) => {
    const items = load(KEYS.services, SEED_SERVICES);
    const item = { ...data, id: generateId() };
    const updated = [...items, item];
    save(KEYS.services, updated);
    window.dispatchEvent(new Event('cms-updated'));
    return item;
  },
  update: (id, data) => {
    const items = load(KEYS.services, SEED_SERVICES);
    const idx = items.findIndex(s => s.id === id);
    if (idx === -1) throw new Error('الخدمة غير موجودة');
    const updated = [...items];
    updated[idx] = { ...updated[idx], ...data };
    save(KEYS.services, updated);
    window.dispatchEvent(new Event('cms-updated'));
    return updated[idx];
  },
  delete: (id) => {
    const items = load(KEYS.services, SEED_SERVICES);
    save(KEYS.services, items.filter(s => s.id !== id));
    window.dispatchEvent(new Event('cms-updated'));
  },
};

// ─── CMS Team ────────────────────────────────────────────────────
const SEED_TEAM = [
  { id: '1', name: 'محمد سامي', position: 'مستشار قانوني رئيسي', image: null, email: 'mohamedsamy992019@gmail.com', phone: '+971 50 620 7021', bio: 'خبرة أكثر من 15 سنة في مجالات القانون المختلفة.' },
];

export const cmsTeamService = {
  getAll: () => load(KEYS.team, SEED_TEAM),
  create: (data) => {
    const items = load(KEYS.team, SEED_TEAM);
    const item = { ...data, id: generateId() };
    const updated = [...items, item];
    save(KEYS.team, updated);
    window.dispatchEvent(new Event('cms-updated'));
    return item;
  },
  update: (id, data) => {
    const items = load(KEYS.team, SEED_TEAM);
    const idx = items.findIndex(t => t.id === id);
    if (idx === -1) throw new Error('العضو غير موجود');
    const updated = [...items];
    updated[idx] = { ...updated[idx], ...data };
    save(KEYS.team, updated);
    window.dispatchEvent(new Event('cms-updated'));
    return updated[idx];
  },
  delete: (id) => {
    const items = load(KEYS.team, SEED_TEAM);
    save(KEYS.team, items.filter(t => t.id !== id));
    window.dispatchEvent(new Event('cms-updated'));
  },
};

// ─── CMS Gallery ─────────────────────────────────────────────────
export const cmsGalleryService = {
  getAll: () => load(KEYS.gallery, []),
  create: (data) => {
    const items = load(KEYS.gallery, []);
    const item = { ...data, id: generateId(), date: new Date().toISOString().split('T')[0] };
    const updated = [...items, item];
    save(KEYS.gallery, updated);
    window.dispatchEvent(new Event('cms-updated'));
    return item;
  },
  delete: (id) => {
    const items = load(KEYS.gallery, []);
    save(KEYS.gallery, items.filter(g => g.id !== id));
    window.dispatchEvent(new Event('cms-updated'));
  },
  update: (id, data) => {
    const items = load(KEYS.gallery, []);
    const idx = items.findIndex(g => g.id === id);
    if (idx === -1) throw new Error('الصورة غير موجودة');
    const updated = [...items];
    updated[idx] = { ...updated[idx], ...data };
    save(KEYS.gallery, updated);
    window.dispatchEvent(new Event('cms-updated'));
    return updated[idx];
  },
};

// ─── CMS Testimonials ────────────────────────────────────────────
const SEED_TESTIMONIALS = [
  { id: '1', name: 'أحمد الشمري', company: 'مجموعة الشمري للأعمال', position: 'رجل أعمال', text: 'المستشار محمد سامي أفضل محامٍ تعاملت معه، احترافية عالية وتميز في العمل.', rating: 5, date: '2024-01-10', image: null },
  { id: '2', name: 'سارة المنصوري', company: 'شركة المنصوري التجارية', position: 'مديرة تنفيذية', text: 'خدمة ممتازة وسرعة في الإنجاز، أنصح بالتعامل مع مكتب المستشار محمد سامي.', rating: 5, date: '2024-02-15', image: null },
];

export const cmsTestimonialsService = {
  getAll: () => load(KEYS.testimonials, SEED_TESTIMONIALS),
  create: (data) => {
    const items = load(KEYS.testimonials, SEED_TESTIMONIALS);
    const item = { ...data, id: generateId(), date: data.date || new Date().toISOString().split('T')[0] };
    const updated = [...items, item];
    save(KEYS.testimonials, updated);
    window.dispatchEvent(new Event('cms-updated'));
    return item;
  },
  update: (id, data) => {
    const items = load(KEYS.testimonials, SEED_TESTIMONIALS);
    const idx = items.findIndex(t => t.id === id);
    if (idx === -1) throw new Error('التقييم غير موجود');
    const updated = [...items];
    updated[idx] = { ...updated[idx], ...data };
    save(KEYS.testimonials, updated);
    window.dispatchEvent(new Event('cms-updated'));
    return updated[idx];
  },
  delete: (id) => {
    const items = load(KEYS.testimonials, SEED_TESTIMONIALS);
    save(KEYS.testimonials, items.filter(t => t.id !== id));
    window.dispatchEvent(new Event('cms-updated'));
  },
};

// ─── CMS Messages (Contact Forms) ───────────────────────────────
export const cmsMessagesService = {
  getAll: () => load(KEYS.messages, []),
  delete: (idx) => {
    const items = load(KEYS.messages, []);
    items.splice(idx, 1);
    save(KEYS.messages, items);
  },
  markRead: (idx) => {
    const items = load(KEYS.messages, []);
    if (items[idx]) items[idx].read = true;
    save(KEYS.messages, items);
  },
};
