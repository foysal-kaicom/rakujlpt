"use client";

import { FaCertificate } from "react-icons/fa";
import { QRCodeSVG } from "qrcode.react";
import { useParams } from "next/navigation";

// interface CertificateProps {
//   studentName: string;
//   testName: string;
//   score: number;
//   totalScore: number;
//   date: string;
// }

export default function Certificate() {
  const params = useParams(); // Get route params
  const certificateId = params?.id; // Assuming your route is /certificate/[id]

  return (
    <div className="min-h-screen flex justify-center items-center bg-gray-100 p-6">
      <div className="w-full max-w-5xl rounded-3xl shadow-xl bg-[url('/assets/logo/logo.png')] bg-repeat bg-top-left bg-cover">
        <div className="relative w-full bg-gradient-to-r from-white/95 via-gray-50/95 to-white/95 border-[12px] border-pink-300 rounded-3xl p-12">
          {/* Decorative Top Line */}
          <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-2/3 h-1 bg-gradient-to-r from-purple-600 via-pink-500 to-yellow-400 rounded-full"></div>

          {/* Watermark Seal */}
          <div className="absolute inset-0 flex justify-center items-center opacity-20">
            <FaCertificate className="text-yellow-400 text-[260px]" />
          </div>

          {/* Header */}
          <div className="text-center relative z-10 mb-10">
            <h1 className="text-5xl font-serif font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent mb-2 tracking-wide">
              Certificate of Achievement
            </h1>
            <p className="text-lg text-gray-600 italic">
              This certificate is proudly presented to
            </p>
          </div>

          {/* Student Name */}
          <div className="text-center relative z-10 mb-6">
            <h2 className="text-6xl font-serif font-extrabold text-purple-700">
              {/* {studentName} */}
              Arif Akib
            </h2>
          </div>

          {/* Ribbon / Badge */}
          <div className="relative z-10 text-center mb-5">
            <div className="inline-block bg-gradient-to-r from-purple-600 to-pink-500 px-10 py-3 rounded-full text-white text-lg font-semibold shadow-lg">
              Successfully Completed
            </div>
          </div>

          {/* Test Info */}
          <div className="text-center relative z-10 text-gray-700 text-lg mb-12 space-y-2">
            <p>
              For completing the{" "}
              <span className="font-semibold">
                {/* {testName} */}
                JPT
              </span>
            </p>
            <p>
              Score:{" "}
              <span className="font-semibold">
                {/* {score} / {totalScore} */}
                180 / 200
              </span>
            </p>
            <p className="text-gray-500">
              {/* {date} */}
              November 6 , 2025
            </p>
          </div>

          <div className="flex justify-between items-center relative z-10 mt-12 px-20">
            {/* Instructor Section */}
            <div className="text-center">
              <p className="border-t-2 border-gray-400 w-40 mx-auto"></p>
              <p className="font-serif text-gray-700 mt-2 italic text-lg">
                Instructor
              </p>
            </div>

            {/* QR Code Section */}
            <div className="flex flex-col items-center">
              <QRCodeSVG
                value={`https://example.com/certificate/${certificateId}`} // Replace with your dynamic URL
                size={80}
                fgColor="#8F4A9D" // Blue color
                bgColor="#FFFFFF"
                level="H"
              />
              <p className="mt-2 text-gray-600 text-sm">Scan To Varify</p>
            </div>

            {/* Administrator Section */}
            <div className="text-center">
              <p className="border-t-2 border-gray-400 w-40 mx-auto"></p>
              <p className="font-serif text-gray-700 mt-2 italic text-lg">
                Administrator
              </p>
            </div>
          </div>

          {/* Decorative Corners */}
          <div className="absolute top-0 left-0 w-16 h-16 border-t-4 border-l-4 border-purple-600 rounded-tl-xl"></div>
          <div className="absolute top-0 right-0 w-16 h-16 border-t-4 border-r-4 border-purple-600 rounded-tr-xl"></div>
          <div className="absolute bottom-0 left-0 w-16 h-16 border-b-4 border-l-4 border-purple-600 rounded-bl-xl"></div>
          <div className="absolute bottom-0 right-0 w-16 h-16 border-b-4 border-r-4 border-purple-600 rounded-br-xl"></div>
        </div>
      </div>
    </div>
  );
}
