import React from 'react';
import {
  LayoutDashboard,
  ClipboardList,
  FileSearch,
  AlertTriangle,
  FileCheck2,
  History,
  Settings,
} from 'lucide-react';

export interface NavigationItem {
  name: string;
  path: string;
  icon: React.ComponentType<{ className?: string }>;
  badge?: string;
}

export const REVIEWER_NAV_ITEMS: NavigationItem[] = [
  { name: 'Dashboard', path: '/reviewer/dashboard', icon: LayoutDashboard },
  { name: 'Review Queue', path: '/reviewer/review-queue', icon: ClipboardList },
  { name: 'Submission Detail', path: '/reviewer/submission-detail', icon: FileSearch },
  { name: 'Validation Issues', path: '/reviewer/validation-issues', icon: AlertTriangle },
  { name: 'Evidence Review', path: '/reviewer/evidence-review', icon: FileCheck2 },
  { name: 'Activity History', path: '/reviewer/activity-history', icon: History },
  { name: 'Settings', path: '/reviewer/settings', icon: Settings },
];
