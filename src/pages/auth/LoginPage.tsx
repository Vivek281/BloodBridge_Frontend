import React from 'react';
import { NavLink, useNavigate } from 'react-router';
import { Droplets } from 'lucide-react';
import LoginForm from '../../components/auth/LoginForm';

const LoginPage: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 font-sans text-slate-900 dark:text-slate-100 flex flex-col items-center justify-center p-6 transition-colors duration-300">
      {/* Background Blobs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-[-10%] right-[-10%] w-[40%] h-[40%] bg-rose-50 dark:bg-rose-900/10 rounded-full blur-3xl opacity-60"></div>
        <div className="absolute bottom-[-10%] left-[-10%] w-[40%] h-[40%] bg-blue-50 dark:bg-blue-900/10 rounded-full blur-3xl opacity-60"></div>
      </div>

      <div className="w-full max-w-md relative z-10">
        {/* Logo Section */}
        <div className="text-center mb-10">
          <div className="inline-flex items-center gap-2 mb-4">
            <div className="bg-rose-600 p-2 rounded-xl shadow-lg shadow-rose-200 dark:shadow-none">
              <Droplets className="text-white w-8 h-8" />
            </div>
            <span className="text-3xl font-bold tracking-tight text-slate-800 dark:text-white">BloodBridge</span>
          </div>
          <h2 className="text-2xl font-bold text-slate-900 dark:text-white">Welcome back</h2>
          <p className="text-slate-500 dark:text-slate-400 mt-2">Connect with your community network</p>
        </div>

        <LoginForm/>

        {/* Bottom Link */}
        <div className="text-center mt-8 space-y-4">
          <p className="text-slate-500 dark:text-slate-400 text-sm">
            Don't have an account? {' '}
            <NavLink to="/register" className="text-rose-600 dark:text-rose-400 font-bold hover:underline">
              Join the network
            </NavLink>
          </p>
          
          <button 
            onClick={() => navigate('/')}
            className="text-slate-400 dark:text-slate-600 text-xs font-medium hover:text-slate-600 dark:hover:text-slate-400 transition-colors"
          >
            ← Back to Home
          </button>
        </div>
      </div>
    </div>
  );
}

export default LoginPage;