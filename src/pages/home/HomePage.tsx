import React, { useEffect } from 'react';
import { useNavigate } from 'react-router';
import { ShieldCheck, ArrowRight, Bell, HandHeart, CheckCircle2, Lock, Users, HeartPulse } from 'lucide-react';
import { useAuth } from '../../hooks/useAuth';

const HomePage: React.FC = () => {
  const { loggedInUser, handleRequestFCM } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (loggedInUser) {
      handleRequestFCM();
    }
  }, [loggedInUser, handleRequestFCM]);

  return (
    <>
      {/* Hero Section */}
      <section className="relative pt-32 pb-20 lg:pt-44 lg:pb-32 overflow-hidden">
        {/* Background Gradients */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full -z-10">
          <div className="absolute top-[-10%] right-[-10%] w-[40%] h-[60%] bg-rose-50 dark:bg-rose-900/10 rounded-full blur-3xl opacity-60"></div>
          <div className="absolute bottom-[-10%] left-[-10%] w-[40%] h-[60%] bg-blue-50 dark:bg-blue-900/10 rounded-full blur-3xl opacity-60"></div>
        </div>

        <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-12 gap-16 items-center">
          {/* Left Content */}
          <div className="lg:col-span-7 space-y-8">
            <div className="inline-flex items-center gap-2 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 px-4 py-2 rounded-2xl shadow-sm text-slate-600 dark:text-slate-400 text-sm font-medium">
              <HandHeart className="w-4 h-4 text-rose-500" />
              A community of mutual support
            </div>

            <h1 className="text-5xl lg:text-7xl font-extrabold text-slate-900 dark:text-white leading-[1.1] tracking-tight">
              Giving or Receiving, <br />
              <span className="text-rose-600 dark:text-rose-500">We Flow Together.</span>
            </h1>

            <p className="text-xl text-slate-600 dark:text-slate-400 max-w-xl leading-relaxed font-medium">
              In BloodBridge, there are no roles—just neighbors. Make a request when in need, or respond to one when you're able. Privacy is our priority.
            </p>

            <div className="flex flex-wrap gap-4 pt-4">
              <button 
                onClick={() => !loggedInUser ? navigate("/login") : navigate('/blood-request')} 
                className="group flex items-center gap-2 bg-rose-600 text-white px-8 py-5 rounded-2xl text-lg font-bold hover:bg-rose-700 transition-all shadow-xl shadow-rose-200 dark:shadow-none active:scale-95"
              >
                Post a Request <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </button>
              <button className="flex items-center gap-2 bg-white dark:bg-slate-900 border-2 border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300 px-8 py-5 rounded-2xl text-lg font-bold hover:bg-slate-50 dark:hover:bg-slate-800 transition-all active:scale-95">
                Learn About Privacy
              </button>
            </div>
          </div>

          {/* Right Visual Element (Replaces the API Card) */}
          <div className="lg:col-span-5 relative hidden lg:block">
            <div className="relative aspect-square flex items-center justify-center">
              {/* Outer Decorative Circles */}
              <div className="absolute inset-0 border-2 border-dashed border-slate-200 dark:border-slate-800 rounded-full animate-[spin_60s_linear_infinite]"></div>
              <div className="absolute inset-12 border border-slate-100 dark:border-slate-800 rounded-full"></div>
              
              {/* Central Privacy Icon */}
              <div className="relative z-10 w-48 h-48 bg-white dark:bg-slate-900 rounded-[3rem] shadow-2xl border border-slate-100 dark:border-slate-800 flex flex-col items-center justify-center gap-4 text-center p-6">
                <div className="w-16 h-16 bg-rose-50 dark:bg-rose-900/20 rounded-2xl flex items-center justify-center text-rose-600 dark:text-rose-400 shadow-inner">
                  <Lock className="w-8 h-8" />
                </div>
                <div>
                    <p className="text-sm font-black text-slate-900 dark:text-white uppercase tracking-tighter">Zero Exposure</p>
                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-1">Privacy Guaranteed</p>
                </div>
              </div>

              {/* Orbiting Feature Badges */}
              <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-4 bg-white dark:bg-slate-800 px-4 py-3 rounded-2xl shadow-xl border border-slate-100 dark:border-slate-700 flex items-center gap-3 animate-bounce">
                <div className="p-2 bg-blue-50 dark:bg-blue-900/30 text-blue-600 rounded-lg">
                  <Bell className="w-4 h-4" />
                </div>
                <span className="text-xs font-bold text-slate-700 dark:text-slate-200 uppercase tracking-wide">Live Alerts</span>
              </div>

              <div className="absolute bottom-12 right-0 bg-white dark:bg-slate-800 px-4 py-3 rounded-2xl shadow-xl border border-slate-100 dark:border-slate-700 flex items-center gap-3">
                <div className="p-2 bg-emerald-50 dark:bg-emerald-900/30 text-emerald-600 rounded-lg">
                  <CheckCircle2 className="w-4 h-4" />
                </div>
                <span className="text-xs font-bold text-slate-700 dark:text-slate-200 uppercase tracking-wide">Verified</span>
              </div>

              <div className="absolute bottom-12 left-0 bg-white dark:bg-slate-800 px-4 py-3 rounded-2xl shadow-xl border border-slate-100 dark:border-slate-700 flex items-center gap-3">
                <div className="p-2 bg-rose-50 dark:bg-rose-900/30 text-rose-600 rounded-lg">
                  <HeartPulse className="w-4 h-4" />
                </div>
                <span className="text-xs font-bold text-slate-700 dark:text-slate-200 uppercase tracking-wide">Real-time</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How it Works Section */}
      <section className="py-24 bg-white dark:bg-slate-900/50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid md:grid-cols-3 gap-12">
            {[
              { icon: <Bell className="w-6 h-6" />, title: "1. Targeted Alerts", text: "When a request is posted, we only notify members within a 5km radius who share the same blood group." },
              { icon: <ShieldCheck className="w-6 h-6" />, title: "2. Secure Acceptance", text: "Members can choose to respond based on location and urgency without revealing their identity immediately." },
              { icon: <CheckCircle2 className="w-6 h-6" />, title: "3. Handshake Reveal", text: "Only once a member clicks \"Accept\" is their contact info shared with the requester to coordinate the donation." }
            ].map((item, i) => (
              <div key={i} className="group space-y-4 hover:-translate-y-1 transition-transform">
                <div className={`w-14 h-14 bg-blue-50 dark:bg-blue-900/20 rounded-2xl flex items-center justify-center text-blue-600 dark:text-blue-400 group-hover:bg-blue-600 group-hover:text-white transition-all`}>
                  {item.icon}
                </div>
                <h3 className="text-xl font-bold dark:text-white">{item.title}</h3>
                <p className="text-slate-500 dark:text-slate-400 leading-relaxed">{item.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Community Impact */}
      <section className="py-20 border-y border-slate-100 dark:border-slate-900">
        <div className="max-w-4xl mx-auto px-6 text-center space-y-12">
          <h2 className="text-3xl font-bold dark:text-white">A platform built on trust.</h2>
          <div className="flex flex-wrap items-center justify-center gap-12 opacity-40 dark:opacity-20 grayscale">
             <div className="flex items-center gap-2">
                <Users className="w-6 h-6" />
                <span className="font-black text-2xl tracking-tighter">LOCAL_HEALTH</span>
             </div>
             <div className="flex items-center gap-2">
                <HandHeart className="w-6 h-6" />
                <span className="font-black text-2xl tracking-tighter">NEIGHBOR_CARE</span>
             </div>
             <div className="flex items-center gap-2">
                <ShieldCheck className="w-6 h-6" />
                <span className="font-black text-2xl tracking-tighter">SAFETY_NET</span>
             </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      {!loggedInUser && (
        <section className="py-24">
          <div className="max-w-5xl mx-auto px-6">
            <div className="bg-rose-600 rounded-[3rem] p-12 text-center text-white relative overflow-hidden shadow-2xl shadow-rose-300 dark:shadow-none">
              <div className="relative z-10 space-y-6">
                <h2 className="text-4xl font-bold">Ready to join the lifeline?</h2>
                <p className="text-rose-100 text-lg max-w-xl mx-auto">
                  Join thousands of neighbors who are ready to support each other. It takes less than 2 minutes to secure your spot in the network.
                </p>
                <button onClick={() => navigate('/register')} className="bg-white text-rose-600 px-10 py-4 rounded-2xl text-lg font-bold hover:bg-rose-50 transition-all shadow-lg active:scale-95">
                  Create My Account
                </button>
              </div>
              <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -mr-20 -mt-20 blur-3xl"></div>
              <div className="absolute bottom-0 left-0 w-64 h-64 bg-rose-900/20 rounded-full -ml-20 -mb-20 blur-3xl"></div>
            </div>
          </div>
        </section>
      )}
    </>
  );
}

export default HomePage;