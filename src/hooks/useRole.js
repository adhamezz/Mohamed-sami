/**
 * useRole.js
 * -----------
 * Returns the current logged-in admin's role object from RoleContext.
 */
import { useAuth } from '../context/AuthContext';
import { useRoles } from '../context/RoleContext';
import { getRoleById } from '../utils/roleHelpers';

export function useRole() {
  const { admin } = useAuth();
  const { roles } = useRoles();
  const roleId = admin?.role || 'viewer';
  const role = getRoleById(roles, roleId);
  return { role, roleId };
}
