/**
 * roleHelpers.js
 * ---------------
 * Utility functions for role & permission management.
 */
import { DEFAULT_ROLES } from './permissions';

const ROLES_STORAGE_KEY = 'cms_roles';

/** Load roles from localStorage, merging with defaults */
export function loadRoles() {
  try {
    const stored = localStorage.getItem(ROLES_STORAGE_KEY);
    if (stored) {
      const parsed = JSON.parse(stored);
      if (Array.isArray(parsed) && parsed.length > 0) return parsed;
    }
  } catch {
    // ignore
  }
  return DEFAULT_ROLES;
}

/** Persist roles to localStorage */
export function saveRoles(roles) {
  localStorage.setItem(ROLES_STORAGE_KEY, JSON.stringify(roles));
}

/** Check if a role has a specific permission */
export function roleHasPermission(role, permission) {
  if (!role) return false;
  return Array.isArray(role.permissions) && role.permissions.includes(permission);
}

/** Get a role object by its id from a list */
export function getRoleById(roles, roleId) {
  return roles.find(r => r.id === roleId) || null;
}

/** Generate a unique id for a new role */
export function generateRoleId() {
  return 'role_' + Date.now().toString(36);
}
