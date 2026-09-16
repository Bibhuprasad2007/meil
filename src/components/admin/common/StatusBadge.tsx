import React from 'react';

export type StatusVariant =
  | 'draft'
  | 'active'
  | 'pending'
  | 'submitted'
  | 'approved'
  | 'locked'
  | 'rejected'
  | 'warning'
  | 'error'
  | 'neutral';

interface StatusBadgeProps {
  label: string;
  variant?: StatusVariant;
  size?: 'sm' | 'md';
}

export const StatusBadge: React.FC<StatusBadgeProps> = ({
  label,
  variant = 'neutral',
  size = 'sm',
}) => {
  const getColors = () => {
    switch (variant) {
      case 'active':
      case 'approved':
        return 'bg-emerald-50 text-emerald-700 border-emerald-200';
      case 'submitted':
      case 'pending':
        return 'bg-sky-50 text-sky-700 border-sky-200';
      case 'locked':
        return 'bg-slate-100 text-slate-700 border-slate-300';
      case 'rejected':
      case 'error':
        return 'bg-rose-50 text-rose-700 border-rose-200';
      case 'warning':
        return 'bg-amber-50 text-amber-700 border-amber-200';
      case 'draft':
      case 'neutral':
      default:
        return 'bg-slate-100 text-slate-600 border-slate-200';
    }
  };

  const sizeClasses = size === 'sm' ? 'text-xs px-2.5 py-0.5' : 'text-sm px-3 py-1';

  return (
    <span
      className={`inline-flex items-center font-medium border rounded-full capitalize select-none ${getColors()} ${sizeClasses}`}
    >
      {label}
    </span>
  );
};
