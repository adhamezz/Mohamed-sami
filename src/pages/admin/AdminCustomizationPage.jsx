/**
 * AdminCustomizationPage.jsx
 * ---------------------------
 * Theme customization: dark mode toggle and color scheme picker.
 */
import { Palette } from 'lucide-react';
import ThemeCustomizer from '../../components/admin/ThemeCustomizer';

export default function AdminCustomizationPage() {
  return (
    <div className="space-y-6" dir="rtl">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-gray-800 flex items-center gap-2">
          <Palette size={22} className="text-[#1e3a5f]" /> تخصيص الواجهة
        </h1>
        <p className="text-gray-500 text-sm mt-1">
          اختر وضع العرض ونظام الألوان الذي يناسب علامتك التجارية.
        </p>
      </div>

      <ThemeCustomizer />
    </div>
  );
}
