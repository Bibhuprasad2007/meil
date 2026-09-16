import React, { useState } from 'react';
import {
  FileSearch,
  FileText,
  MessageSquare,
  ClipboardCheck,
  AlertTriangle,
  Paperclip,
  CheckCircle2,
  XCircle,
  CornerDownLeft,
  Info,
} from 'lucide-react';
import { PageHeader } from '../../admin/common/PageHeader';
import { EmptyState } from '../../admin/common/EmptyState';
import { BackendNotice } from '../../admin/common/BackendNotice';

type DetailTab = 'submitted-data' | 'validation-checks' | 'evidence' | 'comments' | 'decision';

const TABS: { id: DetailTab; label: string; icon: React.ComponentType<{ className?: string }> }[] = [
  { id: 'submitted-data', label: 'Submitted Data', icon: FileText },
  { id: 'validation-checks', label: 'Validation Checks', icon: ClipboardCheck },
  { id: 'evidence', label: 'Evidence & Attachments', icon: Paperclip },
  { id: 'comments', label: 'Review Comments', icon: MessageSquare },
  { id: 'decision', label: 'Review Decision', icon: CheckCircle2 },
];

export const SubmissionDetailPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState<DetailTab>('submitted-data');

  return (
    <div className="space-y-6">
      <PageHeader
        title="Submission Detail"
        description="Detailed view of a selected BRSR disclosure submission. Review submitted data, validation checks, evidence documents, and record your review decision."
      />

      {/* Submission Header Info Panel */}
      <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-xs">
        <div className="flex items-start gap-3 mb-4">
          <div className="w-10 h-10 rounded-lg bg-sky-50 flex items-center justify-center text-sky-600 shrink-0">
            <FileSearch className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-sm font-bold text-slate-800">No Submission Selected</h2>
            <p className="text-xs text-slate-500 mt-0.5">
              Select a submission from the Review Queue to view its complete details here.
            </p>
          </div>
        </div>

        {/* Submission Metadata Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4 border-t border-slate-100 pt-4">
          {[
            { label: 'Disclosure Code', value: '--' },
            { label: 'BRSR Section', value: '--' },
            { label: 'Reporting Period', value: '--' },
            { label: 'Contributor', value: '--' },
            { label: 'Review Status', value: '--' },
            { label: 'Company / Entity', value: '--' },
            { label: 'Business Unit', value: '--' },
            { label: 'Project / Plant', value: '--' },
            { label: 'Department', value: '--' },
            { label: 'Due Date', value: '--' },
          ].map((field) => (
            <div key={field.label}>
              <p className="text-[10px] font-semibold uppercase tracking-wider text-slate-400 mb-0.5">
                {field.label}
              </p>
              <p className="text-xs font-medium text-slate-700">{field.value}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Tab Navigation */}
      <div className="bg-white rounded-xl border border-slate-200 shadow-xs overflow-hidden">
        <div className="border-b border-slate-200 overflow-x-auto">
          <nav className="flex" aria-label="Submission detail tabs">
            {TABS.map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  type="button"
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center gap-2 px-4 py-3 text-xs font-medium whitespace-nowrap border-b-2 transition-colors ${
                    activeTab === tab.id
                      ? 'border-[#003B73] text-[#003B73] font-semibold'
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

        {/* Tab Content */}
        <div className="p-6">
          {activeTab === 'submitted-data' && (
            <EmptyState
              icon={FileText}
              title="No Submitted Data"
              description="Submitted field values, units of measurement, methodology notes, year-on-year comparisons, and variance calculations will appear here once a submission is loaded from the backend."
            />
          )}

          {activeTab === 'validation-checks' && (
            <EmptyState
              icon={ClipboardCheck}
              title="No Validation Results"
              description="Automated validation check results (completeness, threshold, format, cross-disclosure consistency) will display here after backend validation rules execute."
            />
          )}

          {activeTab === 'evidence' && (
            <EmptyState
              icon={Paperclip}
              title="No Evidence Documents"
              description="Uploaded supporting documents, certificates, third-party reports, and audit evidence will be listed here with verification status once connected to the file storage backend."
            />
          )}

          {activeTab === 'comments' && (
            <div className="space-y-6">
              <EmptyState
                icon={MessageSquare}
                title="No Review Comments"
                description="The review comment thread for this submission will appear here. Comments from reviewers and contributors will be displayed chronologically."
                compact
              />

              {/* Comment Input (Disabled - Backend Required) */}
              <div className="border-t border-slate-100 pt-4">
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-full bg-sky-100 flex items-center justify-center text-sky-600 shrink-0 mt-1">
                    <MessageSquare className="w-4 h-4" />
                  </div>
                  <div className="flex-1">
                    <textarea
                      disabled
                      placeholder="Type a review comment… (Requires backend connection)"
                      rows={3}
                      className="w-full px-3 py-2 text-sm bg-slate-50 border border-slate-200 rounded-lg text-slate-400 placeholder-slate-400 cursor-not-allowed resize-none"
                    />
                    <div className="flex items-center justify-between mt-2">
                      <div className="flex items-center gap-1 text-[10px] text-slate-400">
                        <Info className="w-3 h-3" />
                        <span>Comments require backend service integration</span>
                      </div>
                      <button
                        type="button"
                        disabled
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-white bg-[#003B73] rounded-lg opacity-50 cursor-not-allowed"
                      >
                        <CornerDownLeft className="w-3.5 h-3.5" />
                        <span>Post Comment</span>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'decision' && (
            <div className="space-y-6">
              <EmptyState
                icon={CheckCircle2}
                title="No Review Decision"
                description="Record your review decision (Approve, Request Correction, or Reject) for the selected submission. All actions require backend service integration."
                compact
              />

              {/* Decision Actions (Disabled - Backend Required) */}
              <div className="border-t border-slate-100 pt-5">
                <BackendNotice
                  message="Review decisions (Approve / Request Correction / Reject) will be recorded in the backend audit trail when the service is connected."
                />

                <div className="flex flex-wrap gap-3 mt-4">
                  <button
                    type="button"
                    disabled
                    className="inline-flex items-center gap-2 px-4 py-2.5 text-sm font-semibold text-white bg-emerald-600 rounded-lg opacity-50 cursor-not-allowed"
                  >
                    <CheckCircle2 className="w-4 h-4" />
                    <span>Approve Submission</span>
                  </button>
                  <button
                    type="button"
                    disabled
                    className="inline-flex items-center gap-2 px-4 py-2.5 text-sm font-semibold text-white bg-amber-600 rounded-lg opacity-50 cursor-not-allowed"
                  >
                    <AlertTriangle className="w-4 h-4" />
                    <span>Request Correction</span>
                  </button>
                  <button
                    type="button"
                    disabled
                    className="inline-flex items-center gap-2 px-4 py-2.5 text-sm font-semibold text-white bg-rose-600 rounded-lg opacity-50 cursor-not-allowed"
                  >
                    <XCircle className="w-4 h-4" />
                    <span>Reject Submission</span>
                  </button>
                </div>

                {/* Decision Comment */}
                <div className="mt-4">
                  <label className="block text-xs font-semibold text-slate-600 mb-1.5 uppercase tracking-wider">
                    Decision Remarks
                  </label>
                  <textarea
                    disabled
                    placeholder="Provide justification for your review decision… (Requires backend)"
                    rows={3}
                    className="w-full px-3 py-2 text-sm bg-slate-50 border border-slate-200 rounded-lg text-slate-400 placeholder-slate-400 cursor-not-allowed resize-none"
                  />
                </div>

                {/* Correction Category Selector */}
                <div className="mt-3">
                  <label className="block text-xs font-semibold text-slate-600 mb-1.5 uppercase tracking-wider">
                    Correction Category (if applicable)
                  </label>
                  <select
                    disabled
                    className="w-full px-3 py-2 text-sm bg-slate-50 border border-slate-200 rounded-lg text-slate-400 cursor-not-allowed"
                  >
                    <option>Select correction category…</option>
                    <option>Data Accuracy</option>
                    <option>Missing Evidence</option>
                    <option>Methodology Mismatch</option>
                    <option>Unit Conversion Error</option>
                    <option>Incomplete Disclosure</option>
                    <option>Cross-Disclosure Inconsistency</option>
                  </select>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
