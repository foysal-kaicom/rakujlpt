"use client";

import { useState, useEffect, Suspense } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

import axiosInstance from "@/utils/axios";
import { toast } from "sonner";

import { FaBookOpen } from "react-icons/fa";

import BreadCrumb from "@/components/BreadCrumb";
import UserHeadline from "@/components/user/UserHeadline/UserHeadline";
import Loader from "@/components/Loader";
import SuspenseLoader from "@/components/SuspenseLoader";


interface Practice {
  current_module_slug: string;
  current_module_name: string;
  current_stage_id: number;
  current_stage_name: string;
  stage_slug: string;
  description: string;
  complete: number;
}

export default function MyPractice() {
  const breadCrumbData = [
    { name: "Dashboard", to: "/dashboard" },
    { name: "My Practice", to: "/my_practice" },
  ];

  const [loading, setLoading] = useState(true);
  const [practiceData, setPracticeData] = useState<Practice[]>([]);

  const router = useRouter();

  const getPracticetData = async () => {
    try {
      const response = await axiosInstance.get("/candidate/current-roadmap");
      const data: Practice[] = response?.data?.data || [];
      setPracticeData(data);
      toast.success("Showing practice ");
    } catch (error: any) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getPracticetData();
  }, []);

  return (
    <>
      <Suspense fallback={<SuspenseLoader />}>
        {loading && <Loader />}
        <div className="min-h-[60vh]">
          <BreadCrumb breadCrumbData={breadCrumbData} />

          <div className="mt-5 lg:pb-10">
            <section className="flex items-center gap-2">
              🌈{" "}
              <UserHeadline
                mainText="Your Learning Roadmap"
                preText=""
                subText=""
              />
            </section>

            <section className="w-full mt-5">
              {practiceData.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-10">
                  {/* Current Module */}
                  {practiceData.map((item, index) => (
                    <div
                      key={index}
                      className="relative p-8 rounded-2xl bg-purple-500 border border-purple-600 shadow-[0_0_25px_rgba(255,255,255,0.1)] hover:shadow-[0_0_40px_rgba(236,72,153,0.4)] transition-all"
                    >
                      <div className="flex items-center justify-between mb-4">
                        <h3 className="text-2xl font-semibold flex items-center gap-2 text-white">
                          <FaBookOpen className="text-yellow-300" />
                          {item?.current_module_name}
                        </h3>
                        <span className="text-sm text-white font-medium">
                          {item?.complete}% Complete
                        </span>
                      </div>
                      <h4 className="text-xl font-semibold mb-2 text-white">
                        {item?.current_stage_name}
                      </h4>
                      <p className="text-gray-50 font-medium mb-6">
                        {item?.description}
                      </p>

                      {/* Progress Bar */}
                      <div className="w-full h-2 bg-purple-200 rounded-full overflow-hidden">
                        <div
                          className={`h-full bg-green-300`}
                          style={{ width: `${item?.complete}%` }}
                        ></div>
                      </div>
                      <div className="flex justify-end mt-5">
                        <button
                          onClick={() =>
                            router.push(
                              `/practice/${item.current_module_slug}/${item.stage_slug}/${item.current_stage_id}`
                            )
                          }
                          disabled={item?.complete == 100}
                          className={`px-8 py-2 bg-white rounded-md font-semibold drop-shadow-sm drop-shadow-purple-400 border border-purple-400 relative overflow-clip group ${
                            item.complete == 100
                              ? "cursor-not-allowed"
                              : "cursor-pointer"
                          }`}
                        >
                          <span className="relative z-10 text-white group-hover:text-black duration-300">
                            {item.complete == 100 ? "Completed" : "Resume"}
                          </span>
                          <div className="size-full absolute top-0 left-0 bg-violet-700 group-hover:translate-x-full duration-300"></div>
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center text-gray-500 py-6 flex flex-col gap-3 justify-center items-center">
                  You have not started any practice !!
                  <Link href="/practice">
                    <button className="relative overflow-hidden text-sm md:text-base inline-block px-10 py-2 font-semibold text-white rounded-full bg-linear-to-r from-purple-600 to-blue-600 shadow-lg shadow-purple-500/40 hover:shadow-purple-500/60 hover:scale-105 transition-all duration-300 ease-out">
                      <span className="relative z-10">Start Now</span>
                      <span className="absolute inset-0 bg-linear-to-r from-purple-400/30 via-pink-400/30 to-blue-400/30 blur-xl opacity-60 transition-opacity duration-300 group-hover:opacity-90"></span>
                    </button>
                  </Link>
                </div>
              )}
            </section>
          </div>
        </div>
      </Suspense>
    </>
  );
}
