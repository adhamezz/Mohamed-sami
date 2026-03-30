/**
 * AdminMessagesPage.jsx
 * ----------------------
 * View and manage contact form submissions stored in localStorage.
 */
import { useState, useEffect } from 'react';
import { Trash2, Mail, Phone, ChevronDown, ChevronUp, RefreshCw, MailOpen } from 'lucide-react';
import { cmsMessagesService } from '../../services/adminService';
import Toast from '../../components/admin/Toast';
import ConfirmDialog from '../../components/admin/ConfirmDialog';

const SUBJECT_MAP = {
  criminal: 'قضايا جنائية',
  family: 'أحوال شخصية',
  commercial: 'قضايا تجارية',
  labor: 'قضايا عمالية',
  contracts: 'صياغة عقود',
  company: 'تأسيس شركات',
  other: 'أخرى',
};

function MessageCard({ msg, idx, onDelete, onMarkRead }) {
  const [open, setOpen] = useState(false);

  return (
    <div className={`bg-white rounded-2xl shadow-sm border ${msg.read ? 'border-gray-100' : 'border-[#1e3a5f]/20'}`}>
      <div
        className="flex items-center gap-4 p-4 cursor-pointer select-none"
        onClick={() => { setOpen(o => !o); if (!msg.read) onMarkRead(idx); }}
      >
        <div className={`w-9 h-9 rounded-full flex items-center justify-center shrink-0 ${msg.read ? 'bg-gray-100 text-gray-400' : 'bg-[#1e3a5f]/10 text-[#1e3a5f]'}`}>
          {msg.read ? <MailOpen size={16} /> : <Mail size={16} />}
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 flex-wrap">
            <p className={`font-semibold text-gray-800 truncate ${!msg.read ? 'text-[#1e3a5f]' : ''}`}>{msg.name}</p>
            {!msg.read && (
              <span className="text-xs bg-[#1e3a5f] text-white px-2 py-0.5 rounded-full">جديد</span>
            )}
          </div>
          <p className="text-sm text-gray-500 truncate">{msg.email}</p>
        </div>
        <div className="text-left shrink-0">
          {msg.subject && (
            <span className="text-xs bg-blue-100 text-blue-700 px-2 py-0.5 rounded-full block mb-1 text-center">
              {SUBJECT_MAP[msg.subject] || msg.subject}
            </span>
          )}
          <p className="text-xs text-gray-400 text-center">
            {msg.date ? new Date(msg.date).toLocaleDateString('ar-EG') : ''}
          </p>
        </div>
        <button className="text-gray-400 shrink-0">
          {open ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
        </button>
      </div>

      {open && (
        <div className="border-t border-gray-100 p-4 space-y-3">
          {msg.phone && (
            <div className="flex items-center gap-2 text-sm text-gray-600">
              <Phone size={14} className="text-gray-400" />
              <span dir="ltr">{msg.phone}</span>
            </div>
          )}
          <div className="bg-gray-50 rounded-xl p-3 text-sm text-gray-700 whitespace-pre-wrap">{msg.message}</div>
          <div className="flex gap-2 justify-end">
            <a href={`mailto:${msg.email}?subject=رد على استفسارك`}
              className="btn-secondary text-sm flex items-center gap-2">
              <Mail size={14} /> رد بالبريد
            </a>
            <button onClick={() => onDelete(idx)}
              className="flex items-center gap-2 px-3 py-2 rounded-lg text-red-500 hover:bg-red-50 transition text-sm">
              <Trash2 size={14} /> حذف
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default function AdminMessagesPage() {
  const [messages, setMessages] = useState([]);
  const [toast, setToast] = useState(null);
  const [confirmDelete, setConfirmDelete] = useState(null);

  const refresh = () => setMessages(cmsMessagesService.getAll());

  useEffect(() => { refresh(); }, []);

  const handleDelete = (idx) => {
    cmsMessagesService.delete(idx);
    refresh();
    setConfirmDelete(null);
    setToast({ type: 'success', message: 'تم حذف الرسالة' });
  };

  const handleMarkRead = (idx) => {
    cmsMessagesService.markRead(idx);
    refresh();
  };

  const unread = messages.filter(m => !m.read).length;

  return (
    <div className="space-y-6" dir="rtl">
      <Toast toast={toast} onClose={() => setToast(null)} />
      <ConfirmDialog
        open={confirmDelete !== null}
        title="حذف الرسالة"
        message="هل تريد حذف هذه الرسالة نهائياً؟"
        onConfirm={() => handleDelete(confirmDelete)}
        onCancel={() => setConfirmDelete(null)}
      />

      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">رسائل التواصل</h1>
          <p className="text-sm text-gray-500 mt-1">
            {messages.length} رسالة {unread > 0 && <span className="text-[#1e3a5f] font-semibold">({unread} غير مقروءة)</span>}
          </p>
        </div>
        <button onClick={refresh} className="btn-secondary flex items-center gap-2">
          <RefreshCw size={15} /> تحديث
        </button>
      </div>

      {messages.length === 0 ? (
        <div className="bg-white rounded-2xl shadow-sm p-10 text-center text-gray-400">
          <Mail size={40} className="mx-auto mb-3 opacity-30" />
          <p>لا توجد رسائل بعد</p>
        </div>
      ) : (
        <div className="space-y-3">
          {[...messages].reverse().map((msg, i) => (
            <MessageCard
              key={i}
              msg={msg}
              idx={messages.length - 1 - i}
              onDelete={(idx) => setConfirmDelete(idx)}
              onMarkRead={handleMarkRead}
            />
          ))}
        </div>
      )}
    </div>
  );
}
