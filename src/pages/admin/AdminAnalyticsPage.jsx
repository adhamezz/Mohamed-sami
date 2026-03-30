/**
 * AdminAnalyticsPage.jsx
 * -----------------------
 * صفحة الإحصائيات وتحليل المحتوى
 */
import { useState, useEffect } from 'react';
import {
  BarChart2, FileText, Briefcase, Star, Image, Users,
  Mail, UserCheck, TrendingUp, Eye, MessageSquare,
  ArrowUp, ArrowDown, RefreshCw,
} from 'lucide-react';
import {
  dashboardService,
  articlesService,
  cmsServicesService,
  cmsTeamService,
  cmsGalleryService,
  cmsTestimonialsService,
  cmsMessagesService,
  usersService,
} from '../../services/adminService';

function StatBox({ icon: Icon, label, value, sub, color, trend }) {
  return (
    <div className="bg-white rounded-2xl shadow-sm p-5">
      <div className="flex items-start justify-between mb-3">
        <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${color}`}>
          <Icon size={18} className="text-white" />
        </div>
        {trend !== undefined && (
          <span className={`flex items-center gap-1 text-xs font-medium px-2 py-1 rounded-full
            ${trend >= 0 ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
            {trend >= 0 ? <ArrowUp size={10} /> : <ArrowDown size={10} />}
            {Math.abs(trend)}%
          </span>
        )}
      </div>
      <p className="text-2xl font-bold text-gray-800">{value ?? 0}</p>
      <p className="text-sm text-gray-500 mt-0.5">{label}</p>
      {sub && <p className="text-xs text-[#1e3a5f] mt-1 font-medium">{sub}</p>}
    </div>
  );
}

function BarRow({ label, value, max, color }) {
  const pct = max > 0 ? Math.round((value / max) * 100) : 0;
  return (
    <div className="flex items-center gap-3">
      <span className="text-sm text-gray-600 w-32 shrink-0 truncate">{label}</span>
      <div className="flex-1 h-2.5 bg-gray-100 rounded-full overflow-hidden">
        <div className="h-full rounded-full transition-all duration-500" style={{ width: `${pct}%`, backgroundColor: color }} />
      </div>
      <span className="text-sm font-medium text-gray-700 w-6 text-left shrink-0">{value}</span>
    </div>
  );
}

function SectionHeader({ icon: Icon, title }) {
  return (
    <h2 className="font-bold text-gray-700 mb-4 text-base flex items-center gap-2">
      <Icon size={17} className="text-[#1e3a5f]" /> {title}
    </h2>
  );
}

