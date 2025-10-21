"use client";

// React and Next.js
import { useState, useEffect, useRef } from "react";
import { useRouter, useSearchParams } from "next/navigation";

// Utilities
import axiosInstance from "@/utils/axios";
import { toast } from "sonner";

// Zustand Store
import { useAuthStore } from "@/stores/useAuthStore";

// Components
import BreadCrumb from "@/components/BreadCrumb";
import WebpageWrapper from "@/components/wrapper/WebpageWrapper";
import Loader from "@/components/Loader";

// Icons
import { MdVerifiedUser } from "react-icons/md";

export default function PhoneVerificationPage() {
  // React and Next.js Hooks
  const [loading, setLoading] = useState(false);
  const [otp, setOtp] = useState<string[]>(["", "", "", "", "", ""]);
  const [timer, setTimer] = useState<number>(180);
  const [error, setError] = useState<string>("");
  const [hasRequestedCode, setHasRequestedCode] = useState<boolean>(false);
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  // Zustand Store
  const updateUser = useAuthStore((state) => state.updateUser);
  const user = useAuthStore((state) => state.user);

  // Next.js Navigation
  const router = useRouter();
  const searchParams = useSearchParams();

  // Breadcrumb Data
  const breadCrumbData = [
    { name: "Home", to: "/" },
    { name: "Registration", to: "/registration" },
  ];

  // Format timer
  const formatTime = (seconds: number) => {
    const m = String(Math.floor(seconds / 60)).padStart(2, "0");
    const s = String(seconds % 60).padStart(2, "0");
    return `${m}:${s}`;
  };

  // Timer countdown
  useEffect(() => {
    if (timer <= 0) return;

    const interval = setInterval(() => {
      setTimer((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);

    return () => clearInterval(interval);
  }, [timer]);

  // Auto-send OTP if not verified
  useEffect(() => {
    if (user?.is_email_verified === 1 && user?.is_phone_verified === 1) {
      const callbackUrl = decodeURIComponent(
        searchParams.get("callbackUrl") || "/"
      );
      router.push(callbackUrl);
      return;
    }

    if (!hasRequestedCode) {
      handleCode();
      setHasRequestedCode(true);
    }
  }, [user]);

  const handleChange = (
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

  const handleCode = async () => {
    try {
      const response = await axiosInstance.get("/candidate/verify-phone");

      if (response.status === 200) {
        toast.success("OTP sent successfully");

        // Convert expiry time to seconds remaining
        const expiry = new Date(response.data.data.otp_expired_at).getTime();
        const now = Date.now();
        const remainingSeconds = Math.max(Math.floor((expiry - now) / 1000), 0);

        setTimer(remainingSeconds);
      }
    } catch (error: any) {
      const errorMessage =
        error?.response?.data?.message || "Verification failed. Try again.";
      toast.error(errorMessage);
      const expiry = new Date(
        error?.response.data.errors.otp_expired_at
      ).getTime();
      const now = Date.now();
      const remainingSeconds = Math.max(Math.floor((expiry - now) / 1000), 0);

      setTimer(remainingSeconds);
    }
  };

  const handleVerify = async () => {
    const fullCode = otp.join("");
    if (fullCode.length !== 6) {
      setError("Please enter all 6 digits.");
      return;
    }

    try {
      const response = await axiosInstance.post(
        "/candidate/post-verify-phone",
        {
          otp: fullCode,
        }
      );

      updateUser({
        is_phone_verified: 1,
        is_email_verified: 1,
      });

      toast.success("Phone number verified successfully!");
      router.push("/profile");
    } catch (error: any) {
      toast.error(error?.response?.data?.message || "Verification failed.");
    }
  };

  return (
    <div className="bg-blue-50 pt-5">
      <WebpageWrapper>
        <BreadCrumb breadCrumbData={breadCrumbData} />
        <div className="min-h-[70vh] flex items-center justify-center">
          <div className="bg-white shadow-lg rounded-lg p-8 w-full max-w-md">
            <MdVerifiedUser className="size-20 text-blue-600 mx-auto rounded-full p-2 border-2" />
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
                  onChange={(e) => handleChange(e, index)}
                  onKeyDown={(e) => handleKeyDown(e, index)}
                  onPaste={(e) => handlePaste(e)}
                  className="w-12 h-12 text-center text-xl border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              ))}
            </div>

            {error && <p className="text-center text-red-500 mt-3">{error}</p>}

            {/* Buttons */}
            <div className="mt-6 space-y-3 font-semibold">
              <button
                onClick={handleVerify}
                className="px-5 py-2 w-full rounded-md bg-blue-600 text-white hover:bg-blue-700 duration-500"
              >
                Verify Code
              </button>

              <button
                onClick={handleCode}
                disabled={timer > 0}
                className={`px-5 py-2 w-full rounded-md duration-300 ${
                  timer > 0
                    ? "bg-gray-200 text-gray-400 cursor-not-allowed"
                    : "bg-white text-gray-700 hover:bg-gray-100 shadow-sm"
                }`}
              >
                {timer > 0 ? `Resend in ${formatTime(timer)}` : "Resend Code"}
              </button>
            </div>
          </div>
        </div>
      </WebpageWrapper>
    </div>
  );
}
