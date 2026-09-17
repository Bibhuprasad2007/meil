import React, { useState } from 'react';
import { useParams, useOutletContext } from 'react-router-dom';
import {
  FileText,
  FileEdit,
  Calculator,
  Paperclip,
  ClipboardCheck,
  MessageSquare,
  History,
  AlertCircle,
  CornerDownLeft,
} from 'lucide-react';
import { PageHeader } from '../../admin/common/PageHeader';
import { EmptyState } from '../../admin/common/EmptyState';
import { DynamicDisclosureForm } from '../forms/DynamicDisclosureForm';
import { CalculationPanel } from '../panels/CalculationPanel';
import { EvidenceAttachmentPanel } from '../panels/EvidenceAttachmentPanel';
import { ValidationPanel } from '../panels/ValidationPanel';
import { SubmitForReviewModal } from '../modals/SubmitForReviewModal';

type AssignmentTab =
  | 'task-overview'
  | 'data-entry'
  | 'calculation-details'
  | 'supporting-evidence'
  | 'validation'
  | 'comments'
  | 'history';

const ASSIGNMENT_TABS: {
  id: AssignmentTab;
  label: string;
  icon: React.ComponentType<{ className?: string }>;
}[] = [
  { id: 'task-overview', label: 'Task Overview', icon: FileText },
  { id: 'data-entry', label: 'Data Entry', icon: FileEdit },
  { id: 'calculation-details', label: 'Calculation Details', icon: Calculator },
  { id: 'supporting-evidence', label: 'Supporting Evidence', icon: Paperclip },
  { id: 'validation', label: 'Validation', icon: ClipboardCheck },
  { id: 'comments', label: 'Comments', icon: MessageSquare },
  { id: 'history', label: 'History', icon: History },
];

