"use client";

import BreadCrumb from "@/components/BreadCrumb";
import WebpageWrapper from "@/components/wrapper/WebpageWrapper";
import axios from "@/utils/axios";

import { Suspense, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

import MockTestSelectSkeleton from "./mockSelectSkeleton";
import CustomSelect from "@/components/CustomSelect";
import { useTranslation } from "react-i18next";

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
  const { t } = useTranslation("common");

  const breadCrumbData = [
    { name: t("breadcrumb.home"), to: "/" },
    { name: t("breadcrumb.select_mock_test"), to: "/mock_test_select" },
  ];

  const [loader, setLoader] = useState(true);
  const [mockTests, setMockTests] = useState<Exam[]>([]);
  const [exam, setExam] = useState<string | null>("all");
  const [examOption, setExamOption] = useState<Option[]>([]);

  const router = useRouter();

  const getExamOptions = (data: { short_name: any }[]): Option[] => {
    const uniqueShortNames = Array.from(
      new Set(data.map((item) => item.short_name)),
    );

    return [
      { label: t("mock.all"), value: "all" },
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
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/exam/list`,
      );
      if (response?.data?.success) {
        setMockTests(response.data.data);
        setExamOption(getExamOptions(response.data.data));
      }
    } catch (error: any) {
      toast.error(error?.response?.data?.message || t("mock.fetch_error"));
    } finally {
      setLoader(false);
    }
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
    <Suspense fallback={<MockTestSelectSkeleton />}>
      {loader ? (
        <MockTestSelectSkeleton />
      ) : (
        <div className="relative pt-5 pb-20 bg-gradient-to-br from-blue-50 via-pink-50 to-purple-100 min-h-[70vh] overflow-clip">
          <div className="absolute -top-16 -left-16 w-60 h-60 bg-yellow-200/30 rounded-full filter blur-3xl animate-bounce-slow"></div>
        <div className="absolute -bottom-24 -right-16 w-96 h-96 bg-pink-200/30 rounded-full filter blur-3xl animate-pulse-slow"></div>

          <div className="relative z-10">
            <WebpageWrapper>
              <BreadCrumb breadCrumbData={breadCrumbData} />

              <div className="md:w-2/3 xl:w-1/2 mt-15 text-center mx-auto">
                <h2 className="text-4xl sm:text-5xl font-extrabold pb-3 bg-clip-text text-transparent bg-gradient-to-r from-indigo-500 via-pink-400 to-purple-500">
                  {t("mock.title")}
                </h2>
                <p className="text-gray-600 text-lg">
                  {t("mock.subtitle_prefix")}{" "}
                  <span className="font-semibold text-pink-500">
                    {t("mock.japanese")}
                  </span>{" "}
                  {t("mock.subtitle_suffix")}
                </p>
              </div>

              <div className="flex justify-center mt-6">
                <CustomSelect
                  options={examOption}
                  value={exam}
                  onChange={setExam}
                  placeholder={t("mock.select_exam")}
                />
              </div>

              <div className="mt-10">
                <div
                  className={`gap-6 sm:gap-10 ${
                    mockTests.length > 2
                      ? "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3"
                      : "grid sm:grid-cols-2 max-w-4xl mx-auto"
                  }`}
                >
                  {mockTests
                    .filter((test) =>
                      exam === "all" ? true : test.short_name === exam,
                    )
                    .map((test) => (
                      <div
                        key={test.id}
                        className="relative group rounded-2xl bg-white border border-white shadow-lg overflow-hidden p-8 transition-all duration-500 hover:-translate-y-3"
                      >
                        <div className="relative text-center">
                          <div className="w-20 h-20 mx-auto mb-5 rounded-2xl flex items-center justify-center text-white text-3xl shadow-md bg-gradient-to-r from-pink-400 via-purple-400 to-indigo-400">
                            {test.short_name}
                          </div>

                          <h2 className="text-2xl font-bold text-gray-900 mb-2">
                            {test.title}
                          </h2>

                          <p className="text-gray-600 text-sm mb-6">
                            {test.description}
                          </p>

                          <div className="flex justify-between gap-5 mb-6 text-sm">
                            <div className="flex-1">
                              <p className="text-gray-500 font-medium">
                                ⏱ {t("mock.duration")}
                              </p>
                              <p className="text-lg font-bold text-indigo-600">
                                {test.duration}
                              </p>
                            </div>

                            <div className="flex-1">
                              <p className="text-gray-500 font-medium">
                                🏅 {t("mock.passing_point")}
                              </p>
                              <p className="text-lg font-bold text-pink-600">
                                {test.pass_point}/{test.total_point}
                              </p>
                            </div>
                          </div>

                          <button
                            onClick={() => handleChooseTest(test)}
                            className="px-6 py-3 inline-block rounded-full font-semibold text-white text-sm shadow-md bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-400 cursor-pointer"
                          >
                            🎯 {t("mock.choose_test")}
                          </button>
                        </div>
                        <div className="absolute z-10 top-2 right-2 text-4xl opacity-0 group-hover:opacity-100 transition-all duration-700 transform translate-y-2 group-hover:translate-y-0">
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
  );
}
