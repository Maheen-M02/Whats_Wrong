import React, { useState } from 'react';
import { Search, AlertCircle } from 'lucide-react';
import { ToggleSwitch } from './ToggleSwitch';
import { LoadingSpinner } from './LoadingSpinner';
import { ResultSection } from './ResultSection';
import { analyzeContent } from '../services/analyzerApi';
import { AnalyzerResponse, ApiError } from '../types/analyzer';

export const AnalyzerForm: React.FC = () => {
  const [content, setContent] = useState('');
  const [contentType, setContentType] = useState<'text' | 'code'>('text');
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState<AnalyzerResponse | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!content.trim()) {
      setError('Please enter some content to analyze');
      return;
    }

    setIsLoading(true);
    setError(null);
    setResult(null);

    try {
      const response = await analyzeContent({
        content: content.trim(),
        type: contentType
      });
      setResult(response);
    } catch (err) {
      const apiError = err as ApiError;
      setError(apiError.message || 'Failed to analyze content. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const placeholderText = contentType === 'code' 
    ? 'Enter your code here...\n\nExample:\nfunction sayHello() {\n    console.log("Hello World")\n    let result\n}'
    : 'Enter your text here...\n\nExample:\nThe team of developers are working on a new project that will revolutionize how we think about software development.';

  return (
    <div className="max-w-6xl mx-auto p-6 space-y-8">
      {/* Header */}
      <div className="text-center space-y-4">
        <h1 className="text-4xl font-bold text-gray-900 dark:text-white">
          What's Wrong in This?
        </h1>
        <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
          Paste your text or code below, and Google Gemini AI will detect issues, 
          explain what's wrong, and provide you with a corrected version.
        </p>
      </div>

      <div className="grid lg:grid-cols-2 gap-8">
        {/* Input Section */}
        <div className="space-y-6">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 border border-gray-200 dark:border-gray-700">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                    Content Type
                  </label>
                  <ToggleSwitch value={contentType} onChange={setContentType} />
                </div>

                <div>
                  <label htmlFor="content" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    {contentType === 'code' ? 'Code to Analyze' : 'Text to Analyze'}
                  </label>
                  <textarea
                    id="content"
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                    placeholder={placeholderText}
                    className="w-full h-64 px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-900 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none text-sm leading-relaxed font-mono"
                    disabled={isLoading}
                  />
                </div>

                {error && (
                  <div className="flex items-center space-x-2 p-3 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-md">
                    <AlertCircle className="text-red-500 dark:text-red-400" size={16} />
                    <span className="text-sm text-red-700 dark:text-red-300">{error}</span>
                  </div>
                )}

                <button
                  type="submit"
                  disabled={isLoading || !content.trim()}
                  className="w-full flex items-center justify-center space-x-2 px-6 py-3 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 text-white font-medium rounded-lg transition-colors focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:cursor-not-allowed"
                >
                  <Search size={18} />
                  <span>{isLoading ? 'Analyzing...' : 'Analyze Content'}</span>
                </button>
              </div>
            </div>
          </form>

          {/* Instructions */}
          <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-4">
            <h3 className="text-sm font-medium text-blue-800 dark:text-blue-200 mb-2">
              Powered by Google Gemini AI:
            </h3>
            <ul className="text-sm text-blue-700 dark:text-blue-300 space-y-1">
              <li>• Select whether you're analyzing text or code</li>
              <li>• Paste your content in the textarea above</li>
              <li>• Click "Analyze Content" to get AI-powered feedback</li>
              <li>• Review the issues found and copy the corrected version</li>
            </ul>
          </div>
        </div>

        {/* Results Section */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 border border-gray-200 dark:border-gray-700">
          {isLoading ? (
            <LoadingSpinner />
          ) : result ? (
            <ResultSection result={result} />
          ) : (
            <div className="flex items-center justify-center h-64 text-gray-500 dark:text-gray-400">
              <div className="text-center space-y-2">
                <Search size={48} className="mx-auto opacity-50" />
                <p className="text-lg font-medium">Ready to analyze</p>
                <p className="text-sm">Submit your content to see the results here</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};