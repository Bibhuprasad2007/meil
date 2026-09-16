import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { DemoAuthProvider } from './context/DemoAuthContext';
import { LoginLandingPage } from './components/layout/LoginLandingPage';
import { ProtectedAdminRoute } from './components/admin/layout/ProtectedAdminRoute';
import { AdminLayout } from './components/admin/layout/AdminLayout';

// Admin Pages
import { DashboardPage } from './components/admin/pages/DashboardPage';
import { OrganizationPage } from './components/admin/pages/OrganizationPage';
import { UsersPage } from './components/admin/pages/UsersPage';
import { ReportingCyclePage } from './components/admin/pages/ReportingCyclePage';
import { BRSRFrameworkPage } from './components/admin/pages/BRSRFrameworkPage';
import { TaskAssignmentPage } from './components/admin/pages/TaskAssignmentPage';
import { SubmissionMonitorPage } from './components/admin/pages/SubmissionMonitorPage';
import { ValidationPage } from './components/admin/pages/ValidationPage';
import { EvidenceAuditPage } from './components/admin/pages/EvidenceAuditPage';
import { ReportReadinessPage } from './components/admin/pages/ReportReadinessPage';
import { SettingsPage } from './components/admin/pages/SettingsPage';

// Reviewer Pages & Layout
import { ProtectedReviewerRoute } from './components/reviewer/layout/ProtectedReviewerRoute';
import { ReviewerLayout } from './components/reviewer/layout/ReviewerLayout';
import { ReviewerDashboardPage } from './components/reviewer/pages/ReviewerDashboardPage';
import { ReviewQueuePage } from './components/reviewer/pages/ReviewQueuePage';
import { SubmissionDetailPage } from './components/reviewer/pages/SubmissionDetailPage';
import { ValidationIssuesPage } from './components/reviewer/pages/ValidationIssuesPage';
import { EvidenceReviewPage } from './components/reviewer/pages/EvidenceReviewPage';
import { ActivityHistoryPage } from './components/reviewer/pages/ActivityHistoryPage';
import { ReviewerSettingsPage } from './components/reviewer/pages/ReviewerSettingsPage';

export function App() {
  return (
    <DemoAuthProvider>
      <BrowserRouter>
        <Routes>
          {/* Public Landing Page */}
          <Route path="/" element={<LoginLandingPage />} />

          {/* Root /admin redirection */}
          <Route path="/admin" element={<Navigate to="/admin/dashboard" replace />} />

          {/* Protected ESG Admin Portal Subsystem */}
          <Route
            path="/admin"
            element={
              <ProtectedAdminRoute>
                <AdminLayout />
              </ProtectedAdminRoute>
            }
          >
            <Route path="dashboard" element={<DashboardPage />} />
            <Route path="organization" element={<OrganizationPage />} />
            <Route path="users" element={<UsersPage />} />
            <Route path="reporting-cycle" element={<ReportingCyclePage />} />
            <Route path="brsr-framework" element={<BRSRFrameworkPage />} />
            <Route path="task-assignment" element={<TaskAssignmentPage />} />
            <Route path="submission-monitor" element={<SubmissionMonitorPage />} />
            <Route path="validation" element={<ValidationPage />} />
            <Route path="evidence-audit" element={<EvidenceAuditPage />} />
            <Route path="report-readiness" element={<ReportReadinessPage />} />
            <Route path="settings" element={<SettingsPage />} />
          </Route>

          {/* Root /reviewer redirection */}
          <Route path="/reviewer" element={<Navigate to="/reviewer/dashboard" replace />} />

          {/* Protected Reviewer / Approver Portal Subsystem */}
          <Route
            path="/reviewer"
            element={
              <ProtectedReviewerRoute>
                <ReviewerLayout />
              </ProtectedReviewerRoute>
            }
          >
            <Route path="dashboard" element={<ReviewerDashboardPage />} />
            <Route path="review-queue" element={<ReviewQueuePage />} />
            <Route path="submission-detail" element={<SubmissionDetailPage />} />
            <Route path="validation-issues" element={<ValidationIssuesPage />} />
            <Route path="evidence-review" element={<EvidenceReviewPage />} />
            <Route path="activity-history" element={<ActivityHistoryPage />} />
            <Route path="settings" element={<ReviewerSettingsPage />} />
          </Route>

          {/* Fallback */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </BrowserRouter>
    </DemoAuthProvider>
  );
}

export default App;
