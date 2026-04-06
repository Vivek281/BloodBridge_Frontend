import { useLocation, NavLink } from 'react-router';
import { Mail, ArrowLeft, CheckCircle2, ExternalLink, Droplets } from 'lucide-react';

const VerifyEmailPage = () => {
  const location = useLocation();
  
  // Grab the email from the navigation state or provide a fallback
  const email = location.state?.email || "your registered email";

  // Function to open Gmail directly in a new tab
  const handleGoToGmail = () => {
    window.open('https://mail.google.com', '_blank', 'noreferrer');
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-[#0B0F1A] flex flex-col justify-center py-12 px-6 transition-colors duration-300 relative overflow-hidden font-sans">
      {/* Background Brand Accents (Glows for Dark Mode) */}
      <div className="absolute top-[-10%] right-[-5%] w-[500px] h-[500px] bg-rose-900/10 blur-[120px] rounded-full hidden dark:block"></div>
      <div className="absolute bottom-[-5%] left-[-5%] w-[400px] h-[400px] bg-rose-600/5 blur-[100px] rounded-full hidden dark:block"></div>

      <div className="sm:mx-auto sm:w-full sm:max-w-md z-10 text-center">
        <div className="flex justify-center mb-6">
          <div className="bg-rose-100 dark:bg-rose-500/10 p-5 rounded-3xl shadow-lg shadow-rose-500/10 border border-rose-200/50 dark:border-rose-500/20">
            <Mail className="h-10 w-10 text-rose-600 dark:text-rose-500" />
          </div>
        </div>
        
        <h2 className="text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
          Verify your email
        </h2>
        
        <p className="mt-3 text-sm text-slate-600 dark:text-slate-400">
          We sent an activation link to <br />
          <span className="font-bold text-rose-600 dark:text-rose-500 text-lg block mt-1 tracking-wide">
            {email}
          </span>
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md z-10">
        <div className="bg-white dark:bg-[#151C2C] py-10 px-6 shadow-[0_20px_50px_rgba(0,0,0,0.04)] dark:shadow-none rounded-[2.5rem] border border-slate-100 dark:border-slate-800 sm:px-10 text-center relative overflow-hidden">
          {/* Top subtle glow line */}
          <div className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-rose-500/50 to-transparent"></div>

          <div className="space-y-8">
            <div className="flex items-start gap-4 text-left bg-slate-50 dark:bg-slate-800/30 p-5 rounded-2xl border border-slate-100 dark:border-white/5">
              <CheckCircle2 className="w-6 h-6 text-green-500 mt-0.5 flex-shrink-0" />
              <div>
                <h3 className="text-sm font-semibold text-slate-900 dark:text-white">Check your inbox</h3>
                <p className="text-sm text-slate-600 dark:text-slate-400 mt-1 leading-relaxed">
                  Please click the activation link in the email we just sent you to confirm your account and join the BloodBridge community.
                </p>
              </div>
            </div>

            {/* Primary Action: Go to Gmail */}
            <div className="space-y-3">
              <button
                onClick={handleGoToGmail}
                className="w-full flex items-center justify-center gap-2 py-4 px-6 bg-rose-600 hover:bg-rose-700 text-white font-bold rounded-2xl shadow-lg shadow-rose-600/20 transition-all active:scale-[0.98] group"
              >
                Go to Gmail Inbox
                <ExternalLink size={18} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </button>
              
              <p className="text-xs text-slate-500 dark:text-slate-500 italic">
                Didn't see it? Check your <strong>spam</strong> or <strong>promotions</strong> folder.
              </p>
            </div>

            <div className="pt-8 border-t border-slate-100 dark:border-slate-800">
              <NavLink
                to="/login"
                className="inline-flex items-center gap-2 text-sm font-semibold text-rose-600 hover:text-rose-500 transition-colors group"
              >
                <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
                Return to Login
              </NavLink>
            </div>
          </div>
        </div>

        {/* Brand Footer */}
        <div className="mt-10 flex flex-col items-center opacity-40 dark:opacity-20 transition-opacity">
          <div className="flex items-center gap-2 mb-2">
            <Droplets size={16} className="text-slate-900 dark:text-white fill-current" />
            <span className="text-xs font-bold uppercase tracking-[0.2em] text-slate-900 dark:text-white">BloodBridge</span>
          </div>
        </div>
      </div>
    </div>
  );
};



export default VerifyEmailPage;