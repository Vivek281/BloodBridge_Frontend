// src/components/ui/LoadingScreen.tsx
import React, { useEffect, useState } from 'react';
import { Droplets } from 'lucide-react';

interface LoadingScreenProps {
  isLoading: boolean;
}

const LoadingScreen: React.FC<LoadingScreenProps> = ({ isLoading }) => {
  const [shouldRender, setShouldRender] = useState(true);
  const [fade, setFade] = useState(false);

  useEffect(() => {
    if (!isLoading) {
      // 1. Start the fade out
      setFade(true);
      // 2. Remove from DOM after transition completes (300ms)
      const timeout = setTimeout(() => setShouldRender(false), 300);
      return () => clearTimeout(timeout);
    }
  }, [isLoading]);

  if (!shouldRender) return null;

  return (
    <div className={`fixed inset-0 bg-white dark:bg-slate-950 flex flex-col items-center justify-center z-[100] transition-opacity duration-300 ease-in-out ${fade ? 'opacity-0' : 'opacity-100'}`}>
      <div className="relative">
        <div className="absolute inset-0 bg-rose-500 rounded-full blur-xl opacity-20 animate-pulse"></div>
        <div className="bg-rose-600 p-4 rounded-2xl relative">
          <Droplets className="text-white w-10 h-10 animate-bounce" />
        </div>
      </div>
      <p className="mt-6 text-slate-500 dark:text-slate-400 font-bold tracking-widest text-xs uppercase animate-pulse">
        Syncing BloodBridge...
      </p>
    </div>
  );
};

export default LoadingScreen;