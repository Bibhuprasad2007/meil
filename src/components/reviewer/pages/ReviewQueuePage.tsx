import React, { useState } from 'react';
import { ClipboardList } from 'lucide-react';
import { PageHeader } from '../../admin/common/PageHeader';
import { FilterBar } from '../../admin/common/FilterBar';
import { DataTableShell } from '../../admin/common/DataTableShell';

const REVIEW_STATUS_OPTIONS = [
  { label: 'Awaiting Review', value: 'awaiting_review' },
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

const PRINCIPLE_OPTIONS = [
  { label: 'P1 — Ethics & Transparency', value: 'P1' },
  { label: 'P2 — Product Lifecycle Sustainability', value: 'P2' },
  { label: 'P3 — Employee Well-being', value: 'P3' },
  { label: 'P4 — Stakeholder Engagement', value: 'P4' },
  { label: 'P5 — Human Rights', value: 'P5' },
  { label: 'P6 — Environment', value: 'P6' },
  { label: 'P7 — Public Policy', value: 'P7' },
  { label: 'P8 — Inclusive Growth', value: 'P8' },
  { label: 'P9 — Customer Value', value: 'P9' },
];

export const ReviewQueuePage: React.FC = () => {
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
        title="Review Queue"
        description="All BRSR disclosure submissions assigned for your review. Filter by status, section, principle, or reporting period."
      />

      <FilterBar
        searchPlaceholder="Search by disclosure code, contributor, or project…"
        searchValue={searchValue}
        onSearchChange={setSearchValue}
        filters={[
          {
            label: 'Review Status',
            value: 'reviewStatus',
            options: REVIEW_STATUS_OPTIONS,
            placeholder: 'All Statuses',
          },
          {
            label: 'BRSR Section',
            value: 'brsrSection',
            options: BRSR_SECTION_OPTIONS,
            placeholder: 'All Sections',
          },
          {
            label: 'Principle',
            value: 'principle',
            options: PRINCIPLE_OPTIONS,
            placeholder: 'All Principles',
          },
        ]}
        onFilterChange={handleFilterChange}
        activeFilterValues={filterValues}
        onResetFilters={handleResetFilters}
      />

      <DataTableShell
        columns={[
          'Disclosure Code',
          'Disclosure Name',
          'BRSR Section',
          'Scope / Project',
          'Contributor',
          'Submitted On',
          'Validation',
          'Due Date',
          'Review Status',
          { header: 'Actions', align: 'center' },
        ]}
        emptyIcon={ClipboardList}
        emptyTitle="No submissions in review queue"
        emptyDescription="Submissions assigned for your review will appear here once contributors submit disclosure data and the ESG Admin assigns review tasks."
      />
    </div>
  );
};
