"use client";

import BreadCrumb from "@/components/BreadCrumb";
import WebpageWrapper from "@/components/wrapper/WebpageWrapper";
import axios from "@/utils/axios";

import { Suspense, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

import MockTestSelectSkeleton from "./mockSelectSkeleton";
import CustomSelect from "@/components/CustomSelect";

interface Exam {
  id: number;
  slug: string;
  short_name: string;
  title: string;
  description: string;
  duration?: string;
  pass_point?: number;
  total_point?: number;
  answer_value?: number;
}

type Option = {
  label: string;
  value: string;
};

export default function MockTestSelect() {
  const breadCrumbData = [
    { name: "Home", to: "/" },
    { name: "Select Mock test", to: "/mock_test_select" },
  ];
  const [loader, setLoader] = useState(true);
  const [mockTests, setMockTests] = useState<Exam[]>([]);
  const [exam, setExam] = useState<string | null>("all");
  const [examOption, setExamOption] = useState<
    { label: string; value: string }[]
  >([]);

  const router = useRouter();

  const getExamOptions = (data: { short_name: any }[]): Option[] => {
    const uniqueShortNames = Array.from(
      new Set(data.map((item) => item.short_name))
    );

    return [
      { label: "All", value: "all" },
      ...uniqueShortNames.map((name) => ({
        label: String(name),
        value: String(name),
      })),
    ];
  };

  const getMockTestsData = async () => {
    setLoader(true);
    try {
      const response = await axios.get<{ success: boolean; data: Exam[] }>(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/exam/list`
      );
      if (response?.data?.success) {
        setLoader(false);
        setMockTests(response.data.data);
        const options = getExamOptions(response.data.data);
        setExamOption(options);
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

  const handleChooseTest = (test: any) => {
    const filters = {
      type: test.short_name,
      title: test.title,
      duration: test.duration,
      total_point: test.total_point,
    };
    const params = new URLSearchParams(filters as any).toString();
    router.push(`/mock_test_select/${test.id}?${params}`);
  };

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
                  <h2 className="text-4xl sm:text-5xl font-extrabold pb-3 bg-clip-text text-transparent bg-gradient-to-r from-indigo-500 via-pink-500 to-purple-500">
                    Test Your Progress
                  </h2>
                  <p className="text-gray-600 text-lg">
                    Ready to level up your{" "}
                    <span className="font-semibold text-pink-500">
                      Japanese?
                    </span>{" "}
                    Pick your exam and start practicing with real exam- style
                    mock tests—anytime, anywhere.
                  </p>
                </div>
                <div className="flex justify-center mt-6">
                  <CustomSelect
                    options={examOption}
                    value={exam}
                    onChange={setExam}
                    placeholder="Select an Exam"
                  />
                </div>

                <div className="mt-10">
                  <div
                    className={`gap-6 sm:gap-10 ${
                      mockTests.length > 2
                        ? "grid grid-cols-1 lg:grid-cols-3"
                        : "grid sm:grid-cols-2 max-w-4xl mx-auto"
                    }`}
                  >
                    {mockTests &&
                      mockTests
                        .filter((test) =>
                          exam === "all" ? true : test.short_name === exam
                        )
                        .map((test) => (
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

                              <div className="flex justify-between gap-5 mb-6 text-sm">
                                <div className="flex-1">
                                  <p className="text-gray-500 font-medium">
                                    ⏱ Duration
                                  </p>
                                  <p className="text-lg font-bold text-indigo-600">
                                    {test.duration}
                                  </p>
                                </div>

                                <div className="flex-1">
                                  <p className="text-gray-500 font-medium">
                                    🏅 Passing Point
                                  </p>
                                  <p className="text-lg font-bold text-pink-600">
                                    {test.pass_point}/{test.total_point}
                                  </p>
                                </div>
                              </div>
                              <button
                                onClick={() => handleChooseTest(test)}
                                className="px-6 py-3 inline-block rounded-full space-x-2 font-semibold text-white text-sm shadow-md bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-400 hover:scale-105 transition-transform duration-300 cursor-pointer"
                              >
                                🎯 Choose Test
                              </button>
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
