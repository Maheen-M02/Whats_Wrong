import React from 'react';
import { useState } from 'react';
import { Header } from './components/Header';
import { HistoryModal } from './components/HistoryModal';
import { AnalyzerForm } from './components/AnalyzerForm';
import { useAuth } from './hooks/useAuth';

function App() {
  const [showHistory, setShowHistory] = useState(false);
  const { loading } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800">
      <Header onShowHistory={() => setShowHistory(true)} />
      <div className="min-h-[calc(100vh-80px)]">
        <AnalyzerForm />
      </div>
      <HistoryModal
        isOpen={showHistory}
        onClose={() => setShowHistory(false)}
      />
    </div>
  );
}

export default App;