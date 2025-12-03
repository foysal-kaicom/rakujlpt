"use client";

import { FaCertificate } from "react-icons/fa";
import { QRCodeSVG } from "qrcode.react";
import { useParams } from "next/navigation";
import WebpageWrapper from "@/components/wrapper/WebpageWrapper";
import BreadCrumb from "@/components/BreadCrumb";
import axios from "axios";
import { useEffect, useState } from "react";
import { toast } from "sonner";

interface Details {
  name: string;
  examName: string;
  score: string;
  totalPoint: string;
  date: string;
  verifyUrl: string;
}

export default function Certificate() {
  const params = useParams();
  const certificateId = params?.id;
  const [certificateDetails, setCertificateDetails] = useState<Details>({
    name: "",
    examName: "",
    score: "",
    totalPoint: "",
    date: "",
    verifyUrl: "",
  });
  const [loading, setLoading] = useState(true);

  const breadCrumbData = [
    { name: "Home", to: "/" },
    { name: "Certificate", to: `/certificate/${certificateId}` },
  ];

  const getCertificateDetails = async () => {
    try {
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/verify-certificate`,
        {
          params: { mockTest_id: certificateId },
        }
      );

      setCertificateDetails(response?.data?.data || []);
    } catch (error: any) {
      console.error(error);
      toast.error("Failed to get subscription data");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getCertificateDetails();
  }, [certificateId]);

  return (
    <div className="min-h-[70vh] bg-[#f5f3ff] py-5 pb-10">
      <WebpageWrapper>
        <BreadCrumb breadCrumbData={breadCrumbData} />

        {loading ? (
          <div className="text-xl sm:text-2xl font-bold text-[#4c1d95] mb-3 font-merriweather text-center h-[70vh] flex justify-center items-center">
            Certificate is getting ready Please wait !!
          </div>
        ) : certificateDetails.name == "" ? (
          <div className="text-xl sm:text-2xl font-bold text-[#4c1d95] mb-3 font-merriweather text-center h-[70vh] flex justify-center items-center">
            No Certificate Found !!
          </div>
        ) : (
          <div className="relative bg-white border-2 border-[#e0d7ff] p-6 sm:p-10 font-roboto flex flex-col justify-center items-center rounded-2xl shadow mt-10 mx-auto w-full max-w-[842px] h-auto sm:h-[595px]">
            {/* Watermark Text */}
            {/* <div className="absolute inset-0 flex justify-center items-center pointer-events-none">
              <div className="-rotate-30 text-[50px] sm:text-[100px] font-bold font-merriweather text-purple-700/5 whitespace-nowrap">
                RAKU JLPT
              </div>
            </div> */}

            {/* Violet Border */}
            <div className="absolute inset-[5px] sm:inset-[10px] border-[2px] sm:border-[3px] border-purple-600 rounded-2xl pointer-events-none"></div>

            {/* Center Watermark Icon */}
            <div className="absolute inset-0 flex justify-center items-center opacity-5 pointer-events-none">
              <FaCertificate className="text-[150px] sm:text-[280px] text-purple-600" />
            </div>

            {/* Header */}
            <div className="text-center relative z-10 px-2">
              <h1 className="text-3xl md:text-5xl font-extrabold bg-gradient-to-r from-purple-600 via-violet-600 to-pink-600 text-transparent bg-clip-text mb-3 font-merriweather italic">
                Certificate of Achievement
              </h1>
              <p className="text-md sm:text-lg text-gray-500 italic">
                This certificate is proudly presented to
              </p>
            </div>

            {/* Student Name */}
            <div className="text-center relative z-10 leading-tight px-2 my-3">
              <h2 className="text-2xl md:text-4xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 text-transparent bg-clip-text font-merriweather">
                {certificateDetails?.name}
              </h2>
            </div>

            {/* Exam Info */}
            <div className="text-center relative z-10 text-gray-700 text-base md:text-lg mb-5 leading-6 space-y-1 px-2">
              <p>
                For completing the{" "}
                <span className="font-semibold">
                  {certificateDetails?.examName}
                </span>
              </p>
              <p>
                Score:{" "}
                <span className="font-semibold">
                  {certificateDetails?.score} / {certificateDetails?.totalPoint}
                </span>
              </p>
              <p className="text-gray-600 text-sm md:text-base">
                {certificateDetails?.date}
              </p>
            </div>

            <div className="flex md:hidden flex-col items-center">
              <QRCodeSVG
                value={certificateDetails?.verifyUrl || ""}
                size={60}
                fgColor="#7c3aed"
                bgColor="#ffffff"
                level="H"
              />
              <p className="mt-2 text-gray-500 text-xs text-center">
                Scan to Verify
              </p>
            </div>

            {/* QR & Signatures */}
            <div className="grid grid-cols-2 md:grid-cols-3 items-center relative z-10 md:px-20 w-full gap-10 md:gap-0">
              {/* Instructor */}
              <div className="text-center">
                <p className="border-b-2 border-[#d1c4ff] md:w-40 mx-auto pb-1">
                  <img src="/assets/sign/instructor.png" alt="instructor" className="h-6 md:h-9 mx-auto"/>
                </p>
                <p className="mt-0 italic text-[#4b2db2] font-medium">
                  Instructor
                </p>
              </div>

              {/* QR Code */}
              <div className="hidden md:flex flex-col items-center">
                <QRCodeSVG
                  value={`https://example.com/certificate/${certificateId}`}
                  size={60}
                  fgColor="#7c3aed"
                  bgColor="#ffffff"
                  level="H"
                />
                <p className="mt-2 text-gray-500 text-sm text-center">
                  Scan to Verify
                </p>
              </div>

              {/* Administrator */}
              <div className="text-center">
                <p className="border-b-2 border-[#d1c4ff] md:w-40 mx-auto pb-1">
                  <img src="/assets/sign/instructor.png" alt="instructor" className="h-6 md:h-9 mx-auto"/>
                </p>
                <p className="mt-0 italic text-[#4b2db2] font-medium">
                  Administrator
                </p>
              </div>
            </div>

            {/* Disclaimer (optional)
        <div className="text-center relative z-10 mt-3">
          <p className="text-sm text-gray-500 italic leading-5">
            This certificate is generated by RAKU JLPT. Any alteration to this certificate is prohibited.
          </p>
        </div>
        */}
          </div>
        )}
      </WebpageWrapper>
    </div>
  );
}
