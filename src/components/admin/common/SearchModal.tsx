import React, { useState } from 'react';
import { Search, ServerOff } from 'lucide-react';
import { Modal } from '../../ui/Modal';

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const SearchModal: React.FC<SearchModalProps> = ({ isOpen, onClose }) => {
  const [query, setQuery] = useState('');

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Global ESG Search"
      subtitle="Search across organization units, users, reporting cycles, and BRSR disclosures"
      maxWidth="max-w-lg"
    >
      <div className="space-y-4">
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
            <Search className="w-5 h-5" />
          </div>
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Type keyword, disclosure code, or employee name..."
            autoFocus
            className="w-full pl-11 pr-4 py-3 bg-slate-50 border border-slate-300 rounded-xl text-sm text-slate-800 placeholder-slate-400 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#003B73]"
          />
        </div>

        <div className="flex flex-col items-center justify-center p-8 bg-slate-50/70 border border-dashed border-slate-200 rounded-xl text-center">
          <div className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center text-slate-400 mb-2.5">
            <ServerOff className="w-5 h-5 text-slate-500" />
          </div>
          <p className="text-sm font-semibold text-slate-700 mb-1">Search Service Inactive</p>
          <p className="text-xs text-slate-500 max-w-sm">
            Search will be available after backend integration. Full-text indexing and fuzzy search will be supported across all portal entities.
          </p>
        </div>

        <div className="flex justify-end pt-2">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 text-sm font-medium text-slate-600 hover:text-slate-900 bg-slate-100 hover:bg-slate-200 rounded-lg transition-colors"
          >
            Close
          </button>
        </div>
      </div>
    </Modal>
  );
};
