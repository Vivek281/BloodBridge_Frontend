import { useState } from 'react';
import { MapPin, Phone, AlertCircle, FileText, Upload, ArrowRight, ChevronDown, Clock, Loader2 } from 'lucide-react';
import { FormLabel } from '../form/Label';
import { FormSelect, FormInput, FileInput } from '../form/Input';
import { z } from "zod";
import { phoneRegex } from '../auth/RegisterForm';
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from 'sonner';
import { useNavigate } from 'react-router';
import axiosInstance from '../../config/axios.config';


export interface IBloodRequestData {
    patientBloodGroup: string;
    urgency: string;
    hospitalName: string;
    phone: string;
    healthReport: null | File;
    latitude?: number;
    longitude?: number;
}

export const BloodRequestDTO = z.object({
    patientBloodGroup: z.string().min(1, "Blood group is required."),
    urgency: z.string().min(1, "Urgency is required to be mentioned."),
    hospitalName: z.string().min(1, "Hospital Name is required").max(100, "Hospital Name is too long"),
    phone: z.string()
        .min(1, "Phone number is required")
        .regex(phoneRegex, "Enter a valid 10-digit Nepalese phone number"),
    healthReport: z
        .instanceof(File, { message: "Please upload a valid health report (PDF or Image)." })
        .refine((file) => file.size > 0, "The uploaded file cannot be empty.")
        .refine((file) => file.size <= 5 * 1024 * 1024, "File size must be less than 5MB"),
    latitude: z.number().optional(),
    longitude: z.number().optional(),
})