export default function AdminAnalyticsPage() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  const loadData = () => {
    setLoading(true);
    try {
      const stats = dashboardService.getStats();
      const articles = articlesService.getAll();
      const services = cmsServicesService.getAll();
      const team = cmsTeamService.getAll();
      const gallery = cmsGalleryService.getAll();
      const testimonials = cmsTestimonialsService.getAll();
      const messages = cmsMessagesService.getAll();
      const users = usersService.getAll();

      // Articles by category
      const byCategory = articles.reduce((acc, a) => {
        const cat = a.category || 'غير محدد';
        acc[cat] = (acc[cat] || 0) + 1;
        return acc;
      }, {});

      // Articles by status
      const published = articles.filter(a => a.status === 'published').length;
      const drafts = articles.filter(a => a.status === 'draft').length;

      // Messages by month
      const msgByMonth = messages.reduce((acc, m) => {
        const month = (m.date || '').slice(0, 7);
        if (month) acc[month] = (acc[month] || 0) + 1;
        return acc;
      }, {});

      // Users by role
      const usersByRole = users.reduce((acc, u) => {
        acc[u.role || 'user'] = (acc[u.role || 'user'] || 0) + 1;
        return acc;
      }, {});

      // Testimonials average rating
      const avgRating = testimonials.length
        ? (testimonials.reduce((sum, t) => sum + (Number(t.rating) || 5), 0) / testimonials.length).toFixed(1)
        : '0';

      setData({
        stats,
        articles,
        services,
        team,
        gallery,
        testimonials,
        messages,
        users,
        byCategory,
        published,
        drafts,
        msgByMonth,
        usersByRole,
        avgRating,
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="w-8 h-8 border-4 border-[#1e3a5f] border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  const maxCatVal = Math.max(...Object.values(data.byCategory || {}), 1);
  const maxMsgVal = Math.max(...Object.values(data.msgByMonth || {}), 1);
  const sortedMonths = Object.entries(data.msgByMonth || {}).sort((a, b) => a[0].localeCompare(b[0])).slice(-6);

  return (
    <div className="space-y-6" dir="rtl">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">الإحصائيات والتحليلات</h1>
          <p className="text-sm text-gray-500 mt-1">نظرة شاملة على محتوى الموقع والتفاعل</p>
        </div>
        <button onClick={loadData}
          className="flex items-center gap-2 text-sm text-gray-600 border border-gray-300 rounded-lg px-3 py-2 hover:bg-gray-50 transition">
          <RefreshCw size={15} /> تحديث
        </button>
      </div>

      {/* Main Stats */}
      <div className="grid grid-cols-2 sm:grid-cols-3 xl:grid-cols-4 gap-4">
        <StatBox icon={FileText} label="إجمالي المقالات" value={data.stats.totalArticles}
          sub={`${data.published} منشور · ${data.drafts} مسودة`} color="bg-[#1e3a5f]" />
        <StatBox icon={Briefcase} label="الخدمات" value={data.stats.totalServices}
          sub="خدمة قانونية" color="bg-indigo-500" />
        <StatBox icon={UserCheck} label="الفريق" value={data.stats.totalTeam}
          sub="عضو" color="bg-[#d4af37]" />
        <StatBox icon={Mail} label="الرسائل" value={data.stats.totalMessages}
          sub={`${data.stats.unreadMessages} غير مقروءة`} color="bg-green-500" />
        <StatBox icon={Star} label="التقييمات" value={data.stats.totalTestimonials}
          sub={`متوسط: ${data.avgRating} ⭐`} color="bg-amber-500" />
        <StatBox icon={Image} label="المعرض" value={data.stats.totalGallery}
          sub="صورة" color="bg-pink-500" />
        <StatBox icon={Users} label="المستخدمون" value={data.stats.totalUsers}
          sub={`${data.stats.activeUsers} نشط`} color="bg-teal-500" />
        <StatBox icon={TrendingUp} label="نسبة النشر"
          value={data.stats.totalArticles > 0 ? `${Math.round((data.published / data.stats.totalArticles) * 100)}%` : '0%'}
          sub="من المقالات منشورة" color="bg-rose-500" />
      </div>

      {/* Content Breakdown */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Articles by Category */}
        <div className="bg-white rounded-2xl shadow-sm p-5">
          <SectionHeader icon={FileText} title="المقالات حسب التصنيف" />
          {Object.keys(data.byCategory).length === 0 ? (
            <p className="text-gray-400 text-sm text-center py-8">لا توجد مقالات بعد</p>
          ) : (
            <div className="space-y-3">
              {Object.entries(data.byCategory)
                .sort((a, b) => b[1] - a[1])
                .map(([cat, count]) => (
                  <BarRow key={cat} label={cat} value={count} max={maxCatVal} color="#1e3a5f" />
                ))}
            </div>
          )}
        </div>

        {/* Articles Status Distribution */}
        <div className="bg-white rounded-2xl shadow-sm p-5">
          <SectionHeader icon={BarChart2} title="توزيع حالة المقالات" />
          <div className="space-y-4">
            <div className="flex items-center justify-between p-3 bg-green-50 rounded-xl">
              <div className="flex items-center gap-3">
                <div className="w-3 h-3 rounded-full bg-green-500" />
                <span className="text-sm text-gray-700">منشورة</span>
              </div>
              <span className="text-lg font-bold text-green-700">{data.published}</span>
            </div>
            <div className="flex items-center justify-between p-3 bg-yellow-50 rounded-xl">
              <div className="flex items-center gap-3">
                <div className="w-3 h-3 rounded-full bg-yellow-500" />
                <span className="text-sm text-gray-700">مسودات</span>
              </div>
              <span className="text-lg font-bold text-yellow-700">{data.drafts}</span>
            </div>
            <div className="flex items-center justify-between p-3 bg-blue-50 rounded-xl">
              <div className="flex items-center gap-3">
                <div className="w-3 h-3 rounded-full bg-blue-500" />
                <span className="text-sm text-gray-700">الإجمالي</span>
              </div>
              <span className="text-lg font-bold text-blue-700">{data.articles.length}</span>
            </div>
            {data.stats.totalArticles > 0 && (
              <div className="mt-2">
                <div className="flex justify-between text-xs text-gray-500 mb-1">
                  <span>نسبة النشر</span>
                  <span>{Math.round((data.published / data.stats.totalArticles) * 100)}%</span>
                </div>
                <div className="h-3 bg-gray-100 rounded-full overflow-hidden">
                  <div className="h-full bg-green-500 rounded-full transition-all"
                    style={{ width: `${Math.round((data.published / data.stats.totalArticles) * 100)}%` }} />
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Messages & Users */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Messages by Month */}
        <div className="bg-white rounded-2xl shadow-sm p-5">
          <SectionHeader icon={MessageSquare} title="الرسائل الأخيرة (آخر 6 أشهر)" />
          {sortedMonths.length === 0 ? (
            <p className="text-gray-400 text-sm text-center py-8">لا توجد رسائل بعد</p>
          ) : (
            <div className="space-y-3">
              {sortedMonths.map(([month, count]) => (
                <BarRow key={month} label={month} value={count} max={maxMsgVal} color="#10b981" />
              ))}
            </div>
          )}
        </div>

        {/* Users by Role */}
        <div className="bg-white rounded-2xl shadow-sm p-5">
          <SectionHeader icon={Users} title="المستخدمون حسب الدور" />
          {Object.keys(data.usersByRole).length === 0 ? (
            <p className="text-gray-400 text-sm text-center py-8">لا يوجد مستخدمون</p>
          ) : (
            <div className="space-y-3">
              {Object.entries(data.usersByRole).map(([role, count]) => {
                const labels = { admin: 'مدير', moderator: 'مشرف', user: 'مستخدم' };
                return (
                  <BarRow key={role} label={labels[role] || role} value={count}
                    max={Math.max(...Object.values(data.usersByRole))} color="#6366f1" />
                );
              })}
            </div>
          )}

          {/* Active vs Inactive */}
          <div className="mt-5 pt-4 border-t">
            <p className="text-sm font-medium text-gray-600 mb-3">الحالة</p>
            <div className="flex gap-3">
              <div className="flex-1 bg-green-50 rounded-xl p-3 text-center">
                <p className="text-xl font-bold text-green-700">{data.stats.activeUsers}</p>
                <p className="text-xs text-gray-500">نشط</p>
              </div>
              <div className="flex-1 bg-gray-50 rounded-xl p-3 text-center">
                <p className="text-xl font-bold text-gray-600">{data.stats.totalUsers - data.stats.activeUsers}</p>
                <p className="text-xs text-gray-500">غير نشط</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Recent Articles Table */}
      {data.articles.length > 0 && (
        <div className="bg-white rounded-2xl shadow-sm p-5">
          <SectionHeader icon={FileText} title="آخر المقالات" />
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b">
                  <th className="text-right py-2 px-3 text-gray-500 font-medium">العنوان</th>
                  <th className="text-right py-2 px-3 text-gray-500 font-medium hidden sm:table-cell">التصنيف</th>
                  <th className="text-right py-2 px-3 text-gray-500 font-medium">الحالة</th>
                  <th className="text-right py-2 px-3 text-gray-500 font-medium hidden sm:table-cell">التاريخ</th>
                </tr>
              </thead>
              <tbody>
                {data.articles.slice(-8).reverse().map(a => (
                  <tr key={a.id} className="border-b last:border-0 hover:bg-gray-50">
                    <td className="py-2.5 px-3 font-medium text-gray-700 max-w-xs truncate">{a.title}</td>
                    <td className="py-2.5 px-3 text-gray-500 hidden sm:table-cell">{a.category || '—'}</td>
                    <td className="py-2.5 px-3">
                      <span className={`text-xs px-2 py-0.5 rounded-full font-medium
                        ${a.status === 'published' ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'}`}>
                        {a.status === 'published' ? 'منشور' : 'مسودة'}
                      </span>
                    </td>
                    <td className="py-2.5 px-3 text-gray-400 hidden sm:table-cell">{a.date}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}
