import React from 'react';
import { useNavigate } from 'react-router';
import {Droplets,Bell,ShieldCheck,Handshake,MapPin,CheckCircle2,ArrowRight,UserPlus,MessageSquare} from 'lucide-react';
import { useAuth } from '../../hooks/useAuth';



const HowItWorksPage: React.FC = () => {
  const {loggedInUser} = useAuth();
  const steps = [
    {
      icon: <UserPlus className="w-8 h-8 text-blue-500" />,
      title: "Join the Network",
      description: "Create your secure profile with your blood group and location. Your data is encrypted and never sold.",
      details: ["Quick 2-minute setup", "Privacy-first architecture", "Local community focus"]
    },
    {
      icon: <Bell className="w-8 h-8 text-rose-500" />,
      title: "Targeted Alerts",
      description: "When someone nearby needs your specific blood type, you receive a silent, urgent notification.",
      details: ["5km radius matching", "Type-specific filtering", "No public broadcasting"]
    },
    {
      icon: <ShieldCheck className="w-8 h-8 text-emerald-500" />,
      title: "Secure Response",
      description: "Review the request details—location and urgency—and choose to help without revealing your identity yet.",
      details: ["Anonymous browsing", "Urgency indicators", "One-tap acceptance"]
    },
    {
      icon: <Handshake className="w-8 h-8 text-amber-500" />,
      title: "The Handshake",
      description: "Identity and contact details are only revealed once both parties 'handshake' to coordinate the donation.",
      details: ["Encrypted contact sharing", "Coordinate via secure chat", "Identity protection"]
    }
  ];
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 font-sans text-slate-900 dark:text-slate-100 selection:bg-rose-100 selection:text-rose-700 transition-colors duration-300">

      {/* Background Decor */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-rose-500/5 rounded-full blur-[120px]"></div>
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-blue-500/5 rounded-full blur-[120px]"></div>
      </div>

      {/* Hero Section */}
      <section className="relative pt-24 pb-16 px-6 text-center">
        <div className="max-w-3xl mx-auto space-y-6">
          <div className="inline-flex items-center gap-2 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 px-4 py-2 rounded-2xl shadow-sm text-rose-600 dark:text-rose-400 text-sm font-bold uppercase tracking-widest">
            <Droplets size={16} />
            The Lifeline Protocol
          </div>
          <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight">
            How <span className="text-rose-600">BloodBridge</span> Connects Us.
          </h1>
          <p className="text-lg md:text-xl text-slate-600 dark:text-slate-400 leading-relaxed">
            A peer-to-peer network designed to make blood donation fast, local, and completely private.
          </p>
        </div>
      </section>

      {/* Steps Grid */}
      <section className="max-w-7xl mx-auto px-6 py-12">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((step, idx) => (
            <div key={idx} className="relative group">
              <div className="h-full bg-white dark:bg-slate-900 p-8 rounded-[2.5rem] border border-slate-100 dark:border-slate-800 shadow-xl shadow-slate-200/50 dark:shadow-none hover:border-rose-200 dark:hover:border-rose-900 transition-all hover:-translate-y-1">
                <div className="w-16 h-16 bg-slate-50 dark:bg-slate-800 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                  {step.icon}
                </div>
                <h3 className="text-xl font-bold mb-3">{step.title}</h3>
                <p className="text-slate-500 dark:text-slate-400 text-sm leading-relaxed mb-6">
                  {step.description}
                </p>
                <ul className="space-y-2">
                  {step.details.map((detail, i) => (
                    <li key={i} className="flex items-center gap-2 text-xs font-semibold text-slate-400 dark:text-slate-500">
                      <CheckCircle2 size={14} className="text-emerald-500" />
                      {detail}
                    </li>
                  ))}
                </ul>
              </div>
              {idx < steps.length - 1 && (
                <div className="hidden lg:block absolute top-1/2 -right-4 translate-y-[-50%] z-20">
                  <ArrowRight className="text-slate-200 dark:text-slate-800 w-8 h-8" />
                </div>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* Privacy Deep Dive */}
      <section className="max-w-4xl mx-auto px-6 py-20">
        <div className="bg-slate-900 dark:bg-slate-800 text-white rounded-[3rem] p-10 md:p-16 relative overflow-hidden">
          <div className="relative z-10 grid md:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <h2 className="text-3xl font-bold">Privacy is our <br /><span className="text-rose-500">Foundation.</span></h2>
              <p className="text-slate-400 leading-relaxed">
                Unlike public social media posts, BloodBridge never exposes your phone number or exact location to the general public.
              </p>
              <div className="space-y-4">
                <div className="flex gap-4">
                  <div className="mt-1"><MapPin className="text-rose-500" size={20} /></div>
                  <p className="text-sm text-slate-300"><span className="font-bold text-white">Proximal Alerting:</span> We use coordinates to calculate distance, but never show your house number on a map.</p>
                </div>
                <div className="flex gap-4">
                  <div className="mt-1"><MessageSquare className="text-rose-500" size={20} /></div>
                  <p className="text-sm text-slate-300"><span className="font-bold text-white">Controlled Contact:</span> You decide exactly when to share your contact details with a verified neighbor.</p>
                </div>
              </div>
            </div>
            <div className="relative">
              <div className="aspect-square bg-gradient-to-br from-rose-500/20 to-blue-500/20 rounded-full flex items-center justify-center p-8 border border-white/10">
                <ShieldCheck className="w-32 h-32 text-white opacity-50" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="pb-24 px-6 text-center space-y-4">
        {(!loggedInUser) && (<div className="max-w-xl mx-auto space-y-8">
          <h2 className="text-3xl font-bold">Ready to join the network?</h2>
          <button
            onClick={() => navigate('/register')}
            className="w-full sm:w-auto px-12 py-4 bg-rose-600 text-white rounded-2xl font-bold text-lg shadow-xl shadow-rose-200 dark:shadow-none hover:bg-rose-700 transition-all flex items-center justify-center gap-2 mx-auto"
          >
            Create My Account
            <ArrowRight size={20} />
          </button>
        </div>)}
        <button
          onClick={() => navigate('/')}
          className="block mx-auto text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 font-bold transition-colors"
        >
          ← Back to Home
        </button>
      </section>
    </div>
  );
};

export default HowItWorksPage;