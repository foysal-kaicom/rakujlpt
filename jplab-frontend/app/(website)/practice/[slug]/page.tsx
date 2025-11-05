"use client";

import axiosInstance from "@/utils/axios";
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
}
export default function Roadmap() {
  const breadCrumbData = [
    { name: "Home", to: "/" },
    { name: "Roadmap", to: "/roadmap" },
  ];

  const params = useParams();
  const slug = params.slug;

  const roadmapData = [
    {
      id: 1,
      title: "Hiragana Basics",
      details: "Learn the fundamental Japanese syllabary - Hiragana characters",
      lessons: 5,
      xp: 100,
      status: "completed",
    },
    {
      id: 2,
      title: "Katakana Basics",
      details: "Master Katakana for foreign words and names",
      lessons: 5,
      xp: 100,
      status: "completed",
    },
    {
      id: 3,
      title: "Basic Greetings",
      details: "Essential phrases for daily conversations",
      lessons: 8,
      xp: 150,
      status: "current",
    },
    {
      id: 4,
      title: "Numbers & Counting",
      details: "Learn to count and use numbers in Japanese",
      lessons: 6,
      xp: 120,
      status: "locked",
    },
    {
      id: 5,
      title: "Family & People",
      details: "Vocabulary for family members and relationships",
      lessons: 7,
      xp: 140,
      status: "locked",
    },
    {
      id: 6,
      title: "Basic Kanji",
      details: "Introduction to common Chinese characters",
      lessons: 10,
      xp: 200,
      status: "locked",
    },
    {
      id: 7,
      title: "Food & Dining",
      details: "Order food and discuss meals in Japanese",
      lessons: 8,
      xp: 160,
      status: "locked",
    },
    {
      id: 8,
      title: "Travel & Directions",
      details: "Navigate and ask for directions",
      lessons: 9,
      xp: 180,
      status: "locked",
    },
  ];

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
            if(response?.data?.success){
              setStagesData(response.data.data);
            }
            toast.success(response?.data?.message || "Stages loaded!");
          } catch (error: any) {
            toast.error(
              error?.response?.data?.message ||
                "Cannot fetch Stages right now"
            );
          } finally {
            setLoader(false);
          }
        };
    
        fetchStages();
      }, []);

  return (
    <>
      {loader && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-md flex items-center justify-center z-50">
          <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-blue-500"></div>
        </div>
      )}
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 pb-20 pt-8 relative overflow-hidden">
        {/* Background Decorations */}
        <div className="absolute top-20 -left-20 w-64 h-64 bg-gradient-to-br from-cyan-200 to-blue-200 rounded-full opacity-20 blur-3xl"></div>
        <div className="absolute bottom-20 -right-20 w-96 h-96 bg-gradient-to-br from-purple-200 to-pink-200 rounded-full opacity-20 blur-3xl"></div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          {/* Breadcrumb */}
          <div className="flex items-center gap-2 text-sm text-gray-600 mb-8">
            {breadCrumbData.map((item, index) => (
              <div key={index} className="flex items-center gap-2">
                <a
                  href={item.to}
                  className="hover:text-blue-600 transition-colors"
                >
                  {item.name}
                </a>
                {index < breadCrumbData.length - 1 && <span>/</span>}
              </div>
            ))}
          </div>

          {/* Header */}
          <div className="text-center mb-16">
            <h1 className="text-5xl font-bold text-gray-800 mb-4">
              Japanese Learning Path
            </h1>
            <p className="text-xl text-gray-600">
              Master Japanese step by step 🇯🇵
            </p>
          </div>

          {/* Roadmap */}
          <div className="relative max-w-2xl mx-auto">
            {stagesData.map((stage, index) => {
              const isEven = index % 2 === 0;
              const isLast = index === stagesData.length - 1;

              return (
                <div key={stage.id} className="relative mb-8">
                  {/* Connecting Path */}
                  {!isLast && (
                    <div
                      className={`absolute ${
                        isEven ? "left-1/2" : "right-1/2"
                      } top-32 w-1 h-20 bg-gradient-to-b ${
                        stage.stage_status === "completed"
                          ? "from-green-400 to-green-300"
                          : stage.stage_status === "current"
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
                        className={`relative bg-white rounded-2xl shadow-lg p-6 border-4 ${
                          stage.stage_status === "current"
                            ? "border-yellow-400 animate-pulse"
                            : stage.stage_status === "completed"
                            ? "border-green-400"
                            : "border-gray-200"
                        } cursor-pointer transition-all duration-300 ${
                          stage.stage_status === "locked"
                            ? "opacity-60"
                            : "opacity-100"
                        }`}
                      >
                        {/* Stage Number Badge */}
                        <Link
                          href={
                            stage.stage_status !== "locked"
                              ? `/practice/${slug}/${stage.id}`
                              : "#"
                          }
                        >
                          <div
                            className={`absolute -top-4 -right-4 w-14 h-14 rounded-full bg-gradient-to-br ${getStatusColor(
                              stage.stage_status
                            )} flex items-center justify-center text-white text-xl font-bold shadow-lg transform transition-transform duration-300 ${
                              hoveredStage === stage.id
                                ? "rotate-12 scale-110"
                                : "rotate-0 scale-100"
                            }`}
                          >
                            {getStatusIcon(stage.stage_status)}
                          </div>
                        </Link>

                        <div className="flex items-start gap-4">
                          {/* Icon */}
                          <div
                            className={`w-16 h-16 rounded-xl bg-gradient-to-br ${getStatusColor(
                              stage.stage_status
                            )} flex items-center justify-center text-3xl shadow-md`}
                          >
                            {stage.stage_status === "completed"
                              ? "✨"
                              : stage.stage_status === "current"
                              ? "📚"
                              : "🔐"}
                          </div>

                          {/* Content */}
                          <div className="flex-1">
                            <h3 className="text-xl font-bold text-gray-800 mb-2">
                              {stage.title}
                            </h3>
                            {/* <p className="text-gray-600 text-sm mb-3">
                              {stage.details}
                            </p> */}
                            <div className="flex items-center gap-4 text-sm">
                              <span className="flex items-center gap-1 text-gray-500">
                                📖 {stage.total_questions} questions
                              </span>
                            </div>
                          </div>
                        </div>

                        {/* Progress Bar for Current */}
                        {stage.stage_status === "current" && (
                          <div className="mt-4 bg-gray-200 rounded-full h-2 overflow-hidden">
                            <div
                              className="h-full bg-gradient-to-r from-yellow-400 to-amber-500 rounded-full transition-all duration-500"
                              style={{
                                width: "60%",
                                animation: "shimmer 2s ease-in-out infinite",
                              }}
                            ></div>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Center Circle */}
                  <div className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2">
                    <div
                      className={`w-6 h-6 rounded-full bg-gradient-to-br ${getStatusColor(
                        stage.stage_status
                      )} shadow-lg border-4 border-white transition-all duration-300 ${
                        hoveredStage === stage.id ? "scale-150" : "scale-100"
                      }`}
                    ></div>
                  </div>
                </div>
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
    </>
  );
}
