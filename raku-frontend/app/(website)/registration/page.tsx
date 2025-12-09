"use client";

import { useState, FormEvent, ChangeEvent } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

import { MdEmail } from "react-icons/md";
import { FaUser, FaLock, FaEye, FaEyeSlash, FaPhone } from "react-icons/fa";

import axios from "axios";
import { toast } from "sonner";
import { googleLoginUtils } from "@/utils/googleLoginUtils";

import Loader from "@/components/Loader";

interface FormData {
  first_name: string;
  last_name: string;
  email: string;
  phone_number: string;
  password: string;
  password_confirmation: string;
}

export default function SignUpPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [loading, setLoading] = useState(false);
  const [method, setMethod] = useState<"email" | "phone">("email");
  const [formData, setFormData] = useState<FormData>({
    first_name: "",
    last_name: "",
    email: "",
    phone_number: "",
    password: "",
    password_confirmation: "",
  });

  const router = useRouter();

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (formData.password !== formData.password_confirmation) {
      toast.error("Passwords do not match!");
      return;
    }
    // console.log("Form submitted:", formData);
    try {
      setLoading(true);
      const payload = {
        first_name: formData.first_name,
        last_name: formData.last_name,
        password: formData.password,
        password_confirmation: formData.password_confirmation,
        ...(method === "email"
          ? { email: formData.email }
          : { phone_number: formData.phone_number }),
      };
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/candidate/register`,
        payload
      );
      router.push("/sign_in");
      toast.success(response.data.message || "Sign up completed");
    } catch (error: any) {
      toast.error(
        error?.response?.data?.message || error.message || "Sign up failed"
      );
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleLogin = async () => {
    try {
      setLoading(true);
      await googleLoginUtils();
    } catch (error) {
      console.error("Google login failed:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {loading && <Loader />}
      <div className="min-h-screen flex items-center justify-center bg-white px-4">
        <div className="w-full max-w-md relative p-[2px] rounded-3xl bg-gradient-to-r from-pink-200 to-indigo-200 shadow-[0_0_40px_rgba(255,255,255,0.3)]">
          <div className="bg-white backdrop-blur-xl rounded-3xl p-8">
            {/* Header */}
            <div className="text-center mb-8">
              <h2 className="text-4xl font-extrabold bg-gradient-to-r from-pink-500 via-purple-600 to-indigo-600 bg-clip-text text-transparent">
                Create Your Account
              </h2>
            </div>

            <form className="space-y-5" onSubmit={handleSubmit}>
              {/* Name Fields */}
              <div className="grid grid-cols-2 gap-3">
                <div className="relative group">
                  <FaUser className="absolute top-3.5 left-3 text-pink-400 group-focus-within:scale-110 transition-transform" />
                  <input
                    type="text"
                    name="first_name"
                    value={formData.first_name}
                    onChange={handleChange}
                    required
                    placeholder="First name"
                    className="w-full pl-10 pr-3 py-2.5 rounded-xl border-2 border-transparent bg-gradient-to-r from-pink-50 to-purple-50 focus:border-pink-400 focus:ring-2 focus:ring-pink-300 outline-none text-gray-700 transition-all duration-300"
                  />
                </div>
                <div className="relative group">
                  <FaUser className="absolute top-3.5 left-3 text-purple-400 group-focus-within:scale-110 transition-transform" />
                  <input
                    type="text"
                    name="last_name"
                    value={formData.last_name}
                    onChange={handleChange}
                    required
                    placeholder="Last name"
                    className="w-full pl-10 pr-3 py-2.5 rounded-xl border-2 border-transparent bg-gradient-to-r from-purple-50 to-indigo-50 focus:border-purple-400 focus:ring-2 focus:ring-purple-300 outline-none text-gray-700 transition-all duration-300"
                  />
                </div>
              </div>

              <div className="flex gap-5 mb-5">
                <label
                  className={`flex items-center gap-2 px-4 py-2 border rounded-xl cursor-pointer transition-all ${
                    method === "email"
                      ? "border-pink-500 bg-pink-50 text-pink-600"
                      : "border-gray-300 hover:border-gray-400 text-gray-600"
                  }`}
                >
                  <input
                    type="radio"
                    name="contactMethod"
                    value="email"
                    checked={method === "email"}
                    onChange={() => setMethod("email")}
                    className="hidden"
                  />
                  <div
                    className={`w-4 h-4 rounded-full border-2 flex items-center justify-center ${
                      method === "email" ? "border-pink-500" : "border-gray-400"
                    }`}
                  >
                    {method === "email" && (
                      <div className="w-2.5 h-2.5 bg-pink-500 rounded-full"></div>
                    )}
                  </div>
                  <span className="text-sm font-medium">Email</span>
                </label>

                <label
                  className={`flex items-center gap-2 px-4 py-2 border rounded-xl cursor-pointer transition-all ${
                    method === "phone"
                      ? "border-pink-500 bg-pink-50 text-pink-600"
                      : "border-gray-300 hover:border-gray-400 text-gray-600"
                  }`}
                >
                  <input
                    type="radio"
                    name="contactMethod"
                    value="phone"
                    checked={method === "phone"}
                    onChange={() => setMethod("phone")}
                    className="hidden"
                  />
                  <div
                    className={`w-4 h-4 rounded-full border-2 flex items-center justify-center ${
                      method === "phone" ? "border-pink-500" : "border-gray-400"
                    }`}
                  >
                    {method === "phone" && (
                      <div className="w-2.5 h-2.5 bg-pink-500 rounded-full"></div>
                    )}
                  </div>
                  <span className="text-sm font-medium">Phone</span>
                </label>
              </div>

              {/* Input Field */}
              {method === "email" ? (
                <div className="relative group">
                  <MdEmail className="absolute top-3.5 left-3 text-pink-400 group-focus-within:scale-110 transition-transform" />
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    placeholder="you@example.com"
                    className="w-full pl-10 pr-3 py-2.5 rounded-xl border-2 border-transparent bg-gradient-to-r from-pink-50 to-rose-50 focus:border-pink-400 focus:ring-2 focus:ring-pink-200 outline-none text-gray-700 transition-all duration-300"
                  />
                </div>
              ) : (
                <div className="relative group">
                  <FaPhone className="absolute top-3.5 left-3 text-pink-400 group-focus-within:scale-110 transition-transform rotate-90" />
                  <input
                    type="tel"
                    name="phone_number"
                    value={formData.phone_number}
                    onChange={(e) => {
                      let value = e.target.value.replace(/\D/g, "");
                      if (value.length > 11) value = value.slice(0, 11);
                      setFormData((prev) => ({ ...prev, phone_number: value }));
                    }}
                    required
                    pattern="[0-9]{11}"
                    placeholder="01xxxxxxxxx"
                    className="w-full pl-10 pr-3 py-2.5 rounded-xl border-2 border-transparent bg-gradient-to-r from-pink-50 to-rose-50 focus:border-pink-400 focus:ring-2 focus:ring-pink-200 outline-none text-gray-700 transition-all duration-300"
                  />
                </div>
              )}

              {/* Password */}
              <div className="relative group">
                <FaLock className="absolute top-3.5 left-3 text-yellow-400 group-focus-within:scale-110 transition-transform" />
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  required
                  placeholder="Enter password"
                  className="w-full pl-10 pr-10 py-2.5 rounded-xl border-2 border-transparent bg-gradient-to-r from-yellow-50 to-pink-50 focus:border-yellow-400 focus:ring-2 focus:ring-yellow-300 outline-none text-gray-700 transition-all duration-300"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((prev) => !prev)}
                  className="absolute top-3 right-3 text-gray-500 hover:text-pink-600 transition-colors cursor-pointer"
                >
                  {showPassword ? <FaEyeSlash /> : <FaEye />}
                </button>
              </div>

              {/* Confirm Password */}
              <div className="relative group">
                <FaLock className="absolute top-3.5 left-3 text-green-400 group-focus-within:scale-110 transition-transform" />
                <input
                  type={showConfirm ? "text" : "password"}
                  name="password_confirmation"
                  value={formData.password_confirmation}
                  onChange={handleChange}
                  required
                  placeholder="Confirm password"
                  className="w-full pl-10 pr-10 py-2.5 rounded-xl border-2 border-transparent bg-gradient-to-r from-green-50 to-indigo-50 focus:border-green-400 focus:ring-2 focus:ring-green-300 outline-none text-gray-700 transition-all duration-300"
                />
                <button
                  type="button"
                  onClick={() => setShowConfirm((prev) => !prev)}
                  className="absolute top-3 right-3 text-gray-500 hover:text-green-600 transition-colors cursor-pointer"
                >
                  {showConfirm ? <FaEyeSlash /> : <FaEye />}
                </button>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                className="w-full bg-gradient-to-r from-pink-500  to-indigo-500 hover:from-pink-600 hover:to-indigo-600 text-white font-extrabold rounded-full py-3 shadow-lg hover:shadow-[0_0_25px_rgba(255,105,180,0.4)] transition-all duration-300 active:scale-95 cursor-pointer"
              >
                Sign Up ✨
              </button>

              {/* Divider */}
              <div className="relative flex items-center justify-center my-5">
                <div className="w-full h-px bg-gradient-to-r from-pink-300 via-yellow-300 to-indigo-300"></div>
                <span className="absolute bg-white px-3 text-gray-600 text-sm">
                  or
                </span>
              </div>

              {/* Google Sign Up */}
              <button
                type="button"
                onClick={() => handleGoogleLogin()}
                className="w-full flex items-center justify-center gap-3 bg-white border border-pink-300 hover:bg-pink-50 text-gray-700 font-semibold rounded-full py-2.5 transition-all duration-300 shadow-[0_0_10px_rgba(255,105,180,0.3)] hover:shadow-[0_0_20px_rgba(255,105,180,0.4)] cursor-pointer"
              >
                <img
                  src="https://www.svgrepo.com/show/475656/google-color.svg"
                  alt="Google"
                  className="w-5 h-5"
                />
                <span>Sign up with Google</span>
              </button>
            </form>

            {/* Footer */}
            <p className="text-center text-sm text-gray-600 mt-6">
              Already have an account?{" "}
              <Link
                href="/sign_in"
                className="text-pink-600 hover:underline font-semibold"
              >
                Sign In
              </Link>
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
