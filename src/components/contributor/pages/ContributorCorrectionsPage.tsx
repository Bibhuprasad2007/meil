import React, { useState } from 'react';
import { AlertTriangle, Clock, FileSearch, RotateCcw, Search } from 'lucide-react';
import { PageHeader } from '../../admin/common/PageHeader';
import { MetricCard } from '../../admin/common/MetricCard';
import { DataTableShell } from '../../admin/common/DataTableShell';

const CORRECTION_CATEGORY_OPTIONS = [
  { label: 'Data Discrepancy / Math Error', value: 'data_discrepancy' },
  { label: 'Missing Supporting Evidence', value: 'missing_evidence' },
  { label: 'Methodology / Standard Mismatch', value: 'methodology_mismatch' },
  { label: 'Unit Conversion Inconsistency', value: 'unit_error' },
  { label: 'Incomplete Boundary Coverage', value: 'incomplete_boundary' },
];

const CORRECTION_STATUS_OPTIONS = [
  { label: 'Correction Requested', value: 'requested' },
  { label: 'Draft in Progress', value: 'in_progress' },
  { label: 'Resubmitted for Review', value: 'resubmitted' },
  { label: 'Resolved & Approved', value: 'resolved' },
];

export const ContributorCorrectionsPage: React.FC = () => {
  const [searchValue, setSearchValue] = useState('');
  const [filterValues, setFilterValues] = useState<Record<string, string>>({});

  const handleFilterChange = (key: string, value: string) => {
    setFilterValues((prev) => ({ ...prev, [key]: value }));
  };

  const handleReset = () => {
    setSearchValue('');
    setFilterValues({});
  };

  return (
    <div className="space-y-6">
      <PageHeader
        title="Returned Corrections &amp; Action Items"
        description="Submissions returned by Reviewers requiring data clarification, methodology adjustment, or additional audit evidence."
      />

      {/* 4 KPI Metric Cards (all display '--') */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <MetricCard
          title="Correction Requested"
          value="--"
          icon={AlertTriangle}
          iconBg="bg-amber-50"
          iconColor="text-amber-600"
          accentBorder="border-l-amber-500"
        />
        <MetricCard
          title="Due Soon"
          value="--"
          icon={Clock}
          iconBg="bg-blue-50"
          iconColor="text-blue-600"
          accentBorder="border-l-blue-500"
        />
        <MetricCard
          title="Overdue Corrections"
          value="--"
          icon={AlertTriangle}
          iconBg="bg-rose-50"
          iconColor="text-rose-600"
          accentBorder="border-l-rose-500"
        />
        <MetricCard
          title="Resubmitted"
          value="--"
          icon={FileSearch}
          iconBg="bg-teal-50"
          iconColor="text-teal-700"
          accentBorder="border-l-teal-600"
        />
      </div>

      {/* Filter Bar */}
      <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-xs space-y-3">
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
          <div className="relative flex-1 min-w-[240px]">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
              <Search className="w-4 h-4" />
            </div>
            <input
              type="text"
              value={searchValue}
              onChange={(e) => setSearchValue(e.target.value)}
              placeholder="Search corrections by submission ID or disclosure…"
              className="w-full pl-9 pr-3 py-2 text-sm bg-slate-50 border border-slate-200 rounded-lg text-slate-700 placeholder-slate-400 focus:bg-white focus:outline-none focus:border-teal-700 transition-colors"
            />
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <select
              value={filterValues.category || ''}
              onChange={(e) => handleFilterChange('category', e.target.value)}
              className="px-3 py-2 text-xs font-medium text-slate-700 bg-slate-50 border border-slate-200 rounded-lg focus:bg-white focus:border-teal-700"
            >
              <option value="">All Categories</option>
              {CORRECTION_CATEGORY_OPTIONS.map((opt) => (
                <option key={opt.value} value={opt.value}>
                  {opt.label}
                </option>
              ))}
            </select>

            <select
              value={filterValues.status || ''}
              onChange={(e) => handleFilterChange('status', e.target.value)}
              className="px-3 py-2 text-xs font-medium text-slate-700 bg-slate-50 border border-slate-200 rounded-lg focus:bg-white focus:border-teal-700"
            >
              <option value="">All Statuses</option>
              {CORRECTION_STATUS_OPTIONS.map((opt) => (
                <option key={opt.value} value={opt.value}>
                  {opt.label}
                </option>
              ))}
            </select>

            {(searchValue || Object.values(filterValues).some(Boolean)) && (
              <button
                type="button"
                onClick={handleReset}
                title="Reset filters"
                className="p-2 text-slate-500 hover:text-slate-800 hover:bg-slate-100 rounded-lg border border-slate-200 transition-colors"
              >
                <RotateCcw className="w-4 h-4" />
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Corrections Table (Starts Empty) */}
      <DataTableShell
        columns={[
          'Submission ID',
          'Disclosure',
          'Scope',
          'Reviewer Comment',
          'Correction Category',
          'Returned On',
          'Correction Due Date',
          'Status',
          { header: 'Actions', align: 'center' },
        ]}
        emptyIcon={AlertTriangle}
        emptyTitle="No correction requests are available."
        emptyDescription="Submissions returned by a Reviewer will appear here."
      />
    </div>
  );
};
