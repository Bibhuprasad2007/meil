import React from 'react';
import {
  LayoutDashboard,
  ClipboardList,
  Clock,
  RotateCcw,
  FileCheck2,
  AlertOctagon,
  Award,
  GitBranch,
  History,
  Bell,
} from 'lucide-react';

export interface NavigationItem {
  name: string;
  path: string;
  icon: React.ComponentType<{ className?: string }>;
  badgeKey?: 'pending' | 'corrections' | 'anomalies' | 'notifications';
}

export const REVIEWER_NAV_ITEMS: NavigationItem[] = [
  { name: 'Dashboard', path: '/reviewer/dashboard', icon: LayoutDashboard },
  { name: 'Review Queue', path: '/reviewer/review-queue', icon: ClipboardList },
  { name: 'Pending Reviews', path: '/reviewer/pending-reviews', icon: Clock, badgeKey: 'pending' },
  { name: 'Corrections', path: '/reviewer/corrections', icon: RotateCcw, badgeKey: 'corrections' },
  { name: 'Evidence', path: '/reviewer/evidence', icon: FileCheck2 },
  { name: 'Anomalies', path: '/reviewer/anomalies', icon: AlertOctagon, badgeKey: 'anomalies' },
  { name: 'BRSR Core', path: '/reviewer/brsr-core', icon: Award },
  { name: 'Data Lineage', path: '/reviewer/data-lineage', icon: GitBranch },
  { name: 'Review History', path: '/reviewer/review-history', icon: History },
  { name: 'Notifications', path: '/reviewer/notifications', icon: Bell, badgeKey: 'notifications' },
];
