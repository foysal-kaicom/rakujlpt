"use client";

import Image from "next/image";
import HeadLine2 from "@/components/HeadLine2";
import WebpageWrapper from "@/components/wrapper/WebpageWrapper";
import BreadCrumb from "@/components/BreadCrumb";

import { FaChevronUp, FaChevronDown } from "react-icons/fa";

import { useState } from "react";


interface FAQ {
  id: null | number;
  question: string;
  answer: string;
}

interface FAQProps {
  faqs: FAQ[];
}

export default function FAQ({faqs}:FAQProps){
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

  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const [showAll, setShowAll] = useState(false);

  const toggle = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  const visibleFaqs = showAll ? faqs : faqs.slice(0, 9);

  return (
    <div className="space-y-15 pb-15 pt-5">
      <WebpageWrapper>
        <BreadCrumb breadCrumbData={breadCrumbData} />
        <div className="flex gap-15 items-center xl:items-start">
          <div className="lg:w-1/2 relative z-10">
            <HeadLine2 preText="" mainText="FAQ" subText="" />
            <div className="space-y-5 mt-10">
              {visibleFaqs.map((faq, index) => (
                <div
                  key={index}
                  className="border border-gray-200 rounded-xl shadow-sm bg-white"
                >
                  <button
                    onClick={() => toggle(index)}
                    className="w-full text-left px-5 py-4 flex items-center justify-between hover:bg-gray-50 transition"
                  >
                    <p className="twxt-sm xl:test-base font-medium text-gray-800 w-[calc(100%-30px)]">
                      {faq?.question}
                    </p>
                    {openIndex === index ? (
                      <FaChevronUp className="text-blue-600 size-3" />
                    ) : (
                      <FaChevronDown className="text-gray-500 size-3" />
                    )}
                  </button>
                  {openIndex === index && (
                    <div className="px-5 py-5 text-gray-700 text-xs xl:text-sm border-t border-gray-200">
                      <div dangerouslySetInnerHTML={{ __html: faq?.answer ?? "" }}/>
                    </div>
                  )}
                </div>
              ))}
            </div>

            {faqs.length > 10 && (
              <div className="text-center pt-6">
                <button
                  onClick={() => setShowAll(!showAll)}
                  className="text-white bg-blue-800 font-medium text-sm px-8 py-2 rounded-4xl hover:bg-blue-900 duration-500 inline-flex items-center gap-2"
                >
                  {showAll ? "Show Less" : "Show More"} {showAll ? <FaChevronUp className="size-3" /> : <FaChevronDown className="size-3" />}
                </button>
              </div>
            )}
          </div>
          <div className="hidden lg:block w-1/2 pt-12">
            <div className="flex gap-10">
              <div className="w-1/2 h-[500px] mt-[60%] relative">
                <Image
                  src="/assets/img/faq/faq-2.jpg"
                  width={800}
                  height={1200}
                  alt=""
                  className="size-full object-cover bg-blue-100 relative z-10 rounded-2xl"
                />
              
                <div className="size-50 bg-[#173fa4] absolute z-20 -bottom-10 -right-20 rounded-xl shadow-2xl drop-shadow-md"></div>
                <div className="size-50 bg-[#f8ff00] absolute z-0 -top-10 -left-20 rounded-xl shadow-2xl drop-shadow-md"></div>
              </div>
              <div className="w-1/2 h-[500px] relative">
                <Image
                  src="/assets/img/faq/faq-1.jpg"
                  width={800}
                  height={1200}
                  alt=""
                  className="size-full object-cover bg-blue-100 relative z-10 rounded-2xl"
                />
             
                <div className="size-50 bg-[#173fa4] absolute z-20 -bottom-10 -right-20 rounded-xl shadow-2xl drop-shadow-md"></div>
                <div className="size-50 bg-[#f8ff00] absolute z-0 -top-10 -left-20 rounded-xl shadow-2xl drop-shadow-md"></div>
              </div>
            </div>
          </div>
        </div>
      </WebpageWrapper>
    </div>
  );
}
