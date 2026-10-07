import React, { useState } from 'react';
import { ClipboardList } from 'lucide-react';
import { PageHeader } from '../../admin/common/PageHeader';
import { FilterBar } from '../../admin/common/FilterBar';
import { Link } from 'react-router-dom';
import { useNexusData } from '../../../context/NexusDataContext';

const REVIEW_STATUS_OPTIONS = [
  { label: 'Awaiting Review', value: 'awaiting_review' },
  { label: 'Under Review', value: 'under_review' },
  { label: 'Correction Requested', value: 'correction_requested' },
  { label: 'Resubmitted', value: 'resubmitted' },
  { label: 'Approved', value: 'approved' },
  { label: 'Rejected', value: 'rejected' },
];

export const ReviewQueuePage: React.FC = () => {
  const [searchValue, setSearchValue] = useState('');
  const [filterValues, setFilterValues] = useState<Record<string, string>>({});
  const { assignments, organizations, users } = useNexusData();

  const handleFilterChange = (key: string, value: string) => {
    setFilterValues((prev) => ({ ...prev, [key]: value }));
  };

  const handleResetFilters = () => {
    setSearchValue('');
    setFilterValues({});
  };

  // Filter assignments that are under review, etc.
  // For demo, let's show all that aren't 'draft' or 'approved', or filter based on 'reviewStatus'
  const filteredAssignments = assignments.filter((a) => {
    if (filterValues.reviewStatus && a.status !== filterValues.reviewStatus) {
      return false;
    }
    if (a.status === 'draft') return false; // Not yet submitted
    return true;
  });

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
        ]}
        onFilterChange={handleFilterChange}
        activeFilterValues={filterValues}
        onResetFilters={handleResetFilters}
      />

      <div className="bg-white rounded-lg shadow border border-gray-200 overflow-hidden">
        {filteredAssignments.length === 0 ? (
          <div className="flex flex-col items-center justify-center p-12 text-center">
            <ClipboardList className="w-12 h-12 text-gray-400 mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-1">No submissions in review queue</h3>
            <p className="text-gray-500 max-w-sm">
              Submissions assigned for your review will appear here once contributors submit disclosure data.
            </p>
          </div>
        ) : (
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Indicator</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Project / BU</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Contributor</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredAssignments.map((assignment) => {
                const org = organizations.find(o => o.id === assignment.orgId);
                const user = users.find(u => u.id === assignment.contributorId);
                return (
                  <tr key={assignment.id}>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      {assignment.indicatorCode} - {assignment.indicatorName}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {org?.name || assignment.orgId}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {user?.name || assignment.contributorId}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-yellow-100 text-yellow-800">
                        {assignment.status.replace('_', ' ').toUpperCase()}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      <Link to={`/reviewer/submission-detail/${assignment.id}`} className="text-blue-600 hover:text-blue-900 font-medium">Review</Link>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};
