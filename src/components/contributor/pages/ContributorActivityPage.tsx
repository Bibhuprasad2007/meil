import React, { useState } from 'react';
import { History, RotateCcw, Search } from 'lucide-react';
import { PageHeader } from '../../admin/common/PageHeader';
import { DataTableShell } from '../../admin/common/DataTableShell';

const ACTIVITY_TYPE_OPTIONS = [
  { label: 'Draft Saved', value: 'draft_saved' },
  { label: 'Validation Check Executed', value: 'validation_run' },
  { label: 'Evidence File Uploaded', value: 'evidence_uploaded' },
  { label: 'Submitted for Review', value: 'submitted' },
  { label: 'Correction Resubmitted', value: 'resubmitted' },
  { label: 'Comment Added', value: 'comment_added' },
];

export const ContributorActivityPage: React.FC = () => {
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
        title="My Activity &amp; Audit Trail"
        description="Immutable audit trail of all data entry changes, draft updates, evidence attachments, and submission transactions."
      />

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
              placeholder="Search by Action, Assignment ID, or Disclosure…"
              className="w-full pl-9 pr-3 py-2 text-sm bg-slate-50 border border-slate-200 rounded-lg text-slate-700 placeholder-slate-400 focus:bg-white focus:outline-none focus:border-teal-700 transition-colors"
            />
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <select
              value={filterValues.activityType || ''}
              onChange={(e) => handleFilterChange('activityType', e.target.value)}
              className="px-3 py-2 text-xs font-medium text-slate-700 bg-slate-50 border border-slate-200 rounded-lg focus:bg-white focus:border-teal-700"
            >
              <option value="">All Activity Types</option>
              {ACTIVITY_TYPE_OPTIONS.map((opt) => (
                <option key={opt.value} value={opt.value}>
                  {opt.label}
                </option>
              ))}
            </select>

            <input
              type="date"
              value={filterValues.startDate || ''}
              onChange={(e) => handleFilterChange('startDate', e.target.value)}
              title="Start Date"
              className="px-3 py-2 text-xs font-medium text-slate-700 bg-slate-50 border border-slate-200 rounded-lg focus:bg-white focus:border-teal-700"
            />

            <input
              type="date"
              value={filterValues.endDate || ''}
              onChange={(e) => handleFilterChange('endDate', e.target.value)}
              title="End Date"
              className="px-3 py-2 text-xs font-medium text-slate-700 bg-slate-50 border border-slate-200 rounded-lg focus:bg-white focus:border-teal-700"
            />

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

      {/* Activity Table (Starts Empty) */}
      <DataTableShell
        columns={[
          'Date & Time',
          'Action',
          'Assignment / Submission',
          'Disclosure',
          'Scope',
          'Result',
          'Details',
        ]}
        emptyIcon={History}
        emptyTitle="No Contributor activity is available."
        emptyDescription="Your saved and submitted actions will appear here after backend integration."
      />
    </div>
  );
};
