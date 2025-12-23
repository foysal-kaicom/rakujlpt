"use client";

// React & Next.js core
import { Suspense, useState, useRef, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";

// Third-party libraries
import { toast } from "sonner";

// Icons
import { MdEmail, MdErrorOutline } from "react-icons/md";
import { MdVerifiedUser } from "react-icons/md";
import { FaLock, FaEye, FaEyeSlash } from "react-icons/fa";

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
  const router = useRouter();

  const [reseting, setReseting] = useState(false);
  const [otp, setOtp] = useState<string[]>(["", "", "", "", "", ""]);
  const [timer, setTimer] = useState<number>(180);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);
  const [error, setError] = useState<string>("");
  const [resetToat, setResetToast] = useState(false);
  const [formData, setFormData] = useState({
    identifier: "",
  });
  const [resetForm, setResetForm] = useState({
    password: "",
    password_confirmation: "",
  });

  useEffect(() => {
    if (timer <= 0) return;

    const interval = setInterval(() => {
      setTimer((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);

    return () => clearInterval(interval);
  }, [timer]);

  // Handle form input changes
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleResetChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setResetForm((prev) => ({ ...prev, [name]: value }));
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
        // Convert expiry time to seconds remaining
        const expiry = new Date(response.data.data.otp_expired_at).getTime();
        const now = Date.now();
        const remainingSeconds = Math.max(Math.floor((expiry - now) / 1000), 0);

        setTimer(remainingSeconds);
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
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/verify-password-reset-otp`,
        {
          identifier: formData.identifier,
          otp: fullCode,
          password: resetForm.password,
          password_confirmation: resetForm.password_confirmation,
        }
      );

      toast.success("Your Password is reset");
      router.push("/sign_in");
    } catch (error: any) {
      toast.error(error?.response?.data?.message || "Verification failed.");
    }
  };

  return (
    <Suspense fallback={<SuspenseLoader />}>
      <div className="bg-linear-to-br from-slate-200 via-blue-100 to-gray-200 pt-5 pb-15">
        <WebpageWrapper>
          <BreadCrumb breadCrumbData={breadCrumbData} />

          <div className="min-h-[60vh] flex flex-col gap-5 items-center justify-center mt-5">
            {resetToat ? (
              <div className="flex items-center justify-center">
                <div className="bg-white shadow-lg rounded-lg p-8 w-full max-w-md">
                  <div className="flex items-start gap-3 p-4 border-l-6 border-purple-500 bg-white w-full mb-2">
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
                    OTP Verification
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

                  {/* Password */}
                  <div className="relative group my-5 max-w-83 mx-auto">
                    <FaLock className="absolute top-3.5 left-3 text-yellow-400 group-focus-within:scale-110 transition-transform" />
                    <input
                      type={showPassword ? "text" : "password"}
                      name="password"
                      value={resetForm.password}
                      onChange={handleResetChange}
                      required
                      placeholder="Enter password"
                      className="w-full pl-10 pr-10 py-2.5 rounded-xl border-2 border-transparent bg-linear-to-r from-yellow-50 to-pink-50 focus:border-yellow-400 focus:ring-2 focus:ring-yellow-300 outline-none text-gray-700 transition-all duration-300"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword((prev) => !prev)}
                      className="absolute top-3 right-3 text-gray-500 hover:text-pink-600 transition-colors"
                    >
                      {showPassword ? <FaEyeSlash /> : <FaEye />}
                    </button>
                  </div>

                  {/* Confirm Password */}
                  <div className="relative group max-w-83 mx-auto">
                    <FaLock className="absolute top-3.5 left-3 text-green-400 group-focus-within:scale-110 transition-transform" />
                    <input
                      type={showConfirm ? "text" : "password"}
                      name="password_confirmation"
                      value={resetForm.password_confirmation}
                      onChange={handleResetChange}
                      required
                      placeholder="Confirm password"
                      className="w-full pl-10 pr-10 py-2.5 rounded-xl border-2 border-transparent bg-linear-to-r from-green-50 to-indigo-50 focus:border-green-400 focus:ring-2 focus:ring-green-300 outline-none text-gray-700 transition-all duration-300"
                    />
                    <button
                      type="button"
                      onClick={() => setShowConfirm((prev) => !prev)}
                      className="absolute top-3 right-3 text-gray-500 hover:text-green-600 transition-colors"
                    >
                      {showConfirm ? <FaEyeSlash /> : <FaEye />}
                    </button>
                  </div>

                  {/* Buttons */}
                  <div className="mt-6 space-y-3 font-semibold max-w-83 mx-auto">
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
              <div className="bg-white rounded-lg shadow-lg max-w-md w-full p-8 flex flex-col items-center">
                <div className="bg-linear-to-r from-pink-400 to-rose-400 rounded-3xl p-4 inline-block mb-4 shadow-lg transform -rotate-2">
                  <h2 className="text-lg lg:text-4xl font-bold text-white">
                    🔑 Reset Password
                  </h2>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6 w-full">
                  <div>
                    <label
                      htmlFor="identifier"
                      className="block text-gray-700 font-bold mb-3 text-lg"
                    >
                      📧 Email or Phone number
                    </label>
                    <div className="flex border-3 border-purple-300 rounded-2xl overflow-hidden shadow-lg bg-white transform hover:scale-105 transition-all duration-300 focus-within:border-purple-500 focus-within:shadow-xl">
                      <button
                        type="button"
                        className="px-4 flex items-center text-white bg-linear-to-br from-purple-400 to-indigo-500 hover:from-purple-500 hover:to-indigo-600 focus:outline-none transition-all duration-300"
                      >
                        <MdEmail className="size-6" />
                      </button>
                      <input
                        id="identifier"
                        name="identifier"
                        type="text"
                        value={formData.identifier}
                        onChange={handleChange}
                        required
                        placeholder="Enter registered email or phone"
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
                        ? "bg-linear-to-r from-gray-400 to-gray-500 cursor-not-allowed"
                        : "bg-linear-to-r from-indigo-500 via-purple-500 to-pink-500 hover:from-indigo-600 hover:via-purple-600 hover:to-pink-600 cursor-pointer"
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
                      <div className="absolute inset-0 bg-linear-to-r from-transparent via-white to-transparent opacity-0 group-hover:opacity-20 group-hover:translate-x-full transition-all duration-700 -skew-x-12"></div>
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
