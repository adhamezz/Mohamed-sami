/**
 * UIContext.jsx
 * --------------
 * Provides Dark Mode / Light Mode toggle and color scheme selection.
 */
import { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { saveColorMode, loadColorMode, saveColorScheme, loadColorScheme, getThemeById } from '../utils/themes';

const UIContext = createContext(null);

export function UIProvider({ children }) {
  const [colorMode, setColorMode] = useState(() => loadColorMode());
  const [colorSchemeId, setColorSchemeId] = useState(() => loadColorScheme());

  const theme = getThemeById(colorSchemeId);
  const isDark = colorMode === 'dark';

  // Apply dark class to document root
  useEffect(() => {
    if (isDark) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDark]);

  const toggleColorMode = useCallback(() => {
    setColorMode(prev => {
      const next = prev === 'dark' ? 'light' : 'dark';
      saveColorMode(next);
      return next;
    });
  }, []);

  const changeColorScheme = useCallback((id) => {
    setColorSchemeId(id);
    saveColorScheme(id);
  }, []);

  return (
    <UIContext.Provider value={{ colorMode, isDark, toggleColorMode, theme, colorSchemeId, changeColorScheme }}>
      {children}
    </UIContext.Provider>
  );
}

export function useUI() {
  const ctx = useContext(UIContext);
  if (!ctx) throw new Error('useUI must be used inside UIProvider');
  return ctx;
}
