"use client";
import { useParams } from "next/navigation";
import { Suspense, useEffect, useState } from "react";
import Image from "next/image";
import { toast } from "sonner";
import axiosInstance from "@/utils/axios";

// Components
import BreadCrumb from "@/components/BreadCrumb";
import BkashModal from "@/components/BkashModal";
import Loader from "@/components/Loader";

// Icons
import { MdDateRange } from "react-icons/md";
import { IoMdCloseCircle } from "react-icons/io";
import { FaCheckCircle, FaDotCircle } from "react-icons/fa";
import { FaLocationDot } from "react-icons/fa6";

// Store
import { useAuthStore } from "@/stores/useAuthStore";
import SuspenseLoader from "@/components/SuspenseLoader";

interface BookingData {
  id: number;
  exam_title: string;
  center: string;
  center_address: string;
  exam_date: string;
  exam_day: string;
  exam_time: string;
  exam_end_time: string;
  paid_amount: string;
  payment_status: string;
  booking_status: string;
  progress_step: number;
  created_at: string;
  admit_card_file: string | null;
  is_certificate_claimed:boolean;
  certificate_claimed_status:string
}

interface FormData {
  booking_id: any;
  sender_number: string;
  trx_number: string;
}

const stages = [
  { label: "Registration" },
  { label: "Booking" },
  { label: "Payment" },
  { label: "Admit" },
  { label: "Result" },
];

