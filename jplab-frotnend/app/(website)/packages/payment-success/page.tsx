"use client";
import { useEffect, useRef, useState } from "react";
import { useRouter, useParams, usePathname } from "next/navigation";
import Image from "next/image";

import { SiTicktick } from "react-icons/si";
import WebpageWrapper from "@/components/wrapper/WebpageWrapper";
import BreadCrumb from "@/components/BreadCrumb";

export default function PaymentSuccessPage() {
  const router = useRouter();
  const [subscription_id, setSubscriptionId] = useState<string>("");
  const [tran_id, setTranId] = useState<string>("");
  const [amount, setAmount] = useState<string>("");

  useEffect(() => {
    if (typeof window !== "undefined") {
      const searchParams = new URLSearchParams(window.location.search);
      setSubscriptionId(searchParams.get("subscription_id") || "");
      setTranId(searchParams.get("tran_id") || "");
      setAmount(searchParams.get("amount") || "");
    }
  }, []);

  const breadCrumbData = [
    { name: "Home", to: "/" },
    { name: "Payment Success", to: `/payment-success/${subscription_id}` },
  ];


  useEffect(() => {
    const timeout = setTimeout(() => {
      // router.push("/dashboard");
     router.push(`/`)
    }, 6000);

    return () => clearTimeout(timeout);
  }, [router]);

  return (
    <div className="min-h-[80vh] pt-5 bg-blue-50 relative">
      <div className="relative z-10">
        <WebpageWrapper>
          <BreadCrumb breadCrumbData={breadCrumbData} />
          <div className="flex h-full justify-center items-center text-center gap-5 mt-10">
            <div className="flex flex-col items-center justify-center gap-3 bg-white p-10 w-full sm:w-1/2 relative rounded-2xl shadow-md">
              <p className="p-4 rounded-full bg-green-600">
                <SiTicktick className="size-9 text-white" />
              </p>
              <h1 className="text-3xl md:text-4xl font-bold text-green-600 mb-2">
                Subscription Successful!
              </h1>

              <p className="text-gray-500 text-sm md:text-base max-w-md pb-2 border-b border-dashed border-gray-400">
                Subscription ID : {subscription_id}
              </p>
              <p className="text-gray-500 text-sm md:text-base max-w-md pb-2 border-b border-dashed border-gray-400">
                Transaction ID : {tran_id}
              </p>
              <div className="flex gap-3 justify-between items-center text-gray-500">
                <p>Amount Paid : </p>
                <p>{amount} TK</p>
              </div>

              <button
                onClick={() => router.push(`/mock_test_select`)}
                className="px-6 py-2 text-white bg-green-600 hover:bg-green-700 rounded-md transition text-sm cursor-pointer"
              >
                Go to Mock Tests
              </button>
              
            </div>
            
          </div>
        </WebpageWrapper>
      </div>

      <Image
        src="/assets/img/confetti.gif"
        alt=""
        height={2000}
        width={2000}
        className="absolute top-0 size-full"
      />
    </div>
  );
}
