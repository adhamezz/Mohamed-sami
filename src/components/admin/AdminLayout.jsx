/**
 * AdminLayout.jsx
 * ----------------
 * Main layout wrapper for all admin pages.
 * Provides a sidebar + top navbar structure.
 */
import { useState } from 'react';
import { Link, NavLink, useNavigate, Outlet } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { useCMS } from '../../context/CMSContext';
import { useUI } from '../../context/UIContext';
import { PRESET_THEMES } from '../../utils/themes';
import {
  LayoutDashboard,
  FileText,
  Users,
  Settings,
  LogOut,
  Menu,
  X,
  ChevronRight,
  Globe,
  Briefcase,
  Star,
  Image,
  Mail,
  UserCheck,
  Palette,
  BarChart2,
  Download,
  Shield,
  Sun,
  Moon,
} from 'lucide-react';

const NAV_GROUPS = [
  {
    label: 'الرئيسية',
    items: [
      { to: '/admin/dashboard', icon: LayoutDashboard, label: 'لوحة التحكم' },
    ],
  },
  {
    label: 'تخصيص الموقع',
    items: [
      { to: '/admin/branding', icon: Palette, label: 'هوية الموقع' },
      { to: '/admin/site-settings', icon: Globe, label: 'إعدادات الموقع' },
      { to: '/admin/business-profile', icon: UserCheck, label: 'الملف المهني' },
      { to: '/admin/customization', icon: Palette, label: 'الثيم والألوان' },
    ],
  },
  {
    label: 'إدارة المحتوى',
    items: [
      { to: '/admin/articles', icon: FileText, label: 'المقالات' },
      { to: '/admin/services', icon: Briefcase, label: 'الخدمات' },
      { to: '/admin/team', icon: UserCheck, label: 'الفريق' },
      { to: '/admin/gallery', icon: Image, label: 'المعرض' },
      { to: '/admin/testimonials', icon: Star, label: 'التقييمات' },
    ],
  },
  {
    label: 'التفاعل',
    items: [
      { to: '/admin/messages', icon: Mail, label: 'الرسائل' },
      { to: '/admin/users', icon: Users, label: 'المستخدمون' },
    ],
  },
  {
    label: 'الصلاحيات',
    items: [
      { to: '/admin/roles', icon: Shield, label: 'الأدوار' },
      { to: '/admin/permissions', icon: Shield, label: 'مصفوفة الصلاحيات' },
    ],
  },
  {
    label: 'النظام',
    items: [
      { to: '/admin/analytics', icon: BarChart2, label: 'الإحصائيات' },
      { to: '/admin/export', icon: Download, label: 'النسخ الاحتياطي' },
      { to: '/admin/settings', icon: Settings, label: 'الإعدادات' },
    ],
  },
];

