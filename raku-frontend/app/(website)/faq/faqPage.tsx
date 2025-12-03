"use client";

import WebpageWrapper from "@/components/wrapper/WebpageWrapper";
import BreadCrumb from "@/components/BreadCrumb";

import { FaPlus, FaMinus } from "react-icons/fa";

import { useEffect, useState } from "react";
import PaginatedComponent from "@/components/PaginateComponent";
import Link from "next/link";
import axios from "axios";

interface FAQ {
  id: null | number;
  question: string;
  answer: string;
}

export default function FAQ() {
  const breadCrumbData = [
    {
      name: "Home",
      to: "/",
    },
    {
      name: "FAQ",
      to: "/faq",
    },
  ];

  const [faqs, setFaqs] = useState<FAQ[]>([]);
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  const toggle = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  // Calculate pagination
  const totalExams = faqs.length;
  const totalPages = Math.ceil(totalExams / itemsPerPage);

  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentFAQ = faqs.slice(startIndex, startIndex + itemsPerPage);

  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= totalPages) setCurrentPage(page);
  };

  const getFaqList = async () => {
    try {
      const res = await axios.get(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/faq/list`
      );
      setFaqs(res?.data?.data || []);
    } catch (error) {
      setFaqs([]);
    }
  };

  useEffect(() => {
    getFaqList();
  }, []);

  return (
    <section className="relative min-h-screen bg-linear-to-br from-purple-50 via-pink-50 to-blue-50 overflow-hidden pt-5 pb-20 px-6">
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -left-40 w-[500px] h-[500px] bg-gradient-to-br from-purple-400/30 to-pink-400/30 rounded-full blur-[120px] animate-float"></div>
        <div className="absolute bottom-0 right-0 w-[600px] h-[600px] bg-gradient-to-tr from-indigo-400/30 to-pink-400/20 rounded-full blur-[140px] animate-float-slow"></div>
      </div>
      <WebpageWrapper>
        <BreadCrumb breadCrumbData={breadCrumbData} />
        <div className="relative z-10 max-w-3xl mx-auto text-center pt-15">
          <h1 className="text-5xl md:text-6xl font-extrabold pb-6 bg-linear-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent drop-shadow-sm">
            Got Questions?
          </h1>
          <p className="text-gray-700 mb-16 text-lg">
            We’ve got answers! Check out the most common questions below —
            clear, simple.
          </p>

          {/* FAQ Accordion */}
          <div className="space-y-6 text-left mb-8">
            {currentFAQ.map((faq, index) => {
              const isOpen = openIndex === index;
              return (
                <div
                  key={index}
                  className={`rounded-2xl p-[2px] bg-gradient-to-r from-purple-200 via-pink-200 to-blue-200 shadow-lg transition-all duration-300 ${
                    isOpen ? "scale-[1.02]" : "hover:scale-[1.01]"
                  }`}
                >
                  <button
                    onClick={() => toggle(index)}
                    className={`w-full flex justify-between items-center bg-white/70 backdrop-blur-xl px-6 py-5  text-left duration-400 border-b border-gray-200 ${
                      isOpen ? "rounded-t-2xl " : "rounded-2xl"
                    }`}
                  >
                    <h3 className="text-lg md:text-xl font-semibold text-gray-800">
                      {faq.question}
                    </h3>
                    <span
                      className={`text-xl text-purple-600 transition-transform duration-300 ${
                        isOpen ? "rotate-180" : ""
                      }`}
                    >
                      {isOpen ? <FaMinus /> : <FaPlus />}
                    </span>
                  </button>

                  <div
                    className={`transition-all duration-500 ease-in-out overflow-hidden ${
                      isOpen ? "max-h-40 opacity-100" : "max-h-0 opacity-0"
                    }`}
                  >
                    <div className="bg-white/60 px-6 pb-5 pt-2 rounded-b-2xl text-gray-700 text-base">
                      {faq.answer}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
          {faqs.length > itemsPerPage && (
            <PaginatedComponent
              handlePageChange={handlePageChange}
              totalPages={totalPages}
              currentPage={currentPage}
            />
          )}

          {/* CTA Button */}
          <div className="mt-8">
            <Link
              href="/contact_us"
              className="relative inline-block px-10 py-4 test-xs sm:text-lg font-bold text-white rounded-full bg-linear-to-r from-indigo-500 via-purple-500 to-pink-500 hover:from-pink-500 hover:to-indigo-500 transition-all duration-500 hover:scale-105 shadow-[0_0_25px_rgba(168,85,247,0.5)]"
            >
              Still Need Help? Contact Us 💬
            </Link>
          </div>
        </div>
      </WebpageWrapper>

      <style jsx>{`
        @keyframes float {
          0%,
          100% {
            transform: translateY(0) rotate(0deg);
          }
          50% {
            transform: translateY(-20px) rotate(3deg);
          }
        }
        .animate-float {
          animation: float 8s ease-in-out infinite;
        }
        .animate-float-slow {
          animation: float 10s ease-in-out infinite;
        }
      `}</style>
    </section>
  );
}
