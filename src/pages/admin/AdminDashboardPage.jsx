/**
 * AdminDashboardPage.jsx
 * -----------------------
 * Overview page showing summary statistics and recent activity.
 *
 * Data source: dashboardService (localStorage)
 */
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FileText, Users, CheckCircle, Activity, ArrowLeft, Globe, Briefcase, UserCheck, Image, Star, Mail } from 'lucide-react';
import { dashboardService } from '../../services/adminService';

// ── Stat Card ────────────────────────────────────────────────────
function StatCard({ icon: Icon, label, value, sub, color }) {
  return (
    <div className="bg-white rounded-2xl shadow-sm p-5 flex items-center gap-4">
      <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${color}`}>
        <Icon size={22} className="text-white" />
      </div>
      <div>
        <p className="text-2xl font-bold text-gray-800">{value}</p>
        <p className="text-sm text-gray-500">{label}</p>
        {sub && <p className="text-xs text-green-600 mt-0.5">{sub}</p>}
      </div>
    </div>
  );
}

// ── Activity Badge ────────────────────────────────────────────────
function ActivityBadge({ type }) {
  return (
    <span
      className={`text-xs px-2 py-0.5 rounded-full font-medium ${
        type === 'article'
          ? 'bg-blue-100 text-blue-700'
          : 'bg-purple-100 text-purple-700'
      }`}
    >
      {type === 'article' ? 'مقال' : 'مستخدم'}
    </span>
  );
}

const QUICK_LINKS = [
  { to: '/admin/site-settings', icon: Globe, label: 'إعدادات الموقع', desc: 'الاسم، الشعار، التواصل' },
  { to: '/admin/articles', icon: FileText, label: 'المقالات', desc: 'إضافة وتعديل المقالات' },
  { to: '/admin/services', icon: Briefcase, label: 'الخدمات', desc: 'إدارة الخدمات القانونية' },
  { to: '/admin/team', icon: UserCheck, label: 'الفريق', desc: 'أعضاء الفريق' },
  { to: '/admin/gallery', icon: Image, label: 'المعرض', desc: 'صور وملفات الموقع' },
  { to: '/admin/testimonials', icon: Star, label: 'التقييمات', desc: 'شهادات العملاء' },
  { to: '/admin/messages', icon: Mail, label: 'الرسائل', desc: 'رسائل التواصل' },
  { to: '/admin/users', icon: Users, label: 'المستخدمون', desc: 'إدارة المستخدمين' },
];

export default function AdminDashboardPage() {
  const [stats, setStats] = useState(null);

  useEffect(() => {
    setStats(dashboardService.getStats());
  }, []);

  if (!stats) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="w-8 h-8 border-4 border-[#1e3a5f] border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="space-y-6" dir="rtl">
      {/* Page Title */}
      <div>
        <h1 className="text-2xl font-bold text-gray-800">لوحة التحكم</h1>
        <p className="text-gray-500 text-sm mt-1">مرحباً بك — يمكنك تعديل كل محتوى الموقع من هنا</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
        <StatCard
          icon={FileText}
          label="إجمالي المقالات"
          value={stats.totalArticles}
          sub={`${stats.publishedArticles} منشور`}
          color="bg-[#1e3a5f]"
        />
        <StatCard
          icon={Briefcase}
          label="الخدمات"
          value={stats.totalServices}
          color="bg-indigo-500"
        />
        <StatCard
          icon={UserCheck}
          label="أعضاء الفريق"
          value={stats.totalTeam}
          color="bg-[#d4af37]"
        />
        <StatCard
          icon={Mail}
          label="الرسائل المستلمة"
          value={stats.totalMessages}
          color="bg-green-500"
        />
      </div>

      {/* Quick Actions */}
      <div className="bg-white rounded-2xl shadow-sm p-5">
        <h2 className="font-bold text-gray-700 mb-4 text-base">الوصول السريع — إدارة المحتوى</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
          {QUICK_LINKS.map(({ to, icon: Icon, label, desc }) => (
            <Link
              key={to}
              to={to}
              className="flex items-center gap-3 p-3 bg-[#1e3a5f]/5 hover:bg-[#1e3a5f]/10 rounded-xl transition group"
            >
              <div className="w-9 h-9 rounded-lg bg-[#1e3a5f]/10 flex items-center justify-center text-[#1e3a5f] shrink-0 group-hover:bg-[#1e3a5f] group-hover:text-white transition">
                <Icon size={17} />
              </div>
              <div className="min-w-0">
                <p className="text-sm font-medium text-gray-700 truncate">{label}</p>
                <p className="text-xs text-gray-400 truncate">{desc}</p>
              </div>
              <ArrowLeft size={14} className="text-gray-300 group-hover:text-[#1e3a5f] transition mr-auto shrink-0" />
            </Link>
          ))}
        </div>
      </div>

      {/* Recent Activity */}
      <div className="bg-white rounded-2xl shadow-sm p-5">
        <h2 className="font-bold text-gray-700 mb-4 text-base">النشاط الأخير</h2>
        {stats.recentActivity.length === 0 ? (
          <p className="text-gray-400 text-sm text-center py-6">لا يوجد نشاط بعد</p>
        ) : (
          <ul className="space-y-3">
            {stats.recentActivity.map((item, i) => (
              <li key={i} className="flex items-center gap-3 text-sm text-gray-600">
                <ActivityBadge type={item.type} />
                <span className="flex-1 truncate">{item.label}</span>
                <span className="text-xs text-gray-400 shrink-0">{item.date}</span>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
