import React, { useState } from 'react';
import { useOutletContext } from 'react-router-dom';
import { Users, UserPlus, Mail, Key, Shield, UserX, Info } from 'lucide-react';
import { PageHeader } from '../common/PageHeader';
import { FilterBar } from '../common/FilterBar';
import { DataTableShell } from '../common/DataTableShell';
import { CreateUserModal } from '../modals/CreateUserModal';

interface OutletContextType {
  addToast: (message: string, type?: 'info' | 'success' | 'warning' | 'error') => void;
}

export const UsersPage: React.FC = () => {
  const { addToast } = useOutletContext<OutletContextType>();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [search, setSearch] = useState('');
  const [filters, setFilters] = useState<Record<string, string>>({});

  const filterOptions = [
    {
      label: 'Role',
      value: 'role',
      options: [
        { label: 'Data Contributor', value: 'Data Contributor' },
        { label: 'Reviewer / Approver', value: 'Reviewer / Approver' },
        { label: 'Management', value: 'Management' },
        { label: 'Auditor / Assurer', value: 'Auditor / Assurer' },
      ],
    },
    {
      label: 'Scope',
      value: 'scope',
      options: [
        { label: 'Corporate HQ', value: 'corporate' },
        { label: 'Subsidiaries', value: 'subsidiaries' },
        { label: 'Plant Level', value: 'plants' },
      ],
    },
    {
      label: 'Account Status',
      value: 'status',
      options: [
        { label: 'Active', value: 'active' },
        { label: 'Pending Invite', value: 'pending' },
        { label: 'Suspended', value: 'suspended' },
        { label: 'Expired', value: 'expired' },
      ],
    },
  ];

  const tableColumns = [
    'Employee',
    'Employee ID',
    'Email',
    'Department',
    'Role',
    'Assigned Scope',
    'Account Status',
    'Expiry',
    'Actions',
  ];

  return (
    <div className="space-y-6">
      <PageHeader
        title="Users & Role-Based Access Control"
        description="Manage portal users across Data Contributors, Reviewers, Executive Management, and Third-Party ESG Assurers."
        actionText="Create User"
        actionIcon={UserPlus}
        onAction={() => setIsModalOpen(true)}
      />

      {/* Role Management Notice */}
      <div className="bg-sky-50/80 border border-sky-200 rounded-xl p-4 text-xs text-sky-900 flex items-start gap-2.5">
        <Info className="w-4 h-4 text-sky-600 shrink-0 mt-0.5" />
        <div className="space-y-1">
          <p className="font-semibold text-sky-950">Role-Based Provisioning Protocol</p>
          <p className="text-sky-800">
            Account invitations and password reset links are issued directly by the authentication service upon backend connectivity. No passwords are stored in frontend states.
          </p>
        </div>
      </div>

      {/* Action Controls Bar for Selected Users */}
      <div className="bg-white p-3 rounded-xl border border-slate-200 shadow-xs flex flex-wrap items-center justify-between gap-3 text-xs">
        <div className="flex items-center gap-2 text-slate-500 font-medium">
          <span>Batch Record Operations:</span>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <button
            type="button"
            disabled
            title="Select user records from the backend to resend invitation"
            className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-slate-400 bg-slate-100 rounded-lg cursor-not-allowed border border-slate-200"
          >
            <Mail className="w-3.5 h-3.5" />
            <span>Resend Invite</span>
          </button>

          <button
            type="button"
            disabled
            title="Select user records from the backend to trigger password reset"
            className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-slate-400 bg-slate-100 rounded-lg cursor-not-allowed border border-slate-200"
          >
            <Key className="w-3.5 h-3.5" />
            <span>Reset Password</span>
          </button>

          <button
            type="button"
            disabled
            title="Select user records from the backend to modify role"
            className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-slate-400 bg-slate-100 rounded-lg cursor-not-allowed border border-slate-200"
          >
            <Shield className="w-3.5 h-3.5" />
            <span>Change Role</span>
          </button>

          <button
            type="button"
            disabled
            title="Select user records from the backend to disable access"
            className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-rose-300 bg-rose-50/50 rounded-lg cursor-not-allowed border border-rose-100"
          >
            <UserX className="w-3.5 h-3.5" />
            <span>Disable User</span>
          </button>
        </div>
      </div>

      {/* Filters */}
      <FilterBar
        searchPlaceholder="Search by name, employee ID, or email..."
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

      {/* Users Table Shell */}
      <DataTableShell
        columns={tableColumns}
        emptyIcon={Users}
        emptyTitle="No users configured"
        emptyDescription="Create user accounts and assign reporting responsibilities to begin ESG data collection."
        emptyActionText="Create User"
        onEmptyAction={() => setIsModalOpen(true)}
      />

      {/* Modal */}
      <CreateUserModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onShowToast={addToast}
      />
    </div>
  );
};
