import React, { useState, useEffect, useRef } from 'react';
import { NavLink, Outlet, useNavigate } from 'react-router';
import { 
  Droplets, ShieldCheck, ArrowRight, Menu, X, 
  Bell, HandHeart, User, Settings, Moon, Sun,
  LogOut, History, ChevronDown
} from 'lucide-react';
import { useAuth } from '../../hooks/useAuth';
import { toast } from 'sonner';
import { onMessage } from 'firebase/messaging';
import { messaging } from "../../utils/firebaseUtils";

const UserLayout: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);
  const [isProfileOpen, setIsProfileOpen] = useState<boolean>(false); // Dropdown State
  const [scrolled, setScrolled] = useState<boolean>(false);
  const dropdownRef = useRef<HTMLDivElement>(null); // To detect clicks outside

  const [darkMode, setDarkMode] = useState<boolean>(() => {
    const savedTheme = localStorage.getItem('theme');
    return savedTheme === 'dark';
  });

  const navigate = useNavigate();
  const { loggedInUser, logoutUser } = useAuth();

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsProfileOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Handle Scroll effect
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Sync dark mode
  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  }, [darkMode]);

  const closeMenu = (): void => setIsMenuOpen(false);

  const handleLogout = () => {
    logoutUser();
    setIsProfileOpen(false);
    toast.success("Logged Out Successfully.");
    navigate('/');
  };

  // Notification logic
  useEffect(() => {
    const unsubscribe = onMessage(messaging, (payload) => {
      const data = payload.data;
      if (payload.notification) {
        toast.message(payload.notification.title, {
          description: payload.notification.body,
          duration: 8000,
          action: {
            label: 'View',
            onClick: () => {
              if (data?.requestId) navigate(`/requests/${data.requestId}`);
              else if(data?.donorId) navigate(`/donor/${data.donorId}`);
              else navigate("/requests");
            }
          }
        });
      }
    });
    return () => unsubscribe();
  }, [navigate]);

  return (
    <div className={`${darkMode ? 'dark' : ''} transition-colors duration-300`}>
      <div className="min-h-screen bg-slate-50 dark:bg-slate-950 font-sans text-slate-900 dark:text-slate-100 selection:bg-rose-100 selection:text-rose-700">
        
        <nav className={`fixed top-0 w-full z-50 transition-all duration-300 ${
          scrolled ? 'bg-white/80 dark:bg-slate-900/80 backdrop-blur-md shadow-sm py-3' : 'bg-transparent py-5'
        }`}>
          <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
            <div className="flex items-center gap-2">
              <div className="bg-rose-600 p-1.5 rounded-lg shadow-lg shadow-rose-200 dark:shadow-none">
                <Droplets className="text-white w-6 h-6" />
              </div>
              <NavLink to="/" className="text-2xl font-bold tracking-tight text-slate-800 dark:text-white hover:text-rose-600 dark:hover:text-rose-400 transition-colors">BloodBridge</NavLink>
            </div>

            <div className="hidden md:flex items-center gap-6">
              <NavLink to="/how-it-works" className="text-sm font-semibold text-slate-600 dark:text-slate-400 hover:text-rose-600 dark:hover:text-rose-400 transition-colors">How it Works</NavLink>
              
              <button 
                onClick={() => setDarkMode(!darkMode)}
                className="p-2 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-700 transition-all"
              >
                {darkMode ? <Sun size={18} /> : <Moon size={18} />}
              </button>

              {loggedInUser ? (
                /* DESKTOP USER DROPDOWN */
                <div className="relative" ref={dropdownRef}>
                  <button 
                    onClick={() => setIsProfileOpen(!isProfileOpen)}
                    className="flex items-center gap-2 pl-2 pr-3 py-1.5 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-full hover:shadow-md transition-all active:scale-95"
                  >
                    <div className="w-8 h-8 bg-rose-600 rounded-full flex items-center justify-center text-white font-bold text-xs">
                      {loggedInUser.name.charAt(0).toUpperCase()}
                    </div>
                    <ChevronDown size={14} className={`text-slate-400 transition-transform ${isProfileOpen ? 'rotate-180' : ''}`} />
                  </button>

                  {/* Dropdown Menu */}
                  {isProfileOpen && (
                    <div className="absolute right-0 mt-3 w-64 bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-[2rem] shadow-2xl py-3 overflow-hidden animate-in fade-in zoom-in duration-200">
                      <div className="px-5 py-3 border-b border-slate-50 dark:border-slate-800 mb-2">
                        <p className="text-xs font-black text-slate-400 uppercase tracking-widest">Account</p>
                        <p className="text-sm font-bold text-slate-900 dark:text-white truncate">{loggedInUser.name}</p>
                      </div>
                      
                      <div className="px-2 space-y-1">
                        <button className="w-full flex items-center gap-3 px-4 py-3 rounded-2xl text-sm font-bold text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors">
                          <User size={18} className="text-rose-500" /> My Profile
                        </button>
                        <button className="w-full flex items-center justify-between px-4 py-3 rounded-2xl text-sm font-bold text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors">
                          <div className="flex items-center gap-3">
                            <Bell size={18} className="text-rose-500" /> Notifications
                          </div>
                          <span className="w-2 h-2 bg-rose-500 rounded-full animate-pulse"></span>
                        </button>
                        <button className="w-full flex items-center gap-3 px-4 py-3 rounded-2xl text-sm font-bold text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors">
                          <History size={18} className="text-rose-500" /> Donation History
                        </button>
                      </div>

                      <div className="mt-2 pt-2 border-t border-slate-50 dark:border-slate-800 px-2">
                        <button 
                          onClick={handleLogout}
                          className="w-full flex items-center gap-3 px-4 py-3 rounded-2xl text-sm font-black text-rose-600 hover:bg-rose-50 dark:hover:bg-rose-900/20 transition-colors"
                        >
                          <LogOut size={18} /> Log Out
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              ) : (
                <button 
                  onClick={() => navigate('/login')} 
                  className="bg-slate-900 dark:bg-rose-600 text-white px-6 py-2.5 rounded-full text-sm font-bold hover:bg-slate-800 dark:hover:bg-rose-700 transition-all shadow-md active:scale-95"
                >
                  Sign In / Join
                </button>
              )}
            </div>

            <div className="flex items-center gap-4 md:hidden">
              <button 
                onClick={() => setDarkMode(!darkMode)}
                className="p-2 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400"
              >
                {darkMode ? <Sun size={20} /> : <Moon size={20} />}
              </button>
              <button className="text-slate-800 dark:text-white" onClick={() => setIsMenuOpen(!isMenuOpen)}>
                {isMenuOpen ? <X size={28} /> : <Menu size={28} />}
              </button>
            </div>
          </div>
        </nav>

        {/* Mobile Menu Overlay */}
        <div className={`fixed inset-0 bg-white dark:bg-slate-950 z-[55] transition-transform duration-500 md:hidden ${isMenuOpen ? 'translate-y-0' : '-translate-y-full'}`}>
          {/* Close Button inside Mobile Menu */}
          <button 
            onClick={closeMenu} 
            className="absolute top-6 right-6 p-2 text-slate-800 dark:text-white"
          >
            <X size={32} />
          </button>

          <div className="flex flex-col h-full pt-28 pb-10 px-8 overflow-y-auto">
            <div className={`bg-slate-50 dark:bg-slate-900 rounded-3xl p-6 mb-8 border border-slate-100 dark:border-slate-800 transition-all duration-500 ${isMenuOpen ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
              <div className="flex items-center gap-4 mb-4">
                <div className="w-12 h-12 bg-rose-100 dark:bg-rose-900/30 rounded-full flex items-center justify-center">
                  <User className="text-rose-600 dark:text-rose-400 w-6 h-6" />
                </div>
                <div>
                  <p className="text-sm text-slate-500 dark:text-slate-400 font-medium">{loggedInUser ? loggedInUser.name : "Guest User"}</p>
                  <p className="font-bold text-slate-800 dark:text-white">Complete Profile</p>
                </div>
              </div>
              {loggedInUser && (<div className="flex items-center gap-2 text-xs font-bold text-green-600 dark:text-green-400 bg-green-50 dark:bg-green-900/20 px-3 py-1.5 rounded-full w-fit">
                <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
                ACTIVE IN NETWORK
              </div>)}
            </div>

            <div className="flex flex-col gap-6 flex-grow">
              {[
                { icon: <Bell className="w-6 h-6 text-rose-500" />, label: "Requests Nearby", href:"#"},
                { icon: <HandHeart className="w-6 h-6 text-rose-500" />, label: "How it Works", href:"/how-it-works"},
                { icon: <ShieldCheck className="w-6 h-6 text-rose-500" />, label: "Privacy Policy", href:"#"},
                { icon: <Settings className="w-6 h-6 text-rose-500" />, label: "Settings",href:"#" }
              ].map((item, idx) => (
                <a
                  key={idx}
                  href={item.href}
                  onClick={closeMenu}
                  className="flex items-center gap-4 text-2xl font-bold text-slate-800 dark:text-white hover:text-rose-600 dark:hover:text-rose-400 transition-colors"
                >
                  {item.icon}
                  {item.label}
                </a>
              ))}
            </div>

            <div className="space-y-4 mt-8">
              <button onClick={closeMenu} className="w-full py-4 bg-rose-600 text-white rounded-2xl font-bold text-lg shadow-lg flex items-center justify-center gap-2">
                Post Urgent Request <ArrowRight className="w-5 h-5" />
              </button>
              {loggedInUser ? (<button onClick={handleLogout} className="w-full py-4 bg-slate-900 dark:bg-slate-800 text-white rounded-2xl font-bold text-lg">
                Log Out
              </button>) : (<button onClick={() => navigate('/login')}className="w-full py-4 bg-slate-900 dark:bg-slate-800 text-white rounded-2xl font-bold text-lg">
                Sign In
              </button>)}
            </div>
          </div>
        </div>

              <Outlet/>

        <footer className="py-12 border-t border-slate-100 dark:border-slate-900 text-center">
          <p className="text-slate-400 dark:text-slate-500 text-sm font-medium">© 2024 BloodBridge. Built for the community, by the community.</p>
        </footer>
      </div>
    </div>
  );
}



export default UserLayout;