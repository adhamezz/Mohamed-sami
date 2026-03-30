/**
 * RoleContext.jsx
 * ----------------
 * Provides RBAC (Role-Based Access Control) state to the app.
 * Manages the list of roles/permissions and the current user's role.
 */
import { createContext, useContext, useState, useCallback } from 'react';
import { DEFAULT_ROLES } from '../utils/permissions';
import { loadRoles, saveRoles, generateRoleId } from '../utils/roleHelpers';

const RoleContext = createContext(null);

export function RoleProvider({ children }) {
  const [roles, setRoles] = useState(() => loadRoles());

  /** Add a new custom role */
  const addRole = useCallback((roleData) => {
    const newRole = { ...roleData, id: generateRoleId(), isBuiltIn: false };
    setRoles(prev => {
      const next = [...prev, newRole];
      saveRoles(next);
      return next;
    });
    return newRole;
  }, []);

  /** Update an existing role (cannot rename id of built-in) */
  const updateRole = useCallback((roleId, updates) => {
    setRoles(prev => {
      const next = prev.map(r => r.id === roleId ? { ...r, ...updates } : r);
      saveRoles(next);
      return next;
    });
  }, []);

  /** Delete a custom role */
  const deleteRole = useCallback((roleId) => {
    setRoles(prev => {
      const role = prev.find(r => r.id === roleId);
      if (role?.isBuiltIn) return prev; // cannot delete built-in roles
      const next = prev.filter(r => r.id !== roleId);
      saveRoles(next);
      return next;
    });
  }, []);

  /** Reset all roles to defaults */
  const resetRoles = useCallback(() => {
    setRoles(DEFAULT_ROLES);
    saveRoles(DEFAULT_ROLES);
  }, []);

  return (
    <RoleContext.Provider value={{ roles, addRole, updateRole, deleteRole, resetRoles }}>
      {children}
    </RoleContext.Provider>
  );
}

export function useRoles() {
  const ctx = useContext(RoleContext);
  if (!ctx) throw new Error('useRoles must be used inside RoleProvider');
  return ctx;
}
