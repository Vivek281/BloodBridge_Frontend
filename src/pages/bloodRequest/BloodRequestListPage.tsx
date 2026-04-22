import { useEffect, useState, useCallback } from "react";
import { useNavigate } from "react-router";
import {
    ChevronLeft,
    MapPin,
    Droplets,
    ChevronRight,
    Inbox,
    Loader2
} from "lucide-react";
import axiosInstance from "../../config/axios.config";
import { toast } from "sonner";
import { formatDistanceToNow } from "date-fns";
import { useAuth } from "../../hooks/useAuth";

// 1. Define the Interface clearly
interface BloodRequest {
    _id: string;
    patientBloodGroup: string;
    hospitalName: string;
    createdAt: string;
}


const BloodRequestListPage = () => {
    const navigate = useNavigate();
    const {loggedInUser} = useAuth();


    // 2. FIX: Initialize as an array of BloodRequest objects
    const [requests, setRequests] = useState<BloodRequest[]>([]);

    const [pagination, setPagination] = useState({
        page: 1,
        totalNoOfPages: 1,
        total: 0
    });
    const [loading, setLoading] = useState(true);

    const fetchRequests = useCallback(async (pageNumber = 1) => {
        if(!loggedInUser){
            navigate("/login");
            toast.info("Please Login First.")
            return;
        }
        setLoading(true);
        try {
          // 'response' here is now the actual JSON object from your Postman snippet
          const response: any = await axiosInstance.get(
            `/blood-request/request-list?page=${pageNumber}&limit=10`
          );
          
          // Check 'response.status' directly, not 'response.data.status'
          if (response.status === "OK") {
            setRequests(response.data); // This refers to the 'data' array in your JSON
            setPagination(response.meta.pagination);
          } else {
            setRequests([]);
          }
        } catch (error: any) {
          console.error("Fetch error:", error);
          // Use the error structure defined in your interceptor (error.status or error.code)
          if (error.status === "UNAVAILABLE" || error.code === 404) {
            setRequests([]);
          } else {
            toast.error("Failed to load blood requests");
          }
        } finally {
          setLoading(false);
        }
      }, []);

    useEffect(() => {
        fetchRequests(1);
    }, [fetchRequests]);

    // 3. FIX: Changed 'any' to 'number' for better type safety
    const handlePageChange = (newPage: number) => {
        if (newPage >= 1 && newPage <= pagination.totalNoOfPages) {
            fetchRequests(newPage);
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }
    };

    return (
        <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 pb-24 transition-colors duration-300">
            {/* Header */}
            <div className="bg-white dark:bg-slate-900 px-6 pt-24 pb-6 border-b border-slate-200 dark:border-slate-800  top-0 z-30 shadow-sm">
                <div className="flex items-center gap-4 z-10 mb-8">
                    <button
                        onClick={() => navigate(-1)}
                        className="p-2 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-xl transition-colors"
                    >
                        <ChevronLeft size={24} />
                    </button>
                    <div>
                        <h1 className="text-xl font-black tracking-tight">Nearby Requests</h1>
                        <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">
                            {pagination.total || 0} Matches Found
                        </p>
                    </div>
                </div>
            </div>

            <div className="p-6 space-y-4">
                {loading ? (
                    <div className="flex flex-col items-center justify-center py-20">
                        <Loader2 className="w-8 h-8 text-rose-500 animate-spin mb-4" />
                        <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Scanning Area...</p>
                    </div>
                ) : requests.length > 0 ? ( // 4. Simplified check since requests is now always an array
                    <>
                        {requests.map((request) => (
                            <div
                                key={request._id}
                                onClick={() => navigate(`/requests/${request._id}`)}
                                className="bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 p-5 rounded-[2rem] shadow-sm hover:shadow-md transition-all active:scale-[0.98] group cursor-pointer"
                            >
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center gap-4 overflow-hidden">
                                        <div className="w-12 h-12 bg-rose-50 dark:bg-rose-500/10 rounded-2xl flex-shrink-0 flex items-center justify-center text-rose-600 dark:text-rose-500">
                                            <Droplets size={24} fill="currentColor" />
                                        </div>
                                        <div className="overflow-hidden">
                                            <h3 className="font-black text-lg leading-tight truncate">
                                                {request.patientBloodGroup} Requested
                                            </h3>
                                            <div className="flex flex-col gap-0.5 mt-1">
                                                <div className="flex items-center gap-1 text-slate-500 dark:text-slate-400">
                                                    <MapPin size={12} className="flex-shrink-0" />
                                                    <span className="text-[11px] font-bold truncate">
                                                        {request.hospitalName}
                                                    </span>
                                                </div>

                                                {/* ADDED: Time ago indicator */}
                                                <p className="text-[10px] font-medium text-rose-500/80 dark:text-rose-400/80 italic">
                                                    {formatDistanceToNow(new Date(request.createdAt), { addSuffix: true })}
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="w-10 h-10 rounded-full flex-shrink-0 flex items-center justify-center bg-slate-50 dark:bg-slate-800 group-hover:bg-rose-500 group-hover:text-white transition-all">
                                        <ChevronRight size={18} />
                                    </div>
                                </div>
                            </div>
                        ))}

                        {/* Pagination Controls */}
                        {pagination.totalNoOfPages > 1 && (
                            <div className="flex items-center justify-between pt-6 border-t border-slate-100 dark:border-slate-800">
                                <button
                                    disabled={pagination.page === 1}
                                    onClick={() => handlePageChange(pagination.page - 1)}
                                    className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest disabled:opacity-20 p-2 text-rose-600 dark:text-rose-400"
                                >
                                    <ChevronLeft size={16} strokeWidth={3} /> Prev
                                </button>

                                <div className="bg-slate-100 dark:bg-slate-800 px-4 py-1.5 rounded-full text-[9px] font-black text-slate-500 tracking-widest uppercase">
                                    {pagination.page} / {pagination.totalNoOfPages}
                                </div>

                                <button
                                    disabled={pagination.page === pagination.totalNoOfPages}
                                    onClick={() => handlePageChange(pagination.page + 1)}
                                    className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest disabled:opacity-20 p-2 text-rose-600 dark:text-rose-400"
                                >
                                    Next <ChevronRight size={16} strokeWidth={3} />
                                </button>
                            </div>
                        )}
                    </>
                ) : (
                    <div className="text-center py-20 bg-white dark:bg-slate-900 rounded-[3rem] border border-dashed border-slate-200 dark:border-slate-800 transition-colors">
                        <div className="w-16 h-16 bg-slate-50 dark:bg-slate-800 rounded-3xl flex items-center justify-center mx-auto mb-4 text-slate-300 dark:text-slate-600">
                            <Inbox size={32} />
                        </div>
                        <h3 className="font-black text-lg">All Clear</h3>
                        <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest max-w-[220px] mx-auto mt-2 leading-relaxed">
                            No pending blood requests found in your area.
                        </p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default BloodRequestListPage;