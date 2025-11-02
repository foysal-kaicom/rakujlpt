"use client";

import BreadCrumb from "@/components/BreadCrumb";
import WebpageWrapper from "@/components/wrapper/WebpageWrapper";
import axios from "@/utils/axios";

import Image from "next/image";
import { Suspense, useEffect, useState } from "react";
import Link from "next/link";
import { toast } from "sonner";
import Loader from "@/components/Loader";
import MockTestSelectSkeleton from "./mockSelectSkeleton";

interface Exam {
  id: number;
  slug: string;
  short_name: string;
  title: string;
  fee: string;
  description: string;
  exam_date?: string;
  start_time?: string;
  end_time?: string;
  application_deadline?: string;
  result_publish_date?: string;
  available_to_apply?: string;
}

export default function MockTestSelect() {
  const breadCrumbData = [
    { name: "Home", to: "/" },
    { name: "Select Mock test", to: "/mock_test_select" },
  ];
  const [loader, setLoader] = useState(true);

  const [mockTests, setMockTests] = useState<Exam[]>([]);
  const getMockTestsData = async () => {
    setLoader(true);
    try {
      const response = await axios.get<{ success: boolean; data: Exam[] }>(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/exam/list`
      );
      if (response?.data?.success) {
        setLoader(false);
        setMockTests(response.data.data);
      }
    } catch (error: any) {
      setLoader(false);
      toast.error(
        error?.response?.data?.message || "Can not get exams at this moment"
      );
    }
    setLoader(false);
  };

  useEffect(() => {
    getMockTestsData();
  }, []);

  return (
    <>
      <Suspense fallback={<MockTestSelectSkeleton />}>
        {loader ? (
          <MockTestSelectSkeleton />
        ) : (
          <div className="relative pt-5 pb-20 bg-gradient-to-br from-blue-50 via-pink-50 to-purple-100 min-h-[70vh]">
            <div className="absolute top-0 left-0 w-60 h-60 bg-pink-300/30 rounded-full blur-3xl animate-bounce-slow"></div>
            <div className="absolute bottom-0 right-0 w-80 h-80 bg-indigo-300/30 rounded-full blur-3xl animate-pulse-slow"></div>

            <div className="relative z-10">
              <WebpageWrapper>
                <BreadCrumb breadCrumbData={breadCrumbData} />
                <div className="md:w-2/3 xl:w-1/2 mt-15 text-center mx-auto">
                  <h2 className="text-4xl sm:text-5xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-indigo-500 via-pink-500 to-purple-500">
                    Test Your Progress
                  </h2>
                  <p className="text-gray-600 mt-3 text-lg">
                    Select your mock test & start your{" "}
                    <span className="font-semibold text-pink-500">
                      Japanese journey
                    </span>{" "}
                    today!
                  </p>
                </div>
                <div className="mt-16">
                  <div className={`gap-6 sm:gap-10 ${mockTests.length>2 ? "grid grid-cols-1 lg:grid-cols-3" : "grid sm:grid-cols-2 max-w-4xl mx-auto"}`}>
                    {mockTests &&
                      mockTests.map((test) => (
                        <div
                          key={test.id}
                          className="relative group rounded-2xl bg-white border border-white shadow-lg overflow-hidden p-8 transition-all duration-500 hover:-translate-y-3"
                        >
                          <div className="relative z-10 text-center">
                            <div className="w-20 h-20 mx-auto mb-5 rounded-2xl flex items-center justify-center text-white text-3xl shadow-md bg-gradient-to-r from-pink-400 via-purple-400 to-indigo-400 transform rotate-3 group-hover:rotate-0 group-hover:scale-105 transition-transform duration-500">
                              {test.short_name}
                            </div>
                            <h2 className="text-2xl font-bold text-gray-900 mb-2 tracking-tight group-hover:text-purple-600 transition-colors duration-300">
                              {test.title}
                            </h2>
                            <p className="text-gray-600 text-sm mb-6 group-hover:text-black transition-colors">
                              {test.description}
                            </p>

                            <Link
                              href={`/mock_test_select/${test.id}`}
                              className="px-6 py-3 inline-block rounded-full space-x-2 font-semibold text-white text-sm shadow-md bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-400 hover:scale-105 transition-transform duration-300"
                            >
                              🎯 Choose Test
                            </Link>
                          </div>
                          <div className="absolute top-2 right-2 text-4xl opacity-0 group-hover:opacity-100 transition-all duration-700 transform translate-y-2 group-hover:-translate-y-0">
                            ✨
                          </div>
                        </div>
                      ))}
                  </div>
                </div>
              </WebpageWrapper>
            </div>
          </div>
        )}
      </Suspense>
    </>
  );
}
