"use client";

import { useState, useEffect, Suspense } from "react";
import { useRouter } from "next/navigation";

import axiosInstance from "@/utils/axios";
import { toast } from "sonner";

import { FaBookOpen, FaClock } from "react-icons/fa";

import BreadCrumb from "@/components/BreadCrumb";
import UserHeadline from "@/components/user/UserHeadline/UserHeadline";
import Loader from "@/components/Loader";
import SuspenseLoader from "@/components/SuspenseLoader";

interface Practice {
  current_module_name: string;
  current_stage_id: number;
  current_stage_name: string;
  stage_slug: string;
  description: string;
  complete: number;
}

export default function MyPractice() {
  // console.log(recieverNumber , 'yo')
  const breadCrumbData = [
    { name: "Dashboard", to: "/dashboard" },
    { name: "My Practice", to: "/my_practice" },
  ];

  const [loading, setLoading] = useState(true);
  const [practiceData, setPracticeData] = useState<Practice[]>([]);

  const router = useRouter()

  const modules = {
    current: {
      title: "Basics of JavaScript",
      description:
        "Learn the core concepts of JS — variables, loops, and functions.",
      progress: 64,
      color: "bg-purple-700",
    },
    next: {
      title: "Intermediate Logic & Functions",
      description:
        "Explore ES6+, arrow functions, and modular programming patterns.",
      color: "from-blue-500 to-yellow-400",
    },
  };

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
              <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                {/* Current Module */}
                {practiceData.map((item, index) => (
                  <div className="relative p-8 rounded-2xl bg-purple-500 border border-purple-600 shadow-[0_0_25px_rgba(255,255,255,0.1)] hover:shadow-[0_0_40px_rgba(236,72,153,0.4)] transition-all">
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
                    <p className="text-gray-100 mb-6">
                      {item?.description}
                    </p>

                    {/* Progress Bar */}
                    <div className="w-full h-2 bg-purple-200 rounded-full overflow-hidden">
                      <div
                        className={`h-full bg-purple-700`}
                        style={{ width: `${item?.complete}%` }}
                      ></div>
                    </div>
                    <div className="flex justify-end mt-5">
                      <button onClick={()=>router.push(`/practice/${item.stage_slug}/${item.current_stage_id}}`)} disabled={item?.complete == 100} className="px-8 py-2 bg-white rounded-md font-semibold drop-shadow-sm drop-shadow-purple-400 border border-purple-400 relative overflow-clip group">
                        <span className="relative z-10 text-white group-hover:text-black duration-300">
                          {item.complete == 100 ? "Completed" : "Resume"}
                        </span>
                        <div className="size-full absolute top-0 left-0 bg-violet-700 group-hover:translate-x-full duration-300"></div>
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          </div>
        </div>
      </Suspense>
    </>
  );
}
