import { useForm } from "react-hook-form";
import React, { useState } from 'react';
import { Mail, Lock, Eye, EyeOff, ArrowRight } from 'lucide-react';
import { useAuth } from "../../hooks/useAuth";
import * as z from "zod"
import { zodResolver } from "@hookform/resolvers/zod";
import { useNavigate } from "react-router";
import type { IUser } from "../../context/AuthContext";
import { toast } from "sonner";
import { FormLabel } from "../form/Label";
import { FormInput } from "../form/Input";

export interface ICredentials {
  email: string,
  password: string
}

export const CredentialsDTO = z.object({
  email: z.email().nonempty().nonoptional(),
  password: z.string().nonempty().nonoptional()
})

const LoginForm: React.FC = () => {
  const [showPassword, setShowPassword] = useState(false);

  const { loginUser} = useAuth();

  const { control, handleSubmit, formState: { isSubmitting, errors } } = useForm({
    defaultValues: {
      email: "",
      password: ""
    },
    resolver: zodResolver(CredentialsDTO)
  })

  const navigate = useNavigate();

  const submitHandler = async (data: ICredentials) => {
    try {
      await loginUser(data) as unknown as IUser;
      toast.success("Welcome Back", {
        description: "Logged in successfully"
      })

      navigate("/");

    } catch (exception) {
      console.log(exception)
      toast.error("Login failed", {
        description: "Please check your credentials and try again."
      })
    }
  }

  return (
    <>
      {/* Login Card */}
      <div className="bg-white dark:bg-slate-900 rounded-[2.5rem] p-8 md:p-10 shadow-xl shadow-slate-200/50 dark:shadow-none border border-slate-100 dark:border-slate-800 transition-all">
        <form className="space-y-6" onSubmit={handleSubmit(submitHandler)} >
          {/* Email Field */}
          <div className="space-y-2">
            <FormLabel htmlFor="email" label="Email Address" />
            <div className="relative group">
              <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-rose-500 transition-colors w-5 h-5" />
              <FormInput name={"email"} control={control} type="email" placeholder="name@example.com" errMsg={errors?.email?.message} />
            </div>
          </div>

          {/* Password Field */}
          <div className="space-y-2">
            <div className="flex justify-between items-center px-1">
              <FormLabel htmlFor="password" label="Password" />
              <a href="#" className="text-xs font-bold text-rose-600 dark:text-rose-400 hover:underline">
                Forgot?
              </a>
            </div>
            <div className="relative group">
              <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-rose-500 transition-colors w-5 h-5" />
              <FormInput name={"password"} control={control} type={showPassword ? "text" : "password"} placeholder="••••••••" errMsg={errors?.password?.message} />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 transition-colors"
              >
                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>
          </div>

          {/* Submit Button */}
          <div className="pt-2">
            <button
              type="submit"
              disabled={isSubmitting}
              className="group w-full py-4 bg-rose-600 text-white rounded-2xl font-bold text-lg shadow-lg shadow-rose-200 dark:shadow-none hover:bg-rose-700 active:scale-[0.98] transition-all flex items-center justify-center gap-2"
            >
              Sign In
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
        </form>
      </div>
    </>
  );
}

export default LoginForm;