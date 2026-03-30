/**
 * AdminLayout.jsx
 * ----------------
 * Main layout wrapper for all admin pages.
 * Provides a sidebar + top navbar structure.
 */
import { useState } from 'react';
import { Link, NavLink, useNavigate, Outlet } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
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
} from 'lucide-react';

const NAV_GROUPS = [
  {
    label: 'الرئيسية',
    items: [
      { to: '/admin/dashboard', icon: LayoutDashboard, label: 'لوحة التحكم' },
    ],
  },
  {
    label: 'إدارة المحتوى',
    items: [
      { to: '/admin/site-settings', icon: Globe, label: 'إعدادات الموقع' },
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
    label: 'النظام',
    items: [
      { to: '/admin/settings', icon: Settings, label: 'الإعدادات' },
    ],
  },
];

export default function AdminLayout() {
  const { admin, logout } = useAuth();
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate('/admin/login');
  };

  return (
    <div className="flex h-screen bg-gray-100 font-cairo" dir="rtl">
      {/* ── Sidebar Overlay (mobile) ── */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 z-20 bg-black/50 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* ── Sidebar ── */}
      <aside
        className={`fixed top-0 right-0 z-30 h-full w-64 bg-[#1e3a5f] text-white flex flex-col shadow-2xl
          transform transition-transform duration-300 lg:translate-x-0 lg:static lg:h-screen
          ${sidebarOpen ? 'translate-x-0' : 'translate-x-full'}`}
      >
        {/* Logo */}
        <div className="flex items-center justify-between px-5 py-5 border-b border-white/10">
          <Link to="/admin/dashboard" className="flex items-center gap-2">
            <span className="text-[#d4af37] font-bold text-lg leading-tight">
              محمد سامي
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
        <header className="bg-white shadow-sm px-4 py-3 flex items-center justify-between sticky top-0 z-10">
          <button
            className="lg:hidden p-2 rounded-lg hover:bg-gray-100 text-gray-600"
            onClick={() => setSidebarOpen(true)}
          >
            <Menu size={22} />
          </button>
          <div className="flex items-center gap-2 text-sm text-gray-500">
            <Link to="/" className="hover:text-[#1e3a5f] transition" target="_blank">
              عرض الموقع ↗
            </Link>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 overflow-y-auto p-4 lg:p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
