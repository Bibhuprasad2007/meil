import React, { useState } from 'react';
import { useOutletContext } from 'react-router-dom';
import { Layers, Download } from 'lucide-react';
import { PageHeader } from '../common/PageHeader';
import { EmptyState } from '../common/EmptyState';
import { BRSRFrameworkService } from '../../../services';

interface OutletContextType {
  addToast: (message: string, type?: 'info' | 'success' | 'warning' | 'error') => void;
}

export const BRSRFrameworkPage: React.FC = () => {
  const { addToast } = useOutletContext<OutletContextType>();
  const [activeSection, setActiveSection] = useState<'A' | 'B' | 'C' | 'CORE'>('A');
  const [selectedPrinciple, setSelectedPrinciple] = useState<string>('P1');

  const PRINCIPLES = [
    { id: 'P1', code: 'Principle 1', title: 'Ethics and Accountability' },
    { id: 'P2', code: 'Principle 2', title: 'Sustainable Products and Services' },
    { id: 'P3', code: 'Principle 3', title: 'Employee Wellbeing' },
    { id: 'P4', code: 'Principle 4', title: 'Stakeholder Interests' },
    { id: 'P5', code: 'Principle 5', title: 'Human Rights' },
    { id: 'P6', code: 'Principle 6', title: 'Environment' },
    { id: 'P7', code: 'Principle 7', title: 'Public Policy' },
    { id: 'P8', code: 'Principle 8', title: 'Inclusive Growth' },
    { id: 'P9', code: 'Principle 9', title: 'Customers' },
  ];

  const handleImportFramework = async () => {
    try {
      await BRSRFrameworkService.importFramework();
    } catch (err: unknown) {
      const message =
        err instanceof Error
          ? err.message
          : 'Backend connection is required to import framework metadata.';
      addToast(message, 'warning');
    }
  };

  return (
    <div className="space-y-6">
      <PageHeader
        title="BRSR Framework & Taxonomy Management"
        description="SEBI Business Responsibility and Sustainability Reporting (BRSR) framework structure, essential & leadership indicators, and ESG metrics."
        actionText="Import Approved Framework"
        actionIcon={Download}
        onAction={handleImportFramework}
      />

      {/* Structural Section Tabs */}
      <div className="bg-white p-2 rounded-xl border border-slate-200 shadow-xs flex flex-wrap gap-2">
        <button
          type="button"
          onClick={() => setActiveSection('A')}
          className={`flex-1 min-w-[200px] py-2.5 px-4 rounded-lg text-xs sm:text-sm font-semibold transition-all ${
            activeSection === 'A'
              ? 'bg-[#003B73] text-white shadow-xs'
              : 'text-slate-600 hover:bg-slate-100'
          }`}
        >
          Section A: General Disclosures
        </button>

        <button
          type="button"
          onClick={() => setActiveSection('B')}
          className={`flex-1 min-w-[200px] py-2.5 px-4 rounded-lg text-xs sm:text-sm font-semibold transition-all ${
            activeSection === 'B'
              ? 'bg-[#003B73] text-white shadow-xs'
              : 'text-slate-600 hover:bg-slate-100'
          }`}
        >
          Section B: Management & Process
        </button>

        <button
          type="button"
          onClick={() => setActiveSection('C')}
          className={`flex-1 min-w-[200px] py-2.5 px-4 rounded-lg text-xs sm:text-sm font-semibold transition-all ${
            activeSection === 'C'
              ? 'bg-[#003B73] text-white shadow-xs'
              : 'text-slate-600 hover:bg-slate-100'
          }`}
        >
          Section C: Principle-wise Performance
        </button>

        <button
          type="button"
          onClick={() => setActiveSection('CORE')}
          className={`flex-1 min-w-[150px] py-2.5 px-4 rounded-lg text-xs sm:text-sm font-semibold transition-all ${
            activeSection === 'CORE'
              ? 'bg-[#E31E24] text-white shadow-xs'
              : 'text-slate-600 hover:bg-slate-100'
          }`}
        >
          BRSR Core (SEBI KPIs)
        </button>
      </div>

      {/* Principle Selector Strip (Active in Section C & BRSR Core) */}
      {(activeSection === 'C' || activeSection === 'CORE') && (
        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-xs">
          <div className="flex items-center justify-between pb-2 mb-3 border-b border-slate-100">
            <span className="text-xs font-semibold text-slate-700 uppercase tracking-wider">
              National Voluntary Guidelines (NVG) Principles
            </span>
            <span className="text-xs text-slate-400">P1 through P9</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2">
            {PRINCIPLES.map((p) => (
              <button
                key={p.id}
                type="button"
                onClick={() => setSelectedPrinciple(p.id)}
                className={`p-2.5 text-left rounded-lg border text-xs transition-all ${
                  selectedPrinciple === p.id
                    ? 'border-[#003B73] bg-sky-50/80 font-bold text-[#003B73]'
                    : 'border-slate-200 hover:border-slate-300 text-slate-700 hover:bg-slate-50'
                }`}
              >
                <span className="font-semibold block text-[11px] text-slate-500 uppercase">
                  {p.code}
                </span>
                <span className="truncate block">{p.title}</span>
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Main Framework Content Empty Shell */}
      <div className="bg-white p-8 rounded-xl border border-slate-200 shadow-xs">
        <EmptyState
          icon={Layers}
          title="No framework data loaded"
          description="The approved BRSR framework will be loaded after backend integration. In production, this module provides granular guidance notes, input field schemas, emission factor mappings, and mandatory validation logic for all SEBI disclosures."
          actionText="Import Approved Framework"
          onAction={handleImportFramework}
          secondaryNote="Framework taxonomy v2.4 (SEBI BRSR Core aligned)"
        />
      </div>
    </div>
  );
};