export default function BookingDetails() {
  const params = useParams();
  const id = params.id;
  const { user } = useAuthStore();

  const [loading, setLoading] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [bookingDetails, setBookingDetails] = useState<BookingData | null>(
    null
  );
  const [formData, setFormData] = useState<FormData>({
    booking_id: id,
    sender_number: "",
    trx_number: "",
  });
  const [step, setStep] = useState(0);

  const breadCrumbData = [
    { name: "Dashboard", to: "/dashboard" },
    { name: "Exam Booking", to: "/exam_history" },
    { name: "Booking Details", to: `/booking_details/${id}` },
  ];

  const onModal = () => {
    setFormData((prev) => ({
      ...prev,
      booking_id: id,
    }));
    setIsModalOpen(true);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const response = await axiosInstance.post(
        "/booking/certificate-claim",
        formData
      );
      toast.success("Thank you for your certificate request. Very soon JPT Authority will contact with you. For more details, call 01847291886/01847291881");
      console.log(response);
    } catch (error: any) {
      console.error(error);
      const message =
        error.response?.data?.message ||
        "Something went wrong. Please try again.";
      toast.error(message);
    }
    setIsModalOpen(false);
    console.log("Form Submitted:", formData);
  };

  const getBookingDetails = async () => {
    setLoading(true);
    try {
      const response = await axiosInstance.get(`booking/view/${id}`);
      toast.success("Booking Details showed");
      setBookingDetails(response?.data?.data);
      setStep(response?.data?.data?.progress_step);
    } catch (error: any) {
      toast.error(
        error?.response?.data?.message || "Booking Details failed to load"
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getBookingDetails();
  }, [id]);

  // Date parsing and formatting
  const examDateStr = bookingDetails?.exam_date || "";
  const dateObj = new Date(examDateStr);
  const dayAbbr = !isNaN(dateObj.getTime())
    ? dateObj.toLocaleDateString("en-US", { weekday: "short" }).toUpperCase()
    : "";
  const dayOfMonth = !isNaN(dateObj.getTime()) ? dateObj.getDate() : "";
  const monthName = !isNaN(dateObj.getTime())
    ? dateObj.toLocaleDateString("en-US", { month: "long" })
    : "";

  return (
    <>
      <Suspense fallback={<SuspenseLoader />}>
        {loading && <Loader />}
        <div className="min-h-[60vh]">
          <BreadCrumb breadCrumbData={breadCrumbData} />
          <div className="mt-5 max-w-5xl mx-auto drop-shadow-sm border border-gray-100 rounded-2xl overflow-clip bg-white">
            <div className="bg-blue-50/50 p-5 sm:p-10 space-y-3">
              <p className="p-3 rounded-full bg-blue-400 size-14 mx-auto">
                <MdDateRange className="size-8 text-white" />
              </p>
              <p className="text-center font-semibold sm:text-lg md:text-xl">
                Exam Booking Progress
              </p>
              <div className="mt-5">
                <div className="grid grid-cols-3 gap-3 sm:gap-0 sm:flex justify-center w-full max-w-7xl mx-auto">
                  {stages.map((s, i) => (
                    <div
                      key={i}
                      className="flex flex-col items-center sm:items-start sm:w-1/5"
                    >
                      <div className="flex items-center sm:w-full">
                        <div
                          className={`rounded-full  ${
                            step >= i + 1
                              ? bookingDetails?.payment_status === "failed"
                                ? "bg-red-400"
                                : "bg-blue-400"
                              : "bg-gray-300"
                          }`}
                        >
                          {step >= i + 1 ? (
                            bookingDetails?.payment_status === "failed" ? (
                              <IoMdCloseCircle className="size-6 text-white" />
                            ) : (
                              <FaCheckCircle className="size-6 text-white" />
                            )
                          ) : (
                            <FaDotCircle className="size-6 text-white" />
                          )}
                        </div>

                        <div
                          className={`hidden sm:block sm:flex-grow h-1 ${
                            step >= i + 1
                              ? bookingDetails?.payment_status === "failed"
                                ? "bg-red-400"
                                : "bg-blue-400"
                              : "bg-gray-400"
                          }`}
                        ></div>
                      </div>
                      <span className="mt-2 text-xs">{s.label}</span>
                    </div>
                  ))}
                  <div className="flex flex-col items-center sm:items-start">
                    <div
                      className={`size-6 rounded-full  ${
                        step == 6 ? "bg-blue-400" : "bg-gray-300"
                      }`}
                    >
                      {step == 6 ? (
                        <FaCheckCircle className="size-6 text-white" />
                      ) : (
                        <FaDotCircle className="size-6 text-white" />
                      )}
                    </div>
                    <span className="mt-2 text-xs">Certificate</span>
                  </div>
                </div>
              </div>
            </div>
            <div className="px-5 md:px-10 pb-5">
              <div className="pb-2 my-5 border-b border-gray-200 flex flex-col sm:flex-row gap-2 justify-between">
                <p className="text-lg font-semibold">
                  {bookingDetails?.exam_title}
                </p>
                <p>
                  <span className="font-semibold">Booking Id: </span>
                  {id}
                </p>
              </div>
              <div className="flex flex-col lg:flex-row justify-between gap-10 mt-5">
                <div className="lg:w-[calc(100%-240px)] space-y-5">
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-5">
                    <div className="border border-gray-200 rounded-md flex flex-col items-center justify-center">
                      <p className="bg-blue-500 text-white px-5 py-1.5 text-center w-full rounded-t-md">
                        {dayAbbr || "N/A"}
                      </p>
                      <p className="text-3xl mt-3 font-semibold">
                        {dayOfMonth || "N/A"}
                      </p>
                      <p className="mb-3 text-sm text-gray-700">
                        {monthName || "N/A"}
                      </p>
                    </div>

                    <div className="border border-gray-200 rounded-md flex flex-col items-center justify-center py-4 capitalize">
                      <p className="text-lg">
                        {bookingDetails?.exam_time || "N/A"}
                      </p>
                      <p className="text-lg">to</p>
                      <p className="text-lg">
                        {bookingDetails?.exam_end_time || "N/A"}
                      </p>
                    </div>
                    <div className="flex w-full col-span-2 items-start gap-3 p-4 border border-gray-200 rounded-md bg-blue-50/50">
                      <FaLocationDot className="text-red-500 text-xl mt-1 size-5" />
                      <div className="w-[calc(100%-24px)]">
                        <p className="font-semibold text-gray-800 line-clamp-2">
                          Center Name: {bookingDetails?.center}
                        </p>
                        <p className="text-gray-600 text-sm leading-snug line-clamp-3">
                          Address: {bookingDetails?.center_address}
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="">
                    {/* Table for larger screens */}
                    <table className="hidden md:table w-full bg-white border border-gray-200">
                      <thead className="bg-blue-500 text-white text-left">
                        <tr>
                          <th className="px-4 py-2">Date</th>
                          <th className="px-4 py-2">Status</th>
                          <th className="px-4 py-2">Payment</th>
                          <th className="px-4 py-2">Amount</th>
                        </tr>
                      </thead>
                      <tbody className="text-sm">
                        <tr className="border-b border-gray-200">
                          <td className="px-4 py-2">
                            {bookingDetails?.created_at}
                          </td>
                          <td className="px-4 py-2 text-blue-600 capitalize">
                            {bookingDetails?.booking_status}
                          </td>
                          <td className="px-4 py-3 text-yellow-600 capitalize">
                            {bookingDetails?.payment_status}
                          </td>
                          <td className="px-4 py-3 font-medium">
                            {bookingDetails?.paid_amount}
                          </td>
                        </tr>
                        <tr className="border-b border-gray-200">
                          <td className="px-4 py-2"></td>
                          <td className="px-4 py-2"></td>
                          <td className="px-4 py-3 text-gray-600 capitalize">
                            Amount Paid
                          </td>
                          <td className="px-4 py-3 font-medium">
                            {bookingDetails?.paid_amount}
                          </td>
                        </tr>
                      </tbody>
                    </table>

                    {/* Card view for mobile */}
                    <div className="grid grid-cols-2 gap-2 md:hidden border border-gray-200 rounded-lg p-4 bg-white shadow-sm">
                      <p className="text-sm text-gray-500">Date</p>
                      <p className="font-medium">
                        {bookingDetails?.created_at}
                      </p>

                      <p className="text-sm text-gray-500">Status</p>
                      <p className="font-medium text-blue-600 capitalize">
                        {bookingDetails?.payment_status}
                      </p>

                      <p className="text-sm text-gray-500">Payment</p>
                      <p className="font-medium text-yellow-600 capitalize">
                        {bookingDetails?.booking_status}
                      </p>

                      <p className="text-sm text-gray-500">Amount</p>
                      <p className="font-medium">
                        {bookingDetails?.paid_amount}
                      </p>

                      <p className="text-sm text-gray-500">Paid Amount</p>
                      <p className="font-medium">
                        {bookingDetails?.paid_amount}
                      </p>
                    </div>
                  </div>
                </div>
                <div className="lg:w-[200px]">
                  <div className="size-[200px] object-cover aspect-auto overflow-clip mx-auto hidden lg:block">
                    {user?.photo && (
                      <Image
                        src={user.photo}
                        alt=""
                        height={200}
                        width={200}
                        className="size-[200px] object-cover aspect-square"
                      />
                    )}
                  </div>
                  {step < 5 ? (
                    bookingDetails?.admit_card_file ? (
                      <a
                        href={bookingDetails.admit_card_file}
                        download={bookingDetails.admit_card_file}
                        target="_blank"
                        className="text-sm bg-blue-600 text-white px-5 py-2 rounded lg:mt-3 w-full inline-block text-center"
                      >
                        Download Admit
                      </a>
                    ) : (
                      <p className="text-sm bg-gray-500 text-white text-center px-5 py-2 rounded lg:mt-3 w-full cursor-not-allowed">
                        Download Admit
                      </p>
                    )
                  ) : (
                    <button
                      onClick={onModal}
                      disabled={bookingDetails?.is_certificate_claimed}
                      className={`text-sm bg-blue-600 text-white px-5 py-2 rounded lg:mt-3 w-full capitalize ${bookingDetails?.is_certificate_claimed ? "cursor-not-allowed" : "cursor-pointer"}`}
                    >
                      {bookingDetails?.is_certificate_claimed ? `Certificate Approve : ${bookingDetails?.certificate_claimed_status}` : 'Claim Certificate'}
                    </button>
                    
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>

        {isModalOpen && (
          <BkashModal
            handleChange={handleChange}
            handleSubmit={handleSubmit}
            setIsModalOpen={setIsModalOpen}
            formData={formData}
          />
        )}
      </Suspense>
    </>
  );
}
