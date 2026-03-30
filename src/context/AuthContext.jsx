/**
 * AuthContext.jsx
 * -----------------
 * React Context for admin authentication state.
 * Manages login/logout and persists session to localStorage.
 *
 * To integrate with a real backend, replace the localStorage logic
 * in `login()` with an API call:
 *   const response = await fetch('/api/admin/login', {
 *     method: 'POST',
 *     body: JSON.stringify({ email, password }),
 *   });
 *   const data = await response.json();
 *   if (data.token) { ... store token ... }
 */
import { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext(null);

// Default admin credentials – replace with real auth in production
const ADMIN_EMAIL = 'admin@example.com';
const ADMIN_PASSWORD = 'admin123';
const STORAGE_KEY = 'adminSession';

export function AuthProvider({ children }) {
  const [admin, setAdmin] = useState(null);
  const [loading, setLoading] = useState(true);

  // Restore session from localStorage on mount
  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      try {
        setAdmin(JSON.parse(stored));
      } catch {
        localStorage.removeItem(STORAGE_KEY);
      }
    }
    setLoading(false);
  }, []);

  /**
   * login() – Validates credentials and creates a session.
   * Replace the credential check with a real API call later.
   * @returns {{ success: boolean, error?: string }}
   */
  const login = (email, password) => {
    // TODO: Replace with real API: POST /api/admin/login
    if (email === ADMIN_EMAIL && password === ADMIN_PASSWORD) {
      const session = { email, name: 'Admin', role: 'admin' };
      localStorage.setItem(STORAGE_KEY, JSON.stringify(session));
      setAdmin(session);
      return { success: true };
    }
    return { success: false, error: 'بيانات الدخول غير صحيحة' };
  };

  /** logout() – Clears the admin session. */
  const logout = () => {
    localStorage.removeItem(STORAGE_KEY);
    setAdmin(null);
  };

  return (
    <AuthContext.Provider value={{ admin, loading, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

/** useAuth() – Hook for consuming AuthContext. */
export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used inside AuthProvider');
  return ctx;
}
