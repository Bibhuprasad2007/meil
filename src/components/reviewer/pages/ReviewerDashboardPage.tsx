import React from 'react';
import {
  ClipboardList,
  CheckCircle2,
  Clock,
  AlertTriangle,
  FileCheck2,
  XCircle,
  BarChart3,
  TrendingUp,
  Calendar,
  Activity,
  PieChart,
  FileSearch,
} from 'lucide-react';
import { PageHeader } from '../../admin/common/PageHeader';
import { MetricCard } from '../../admin/common/MetricCard';
import { EmptyState } from '../../admin/common/EmptyState';

export const ReviewerDashboardPage: React.FC = () => {
  return (
    <div className="space-y-8">
      {/* Page Header */}
      <PageHeader
        title="Reviewer Dashboard"
        description="Overview of assigned review queue, pending approvals, validation flags, and review activity across MEIL BRSR reporting entities."
      />

      {/* 8 Summary Metrics (All show '--' with tooltip) */}
      <div>
        <h2 className="text-sm font-semibold text-slate-700 uppercase tracking-wider mb-4">
          Review Performance Indicators
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <MetricCard
            title="Assigned for Review"
            value="--"
            icon={ClipboardList}
            iconBg="bg-sky-50"
            iconColor="text-sky-600"
            accentBorder="border-l-sky-500"
          />
          <MetricCard
            title="Pending Approval"
            value="--"
            icon={Clock}
            iconBg="bg-amber-50"
            iconColor="text-amber-600"
            accentBorder="border-l-amber-500"
          />
          <MetricCard
            title="Approved Submissions"
            value="--"
            icon={CheckCircle2}
            iconBg="bg-emerald-50"
            iconColor="text-emerald-600"
            accentBorder="border-l-emerald-500"
          />
          <MetricCard
            title="Corrections Requested"
            value="--"
            icon={AlertTriangle}
            iconBg="bg-orange-50"
            iconColor="text-orange-600"
            accentBorder="border-l-orange-500"
          />
          <MetricCard
            title="Rejected Submissions"
            value="--"
            icon={XCircle}
            iconBg="bg-rose-50"
            iconColor="text-rose-600"
            accentBorder="border-l-rose-500"
          />
          <MetricCard
            title="Validation Flags"
            value="--"
            icon={AlertTriangle}
            iconBg="bg-red-50"
            iconColor="text-red-600"
            accentBorder="border-l-[#E31E24]"
          />
          <MetricCard
            title="Evidence Documents"
            value="--"
            icon={FileCheck2}
            iconBg="bg-indigo-50"
            iconColor="text-indigo-600"
            accentBorder="border-l-indigo-500"
          />
          <MetricCard
            title="Resubmissions"
            value="--"
            icon={FileSearch}
            iconBg="bg-purple-50"
            iconColor="text-purple-600"
            accentBorder="border-l-purple-500"
          />
        </div>
      </div>

      {/* Analytical Panels Grid */}
      <div>
        <h2 className="text-sm font-semibold text-slate-700 uppercase tracking-wider mb-4">
          Review Analytics &amp; Workflow Panels
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {/* Panel 1: Review Status Distribution */}
          <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-xs flex flex-col justify-between">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100 mb-4">
              <h3 className="text-sm font-bold text-slate-800">Review Status Distribution</h3>
              <PieChart className="w-4 h-4 text-slate-400" />
            </div>
            <EmptyState
              icon={PieChart}
              title="No Review Data"
              description="Status breakdown of assigned reviews (Awaiting, Under Review, Approved, Rejected) will render when submissions are assigned."
              compact
            />
          </div>

          {/* Panel 2: Section A/B/C Review Progress */}
          <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-xs flex flex-col justify-between">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100 mb-4">
              <h3 className="text-sm font-bold text-slate-800">Section A/B/C Review Progress</h3>
              <BarChart3 className="w-4 h-4 text-slate-400" />
            </div>
            <EmptyState
              icon={BarChart3}
              title="No Section Progress"
              description="Completion rate per BRSR section will display once assigned submissions are reviewed."
              compact
            />
          </div>

          {/* Panel 3: Principles P1-P9 Review Coverage */}
          <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-xs flex flex-col justify-between">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100 mb-4">
              <h3 className="text-sm font-bold text-slate-800">Principles P1-P9 Coverage</h3>
              <BarChart3 className="w-4 h-4 text-slate-400" />
            </div>
            <EmptyState
              icon={BarChart3}
              title="No Principle Data"
              description="Review coverage across Principles 1 through 9 will appear here when disclosure assignments are active."
              compact
            />
          </div>

          {/* Panel 4: Upcoming Review Deadlines */}
          <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-xs flex flex-col justify-between">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100 mb-4">
              <h3 className="text-sm font-bold text-slate-800">Upcoming Review Deadlines</h3>
              <Calendar className="w-4 h-4 text-slate-400" />
            </div>
            <EmptyState
              icon={Calendar}
              title="No Scheduled Deadlines"
              description="Review milestones and approval deadlines will display here for active reporting cycles."
              compact
            />
          </div>

          {/* Panel 5: Validation Exception Trend */}
          <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-xs flex flex-col justify-between">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100 mb-4">
              <h3 className="text-sm font-bold text-slate-800">Validation Exception Trend</h3>
              <TrendingUp className="w-4 h-4 text-slate-400" />
            </div>
            <EmptyState
              icon={TrendingUp}
              title="No Validation Exceptions"
              description="Trends of data validation issues flagged during review will be plotted after backend integration."
              compact
            />
          </div>

          {/* Panel 6: Recent Review Activity */}
          <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-xs flex flex-col justify-between">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100 mb-4">
              <h3 className="text-sm font-bold text-slate-800">Recent Review Activity</h3>
              <Activity className="w-4 h-4 text-slate-400" />
            </div>
            <EmptyState
              icon={Activity}
              title="No Activity Logged"
              description="Review decisions, comments, approval actions, and correction requests will stream into this activity feed."
              compact
            />
          </div>
        </div>
      </div>
    </div>
  );
};
