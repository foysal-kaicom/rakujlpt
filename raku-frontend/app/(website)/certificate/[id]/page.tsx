"use client";

import { FaCertificate } from "react-icons/fa";
import { QRCodeSVG } from "qrcode.react";
import { useParams } from "next/navigation";
import WebpageWrapper from "@/components/wrapper/WebpageWrapper";
import BreadCrumb from "@/components/BreadCrumb";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import { useRef } from "react";
import { toast } from "sonner";

export default function Certificate() {
  const params = useParams();
  const certificateId = params?.id;

  const certificateRef = useRef<HTMLDivElement>(null);

  const breadCrumbData = [
    { name: "Home", to: "/" },
    { name: "Certificate", to: `/certificate/${certificateId}` },
  ];

  const handleDownload = async () => {
    if (!certificateRef.current) return;

    const canvas = await html2canvas(certificateRef.current, {
      scale: 2,
      useCORS: true,
    });
    const imgData = canvas.toDataURL("image/png");

    const pdf = new jsPDF({
      orientation: "landscape",
      unit: "px",
      format: [842, 595],
    });
    pdf.addImage(imgData, "PNG", 0, 0, 842, 595);
    pdf.save(`certificate-${certificateId}.pdf`);
  };

  const handleShare = async () => {
    if (!certificateRef.current) return;

    const canvas = await html2canvas(certificateRef.current, {
      scale: 2,
      useCORS: true,
    });

    const blob = await new Promise<Blob | null>((resolve) =>
      canvas.toBlob((b) => resolve(b), "image/png")
    );
    if (!blob) return;

    const file = new File([blob], `certificate-${certificateId}.png`, {
      type: "image/png",
    });

    if (navigator.canShare && navigator.canShare({ files: [file] })) {
      navigator.share({
        files: [file],
        title: "My Certificate",
        text: "Check out my certificate from RAKU JLPT!",
      });
    } else {
      // fallback: download
      const url = URL.createObjectURL(file);
      const link = document.createElement("a");
      link.href = url;
      link.download = `certificate-${certificateId}.png`;
      link.click();
      URL.revokeObjectURL(url);
      toast.success(
        "Your certificate image is ready! You can now share it on social media."
      );
    }
  };

  return (
    <div
      style={{
        minHeight: "70vh",
        backgroundColor: "#f5f3ff",
        padding: "20px 0",
        paddingBottom: "40px",
      }}
    >
      <WebpageWrapper>
        <BreadCrumb breadCrumbData={breadCrumbData} />

        {/* Download Button */}
        <div
          style={{
            textAlign: "center",
            marginBottom: "20px",
            marginTop: "20px",
            display: "flex",
            gap: "20px",
            justifyContent: "space-between",
          }}
        >
          <button
            onClick={handleDownload}
            style={{
              padding: "12px 28px",
              backgroundColor: "#7c3aed",
              color: "#fff",
              fontWeight: 600,
              borderRadius: "8px",
              cursor: "pointer",
              fontSize: "1rem",
              transition: "all 0.2s",
            }}
          >
            Download
          </button>
          <button
            onClick={handleShare}
            style={{
              padding: "12px 28px",
              backgroundColor: "#10b981",
              color: "#fff",
              fontWeight: 600,
              borderRadius: "8px",
              cursor: "pointer",
              fontSize: "1rem",
              transition: "all 0.2s",
              marginLeft: "12px",
            }}
          >
            Share
          </button>
        </div>
        <div
          style={{
            // backgroundColor: "gray",
            padding: "10px",
            overflow: "scroll",
          }}
        >
          {/* Certificate Container */}
          <div
            ref={certificateRef}
            style={{
              width: "842px",
              height: "595px",
              margin: "0 auto",
              position: "relative",
              backgroundColor: "#ffffff",
              border: "2px solid #e0d7ff",
              padding: "60px",
              fontFamily: "'Roboto', sans-serif",
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            {/* Watermark */}
            <div
              style={{
                position: "absolute",
                inset: 0,
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                pointerEvents: "none", // makes sure it doesn’t block interaction
              }}
            >
              <div
                style={{
                  transform: "rotate(-30deg)",
                  fontSize: "100px",
                  color: "rgba(124, 58, 237, 0.05)", // soft violet
                  fontWeight: 700,
                  fontFamily: "'Merriweather', serif",
                  whiteSpace: "nowrap",
                }}
              >
                RAKU JLPT
              </div>
            </div>

            {/* Violet Border */}
            <div
              style={{
                position: "absolute",
                inset: "10px",
                border: "3px solid #7c3aed",
                borderRadius: "16px",
              }}
            ></div>

            {/* Watermark */}
            <div
              style={{
                position: "absolute",
                inset: 0,
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                opacity: 0.05,
              }}
            >
              <FaCertificate style={{ fontSize: "280px", color: "#7c3aed" }} />
            </div>

            {/* Header */}
            <div
              style={{
                textAlign: "center",
                position: "relative",
                zIndex: 10,
                marginBottom: "0px",
              }}
            >
              <h1
                style={{
                  fontSize: "3rem",
                  fontWeight: 700,
                  color: "#4c1d95",
                  marginBottom: "0px",
                  fontFamily: "'Merriweather', serif",
                }}
              >
                Certificate of Achievement
              </h1>
              <p
                style={{
                  fontSize: "1.125rem",
                  color: "#6b7280",
                  fontStyle: "italic",
                }}
              >
                This certificate is proudly presented to
              </p>
            </div>

            {/* Student Name */}
            <div
              style={{
                textAlign: "center",
                position: "relative",
                zIndex: 10,
                marginBottom: "0px",
              }}
            >
              <h2
                style={{
                  fontSize: "3.5rem",
                  fontWeight: 700,
                  color: "#7c3aed",
                  fontFamily: "'Merriweather', serif",
                }}
              >
                Arif Akib
              </h2>
            </div>

            
            {/* Exam Info */}
            <div
              style={{
                textAlign: "center",
                position: "relative",
                zIndex: 10,
                color: "#374151",
                fontSize: "1.125rem",
                marginBottom: "10px",
                lineHeight: "1.6rem",
              }}
            >
              <p>
                For completing the{" "}
                <span style={{ fontWeight: 600 }}>JPT Exam</span>
              </p>
              <p>
                Score: <span style={{ fontWeight: 600 }}>180 / 200</span>
              </p>
              <p style={{ color: "#9ca3af" }}>November 6, 2025</p>
            </div>

            {/* QR Code & Signatures */}
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                position: "relative",
                zIndex: 10,
                padding: "0 80px",
                width: "100%",
              }}
            >
              {/* Instructor */}
              <div style={{ textAlign: "center" }}>
                <p
                  style={{
                    borderTop: "2px solid #d1c4ff",
                    width: "160px",
                    margin: "0 auto",
                  }}
                ></p>
                <p
                  style={{
                    marginTop: "8px",
                    fontStyle: "italic",
                    color: "#4b2db2",
                    fontWeight: 500,
                  }}
                >
                  Instructor
                </p>
              </div>

              {/* QR */}
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                }}
              >
                <QRCodeSVG
                  value={`https://example.com/certificate/${certificateId}`}
                  size={40}
                  fgColor="#7c3aed"
                  bgColor="#fff"
                  level="H"
                />
                <p
                  style={{
                    marginTop: "8px",
                    color: "#6b7280",
                    fontSize: "0.875rem",
                  }}
                >
                  Scan to Verify
                </p>
              </div>

              {/* Administrator */}
              <div style={{ textAlign: "center" }}>
                <p
                  style={{
                    borderTop: "2px solid #d1c4ff",
                    width: "160px",
                    margin: "0 auto",
                  }}
                ></p>
                <p
                  style={{
                    marginTop: "8px",
                    fontStyle: "italic",
                    color: "#4b2db2",
                    fontWeight: 500,
                  }}
                >
                  Administrator
                </p>
              </div>
            </div>
            {/* Disclaimer */}
            <div
              style={{
                textAlign: "center",
                position: "relative",
                zIndex: 10,
                marginTop: "10px",
              }}
            >
              <p
                style={{
                  fontSize: "0.875rem",
                  color: "#6b7280",
                  fontStyle: "italic",
                  lineHeight: "1.4rem",
                }}
              >
                This certificate is generated by RAKU JLPT. Any alteration to
                this certificate is prohibited.
              </p>
            </div>
          </div>
        </div>
      </WebpageWrapper>
    </div>
  );
}
