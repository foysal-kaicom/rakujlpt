"use client";
import { useEffect, useState } from "react";
import { BookOpen } from "lucide-react";
import Link from "next/link";
import axiosInstance from "@/utils/axios";
import { toast } from "sonner";
import BreadCrumb from "@/components/BreadCrumb";

interface Roadmap {
  id: number;
  slug: string;
  title: string;
  image: string;
  description: string;
  total_stages: string;
}

export default function Practice() {
  const breadCrumbData = [
    { name: "Home", to: "/" },
    { name: "Practice", to: "/practice" },
  ];

  const [loader, setLoader] = useState(false);
  const practiceTests = [
    {
      name: "JLPT N5",
      icon: "N5",
      description:
        "Basic Japanese proficiency. Perfect for beginners starting their language journey.",
      duration: "45 min",
      questions: "60",
      difficulty: 1,
      color: "bg-green-500",
      link: "/practice/jlpt-n5",
      slug: "jlpt-n5",
    },
    {
      name: "JLPT N4",
      icon: "N4",
      description:
        "Elementary level Japanese. Understanding basic everyday conversations.",
      duration: "60 min",
      questions: "80",
      difficulty: 2,
      color: "bg-blue-500",
      link: "/practice/jlpt-n4",
      slug: "jlpt-n4",
    },
    {
      name: "JLPT N3",
      icon: "N3",
      description:
        "Intermediate Japanese. Comprehending everyday situations and written materials.",
      duration: "90 min",
      questions: "100",
      difficulty: 3,
      color: "bg-yellow-500",
      link: "/practice/jlpt-n3",
      slug: "jlpt-n3",
    },
    {
      name: "JLPT N2",
      icon: "N2",
      description:
        "Upper intermediate level. Understanding materials on general topics.",
      duration: "120 min",
      questions: "120",
      difficulty: 4,
      color: "bg-orange-500",
      link: "/practice/jlpt-n2",
      slug: "jlpt-n2",
    },
    {
      name: "JLPT N1",
      icon: "N1",
      description:
        "Advanced Japanese. Understanding complex texts and abstract topics.",
      duration: "150 min",
      questions: "140",
      difficulty: 5,
      color: "bg-red-500",
      link: "/practice/jlpt-n1",
      slug: "jlpt-n1",
    },
    {
      name: "JPT",
      icon: "JPT",
      description:
        "Japanese Proficiency Test. Comprehensive evaluation of practical Japanese skills.",
      duration: "120 min",
      questions: "100",
      difficulty: 4,
      color: "bg-purple-500",
      link: "/practice/jpt",
      slug: "jpt",
    },
  ];

  const [practiceTestsData, setPracticeTestsData] = useState<Roadmap[]>([]);

  useEffect(() => {
    const fetchRoadmaps = async () => {
      try {
        setLoader(true);
        const response = await axiosInstance.get(`/roadmaps`);
        if (response?.data?.success) {
          setPracticeTestsData(response.data.data);
        }
        // toast.success(response?.data?.message || "Roadmaps loaded!");
      } catch (error: any) {
        toast.error(
          error?.response?.data?.message || "Cannot fetch Roadmaps right now"
        );
      } finally {
        setLoader(false);
      }
    };

    fetchRoadmaps();
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
        <div className="container mx-auto px-4 lg:px-8 relative mb-6">
          <BreadCrumb breadCrumbData={breadCrumbData} />
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          {/* Header Section */}
          <div className="mb-12">
            <div className="bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-3xl p-8 md:p-12 shadow-xl relative overflow-hidden">
              <div className="absolute top-0 right-0 w-64 h-64 bg-white opacity-10 rounded-full -mr-32 -mt-32"></div>
              <div className="absolute bottom-0 left-0 w-48 h-48 bg-white opacity-10 rounded-full -ml-24 -mb-24"></div>

              <div className="relative z-10 md:w-2/3 lg:w-1/2">
                <p className="text-blue-100 text-sm font-semibold tracking-wide uppercase mb-2">
                  Practice Skills
                </p>
                <h1 className="text-4xl md:text-5xl font-bold mb-4">
                  Take a full length practice tests
                </h1>
                <p className="text-blue-100 mb-6">
                  Improve your language skills with our comprehensive practice
                  exercises
                </p>
                <button className="bg-white text-blue-600 px-8 py-3 rounded-full font-semibold hover:bg-blue-50 transition-all shadow-lg hover:shadow-xl transform hover:-translate-y-0.5">
                  PRACTICE FREE
                </button>
              </div>

              {/* Illustration */}
              <div className="absolute right-8 top-1/2 -translate-y-1/2 hidden lg:block">
                <div className="bg-white bg-opacity-20 backdrop-blur-sm rounded-2xl p-6 transform rotate-3 hover:rotate-0 transition-transform">
                  <div className="bg-yellow-400 rounded-xl p-4 w-32 h-32 flex items-center justify-center">
                    <BookOpen className="w-16 h-16 text-white" />
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Practice Cards Grid */}
          <div className="mb-12">
            <h2 className="text-3xl font-bold text-gray-800 mb-8">
              Choose Your Practice Level
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {practiceTestsData.map((test, index) => (
                <div
                  key={index}
                  className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 border border-gray-100 group relative"
                >
                  {/* <div
                    className={`w-16 h-16 rounded-xl ${test.color} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}
                  >
                    <span className="text-2xl font-bold text-white">
                      {test.icon}
                    </span>
                  </div> */}

                  <h3 className="text-2xl font-bold text-gray-800 mb-2">
                    {test.title}
                  </h3>
                  <p className="text-gray-600 mb-4 min-h-20">{test.description}</p>

                  <div className="flex items-center gap-4 mb-4 text-sm text-gray-500">
                    {/* <span className="flex items-center gap-1">
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
                      0
                    </span> */}
                    <span className="flex items-center gap-1">
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
                          d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                        />
                      </svg>
                      {test.total_stages} Stages
                    </span>
                  </div>

                  {/* <div className="mb-6">
                    <p className="text-xs text-gray-500 mb-2">
                      Difficulty Level
                    </p>
                    <div className="flex gap-1">
                      {[1, 2, 3, 4, 5].map((level) => (
                        <div
                          key={level}
                          className={`h-2 flex-1 rounded-full ${
                            level <= test.difficulty
                              ? test.color.replace("bg-", "bg-opacity-100 bg-")
                              : "bg-gray-200"
                          }`}
                        ></div>
                      ))}
                    </div>
                  </div> */}

                  <Link href={`/practice/${test.slug}`} className="">
                    <button
                      className={`w-full bg-blue-500 text-white py-3 rounded-xl font-semibold hover:opacity-90 transition-all shadow-md hover:shadow-lg cursor-pointer`}
                    >
                      View Roadmap
                    </button>
                  </Link>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