const BloodRequestForm: React.FC = () => {
    const [isLocating, setIsLocating] = useState(false);
    const { handleSubmit, watch, control, formState: { errors, isSubmitting } } = useForm({
        defaultValues: {
            patientBloodGroup: '',
            urgency: '',
            hospitalName: '',
            phone: '',
            healthReport: null as unknown as File,
            latitude: 0,
            longitude: 0,
        },
        resolver: zodResolver(BloodRequestDTO)
    });
    const healthReportFile = watch("healthReport");

    const getLocation = (): Promise<{ latitude: number, longitude: number }> => {
        return new Promise((resolve, reject) => {
            if (!navigator.geolocation) {
                reject(new Error("Geolocation is not supported by your browser."));
                return;
            }
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    resolve({
                        latitude: position.coords.latitude,
                        longitude: position.coords.longitude,
                    });
                },
                (error) => {
                    let msg = "Please enable location permissions to make request.";
                    if (error.code === error.PERMISSION_DENIED) msg = "Location permission denied.";
                    if (error.code === error.TIMEOUT) msg = "Location request timed out.";
                    reject(new Error(msg));
                },
                { enableHighAccuracy: true, timeout: 10000 }
            );
        });
    };
    const navigate = useNavigate();
    const bloodRequestSubmit = async (data: IBloodRequestData) => {
        try {
            setIsLocating(true);
            const coords = await getLocation();
            setIsLocating(false);
    
            // 1. Create a FormData instance
            const formData = new FormData();
    
            // 2. Append all text fields
            formData.append("patientBloodGroup", data.patientBloodGroup);
            formData.append("urgency", data.urgency);
            formData.append("hospitalName", data.hospitalName);
            formData.append("phone", data.phone);
            formData.append("latitude", String(coords.latitude));
            formData.append("longitude", String(coords.longitude));
    
            // 3. Append the File object
            if (data.healthReport) {
                formData.append("healthReport", data.healthReport);
            }
    
            // 4. Send FormData instead of a plain object
            await axiosInstance.post("/blood-request/create-request", formData, {
                headers: { "Content-Type": "multipart/form-data" }
            });
    
            toast.success("Request made successfully!");
            navigate("/");
        } catch (err: any) {
            setIsLocating(false);
            toast.error("Request failed.");
        }
    };

    return (
        <>
            {/* Form Card */}
            <div className="bg-white dark:bg-slate-900 rounded-[2.5rem] p-8 md:p-12 shadow-xl shadow-slate-200/50 dark:shadow-none border border-slate-100 dark:border-slate-800">
                <form onSubmit={handleSubmit(bloodRequestSubmit)} className="space-y-8">

                    <div className="grid md:grid-cols-2 gap-6">
                        {/* Blood Group */}
                        <div className="space-y-2">
                            <FormLabel htmlFor="patientBloodGroup" label="Patient Blood Group" />
                            <div className="relative group">
                                <FormSelect name="patientBloodGroup" control={control} errMsg={errors?.patientBloodGroup?.message}
                                    options={[
                                        { label: "A+", value: "A+" },
                                        { label: "A-", value: "A-" },
                                        { label: "B+", value: "B+" },
                                        { label: "B-", value: "B-" },
                                        { label: "O+", value: "O+" },
                                        { label: "O-", value: "O-" },
                                        { label: "AB+", value: "AB+" },
                                        { label: "AB-", value: "AB-" },
                                    ]} />
                                <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none w-5 h-5" />
                            </div>
                        </div>

                        {/* Urgency */}
                        <div className="space-y-2">
                            <FormLabel htmlFor="urgency" label="Urgency Level" />
                            <div className="relative group">
                                <FormSelect name="urgency" control={control} errMsg={errors?.urgency?.message}
                                    options={[
                                        { value: 'low', label: 'Low' },
                                        { value: 'medium', label: 'Medium' },
                                        { value: 'high', label: 'High' },
                                        { value: 'emergency', label: 'Emergency' }
                                    ]} />
                                <Clock className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none w-5 h-5" />
                            </div>
                        </div>
                    </div>

                    {/* Hospital Name */}
                    <div className="space-y-2">
                        <FormLabel htmlFor="hospitalName" label="Hospital / Medical Center Name" />
                        <div className="relative group">
                            <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-rose-500 transition-colors w-5 h-5" />
                            <FormInput name={"hospitalName"} control={control} type="text" className='py-3.5' placeholder="e.g. City General Hospital" errMsg={errors?.hospitalName?.message} />
                        </div>
                    </div>

                    {/* Phone */}
                    <div className="space-y-2">
                        <FormLabel htmlFor="phone" label="Contact Phone Number" />
                        <div className="relative group">
                            <Phone className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-rose-500 transition-colors w-5 h-5" />
                            <FormInput name={"phone"} control={control} type="text" className='py-3.5' placeholder="+1 234 567 890" errMsg={errors?.phone?.message} />
                        </div>
                    </div>

                    {/* Health Report Upload */}
                    <div className="space-y-2">
                        <FormLabel htmlFor="healthReport" label="Patient Health Report (PDF/Image)" />
                        <div className="relative">
                            <FileInput
                                name="healthReport"
                                className="hidden"
                                id = "healthReport"
                                control={control}
                                errMsg={errors?.healthReport?.message}
                            />

                            <label
                                htmlFor="healthReport"
                                className={`flex flex-col items-center justify-center w-full p-8 border-2 border-dashed rounded-[2rem] transition-all cursor-pointer group ${errors.healthReport
                                        ? "border-rose-500 bg-rose-50/30"
                                        : "border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/30 hover:bg-slate-100 dark:hover:bg-slate-800"
                                    }`}
                            >
                                <div className="bg-white dark:bg-slate-700 p-3 rounded-xl shadow-sm mb-3 group-hover:scale-110 transition-transform">
                                    {/* Dynamically switch icons based on the watched file */}
                                    {healthReportFile ? (
                                        <FileText className="text-emerald-500" />
                                    ) : (
                                        <Upload className={errors.healthReport ? "text-rose-500" : "text-slate-400"} />
                                    )}
                                </div>

                                <span className="text-sm font-bold text-slate-700 dark:text-slate-200 text-center">
                                    {/* Display filename if exists, otherwise instructions */}
                                    {healthReportFile instanceof File
                                        ? healthReportFile.name
                                        : 'Click to upload report'}
                                </span>

                                <span className="text-xs text-slate-400 mt-1">Maximum file size: 5MB</span>

                                {/* Display validation error message inside the label area if you prefer */}
                                {errors.healthReport && (
                                    <span className="text-xs text-rose-500 mt-2 font-medium">
                                        {errors.healthReport.message}
                                    </span>
                                )}
                            </label>
                        </div>
                    </div>

                    {/* Warning/Info Box */}
                    <div className="p-4 bg-rose-50 dark:bg-rose-900/10 rounded-2xl flex gap-3 items-start border border-rose-100 dark:border-rose-900/20">
                        <AlertCircle className="text-rose-600 dark:text-rose-500 shrink-0 mt-0.5" size={18} />
                        <p className="text-xs text-rose-800 dark:text-rose-300 leading-relaxed font-medium">
                            By submitting, you agree to share this medical information with verified donors who accept your request. This helps donors understand the urgency and validity of the need.
                        </p>
                    </div>

                    {/* Submit Button */}
                    <button
                        type="submit"
                        disabled={isSubmitting || isLocating}
                        className="group w-full py-4 bg-rose-600 text-white rounded-2xl font-bold text-lg shadow-lg shadow-rose-200 dark:shadow-none hover:bg-rose-700 active:scale-[0.98] transition-all flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed"
                    >
                        {isLocating ? (
                            <>
                                <Loader2 className="w-5 h-5 animate-spin" />
                                Accessing Location...
                            </>
                        ) : isSubmitting ? (
                            <>
                                <Loader2 className="w-5 h-5 animate-spin" />
                                Broadcasting Request...
                            </>
                        ) : (
                            <>
                                Broadcast Request
                                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                            </>
                        )}
                    </button>
                </form>
            </div>
        </>
    )
}

export default BloodRequestForm;