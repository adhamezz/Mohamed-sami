/**
 * PermissionsManager.jsx
 * -----------------------
 * Interactive grid showing which roles have which permissions.
 * Allows quick inline toggles for non-built-in roles.
 */
import { Shield, Check, X } from 'lucide-react';
import { PERMISSION_GROUPS, PERMISSION_LABELS } from '../../utils/permissions';
import { useRoles } from '../../context/RoleContext';

export default function PermissionsManager() {
  const { roles, updateRole } = useRoles();

  const togglePerm = (role, perm) => {
    if (role.isBuiltIn) return; // built-in roles are read-only in this grid
    const has = role.permissions.includes(perm);
    const next = has
      ? role.permissions.filter(p => p !== perm)
      : [...role.permissions, perm];
    updateRole(role.id, { permissions: next });
  };

  return (
    <div className="overflow-x-auto rounded-2xl border border-gray-200 bg-white shadow-sm">
      <table className="w-full text-sm" dir="rtl">
        <thead>
          <tr className="bg-gray-50 border-b border-gray-200">
            <th className="text-right px-4 py-3 font-semibold text-gray-700 w-52">الصلاحية</th>
            {roles.map(role => (
              <th key={role.id} className="px-3 py-3 text-center min-w-[90px]">
                <div className="flex flex-col items-center gap-1">
                  <span
                    className="text-xs font-bold px-2 py-0.5 rounded-full text-white"
                    style={{ backgroundColor: role.color }}
                  >
                    {role.nameAr}
                  </span>
                  {role.isBuiltIn && (
                    <span className="text-[10px] text-gray-400">مدمج</span>
                  )}
                </div>
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {PERMISSION_GROUPS.map(group => (
            <>
              <tr key={group.label} className="bg-blue-50/50">
                <td colSpan={roles.length + 1} className="px-4 py-2">
                  <span className="text-xs font-semibold text-[#1e3a5f] uppercase tracking-wide flex items-center gap-1">
                    <Shield size={11} /> {group.label}
                  </span>
                </td>
              </tr>
              {group.permissions.map(perm => (
                <tr key={perm} className="border-b border-gray-100 hover:bg-gray-50/50 transition">
                  <td className="px-4 py-2.5 text-gray-700">{PERMISSION_LABELS[perm]}</td>
                  {roles.map(role => {
                    const has = role.permissions.includes(perm);
                    return (
                      <td key={role.id} className="px-3 py-2.5 text-center">
                        {role.isBuiltIn ? (
                          <span className={`inline-flex items-center justify-center w-6 h-6 rounded-full ${has ? 'bg-green-100 text-green-600' : 'bg-gray-100 text-gray-400'}`}>
                            {has ? <Check size={12} /> : <X size={12} />}
                          </span>
                        ) : (
                          <button
                            onClick={() => togglePerm(role, perm)}
                            className={`inline-flex items-center justify-center w-6 h-6 rounded-full transition ${has ? 'bg-green-100 text-green-600 hover:bg-green-200' : 'bg-gray-100 text-gray-400 hover:bg-gray-200'}`}
                          >
                            {has ? <Check size={12} /> : <X size={12} />}
                          </button>
                        )}
                      </td>
                    );
                  })}
                </tr>
              ))}
            </>
          ))}
        </tbody>
      </table>
    </div>
  );
}
