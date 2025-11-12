"use client";

// React & Next.js core
import { Suspense, useState, useRef } from "react";
import { useRouter, useSearchParams } from "next/navigation";

// Third-party libraries
import { toast } from "sonner";

// Icons
import { FaPhone } from "react-icons/fa";
import { MdEmail, MdErrorOutline } from "react-icons/md";
import { MdVerifiedUser } from "react-icons/md";

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
  const [method, setMethod] = useState("email");
  const [otp, setOtp] = useState<string[]>(["", "", "", "", "", ""]);
  const [timer, setTimer] = useState<number>(180);
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);
 const [error, setError] = useState<string>("");
  const [resetToat, setResetToast] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    phone_number: "",
  });

  // Handle form input changes
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Handle reset submission
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setReseting(true);
    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/send-password-reset-otp`,
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

  const handleOTPChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    index: number
  ) => {
    const value = e.target.value.replace(/\D/g, "").slice(0, 1);
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    if (value && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (
    e: React.KeyboardEvent<HTMLInputElement>,
    index: number
  ) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      const newOtp = [...otp];
      newOtp[index - 1] = "";
      setOtp(newOtp);
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handlePaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
    e.preventDefault();

    const pasted = e.clipboardData
      .getData("Text")
      .replace(/\D/g, "")
      .slice(0, 6);
    if (!pasted) return;

    const newOtp = [...otp];
    for (let i = 0; i < pasted.length; i++) {
      newOtp[i] = pasted[i];
    }

    setOtp(newOtp);

    // Focus next input after paste
    const nextIndex = Math.min(pasted.length, 5);
    inputRefs.current[nextIndex]?.focus();
  };

  // Format timer
  const formatTime = (seconds: number) => {
    const m = String(Math.floor(seconds / 60)).padStart(2, "0");
    const s = String(seconds % 60).padStart(2, "0");
    return `${m}:${s}`;
  };


   const handleVerify = async () => {

    const fullCode = otp.join("");
    if (fullCode.length !== 6) {
      setError("Please enter all 6 digits.");
      return;
    }

    try {
      const response = await axios.post(`${process.env.NEXT_PUBLIC_API_BASE_URL}/verify-password-reset-otp`,
        {
          otp: fullCode,
        }
      );

      toast.success("Phone number verified successfully!");
      router.push("/profile");
    } catch (error: any) {
      toast.error(error?.response?.data?.message || "Verification failed.");
    }
  };

  return (
    <Suspense fallback={<SuspenseLoader />}>
      <div className="bg-gradient-to-br from-slate-200 via-blue-100 to-gray-200 pt-5 pb-15">
        <WebpageWrapper>
          <BreadCrumb breadCrumbData={breadCrumbData} />

          <div className="min-h-[60vh] flex flex-col gap-5 items-center justify-center mt-5">
            {resetToat ? (
              <div className="flex items-center justify-center">
                <div className="bg-white shadow-lg rounded-lg p-8 w-full max-w-md">
                  <div className="flex items-start gap-3 p-4 border-l-6 border-blue-500 bg-white w-full mb-2">
                    <MdErrorOutline className="size-[30px] text-purple-700" />
                    <div className="text-sm text-purple-700 w-[calc(100%-30px)]">
                      <p className="font-semibold">Email Sent Successful!</p>
                      <p>
                        You will receive an OTP shortly to your registred email
                        or phone number. Please use the OTP to reset your
                        password.
                      </p>
                    </div>
                  </div>
                  <MdVerifiedUser className="size-20 text-purple-600 mx-auto rounded-full p-2 border-2" />
                  <h1 className="text-center text-2xl font-semibold mt-3">
                    Phone Number Verification
                  </h1>
                  <p className="text-center text-gray-500 mb-2">
                    Enter the 6-digit verification code
                  </p>

                  {/* OTP Inputs */}
                  <div className="flex gap-2 justify-center mt-5">
                    {otp.map((digit, index) => (
                      <input
                        key={index}
                        type="text"
                        inputMode="numeric"
                        maxLength={1}
                        value={digit}
                        ref={(el) => {
                          if (el) inputRefs.current[index] = el;
                        }}
                        onChange={(e) => handleOTPChange(e, index)}
                        onKeyDown={(e) => handleKeyDown(e, index)}
                        onPaste={(e) => handlePaste(e)}
                        className="w-12 h-12 text-center text-xl border border-gray-300 rounded focus:outline-none focus:ring-2 focus:purple-blue-500"
                      />
                    ))}
                  </div>

                  {error && (
                    <p className="text-center text-red-500 mt-3">{error}</p>
                  )}

                  {/* Buttons */}
                  <div className="mt-6 space-y-3 font-semibold">
                    <button
                      onClick={handleVerify}
                      className="px-5 py-2 w-full rounded-md bg-purple-600 text-white hover:bg-purple-700 duration-500 cursor-pointer"
                    >
                      Verify Code
                    </button>

                    <button
                      // onClick={handleCode}
                      disabled={timer > 0}
                      className={`px-5 py-2 w-full rounded-md duration-300 ${
                        timer > 0
                          ? "bg-gray-200 text-gray-400 cursor-not-allowed"
                          : "bg-white text-gray-700 hover:bg-gray-100 shadow-sm"
                      }`}
                    >
                      {timer > 0
                        ? `Resend in ${formatTime(timer)}`
                        : "Resend Code"}
                    </button>
                  </div>
                </div>
              </div>
            ) : (
              <div className="bg-white rounded-lg shadow-lg max-w-md w-full p-8">
                <div className="bg-gradient-to-r from-pink-400 to-rose-400 rounded-3xl p-4 inline-block mb-4 shadow-lg transform -rotate-2">
                  <h2 className="text-4xl font-bold text-white">
                    🔑 Reset Password
                  </h2>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="flex gap-5 my-5">
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
                          method === "email"
                            ? "border-pink-500"
                            : "border-gray-400"
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
                          method === "phone"
                            ? "border-pink-500"
                            : "border-gray-400"
                        }`}
                      >
                        {method === "phone" && (
                          <div className="w-2.5 h-2.5 bg-pink-500 rounded-full"></div>
                        )}
                      </div>
                      <span className="text-sm font-medium">Phone</span>
                    </label>
                  </div>
                  {method === "email" ? (
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
                  ) : (
                    <div>
                      <label
                        htmlFor="phone_number"
                        className="block text-gray-700 font-bold mb-3 text-lg"
                      >
                        📧 Phone Number
                      </label>
                      <div className="flex border-3 border-purple-300 rounded-2xl overflow-hidden shadow-lg bg-white transform hover:scale-105 transition-all duration-300 focus-within:border-purple-500 focus-within:shadow-xl">
                        <button
                          type="button"
                          className="px-4 flex items-center text-white bg-gradient-to-br from-purple-400 to-indigo-500 hover:from-purple-500 hover:to-indigo-600 focus:outline-none transition-all duration-300"
                        >
                          <FaPhone className="size-6" />
                        </button>
                        <input
                          id="phone_number"
                          name="phone_number"
                          type="tel"
                          value={formData.phone_number}
                          onChange={handleChange}
                          required
                          placeholder="017xxxxxxxx"
                          className="w-full px-4 py-3 focus:outline-none text-gray-700 font-medium"
                        />
                      </div>
                    </div>
                  )}

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
