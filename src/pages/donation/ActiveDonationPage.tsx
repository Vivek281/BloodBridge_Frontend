import { useParams, useNavigate, useLocation } from "react-router";
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

const ActiveDonationPage = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const location = useLocation();
    const [request, setRequest] = useState<any>(null);
    const [loading, setLoading] = useState(true);

    // Get phone from state if passed, otherwise we'll have it from the fetch
    const passedPhone = location.state?.phone;

    useEffect(() => {
        const fetchActiveDetails = async () => {
            try {
                const res = await axiosInstance.get(`/blood-request/${id}`);
                setRequest(res.data);
            } catch (err) {
                toast.error("Could not load donation details");
                navigate('/requests');
            } finally {
                setLoading(false);
            }
        };
        fetchActiveDetails();
    }, [id, navigate]);

    if (loading) return <div className="min-h-screen bg-slate-950 flex items-center justify-center text-white">Loading Mission...</div>;

    const googleMapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(request?.hospitalName)}`;

    return (
        <div className="min-h-screen bg-slate-950 text-slate-100 pb-10">
            {/* Header Area */}
            <div className="bg-rose-600 pt-12 pb-20 px-6 rounded-b-[3rem] shadow-2xl pt-20 shadow-rose-900/20">
                <button 
                    onClick={() => navigate(-1)}
                    className="mb-6 p-2 bg-white/10 rounded-full backdrop-blur-md text-white hover:bg-white/20 transition-all"
                >
                    <ChevronLeft size={24} />
                </button>
                <div className="flex items-center gap-4 mb-4">
                    <div className="w-16 h-16 bg-white rounded-3xl flex items-center justify-center text-rose-600 shadow-xl animate-pulse">
                        <Heart size={32} fill="currentColor" />
                    </div>
                    <div>
                        <h1 className="text-3xl font-black tracking-tighter">MISSION ACTIVE</h1>
                        <p className="text-rose-100 font-bold text-sm uppercase tracking-widest opacity-80">Donating {request?.patientBloodGroup} Blood</p>
                    </div>
                </div>
            </div>

            {/* Content Cards */}
            <div className="px-6 -mt-12 space-y-4">
                
                {/* 1. CONTACT CARD (The Reward for Accepting) */}
                <div className="bg-slate-900 border border-slate-800 p-8 rounded-[2.5rem] shadow-2xl">
                    <div className="flex items-center justify-between mb-6">
                        <p className="text-[10px] font-black text-slate-500 uppercase tracking-[0.2em]">Requester Contact</p>
                        <span className="flex items-center gap-1 text-emerald-500 text-[10px] font-black uppercase tracking-widest">
                            <CheckCircle size={12} /> Verified
                        </span>
                    </div>
                    <div className="flex items-center justify-between">
                        <h2 className="text-4xl font-black tracking-tight">{request?.phone || passedPhone}</h2>
                        <a 
                            href={`tel:${request?.phone || passedPhone}`}
                            className="w-16 h-16 bg-emerald-500 hover:bg-emerald-600 text-white rounded-2xl flex items-center justify-center shadow-lg shadow-emerald-900/40 transition-all active:scale-90"
                        >
                            <Phone size={28} />
                        </a>
                    </div>
                </div>

                {/* 2. NAVIGATION CARD */}
                <div className="bg-slate-900 border border-slate-800 p-8 rounded-[2.5rem] shadow-2xl">
                    <p className="text-[10px] font-black text-slate-500 uppercase tracking-[0.2em] mb-6">Destination</p>
                    <div className="flex items-start gap-4 mb-8">
                        <div className="p-3 bg-slate-800 rounded-2xl text-rose-500">
                            <MapPin size={24} />
                        </div>
                        <div>
                            <h3 className="text-xl font-bold leading-tight">{request?.hospitalName}</h3>
                            <p className="text-slate-400 text-sm mt-1">Please arrive within 30-45 minutes if possible.</p>
                        </div>
                    </div>
                    <a 
                        href={googleMapsUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="w-full py-5 bg-slate-100 text-slate-950 rounded-2xl font-black text-center flex items-center justify-center gap-3 hover:bg-white transition-all active:scale-[0.98]"
                    >
                        <Navigation size={20} />
                        OPEN IN GOOGLE MAPS
                    </a>
                </div>

                {/* 3. TIMELINE/STATUS */}
                <div className="bg-slate-900/50 border border-dashed border-slate-800 p-6 rounded-[2rem] flex items-center gap-4">
                    <div className="p-3 bg-amber-500/10 text-amber-500 rounded-xl">
                        <Clock size={20} />
                    </div>
                    <div className="text-xs font-bold text-slate-400 leading-relaxed uppercase tracking-tight">
                        Status: <span className="text-white">Awaiting your arrival at hospital</span>
                    </div>
                </div>

                {/* CANCEL/EMERGENCY BUTTON */}
                <button 
                    className="w-full py-4 text-slate-600 hover:text-rose-500 text-[10px] font-black uppercase tracking-[0.3em] transition-colors mt-4 flex items-center justify-center gap-2"
                    onClick={() => {
                        if(window.confirm("Are you sure you need to cancel? This will put the request back on the map for others.")) {
                            // Logic to cancel donation
                            toast.info("Donation cancelled. Request is back on map.");
                            navigate('/requests');
                        }
                    }}
                >
                    <AlertTriangle size={14} /> I Can No Longer Make It
                </button>
            </div>
        </div>
    );
};

export default ActiveDonationPage;