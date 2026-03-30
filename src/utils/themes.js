/**
 * themes.js
 * ----------
 * Predefined color themes and theme persistence helpers.
 */

const THEME_STORAGE_KEY = 'cms_ui_theme';
const COLOR_STORAGE_KEY = 'cms_color_scheme';

export const PRESET_THEMES = [
  {
    id: 'navy',
    name: 'Navy Blue (افتراضي)',
    primary: '#1e3a5f',
    accent: '#d4af37',
    sidebar: '#1e3a5f',
  },
  {
    id: 'emerald',
    name: 'Emerald Green',
    primary: '#065f46',
    accent: '#fbbf24',
    sidebar: '#065f46',
  },
  {
    id: 'indigo',
    name: 'Indigo',
    primary: '#3730a3',
    accent: '#f59e0b',
    sidebar: '#312e81',
  },
  {
    id: 'rose',
    name: 'Rose Red',
    primary: '#9f1239',
    accent: '#d4af37',
    sidebar: '#881337',
  },
  {
    id: 'slate',
    name: 'Slate Gray',
    primary: '#334155',
    accent: '#38bdf8',
    sidebar: '#1e293b',
  },
];

/** Save dark/light mode preference */
export function saveColorMode(mode) {
  localStorage.setItem(THEME_STORAGE_KEY, mode);
}

/** Load saved color mode ('light' | 'dark') */
export function loadColorMode() {
  return localStorage.getItem(THEME_STORAGE_KEY) || 'light';
}

/** Save selected color scheme */
export function saveColorScheme(themeId) {
  localStorage.setItem(COLOR_STORAGE_KEY, themeId);
}

/** Load saved color scheme id */
export function loadColorScheme() {
  return localStorage.getItem(COLOR_STORAGE_KEY) || 'navy';
}

/** Get theme object by id */
export function getThemeById(id) {
  return PRESET_THEMES.find(t => t.id === id) || PRESET_THEMES[0];
}
