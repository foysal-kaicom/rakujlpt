"use client";

// React & Next.js core
import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";

// Third-party libraries
import { toast } from "sonner";

// Icons
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { MdEmail, MdErrorOutline } from "react-icons/md";

// Stores
import { useAuthStore } from "@/stores/useAuthStore";

// Utilities
import axiosInstance from "@/utils/axios";

// Components
import BreadCrumb from "@/components/BreadCrumb";
import WebpageWrapper from "@/components/wrapper/WebpageWrapper";
import Loader from "@/components/Loader";

export default function LoginPage() {
  // Breadcrumb data
  const breadCrumbData = [
    { name: "Home", to: "/" },
    { name: "Sign In", to: "/sign_in" },
  ];

  // Hooks
  const searchParams = useSearchParams();
  const registered = searchParams.get("registered") === "true";
  const callbackUrl = decodeURIComponent(
    searchParams.get("callbackUrl") || "/dashboard"
  );
  const router = useRouter();
  const login = useAuthStore((state) => state.login);

  // Local state
  const { isAuthenticated, token, user } = useAuthStore();
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  // Handle form input changes
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Handle login submission
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await axiosInstance.post("/login", formData);

      if (response.status === 200) {
        toast.success(response?.data?.message || "Login successful");

        const { token, data } = response.data;

        const user = {
          id: data.id,
          first_name: data.first_name,
          email: data.email,
          is_phone_verified: data.is_phone_verified,
          is_email_verified: data.is_email_verified,
          phone_number: data.phone_number,
          photo: data.photo,
        };

        login(user, token);
        router.push(callbackUrl);
      }
    } catch (error: any) {
      toast.error(
        error?.response?.data?.message || error.message || "Login failed"
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(()=>{
     router.push("/dashboard")
  },[isAuthenticated && token && user])

  return (
    <>
      {loading && <Loader />}
      <div className="bg-gradient-to-br from-slate-200 via-blue-100 pt-5 pb-15 min-h-screen relative overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute top-20 left-10 w-40 h-40 bg-yellow-300 rounded-full opacity-20 blur-3xl animate-pulse"></div>
      <div className="absolute bottom-40 right-20 w-56 h-56 bg-blue-300 rounded-full opacity-20 blur-3xl animate-pulse"></div>
      <div className="absolute top-1/2 left-1/4 w-32 h-32 bg-pink-300 rounded-full opacity-20 blur-2xl"></div>
      <div className="absolute bottom-20 left-1/3 w-48 h-48 bg-green-300 rounded-full opacity-15 blur-3xl"></div>
      
      <WebpageWrapper>
        <div className="backdrop-blur-sm bg-white/10 rounded-2xl p-3 inline-block">
          <BreadCrumb breadCrumbData={breadCrumbData} />
        </div>

        <div className="min-h-[60vh] flex flex-col gap-5 items-center justify-center mt-5">
          {registered && (
            <div className="flex items-start gap-3 p-5 border-l-8 border-blue-400 bg-white/95 backdrop-blur-md rounded-3xl shadow-2xl max-w-md w-full transform hover:scale-105 transition-all duration-300 border-4 border-white/50">
              <div className="bg-blue-100 rounded-full p-2">
                <MdErrorOutline className="size-[30px] text-blue-700" />
              </div>
              <div className="text-sm text-blue-700 w-[calc(100%-46px)]">
                <p className="font-bold text-lg mb-1">🎉 Registration Successful!</p>
                <p className="leading-relaxed">
                  You will receive an email shortly with your login
                  credentials. Please use the provided email and password to
                  sign in.
                </p>
              </div>
            </div>
          )}

          <div className="bg-white/95 backdrop-blur-md rounded-3xl shadow-2xl max-w-md w-full p-8 border-4 border-white/50 transform hover:scale-105 transition-all duration-300">
            {/* Header */}
            <div className="text-center mb-8">
              <div className="bg-gradient-to-r from-yellow-400 to-orange-400 rounded-3xl p-4 inline-block mb-4 shadow-lg transform -rotate-2">
                <h2 className="text-4xl font-bold text-white">
                  👋 Welcome
                </h2>
              </div>
              <p className="text-gray-600 mt-3 font-medium">Sign in to continue your journey!</p>
            </div>

            <form className="space-y-6" onSubmit={handleSubmit}>
              {/* Email */}
              <div>
                <label
                  htmlFor="email"
                  className="block text-gray-700 font-bold mb-3 text-lg"
                >
                  📧 Email address
                </label>
                <div className="flex border-3 border-purple-300 rounded-2xl overflow-hidden shadow-lg bg-white transform hover:scale-105 transition-all duration-300 focus-within:border-purple-500 focus-within:shadow-xl">
                  <button
                    type="button"
                    className="px-4 flex items-center text-white bg-gradient-to-br from-purple-400 to-indigo-500 hover:from-purple-500 hover:to-indigo-600 focus:outline-none transition-all duration-300"
                  >
                    <MdEmail className="size-6" />
                  </button>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    placeholder="you@example.com"
                    className="w-full px-4 py-3 focus:outline-none text-gray-700 font-medium"
                  />
                </div>
              </div>

              {/* Password */}
              <div>
                <label
                  htmlFor="password"
                  className="block text-gray-700 font-bold mb-3 text-lg"
                >
                  🔒 Password
                </label>
                <div className="flex border-3 border-pink-300 rounded-2xl overflow-hidden shadow-lg bg-white transform hover:scale-105 transition-all duration-300 focus-within:border-pink-500 focus-within:shadow-xl">
                  <button
                    type="button"
                    onClick={() => setShowPassword((show) => !show)}
                    className="px-4 flex items-center text-white bg-gradient-to-br from-pink-400 to-rose-500 hover:from-pink-500 hover:to-rose-600 focus:outline-none transition-all duration-300"
                    aria-label={showPassword ? "Hide password" : "Show password"}
                  >
                    {showPassword ? <FaEye className="size-6" /> : <FaEyeSlash className="size-6" />}
                  </button>
                  <input
                    id="password"
                    name="password"
                    type={showPassword ? "text" : "password"}
                    value={formData.password}
                    onChange={handleChange}
                    required
                    placeholder="Enter your password"
                    className="w-full px-4 py-3 focus:outline-none text-gray-700 font-medium"
                  />
                </div>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                // onClick={handleSubmit}
                className="w-full bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 hover:from-indigo-600 hover:via-purple-600 hover:to-pink-600 text-white font-bold rounded-2xl py-4 transition-all duration-300 shadow-xl transform hover:scale-105 hover:-rotate-1 text-lg border-4 border-white/50"
              >
                ✨ Sign In ✨
              </button>
            </form>

            {/* Footer Links */}
            <div className="mt-8 space-y-3">
              <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-2xl p-4 text-center border-2 border-purple-200 transform hover:scale-105 transition-all duration-300">
                <p className="text-gray-700 text-sm font-medium">
                  Don't have an account?{" "}
                  <Link
                    href="/registration"
                    className="text-indigo-600 hover:text-indigo-800 font-bold hover:underline"
                  >
                    🚀 Sign up
                  </Link>
                </p>
              </div>
              <div className="bg-gradient-to-r from-pink-50 to-rose-50 rounded-2xl p-4 text-center border-2 border-pink-200 transform hover:scale-105 transition-all duration-300">
                <p className="text-gray-700 text-sm font-medium">
                  Don't remember password?{" "}
                  <Link
                    href="/password-reset"
                    className="text-pink-600 hover:text-pink-800 font-bold hover:underline"
                  >
                    🔑 Forget Password
                  </Link>
                </p>
              </div>
            </div>
          </div>
          
        </div>
      </WebpageWrapper>
    </div>
    </>
  );
}
