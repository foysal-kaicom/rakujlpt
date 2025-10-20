"use client";

import { useState, useEffect, Suspense } from "react";

import BreadCrumb from "@/components/BreadCrumb";
import UserHeadline from "@/components/user/UserHeadline/UserHeadline";
import Loader from "@/components/Loader";
import { toast } from "sonner";
import axiosInstance from "@/utils/axios";
import BkashModal from "@/components/BkashModal";
import SuspenseLoader from "@/components/SuspenseLoader";

interface Exam {
  exam_title: string;
  exam_date: string;
  result: string;
  listening_score: string | null;
  reading_score: string | null;
  is_certificate_claimed: boolean;
  certificate_claimed_status: string | null;
}

interface FormData {
  booking_id: any;
  sender_number: string;
  trx_number: string;
}

export default function UserExamResult() {
  // console.log(recieverNumber , 'yo')
  const breadCrumbData = [
    { name: "Dashboard", to: "/dashboard" },
    { name: "Result & Certificate", to: "/exam_result" },
  ];

  const [resultData, setResultData] = useState<Exam[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState<FormData>({
    booking_id: null,
    sender_number: "",
    trx_number: "",
  });

  const getResultData = async () => {
    setLoading(true);
    try {
      const response = await axiosInstance.get("/booking/result-list");
      setResultData(response?.data?.data || []);
    } catch (error: any) {
      console.error(error);
      toast.error("Failed to get exam data");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getResultData();
  }, []);

  const onModal = (c: any) => {
    setFormData((prev) => ({
      ...prev,
      booking_id: c.id,
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
      toast.success(
        "Thank you for your certificate request. Very soon JPT Authority will contact with you. For more details, call 01847291886/01847291881"
      );
      console.log(response);
      getResultData();
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

  return (
    <>
      <Suspense fallback={<SuspenseLoader />}>
        {loading && <Loader />}
        <div className="min-h-[60vh]">
          <BreadCrumb breadCrumbData={breadCrumbData} />

          <div className="mt-5 lg:px-10 lg:pb-10">
            <UserHeadline mainText="Exam Result" preText="" subText="" />
            <div className="mt-6 rounded-xl">
              {/* TABLE for sm and up */}
              <div className="overflow-clip hidden md:block">
                <table className="w-full border border-gray-200 text-sm bg-white shadow rounded-xl overflow-hidden">
                  <thead>
                    <tr className="bg-gradient-to-r from-blue-500 to-blue-700 text-white text-xs sm:text-sm">
                      <th className="p-2 sm:p-3 text-left font-bold border-r border-gray-200">
                        Exam
                      </th>
                      <th className="p-2 sm:p-3 text-left font-bold border-r border-gray-200">
                        Date
                      </th>
                      <th className="p-2 sm:p-3 text-left font-bold border-r border-gray-200">
                        Result
                      </th>
                      <th className="p-2 sm:p-3 text-left font-bold border-gray-200">
                        Get Certificate
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {resultData.length > 0 ? (
                      resultData.map((c, i) => (
                        <tr key={i} className="bg-white text-xs sm:text-sm">
                          <td className="p-2 sm:p-3 font-semibold text-blue-500 border-t border-r border-gray-200 capitalize">
                            {c?.exam_title || "N/A"}
                          </td>
                          <td className="p-2 sm:p-3 text-gray-700 border-t border-r border-gray-200">
                            {c?.exam_date || "N/A"}
                          </td>
                          <td className="p-2 sm:p-3 text-gray-700 border-t border-r border-gray-200">
                            <div className="flex gap-2.5 items-center">
                              <p>
                                Listening :{" "}
                                <span className="font-semibold text-blue-500">
                                  {c?.listening_score
                                    ? c?.listening_score + " " + "Points"
                                    : "N/A"}
                                </span>
                              </p>
                              <p>
                                Reading :{" "}
                                <span className="font-semibold text-blue-500">
                                  {c?.reading_score
                                    ? c?.reading_score + " " + "Points"
                                    : "N/A"}
                                </span>
                              </p>
                              <p>
                                Total :{" "}
                                <span className="font-semibold text-blue-500">
                                  {c?.result
                                    ? c?.result + " " + "Points"
                                    : "N/A"}
                                </span>
                              </p>
                            </div>
                          </td>
                          <td className="p-2 sm:p-3 text-gray-700 border-t border-gray-200">
                            {c.is_certificate_claimed ? (
                              <span className="text-blue-500 font-semibold capitalize">
                                {c?.certificate_claimed_status}
                              </span>
                            ) : (
                              <button
                                className="text-sm px-5 py-1.5 rounded-2xl bg-blue-600 text-white font-semibold hover:bg-blue-600 duration-300"
                                onClick={() => onModal(c)}
                              >
                                Apply
                              </button>
                            )}
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td
                          colSpan={5}
                          className="text-center text-gray-500 py-6 border-t"
                        >
                          No result history found.
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>

              {/* CARD layout for mobile */}
              <div className="block md:hidden space-y-5">
                {resultData.length > 0 ? (
                  resultData.map((c, i) => (
                    <div
                      key={i}
                      className="bg-white shadow-md rounded-xl p-4 space-y-2"
                    >
                      <div>
                        <p className="text-xs text-gray-500 font-medium">
                          Title
                        </p>
                        <p className="font-semibold text-blue-700">
                          {c?.exam_title || "N/A"}
                        </p>
                      </div>
                      <div>
                        <p className="text-xs text-gray-500 font-medium">
                          Date
                        </p>
                        <p>{c?.exam_date || "N/A"}</p>
                      </div>
                      <div className="flex flex-wrap gap-x-5 gap-y-2">
                        <div>
                          <p className="text-xs text-gray-500 font-medium">
                            Listening
                          </p>
                          <p className="text-blue-700 font-semibold">
                            {c?.listening_score
                              ? c?.listening_score + " " + "Points"
                              : "N/A"}
                          </p>
                        </div>
                        <div>
                          <p className="text-xs text-gray-500 font-medium">
                            Reading
                          </p>
                          <p className="text-blue-700 font-semibold">
                            {c?.reading_score
                              ? c?.reading_score + " " + "Points"
                              : "N/A"}
                          </p>
                        </div>
                        <div>
                          <p className="text-xs text-gray-500 font-medium">
                            Total
                          </p>
                          <p className="text-blue-700 font-semibold">
                            {c?.result ? c?.result + " " + "Points" : "N/A"}
                          </p>
                        </div>
                      </div>
                      <div className="">
                        {c.is_certificate_claimed ? (
                          <div>
                            <p className="text-xs text-gray-500 font-medium">
                              Status
                            </p>
                            <p className="text-blue-700 font-semibold capitalize">
                              {c?.certificate_claimed_status}
                            </p>
                          </div>
                        ) : (
                          <button
                            className="text-sm px-5 py-1.5 rounded-2xl bg-blue-600 text-white font-semibold w-full"
                            onClick={() => onModal(c)}
                          >
                            Apply
                          </button>
                        )}
                      </div>
                    </div>
                  ))
                ) : (
                  <p className="text-center text-gray-500 py-6">
                    No result history found.
                  </p>
                )}
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
