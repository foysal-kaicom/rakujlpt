"use client";

import { useEffect, useRef, useState } from "react";
import { Html5QrcodeScanner } from "html5-qrcode";
import BreadCrumb from "@/components/BreadCrumb";
import WebpageWrapper from "@/components/wrapper/WebpageWrapper";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

export default function QRScannerPage() {
  const breadCrumbData = [
    { name: "Home", to: "/" },
    { name: "Verify Certificate", to: "/certificate" },
  ];

  const scannerRef = useRef<HTMLDivElement>(null);
  const [scannedData, setScannedData] = useState("");

  const router = useRouter();

  useEffect(() => {
    if (!scannerRef.current) return;

    const config = {
      fps: 10,
      qrbox: 280,
      rememberLastUsedCamera: true,
    };

    const scanner = new Html5QrcodeScanner(
      scannerRef.current.id,
      config,
      false
    );

    scanner.render(
      (decodedText: string) => {
        setScannedData(decodedText);
        router.push(`${decodedText}`);
      },
      (errorMessage: string) => {
        // optional: console.log(errorMessage);
        toast.error("Certificate not found")
      }
    );

    return () => {
      scanner
        .clear()
        .catch((err) => console.error("Failed to clear scanner", err));
    };
  }, []);

  return (
    <div className="min-h-[70vh] bg-gradient-to-br from-blue-100 via-purple-100 to-pink-100 pt-5">
      <WebpageWrapper>
        <BreadCrumb breadCrumbData={breadCrumbData} />
        <div className="flex flex-col items-center justify-center py-8">
          {/* Header */}
          <div className="text-center mb-10">
            <h1 className="text-4xl md:text-5xl font-extrabold bg-gradient-to-r from-blue-500 to-purple-600 bg-clip-text text-transparent pb-2">
              Verify Certificate !
            </h1>
            <p className="text-gray-700 mt-2 max-w-md mx-auto">
              Scan the Certificate's QR code to verify
            </p>
          </div>

          {/* Scanner Card */}
          <div className="w-full max-w-md bg-white rounded-3xl p-6">
            <div
              id="qr-scanner"
              ref={scannerRef}
              className="w-[98%] h-auto mx-auto rounded-2xl overflow-hidden border-2 border-dashed border-blue-200"
            ></div>

            {/* Scanned Result */}
            <div className="mt-6 p-4 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-xl shadow-lg text-center break-words w-[90%] lg:w-[80%] mx-auto mb-6">
              {scannedData || "No QR code scanned yet"}
            </div>
          </div>

          {/* Hint / Footer */}
          <p className="mt-6 text-gray-500 italic text-sm font-medium text-center max-w-md">
            Tip: Allow camera access for scanning. Works on desktop and mobile.
          </p>
        </div>
      </WebpageWrapper>
    </div>
  );
}
