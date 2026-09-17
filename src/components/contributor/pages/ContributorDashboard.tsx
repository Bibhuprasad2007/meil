import React from 'react';
import { useNavigate } from 'react-router-dom';
import {
  ClipboardList,
  Clock,
  FileEdit,
  AlertTriangle,
  Send,
  Calendar,
  Activity,
  CheckCircle2,
  UploadCloud,
  BarChart3,
  PieChart,
  TrendingUp,
  AlertCircle,
} from 'lucide-react';
import { PageHeader } from '../../admin/common/PageHeader';
import { MetricCard } from '../../admin/common/MetricCard';
import { EmptyState } from '../../admin/common/EmptyState';

export const ContributorDashboard: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="space-y-8">
      {/* Page Header */}
      <PageHeader
        title="Contributor Dashboard"
        description="Overview of assigned BRSR reporting tasks, data entry progress, pending deadlines, and returned corrections."
      />

      {/* Quick Action Navigation Bar */}
      <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-xs flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-2 text-xs font-bold text-slate-700 uppercase tracking-wider">
          <span>Quick Actions</span>
        </div>
        <div className="flex flex-wrap items-center gap-2">
          <button
            type="button"
            onClick={() => navigate('/contributor/assignments')}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-teal-800 bg-teal-50 hover:bg-teal-100 border border-teal-200 rounded-lg transition-colors"
          >
            <ClipboardList className="w-3.5 h-3.5 text-teal-700" />
            <span>Open My Assignments</span>
          </button>
          <button
            type="button"
            onClick={() => navigate('/contributor/corrections')}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-amber-800 bg-amber-50 hover:bg-amber-100 border border-amber-200 rounded-lg transition-colors"
          >
            <AlertTriangle className="w-3.5 h-3.5 text-amber-600" />
            <span>View Corrections</span>
          </button>
          <button
            type="button"
            onClick={() => navigate('/contributor/bulk-upload')}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-sky-800 bg-sky-50 hover:bg-sky-100 border border-sky-200 rounded-lg transition-colors"
          >
            <UploadCloud className="w-3.5 h-3.5 text-sky-600" />
            <span>Open Bulk Upload</span>
          </button>
          <button
            type="button"
            onClick={() => navigate('/contributor/submissions')}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-lg transition-colors"
          >
            <Send className="w-3.5 h-3.5 text-slate-600" />
            <span>View My Submissions</span>
          </button>
        </div>
      </div>

      {/* 7 KPI Metric Cards — all display '--' */}
      <div>
        <h2 className="text-sm font-semibold text-slate-700 uppercase tracking-wider mb-4">
          Assignment Metrics
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <MetricCard
            title="Total Assignments"
            value="--"
            icon={ClipboardList}
            iconBg="bg-teal-50"
            iconColor="text-teal-700"
            accentBorder="border-l-teal-600"
          />
          <MetricCard
            title="Not Started"
            value="--"
            icon={Clock}
            iconBg="bg-slate-50"
            iconColor="text-slate-500"
            accentBorder="border-l-slate-400"
          />
          <MetricCard
            title="Drafts"
            value="--"
            icon={FileEdit}
            iconBg="bg-blue-50"
            iconColor="text-blue-600"
            accentBorder="border-l-blue-500"
          />
          <MetricCard
            title="Due Soon"
            value="--"
            icon={Calendar}
            iconBg="bg-amber-50"
            iconColor="text-amber-600"
            accentBorder="border-l-amber-500"
          />
          <MetricCard
            title="Overdue"
            value="--"
            icon={AlertCircle}
            iconBg="bg-rose-50"
            iconColor="text-rose-600"
            accentBorder="border-l-rose-500"
          />
          <MetricCard
            title="Returned for Correction"
            value="--"
            icon={AlertTriangle}
            iconBg="bg-orange-50"
            iconColor="text-orange-600"
            accentBorder="border-l-orange-500"
          />
          <MetricCard
            title="Submitted"
            value="--"
            icon={CheckCircle2}
            iconBg="bg-emerald-50"
            iconColor="text-emerald-600"
            accentBorder="border-l-emerald-500"
          />
        </div>
      </div>

      {/* Analytical & Dashboard Panels Grid */}
      <div>
        <h2 className="text-sm font-semibold text-slate-700 uppercase tracking-wider mb-4">
          Reporting Progress &amp; Activity
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {/* Panel 1: Assignment Progress */}
          <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-xs flex flex-col justify-between">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100 mb-4">
              <h3 className="text-sm font-bold text-slate-800">Assignment Progress</h3>
              <PieChart className="w-4 h-4 text-slate-400" />
            </div>
            <EmptyState
              icon={PieChart}
              title="No assignments are available."
              description="Reporting tasks assigned by the ESG Admin will appear here."
              compact
            />
          </div>

          {/* Panel 2: Upcoming Deadlines */}
          <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-xs flex flex-col justify-between">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100 mb-4">
              <h3 className="text-sm font-bold text-slate-800">Upcoming Deadlines</h3>
              <Calendar className="w-4 h-4 text-slate-400" />
            </div>
            <EmptyState
              icon={Calendar}
              title="No Upcoming Deadlines"
              description="Milestones and due dates for your assigned reporting scope will display here."
              compact
            />
          </div>

          {/* Panel 3: Tasks by BRSR Section */}
          <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-xs flex flex-col justify-between">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100 mb-4">
              <h3 className="text-sm font-bold text-slate-800">Tasks by BRSR Section</h3>
              <BarChart3 className="w-4 h-4 text-slate-400" />
            </div>
            <EmptyState
              icon={BarChart3}
              title="No Section Tasks"
              description="Disclosures across Section A, Section B, and Section C will be summarized here."
              compact
            />
          </div>

          {/* Panel 4: Data-Quality Issues */}
          <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-xs flex flex-col justify-between">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100 mb-4">
              <h3 className="text-sm font-bold text-slate-800">Data-Quality Issues</h3>
              <TrendingUp className="w-4 h-4 text-slate-400" />
            </div>
            <EmptyState
              icon={TrendingUp}
              title="No Quality Flags"
              description="Automated validation anomalies or threshold exceptions will display here."
              compact
            />
          </div>

          {/* Panel 5: Returned Corrections */}
          <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-xs flex flex-col justify-between">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100 mb-4">
              <h3 className="text-sm font-bold text-slate-800">Returned Corrections</h3>
              <AlertTriangle className="w-4 h-4 text-slate-400" />
            </div>
            <EmptyState
              icon={AlertTriangle}
              title="No Returned Submissions"
              description="Submissions returned by a Reviewer with requested corrections will appear here."
              compact
            />
          </div>

          {/* Panel 6: Recent Contributor Activity */}
          <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-xs flex flex-col justify-between">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100 mb-4">
              <h3 className="text-sm font-bold text-slate-800">Recent Contributor Activity</h3>
              <Activity className="w-4 h-4 text-slate-400" />
            </div>
            <EmptyState
              icon={Activity}
              title="No Recent Activity"
              description="Your data entry saves, evidence uploads, and submissions will stream into this activity feed."
              compact
            />
          </div>
        </div>
      </div>
    </div>
  );
};
