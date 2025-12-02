"use client";

import { useEffect, useState, useRef } from "react";
import { BookOpen, Sparkles, Rocket } from "lucide-react";
import Link from "next/link";
import axiosInstance from "@/utils/axios";
import { toast } from "sonner";
import BreadCrumb from "@/components/BreadCrumb";
import PracticeSkeleton from "./PracticeSkeleton";
import Image from "next/image";

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

  const practiceLevelRef = useRef<HTMLDivElement | null>(null);

  const scrollToPractice = () => {
    practiceLevelRef.current?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  };

  const [loader, setLoader] = useState(true);
  const [practiceTestsData, setPracticeTestsData] = useState<Roadmap[]>([]);

  useEffect(() => {
    const fetchRoadmaps = async () => {
      try {
        const response = await axiosInstance.get(`/roadmaps`);
        if (response?.data?.success) {
          setPracticeTestsData(response.data.data);
        }
      } catch (error: any) {
        toast.error("Cannot fetch Roadmaps right now");
      } finally {
        setLoader(false);
      }
    };
    fetchRoadmaps();
  }, []);

  return (
    <>
      {loader && <PracticeSkeleton />}

      {/* MAIN SECTION */}
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-pink-50 to-purple-50 relative overflow-hidden">
        {/* Soft Blobs */}
        <div className="absolute w-80 h-80 bg-pink-200 opacity-40 blur-[120px] rounded-full top-[10%] left-[10%]" />
        <div className="absolute w-96 h-96 bg-blue-200 opacity-40 blur-[140px] rounded-full bottom-[10%] right-[5%]" />
        <div className="absolute w-72 h-72 bg-purple-200 opacity-40 blur-[150px] rounded-full top-[40%] left-1/2 -translate-x-1/2" />

        <div className="container mx-auto px-4 lg:px-8 relative z-10 py-14">
          <BreadCrumb breadCrumbData={breadCrumbData} />

          {/* HERO SECTION */}
          <div className="mt-6 text-center">
            <span className="inline-flex items-center gap-2 px-4 py-2 bg-white/70 backdrop-blur-md border border-white/40 rounded-full text-pink-600 text-sm font-medium shadow">
              <Sparkles className="w-4 h-4" />
              STUDENT PRACTICE ZONE
            </span>

            <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 mt-6 leading-tight">
              Master Your Skills with
              <span className="bg-gradient-to-r from-blue-600 to-purple-600 text-transparent bg-clip-text">
                {" "}
                Interactive Practice Tests
              </span>
            </h1>

            <p className="text-gray-600 max-w-2xl mx-auto mt-4 text-lg">
              Boost your confidence, improve accuracy, and get ready for the
              real exam.
            </p>

            <button
              onClick={scrollToPractice}
              className="mt-8 px-10 py-4 text-lg bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-full font-semibold shadow-lg hover:shadow-xl transition-all hover:-translate-y-1 cursor-pointer"
            >
              Practice Free
            </button>

            {/* Hero Illustration */}
            <div className="flex justify-center mt-10" ref={practiceLevelRef}>
              <div className="p-6 bg-white shadow-lg border border-gray-100 rounded-2xl">
                <Rocket className="w-20 h-20 text-blue-500 animate-bounce" />
              </div>
            </div>
          </div>

          {/* PRACTICE LEVEL SECTION */}
          <div className="mt-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">
              Choose Your Practice Roadmap
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mt-8">
              {practiceTestsData.map((test, index) => (
                <div
                  key={index}
                  className="group bg-white rounded-2xl p-6 shadow-[0_10px_40px_rgba(0,0,0,0.08)] hover:shadow-[0_10px_60px_rgba(0,0,0,0.12)] transition-all hover:-translate-y-2 border border-blue-100"
                >
                  <div className="flex justify-center mb-4">
                    {test.image ? (
                      <div className="p-5 bg-blue-100 rounded-xl shadow group-hover:bg-blue-200 transition-all">
                        <Image src={test.image} alt="" className="w-12 h-12" />
                      </div>
                    ) : (
                      <div className="p-5 bg-blue-100 rounded-xl shadow group-hover:bg-blue-200 transition-all">
                        <BookOpen className="w-12 h-12 text-blue-600" />
                      </div>
                    )}
                  </div>

                  <h3 className="text-xl font-bold text-gray-900 text-center">
                    {test.title}
                  </h3>

                  <p className="text-gray-600 text-center mt-2 min-h-20">
                    {test.description}
                  </p>

                  <div className="mt-4 text-center text-blue-600 font-medium text-sm">
                    {test.total_stages} Stages Included
                  </div>

                  <Link href={`/practice/${test.slug}`}>
                    <button className="mt-6 w-full py-3 bg-blue-500 text-white rounded-xl font-semibold shadow-md hover:shadow-lg transition-all cursor-pointer">
                      Start Now
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
