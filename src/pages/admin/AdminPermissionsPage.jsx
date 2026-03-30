/**
 * AdminPermissionsPage.jsx
 * -------------------------
 * Displays the full permissions matrix — which roles have which permissions.
 */
import { Shield, Info } from 'lucide-react';
import PermissionsManager from '../../components/admin/PermissionsManager';

export default function AdminPermissionsPage() {
  return (
    <div className="space-y-6" dir="rtl">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-gray-800 flex items-center gap-2">
          <Shield size={22} className="text-[#1e3a5f]" /> مصفوفة الصلاحيات
        </h1>
        <p className="text-gray-500 text-sm mt-1">
          نظرة عامة على صلاحيات كل دور. يمكن تعديل الأدوار المخصصة مباشرة.
        </p>
      </div>

      {/* Info Banner */}
      <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 flex gap-3 text-sm text-blue-800">
        <Info size={16} className="shrink-0 mt-0.5" />
        <span>
          الأدوار المدمجة (Super Admin, Admin, Editor, Viewer) للقراءة فقط في هذه الشاشة.
          لتعديل الأدوار المخصصة انقر على أيقونة التعديل في <strong>صفحة إدارة الأدوار</strong>، أو فعّل/ألغِ الصلاحيات مباشرة في الجدول أدناه.
        </span>
      </div>

      {/* Permissions Matrix */}
      <PermissionsManager />
    </div>
  );
}
