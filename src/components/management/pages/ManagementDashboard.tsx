import React from 'react';
import { useNavigate } from 'react-router-dom';
import {
  ClipboardCheck,
  CheckCircle2,
  Clock,
  AlertTriangle,
  Target,
  FileCheck2,
  TrendingUp,
  Leaf,
  Users,
  ShieldCheck,
  BarChart3,
  PieChart,
  Activity,
  FileSpreadsheet,
} from 'lucide-react';
import { PageHeader } from '../../admin/common/PageHeader';
import { EmptyState } from '../../admin/common/EmptyState';
import { MetricCard } from '../../admin/common/MetricCard';
import { useNexusData } from '../../../context/NexusDataContext';

export const ManagementDashboard: React.FC = () => {
  const navigate = useNavigate();
  const { assignments, submissions } = useNexusData();

  const totalAssignments = assignments.length || 1; // prevent divide by zero
  const approvedAssignments = assignments.filter(a => a.status === 'approved').length;
  const pendingApprovals = assignments.filter(a => a.status === 'under_review' || a.status === 'correction_requested').length;
  const esgReadiness = Math.round((approvedAssignments / totalAssignments) * 100);

  // BRSR readiness based on core assignments approved
  const coreAssignments = assignments.filter(a => a.isBrsrCore);
  const coreApproved = coreAssignments.filter(a => a.status === 'approved').length;
  const brsrReadiness = coreAssignments.length ? Math.round((coreApproved / coreAssignments.length) * 100) : 0;

  // GHG emissions totals
  const ghgScope1 = submissions
    .filter(s => s.assignmentId && s.assignmentId.includes('scope1'))
    .reduce((sum, s) => sum + (typeof s.value === 'number' ? s.value : 0), 0);
  const ghgScope2 = submissions
    .filter(s => s.assignmentId && s.assignmentId.includes('scope2'))
    .reduce((sum, s) => sum + (typeof s.value === 'number' ? s.value : 0), 0);
  const ghgScope3 = submissions
    .filter(s => s.assignmentId && s.assignmentId.includes('scope3'))
    .reduce((sum, s) => sum + (typeof s.value === 'number' ? s.value : 0), 0);

  // Energy consumption and renewable share
  const energyConsumption = submissions
    .filter(s => s.assignmentId && s.assignmentId.includes('energy'))
    .reduce((sum, s) => sum + (s.activityValue || 0), 0);
  const renewableEnergy = submissions
    .filter(s => s.assignmentId && s.assignmentId.includes('renew'))
    .reduce((sum, s) => sum + (typeof s.value === 'number' ? s.value : 0), 0);
  const renewablePct = energyConsumption ? Math.round((renewableEnergy / energyConsumption) * 100) : 0;

  // Water consumption
  const waterConsumption = submissions
    .filter(s => s.assignmentId && s.assignmentId.includes('water'))
    .reduce((sum, s) => sum + (typeof s.value === 'number' ? s.value : 0), 0);

  // Waste generation and recycled %
  const wasteGeneration = submissions
    .filter(s => s.assignmentId && s.assignmentId.includes('waste'))
    .reduce((sum, s) => sum + (typeof s.value === 'number' ? s.value : 0), 0);
  const wasteRecycled = submissions
    .filter(s => s.assignmentId && s.assignmentId.includes('recyc'))
    .reduce((sum, s) => sum + (typeof s.value === 'number' ? s.value : 0), 0);
  const wasteRecycledPct = wasteGeneration ? Math.round((wasteRecycled / wasteGeneration) * 100) : 0;

  // Safety incidents
  const safetyIncidents = submissions
    .filter(s => s.assignmentId && s.assignmentId.includes('safety'))
    .length;

  // Gender diversity percentage
  const genderDiversity = submissions
    .find(s => s.assignmentId && s.assignmentId.includes('female_div'))?.value ?? 0;

  // Human rights complaints
  const humanRightsComplaints = submissions
    .find(s => s.assignmentId && s.assignmentId.includes('human_rights'))?.value ?? 0;

  // CSR expenditure
  const csrExpenditure = submissions
    .filter(s => s.assignmentId && s.assignmentId.includes('csr'))
    .reduce((sum, s) => sum + (typeof s.value === 'number' ? s.value : 0), 0);

  // Governance incidents
  const governanceIncidents = submissions
    .filter(s => s.assignmentId && s.assignmentId.includes('gov_inc'))
    .length;

  // Open ESG risks
  const openRisks = assignments.filter(a => a.riskLevel === 'High' || a.riskLevel === 'Critical').length;

  // Audit observations
  const auditObservations = assignments.reduce((cnt, a) => cnt + (a.auditHistory?.length || 0), 0);

  const completionPercentage = Math.round((approvedAssignments / totalAssignments) * 100);
  const pendingReviews = assignments.filter(a => a.status === 'under_review').length;

  // Environment metrics for dashboard display
  const waterData = submissions.filter(s => s.assignmentId === 'a_2').reduce((acc, cur) => acc + cur.value, 0);
  const energyData = submissions.filter(s => s.assignmentId === 'a_1').reduce((acc, cur) => acc + cur.value, 0);

  return (
    <div className="space-y-8">
      <PageHeader
        title="Executive Sustainability Dashboard"
        description="Consolidated overview of group-wide ESG performance, approved BRSR disclosures, compliance indicators, critical risks, and report sign-off readiness."
      />

      <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-xs flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-2 text-xs font-bold text-slate-700 uppercase tracking-wider">
          <span>Executive Actions</span>
        </div>
        <div className="flex flex-wrap items-center gap-2">
          <button
            type="button"
            onClick={() => navigate('/management/sign-off')}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-indigo-800 bg-indigo-50 hover:bg-indigo-100 border border-indigo-200 rounded-lg transition-colors"
          >
            <FileCheck2 className="w-3.5 h-3.5 text-indigo-700" />
            <span>Review Sign-Off Prerequisites</span>
          </button>
          <button
            type="button"
            onClick={() => navigate('/management/brsr-readiness')}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-emerald-800 bg-emerald-50 hover:bg-emerald-100 border border-emerald-200 rounded-lg transition-colors"
          >
            <ClipboardCheck className="w-3.5 h-3.5 text-emerald-700" />
            <span>View BRSR Readiness</span>
          </button>
          <button
            type="button"
            onClick={() => navigate('/management/risks')}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-rose-800 bg-rose-50 hover:bg-rose-100 border border-rose-200 rounded-lg transition-colors"
          >
            <AlertTriangle className="w-3.5 h-3.5 text-rose-600" />
            <span>Review Risks &amp; Exceptions</span>
          </button>
          <button
            type="button"
            onClick={() => navigate('/management/reports')}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-lg transition-colors"
          >
            <FileSpreadsheet className="w-3.5 h-3.5 text-slate-600" />
            <span>Open Reports Archive</span>
          </button>
        </div>
      </div>

      <div>
        <h2 className="text-sm font-semibold text-slate-700 uppercase tracking-wider mb-4">
          Executive Performance Indicators
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
          <MetricCard
            title="Overall BRSR Completion"
            value={`${completionPercentage}%`}
            icon={ClipboardCheck}
            iconBg="bg-indigo-50"
            iconColor="text-indigo-700"
            accentBorder="border-l-indigo-600"
          />
          <MetricCard
            title="Approved Data Coverage"
            value={`${approvedAssignments} / ${assignments.length}`}
            icon={CheckCircle2}
            iconBg="bg-emerald-50"
            iconColor="text-emerald-600"
            accentBorder="border-l-emerald-500"
          />
          <MetricCard
            title="Pending Reviews"
            value={pendingReviews.toString()}
            icon={Clock}
            iconBg="bg-amber-50"
            iconColor="text-amber-600"
            accentBorder="border-l-amber-500"
          />
          <MetricCard
            title="Critical ESG Exceptions"
            value={openRisks.toString()}
            icon={AlertTriangle}
            iconBg="bg-rose-50"
            iconColor="text-rose-600"
            accentBorder="border-l-rose-500"
          />
          <MetricCard
            title="Targets Off Track"
            value={pendingApprovals.toString()}
            icon={Target}
            iconBg="bg-orange-50"
            iconColor="text-orange-600"
            accentBorder="border-l-orange-500"
          />
          <MetricCard
            title="Management Sign-Off"
            value={pendingApprovals.toString()}
            icon={FileCheck2}
            iconBg="bg-sky-50"
            iconColor="text-sky-700"
            accentBorder="border-l-sky-600"
          />
        </div>
      </div>

      <div>
        <h2 className="text-sm font-semibold text-slate-700 uppercase tracking-wider mb-4">
          Executive Monitoring &amp; Analytics
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-xs flex flex-col justify-between">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100 mb-4">
              <h3 className="text-sm font-bold text-slate-800">ESG Performance Trend</h3>
              <TrendingUp className="w-4 h-4 text-slate-400" />
            </div>
            <EmptyState
              icon={TrendingUp}
              title="No approved ESG data is available."
              description="Management analytics and historical performance comparisons will appear after backend integration."
              compact
            />
          </div>

          <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-xs flex flex-col justify-between">
            <div className="flex items-center justify-between pb-3 border-slate-100 mb-4">
              <h3 className="text-sm font-bold text-slate-800">Environmental (GHG, Energy, Water)</h3>
              <Leaf className="w-4 h-4 text-emerald-500" />
            </div>
            {waterData > 0 || energyData > 0 ? (
              <div className="space-y-3">
                <div className="flex justify-between items-center border-b border-slate-100 pb-2">
                  <span className="text-xs text-slate-500">Total Water Consumption</span>
                  <span className="font-semibold">{waterData.toLocaleString()} KL</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-xs text-slate-500">Total Energy Consumption</span>
                  <span className="font-semibold">{energyData.toLocaleString()} MWh</span>
                </div>
              </div>
            ) : (
              <EmptyState
                icon={Leaf}
                title="No Environmental Data"
                description="Scope 1-3 GHG emissions, energy mix, and resource metrics will be summarized here once verified by Reviewers."
                compact
              />
            )}
          </div>

          <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-xs flex flex-col justify-between">
            <div className="flex items-center justify-between pb-3 border-slate-100 mb-4">
              <h3 className="text-sm font-bold text-slate-800">Social (Workforce, Safety, CSR)</h3>
              <Users className="w-4 h-4 text-blue-500" />
            </div>
            <EmptyState
              icon={Users}
              title="No Social Metrics Available"
              description="Workforce diversity, occupational health and safety metrics, training hours, and CSR beneficiaries will appear here."
              compact
            />
          </div>

          <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-xs flex flex-col justify-between">
            <div className="flex items-center justify-between pb-3 border-slate-100 mb-4">
              <h3 className="text-sm font-bold text-slate-800">Governance (Compliance &amp; Ethics)</h3>
              <ShieldCheck className="w-4 h-4 text-indigo-500" />
            </div>
            <EmptyState
              icon={ShieldCheck}
              title="No Governance Records"
              description="Board composition, anti-corruption training, grievance redressal, and regulatory compliance will be tracked here."
              compact
            />
          </div>

          <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-xs flex flex-col justify-between">
            <div className="flex items-center justify-between pb-3 border-slate-100 mb-4">
              <h3 className="text-sm font-bold text-slate-800">BRSR Section Completion</h3>
              <BarChart3 className="w-4 h-4 text-slate-400" />
            </div>
            <EmptyState
              icon={BarChart3}
              title="No Section Progress"
              description="Completion rate across Section A (General), Section B (Management), and Section C (Principles 1-9) will display here."
              compact
            />
          </div>

          <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-xs flex flex-col justify-between">
            <div className="flex items-center justify-between pb-3 border-slate-100 mb-4">
              <h3 className="text-sm font-bold text-slate-800">Subsidiary Contribution</h3>
              <PieChart className="w-4 h-4 text-slate-400" />
            </div>
            <EmptyState
              icon={PieChart}
              title="No Subsidiary Data"
              description="Comparative ESG contributions and disclosure readiness across MEIL Group legal entities will appear here."
              compact
            />
          </div>

          <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-xs flex flex-col justify-between">
            <div className="flex items-center justify-between pb-3 border-slate-100 mb-4">
              <h3 className="text-sm font-bold text-slate-800">Critical Risks &amp; Exceptions</h3>
              <AlertTriangle className="w-4 h-4 text-rose-500" />
            </div>
            <EmptyState
              icon={AlertTriangle}
              title="No Critical Exceptions"
              description="High-severity validation discrepancies, overdue corrective action items, and audit flags will be prioritized here."
              compact
            />
          </div>

          <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-xs flex flex-col justify-between">
            <div className="flex items-center justify-between pb-3 border-slate-100 mb-4">
              <h3 className="text-sm font-bold text-slate-800">Targets Requiring Attention</h3>
              <Target className="w-4 h-4 text-amber-500" />
            </div>
            <EmptyState
              icon={Target}
              title="No Target Alerts"
              description="Sustainability targets categorized as Off Track or At Risk will be flagged here for executive intervention."
              compact
            />
          </div>

          <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-xs flex flex-col justify-between">
            <div className="flex items-center justify-between pb-3 border-slate-100 mb-4">
              <h3 className="text-sm font-bold text-slate-800">Recent Management Activity</h3>
              <Activity className="w-4 h-4 text-slate-400" />
            </div>
            <EmptyState
              icon={Activity}
              title="No Activity Logged"
              description="Executive sign-off reviews, transmittal authorizations, and clarification requests will stream into this feed."
              compact
            />
          </div>
        </div>
      </div>
    </div>
  );
};


