import React, { useState } from 'react';
import { FileCheck2 } from 'lucide-react';
import { PageHeader } from '../../admin/common/PageHeader';
import { FilterBar } from '../../admin/common/FilterBar';
import { DataTableShell } from '../../admin/common/DataTableShell';

const VERIFICATION_STATUS_OPTIONS = [
  { label: 'Pending Verification', value: 'pending' },
  { label: 'Verified', value: 'verified' },
  { label: 'Flagged', value: 'flagged' },
];

const EVIDENCE_TYPE_OPTIONS = [
  { label: 'Certificate', value: 'certificate' },
  { label: 'Audit Report', value: 'audit_report' },
  { label: 'Invoice / Receipt', value: 'invoice' },
  { label: 'Policy Document', value: 'policy' },
  { label: 'Photograph', value: 'photograph' },
  { label: 'Third-Party Assessment', value: 'third_party' },
  { label: 'Government Filing', value: 'government_filing' },
  { label: 'Other', value: 'other' },
];

const FILE_FORMAT_OPTIONS = [
  { label: 'PDF', value: 'pdf' },
  { label: 'Excel (XLSX)', value: 'xlsx' },
  { label: 'Image (JPG/PNG)', value: 'image' },
  { label: 'Word (DOCX)', value: 'docx' },
  { label: 'CSV', value: 'csv' },
];

export const EvidenceReviewPage: React.FC = () => {
  const [searchValue, setSearchValue] = useState('');
  const [filterValues, setFilterValues] = useState<Record<string, string>>({});

  const handleFilterChange = (key: string, value: string) => {
    setFilterValues((prev) => ({ ...prev, [key]: value }));
  };

  const handleResetFilters = () => {
    setSearchValue('');
    setFilterValues({});
  };

  return (
    <div className="space-y-6">
      <PageHeader
        title="Evidence Review"
        description="Review supporting evidence documents uploaded by data contributors. Verify authenticity, flag discrepancies, and track verification status."
      />

      <FilterBar
        searchPlaceholder="Search by document name, uploader, or disclosure…"
        searchValue={searchValue}
        onSearchChange={setSearchValue}
        filters={[
          {
            label: 'Verification Status',
            value: 'verificationStatus',
            options: VERIFICATION_STATUS_OPTIONS,
            placeholder: 'All Statuses',
          },
          {
            label: 'Evidence Type',
            value: 'evidenceType',
            options: EVIDENCE_TYPE_OPTIONS,
            placeholder: 'All Types',
          },
          {
            label: 'File Format',
            value: 'fileFormat',
            options: FILE_FORMAT_OPTIONS,
            placeholder: 'All Formats',
          },
        ]}
        onFilterChange={handleFilterChange}
        activeFilterValues={filterValues}
        onResetFilters={handleResetFilters}
      />

      <DataTableShell
        columns={[
          'Document Name',
          'Evidence Type',
          'File Format',
          'Size',
          'Uploaded By',
          'Uploaded On',
          'Linked Disclosure',
          'Project / Scope',
          'Reporting Period',
          'Verification Status',
          { header: 'Actions', align: 'center' },
        ]}
        emptyIcon={FileCheck2}
        emptyTitle="No evidence documents to review"
        emptyDescription="Evidence documents uploaded by contributors will appear here for verification. Use filters to refine by type, format, or verification status."
      />
    </div>
  );
};
