/**
 * AdminDashboardPage.jsx
 * -----------------------
 * Overview page showing summary statistics and recent activity.
 *
 * Data source: dashboardService (localStorage)
 */
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  FileText, Users, ArrowLeft, Globe, Briefcase, UserCheck,
  Image, Star, Mail, TrendingUp, MessageSquare, Palette,
  BarChart2, Download, Eye, CheckCircle2, Clock, AlertCircle,
} from 'lucide-react';
import { dashboardService } from '../../services/adminService';

// ── Stat Card ────────────────────────────────────────────────────
function StatCard({ icon: Icon, label, value, sub, color, trend }) {
  return (
    <div className="bg-white rounded-2xl shadow-sm p-5 flex items-center gap-4 hover:shadow-md transition-shadow">
      <div className={`w-13 h-13 w-12 h-12 rounded-xl flex items-center justify-center ${color} shrink-0`}>
        <Icon size={22} className="text-white" />
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-2xl font-bold text-gray-800">{value ?? 0}</p>
        <p className="text-sm text-gray-500 truncate">{label}</p>
        {sub && <p className="text-xs text-green-600 mt-0.5">{sub}</p>}
      </div>
      {trend !== undefined && (
        <div className={`text-xs font-medium px-2 py-1 rounded-full shrink-0 ${trend >= 0 ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
          {trend >= 0 ? '+' : ''}{trend}%
        </div>
      )}
    </div>
  );
}

// ── Progress Bar ──────────────────────────────────────────────────
function ProgressBar({ label, value, total, color }) {
  const pct = total > 0 ? Math.round((value / total) * 100) : 0;
  return (
    <div>
      <div className="flex justify-between text-xs text-gray-500 mb-1">
        <span>{label}</span>
        <span>{value} / {total} ({pct}%)</span>
      </div>
      <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
        <div className="h-full rounded-full transition-all duration-500" style={{ width: `${pct}%`, backgroundColor: color || '#1e3a5f' }} />
      </div>
    </div>
  );
}

// ── Activity Badge ────────────────────────────────────────────────
function ActivityBadge({ type }) {
  const map = {
    article: { label: 'مقال', cls: 'bg-blue-100 text-blue-700' },
    user: { label: 'مستخدم', cls: 'bg-purple-100 text-purple-700' },
    message: { label: 'رسالة', cls: 'bg-green-100 text-green-700' },
  };
  const { label, cls } = map[type] || map.user;
  return (
    <span className={`text-xs px-2 py-0.5 rounded-full font-medium shrink-0 ${cls}`}>{label}</span>
  );
}

// ── Status Icon ───────────────────────────────────────────────────
function StatusIcon({ status }) {
  if (status === 'published') return <CheckCircle2 size={14} className="text-green-500" />;
  if (status === 'draft') return <Clock size={14} className="text-yellow-500" />;
  return <AlertCircle size={14} className="text-gray-400" />;
}

const QUICK_LINKS = [
  { to: '/admin/branding', icon: Palette, label: 'هوية الموقع', desc: 'الشعار والألوان والنصوص', color: 'bg-purple-500' },
  { to: '/admin/site-settings', icon: Globe, label: 'إعدادات الموقع', desc: 'التواصل والروابط الاجتماعية', color: 'bg-[#1e3a5f]' },
  { to: '/admin/business-profile', icon: UserCheck, label: 'الملف المهني', desc: 'بيانات المحامي/المكتب', color: 'bg-indigo-500' },
  { to: '/admin/articles', icon: FileText, label: 'المقالات', desc: 'إضافة وتعديل المقالات', color: 'bg-blue-500' },
  { to: '/admin/services', icon: Briefcase, label: 'الخدمات', desc: 'إدارة الخدمات القانونية', color: 'bg-cyan-500' },
  { to: '/admin/team', icon: Users, label: 'الفريق', desc: 'أعضاء الفريق', color: 'bg-[#d4af37]' },
  { to: '/admin/gallery', icon: Image, label: 'المعرض', desc: 'صور وملفات الموقع', color: 'bg-pink-500' },
  { to: '/admin/testimonials', icon: Star, label: 'التقييمات', desc: 'شهادات العملاء', color: 'bg-amber-500' },
  { to: '/admin/messages', icon: Mail, label: 'الرسائل', desc: 'رسائل التواصل', color: 'bg-green-500' },
  { to: '/admin/analytics', icon: BarChart2, label: 'الإحصائيات', desc: 'تحليل الزيارات والمحتوى', color: 'bg-rose-500' },
  { to: '/admin/export', icon: Download, label: 'النسخ الاحتياطي', desc: 'تصدير واستيراد البيانات', color: 'bg-gray-600' },
  { to: '/admin/users', icon: UserCheck, label: 'المستخدمون', desc: 'إدارة المستخدمين', color: 'bg-teal-500' },
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

  const publishedPct = stats.totalArticles > 0
    ? Math.round((stats.publishedArticles / stats.totalArticles) * 100)
    : 0;

  return (
    <div className="space-y-6" dir="rtl">
      {/* Page Title */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">لوحة التحكم</h1>
          <p className="text-gray-500 text-sm mt-1">مرحباً بك — يمكنك تعديل كل محتوى الموقع من هنا</p>
        </div>
        <Link to="/" target="_blank"
          className="hidden sm:flex items-center gap-2 text-sm text-[#1e3a5f] hover:underline border border-[#1e3a5f]/30 rounded-lg px-3 py-2">
          <Eye size={15} /> عرض الموقع
        </Link>
      </div>

      {/* Main Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
        <StatCard
          icon={FileText}
          label="إجمالي المقالات"
          value={stats.totalArticles}
          sub={`${stats.publishedArticles} منشور · ${stats.totalArticles - stats.publishedArticles} مسودة`}
          color="bg-[#1e3a5f]"
        />
        <StatCard
          icon={Briefcase}
          label="الخدمات"
          value={stats.totalServices}
          sub="خدمة قانونية معروضة"
          color="bg-indigo-500"
        />
        <StatCard
          icon={UserCheck}
          label="أعضاء الفريق"
          value={stats.totalTeam}
          sub="عضو في الفريق"
          color="bg-[#d4af37]"
        />
        <StatCard
          icon={Mail}
          label="الرسائل"
          value={stats.totalMessages}
          sub={stats.unreadMessages > 0 ? `${stats.unreadMessages} غير مقروءة` : 'جميعها مقروءة'}
          color="bg-green-500"
        />
      </div>

      {/* Secondary Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
        <StatCard icon={Star} label="التقييمات" value={stats.totalTestimonials} sub="شهادة عميل" color="bg-amber-500" />
        <StatCard icon={Image} label="المعرض" value={stats.totalGallery} sub="صورة" color="bg-pink-500" />
        <StatCard icon={Users} label="المستخدمون" value={stats.totalUsers} sub={`${stats.activeUsers} نشط`} color="bg-teal-500" />
        <StatCard icon={TrendingUp} label="المقالات المنشورة" value={`${publishedPct}%`} sub="نسبة النشر" color="bg-rose-500" />
      </div>

      {/* Content Overview + Recent Messages */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Content Overview */}
        <div className="bg-white rounded-2xl shadow-sm p-5">
          <h2 className="font-bold text-gray-700 mb-5 text-base flex items-center gap-2">
            <BarChart2 size={17} className="text-[#1e3a5f]" /> نظرة عامة على المحتوى
          </h2>
          <div className="space-y-4">
            <ProgressBar label="المقالات المنشورة" value={stats.publishedArticles} total={stats.totalArticles} color="#1e3a5f" />
            <ProgressBar label="الخدمات النشطة" value={stats.totalServices} total={Math.max(stats.totalServices, 6)} color="#6366f1" />
            <ProgressBar label="أعضاء الفريق" value={stats.totalTeam} total={Math.max(stats.totalTeam, 5)} color="#d4af37" />
            <ProgressBar label="التقييمات" value={stats.totalTestimonials} total={Math.max(stats.totalTestimonials, 5)} color="#f59e0b" />
          </div>
        </div>

        {/* Recent Activity */}
        <div className="bg-white rounded-2xl shadow-sm p-5">
          <h2 className="font-bold text-gray-700 mb-5 text-base flex items-center gap-2">
            <MessageSquare size={17} className="text-[#1e3a5f]" /> النشاط الأخير
          </h2>
          {stats.recentActivity.length === 0 ? (
            <p className="text-gray-400 text-sm text-center py-6">لا يوجد نشاط بعد</p>
          ) : (
            <ul className="space-y-3">
              {stats.recentActivity.map((item, i) => (
                <li key={i} className="flex items-center gap-3 text-sm text-gray-600 py-1 border-b border-gray-50 last:border-0">
                  <ActivityBadge type={item.type} />
                  <span className="flex-1 truncate">{item.label}</span>
                  {item.status && <StatusIcon status={item.status} />}
                  <span className="text-xs text-gray-400 shrink-0">{item.date}</span>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>

      {/* Quick Actions */}
      <div className="bg-white rounded-2xl shadow-sm p-5">
        <h2 className="font-bold text-gray-700 mb-4 text-base">الوصول السريع — إدارة الموقع</h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
          {QUICK_LINKS.map(({ to, icon: Icon, label, desc, color }) => (
            <Link
              key={to}
              to={to}
              className="flex items-center gap-3 p-3 bg-gray-50 hover:bg-gray-100 rounded-xl transition group border border-transparent hover:border-gray-200"
            >
              <div className={`w-9 h-9 rounded-lg flex items-center justify-center text-white shrink-0 ${color}`}>
                <Icon size={16} />
              </div>
              <div className="min-w-0">
                <p className="text-sm font-medium text-gray-700 truncate">{label}</p>
                <p className="text-xs text-gray-400 truncate hidden sm:block">{desc}</p>
              </div>
              <ArrowLeft size={12} className="text-gray-300 group-hover:text-gray-500 transition mr-auto shrink-0 hidden sm:block" />
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
