import React, { useState } from 'react';
import { useOutletContext } from 'react-router-dom';
import { Building2, Plus, GitFork } from 'lucide-react';
import { PageHeader } from '../common/PageHeader';
import { FilterBar } from '../common/FilterBar';
import { DataTableShell } from '../common/DataTableShell';
import { EmptyState } from '../common/EmptyState';
import { AddOrgUnitModal } from '../modals/AddOrgUnitModal';

interface OutletContextType {
  addToast: (message: string, type?: 'info' | 'success' | 'warning' | 'error') => void;
}

export const OrganizationPage: React.FC = () => {
  const { addToast } = useOutletContext<OutletContextType>();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [search, setSearch] = useState('');
  const [filters, setFilters] = useState<Record<string, string>>({});

  const filterOptions = [
    {
      label: 'Entity Types',
      value: 'entityType',
      options: [
        { label: 'Subsidiary', value: 'Subsidiary' },
        { label: 'Business Unit', value: 'Business Unit' },
        { label: 'Project', value: 'Project' },
        { label: 'Plant', value: 'Plant' },
        { label: 'Department', value: 'Department' },
      ],
    },
    {
      label: 'Status',
      value: 'status',
      options: [
        { label: 'Active', value: 'active' },
        { label: 'Inactive', value: 'inactive' },
      ],
    },
  ];

  const tableColumns = [
    'Code',
    'Entity Name',
    'Entity Type',
    'Parent Entity',
    'Sector',
    'Location',
    'Status',
    'Actions',
  ];

  return (
    <div className="space-y-6">
      <PageHeader
        title="Organization Structure & Scopes"
        description="Configure legal entities, subsidiaries, manufacturing plants, and infrastructure project scopes for consolidated BRSR reporting."
        actionText="Add Organization Unit"
        actionIcon={Plus}
        onAction={() => setIsModalOpen(true)}
      />

      {/* Filter and Search Bar */}
      <FilterBar
        searchPlaceholder="Search by code, entity name, or city..."
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

      {/* Organization Hierarchy & Tree Visualization Shell */}
      <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-xs">
        <div className="flex items-center justify-between pb-3 border-b border-slate-100 mb-4">
          <div className="flex items-center gap-2">
            <GitFork className="w-4 h-4 text-[#003B73]" />
            <h3 className="text-sm font-bold text-slate-800">Entity Hierarchy Tree</h3>
          </div>
          <span className="text-xs text-slate-400 font-medium">Group Consolidation Boundary</span>
        </div>

        <EmptyState
          icon={GitFork}
          title="No Organization Hierarchy Defined"
          description="The visual organization tree will be rendered hierarchically once organization units and parent-subsidiary relationships are integrated."
          compact
        />
      </div>

      {/* Organization Units Table Shell */}
      <DataTableShell
        columns={tableColumns}
        emptyIcon={Building2}
        emptyTitle="No organization units found"
        emptyDescription="Connect the backend service or add units to configure the reporting entity structure."
        emptyActionText="Add Organization Unit"
        onEmptyAction={() => setIsModalOpen(true)}
      />

      {/* Modal */}
      <AddOrgUnitModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onShowToast={addToast}
      />
    </div>
  );
};
