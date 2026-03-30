/**
 * usePermission.js
 * -----------------
 * Checks whether the current user has a specific permission.
 * Usage: const canEdit = usePermission(PERMISSIONS.MANAGE_ARTICLES);
 */
import { useRole } from './useRole';
import { roleHasPermission } from '../utils/roleHelpers';

export function usePermission(permission) {
  const { role } = useRole();
  return roleHasPermission(role, permission);
}

/** Returns a function that checks any permission on-demand */
export function usePermissionChecker() {
  const { role } = useRole();
  return (permission) => roleHasPermission(role, permission);
}
