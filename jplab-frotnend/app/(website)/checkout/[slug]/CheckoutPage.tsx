"use client";

import { useEffect, useRef, useState } from "react";
import { usePathname, useParams, useRouter } from "next/navigation";
import { toast } from "sonner";

// Stores & Utilities
import { useAgreementStore } from "@/stores/useAgreementStore";
import { useAuthStore } from "@/stores/useAuthStore";
import axiosInstance from "@/utils/axios";

// Components
import WebpageWrapper from "@/components/wrapper/WebpageWrapper";
import BreadCrumb from "@/components/BreadCrumb";
import HeadLine2 from "@/components/HeadLine2";

import Loader from "@/components/Loader";


interface Center {
  id: string | number;
  name: string;
}

interface FormState {
  center_id: string;
  booking_note: string;
}

interface ExamData {
  title: string;
  exam_date: string;
  start_time: string;
  end_time: string;
  fee: number | string;
}

export default function CheckoutPage() {
  // hooks
  const router = useRouter();
  const pathname = usePathname();
  const params = useParams();
  const slug = params.slug;
  const prevPath = useRef(pathname);

  // store
  const { isFormValid, resetAgreement } = useAgreementStore();
  const user = useAuthStore((state) => state.user);
  // state
  const [acceptedTerms, setAcceptedTerms] = useState(false);
  const [loading, setLoading] = useState(false);
  const [examData, setExamData] = useState<ExamData | null>(null);
  const [centerList, setCenterList] = useState<Center[]>([]);
  const [form, setForm] = useState<FormState>({
    center_id: "",
    booking_note: "",
  });

  const breadCrumbData = [
    { name: "Home", to: "/" },
    { name: "Checkout", to: `/checkout/${slug}` },
  ];

  useEffect(() => {
    return () => {
      if (prevPath.current?.startsWith("/checkout")) {
        resetAgreement();
      }
    };
  }, []);

  useEffect(() => {
    prevPath.current = pathname;
    if (!isFormValid) {
      router.push(`/registration_terms/${slug}`);
    }
  }, [pathname]);

  const getExamCenterList = async () => {
    setLoading(true)
    try {
      const res = await axiosInstance.get("/center/list");
      if (res.status === 200) {
        const centers = res.data?.data;
        setCenterList(centers);
        if (centers.length === 0) {
          toast.error("Exam center list is not available");
        }
      }
    } catch (error) {
      console.error(error);
      toast.error("There was an error while loading the list");
    }finally{
      setLoading(false)
    }
  };

  const getExamData = async () => {
    setLoading(true)
    try {
      const res = await axiosInstance.get(`exam/view/${slug}`);
      setExamData(res?.data?.data);
    } catch (error) {
      console.error(error);
    }finally{
      setLoading(false)
    }
  };

  useEffect(() => {
    getExamCenterList();
    getExamData();
    {
      console.log(user);
    }
  }, []);

  const postPlaceOrder = async () => {
    if (!form.center_id) {
      toast.error("Select a center");
      return;
    }
    if (!acceptedTerms) {
      toast.error("You must agree to the terms");
      return;
    }
    setLoading(true)
    try {
      const res = await axiosInstance.post(`/exam/booking/store/${slug}`, form);
      const data = res.data;
      if (data?.success && data?.data?.url) {
        toast.success(data.message || "Redirecting to payment...");
        window.location.href = data.data.url;
      } else {
        toast.error("Something went wrong. Please try again.");
      }
    } catch (error:any) {
      console.error(error);
       const message =
      error.response?.data?.message || "Something went wrong. Please try again.";
      toast.error(message);
    }finally{
      setLoading(false)
    }
  };

  const NumberVerifyModal = () => {
    return (
      <>
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 px-4">
          <div className="bg-white w-full max-w-md rounded-2xl shadow-2xl p-6 md:p-8 transition-all duration-300">
            <h2 className="text-xl md:text-2xl font-bold text-gray-800 mb-3">
              📱 Verify Your Phone Number
            </h2>
            <p className="text-sm text-gray-600 mb-2 leading-relaxed">
              For security and to proceed with your checkout, please verify your
              phone number. It only takes a moment.
            </p>

            {/* Display the user's phone number here */}
            <p className="text-sm text-gray-800 mb-6">
              Your phone number:{" "}
              <span className="text-blue-600">
                ********{user?.phone_number?.slice(-3)}
              </span>
            </p>

            <div className="flex justify-end space-x-3">
              <button
                onClick={() => router.push(`/registration_terms/${slug}`)}
                className="px-4 py-2 text-sm font-medium text-gray-600 bg-gray-100 rounded-lg hover:bg-gray-200 transition"
              >
                Cancel
              </button>
              <button
                onClick={() =>
                  router.push(
                    `/otp_verify?callbackUrl=${encodeURIComponent(
                      `/checkout/${slug}`
                    )}`
                  )
                }
                className="px-5 py-2 text-sm font-semibold text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition shadow-sm"
              >
                Verify Now
              </button>
            </div>
          </div>
        </div>
      </>
    );
  };

  return (
    <>
    {loading && <Loader/>}
    <WebpageWrapper>
      <div className="mt-5 pb-15">
        <BreadCrumb breadCrumbData={breadCrumbData} />
        <HeadLine2 mainText="Checkout" subText="" preText="" />
        <div className="mt-10">
          <div className="p-3 sm:p-5 md:p-8 bg-white rounded-2xl shadow-md drop-shadow-sm">
            <h1 className="text-lg md:text-2xl font-semibold mb-2">
              Exam information
            </h1>
            <table className="w-full border-separate border-spacing-0 rounded sm:rounded-xl overflow-hidden text-sm bg-white border border-gray-200">
              <thead>
                <tr className="bg-gradient-to-r from-blue-500 to-blue-700 text-white text-xs sm:text-base">
                  <th className="p-2 sm:p-5 text-left font-bold border-r border-gray-200">
                    Title
                  </th>
                  <th className="p-2 sm:p-5 text-left font-bold border-r border-gray-200">
                    Date
                  </th>
                  <th className="p-2 sm:p-5 text-left font-bold border-r border-gray-200 hidden sm:table-cell">
                    Time
                  </th>
                  <th className="p-2 sm:p-5 text-left font-bold border-r border-gray-200 hidden sm:table-cell">
                    Sub-total
                  </th>
                  <th className="p-2 sm:p-5 text-left font-bold border-r border-gray-200">
                    Total
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr className="bg-gray-50 text-xs sm:text-base font-semibold">
                  <td className="p-2 sm:p-5 text-gray-700 border-t border-r border-gray-200">
                    {examData?.title}
                  </td>
                  <td className="p-2 sm:p-5 text-gray-700 border-t border-r border-gray-200">
                    {examData?.exam_date}
                  </td>
                  <td className="p-2 sm:p-5 text-gray-700 border-t border-r border-gray-200 hidden sm:table-cell">
                    {examData?.start_time} - {examData?.end_time}
                  </td>
                  <td className="p-2 sm:p-5 text-gray-700 border-t border-r border-gray-200 hidden sm:table-cell">
                    {examData?.fee}
                  </td>
                  <td className="p-2 sm:p-5 text-gray-700 border-t border-r border-gray-200">
                    {examData?.fee}
                  </td>
                </tr>
              </tbody>
            </table>

            <div className="flex flex-col sm:flex-row gap-5 mt-10">
              <div className="sm:w-1/2">
                <h1 className="text-lg md:text-2xl font-semibold mb-2">
                  Select exam center
                </h1>
                <div className="space-y-2">
                  <p className="text-sm font-semibold text-red-600">
                    This field is required
                  </p>

                  <select
                    name="center_id"
                    value={form.center_id}
                    required
                    onChange={(e: React.ChangeEvent<HTMLSelectElement>) =>
                      setForm({ ...form, center_id: e.target.value })
                    }
                    className="w-full bg-white border border-gray-300 rounded-md text-gray-700 px-4 py-3 text-sm focus:outline-none"
                  >
                    <option value="" disabled>
                      Select Center
                    </option>
                    {centerList.map((center: Center) => (
                      <option key={center.id} value={center.id}>
                        {center.name}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
              <div className="sm:w-1/2">
                <h1 className="text-lg md:text-2xl font-semibold mb-2">
                  Additional information
                </h1>
                <div className="space-y-2">
                  <p className="text-sm font-semibold text-gray-400">
                    This field is optional
                  </p>
                  <textarea
                    name="booking_note"
                    value={form.booking_note}
                    onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) =>
                      setForm({ ...form, booking_note: e.target.value })
                    }
                    placeholder="Additional information you may want to add"
                    rows={1}
                    className="w-full bg-white border border-gray-300 rounded-md text-gray-500 px-4 py-3 text-sm focus:outline-none"
                  />
                </div>
              </div>
            </div>

            <div className="p-5 bg-gray-100 text-sm mt-5 rounded-md space-y-4">
              <p>
                Pay Online{" "}
                <span className="text-blue-600">
                  (Credit Card / Debit Card / MobileBanking / NetBanking /
                  bKash)
                </span>
              </p>
              <p className="p-2 bg-gray-300 rounded-md">
                Pay securely by Credit/Debit card, Internet banking or Mobile
                banking through SSLCommerz.
              </p>
              <hr />
              <p>
                Kaicom Group will send job, study, and cultural information
                about Japan and Bangladesh from time to time. Your personal data
                will be used to process your order and support your experience.
              </p>
              <label className="flex items-start gap-3 text-sm text-gray-700">
                <input
                  type="checkbox"
                  checked={acceptedTerms}
                  required
                  onChange={(e) => setAcceptedTerms(e.target.checked)}
                  className="mt-1 h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                />
                <span className="text-red-600 italic">
                  I have read and agree to the website terms and conditions
                </span>
              </label>
              <div className="flex justify-end">
                <button
                  onClick={postPlaceOrder}
                  // disabled={!acceptedTerms || !form.center_id}
                  className={`px-3 py-1.5 rounded  text-white text-sm font-semibold flex gap-2 items-center ${
                    acceptedTerms == true && form.center_id
                      ? "bg-blue-500 cursor-pointer"
                      : "bg-gray-500 cursor-not-allowed"
                  }`}
                >
                  Payment
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {user?.is_phone_verified != 1 && (
        <>
          <NumberVerifyModal />
        </>
      )}
    </WebpageWrapper>
    </>
  );
}
