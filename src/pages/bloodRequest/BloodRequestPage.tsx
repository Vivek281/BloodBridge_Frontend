import React, { useState, useEffect } from 'react';
import BloodRequestForm from '../../components/bloodRequest/BloodRequestForm';

const BloodRequestPage: React.FC = () => {
  // Sync local dark mode class with stored preference
  const [darkMode] = useState<boolean>(() => {
    const savedTheme = localStorage.getItem('theme');
    return savedTheme === 'dark';
  });

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);


  return (
    <div className={`${darkMode ? 'dark' : ''} transition-colors duration-300 pt-14`}>
      <div className="min-h-screen bg-slate-50 dark:bg-slate-950 font-sans text-slate-900 dark:text-slate-100 flex flex-col items-center justify-center p-6 relative">
        
        {/* Background Decor */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-[-10%] right-[-10%] w-[40%] h-[40%] bg-rose-50 dark:bg-rose-900/10 rounded-full blur-3xl opacity-60"></div>
          <div className="absolute bottom-[-10%] left-[-10%] w-[40%] h-[40%] bg-blue-50 dark:bg-blue-900/10 rounded-full blur-3xl opacity-60"></div>
        </div>

        <div className="w-full max-w-2xl relative z-10">
          {/* Header */}
          <div className="text-center mb-10">
            <h1 className="text-3xl font-extrabold text-slate-900 dark:text-white">Create Urgent Request</h1>
            <p className="text-slate-500 dark:text-slate-400 mt-2">Your request will be broadcasted to compatible neighbors nearby.</p>
          </div>

            <BloodRequestForm/>

          {/* Footer Link */}
          <div className="text-center mt-8">
            <button 
              onClick={() => window.history.back()}
              className="text-slate-400 dark:text-slate-600 text-sm font-bold hover:text-slate-600 dark:hover:text-slate-400 transition-colors"
            >
              ← Cancel and Return
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BloodRequestPage;