import {
  ClipboardCheck,
  CheckCircle2,
  Clock,
  AlertTriangle,
  Target,
  FileCheck2,
  TrendingUp,
  Leaf,
  Users,
  ShieldCheck,
  BarChart3,
  PieChart,
  Activity,
  FileSpreadsheet,
} from 'lucide-react';
import { PageHeader } from '../../admin/common/PageHeader';
import { EmptyState } from '../../admin/common/EmptyState';
import { MetricCard } from '../../admin/common/MetricCard';
import { useNexusData } from '../../../context/NexusDataContext';

export const ManagementDashboard: React.FC = () => {
  const navigate = useNavigate();
  const { assignments, submissions } = useNexusData();

  const totalAssignments = assignments.length || 1; // prevent divide by zero
  const approvedAssignments = assignments.filter(a => a.status === 'approved').length;
  const pendingApprovals = assignments.filter(a => a.status === 'under_review' || a.status === 'correction_requested').length;
  const esgReadiness = Math.round((approvedAssignments / totalAssignments) * 100);

  // BRSR readiness based on core assignments approved
  const coreAssignments = assignments.filter(a => a.isBrsrCore);
  const coreApproved = coreAssignments.filter(a => a.status === 'approved').length;
  const brsrReadiness = coreAssignments.length ? Math.round((coreApproved / coreAssignments.length) * 100) : 0;

  // GHG emissions totals
  const ghgScope1 = submissions
    .filter(s => s.assignmentId && s.assignmentId.includes('scope1'))
    .reduce((sum, s) => sum + (typeof s.value === 'number' ? s.value : 0), 0);
  const ghgScope2 = submissions
    .filter(s => s.assignmentId && s.assignmentId.includes('scope2'))
    .reduce((sum, s) => sum + (typeof s.value === 'number' ? s.value : 0), 0);
  const ghgScope3 = submissions
    .filter(s => s.assignmentId && s.assignmentId.includes('scope3'))
    .reduce((sum, s) => sum + (typeof s.value === 'number' ? s.value : 0), 0);

  // Energy consumption and renewable share
  const energyConsumption = submissions
    .filter(s => s.assignmentId && s.assignmentId.includes('energy'))
    .reduce((sum, s) => sum + (s.activityValue || 0), 0);
  const renewableEnergy = submissions
    .filter(s => s.assignmentId && s.assignmentId.includes('renew'))
    .reduce((sum, s) => sum + (typeof s.value === 'number' ? s.value : 0), 0);
  const renewablePct = energyConsumption ? Math.round((renewableEnergy / energyConsumption) * 100) : 0;

  // Water consumption
  const waterConsumption = submissions
    .filter(s => s.assignmentId && s.assignmentId.includes('water'))
    .reduce((sum, s) => sum + (typeof s.value === 'number' ? s.value : 0), 0);

  // Waste generation and recycled %
  const wasteGeneration = submissions
    .filter(s => s.assignmentId && s.assignmentId.includes('waste'))
    .reduce((sum, s) => sum + (typeof s.value === 'number' ? s.value : 0), 0);
  const wasteRecycled = submissions
    .filter(s => s.assignmentId && s.assignmentId.includes('recyc'))
    .reduce((sum, s) => sum + (typeof s.value === 'number' ? s.value : 0), 0);
  const wasteRecycledPct = wasteGeneration ? Math.round((wasteRecycled / wasteGeneration) * 100) : 0;

  // Safety incidents
  const safetyIncidents = submissions
    .filter(s => s.assignmentId && s.assignmentId.includes('safety'))
    .length;

  // Gender diversity percentage
  const genderDiversity = submissions
    .find(s => s.assignmentId && s.assignmentId.includes('female_div'))?.value ?? 0;

  // Human rights complaints
  const humanRightsComplaints = submissions
    .find(s => s.assignmentId && s.assignmentId.includes('human_rights'))?.value ?? 0;

  // CSR expenditure
  const csrExpenditure = submissions
    .filter(s => s.assignmentId && s.assignmentId.includes('csr'))
    .reduce((sum, s) => sum + (typeof s.value === 'number' ? s.value : 0), 0);

  // Governance incidents
  const governanceIncidents = submissions
    .filter(s => s.assignmentId && s.assignmentId.includes('gov_inc'))
    .length;

  // Open ESG risks
  const openRisks = assignments.filter(a => a.riskLevel === 'High' || a.riskLevel === 'Critical').length;

  // Audit observations
  const auditObservations = assignments.reduce((cnt, a) => cnt + (a.auditHistory?.length || 0), 0);

  const completionPercentage = Math.round((approvedAssignments / totalAssignments) * 100);
  const pendingReviews = assignments.filter(a => a.status === 'under_review').length;

  const waterData = submissions.filter(s => s.assignmentId === 'a_2').reduce((acc, curr) => acc + curr.value, 0);
  const energyData = submissions.filter(s => s.assignmentId === 'a_1').reduce((acc, curr) => acc + curr.value, 0);

  return (
    <div className="space-y-8">
      <PageHeader
        title="Executive Sustainability Dashboard"
        description="Consolidated overview of group-wide ESG performance, approved BRSR disclosures, compliance indicators, critical risks, and report sign-off readiness."
      />

      <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-xs flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-2 text-xs font-bold text-slate-700 uppercase tracking-wider">
          <span>Executive Actions</span>
        </div>
        <div className="flex flex-wrap items-center gap-2">
          <button
            type="button"
            onClick={() => navigate('/management/sign-off')}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-indigo-800 bg-indigo-50 hover:bg-indigo-100 border border-indigo-200 rounded-lg transition-colors"
          >
            <FileCheck2 className="w-3.5 h-3.5 text-indigo-700" />
            <span>Review Sign-Off Prerequisites</span>
          </button>
          <button
            type="button"
            onClick={() => navigate('/management/brsr-readiness')}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-emerald-800 bg-emerald-50 hover:bg-emerald-100 border border-emerald-200 rounded-lg transition-colors"
          >
            <ClipboardCheck className="w-3.5 h-3.5 text-emerald-700" />
            <span>View BRSR Readiness</span>
          </button>
          <button
            type="button"
            onClick={() => navigate('/management/risks')}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-rose-800 bg-rose-50 hover:bg-rose-100 border border-rose-200 rounded-lg transition-colors"
          >
            <AlertTriangle className="w-3.5 h-3.5 text-rose-600" />
            <span>Review Risks &amp; Exceptions</span>
          </button>
          <button
            type="button"
            onClick={() => navigate('/management/reports')}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-lg transition-colors"
          >
            <FileSpreadsheet className="w-3.5 h-3.5 text-slate-600" />
            <span>Open Reports Archive</span>
          </button>
        </div>
      </div>

      <div>
        <h2 className="text-sm font-semibold text-slate-700 uppercase tracking-wider mb-4">
          Executive Performance Indicators
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
          <MetricCard
            title="Overall BRSR Completion"
            value={`${completionPercentage}%`}
            icon={ClipboardCheck}
            iconBg="bg-indigo-50"
            iconColor="text-indigo-700"
            accentBorder="border-l-indigo-600"
          />
          <MetricCard
            title="Approved Data Coverage"
            value={`${approvedAssignments} / ${assignments.length}`}
            icon={CheckCircle2}
            iconBg="bg-emerald-50"
            iconColor="text-emerald-600"
            accentBorder="border-l-emerald-500"
          />
          <MetricCard
            title="Pending Reviews"
            value={pendingReviews.toString()}
            icon={Clock}
            iconBg="bg-amber-50"
            iconColor="text-amber-600"
            accentBorder="border-l-amber-500"
          />
          <MetricCard
            title="Critical ESG Exceptions"
            value={openRisks.toString()}
            icon={AlertTriangle}
            iconBg="bg-rose-50"
            iconColor="text-rose-600"
            accentBorder="border-l-rose-500"
          />
          <MetricCard
            title="Targets Off Track"
            value={pendingApprovals.toString()}
            icon={Target}
            iconBg="bg-orange-50"
            iconColor="text-orange-600"
            accentBorder="border-l-orange-500"
          />
          <MetricCard
            title="Management Sign-Off"
            value={pendingApprovals.toString()}
            icon={FileCheck2}
            iconBg="bg-sky-50"
            iconColor="text-sky-700"
            accentBorder="border-l-sky-600"
          />
        </div>
      </div>

      <div>
        <h2 className="text-sm font-semibold text-slate-700 uppercase tracking-wider mb-4">
          Executive Monitoring &amp; Analytics
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-xs flex flex-col justify-between">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100 mb-4">
              <h3 className="text-sm font-bold text-slate-800">ESG Performance Trend</h3>
              <TrendingUp className="w-4 h-4 text-slate-400" />
            </div>
            <EmptyState
              icon={TrendingUp}
              title="No approved ESG data is available."
              description="Management analytics and historical performance comparisons will appear after backend integration."
              compact
            />
          </div>

          <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-xs flex flex-col justify-between">
            <div className="flex items-center justify-between pb-3 border-slate-100 mb-4">
              <h3 className="text-sm font-bold text-slate-800">Environmental (GHG, Energy, Water)</h3>
              <Leaf className="w-4 h-4 text-emerald-500" />
            </div>
            {waterData > 0 || energyData > 0 ? (
              <div className="space-y-3">
                <div className="flex justify-between items-center border-b border-slate-100 pb-2">
                  <span className="text-xs text-slate-500">Total Water Consumption</span>
                  <span className="font-semibold">{waterData.toLocaleString()} KL</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-xs text-slate-500">Total Energy Consumption</span>
                  <span className="font-semibold">{energyData.toLocaleString()} MWh</span>
                </div>
              </div>
            ) : (
              <EmptyState
                icon={Leaf}
                title="No Environmental Data"
                description="Scope 1-3 GHG emissions, energy mix, and resource metrics will be summarized here once verified by Reviewers."
                compact
              />
            )}
          </div>

          <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-xs flex flex-col justify-between">
            <div className="flex items-center justify-between pb-3 border-slate-100 mb-4">
              <h3 className="text-sm font-bold text-slate-800">Social (Workforce, Safety, CSR)</h3>
              <Users className="w-4 h-4 text-blue-500" />
            </div>
            <EmptyState
              icon={Users}
              title="No Social Metrics Available"
              description="Workforce diversity, occupational health and safety metrics, training hours, and CSR beneficiaries will appear here."
              compact
            />
          </div>

          <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-xs flex flex-col justify-between">
            <div className="flex items-center justify-between pb-3 border-slate-100 mb-4">
              <h3 className="text-sm font-bold text-slate-800">Governance (Compliance &amp; Ethics)</h3>
              <ShieldCheck className="w-4 h-4 text-indigo-500" />
            </div>
            <EmptyState
              icon={ShieldCheck}
              title="No Governance Records"
              description="Board composition, anti-corruption training, grievance redressal, and regulatory compliance will be tracked here."
              compact
            />
          </div>

          <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-xs flex flex-col justify-between">
            <div className="flex items-center justify-between pb-3 border-slate-100 mb-4">
              <h3 className="text-sm font-bold text-slate-800">BRSR Section Completion</h3>
              <BarChart3 className="w-4 h-4 text-slate-400" />
            </div>
            <EmptyState
              icon={BarChart3}
              title="No Section Progress"
              description="Completion rate across Section A (General), Section B (Management), and Section C (Principles 1-9) will display here."
              compact
            />
          </div>

          <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-xs flex flex-col justify-between">
            <div className="flex items-center justify-between pb-3 border-slate-100 mb-4">
              <h3 className="text-sm font-bold text-slate-800">Subsidiary Contribution</h3>
              <PieChart className="w-4 h-4 text-slate-400" />
            </div>
            <EmptyState
              icon={PieChart}
              title="No Subsidiary Data"
              description="Comparative ESG contributions and disclosure readiness across MEIL Group legal entities will appear here."
              compact
            />
          </div>

          <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-xs flex flex-col justify-between">
            <div className="flex items-center justify-between pb-3 border-slate-100 mb-4">
              <h3 className="text-sm font-bold text-slate-800">Critical Risks &amp; Exceptions</h3>
              <AlertTriangle className="w-4 h-4 text-rose-500" />
            </div>
            <EmptyState
              icon={AlertTriangle}
              title="No Critical Exceptions"
              description="High-severity validation discrepancies, overdue corrective action items, and audit flags will be prioritized here."
              compact
            />
          </div>

          <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-xs flex flex-col justify-between">
            <div className="flex items-center justify-between pb-3 border-slate-100 mb-4">
              <h3 className="text-sm font-bold text-slate-800">Targets Requiring Attention</h3>
              <Target className="w-4 h-4 text-amber-500" />
            </div>
            <EmptyState
              icon={Target}
              title="No Target Alerts"
              description="Sustainability targets categorized as Off Track or At Risk will be flagged here for executive intervention."
              compact
            />
          </div>

          <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-xs flex flex-col justify-between">
            <div className="flex items-center justify-between pb-3 border-slate-100 mb-4">
              <h3 className="text-sm font-bold text-slate-800">Recent Management Activity</h3>
              <Activity className="w-4 h-4 text-slate-400" />
            </div>
            <EmptyState
              icon={Activity}
              title="No Activity Logged"
              description="Executive sign-off reviews, transmittal authorizations, and clarification requests will stream into this feed."
              compact
            />
          </div>
        </div>
      </div>
    </div>
  );
};


