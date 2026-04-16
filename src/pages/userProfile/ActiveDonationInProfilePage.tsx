import { useNavigate, useLocation } from "react-router";
import { useEffect, useState } from "react";
import axiosInstance from "../../config/axios.config";
import { 
  Phone, 
  MapPin, 
  Navigation, 
  ChevronLeft, 
  AlertTriangle, 
  CheckCircle,
  Clock,
  Heart
} from "lucide-react";
import { toast } from "sonner";

const ActiveDonationInProfilePage = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const [request, setRequest] = useState<any>(null);
    const [loading, setLoading] = useState(true);

    const passedPhone = location.state?.phone;

    const handleCancel = async () => {
        const confirm = window.confirm(
            "Are you sure you cannot make it? This will release the request so other donors can help."
        );
        
        if (!confirm) return;

        try {
            await axiosInstance.patch(`/donation/cannot-make-it/${request._id}`);
            toast.success("Mission cancelled. We've notified the requester.");
            navigate("/");
        } catch (err) {
            toast.error("Failed to update status. Please try again.");
            console.error(err);
        }
    };

    useEffect(() => {
        const fetchActiveDetails = async () => {
            try {
                const res = await axiosInstance.get("/blood-request/profile");
                setRequest(res.data);
            } catch (err) {
                toast.error("Could not load donation details");
            } finally {
                setLoading(false);
            }
        };
        fetchActiveDetails();
    }, []);

    if (loading) return (
        <div className="min-h-screen bg-slate-50 dark:bg-slate-950 flex items-center justify-center text-slate-900 dark:text-white transition-colors duration-300">
            <p className="font-black uppercase tracking-widest text-xs animate-pulse text-rose-600">Loading Mission...</p>
        </div>
    );

    if(!request) return (
        <div className="min-h-screen bg-slate-50 dark:bg-slate-950 flex items-center justify-center text-slate-900 dark:text-white transition-colors duration-300">
            <p className="font-black uppercase tracking-widest text-xs">No Active Requests To Show.</p>
        </div>
    );

    const googleMapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(request?.hospitalName)}`;

    return (
        <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 pb-10 transition-colors duration-300">
            {/* Header Area - Signature Rose Branding */}
            <div className="bg-rose-600 pt-16 pb-20 px-6 rounded-b-[3rem] shadow-2xl relative overflow-hidden">
                <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -mr-20 -mt-20 blur-3xl"></div>
                
                <button 
                    onClick={() => navigate(-1)}
                    className="relative z-10 mb-6 p-2.5 bg-white/20 rounded-2xl backdrop-blur-md text-white hover:bg-white/30 transition-all active:scale-95"
                >
                    <ChevronLeft size={24} />
                </button>
                
                <div className="relative z-10 flex items-center gap-5 mb-4">
                    <div className="w-16 h-16 bg-white rounded-[1.5rem] flex items-center justify-center text-rose-600 shadow-xl animate-pulse">
                        <Heart size={32} fill="currentColor" />
                    </div>
                    <div>
                        <h1 className="text-3xl font-black tracking-tighter text-white">MISSION ACTIVE</h1>
                        <p className="text-rose-100 font-bold text-xs uppercase tracking-[0.2em] opacity-90">Donating {request?.patientBloodGroup} Blood</p>
                    </div>
                </div>
            </div>

            {/* Content Cards */}
            <div className="px-6 -mt-12 space-y-5 relative z-20">
                
                {/* 1. CONTACT CARD */}
                <div className="bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 p-8 rounded-[2.5rem] shadow-xl shadow-slate-200/50 dark:shadow-none transition-colors">
                    <div className="flex items-center justify-between mb-6">
                        <p className="text-[10px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-[0.2em]">Requester Contact</p>
                        <span className="flex items-center gap-1 text-emerald-500 dark:text-emerald-400 text-[10px] font-black uppercase tracking-widest bg-emerald-50 dark:bg-emerald-500/10 px-2 py-1 rounded-lg">
                            <CheckCircle size={12} strokeWidth={3} /> Verified
                        </span>
                    </div>
                    <div className="flex items-center justify-between">
                        <h2 className="text-3xl font-black tracking-tight text-slate-900 dark:text-white">
                            {request?.phone || passedPhone}
                        </h2>
                        <a 
                            href={`tel:${request?.phone || passedPhone}`}
                            className="w-14 h-14 bg-emerald-500 hover:bg-emerald-600 text-white rounded-2xl flex items-center justify-center shadow-lg shadow-emerald-200 dark:shadow-emerald-900/20 transition-all active:scale-90"
                        >
                            <Phone size={24} />
                        </a>
                    </div>
                </div>

                {/* 2. NAVIGATION CARD */}
                <div className="bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 p-8 rounded-[2.5rem] shadow-xl shadow-slate-200/50 dark:shadow-none transition-colors">
                    <p className="text-[10px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-[0.2em] mb-6">Destination</p>
                    <div className="flex items-start gap-4 mb-8">
                        <div className="p-3 bg-rose-50 dark:bg-rose-900/20 rounded-2xl text-rose-500">
                            <MapPin size={24} />
                        </div>
                        <div>
                            <h3 className="text-xl font-black leading-tight text-slate-900 dark:text-white">{request?.hospitalName}</h3>
                            <p className="text-slate-500 dark:text-slate-400 text-xs font-bold mt-1 uppercase tracking-tight">Please arrive within 30-45 minutes.</p>
                        </div>
                    </div>
                    <a 
                        href={googleMapsUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="w-full py-5 bg-slate-900 dark:bg-white text-white dark:text-slate-900 rounded-2xl font-black text-xs tracking-widest text-center flex items-center justify-center gap-3 hover:opacity-90 transition-all active:scale-[0.98]"
                    >
                        <Navigation size={18} />
                        OPEN IN GOOGLE MAPS
                    </a>
                </div>

                {/* 3. TIMELINE/STATUS */}
                <div className="bg-white/50 dark:bg-slate-900/50 border border-dashed border-slate-200 dark:border-slate-800 p-6 rounded-[2rem] flex items-center gap-4 transition-colors">
                    <div className="p-3 bg-amber-50 dark:bg-amber-500/10 text-amber-600 dark:text-amber-500 rounded-xl">
                        <Clock size={20} />
                    </div>
                    <div className="text-[10px] font-black text-slate-400 dark:text-slate-500 leading-relaxed uppercase tracking-widest">
                        Status: <span className="text-slate-900 dark:text-white">Awaiting arrival</span>
                    </div>
                </div>

                {/* CANCEL BUTTON */}
                <button 
                    onClick={handleCancel}
                    className="w-full py-4 text-slate-400 dark:text-slate-600 border rounded-[2rem] hover:text-rose-500 dark:hover:text-rose-400 text-[10px] font-black uppercase tracking-[0.3em] transition-colors mt-4 flex items-center justify-center gap-2"
                >
                    <AlertTriangle size={14} /> I Can No Longer Make It
                </button>
            </div>
        </div>
    );
};

export default ActiveDonationInProfilePage;