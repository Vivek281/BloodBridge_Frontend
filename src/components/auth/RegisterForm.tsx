import React, { useState } from 'react';
import { Mail, Lock, User, Phone, MapPin, ChevronDown, Eye, EyeOff, ArrowRight, Loader2 } from 'lucide-react';
import { FormLabel } from '../form/Label';
import { FormInput, FormSelect } from "../form/Input";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useAuth } from '../../hooks/useAuth';
import { useNavigate } from "react-router";
import { toast } from "sonner";

import { z } from "zod";

export interface IRegisterData {
  name: string;
  email: string;
  phone: string;
  password: string;
  confirmPassword: string;
  gender: string;
  bloodGroup: string; // Added
  address: string;    // Added
  latitude?: number;
  longitude?: number;
}

// Password: 1 small, 1 capital, 1 number, 1 special char, 8-25 chars
const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W@_-]).{8,25}$/;

// Nepal Mobile Number Regex
export const phoneRegex = /^(?:\+977[\s-]?|977[\s-]?)?(98|97|96|91)[\s-]?\d{2}[\s-]?\d{3}[\s-]?\d{3}$/;

export const RegisterDTO = z.object({
  name: z.string().min(1, "Name is required"),
  email: z.string().min(1, "Email is required").email("Invalid email format"),
  // Phone validation with Regex
  phone: z.string()
    .min(1, "Phone number is required")
    .regex(phoneRegex, "Enter a valid 10-digit Nepalese phone number"),
  password: z.string()
    .min(8, "Password must be at least 8 characters")
    .regex(passwordRegex, "Password must contain at least 1 lowercase, 1 uppercase, 1 number, 1 special character (8-25 characters)."),
  confirmPassword: z.string().min(1, "Please confirm your password"),
  gender: z.string().min(1, "Gender is required"),
  bloodGroup: z.string().min(1, "Blood group is required"),
  address: z.string().min(1, "Address is required").max(100, "Address too long"),
  latitude: z.number().optional(),
  longitude: z.number().optional(),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords do not match",
  path: ["confirmPassword"], // Sets the error to the confirmPassword field
});

// Register Form Component
const RegisterForm: React.FC = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [isLocating, setIsLocating] = useState(false);

  const { handleSubmit, control, formState: { errors, isSubmitting } } = useForm({
    defaultValues: {
      name: '',
      email: '',
      phone: '',
      bloodGroup: '',
      gender: '',
      address: '',
      password: '',
      confirmPassword: '',
      latitude: 0,
      longitude: 0,
    },
    resolver: zodResolver(RegisterDTO)
  });

  const { registerUser } = useAuth();
  const navigate = useNavigate();

  const getFriendlyErrorMessage = (error: any) => {
    const msg = error?.response?.data?.message || error?.message || "";

    // Duplicate Key Handling (E11000)
    if (msg.includes("E11000")) {
      if (msg.includes("email")) return "This email address is already in use.";
      if (msg.includes("phone")) return "This phone number is already registered.";
      return "An account with these details already exists.";
    }

    return msg || "Registration failed. Please try again.";
  };

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
          let msg = "Please enable location permissions to register.";
          if (error.code === error.PERMISSION_DENIED) msg = "Location permission denied.";
          if (error.code === error.TIMEOUT) msg = "Location request timed out.";
          reject(new Error(msg));
        },
        { enableHighAccuracy: true, timeout: 10000 }
      );
    });
  };
  const registerSubmit = async (data: IRegisterData) => {
    try {
      setIsLocating(true);
      toast.info("Requesting location access...");

      const coords = await getLocation();
      setIsLocating(false);

      const finalData: IRegisterData = {
        ...data,
        ...coords
      };

      await registerUser(finalData);
      toast.success("Account created successfully!");
      navigate("/verify-email", { state: { email: data.email } });
    } catch (err: any) {
      setIsLocating(false);
      const friendlyMessage = getFriendlyErrorMessage(err);
      toast.error(friendlyMessage);
    }
  };

  return (
    <>
      {/* Signup Card */}
      <div className="bg-white dark:bg-slate-900 rounded-[2.5rem] p-8 md:p-10 shadow-xl shadow-slate-200/50 dark:shadow-none border border-slate-100 dark:border-slate-800">
        <form onSubmit={handleSubmit(registerSubmit)} className="space-y-6">

          {/* Row 1: Name & Email */}
          <div className="grid md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <FormLabel htmlFor="name" label="Full Name" />
              <div className="relative group">
                <User className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-rose-500 transition-colors w-5 h-5" />
                <FormInput name={"name"} control={control} type="text" className='py-3.5' placeholder="John Doe" errMsg={errors?.name?.message} />
              </div>
            </div>
            <div className="space-y-2">
              <FormLabel htmlFor="email" label="Email Address" />
              <div className="relative group">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-rose-500 transition-colors w-5 h-5" />
                <FormInput name={"email"} control={control} type="email" className='py-3.5' placeholder="john@example.com" errMsg={errors?.email?.message} />
              </div>
            </div>
          </div>

          {/* Row 2: Phone & Blood Group */}
          <div className="grid md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <FormLabel htmlFor="phone" label="Phone Number" />
              <div className="relative group">
                <Phone className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-rose-500 transition-colors w-5 h-5" />
                <FormInput name={"phone"} control={control} type="text" className='py-3.5' placeholder="+1 234 567 890" errMsg={errors?.phone?.message} />
              </div>
            </div>
            <div className="space-y-2">
              <FormLabel htmlFor="bloodGroup" label="Blood Group" />
              <div className="relative group">
                <FormSelect name="bloodGroup" control={control} errMsg={errors?.bloodGroup?.message}
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
          </div>

          {/* Row 3: Gender & Address */}
          <div className="grid md:grid-cols-3 gap-6">
            <div className="space-y-2">
              <FormLabel htmlFor="gender" label="Gender" />
              <div className="relative group">
                <FormSelect name="gender" control={control} errMsg={errors?.gender?.message}
                  options={[
                    { label: "Male", value: "male" },
                    { label: "Female", value: "female" },
                    { label: "Other", value: "other" },
                  ]} />
                <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none w-5 h-5" />
              </div>
            </div>
            <div className="md:col-span-2 space-y-2">
              <FormLabel htmlFor="address" label="Address" />
              <div className="relative group">
                <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-rose-500 transition-colors w-5 h-5" />
                <FormInput name={"address"} control={control} type={"text"} placeholder="City, Street Name" errMsg={errors?.address?.message} />
              </div>
            </div>
          </div>

          {/* Row 4: Password & Confirm Password */}
          <div className="grid md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <FormLabel htmlFor="password" label="Password" />
              <div className="relative group">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-rose-500 transition-colors w-5 h-5" />
                <FormInput name={"password"} control={control} type={showPassword ? "text" : "password"} placeholder="••••••••" errMsg={errors?.password?.message} />
                <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200">
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>
            <div className="space-y-2">
              <FormLabel htmlFor="confirmPassword" label="Confirm Password" />
              <div className="relative group">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-rose-500 transition-colors w-5 h-5" />
                <FormInput name={"confirmPassword"} control={control} type={showPassword ? "text" : "password"} placeholder="••••••••" errMsg={errors?.confirmPassword?.message} />
              </div>
            </div>
          </div>

          {/* Submit */}
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
                Creating Account...
              </>
            ) : (
              <>
                Create Account
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </>
            )}
          </button>
        </form>
      </div>
    </>
  );
}

export default RegisterForm;