import {
  ClipboardCheck,
  CheckCircle2,
  Clock,
  AlertTriangle,
  Target,
  FileCheck2,
  TrendingUp,
  Leaf,
  Users,
  ShieldCheck,
  BarChart3,
  PieChart,
  Activity,
  FileSpreadsheet,
} from 'lucide-react';
import { PageHeader } from '../../admin/common/PageHeader';
import { EmptyState } from '../../admin/common/EmptyState';
import { useNexusData } from '../../../context/NexusDataContext';

export const ManagementDashboard: React.FC = () => {
  const navigate = useNavigate();
  const { assignments, submissions } = useNexusData();

  const totalAssignments = assignments.length || 1; // prevent divide by zero
  const approvedAssignments = assignments.filter(a => a.status === 'approved').length;
  const pendingApprovals = assignments.filter(a => a.status === 'under_review' || a.status === 'correction_requested').length;
  const esgReadiness = Math.round((approvedAssignments / totalAssignments) * 100);

  // BRSR readiness based on core assignments approved
  const coreAssignments = assignments.filter(a => a.isBrsrCore);
  const coreApproved = coreAssignments.filter(a => a.status === 'approved').length;
  const brsrReadiness = coreAssignments.length ? Math.round((coreApproved / coreAssignments.length) * 100) : 0;

  // GHG emissions totals
  const ghgScope1 = submissions
    .filter(s => s.assignmentId && s.assignmentId.includes('scope1'))
    .reduce((sum, s) => sum + (typeof s.value === 'number' ? s.value : 0), 0);
  const ghgScope2 = submissions
    .filter(s => s.assignmentId && s.assignmentId.includes('scope2'))
    .reduce((sum, s) => sum + (typeof s.value === 'number' ? s.value : 0), 0);
  const ghgScope3 = submissions
    .filter(s => s.assignmentId && s.assignmentId.includes('scope3'))
    .reduce((sum, s) => sum + (typeof s.value === 'number' ? s.value : 0), 0);

  // Energy consumption and renewable share
  const energyConsumption = submissions
    .filter(s => s.assignmentId && s.assignmentId.includes('energy'))
    .reduce((sum, s) => sum + (s.activityValue || 0), 0);
  const renewableEnergy = submissions
    .filter(s => s.assignmentId && s.assignmentId.includes('renew'))
    .reduce((sum, s) => sum + (typeof s.value === 'number' ? s.value : 0), 0);
  const renewablePct = energyConsumption ? Math.round((renewableEnergy / energyConsumption) * 100) : 0;

  // Water consumption
  const waterConsumption = submissions
    .filter(s => s.assignmentId && s.assignmentId.includes('water'))
    .reduce((sum, s) => sum + (typeof s.value === 'number' ? s.value : 0), 0);

  // Waste generation and recycled % (assume indicator with 'waste' and 'recyc')
  const wasteGeneration = submissions
    .filter(s => s.assignmentId && s.assignmentId.includes('waste'))
    .reduce((sum, s) => sum + (typeof s.value === 'number' ? s.value : 0), 0);
  const wasteRecycled = submissions
    .filter(s => s.assignmentId && s.assignmentId.includes('recyc'))
    .reduce((sum, s) => sum + (typeof s.value === 'number' ? s.value : 0), 0);
  const wasteRecycledPct = wasteGeneration ? Math.round((wasteRecycled / wasteGeneration) * 100) : 0;

  // Safety incidents (count submissions with safety indicator)
  const safetyIncidents = submissions
    .filter(s => s.assignmentId && s.assignmentId.includes('safety'))
    .length;

  // Gender diversity percentage (indicator DIV_FEM)
  const genderDiversity = submissions
    .find(s => s.assignmentId && s.assignmentId.includes('female_div'))?.value ?? 0;

  // Human rights complaints (indicator HR_COMPLAINTS)
  const humanRightsComplaints = submissions
    .find(s => s.assignmentId && s.assignmentId.includes('human_rights'))?.value ?? 0;

  // CSR expenditure (indicator CSR)
  const csrExpenditure = submissions
    .filter(s => s.assignmentId && s.assignmentId.includes('csr'))
    .reduce((sum, s) => sum + (typeof s.value === 'number' ? s.value : 0), 0);

  // Governance incidents (indicator GOV_INCIDENT)
  const governanceIncidents = submissions
    .filter(s => s.assignmentId && s.assignmentId.includes('gov_inc'))
    .length;

  // Open ESG risks (assignments with riskLevel High or Critical)
  const openRisks = assignments.filter(a => a.riskLevel === 'High' || a.riskLevel === 'Critical').length;

  // Audit observations (count of auditHistory entries)
  const auditObservations = (assignments.reduce((cnt, a) => cnt + (a.auditHistory?.length || 0), 0)) || 0;

  const approvedAssignments = assignments.filter(a => a.status === 'approved').length;
  const completionPercentage = Math.round((approvedAssignments / totalAssignments) * 100);
  const pendingReviews = assignments.filter(a => a.status === 'under_review').length;
  
  // Calculate Environment Metrics
  const waterData = submissions.filter(s => s.assignmentId === 'a_2').reduce((acc, curr) => acc + curr.value, 0);
  const energyData = submissions.filter(s => s.assignmentId === 'a_1').reduce((acc, curr) => acc + curr.value, 0);

  return (
    <div className="space-y-8">
      {/* Page Header */}
      <PageHeader
        title="Executive Sustainability Dashboard"
        description="Consolidated overview of group-wide ESG performance, approved BRSR disclosures, compliance indicators, critical risks, and report sign-off readiness."
      />

      {/* Quick Actions Bar */}
      <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-xs flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-2 text-xs font-bold text-slate-700 uppercase tracking-wider">
          <span>Executive Actions</span>
        </div>
        <div className="flex flex-wrap items-center gap-2">
          <button
            type="button"
            onClick={() => navigate('/management/sign-off')}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-indigo-800 bg-indigo-50 hover:bg-indigo-100 border border-indigo-200 rounded-lg transition-colors"
          >
            <FileCheck2 className="w-3.5 h-3.5 text-indigo-700" />
            <span>Review Sign-Off Prerequisites</span>
          </button>
          <button
            type="button"
            onClick={() => navigate('/management/brsr-readiness')}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-emerald-800 bg-emerald-50 hover:bg-emerald-100 border border-emerald-200 rounded-lg transition-colors"
          >
            <ClipboardCheck className="w-3.5 h-3.5 text-emerald-700" />
            <span>View BRSR Readiness</span>
          </button>
          <button
            type="button"
            onClick={() => navigate('/management/risks')}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-rose-800 bg-rose-50 hover:bg-rose-100 border border-rose-200 rounded-lg transition-colors"
          >
            <AlertTriangle className="w-3.5 h-3.5 text-rose-600" />
            <span>Review Risks &amp; Exceptions</span>
          </button>
          <button
            type="button"
            onClick={() => navigate('/management/reports')}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-lg transition-colors"
          >
            <FileSpreadsheet className="w-3.5 h-3.5 text-slate-600" />
            <span>Open Reports Archive</span>
          </button>
        </div>
      </div>

      {/* 6 Executive KPI Metric Cards (all display '--') */}
      <div>
        <h2 className="text-sm font-semibold text-slate-700 uppercase tracking-wider mb-4">
          Executive Performance Indicators
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
          <MetricCard
            title="Overall BRSR Completion"
            value={`${completionPercentage}%`}
            icon={ClipboardCheck}
            iconBg="bg-indigo-50"
            iconColor="text-indigo-700"
            accentBorder="border-l-indigo-600"
          />
          <MetricCard
            title="Approved Data Coverage"
            value={`${approvedAssignments} / ${assignments.length}`}
            icon={CheckCircle2}
            iconBg="bg-emerald-50"
            iconColor="text-emerald-600"
            accentBorder="border-l-emerald-500"
          />
          <MetricCard
            title="Pending Reviews"
            value={pendingReviews.toString()}
            icon={Clock}
            iconBg="bg-amber-50"
            iconColor="text-amber-600"
            accentBorder="border-l-amber-500"
          />
          <MetricCard
  title="Critical ESG Exceptions"
  value={openRisks.toString()}
  icon={AlertTriangle}
  iconBg="bg-rose-50"
  iconColor="text-rose-600"
  accentBorder="border-l-rose-500"
/>
          <MetricCard
            title="Targets Off Track"
            value="--"
            icon={Target}
            iconBg="bg-orange-50"
            iconColor="text-orange-600"
            accentBorder="border-l-orange-500"
          />
          <MetricCard
            title="Management Sign-Off"
            value="--"
            icon={FileCheck2}
            iconBg="bg-sky-50"
            iconColor="text-sky-700"
            accentBorder="border-l-sky-600"
          />
        </div>
      </div>

      {/* Analytical & Dashboard Panels Grid (9 Panels with Clean Empty States) */}
      <div>
        <h2 className="text-sm font-semibold text-slate-700 uppercase tracking-wider mb-4">
          Executive Monitoring &amp; Analytics
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {/* Panel 1: ESG Performance Trend */}
          <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-xs flex flex-col justify-between">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100 mb-4">
              <h3 className="text-sm font-bold text-slate-800">ESG Performance Trend</h3>
              <TrendingUp className="w-4 h-4 text-slate-400" />
            </div>
            <EmptyState
              icon={TrendingUp}
              title="No approved ESG data is available."
              description="Management analytics and historical performance comparisons will appear after backend integration."
              compact
            />
          </div>

          {/* Panel 2: Environmental Overview */}
          <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-xs flex flex-col justify-between">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100 mb-4">
              <h3 className="text-sm font-bold text-slate-800">Environmental (GHG, Energy, Water)</h3>
              <Leaf className="w-4 h-4 text-emerald-500" />
            </div>
            {waterData > 0 || energyData > 0 ? (
              <div className="space-y-3">
                <div className="flex justify-between items-center border-b border-slate-100 pb-2">
                  <span className="text-xs text-slate-500">Total Water Consumption</span>
                  <span className="font-semibold">{waterData.toLocaleString()} KL</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-xs text-slate-500">Total Energy Consumption</span>
                  <span className="font-semibold">{energyData.toLocaleString()} MWh</span>
                </div>
              </div>
            ) : (
              <EmptyState
                icon={Leaf}
                title="No Environmental Data"
                description="Scope 1-3 GHG emissions, energy mix, and resource metrics will be summarized here once verified by Reviewers."
                compact
              />
            )}
          </div>

          {/* Panel 3: Social Overview */}
          <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-xs flex flex-col justify-between">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100 mb-4">
              <h3 className="text-sm font-bold text-slate-800">Social (Workforce, Safety, CSR)</h3>
              <Users className="w-4 h-4 text-blue-500" />
            </div>
            <EmptyState
              icon={Users}
              title="No Social Metrics Available"
              description="Workforce diversity, occupational health and safety metrics, training hours, and CSR beneficiaries will appear here."
              compact
            />
          </div>

          {/* Panel 4: Governance Overview */}
          <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-xs flex flex-col justify-between">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100 mb-4">
              <h3 className="text-sm font-bold text-slate-800">Governance (Compliance &amp; Ethics)</h3>
              <ShieldCheck className="w-4 h-4 text-indigo-500" />
            </div>
            <EmptyState
              icon={ShieldCheck}
              title="No Governance Records"
              description="Board composition, anti-corruption training, grievance redressal, and regulatory compliance will be tracked here."
              compact
            />
          </div>

          {/* Panel 5: BRSR Completion by Section */}
          <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-xs flex flex-col justify-between">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100 mb-4">
              <h3 className="text-sm font-bold text-slate-800">BRSR Section Completion</h3>
              <BarChart3 className="w-4 h-4 text-slate-400" />
            </div>
            <EmptyState
              icon={BarChart3}
              title="No Section Progress"
              description="Completion rate across Section A (General), Section B (Management), and Section C (Principles 1-9) will display here."
              compact
            />
          </div>

          {/* Panel 6: Performance by Subsidiary */}
          <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-xs flex flex-col justify-between">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100 mb-4">
              <h3 className="text-sm font-bold text-slate-800">Subsidiary Contribution</h3>
              <PieChart className="w-4 h-4 text-slate-400" />
            </div>
            <EmptyState
              icon={PieChart}
              title="No Subsidiary Data"
              description="Comparative ESG contributions and disclosure readiness across MEIL Group legal entities will appear here."
              compact
            />
          </div>

          {/* Panel 7: Critical Risks & Exceptions */}
          <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-xs flex flex-col justify-between">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100 mb-4">
              <h3 className="text-sm font-bold text-slate-800">Critical Risks &amp; Exceptions</h3>
              <AlertTriangle className="w-4 h-4 text-rose-500" />
            </div>
            <EmptyState
              icon={AlertTriangle}
              title="No Critical Exceptions"
              description="High-severity validation discrepancies, overdue corrective action items, and audit flags will be prioritized here."
              compact
            />
          </div>

          {/* Panel 8: Targets Requiring Attention */}
          <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-xs flex flex-col justify-between">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100 mb-4">
              <h3 className="text-sm font-bold text-slate-800">Targets Requiring Attention</h3>
              <Target className="w-4 h-4 text-amber-500" />
            </div>
            <EmptyState
              icon={Target}
              title="No Target Alerts"
              description="Sustainability targets categorized as Off Track or At Risk will be flagged here for executive intervention."
              compact
            />
          </div>

          {/* Panel 9: Recent Management Activity */}
          <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-xs flex flex-col justify-between">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100 mb-4">
              <h3 className="text-sm font-bold text-slate-800">Recent Management Activity</h3>
              <Activity className="w-4 h-4 text-slate-400" />
            </div>
            <EmptyState
              icon={Activity}
              title="No Activity Logged"
              description="Executive sign-off reviews, transmittal authorizations, and clarification requests will stream into this feed."
              compact
            />
          </div>
        </div>
      </div>
    </div>
  );
};
