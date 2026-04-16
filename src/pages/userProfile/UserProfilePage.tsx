import { 
    User, 
    Mail, 
    MapPin, 
    Droplets, 
    ChevronRight, 
    Activity, 
    HeartHandshake, 
    Settings,
    ShieldCheck,
    ChevronLeft
  } from 'lucide-react';
  import { useNavigate } from 'react-router';
  import { useAuth } from '../../hooks/useAuth';
  
  const UserProfilePage = () => {
    const navigate = useNavigate();
    const { loggedInUser } = useAuth();
    
    if (!loggedInUser) {
      return (
        <div className="min-h-screen bg-slate-50 dark:bg-slate-950 flex items-center justify-center transition-colors duration-300">
          <p className="text-slate-400 dark:text-slate-500 font-black uppercase tracking-widest text-[10px] animate-pulse">
            Authenticating...
          </p>
        </div>
      );
    }
  
    return (
      <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 pb-12 transition-colors duration-300">
        {/* Header / Banner - Kept dark in both modes for premium feel */}
        <div className="bg-slate-900 pt-16 pb-32 px-6 rounded-b-[3.5rem] relative overflow-hidden shadow-2xl">
          <div className="absolute top-0 right-0 w-64 h-64 bg-rose-500/10 rounded-full -mr-20 -mt-20 blur-3xl"></div>
          <div className="absolute bottom-0 left-0 w-48 h-48 bg-blue-500/10 rounded-full -ml-10 -mb-10 blur-3xl"></div>
          
          <div className="flex items-center justify-between relative z-10 mb-8">
            <button 
              onClick={() => navigate(-1)}
              className="p-2.5 bg-white/10 rounded-2xl backdrop-blur-md text-white hover:bg-white/20 transition-all"
            >
              <ChevronLeft size={24} />
            </button>
            <button className="p-2.5 bg-white/10 rounded-2xl backdrop-blur-md text-white hover:bg-white/20 transition-all">
              <Settings size={22} />
            </button>
          </div>
  
          <div className="relative z-10 flex flex-col items-center text-center">
            <div className="relative mb-4">
              {/* Avatar Container */}
              <div className="w-28 h-28 bg-white dark:bg-slate-800 rounded-[2.5rem] flex items-center justify-center text-slate-300 dark:text-slate-600 shadow-2xl border-4 border-slate-800 dark:border-slate-700 overflow-hidden">
                 <User size={56} fill="currentColor" className="opacity-20" />
              </div>
              {loggedInUser && (
                <div className="absolute -bottom-1 -right-1 bg-blue-500 text-white p-1.5 rounded-xl border-4 border-slate-900 shadow-lg">
                  <ShieldCheck size={18} strokeWidth={3} />
                </div>
              )}
            </div>
            <h1 className="text-3xl font-black text-white tracking-tight capitalize">
              {loggedInUser.name}
            </h1>
            <p className="text-slate-400 font-bold text-[10px] uppercase tracking-[0.3em] mt-1">
              {loggedInUser.role} Profile
            </p>
          </div>
        </div>
  
        {/* Profile Content */}
        <div className="px-6 -mt-16 space-y-6 relative z-20">
          
          {/* 1. Essential Details Card */}
          <div className="bg-white dark:bg-slate-900 rounded-[2.5rem] shadow-xl shadow-slate-200/60 dark:shadow-none p-8 border border-slate-100 dark:border-slate-800 transition-colors">
            <p className="text-[10px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-[0.2em] mb-6">Identity Details</p>
            
            <div className="space-y-6">
              {/* Blood Group */}
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-rose-50 dark:bg-rose-900/20 text-rose-500 rounded-2xl flex items-center justify-center flex-shrink-0">
                  <Droplets size={22} fill="currentColor" />
                </div>
                <div className="flex-1">
                  <p className="text-[10px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-widest mb-0.5">Blood Group</p>
                  <p className="text-lg font-black text-slate-900 dark:text-white">{loggedInUser.bloodGroup}</p>
                </div>
                <div className="px-3 py-1 bg-emerald-50 dark:bg-emerald-900/20 text-emerald-600 dark:text-emerald-400 rounded-lg text-[10px] font-black uppercase tracking-tight">
                  Active
                </div>
              </div>
  
              {/* Email */}
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-blue-50 dark:bg-blue-900/20 text-blue-500 rounded-2xl flex items-center justify-center flex-shrink-0">
                  <Mail size={22} />
                </div>
                <div>
                  <p className="text-[10px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-widest mb-0.5">Email Address</p>
                  <p className="text-sm font-bold text-slate-800 dark:text-slate-200">{loggedInUser.email}</p>
                </div>
              </div>
  
              {/* Address */}
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 rounded-2xl flex items-center justify-center flex-shrink-0">
                  <MapPin size={22} />
                </div>
                <div>
                  <p className="text-[10px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-widest mb-0.5">Residential Address</p>
                  <p className="text-sm font-bold text-slate-800 dark:text-slate-200">{loggedInUser.address}</p>
                </div>
              </div>
            </div>
          </div>
  
          {/* 2. Mission Control Section (Active Elements) */}
          <div className="space-y-4">
            <p className="px-2 text-[10px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-[0.2em]">Mission Control</p>
            
            {/* Active Request Element */}
            <button 
              onClick={() => navigate("/user-profile/my-request-detail")}
              className="w-full bg-white dark:bg-slate-900 p-6 rounded-[2rem] shadow-lg shadow-slate-200/50 dark:shadow-none border border-slate-100 dark:border-slate-800 flex items-center justify-between hover:scale-[1.02] active:scale-95 transition-all group"
            >
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 bg-rose-600 text-white rounded-2xl flex items-center justify-center shadow-lg shadow-rose-200 dark:shadow-rose-900/20 group-hover:rotate-6 transition-transform">
                  <Activity size={24} />
                </div>
                <div className="text-left">
                  <h3 className="text-sm font-black text-slate-900 dark:text-white uppercase tracking-tight">Active Request</h3>
                  <p className="text-[10px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-widest">Manage your help call</p>
                </div>
              </div>
              <div className="w-10 h-10 rounded-full bg-slate-50 dark:bg-slate-800 flex items-center justify-center text-slate-300 dark:text-slate-600 group-hover:text-rose-500 transition-colors">
                <ChevronRight size={20} />
              </div>
            </button>
  
            {/* Active Donation Element */}
            <button 
              onClick={() => navigate("/user-profile/active-donation")}
              className="w-full bg-white dark:bg-slate-900 p-6 rounded-[2rem] shadow-lg shadow-slate-200/50 dark:shadow-none border border-slate-100 dark:border-slate-800 flex items-center justify-between hover:scale-[1.02] active:scale-95 transition-all group"
            >
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 bg-emerald-500 text-white rounded-2xl flex items-center justify-center shadow-lg shadow-emerald-200 dark:shadow-emerald-900/20 group-hover:rotate-6 transition-transform">
                  <HeartHandshake size={24} />
                </div>
                <div className="text-left">
                  <h3 className="text-sm font-black text-slate-900 dark:text-white uppercase tracking-tight">Active Donation</h3>
                  <p className="text-[10px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-widest">Your current hero mission</p>
                </div>
              </div>
              <div className="w-10 h-10 rounded-full bg-slate-50 dark:bg-slate-800 flex items-center justify-center text-slate-300 dark:text-slate-600 group-hover:text-emerald-500 transition-colors">
                <ChevronRight size={20} />
              </div>
            </button>
          </div>
  
        </div>
      </div>
    );
  };
  
  export default UserProfilePage;