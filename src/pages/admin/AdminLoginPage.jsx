/**
 * AdminLoginPage.jsx
 * -------------------
 * Admin login form with email/password validation.
 * Uses AuthContext to authenticate and redirect on success.
 *
 * Default credentials (change in AuthContext.jsx or replace with real API):
 *   Email:    admin@example.com
 *   Password: admin123
 */
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { Eye, EyeOff, Lock, Mail } from 'lucide-react';

export default function AdminLoginPage() {
  const { login } = useAuth();
  const navigate = useNavigate();

  const [form, setForm] = useState({ email: '', password: '' });
  const [showPwd, setShowPwd] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));
    setError('');
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.email || !form.password) {
      setError('يرجى تعبئة جميع الحقول');
      return;
    }
    setLoading(true);
    // Simulate async delay
    setTimeout(() => {
      const result = login(form.email, form.password);
      if (result.success) {
        navigate('/admin/dashboard', { replace: true });
      } else {
        setError(result.error || 'خطأ في تسجيل الدخول');
      }
      setLoading(false);
    }, 600);
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center bg-[#1e3a5f] font-cairo"
      dir="rtl"
    >
      {/* Card */}
      <div className="w-full max-w-md bg-white rounded-3xl shadow-2xl overflow-hidden">
        {/* Header */}
        <div className="bg-[#1e3a5f] px-8 py-8 text-center">
          <div className="w-16 h-16 bg-[#d4af37] rounded-full flex items-center justify-center mx-auto mb-4">
            <Lock size={28} className="text-[#1e3a5f]" />
          </div>
          <h1 className="text-white text-2xl font-bold">لوحة الإدارة</h1>
          <p className="text-white/60 text-sm mt-1">محمد سامي — مستشار قانوني</p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="px-8 py-8 space-y-5" noValidate>
          {/* Email */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">
              البريد الإلكتروني
            </label>
            <div className="relative">
              <Mail size={16} className="absolute top-1/2 right-3 -translate-y-1/2 text-gray-400" />
              <input
                type="email"
                name="email"
                value={form.email}
                onChange={handleChange}
                placeholder="admin@example.com"
                className="w-full pr-9 pl-4 py-2.5 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#1e3a5f]/30 focus:border-[#1e3a5f] text-sm"
                required
                autoComplete="username"
              />
            </div>
          </div>

          {/* Password */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">
              كلمة المرور
            </label>
            <div className="relative">
              <Lock size={16} className="absolute top-1/2 right-3 -translate-y-1/2 text-gray-400" />
              <input
                type={showPwd ? 'text' : 'password'}
                name="password"
                value={form.password}
                onChange={handleChange}
                placeholder="••••••••"
                className="w-full pr-9 pl-10 py-2.5 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#1e3a5f]/30 focus:border-[#1e3a5f] text-sm"
                required
                autoComplete="current-password"
              />
              <button
                type="button"
                onClick={() => setShowPwd(v => !v)}
                className="absolute top-1/2 left-3 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                aria-label="إظهار/إخفاء كلمة المرور"
              >
                {showPwd ? <EyeOff size={16} /> : <Eye size={16} />}
              </button>
            </div>
          </div>

          {/* Error */}
          {error && (
            <p className="text-red-600 text-sm bg-red-50 border border-red-200 rounded-lg px-3 py-2">
              {error}
            </p>
          )}

          {/* Demo hint */}
          <p className="text-xs text-gray-400 text-center">
            بيانات تجريبية: admin@example.com / admin123
          </p>

          {/* Submit */}
          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 bg-[#1e3a5f] text-white rounded-xl font-semibold hover:bg-[#15294a] transition flex items-center justify-center gap-2 disabled:opacity-60"
          >
            {loading && (
              <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
            )}
            {loading ? 'جارٍ الدخول...' : 'تسجيل الدخول'}
          </button>
        </form>
      </div>
    </div>
  );
}
