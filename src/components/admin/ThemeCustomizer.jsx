/**
 * ThemeCustomizer.jsx
 * --------------------
 * Panel for selecting preset color themes and dark/light mode.
 */
import { Sun, Moon, Palette, Check } from 'lucide-react';
import { useUI } from '../../context/UIContext';
import { PRESET_THEMES } from '../../utils/themes';

export default function ThemeCustomizer() {
  const { isDark, toggleColorMode, colorSchemeId, changeColorScheme, theme } = useUI();

  return (
    <div className="space-y-6">
      {/* Dark / Light Toggle */}
      <div className="bg-white rounded-2xl shadow-sm p-5">
        <h3 className="font-semibold text-gray-800 mb-4 flex items-center gap-2">
          <Palette size={16} /> وضع العرض
        </h3>
        <div className="flex gap-3">
          <button
            onClick={() => isDark && toggleColorMode()}
            className={`flex-1 flex items-center justify-center gap-2 py-3 rounded-xl border-2 transition text-sm font-medium ${
              !isDark ? 'border-[#1e3a5f] bg-[#1e3a5f]/5 text-[#1e3a5f]' : 'border-gray-200 text-gray-500 hover:border-gray-300'
            }`}
          >
            <Sun size={16} /> الوضع الفاتح
          </button>
          <button
            onClick={() => !isDark && toggleColorMode()}
            className={`flex-1 flex items-center justify-center gap-2 py-3 rounded-xl border-2 transition text-sm font-medium ${
              isDark ? 'border-[#1e3a5f] bg-[#1e3a5f]/5 text-[#1e3a5f]' : 'border-gray-200 text-gray-500 hover:border-gray-300'
            }`}
          >
            <Moon size={16} /> الوضع الداكن
          </button>
        </div>
      </div>

      {/* Color Scheme */}
      <div className="bg-white rounded-2xl shadow-sm p-5">
        <h3 className="font-semibold text-gray-800 mb-4 flex items-center gap-2">
          <Palette size={16} /> نظام الألوان
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {PRESET_THEMES.map(t => (
            <button
              key={t.id}
              onClick={() => changeColorScheme(t.id)}
              className={`flex items-center gap-3 p-3 rounded-xl border-2 transition ${
                colorSchemeId === t.id ? 'border-[#1e3a5f]' : 'border-gray-200 hover:border-gray-300'
              }`}
            >
              {/* Color preview */}
              <div className="flex gap-1 shrink-0">
                <div className="w-6 h-6 rounded-lg" style={{ backgroundColor: t.primary }} />
                <div className="w-6 h-6 rounded-lg" style={{ backgroundColor: t.accent }} />
              </div>
              <span className="text-sm text-gray-700 flex-1 text-right">{t.name}</span>
              {colorSchemeId === t.id && <Check size={14} className="text-[#1e3a5f] shrink-0" />}
            </button>
          ))}
        </div>
      </div>

      {/* Current Theme Preview */}
      <div className="bg-white rounded-2xl shadow-sm p-5">
        <h3 className="font-semibold text-gray-800 mb-4">معاينة النظام الحالي</h3>
        <div className="flex gap-3">
          <div className="rounded-xl p-4 flex-1 text-white text-sm font-medium" style={{ backgroundColor: theme.primary }}>
            اللون الأساسي
          </div>
          <div className="rounded-xl p-4 flex-1 text-sm font-medium" style={{ backgroundColor: theme.accent, color: theme.primary }}>
            لون التمييز
          </div>
        </div>
        <p className="text-xs text-gray-400 mt-3">
          * يُطبَّق تخصيص الألوان على الشريط الجانبي وعناصر الواجهة الإدارية.
        </p>
      </div>
    </div>
  );
}
