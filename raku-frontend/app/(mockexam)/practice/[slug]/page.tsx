"use client";

import BreadCrumb from "@/components/BreadCrumb";
import axiosInstance from "@/utils/axios";
import Image from "next/image";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "sonner";

interface Stage {
  id: number;
  slug: string;
  title: string;
  image: string;
  order: number;
  total_questions: number;
  stage_status: string;
  duration: number | null;
}
export default function Roadmap() {
  const breadCrumbData = [
    { name: "Home", to: "/" },
    { name: "Practice", to: "/practice" },
    { name: "Roadmap", to: "/practice/roadmap" },
  ];

  const params = useParams();
  const slug = params.slug;

  const [loader, setLoader] = useState(false);
  const [hoveredStage, setHoveredStage] = useState<number | null>(null);

  const getStatusColor = (status: string) => {
    switch (status) {
      case "completed":
        return "from-green-400 to-emerald-500";
      case "current":
        return "from-yellow-400 to-amber-500";
      default:
        return "from-gray-300 to-gray-400";
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "completed":
        return "✓";
      case "current":
        return "→";
      default:
        return "🔒";
    }
  };

  const [stagesData, setStagesData] = useState<Stage[]>([]);

  useEffect(() => {
    const fetchStages = async () => {
      try {
        setLoader(true);
        const response = await axiosInstance.get(`/roadmaps/${slug}/stages`);
        if (response?.data?.success) {
          setStagesData(response.data.data);
        }
        // toast.success(response?.data?.message || "Stages loaded!");
      } catch (error: any) {
        toast.error(
          error?.response?.data?.message || "Cannot fetch Stages right now"
        );
      } finally {
        setLoader(false);
      }
    };

    fetchStages();
  }, []);

  return (
    <div className="bg-[url('/assets/practice/bg-1.jpg')]">
      {loader && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-md flex items-center justify-center z-50">
          <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-blue-500"></div>
        </div>
      )}
      <div className=" px-4 lg:px-8 sticky top-0 z-20 py-5  bg-gradient-to-tr from-blue-50/80 via-white/80 to-purple-50/80">
        <div className="container mx-auto flex justify-between ">
          <Link href="/">
            <button className="px-5 py-2 rounded-2xl font-medium text-sm lg:text-base bg-linear-to-r from-blue-600 to-purple-600 text-white drop-shadow-sm drop-shadow-violet-600 border-b border-white/50 hover:scale-110 duration-400 ease-linear cursor-pointer">
              Home
            </button>
          </Link>

          <Link href="/practice">
            <button className="size-10 rounded-full font-medium text-sm lg:text-base bg-linear-to-r from-red-600 to-pink-600 text-white drop-shadow-sm drop-shadow-pink-600 border-b border-white/50 hover:rotate-360 duration-700 ease-in-out cursor-pointer">
              X
            </button>
          </Link>
        </div>
      </div>
      <div className="min-h-screen bg-gradient-to-br from-blue-50/80 via-white/80 to-purple-50/80 pb-20 pt-3 relative overflow-hidden">
        {/* Background Decorations */}
        <div className="absolute top-20 -left-20 w-64 h-64 bg-gradient-to-br from-cyan-200 to-blue-200 rounded-full opacity-20 blur-3xl"></div>
        <div className="absolute bottom-20 -right-20 w-96 h-96 bg-gradient-to-br from-purple-200 to-pink-200 rounded-full opacity-20 blur-3xl"></div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          {/* Header */}
          <div className="text-center mb-16">
            <h1 className="text-4xl xl:text-5xl font-bold text-gray-800 mb-4">
              Japanese Learning Path
            </h1>
            <p className="text-xl text-gray-600">
              Master Japanese step by step 🇯🇵
            </p>
          </div>

          {/* Roadmap */}
          <div className="relative max-w-2xl mx-auto px-3 md:px-0">
            {stagesData.map((stage, index) => {
              const isEven = index % 2 === 0;
              const isLast = index === stagesData.length - 1;
              const stagStatus =
                index === 0 && stage.stage_status != "completed"
                  ? "current"
                  : stage.stage_status;

              return (
                <Link
                  key={stage.id}
                  href={
                    stagStatus !== "locked"
                      ? `/practice/${slug}/${stage.slug}/${stage.id}`
                      : "#"
                  }
                  title={stage.title}
                >
                  <div className="relative mb-8">
                    {/* Connecting Path */}
                    {!isLast && (
                      <div
                        className={`absolute ${
                          isEven ? "left-1/2" : "right-1/2"
                        } top-32 w-1 h-20 bg-gradient-to-b ${
                          stagStatus === "completed"
                            ? "from-green-400 to-green-300"
                            : stagStatus === "current"
                            ? "from-yellow-400 to-yellow-300"
                            : "from-gray-300 to-gray-200"
                        } transform transition-all duration-500`}
                        style={{
                          animation:
                            stage.stage_status === "completed"
                              ? "flowDown 2s ease-in-out infinite"
                              : "none",
                        }}
                      ></div>
                    )}

                    {/* Stage Container */}
                    <div
                      className={`flex items-center ${
                        isEven ? "justify-start" : "justify-end"
                      }`}
                    >
                      <div
                        className={`w-full md:w-5/12 transform transition-all duration-300 ${
                          hoveredStage === stage.id ? "scale-105" : "scale-100"
                        }`}
                        onMouseEnter={() => setHoveredStage(stage.id)}
                        onMouseLeave={() => setHoveredStage(null)}
                      >
                        {/* Stage Card */}
                        <div
                          className={`relative  rounded-2xl shadow-lg p-6 border-4 ${
                            stagStatus === "current"
                              ? "border-yellow-400"
                              : stagStatus === "completed"
                              ? "border-green-400"
                              : "border-gray-200"
                          } cursor-pointer transition-all duration-300 ${
                            stagStatus === "locked" ? "bg-zinc-50" : "bg-white"
                          }`}
                        >
                          <div
                            className={`absolute -top-4 -right-4 w-14 h-14 rounded-full bg-gradient-to-br ${getStatusColor(
                              stagStatus
                            )} flex items-center justify-center text-white text-xl font-bold shadow-lg transform transition-transform duration-300 ${
                              hoveredStage === stage.id
                                ? "scale-110"
                                : "scale-100"
                            }`}
                          >
                            <div
                              className={`transform transition-transform duration-300 ${
                                hoveredStage === stage.id
                                  ? "rotate-360"
                                  : "rotate-0"
                              }`}
                            >
                              {getStatusIcon(stagStatus)}
                            </div>
                          </div>
                          {/* </Link> */}

                          <div className="flex items-start gap-4">
                            {/* Icon */}
                            <div
                              className={`w-16 h-16 rounded-xl bg-gradient-to-br ${getStatusColor(
                                stagStatus
                              )} flex items-center justify-center text-3xl shadow-md`}
                            >
                              {stagStatus === "locked" ? (
                                "🔐"
                              ) : stage.image ? (
                                <Image
                                  src={stage.image}
                                  className=""
                                  width={60}
                                  height={60}
                                  alt={stage.title}
                                  loading="lazy"
                                />
                              ) : (
                                "📍"
                              )}
                            </div>

                            {/* Content */}
                            <div className="flex-1">
                              <h3 className="text-xl font-bold text-gray-800 mb-2">
                                {stage.title}
                              </h3>
                              {/* <p className="text-gray-600 text-sm mb-3">
                              {stage.details}
                            </p> */}
                              <div className=" gap-4 text-sm">
                                <span className="flex items-center gap-1 text-gray-500">
                                  📖 {stage.total_questions} questions
                                </span>
                                {stage.duration !== null && (
                                  <span className="flex items-center text-gray-500 gap-1">
                                    <svg
                                      className="w-4 h-4"
                                      fill="none"
                                      stroke="currentColor"
                                      viewBox="0 0 24 24"
                                    >
                                      <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                                      />
                                    </svg>
                                    {stage.duration} min
                                  </span>
                                )}
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Center Circle */}
                    <div className="absolute left-1/2 top-0 md:top-1/2 transform -translate-x-1/2 -translate-y-1/2">
                      <div
                        className={`w-6 h-6 rounded-full bg-gradient-to-br ${getStatusColor(
                          stage.stage_status
                        )} shadow-lg border-4 border-white transition-all duration-300 ${
                          hoveredStage === stage.id ? "scale-150" : "scale-100"
                        } ${stage?.stage_status == 'current' ? "animate-ping" : ""}`}
                      ></div>
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes flowDown {
          0%,
          100% {
            opacity: 0.5;
          }
          50% {
            opacity: 1;
          }
        }
        @keyframes shimmer {
          0% {
            background-position: -100% 0;
          }
          100% {
            background-position: 200% 0;
          }
        }
      `}</style>
    </div>
  );
}