export const AssignmentDataEntryPage: React.FC = () => {
  const { assignmentId } = useParams<{ assignmentId: string }>();
  const { addToast } = useOutletContext<{
    addToast: (msg: string, type?: 'info' | 'success' | 'warning' | 'error') => void;
  }>();

  const [activeTab, setActiveTab] = useState<AssignmentTab>('data-entry');
  const [isSubmitModalOpen, setIsSubmitModalOpen] = useState(false);
  const [contributorComment, setContributorComment] = useState('');

  const handleSaveDraft = () => {
    addToast('Draft saving will be enabled after backend integration.', 'info');
  };

  const handleValidate = () => {
    setActiveTab('validation');
    addToast('Validation rules are not available for this assignment.', 'info');
  };

  const handleOpenSubmitModal = () => {
    setIsSubmitModalOpen(true);
  };

  const handleSubmitConfirm = () => {
    addToast('Submission workflow will be connected in the backend phase.', 'info');
  };

  const handleAttemptUpload = (_fileInfo: { name: string; size: number }) => {
    addToast('Evidence upload will be enabled after secure backend storage is connected.', 'info');
  };

  const handlePostComment = (e: React.FormEvent) => {
    e.preventDefault();
    if (!contributorComment.trim()) return;
    addToast('Comment service will be connected in the backend phase.', 'info');
    setContributorComment('');
  };

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <PageHeader
        title="BRSR Disclosure Data Entry"
        description="Enter quantitative and qualitative performance data, calculation methodology, and supporting audit evidence for assigned BRSR reporting disclosures."
      />

      {/* Backend Unavailable Notice for this Assignment */}
      <div className="p-4 rounded-xl bg-amber-50 border border-amber-200 text-amber-900 text-xs flex items-start gap-3">
        <AlertCircle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
        <div>
          <p className="font-bold text-amber-950">Assignment not available.</p>
          <p className="text-amber-800 mt-0.5">
            Connect the assignment service to load this reporting task. Below is the interactive prototype form layout ready for review.
          </p>
        </div>
      </div>

      {/* Assignment Header / Scope Metadata Card */}
      <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-xs space-y-4">
        <div className="flex flex-wrap items-start justify-between gap-3 pb-3 border-b border-slate-100">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-teal-50 flex items-center justify-center text-teal-700 shrink-0">
              <FileText className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-sm font-bold text-slate-800">
                  {assignmentId ? `Task ID: ${assignmentId}` : 'Task ID: --'}
                </h2>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-slate-100 text-slate-600 uppercase">
                  Status: --
                </span>
              </div>
              <p className="text-xs text-slate-500 mt-0.5">
                Disclosure Code: -- &middot; Metric Name: --
              </p>
            </div>
          </div>
        </div>

        {/* Read-only Metadata Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-7 gap-3 text-xs">
          {[
            { label: 'BRSR Section', value: '--' },
            { label: 'BRSR Principle', value: '--' },
            { label: 'Company / Entity', value: '--' },
            { label: 'Business Unit', value: '--' },
            { label: 'Project / Plant', value: '--' },
            { label: 'Department', value: '--' },
            { label: 'Reporting Period', value: '--' },
            { label: 'Frequency', value: '--' },
            { label: 'Required Unit', value: '--' },
            { label: 'Due Date', value: '--' },
            { label: 'Boundary', value: '--' },
            { label: 'Assigned By', value: '--' },
            { label: 'Reviewer Tier', value: '--' },
            { label: 'Validation Status', value: '--' },
          ].map((item) => (
            <div key={item.label} className="p-2.5 rounded-lg bg-slate-50 border border-slate-100">
              <p className="text-[10px] font-semibold text-slate-400 uppercase tracking-wider mb-0.5 truncate">
                {item.label}
              </p>
              <p className="font-semibold text-slate-700 truncate">{item.value}</p>
            </div>
          ))}
        </div>
      </div>

      {/* 7 Data Entry Tabs */}
      <div className="bg-white rounded-xl border border-slate-200 shadow-xs overflow-hidden">
        <div className="border-b border-slate-200 overflow-x-auto">
          <nav className="flex" aria-label="Assignment Data Entry Tabs">
            {ASSIGNMENT_TABS.map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  type="button"
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center gap-2 px-4 py-3 text-xs font-medium whitespace-nowrap border-b-2 transition-colors ${
                    activeTab === tab.id
                      ? 'border-teal-700 text-teal-800 font-bold bg-teal-50/30'
                      : 'border-transparent text-slate-500 hover:text-slate-800 hover:border-slate-300'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  <span>{tab.label}</span>
                </button>
              );
            })}
          </nav>
        </div>

        {/* Tab Content Panes */}
        <div className="p-6">
          {/* Tab 1: Task Overview */}
          {activeTab === 'task-overview' && (
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                {/* Reporting Scope Card */}
                <div className="p-5 rounded-xl bg-slate-50 border border-slate-200 space-y-3">
                  <h3 className="text-xs font-bold text-slate-800 uppercase tracking-wider">
                    Reporting Scope &amp; Boundary
                  </h3>
                  <div className="space-y-2 text-xs text-slate-600">
                    <p><strong className="text-slate-800">Operational Entity:</strong> --</p>
                    <p><strong className="text-slate-800">Assigned Facility / Site:</strong> --</p>
                    <p><strong className="text-slate-800">Boundary Criteria:</strong> --</p>
                  </div>
                </div>

                {/* Evidence Requirements Card */}
                <div className="p-5 rounded-xl bg-slate-50 border border-slate-200 space-y-3">
                  <h3 className="text-xs font-bold text-slate-800 uppercase tracking-wider">
                    Evidence Requirements
                  </h3>
                  <div className="space-y-2 text-xs text-slate-600">
                    <p><strong className="text-slate-800">Mandatory Evidence:</strong> --</p>
                    <p><strong className="text-slate-800">Accepted Artifact Formats:</strong> PDF, PNG, JPG, XLSX, CSV, DOCX</p>
                    <p><strong className="text-slate-800">Retention Requirement:</strong> 8 Years (SEBI BRSR Core)</p>
                  </div>
                </div>
              </div>

              <EmptyState
                icon={FileText}
                title="No reporting instructions are configured for this assignment."
                description="Specific measurement guidelines, standard formulas, and boundary definitions from the ESG Administrator will display here once configured."
              />
            </div>
          )}

          {/* Tab 2: Dynamic Data Entry Form */}
          {activeTab === 'data-entry' && (
            <DynamicDisclosureForm
              onSaveDraft={handleSaveDraft}
              onValidate={handleValidate}
              onSubmitForReview={handleOpenSubmitModal}
            />
          )}

          {/* Tab 3: Calculation Details */}
          {activeTab === 'calculation-details' && <CalculationPanel />}

          {/* Tab 4: Supporting Evidence */}
          {activeTab === 'supporting-evidence' && (
            <EvidenceAttachmentPanel onAttemptUpload={handleAttemptUpload} />
          )}

          {/* Tab 5: Validation Results */}
          {activeTab === 'validation' && <ValidationPanel />}

          {/* Tab 6: Comments & Instructions */}
          {activeTab === 'comments' && (
            <div className="space-y-6">
              {/* Reviewer / Admin Comments Thread */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div className="p-5 rounded-xl bg-slate-50 border border-slate-200">
                  <h4 className="text-xs font-bold text-slate-700 uppercase tracking-wider mb-3">
                    Admin Guidance &amp; Instructions
                  </h4>
                  <p className="text-xs text-slate-500 italic">
                    No admin instructions have been attached to this task.
                  </p>
                </div>
                <div className="p-5 rounded-xl bg-slate-50 border border-slate-200">
                  <h4 className="text-xs font-bold text-slate-700 uppercase tracking-wider mb-3">
                    Reviewer Feedback (Read-Only)
                  </h4>
                  <p className="text-xs text-slate-500 italic">
                    No reviewer comments recorded for this disclosure.
                  </p>
                </div>
              </div>

              {/* Contributor Response Area */}
              <form onSubmit={handlePostComment} className="border-t border-slate-100 pt-5 space-y-3">
                <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider">
                  Contributor Response &amp; Clarification
                </label>
                <textarea
                  rows={3}
                  value={contributorComment}
                  onChange={(e) => setContributorComment(e.target.value)}
                  placeholder="Type a response or clarification regarding this disclosure…"
                  className="w-full px-3.5 py-2.5 text-sm bg-slate-50 border border-slate-200 rounded-lg text-slate-800 placeholder-slate-400 focus:bg-white focus:outline-none focus:border-teal-700 resize-none"
                />
                <div className="flex items-center justify-between">
                  <span className="text-[11px] text-slate-400">
                    Comments require backend service connection
                  </span>
                  <button
                    type="submit"
                    className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-semibold text-white bg-teal-700 hover:bg-teal-800 rounded-lg transition-colors shadow-xs"
                  >
                    <CornerDownLeft className="w-3.5 h-3.5" />
                    <span>Send Message</span>
                  </button>
                </div>
              </form>
            </div>
          )}

          {/* Tab 7: Revision History */}
          {activeTab === 'history' && (
            <EmptyState
              icon={History}
              title="No revision history is available for this reporting task."
              description="Timestamped changes, draft versions, reviewer returns, and audit entries will be tracked here once the backend audit log service is active."
            />
          )}
        </div>
      </div>

      {/* Submit For Review Modal */}
      <SubmitForReviewModal
        isOpen={isSubmitModalOpen}
        onClose={() => setIsSubmitModalOpen(false)}
        assignmentCode={assignmentId || '--'}
        assignmentName="Assigned BRSR Disclosure"
        onSubmitConfirm={handleSubmitConfirm}
      />
    </div>
  );
};
