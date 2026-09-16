import React, { useRef, useEffect } from 'react';
import { Bell, BellOff, X } from 'lucide-react';

interface NotificationsPopoverProps {
  isOpen: boolean;
  onClose: () => void;
}

export const NotificationsPopover: React.FC<NotificationsPopoverProps> = ({
  isOpen,
  onClose,
}) => {
  const popoverRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleOutsideClick = (e: MouseEvent) => {
      if (popoverRef.current && !popoverRef.current.contains(e.target as Node)) {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleOutsideClick);
    }
    return () => {
      document.removeEventListener('mousedown', handleOutsideClick);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div
      ref={popoverRef}
      className="absolute right-0 top-full mt-2 w-80 sm:w-96 bg-white rounded-xl shadow-2xl border border-slate-200 z-50 overflow-hidden animate-in fade-in slide-in-from-top-2 duration-150"
    >
      <div className="flex items-center justify-between px-4 py-3 border-b border-slate-100 bg-slate-50/70">
        <div className="flex items-center gap-2">
          <Bell className="w-4 h-4 text-[#003B73]" />
          <h3 className="text-sm font-semibold text-slate-800">Notifications</h3>
        </div>
        <button
          type="button"
          onClick={onClose}
          className="p-1 text-slate-400 hover:text-slate-600 rounded transition-colors"
        >
          <X className="w-4 h-4" />
        </button>
      </div>

      <div className="p-6 text-center">
        <div className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center text-slate-400 mx-auto mb-2.5">
          <BellOff className="w-5 h-5 text-slate-500" />
        </div>
        <p className="text-sm font-semibold text-slate-700 mb-1">No notifications available</p>
        <p className="text-xs text-slate-500 leading-relaxed">
          Real-time alerts, submission updates, and workflow notifications will appear here once connected to the notification service.
        </p>
      </div>

      <div className="px-4 py-2.5 bg-slate-50 border-t border-slate-100 text-center">
        <span className="text-xs text-slate-400 font-medium">Notification service unconfigured</span>
      </div>
    </div>
  );
};
