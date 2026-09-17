import React, { useState } from 'react';
import { Paperclip, RotateCcw, Search } from 'lucide-react';
import { PageHeader } from '../../admin/common/PageHeader';
import { DataTableShell } from '../../admin/common/DataTableShell';

const EVIDENCE_TYPE_OPTIONS = [
  { label: 'Utility Bill (Power/Water)', value: 'utility_bill' },
  { label: 'Flow Meter Log', value: 'meter_log' },
  { label: 'Third-Party Lab / Audit Report', value: 'audit_report' },
  { label: 'Policy / SOP Document', value: 'policy' },
  { label: 'Board / Committee Resolution', value: 'board_res' },
  { label: 'Compliance Certificate (ISO)', value: 'certificate' },
];

const VERIFICATION_STATUS_OPTIONS = [
  { label: 'Pending Reviewer Verification', value: 'pending' },
  { label: 'Verified & Approved', value: 'verified' },
  { label: 'Flagged / Clarification Requested', value: 'flagged' },
];

export const ContributorEvidencePage: React.FC = () => {
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
        title="Supporting Evidence Repository"
        description="Search, view, and manage supporting verification documents attached to your assigned BRSR disclosures."
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
              placeholder="Search by document title or linked disclosure…"
              className="w-full pl-9 pr-3 py-2 text-sm bg-slate-50 border border-slate-200 rounded-lg text-slate-700 placeholder-slate-400 focus:bg-white focus:outline-none focus:border-teal-700 transition-colors"
            />
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <select
              value={filterValues.evidenceType || ''}
              onChange={(e) => handleFilterChange('evidenceType', e.target.value)}
              className="px-3 py-2 text-xs font-medium text-slate-700 bg-slate-50 border border-slate-200 rounded-lg focus:bg-white focus:border-teal-700"
            >
              <option value="">All Evidence Types</option>
              {EVIDENCE_TYPE_OPTIONS.map((opt) => (
                <option key={opt.value} value={opt.value}>
                  {opt.label}
                </option>
              ))}
            </select>

            <select
              value={filterValues.verificationStatus || ''}
              onChange={(e) => handleFilterChange('verificationStatus', e.target.value)}
              className="px-3 py-2 text-xs font-medium text-slate-700 bg-slate-50 border border-slate-200 rounded-lg focus:bg-white focus:border-teal-700"
            >
              <option value="">All Verification Statuses</option>
              {VERIFICATION_STATUS_OPTIONS.map((opt) => (
                <option key={opt.value} value={opt.value}>
                  {opt.label}
                </option>
              ))}
            </select>

            <input
              type="date"
              value={filterValues.uploadDate || ''}
              onChange={(e) => handleFilterChange('uploadDate', e.target.value)}
              title="Upload Date"
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

      {/* Evidence Table (Starts Empty) */}
      <DataTableShell
        columns={[
          'Document',
          'Evidence Type',
          'Linked Disclosure',
          'Scope',
          'Reporting Period',
          'Uploaded On',
          'Verification Status',
          { header: 'Actions', align: 'center' },
        ]}
        emptyIcon={Paperclip}
        emptyTitle="No evidence files are available."
        emptyDescription="Evidence attached to your assigned submissions will appear here."
      />
    </div>
  );
};
