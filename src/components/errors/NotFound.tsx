import React from 'react';
import { 
  Droplets, 
  ArrowLeft,
  HeartPulse
} from 'lucide-react';

const NotFound: React.FC = () => {
  const goBack = () => window.history.back();
  const goHome = () => window.location.href = '/';

  return (
    <div className="min-h-screen bg-white dark:bg-slate-950 font-sans text-slate-900 dark:text-slate-100 flex flex-col items-center justify-center p-6 overflow-hidden">
      {/* Subtle Background Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-lg aspect-square bg-rose-500/5 dark:bg-rose-500/10 rounded-full blur-[120px] pointer-events-none"></div>

      <div className="relative z-10 w-full max-w-xl text-center space-y-12">
        {/* Massive 404 Heading */}
        <div className="relative">
          <h1 className="text-[12rem] md:text-[18rem] font-black leading-none tracking-tighter text-slate-100 dark:text-slate-900/50 select-none">
            404
          </h1>
          {/* Overlay Icon */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-24 h-24 md:w-32 md:h-32 bg-rose-600 rounded-3xl rotate-12 flex items-center justify-center shadow-2xl shadow-rose-200 dark:shadow-none animate-pulse">
              <Droplets className="text-white w-12 h-12 md:w-16 md:h-16 -rotate-12" />
            </div>
          </div>
        </div>

        {/* Messaging */}
        <div className="space-y-3">
          <div className="inline-flex items-center gap-2 text-rose-600 dark:text-rose-500 text-sm font-bold uppercase tracking-[0.2em]">
            <HeartPulse size={16} />
            Bridge Disconnected
          </div>
          <p className="text-xl md:text-2xl text-slate-600 dark:text-slate-400 font-medium max-w-sm mx-auto">
            The requested page is no longer in circulation.
          </p>
        </div>

        {/* Minimalist Actions */}
        <div className="flex flex-col items-center gap-6 pt-4">
          <button 
            onClick={goHome}
            className="group relative px-12 py-4 bg-slate-900 dark:bg-rose-600 text-white rounded-full font-bold text-lg transition-all hover:scale-105 active:scale-95 shadow-xl shadow-slate-200 dark:shadow-none"
          >
            Go Home
          </button>
          
          <button 
            onClick={goBack}
            className="flex items-center gap-2 text-slate-400 hover:text-rose-600 dark:hover:text-rose-400 font-bold transition-colors py-2"
          >
            <ArrowLeft size={18} />
            Back to previous page
          </button>
        </div>

        {/* Minimal Error Ref */}
        <p className="text-[10px] text-slate-300 dark:text-slate-700 font-mono tracking-widest uppercase pt-12">
          Err: Null_Bridge_Protocol
        </p>
      </div>
    </div>
  );
};

export default NotFound;