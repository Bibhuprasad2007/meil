import React, { useState } from 'react';
import { useOutletContext } from 'react-router-dom';
import { ClipboardList, Plus, Send } from 'lucide-react';
import { PageHeader } from '../common/PageHeader';
import { FilterBar } from '../common/FilterBar';
import { DataTableShell } from '../common/DataTableShell';
import { CreateAssignmentModal } from '../modals/CreateAssignmentModal';
import { SendReminderModal } from '../modals/SendReminderModal';

interface OutletContextType {
  addToast: (message: string, type?: 'info' | 'success' | 'warning' | 'error') => void;
}

export const TaskAssignmentPage: React.FC = () => {
  const { addToast } = useOutletContext<OutletContextType>();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isReminderOpen, setIsReminderOpen] = useState(false);

  const [search, setSearch] = useState('');
  const [filters, setFilters] = useState<Record<string, string>>({});

  const filterOptions = [
    {
      label: 'Financial Year',
      value: 'fy',
      options: [],
      placeholder: 'All Financial Years (Backend req)',
    },
    {
      label: 'Entity / Scope',
      value: 'scope',
      options: [],
      placeholder: 'All Scopes (Backend req)',
    },
    {
      label: 'Section / Principle',
      value: 'section',
      options: [
        { label: 'Section A - General', value: 'sectionA' },
        { label: 'Section B - Management', value: 'sectionB' },
        { label: 'Section C - P1 Ethics', value: 'P1' },
        { label: 'Section C - P6 Environment', value: 'P6' },
      ],
    },
    {
      label: 'Status',
      value: 'status',
      options: [
        { label: 'Assigned', value: 'assigned' },
        { label: 'In Progress', value: 'in_progress' },
        { label: 'Submitted', value: 'submitted' },
        { label: 'Overdue', value: 'overdue' },
      ],
    },
  ];

  const tableColumns = [
    'Disclosure',
    'Scope',
    'Contributor',
    'Reviewer',
    'Frequency',
    'Evidence Rule',
    'Deadline',
    'Status',
    'Actions',
  ];

  return (
    <div className="space-y-6">
      <PageHeader
        title="Task & Responsibility Assignment Matrix"
        description="Delegate ESG disclosure line items, data collection forms, and review assignments across departments, plants, and subsidiaries."
        actionText="Create Assignment"
        actionIcon={Plus}
        onAction={() => setIsModalOpen(true)}
        extraControls={
          <button
            type="button"
            onClick={() => setIsReminderOpen(true)}
            className="inline-flex items-center gap-1.5 px-3.5 py-2.5 text-sm font-semibold text-slate-700 hover:text-slate-900 bg-white border border-slate-300 hover:border-slate-400 rounded-lg shadow-xs transition-all"
          >
            <Send className="w-4 h-4 text-[#003B73]" />
            <span>Send Reminder</span>
          </button>
        }
      />

      {/* Filter Bar */}
      <FilterBar
        searchPlaceholder="Search assignments by disclosure code, plant, or owner..."
        searchValue={search}
        onSearchChange={setSearch}
        filters={filterOptions}
        activeFilterValues={filters}
        onFilterChange={(k, v) => setFilters((prev) => ({ ...prev, [k]: v }))}
        onResetFilters={() => {
          setSearch('');
          setFilters({});
        }}
      />

      {/* Assignments Table Shell */}
      <DataTableShell
        columns={tableColumns}
        emptyIcon={ClipboardList}
        emptyTitle="No task assignments found"
        emptyDescription="Create reporting cycles and task assignments to allocate ESG data points to plant contributors."
        emptyActionText="Create Assignment"
        onEmptyAction={() => setIsModalOpen(true)}
      />

      {/* Modals */}
      <CreateAssignmentModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onShowToast={addToast}
      />
      <SendReminderModal
        isOpen={isReminderOpen}
        onClose={() => setIsReminderOpen(false)}
        onShowToast={addToast}
      />
    </div>
  );
};
