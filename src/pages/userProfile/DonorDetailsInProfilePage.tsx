import { useParams, useNavigate } from "react-router";
import { useEffect, useState } from "react";
import axiosInstance from "../../config/axios.config";
import { Phone, ShieldCheck, MapPin, ChevronLeft, MessageCircle, User, Star, Zap, Info, CheckCircle} from "lucide-react";
import { toast } from "sonner";

interface DonorData {
  name: string;
  phone: string;
  address: string;
  bloodGroup: string;
  donationHistory: string;
  gender: string;
}

const DonorDetailsInProfilePage = () => {
    const { id } = useParams(); // Grabs :id from /donor/:id
    const navigate = useNavigate();
    const [donor, setDonor] = useState<DonorData | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchDonorDetails = async () => {
            try {
                // Calling your specific endpoint
                const res = await axiosInstance.get(`/donation/donationId/${id}`);
                setDonor(res.data);
            } catch (err) {
                toast.error("Unable to fetch donor details");
                console.error(err);
                // navigate(-1); // Optional: go back on error
            } finally {
                setLoading(false);
            }
        };

        if (id) fetchDonorDetails();
    }, [id]);

    const handleFulfilled = async () => {
        const confirm = window.confirm("Are you sure the donation is complete? This will close the request.");
        if (!confirm) return;
        const data =  {
            donorId: id,
            bloodGroup: donor?.bloodGroup 
        }
        try {
            // Replace with your actual fulfill endpoint
            await axiosInstance.patch(`/blood-request/fulfill`, data); 
            toast.success("Request marked as fulfilled. Thank you!");
            navigate("/requests");
        } catch (err) {
            toast.error("Failed to update status");
        }
    };

    if (loading) return (
        <div className="min-h-screen bg-slate-50 flex flex-col items-center justify-center p-6 text-center">
            <div className="w-12 h-12 border-4 border-emerald-500 border-t-transparent rounded-full animate-spin mb-4"></div>
            <p className="text-slate-500 font-bold uppercase tracking-widest text-[10px]">Verifying Hero Details...</p>
        </div>
    );

    if (!donor) return null;

    return (
        <div className="min-h-screen bg-slate-50 text-slate-900 font-sans pb-12">
            
            {/* Header Section */}
            <div className="bg-emerald-600 pt-20 2xl:pt-12 pb-32 px-6 rounded-b-[3.5rem] shadow-2xl shadow-emerald-900/20 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full -mr-20 -mt-20 blur-3xl"></div>
                
                <div className="flex items-center justify-between relative z-10 mb-8">
                    <button 
                        onClick={() => navigate(-1)}
                        className="p-2.5 bg-white/20 rounded-2xl backdrop-blur-md text-white hover:bg-white/30 transition-all"
                    >
                        <ChevronLeft size={24} />
                    </button>
                    <div className="px-4 py-1.5 bg-emerald-500/30 backdrop-blur-md rounded-full border border-white/20">
                        <span className="text-[10px] font-black text-white uppercase tracking-widest text-center">Match Active</span>
                    </div>
                </div>

                <div className="relative z-10 text-center">
                    <h1 className="text-4xl font-black text-white tracking-tighter mb-2 uppercase">Donor Found</h1>
                    <p className="text-emerald-100/80 text-sm font-medium italic">A hero is responding to your request.</p>
                </div>
            </div>

            {/* Profile Content */}
            <div className="px-6 -mt-20 space-y-6">
                
                {/* 1. Main Profile Card */}
                <div className="bg-white rounded-[2.5rem] shadow-xl border border-slate-100 p-8">
                    <div className="flex justify-between items-start mb-8">
                        <div className="relative">
                            <div className="w-24 h-24 bg-slate-100 rounded-[2rem] flex items-center justify-center text-slate-400 border-4 border-white shadow-lg overflow-hidden capitalize">
                                <User size={48} />
                            </div>
                            <div className="absolute -bottom-1 -right-1 bg-blue-500 text-white p-1.5 rounded-xl border-4 border-white shadow-md">
                                <ShieldCheck size={16} strokeWidth={3} />
                            </div>
                        </div>
                        <div className="flex flex-col items-end gap-2 pt-4">
                            <div className="w-16 h-16 bg-rose-50 text-rose-600 rounded-2xl flex flex-col items-center justify-center border border-rose-100 shadow-sm relative shadow-lg overflow-hidden">
                                <span className="text-[10px] font-black leading-none mb-0.5 uppercase">Group</span>
                                <span className="text-2xl font-black leading-none tracking-tighter">{donor.bloodGroup}</span>
                            </div>
                            <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest pr-1">
                                {donor.gender}
                            </span>
                        </div>
                    </div>

                    <div className="mb-8">
                        <h2 className="text-3xl font-black text-slate-900 tracking-tight mb-1 capitalize">{donor.name}</h2>
                        <div className="flex items-center gap-3">
                            <div className="flex items-center gap-1 text-amber-500 font-bold text-sm">
                                <Star size={16} fill="currentColor" /> 5.0
                            </div>
                            <div className="w-1 h-1 bg-slate-200 rounded-full"></div>
                            <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">
                                {donor.donationHistory} Successful Donations
                            </span>
                        </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <a 
                            href={`tel:${donor.phone}`} 
                            className="flex flex-col items-center justify-center gap-2 py-5 bg-emerald-500 text-white rounded-3xl shadow-lg shadow-emerald-500/30 active:scale-95 transition-transform"
                        >
                            <Phone size={24} />
                            <span className="text-[10px] font-black uppercase tracking-widest">Call Donor</span>
                        </a>
                        <button className="flex flex-col items-center justify-center gap-2 py-5 bg-slate-900 text-white rounded-3xl shadow-lg shadow-slate-900/30 active:scale-95 transition-transform">
                            <MessageCircle size={24} />
                            <span className="text-[10px] font-black uppercase tracking-widest">Message</span>
                        </button>
                    </div>
                </div>

                {/* 2. Location & Mission Info */}
                <div className="bg-white rounded-[2.5rem] shadow-lg border border-slate-100 p-8">
                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-6">Mission Details</p>
                    
                    <div className="space-y-8">
                        <div className="flex items-start gap-5">
                            <div className="w-12 h-12 bg-slate-100 text-slate-600 rounded-2xl flex items-center justify-center flex-shrink-0">
                                <MapPin size={22} />
                            </div>
                            <div>
                                <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Donor Origin</p>
                                <p className="text-sm font-bold text-slate-800 leading-tight capitalize">{donor.address}</p>
                            </div>
                        </div>

                        <div className="flex items-start gap-5">
                            <div className="w-12 h-12 bg-blue-50 text-blue-600 rounded-2xl flex items-center justify-center flex-shrink-0 animate-pulse">
                                <Zap size={22} />
                            </div>
                            <div>
                                <p className="text-[10px] font-black text-blue-400 uppercase tracking-widest mb-1">Current Status</p>
                                <p className="text-sm font-black text-slate-900 uppercase">En Route to Hospital</p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* 3. Safety Advisory */}
                <div className="bg-amber-50 border border-amber-100 rounded-[2rem] p-6 flex gap-4">
                    <div className="w-10 h-10 bg-amber-500 text-white rounded-xl flex items-center justify-center flex-shrink-0">
                        <Info size={20} />
                    </div>
                    <div>
                        <p className="text-[10px] font-black text-amber-900 uppercase tracking-tight mb-1">Safety Advisory</p>
                        <p className="text-xs text-amber-800 leading-relaxed font-medium">
                            Please verify the donor's ID at the hospital reception before starting the procedure.
                        </p>
                    </div>
                </div>
                <div className="pt-4">
                    <button 
                        onClick={handleFulfilled}
                        className="w-full flex items-center justify-center gap-3 py-5 bg-white text-emerald-600 border-2 border-emerald-100 rounded-[2rem] shadow-sm hover:bg-emerald-50 active:scale-95 transition-all group"
                    >
                        <CheckCircle size={22} className="group-hover:scale-110 transition-transform" />
                        <span className="text-xs font-black uppercase tracking-[0.15em]">Mark as Fulfilled</span>
                    </button>
                    <p className="text-center mt-4 text-[10px] font-bold text-slate-400 uppercase tracking-widest px-8 leading-relaxed">
                        Only click this once the blood has been successfully received.
                    </p>
                </div>
            </div>
        </div>
    );
};

export default DonorDetailsInProfilePage;