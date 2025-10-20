"use client";
import { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import Image from "next/image";

import { ImCross } from "react-icons/im";
import WebpageWrapper from "@/components/wrapper/WebpageWrapper";
import BreadCrumb from "@/components/BreadCrumb";
import axiosInstance from "@/utils/axios";

export default function PaymentSuccessPage() {
  const router = useRouter();
  const params = useParams();
  const id = params.id;
  const [bookingDetails, setBookingDetails] = useState({
    total_payable: "",
  });
  const breadCrumbData = [
    { name: "Home", to: "/" },
    { name: "Payment failed", to: `/payment-failed/${id}` },
  ];

  useEffect(() => {
    const bookingData = async () => {
      try {
        const response = await axiosInstance.get(`booking/view/${id}`);
        const { total_payable } = response?.data?.data;
        console.log(response);
        setBookingDetails((prev) => ({
          total_payable,
        }));
      } catch (error) {
        console.log(error);
      }
    };
    bookingData();
  }, []);

  // Optional: Redirect after delay
  useEffect(() => {
    const timeout = setTimeout(() => {
      router.push("/"); 
      // router.back()
    }, 5000);

    return () => clearTimeout(timeout);
  }, [router]);

  return (
    <div className="min-h-[80vh] pt-5 bg-blue-50">
      <WebpageWrapper>
        <BreadCrumb breadCrumbData={breadCrumbData} />
        <div className="flex h-full justify-center items-center text-center gap-5 mt-10 pb-10 ">
          <div className="flex flex-col items-center justify-center gap-3 bg-white p-10 w-full sm:w-1/2 relative rounded-2xl shadow-md">
            <p className="p-4 rounded-full bg-red-600">
              <ImCross className="size-9 text-white" />
            </p>
            <h1 className="text-3xl md:text-4xl font-bold text-red-600 mb-2">
              Sorry !
            </h1>

            <p className="text-gray-500 text-sm md:text-base max-w-md">
              Your payment is failed
            </p>
            <p className="text-gray-500 text-sm md:text-base max-w-md pb-2 border-b border-dashed border-gray-400">
              Booking Number : {id}
            </p>
            {/* <div className="flex gap-3 justify-between items-center text-gray-500">
              <p>Amount Paid : </p>
              <p>{bookingDetails?.total_payable} TK</p>
            </div> */}

            <p className="text-sm text-gray-500">Redirecting to Home ...</p>

            <button
              onClick={() => router.push('/')}
              className="px-6 py-2 text-white bg-red-600 hover:bg-red-700 rounded-md transition text-sm cursor-pointer"
            >
              Go To Home
            </button>
            <p className="size-20 bg-blue-50 rounded-full absolute -left-10 top-1/2 -translate-y-1/2 z-10"></p>
            <p className="size-20 bg-blue-50 rounded-full absolute -right-10 top-1/2 -translate-y-1/2 z-10"></p>
          </div>
          {/* <Image
            src="/assets/img/payment3.png"
            height={1333}
            width={2000}
            alt=""
            className="w-1/2"
          /> */}
        </div>
      </WebpageWrapper>
    </div>
  );
}
