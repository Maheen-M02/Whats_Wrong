import React, { useState } from 'react';
import { Copy, CheckCircle, AlertCircle, Lightbulb, Wrench } from 'lucide-react';
import { AnalyzerResponse } from '../types/analyzer';

interface ResultSectionProps {
  result: AnalyzerResponse;
}

export const ResultSection: React.FC<ResultSectionProps> = ({ result }) => {
  const [copiedSection, setCopiedSection] = useState<string | null>(null);

  const copyToClipboard = async (text: string, section: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopiedSection(section);
      setTimeout(() => setCopiedSection(null), 2000);
    } catch (err) {
      console.error('Failed to copy text: ', err);
    }
  };

  return (
    <div className="space-y-6">
      {/* Error Found Section */}
      <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-6">
        <div className="flex items-center space-x-2 mb-3">
          <AlertCircle className="text-red-500 dark:text-red-400" size={20} />
          <h3 className="text-lg font-semibold text-red-800 dark:text-red-200">
            Error Found
          </h3>
        </div>
        <p className="text-red-700 dark:text-red-300 leading-relaxed">
          {result.errorFound}
        </p>
      </div>

      {/* Explanation Section */}
      <div className="bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800 rounded-lg p-6">
        <div className="flex items-center space-x-2 mb-3">
          <Lightbulb className="text-amber-500 dark:text-amber-400" size={20} />
          <h3 className="text-lg font-semibold text-amber-800 dark:text-amber-200">
            Explanation
          </h3>
        </div>
        <p className="text-amber-700 dark:text-amber-300 leading-relaxed">
          {result.explanation}
        </p>
      </div>

      {/* Fixed Version Section */}
      <div className="bg-emerald-50 dark:bg-emerald-900/20 border border-emerald-200 dark:border-emerald-800 rounded-lg p-6">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center space-x-2">
            <Wrench className="text-emerald-500 dark:text-emerald-400" size={20} />
            <h3 className="text-lg font-semibold text-emerald-800 dark:text-emerald-200">
              Fixed Version
            </h3>
          </div>
          <button
            onClick={() => copyToClipboard(result.fixedVersion, 'fixed')}
            className="flex items-center space-x-1 px-3 py-1 bg-emerald-100 dark:bg-emerald-800 text-emerald-700 dark:text-emerald-200 rounded-md text-sm hover:bg-emerald-200 dark:hover:bg-emerald-700 transition-colors"
          >
            {copiedSection === 'fixed' ? (
              <>
                <CheckCircle size={14} />
                <span>Copied!</span>
              </>
            ) : (
              <>
                <Copy size={14} />
                <span>Copy</span>
              </>
            )}
          </button>
        </div>
        <pre className="bg-white dark:bg-gray-900 border border-emerald-200 dark:border-emerald-700 rounded-md p-4 text-sm text-gray-800 dark:text-gray-200 overflow-x-auto whitespace-pre-wrap">
          <code>{result.fixedVersion}</code>
        </pre>
      </div>
    </div>
  );
};