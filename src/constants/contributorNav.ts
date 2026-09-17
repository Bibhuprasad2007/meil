import React from 'react';
import {
  LayoutDashboard,
  ClipboardList,
  UploadCloud,
  Paperclip,
  AlertTriangle,
  Send,
  History,
} from 'lucide-react';

export interface ContributorNavigationItem {
  name: string;
  path: string;
  icon: React.ComponentType<{ className?: string }>;
  badge?: string;
}

export const CONTRIBUTOR_NAV_ITEMS: ContributorNavigationItem[] = [
  { name: 'Dashboard', path: '/contributor/dashboard', icon: LayoutDashboard },
  { name: 'My Assignments', path: '/contributor/assignments', icon: ClipboardList },
  { name: 'Bulk Data Upload', path: '/contributor/bulk-upload', icon: UploadCloud },
  { name: 'Evidence', path: '/contributor/evidence', icon: Paperclip },
  { name: 'Corrections', path: '/contributor/corrections', icon: AlertTriangle },
  { name: 'My Submissions', path: '/contributor/submissions', icon: Send },
  { name: 'My Activity', path: '/contributor/activity', icon: History },
];
