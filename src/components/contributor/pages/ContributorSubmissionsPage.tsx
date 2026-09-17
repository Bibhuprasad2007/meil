import React, { useState } from 'react';
import { Send, RotateCcw, Search } from 'lucide-react';
import { PageHeader } from '../../admin/common/PageHeader';
import { DataTableShell } from '../../admin/common/DataTableShell';

const SUBMISSION_STATUS_OPTIONS = [
  { label: 'Submitted', value: 'submitted' },
  { label: 'Under Review', value: 'under_review' },
  { label: 'Correction Requested', value: 'correction_requested' },
  { label: 'Resubmitted', value: 'resubmitted' },
  { label: 'Approved', value: 'approved' },
  { label: 'Rejected', value: 'rejected' },
];

const BRSR_SECTION_OPTIONS = [
  { label: 'Section A — General Disclosures', value: 'section_a' },
  { label: 'Section B — Management & Process', value: 'section_b' },
  { label: 'Section C — Principle-wise Performance', value: 'section_c' },
];

export const ContributorSubmissionsPage: React.FC = () => {
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
        title="My Submissions Monitor"
        description="Track the verification status, validation reports, and reviewer approvals for all your submitted BRSR disclosure packages."
      />

      {/* Filters Bar */}
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
              placeholder="Search by submission ID or disclosure…"
              className="w-full pl-9 pr-3 py-2 text-sm bg-slate-50 border border-slate-200 rounded-lg text-slate-700 placeholder-slate-400 focus:bg-white focus:outline-none focus:border-teal-700 transition-colors"
            />
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <select
              value={filterValues.status || ''}
              onChange={(e) => handleFilterChange('status', e.target.value)}
              className="px-3 py-2 text-xs font-medium text-slate-700 bg-slate-50 border border-slate-200 rounded-lg focus:bg-white focus:border-teal-700"
            >
              <option value="">All Review Statuses</option>
              {SUBMISSION_STATUS_OPTIONS.map((opt) => (
                <option key={opt.value} value={opt.value}>
                  {opt.label}
                </option>
              ))}
            </select>

            <select
              value={filterValues.section || ''}
              onChange={(e) => handleFilterChange('section', e.target.value)}
              className="px-3 py-2 text-xs font-medium text-slate-700 bg-slate-50 border border-slate-200 rounded-lg focus:bg-white focus:border-teal-700"
            >
              <option value="">All BRSR Sections</option>
              {BRSR_SECTION_OPTIONS.map((opt) => (
                <option key={opt.value} value={opt.value}>
                  {opt.label}
                </option>
              ))}
            </select>

            <input
              type="date"
              value={filterValues.submittedDate || ''}
              onChange={(e) => handleFilterChange('submittedDate', e.target.value)}
              title="Submission Date"
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

      {/* Submissions Table (Starts Empty) */}
      <DataTableShell
        columns={[
          'Submission ID',
          'Disclosure',
          'Scope',
          'Reporting Period',
          'Submitted On',
          'Validation Status',
          'Review Status',
          'Last Updated',
          { header: 'Actions', align: 'center' },
        ]}
        emptyIcon={Send}
        emptyTitle="No submissions are available."
        emptyDescription="Assignments submitted for review will appear here."
      />
    </div>
  );
};
