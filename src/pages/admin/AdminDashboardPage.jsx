/**
 * AdminDashboardPage.jsx
 * -----------------------
 * Overview page showing summary statistics and recent activity.
 *
 * Data source: dashboardService (localStorage)
 * TODO: Replace dashboardService.getStats() with: GET /api/dashboard/stats
 */
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FileText, Users, CheckCircle, Activity, ArrowLeft } from 'lucide-react';
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

export default function AdminDashboardPage() {
  const [stats, setStats] = useState(null);

  useEffect(() => {
    // TODO: Replace with: const stats = await fetch('/api/dashboard/stats').then(r => r.json());
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
        <p className="text-gray-500 text-sm mt-1">مرحباً بك، إليك ملخص حالة الموقع</p>
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
          icon={CheckCircle}
          label="مقالات منشورة"
          value={stats.publishedArticles}
          color="bg-green-500"
        />
        <StatCard
          icon={Users}
          label="إجمالي المستخدمين"
          value={stats.totalUsers}
          sub={`${stats.activeUsers} نشط`}
          color="bg-[#d4af37]"
        />
        <StatCard
          icon={Activity}
          label="مستخدمون نشطون"
          value={stats.activeUsers}
          color="bg-indigo-500"
        />
      </div>

      {/* Quick Actions + Recent Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Quick Actions */}
        <div className="bg-white rounded-2xl shadow-sm p-5">
          <h2 className="font-bold text-gray-700 mb-4 text-base">إجراءات سريعة</h2>
          <div className="space-y-3">
            <Link
              to="/admin/articles"
              className="flex items-center justify-between p-3 bg-[#1e3a5f]/5 hover:bg-[#1e3a5f]/10 rounded-xl transition group"
            >
              <div className="flex items-center gap-3">
                <FileText size={18} className="text-[#1e3a5f]" />
                <span className="text-sm font-medium text-gray-700">إدارة المقالات</span>
              </div>
              <ArrowLeft size={16} className="text-gray-400 group-hover:text-[#1e3a5f] transition" />
            </Link>
            <Link
              to="/admin/users"
              className="flex items-center justify-between p-3 bg-[#1e3a5f]/5 hover:bg-[#1e3a5f]/10 rounded-xl transition group"
            >
              <div className="flex items-center gap-3">
                <Users size={18} className="text-[#1e3a5f]" />
                <span className="text-sm font-medium text-gray-700">إدارة المستخدمين</span>
              </div>
              <ArrowLeft size={16} className="text-gray-400 group-hover:text-[#1e3a5f] transition" />
            </Link>
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
    </div>
  );
}