export default function AdminLayout() {
  const { admin, logout } = useAuth();
  const { siteSettings } = useCMS();
  const { isDark, toggleColorMode, theme } = useUI();
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const siteName = siteSettings?.siteName || 'محمد سامي';

  const handleLogout = () => {
    logout();
    navigate('/admin/login');
  };

  const sidebarBg = theme?.sidebar || PRESET_THEMES[0].sidebar;
  const accentColor = theme?.accent || PRESET_THEMES[0].accent;

  return (
    <div className={`flex h-screen font-cairo ${isDark ? 'bg-gray-900' : 'bg-gray-100'}`} dir="rtl">
      {/* ── Sidebar Overlay (mobile) ── */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 z-20 bg-black/50 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* ── Sidebar ── */}
      <aside
        className={`fixed top-0 right-0 z-30 h-full w-64 text-white flex flex-col shadow-2xl
          transform transition-transform duration-300 lg:translate-x-0 lg:static lg:h-screen
          ${sidebarOpen ? 'translate-x-0' : 'translate-x-full'}`}
        style={{ backgroundColor: sidebarBg }}
      >
        {/* Logo */}
        <div className="flex items-center justify-between px-5 py-5 border-b border-white/10">
          <Link to="/admin/dashboard" className="flex items-center gap-2">
            <span className="font-bold text-lg leading-tight" style={{ color: accentColor }}>
              {siteName}
              <br />
              <span className="text-xs text-white/70 font-normal">لوحة الإدارة</span>
            </span>
          </Link>
          <button className="lg:hidden text-white/70 hover:text-white" onClick={() => setSidebarOpen(false)}>
            <X size={20} />
          </button>
        </div>

        {/* Nav Links */}
        <nav className="flex-1 py-4 overflow-y-auto">
          {NAV_GROUPS.map(group => (
            <div key={group.label} className="mb-2">
              <p className="text-white/40 text-xs font-semibold uppercase tracking-wider px-5 mb-1">{group.label}</p>
              {group.items.map(({ to, icon: Icon, label }) => (
                <NavLink
                  key={to}
                  to={to}
                  onClick={() => setSidebarOpen(false)}
                  className={({ isActive }) =>
                    `flex items-center gap-3 px-5 py-2.5 mx-2 rounded-xl mb-0.5 transition-all text-sm font-medium
                    ${isActive
                      ? 'bg-[#d4af37] text-[#1e3a5f]'
                      : 'text-white/75 hover:bg-white/10 hover:text-white'
                    }`
                  }
                >
                  <Icon size={16} />
                  <span>{label}</span>
                  <ChevronRight size={12} className="mr-auto opacity-50" />
                </NavLink>
              ))}
            </div>
          ))}
        </nav>

        {/* Admin Info + Logout */}
        <div className="border-t border-white/10 p-4">
          <div className="flex items-center gap-3 mb-3 px-1">
            <div className="w-9 h-9 rounded-full bg-[#d4af37] flex items-center justify-center text-[#1e3a5f] font-bold text-sm">
              {admin?.name?.[0] || 'A'}
            </div>
            <div>
              <p className="text-sm font-medium">{admin?.name}</p>
              <p className="text-xs text-white/50">{admin?.email}</p>
            </div>
          </div>
          <button
            onClick={handleLogout}
            className="flex items-center gap-2 w-full px-3 py-2 rounded-lg text-white/70 hover:bg-red-600/20 hover:text-red-400 transition text-sm"
          >
            <LogOut size={16} />
            <span>تسجيل الخروج</span>
          </button>
        </div>
      </aside>

      {/* ── Main Content ── */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        {/* Top Navbar */}
        <header className={`shadow-sm px-4 py-3 flex items-center justify-between sticky top-0 z-10 ${isDark ? 'bg-gray-800 text-gray-100' : 'bg-white text-gray-600'}`}>
          <button
            className={`lg:hidden p-2 rounded-lg transition ${isDark ? 'hover:bg-gray-700' : 'hover:bg-gray-100'}`}
            onClick={() => setSidebarOpen(true)}
          >
            <Menu size={22} />
          </button>
          <div className="flex items-center gap-3 text-sm">
            <button
              onClick={toggleColorMode}
              className={`p-2 rounded-lg transition ${isDark ? 'hover:bg-gray-700 text-yellow-400' : 'hover:bg-gray-100 text-gray-500'}`}
              title={isDark ? 'تفعيل الوضع الفاتح' : 'تفعيل الوضع الداكن'}
            >
              {isDark ? <Sun size={18} /> : <Moon size={18} />}
            </button>
            <Link to="/" className={`hover:text-[#1e3a5f] transition`} target="_blank">
              عرض الموقع ↗
            </Link>
          </div>
        </header>

        {/* Page Content */}
        <main className={`flex-1 overflow-y-auto p-4 lg:p-6 ${isDark ? 'bg-gray-900 text-gray-100' : ''}`}>
          <Outlet />
        </main>
      </div>
    </div>
  );
}
