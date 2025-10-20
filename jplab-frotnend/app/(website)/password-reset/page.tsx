"use client";

// React & Next.js core
import { Suspense, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";

// Third-party libraries
import { toast } from "sonner";

// Icons
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { MdEmail, MdErrorOutline } from "react-icons/md";

import axios from "axios";

// Components
import BreadCrumb from "@/components/BreadCrumb";
import WebpageWrapper from "@/components/wrapper/WebpageWrapper";
import SuspenseLoader from "@/components/SuspenseLoader";

export default function LoginPage() {
  // Breadcrumb data
  const breadCrumbData = [
    { name: "Home", to: "/" },
    { name: "Password Reset", to: "password-reset" },
  ];

  // Hooks
  const searchParams = useSearchParams();
  const token = searchParams.get("token");
  const router = useRouter();

  const [reseting, setReseting] = useState(false);

  const [resetToat, setResetToast] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
  });
  const [resetFormData, setRestFormData] = useState({
    password: "",
    password_confirmation: "",
    token: token || null,
  });

  // Handle form input changes
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleResetChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setRestFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Handle reset submission
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setReseting(true);
    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/password-reset-link`,
        formData
      );
      if (response.status === 200) {
        toast.success(
          response?.data?.message || "Reset link has been sent to your mail"
        );
        setResetToast(true);
      }
    } catch (error: any) {
      toast.error(
        error?.response?.data?.message || error.message || "Reset failed"
      );
    } finally {
      setReseting(false);
    }
  };

  const handleResetSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setReseting(true);
    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/password-reset`,
        resetFormData
      );
      if (response.status === 200) {
        toast.success(response?.data?.message || "Password Reset successfully");
        router.push("/sign_in");
      }
    } catch (error: any) {
      toast.error(
        error?.response?.data?.message || error.message || "Reset failed"
      );
      router.push("/password-reset");
    } finally {
      setReseting(false);
    }
  };

  return (
    <Suspense fallback={<SuspenseLoader />}>
      <div className="bg-gradient-to-br from-slate-200 via-blue-100 to-gray-200 pt-5 pb-15">
        <WebpageWrapper>
          <BreadCrumb breadCrumbData={breadCrumbData} />

          <div className="min-h-[60vh] flex flex-col gap-5 items-center justify-center mt-5">
            {resetToat && (
              <div className="flex items-start gap-3 p-4 border-l-6 border-blue-500 bg-white rounded-lg shadow-sm max-w-md w-full">
                <MdErrorOutline className="size-[30px] text-blue-700" />
                <div className="text-sm text-blue-700 w-[calc(100%-30px)]">
                  <p className="font-semibold">Email Sent Successful!</p>
                  <p>
                    You will receive an email shortly with your reset link.
                    Please use the link to reset your password.
                  </p>
                </div>
              </div>
            )}

            {token ? (
              <div className="bg-white rounded-lg shadow-lg max-w-md w-full p-8">
                <h2 className="text-3xl font-semibold primary-text-color mb-6 text-center">
                  Reset Password ?
                </h2>

                <form onSubmit={handleResetSubmit} className="space-y-6">
                  {/* password */}
                  <div>
                    <label
                      htmlFor="password"
                      className="block text-gray-500 font-medium mb-2"
                    >
                      New Password
                    </label>
                    <div className="flex border border-gray-300 rounded-md">
                      <button className="px-3 flex items-center text-gray-600 hover:text-indigo-600 focus:outline-none bg-blue-100">
                        <FaEye />
                      </button>
                      <input
                        id="password"
                        name="password"
                        type="text"
                        value={resetFormData.password}
                        onChange={handleResetChange}
                        required
                        placeholder="New Password"
                        className="w-full px-4 py-2 focus:outline-none"
                      />
                    </div>
                  </div>
                  {/* confirm password */}
                  <div>
                    <label
                      htmlFor="password_confirmation"
                      className="block text-gray-500 font-medium mb-2"
                    >
                      Confirm Password
                    </label>
                    <div className="flex border border-gray-300 rounded-md">
                      <button className="px-3 flex items-center text-gray-600 hover:text-indigo-600 focus:outline-none bg-blue-100">
                        <FaEye />
                      </button>
                      <input
                        id="password_confirmation"
                        name="password_confirmation"
                        type="text"
                        value={resetFormData.password_confirmation}
                        onChange={handleResetChange}
                        required
                        placeholder="Confirm Password"
                        className="w-full px-4 py-2 focus:outline-none"
                      />
                    </div>
                  </div>
                  {/* Submit */}
                  <button
                    type="submit"
                    className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-semibold rounded-md py-2 transition"
                  >
                    {reseting ? "Reseting ..." : "Reset"}
                  </button>
                </form>
              </div>
            ) : (
              <div className="bg-white rounded-lg shadow-lg max-w-md w-full p-8">
                <div className="bg-gradient-to-r from-pink-400 to-rose-400 rounded-3xl p-4 inline-block mb-4 shadow-lg transform -rotate-2">
                  <h2 className="text-4xl font-bold text-white">
                    🔑 Reset Password
                  </h2>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">
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

                  {/* Submit Button */}
                  <button
                    type="submit"
                    disabled={reseting}
                    className={`w-full ${
                      reseting
                        ? "bg-gradient-to-r from-gray-400 to-gray-500 cursor-not-allowed"
                        : "bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 hover:from-indigo-600 hover:via-purple-600 hover:to-pink-600"
                    } text-white font-bold rounded-2xl py-4 transition-all duration-300 shadow-xl transform hover:scale-105 hover:-rotate-1 text-lg border-4 border-white/50 relative overflow-hidden group`}
                  >
                    {reseting ? (
                      <span className="flex items-center justify-center gap-2">
                        <svg
                          className="animate-spin h-5 w-5 text-white"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                        >
                          <circle
                            className="opacity-25"
                            cx="12"
                            cy="12"
                            r="10"
                            stroke="currentColor"
                            strokeWidth="4"
                          ></circle>
                          <path
                            className="opacity-75"
                            fill="currentColor"
                            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                          ></path>
                        </svg>
                        ⏳ Reseting...
                      </span>
                    ) : (
                      <span className="flex items-center justify-center gap-2">
                        ✨ Reset ✨
                      </span>
                    )}
                    {!reseting && (
                      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent opacity-0 group-hover:opacity-20 group-hover:translate-x-full transition-all duration-700 -skew-x-12"></div>
                    )}
                  </button>
                </form>
              </div>
            )}
          </div>
        </WebpageWrapper>
      </div>
    </Suspense>
  );
}
