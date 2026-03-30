/**
 * permissions.js
 * ---------------
 * Defines all permission keys and maps them to roles.
 * Used by RoleContext and usePermission hook to guard features.
 */

/** All available permission keys */
export const PERMISSIONS = {
  // Role & user management
  MANAGE_ROLES: 'manage_roles',
  MANAGE_USERS: 'manage_users',
  // Content management
  MANAGE_CONTENT: 'manage_content',
  MANAGE_ARTICLES: 'manage_articles',
  MANAGE_SERVICES: 'manage_services',
  MANAGE_GALLERY: 'manage_gallery',
  MANAGE_TEAM: 'manage_team',
  MANAGE_TESTIMONIALS: 'manage_testimonials',
  // Site settings & branding
  MANAGE_SETTINGS: 'manage_settings',
  MANAGE_BRANDING: 'manage_branding',
  MANAGE_CUSTOMIZATION: 'manage_customization',
  // Analytics & messages
  VIEW_ANALYTICS: 'view_analytics',
  VIEW_MESSAGES: 'view_messages',
  MANAGE_MESSAGES: 'manage_messages',
  // Export / backup
  EXPORT_DATA: 'export_data',
};

/** Built-in role definitions (cannot be deleted, can be extended) */
export const DEFAULT_ROLES = [
  {
    id: 'super_admin',
    name: 'Super Admin',
    nameAr: 'مدير عام',
    description: 'تحكم كامل في كل شيء',
    color: '#ef4444',
    isBuiltIn: true,
    permissions: Object.values(PERMISSIONS),
  },
  {
    id: 'admin',
    name: 'Admin',
    nameAr: 'مدير',
    description: 'إدارة المحتوى والمستخدمين',
    color: '#1e3a5f',
    isBuiltIn: true,
    permissions: [
      PERMISSIONS.MANAGE_USERS,
      PERMISSIONS.MANAGE_CONTENT,
      PERMISSIONS.MANAGE_ARTICLES,
      PERMISSIONS.MANAGE_SERVICES,
      PERMISSIONS.MANAGE_GALLERY,
      PERMISSIONS.MANAGE_TEAM,
      PERMISSIONS.MANAGE_TESTIMONIALS,
      PERMISSIONS.MANAGE_SETTINGS,
      PERMISSIONS.MANAGE_BRANDING,
      PERMISSIONS.VIEW_ANALYTICS,
      PERMISSIONS.VIEW_MESSAGES,
      PERMISSIONS.MANAGE_MESSAGES,
      PERMISSIONS.EXPORT_DATA,
    ],
  },
  {
    id: 'editor',
    name: 'Editor',
    nameAr: 'محرر',
    description: 'تعديل المحتوى فقط',
    color: '#7c3aed',
    isBuiltIn: true,
    permissions: [
      PERMISSIONS.MANAGE_ARTICLES,
      PERMISSIONS.MANAGE_SERVICES,
      PERMISSIONS.MANAGE_GALLERY,
      PERMISSIONS.MANAGE_TESTIMONIALS,
      PERMISSIONS.VIEW_MESSAGES,
    ],
  },
  {
    id: 'viewer',
    name: 'Viewer',
    nameAr: 'مشاهد',
    description: 'عرض فقط بدون تعديل',
    color: '#059669',
    isBuiltIn: true,
    permissions: [
      PERMISSIONS.VIEW_ANALYTICS,
      PERMISSIONS.VIEW_MESSAGES,
    ],
  },
];

/** Human-readable labels for each permission key */
export const PERMISSION_LABELS = {
  [PERMISSIONS.MANAGE_ROLES]: 'إدارة الأدوار والصلاحيات',
  [PERMISSIONS.MANAGE_USERS]: 'إدارة المستخدمين',
  [PERMISSIONS.MANAGE_CONTENT]: 'إدارة المحتوى (كامل)',
  [PERMISSIONS.MANAGE_ARTICLES]: 'إدارة المقالات',
  [PERMISSIONS.MANAGE_SERVICES]: 'إدارة الخدمات',
  [PERMISSIONS.MANAGE_GALLERY]: 'إدارة المعرض',
  [PERMISSIONS.MANAGE_TEAM]: 'إدارة الفريق',
  [PERMISSIONS.MANAGE_TESTIMONIALS]: 'إدارة التقييمات',
  [PERMISSIONS.MANAGE_SETTINGS]: 'إعدادات الموقع',
  [PERMISSIONS.MANAGE_BRANDING]: 'الهوية البصرية',
  [PERMISSIONS.MANAGE_CUSTOMIZATION]: 'تخصيص الألوان والثيم',
  [PERMISSIONS.VIEW_ANALYTICS]: 'عرض الإحصائيات',
  [PERMISSIONS.VIEW_MESSAGES]: 'عرض الرسائل',
  [PERMISSIONS.MANAGE_MESSAGES]: 'إدارة الرسائل',
  [PERMISSIONS.EXPORT_DATA]: 'تصدير واستيراد البيانات',
};

/** Groups of permissions for the UI */
export const PERMISSION_GROUPS = [
  {
    label: 'إدارة الأدوار والمستخدمين',
    permissions: [PERMISSIONS.MANAGE_ROLES, PERMISSIONS.MANAGE_USERS],
  },
  {
    label: 'إدارة المحتوى',
    permissions: [
      PERMISSIONS.MANAGE_CONTENT,
      PERMISSIONS.MANAGE_ARTICLES,
      PERMISSIONS.MANAGE_SERVICES,
      PERMISSIONS.MANAGE_GALLERY,
      PERMISSIONS.MANAGE_TEAM,
      PERMISSIONS.MANAGE_TESTIMONIALS,
    ],
  },
  {
    label: 'الإعدادات والتخصيص',
    permissions: [
      PERMISSIONS.MANAGE_SETTINGS,
      PERMISSIONS.MANAGE_BRANDING,
      PERMISSIONS.MANAGE_CUSTOMIZATION,
    ],
  },
  {
    label: 'التقارير والرسائل',
    permissions: [
      PERMISSIONS.VIEW_ANALYTICS,
      PERMISSIONS.VIEW_MESSAGES,
      PERMISSIONS.MANAGE_MESSAGES,
      PERMISSIONS.EXPORT_DATA,
    ],
  },
];
