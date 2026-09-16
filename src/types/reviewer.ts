/**
 * Reviewer & Approver Portal TypeScript Models and Types.
 * 
 * NOTE: These are strictly typed contracts for future backend services.
 * No mocked arrays or seeded records are stored in this file.
 */

export type ReviewStatus =
  | 'awaiting_review'
  | 'under_review'
  | 'correction_requested'
  | 'resubmitted'
  | 'approved'
  | 'rejected';

export type ValidationSeverity =
  | 'critical'
  | 'warning'
  | 'information';

export interface ReviewAssignment {
  id: string;
  submissionId: string;
  disclosureCode: string;
  disclosureName: string;
  brsrSection: string;
  brsrPrinciple?: string;
  reportingPeriod: string;
  scopeName: string;
  contributorName: string;
  submittedOn: string;
  validationStatus: string;
  dueDate?: string;
  reviewStatus: ReviewStatus;
}

export interface ReviewDecision {
  submissionId: string;
  decision: 'approve' | 'request_correction' | 'reject';
  comment?: string;
  reason?: string;
  affectedField?: string;
  correctionCategory?: string;
}

export interface SubmissionReviewDetail {
  id: string;
  submissionId: string;
  disclosureCode: string;
  disclosureName: string;
  brsrSection: string;
  brsrPrinciple?: string;
  reportingPeriod: string;
  companyName: string;
  businessUnit: string;
  projectPlant: string;
  department: string;
  contributorName: string;
  contributorEmail: string;
  submittedAt: string;
  reviewStatus: ReviewStatus;
  dueDate: string;
  submittedValue: string;
  unit: string;
  previousValue?: string;
  variance?: string;
  methodologyNote?: string;
  contributorRemarks?: string;
}

export interface ValidationIssue {
  id: string;
  severity: ValidationSeverity;
  ruleCode: string;
  ruleName: string;
  category: string;
  disclosure: string;
  scope: string;
  contributor: string;
  reportingPeriod: string;
  detectedOn: string;
  status: 'Open' | 'Awaiting Clarification' | 'Corrected' | 'Resolved';
  details: string;
}

export interface EvidenceDocument {
  id: string;
  documentName: string;
  evidenceType: string;
  fileFormat: string;
  fileSizeBytes: number;
  uploadedBy: string;
  uploadedOn: string;
  linkedDisclosure: string;
  projectScope: string;
  reportingPeriod: string;
  verificationStatus: 'Pending Verification' | 'Verified' | 'Flagged';
}

export interface ReviewComment {
  id: string;
  submissionId: string;
  authorName: string;
  authorRole: string;
  commentText: string;
  createdAt: string;
  isInternal: boolean;
}

export interface ReviewActivityLog {
  id: string;
  timestamp: string;
  reviewerAction: string;
  submissionId: string;
  disclosureName: string;
  scope: string;
  outcome: string;
  comment?: string;
}
