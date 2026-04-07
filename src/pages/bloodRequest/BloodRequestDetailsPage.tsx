import { useParams, useNavigate } from "react-router";
import { useEffect, useState } from "react";
import axiosInstance from "../../config/axios.config";
import { toast } from "sonner";
import { ArrowLeft, MapPin, AlertCircle, Clock, CheckCircle2, ExternalLink, Droplets, HeartPulse, X } from "lucide-react";

export interface IImage {
    optimizedUrl: string;
    publicId: string;
    secureUrl: string;
}

export interface IBloodRequestDetails {
    _id: string;
    requestedBy: string;
    patientBloodGroup: string;
    urgency: string;
    hospitalName: string;
    phone: string;
    status: string;
    acceptedDonationId?: string;
    healthReport: IImage;
    createdAt: string;
}

const BloodRequestDetailsPage = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [request, setRequest] = useState<IBloodRequestDetails>();
    const [loading, setLoading] = useState(true);

    // STATE: For the confirmation modal
    const [isConfirming, setIsConfirming] = useState(false);
    // STATE: For the API call within the modal
    const [isAccepting, setIsAccepting] = useState(false);
    // NEW LOGIC: Handle the final API call after confirmation
    const handleConfirmDonation = async () => {
        setIsAccepting(true);
        try {
            await axiosInstance.post(`/blood-request/${id}/accept`);
            toast.success("Request Accepted!", {
                description: "The patient is now relying on you. Please proceed.",
            });
            // 3. Close the modal
            setIsConfirming(false);
            // 4. Redirect to an active navigation/instruction page
            navigate(`/donation-active/${id}`); 
        } catch (err: any) {
            console.error("Error accepting donation:", err);
            toast.error(err.response?.data?.message || "Failed to accept request");
        } finally {
            setIsAccepting(false);
        }
    };

    useEffect(() => {
        const fetchSingleRequest = async () => {
            try {
                // Adjusting the endpoint to match your backend structure
                const res = await axiosInstance.get(`/blood-request/${id}`);
                // Handling the .data.data nesting from your Postman response
                setRequest(res.data as IBloodRequestDetails);
            } catch (err) {
                console.error("Error loading specific request:", err);
            } finally {
                setLoading(false);
            }
        };
        if (id) fetchSingleRequest();
    }, [id]);

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-slate-50 dark:bg-slate-950">
                <div className="flex flex-col items-center gap-4">
                    <div className="w-12 h-12 border-4 border-rose-600 border-t-transparent rounded-full animate-spin"></div>
                    <p className="text-slate-500 font-medium">Fetching medical data...</p>
                </div>
            </div>
        );
    }

    if (!request) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-slate-50 dark:bg-slate-950">
                <div className="text-center p-6 bg-white dark:bg-slate-900 rounded-3xl shadow-sm border border-slate-200 dark:border-slate-800">
                    <h2 className="text-2xl font-bold text-slate-800 dark:text-slate-200">Request Not Found</h2>
                    <p className="text-slate-500 mb-6">This request may have been completed or removed.</p>
                    <button
                        onClick={() => navigate('/requests')}
                        className="px-6 py-2 bg-rose-600 text-white rounded-full font-bold hover:bg-rose-700 transition-colors"
                    >
                        Return to Map
                    </button>
                </div>
            </div>
        );
    }



    const urgencyColors: Record<string, string> = {
        high: "bg-rose-100 text-rose-700 border-rose-200 dark:bg-rose-900/30 dark:text-rose-400",
        medium: "bg-amber-100 text-amber-700 border-amber-200 dark:bg-amber-900/30 dark:text-amber-400",
        low: "bg-emerald-100 text-emerald-700 border-emerald-200 dark:bg-emerald-900/30 dark:text-emerald-400",
        emergency: "bg-red-600 text-white border-red-700 animate-pulse"
    };

    return (
        <div className="min-h-screen bg-slate-50 dark:bg-slate-950 transition-colors duration-300 pb-20">
            <section className="relative pt-24 px-6">
                <div className="max-w-2xl mx-auto">

                    {/* Top Navigation */}
                    <button
                        onClick={() => navigate(-1)}
                        className="flex items-center gap-2 text-slate-500 hover:text-rose-600 transition-colors mb-6 group"
                    >
                        <ArrowLeft size={18} className="group-hover:-translate-x-1 transition-transform" />
                        <span className="font-semibold text-sm">Back to Dashboard</span>
                    </button>

                    {/* Main Content Card */}
                    <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-xl overflow-hidden">

                        {/* Status Header */}
                        <div className={`px-8 py-4 flex items-center justify-between border-b border-slate-100 dark:border-slate-800 ${request.urgency.toLowerCase() === 'emergency' ? 'bg-red-600 text-white' : 'bg-slate-50 dark:bg-slate-800/50'}`}>
                            <div className="flex items-center gap-2">
                                <Clock size={16} />
                                <span className="text-[10px] font-black uppercase tracking-[0.2em]">
                                    Posted {new Date(request.createdAt).toLocaleDateString()}
                                </span>
                            </div>
                            <div className={`px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest border shadow-sm ${urgencyColors[request.urgency.toLowerCase()] || urgencyColors.medium}`}>
                                {request.urgency} Priority
                            </div>
                        </div>

                        <div className="p-8">
                            {/* Title Section */}
                            <div className="flex items-start justify-between mb-10">
                                <div>
                                    <div className="flex items-center gap-2 mb-2 text-rose-600">
                                        <Droplets size={28} fill="currentColor" />
                                        <span className="font-black text-sm tracking-widest uppercase">Blood Needed</span>
                                    </div>
                                    <h1 className="text-6xl font-black text-slate-900 dark:text-white leading-none">
                                        {request.patientBloodGroup}
                                    </h1>
                                </div>
                                <div className="text-right">
                                    <span className={`inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-black tracking-wider shadow-sm border ${request.status === 'pending' ? 'bg-amber-50 text-amber-600 border-amber-100' : 'bg-emerald-50 text-emerald-600 border-emerald-100'}`}>
                                        <CheckCircle2 size={14} />
                                        {request.status.toUpperCase()}
                                    </span>
                                </div>
                            </div>

                            {/* Details Grid */}
                            <div className="grid grid-cols-1 md:grid-cols-1 gap-4 mb-10">
                                <div className="p-5 rounded-2xl bg-slate-50 dark:bg-slate-800/40 border border-slate-100 dark:border-slate-700/50 flex items-center gap-5 group hover:border-rose-200 dark:hover:border-rose-900/50 transition-colors">
                                    <div className="w-12 h-12 rounded-2xl bg-white dark:bg-slate-800 shadow-md flex items-center justify-center text-rose-600 shrink-0">
                                        <MapPin size={24} />
                                    </div>
                                    <div>
                                        <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.15em] mb-0.5">Location</p>
                                        <p className="font-bold text-slate-800 dark:text-slate-100 leading-tight">{request.hospitalName}</p>
                                    </div>
                                </div>

                                {/* <div className="p-5 rounded-2xl bg-slate-50 dark:bg-slate-800/40 border border-slate-100 dark:border-slate-700/50 flex items-center gap-5 group hover:border-rose-200 dark:hover:border-rose-900/50 transition-colors">
                                    <div className="w-12 h-12 rounded-2xl bg-white dark:bg-slate-800 shadow-md flex items-center justify-center text-rose-600 shrink-0">
                                        <Phone size={24} />
                                    </div>
                                    <div>
                                        <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.15em] mb-0.5">Contact</p>
                                        <p className="font-bold text-slate-800 dark:text-slate-100 leading-tight">{request.phone}</p>
                                    </div>
                                </div> */}
                            </div>

                            {/* Health Report Section */}
                            <div className="mb-10">
                                <div className="flex items-center justify-between mb-4 px-1">
                                    <h3 className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] flex items-center gap-2">
                                        <AlertCircle size={14} className="text-rose-500" /> Medical Verification
                                    </h3>
                                    <a
                                        href={request.healthReport.secureUrl}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="text-[10px] font-black text-rose-600 flex items-center gap-1 hover:underline uppercase tracking-widest bg-rose-50 dark:bg-rose-900/20 px-2 py-1 rounded"
                                    >
                                        Inspect <ExternalLink size={10} />
                                    </a>
                                </div>
                                <div className="relative group aspect-video rounded-[2rem] overflow-hidden border-2 border-slate-100 dark:border-slate-800 bg-slate-200 dark:bg-slate-800">
                                    <img
                                        src={request.healthReport.optimizedUrl}
                                        alt="Health Report"
                                        className="w-full h-full object-cover transition-all duration-700 group-hover:scale-105 group-hover:brightness-110 cursor-zoom-in"
                                        onClick={() => window.open(request.healthReport.secureUrl, '_blank')}
                                    />
                                    <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center pointer-events-none">
                                        <span className="bg-white/90 dark:bg-slate-900/90 px-4 py-2 rounded-full text-xs font-bold shadow-lg">Click to enlarge</span>
                                    </div>
                                </div>
                            </div>

                            {/* Action Buttons */}
                            <div className="flex flex-col gap-4">
                                {/* ACTION BUTTONS (Updated onClick) */}
                                <div className="flex flex-col gap-3">
                                    <button
                                        onClick={() => setIsConfirming(true)} // Open the modal
                                        className="w-full py-4 bg-rose-600 text-white rounded-2xl font-black text-lg hover:bg-rose-700 hover:scale-[1.02] active:scale-[0.98] transition-all shadow-xl shadow-rose-200 dark:shadow-none flex items-center justify-center gap-2 uppercase tracking-tight"
                                    >
                                        I Want to Donate
                                    </button>
                                    {/* ... Back to Map button ... */}
                                    <button
                                        onClick={() => navigate('/requests')}
                                        className="w-full py-4 bg-transparent text-slate-500 dark:text-slate-400 rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-slate-100 dark:hover:bg-slate-800 transition-all border border-transparent"
                                    >
                                        Browse Other Requests
                                    </button>
                                </div>

                                {/* --- NEW CONFIRMATION MODAL OVERLAY --- */}
                                {isConfirming && (
                                    <div className="fixed inset-0 z-[100] flex items-center justify-center p-6 bg-slate-950/80 backdrop-blur-sm animate-overlay-fade">

                                        {/* MODAL CONTAINER */}
                                        <div className="bg-white dark:bg-slate-900 w-full max-w-lg rounded-3xl p-10 border border-slate-200 dark:border-slate-800 shadow-2xl relative animate-modal-pop">

                                            {/* CLOSE BUTTON (X) */}
                                            <button
                                                onClick={() => setIsConfirming(false)}
                                                className="absolute top-6 right-6 p-1.5 rounded-full text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
                                            >
                                                <X size={20} />
                                            </button>

                                            {/* MODAL CONTENT */}
                                            <div className="text-center">

                                                {/* Medical Heart Icon */}
                                                <div className="mx-auto w-16 h-16 bg-rose-100 dark:bg-rose-900/40 rounded-3xl flex items-center justify-center text-rose-600 mb-8 border border-rose-200 dark:border-rose-900/50 shadow-inner">
                                                    <HeartPulse size={36} fill="currentColor" />
                                                </div>

                                                {/* COMMITMENT MESSAGE */}
                                                <h2 className="text-3xl font-black text-slate-900 dark:text-white mb-3 leading-tight tracking-tight">
                                                    One Final Commitment
                                                </h2>
                                                <p className="text-slate-600 dark:text-slate-400 font-medium leading-relaxed max-w-sm mx-auto mb-10">
                                                    You are about to become a lifeline. By accepting, you commit to helping the patient at <span className="font-bold text-rose-600">{request.hospitalName}</span>.
                                                </p>

                                                {/* REMINDER CHECKLIST */}
                                                <div className="bg-slate-50 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-800 p-6 rounded-2xl text-left space-y-3 mb-10">
                                                    <div className="flex gap-3 text-emerald-600 dark:text-emerald-500 font-semibold text-sm">
                                                        <CheckCircle2 size={16} className="shrink-0 mt-0.5" />
                                                        <span>I haven't donated in the last 3 months.</span>
                                                    </div>
                                                    <div className="flex gap-3 text-emerald-600 dark:text-emerald-500 font-semibold text-sm">
                                                        <CheckCircle2 size={16} className="shrink-0 mt-0.5" />
                                                        <span>I am not currently on antibiotics/medication.</span>
                                                    </div>
                                                    <div className="flex gap-3 text-emerald-600 dark:text-emerald-500 font-semibold text-sm">
                                                        <CheckCircle2 size={16} className="shrink-0 mt-0.5" />
                                                        <span>I am ready to proceed to the location.</span>
                                                    </div>
                                                </div>

                                                {/* FINAL ACTION BUTTONS */}
                                                <div className="grid grid-cols-2 gap-4">

                                                    {/* Cancel */}
                                                    <button
                                                        onClick={() => setIsConfirming(false)}
                                                        className="w-full py-4 bg-transparent text-slate-500 dark:text-slate-400 rounded-2xl font-bold hover:bg-slate-100 dark:hover:bg-slate-800 transition-all border border-slate-200 dark:border-slate-800 active:scale-[0.98]"
                                                    >
                                                        Not Now
                                                    </button>

                                                    {/* Confirm / Commit */}
                                                    <button
                                                        onClick={handleConfirmDonation}
                                                        disabled={isAccepting}
                                                        className={`w-full py-4 bg-rose-600 text-white rounded-2xl font-black text-lg shadow-xl shadow-rose-500/30 dark:shadow-none hover:bg-rose-700 active:scale-[0.98] transition-all flex items-center justify-center gap-2 uppercase tracking-tight ${isAccepting ? 'opacity-70 cursor-not-allowed' : ''}`}
                                                    >
                                                        {isAccepting ? (
                                                            <div className="w-5 h-5 border-4 border-white border-t-transparent rounded-full animate-spin"></div>
                                                        ) : (
                                                            "I Commit to Donate"
                                                        )}
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>

                    {/* Disclaimer */}
                    <div className="mt-8 px-6 text-center">
                        <div className="inline-block p-4 bg-amber-50 dark:bg-amber-900/10 rounded-2xl border border-amber-100 dark:border-amber-900/30">
                            <p className="text-[11px] text-amber-800 dark:text-amber-400 font-bold leading-relaxed uppercase tracking-tight">
                                Important Notice
                            </p>
                            <p className="text-[10px] text-amber-700/70 dark:text-amber-500/70 mt-1 max-w-sm mx-auto">
                                By clicking "I Am Ready to Help", your identity will be verified. Only proceed if you are medically fit to donate blood.
                            </p>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default BloodRequestDetailsPage;