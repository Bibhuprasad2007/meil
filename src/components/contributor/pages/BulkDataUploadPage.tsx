import React, { useState } from 'react';
import { useOutletContext } from 'react-router-dom';
import {
  UploadCloud,
  FileSpreadsheet,
  Download,
  AlertCircle,
  Layers,
  Send,
  X,
} from 'lucide-react';
import { PageHeader } from '../../admin/common/PageHeader';
import { DataTableShell } from '../../admin/common/DataTableShell';

const STEPS = [
  { number: 1, title: 'Scope & Cycle', desc: 'Select assigned boundary' },
  { number: 2, title: 'Download Template', desc: 'Pre-formatted schema' },
  { number: 3, title: 'Upload File', desc: 'XLSX or CSV' },
  { number: 4, title: 'Validate Rows', desc: 'Automated sanity check' },
  { number: 5, title: 'Review Errors', desc: 'Fix discrepancies' },
  { number: 6, title: 'Submit Records', desc: 'Ingest to BRSR' },
];

export const BulkDataUploadPage: React.FC = () => {
  const { addToast } = useOutletContext<{
    addToast: (msg: string, type?: 'info' | 'success' | 'warning' | 'error') => void;
  }>();

  const [selectedCycle, setSelectedCycle] = useState('');
  const [selectedScope, setSelectedScope] = useState('');
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [fileError, setFileError] = useState<string | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFileError(null);
    const files = e.target.files;
    if (!files || files.length === 0) return;

    const file = files[0];
    const ext = file.name.split('.').pop()?.toLowerCase();
    if (ext !== 'xlsx' && ext !== 'csv') {
      setFileError('Unsupported format. Please upload an .xlsx or .csv spreadsheet.');
      setSelectedFile(null);
      return;
    }

    if (file.size > 20 * 1024 * 1024) {
      setFileError('File size exceeds 20MB limit.');
      setSelectedFile(null);
      return;
    }

    setSelectedFile(file);
    addToast(`Selected ${file.name}. Backend parsing service is not yet connected.`, 'info');
  };

  const handleDownloadTemplate = () => {
    addToast('Templates will be generated from assigned disclosures after backend integration.', 'info');
  };

  return (
    <div className="space-y-6">
      <PageHeader
        title="Bulk ESG Data Ingestion"
        description="Upload batch operational ESG metrics, electricity billing schedules, fuel logs, and safety records using standardized BRSR spreadsheets."
      />

      {/* 6-Step Workflow Breadcrumb */}
      <div className="bg-white p-4 sm:p-5 rounded-xl border border-slate-200 shadow-xs overflow-x-auto">
        <div className="flex items-center min-w-[640px] justify-between gap-2">
          {STEPS.map((step, idx) => (
            <React.Fragment key={step.number}>
              <div className="flex items-center gap-2">
                <div className="w-7 h-7 rounded-full bg-teal-50 border border-teal-200 text-teal-800 flex items-center justify-center text-xs font-bold shrink-0">
                  {step.number}
                </div>
                <div>
                  <p className="text-xs font-bold text-slate-800 leading-tight">{step.title}</p>
                  <p className="text-[10px] text-slate-400">{step.desc}</p>
                </div>
              </div>
              {idx < STEPS.length - 1 && (
                <div className="flex-1 h-[2px] bg-slate-100 min-w-[20px] mx-1" />
              )}
            </React.Fragment>
          ))}
        </div>
      </div>

      {/* Step 1 & 2: Scope Selection & Template Download */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {/* Scope Selection Card */}
        <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-xs space-y-4">
          <div className="flex items-center gap-2 pb-2 border-b border-slate-100">
            <Layers className="w-4 h-4 text-teal-700" />
            <h3 className="text-xs font-bold text-slate-800 uppercase tracking-wider">
              Step 1: Reporting Scope &amp; Cycle
            </h3>
          </div>

          <div className="space-y-3">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Reporting Cycle
              </label>
              <select
                value={selectedCycle}
                onChange={(e) => setSelectedCycle(e.target.value)}
                className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-lg text-slate-800 focus:bg-white focus:border-teal-700"
              >
                <option value="">Select reporting cycle…</option>
                <option value="FY25_26">FY 2025-2026 (Active Annual BRSR)</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Assigned Scope / Facility
              </label>
              <select
                value={selectedScope}
                onChange={(e) => setSelectedScope(e.target.value)}
                className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-lg text-slate-800 focus:bg-white focus:border-teal-700"
              >
                <option value="">Select assigned facility or project…</option>
              </select>
            </div>
          </div>
        </div>

        {/* Template Download Card */}
        <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-xs space-y-4 flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-2 pb-2 border-b border-slate-100">
              <FileSpreadsheet className="w-4 h-4 text-teal-700" />
              <h3 className="text-xs font-bold text-slate-800 uppercase tracking-wider">
                Step 2: Download Assignment Template
              </h3>
            </div>
            <p className="text-xs text-slate-600 mt-3 leading-relaxed">
              Download the tailored Excel/CSV template pre-configured with required columns, allowed units, and validation boundaries for your assigned disclosures.
            </p>
          </div>

          <div className="space-y-2 pt-2">
            <button
              type="button"
              onClick={handleDownloadTemplate}
              className="w-full inline-flex items-center justify-center gap-2 px-4 py-2.5 text-xs font-semibold text-teal-800 bg-teal-50 hover:bg-teal-100 border border-teal-200 rounded-lg transition-colors"
            >
              <Download className="w-4 h-4 text-teal-700" />
              <span>Download Ingestion Template (.XLSX)</span>
            </button>
            <p className="text-[10px] text-slate-400 text-center">
              No bulk-upload template is available. Templates will be generated after backend integration.
            </p>
          </div>
        </div>
      </div>

      {/* Step 3: File Upload Dropzone */}
      <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-xs space-y-4">
        <div className="flex items-center justify-between pb-2 border-b border-slate-100">
          <div className="flex items-center gap-2">
            <UploadCloud className="w-4 h-4 text-teal-700" />
            <h3 className="text-xs font-bold text-slate-800 uppercase tracking-wider">
              Step 3: Upload Completed Ingestion File
            </h3>
          </div>
          <span className="text-[11px] text-slate-400">Accepted: .XLSX, .CSV (Max 20MB)</span>
        </div>

        <div className="border-2 border-dashed border-slate-200 hover:border-teal-600 rounded-xl p-8 text-center bg-slate-50/50 transition-colors">
          <input
            type="file"
            id="bulk-file-input"
            onChange={handleFileChange}
            accept=".xlsx,.csv"
            className="hidden"
          />

          {!selectedFile ? (
            <label
              htmlFor="bulk-file-input"
              className="cursor-pointer flex flex-col items-center justify-center space-y-2"
            >
              <div className="w-12 h-12 rounded-full bg-teal-50 flex items-center justify-center text-teal-700">
                <UploadCloud className="w-6 h-6" />
              </div>
              <p className="text-sm font-semibold text-slate-800">
                Click to browse or drag and drop populated template
              </p>
              <p className="text-xs text-slate-500">
                The engine will automatically validate row schemas and threshold limits
              </p>
            </label>
          ) : (
            <div className="flex items-center justify-between p-3 bg-white rounded-lg border border-teal-200 shadow-xs max-w-md mx-auto">
              <div className="flex items-center gap-3 overflow-hidden text-left">
                <FileSpreadsheet className="w-6 h-6 text-teal-700 shrink-0" />
                <div className="min-w-0">
                  <p className="text-xs font-bold text-slate-800 truncate">{selectedFile.name}</p>
                  <p className="text-[11px] text-slate-500">
                    {(selectedFile.size / 1024).toFixed(1)} KB
                  </p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setSelectedFile(null)}
                className="p-1 text-slate-400 hover:text-slate-700"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          )}

          {fileError && (
            <p className="flex items-center justify-center gap-1.5 text-xs text-rose-600 mt-3 font-medium">
              <AlertCircle className="w-4 h-4" />
              <span>{fileError}</span>
            </p>
          )}
        </div>
      </div>

      {/* Steps 4, 5, 6: Validation Summary & Row Preview (All metrics '--') */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <div className="p-4 rounded-xl bg-white border border-slate-200 shadow-xs text-center">
          <p className="text-[10px] font-semibold uppercase tracking-wider text-slate-400">
            Total Parsed Rows
          </p>
          <p className="text-lg font-bold text-slate-800 mt-1">--</p>
        </div>
        <div className="p-4 rounded-xl bg-white border border-slate-200 shadow-xs text-center">
          <p className="text-[10px] font-semibold uppercase tracking-wider text-emerald-600">
            Valid Rows
          </p>
          <p className="text-lg font-bold text-emerald-700 mt-1">--</p>
        </div>
        <div className="p-4 rounded-xl bg-white border border-slate-200 shadow-xs text-center">
          <p className="text-[10px] font-semibold uppercase tracking-wider text-rose-600">
            Errors / Rejected
          </p>
          <p className="text-lg font-bold text-rose-700 mt-1">--</p>
        </div>
        <div className="p-4 rounded-xl bg-white border border-slate-200 shadow-xs text-center">
          <p className="text-[10px] font-semibold uppercase tracking-wider text-amber-600">
            Warnings / Outliers
          </p>
          <p className="text-lg font-bold text-amber-700 mt-1">--</p>
        </div>
      </div>

      {/* Row Validation & Error Table (Empty State) */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <h3 className="text-xs font-bold text-slate-700 uppercase tracking-wider">
            Row-Level Ingestion Preview &amp; Error Log
          </h3>
          <div className="flex items-center gap-2">
            <button
              type="button"
              disabled
              className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-slate-400 bg-slate-100 rounded-lg cursor-not-allowed"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Download Error Report</span>
            </button>
            <button
              type="button"
              disabled
              className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-white bg-teal-700 opacity-50 rounded-lg cursor-not-allowed"
            >
              <Send className="w-3.5 h-3.5" />
              <span>Submit Valid Records</span>
            </button>
          </div>
        </div>

        <DataTableShell
          columns={[
            'Row #',
            'Disclosure Code',
            'Facility / Site',
            'Reporting Period',
            'Reported Value',
            'Unit',
            'Validation Status',
            'Error Detail',
          ]}
          emptyIcon={FileSpreadsheet}
          emptyTitle="No bulk upload records to preview."
          emptyDescription="Uploaded spreadsheet records and validation error logs will display here once the bulk ingestion engine is connected."
        />
      </div>
    </div>
  );
};
