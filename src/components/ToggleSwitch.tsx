import React from 'react';
import { Code, FileText } from 'lucide-react';

interface ToggleSwitchProps {
  value: 'text' | 'code';
  onChange: (value: 'text' | 'code') => void;
}

export const ToggleSwitch: React.FC<ToggleSwitchProps> = ({ value, onChange }) => {
  return (
    <div className="flex items-center space-x-1 bg-gray-100 dark:bg-gray-800 rounded-lg p-1">
      <button
        type="button"
        onClick={() => onChange('text')}
        className={`flex items-center space-x-2 px-4 py-2 rounded-md text-sm font-medium transition-all duration-200 ${
          value === 'text'
            ? 'bg-white dark:bg-gray-700 text-blue-600 dark:text-blue-400 shadow-sm'
            : 'text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200'
        }`}
      >
        <FileText size={16} />
        <span>Text</span>
      </button>
      <button
        type="button"
        onClick={() => onChange('code')}
        className={`flex items-center space-x-2 px-4 py-2 rounded-md text-sm font-medium transition-all duration-200 ${
          value === 'code'
            ? 'bg-white dark:bg-gray-700 text-blue-600 dark:text-blue-400 shadow-sm'
            : 'text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200'
        }`}
      >
        <Code size={16} />
        <span>Code</span>
      </button>
    </div>
  );
};