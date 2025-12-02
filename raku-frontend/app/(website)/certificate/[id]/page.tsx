"use client";

import { FaCertificate } from "react-icons/fa";
import { QRCodeSVG } from "qrcode.react";
import { useParams } from "next/navigation";
import WebpageWrapper from "@/components/wrapper/WebpageWrapper";
import BreadCrumb from "@/components/BreadCrumb";
import { useRef } from "react";

export default function Certificate() {
  const params = useParams();
  const certificateId = params?.id;

  const certificateRef = useRef<HTMLDivElement>(null);

  const breadCrumbData = [
    { name: "Home", to: "/" },
    { name: "Certificate", to: `/certificate/${certificateId}` },
  ];

  // const handleDownload = async () => {
  //   if (!certificateRef.current) return;

  //   const canvas = await html2canvas(certificateRef.current, {
  //     scale: 2,
  //     useCORS: true,
  //   });
  //   const imgData = canvas.toDataURL("image/png");

  //   const pdf = new jsPDF({
  //     orientation: "landscape",
  //     unit: "px",
  //     format: [842, 595],
  //   });
  //   pdf.addImage(imgData, "PNG", 0, 0, 842, 595);
  //   pdf.save(`certificate-${certificateId}.pdf`);
  // };

  // const handleShare = async () => {
  //   if (!certificateRef.current) return;

  //   const canvas = await html2canvas(certificateRef.current, {
  //     scale: 2,
  //     useCORS: true,
  //   });

  //   const blob = await new Promise<Blob | null>((resolve) =>
  //     canvas.toBlob((b) => resolve(b), "image/png")
  //   );
  //   if (!blob) return;

  //   const file = new File([blob], `certificate-${certificateId}.png`, {
  //     type: "image/png",
  //   });

  //   if (navigator.canShare && navigator.canShare({ files: [file] })) {
  //     navigator.share({
  //       files: [file],
  //       title: "My Certificate",
  //       text: "Check out my certificate from RAKU JLPT!",
  //     });
  //   } else {
  //     // fallback: download
  //     const url = URL.createObjectURL(file);
  //     const link = document.createElement("a");
  //     link.href = url;
  //     link.download = `certificate-${certificateId}.png`;
  //     link.click();
  //     URL.revokeObjectURL(url);
  //     toast.success(
  //       "Your certificate image is ready! You can now share it on social media."
  //     );
  //   }
  // };

  return (
    <div className="min-h-[70vh] bg-[#f5f3ff] py-5 pb-10">
      <WebpageWrapper>
        <BreadCrumb breadCrumbData={breadCrumbData} />

        <div className="p-3">
          {/* Certificate Container */}
          <div
            ref={certificateRef}
            className="relative bg-white border-2 border-[#e0d7ff] p-6 sm:p-10 font-roboto flex flex-col justify-center items-center rounded-2xl shadow mt-10 mx-auto w-full max-w-[842px] h-auto sm:h-[595px]"
          >
            {/* Watermark Text */}
            <div className="absolute inset-0 flex justify-center items-center pointer-events-none">
              <div className="-rotate-30 text-[50px] sm:text-[100px] font-bold font-merriweather text-purple-700/5 whitespace-nowrap">
                RAKU JLPT
              </div>
            </div>

            {/* Violet Border */}
            <div className="absolute inset-[5px] sm:inset-[10px] border-[2px] sm:border-[3px] border-purple-600 rounded-2xl pointer-events-none"></div>

            {/* Center Watermark Icon */}
            <div className="absolute inset-0 flex justify-center items-center opacity-5 pointer-events-none">
              <FaCertificate className="text-[150px] sm:text-[280px] text-purple-600" />
            </div>

            {/* Header */}
            <div className="text-center relative z-10 px-2">
              <h1 className="text-3xl sm:text-5xl font-bold text-[#4c1d95] mb-3 font-merriweather">
                Certificate of Achievement
              </h1>
              <p className="text-md sm:text-lg text-gray-500 italic">
                This certificate is proudly presented to
              </p>
            </div>

            {/* Student Name */}
            <div className="text-center relative z-10 leading-tight px-2">
              <h2 className="text-3xl sm:text-[3.5rem] font-bold text-purple-600 font-merriweather">
                Arif Akib
              </h2>
            </div>

            {/* Exam Info */}
            <div className="text-center relative z-10 text-gray-700 text-md sm:text-lg mb-5 leading-6 space-y-1 px-2">
              <p>
                For completing the{" "}
                <span className="font-semibold">JPT Exam</span>
              </p>
              <p>
                Score: <span className="font-semibold">180 / 200</span>
              </p>
              <p className="text-gray-400 text-sm sm:text-base">
                November 6, 2025
              </p>
            </div>

            <div className="flex md:hidden flex-col items-center">
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

            {/* QR & Signatures */}
            <div className="flex flex-row justify-between items-center relative z-10 md:px-20 w-full gap-6 sm:gap-0">
              {/* Instructor */}
              <div className="text-center">
                <p className="border-b-2 border-[#d1c4ff] md:w-40 mx-auto pb-1">
                  fdhn
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
                  fdhs
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
        </div>
      </WebpageWrapper>
    </div>
  );
}
