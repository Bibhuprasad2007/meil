import React from 'react';
import {
  LayoutDashboard,
  Building2,
  Users,
  CalendarClock,
  Layers,
  ClipboardList,
  Activity,
  AlertTriangle,
  FileCheck2,
  CheckSquare,
  Settings,
} from 'lucide-react';

export interface NavigationItem {
  name: string;
  path: string;
  icon: React.ComponentType<{ className?: string }>;
  badge?: string;
}

export const ADMIN_NAV_ITEMS: NavigationItem[] = [
  { name: 'Dashboard', path: '/admin/dashboard', icon: LayoutDashboard },
  { name: 'Organization Structure', path: '/admin/organization', icon: Building2 },
  { name: 'Users & Roles', path: '/admin/users', icon: Users },
  { name: 'Reporting Cycle', path: '/admin/reporting-cycle', icon: CalendarClock },
  { name: 'BRSR Framework', path: '/admin/brsr-framework', icon: Layers },
  { name: 'Task Assignment', path: '/admin/task-assignment', icon: ClipboardList },
  { name: 'Submission Monitor', path: '/admin/submission-monitor', icon: Activity },
  { name: 'Validation & Exceptions', path: '/admin/validation', icon: AlertTriangle },
  { name: 'Evidence & Audit', path: '/admin/evidence-audit', icon: FileCheck2 },
  { name: 'Report Readiness', path: '/admin/report-readiness', icon: CheckSquare },
  { name: 'Settings', path: '/admin/settings', icon: Settings },
];
