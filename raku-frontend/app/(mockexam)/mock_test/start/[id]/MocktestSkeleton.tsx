import { useState, useEffect } from "react";

import { FaClock } from "react-icons/fa";
import Image from "next/image";

export default function SkeletonMockExam({ isCountingDown }: any) {
  const [counter, setCounter] = useState(5);
  const [launched, setLaunched] = useState(false);

  useEffect(() => {
    if (!isCountingDown) return;

    setCounter(5);

    const interval = setInterval(() => {
      setCounter((prev) => {
        if (prev === 1) {
          clearInterval(interval);
          setLaunched(true);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [isCountingDown]);

  return (
    <div className="min-h-screen bg-linear-to-br from-purple-50 to-indigo-100">
      {/* Header */}
      <div className="bg-white shadow-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex flex-col md:flex-row gap-5 justify-between md:items-center">
          <div className="h-6 w-64 bg-gray-200 rounded"></div>
          <div className="flex items-center space-x-2 bg-red-100 px-4 py-2 rounded-lg">
            <FaClock className="w-5 h-5 text-red-400" />
            <div className="h-5 w-16 bg-gray-200 rounded"></div>
          </div>
        </div>
      </div>

      {/* Steps */}
      <div className="flex space-x-3 overflow-x-auto bg-white border-b shadow-sm px-4 py-3 justify-center items-center">
        {Array.from({ length: 4 }).map((_, idx) => (
          <div key={idx} className="h-8 w-24 bg-gray-200 rounded-lg"></div>
        ))}
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Sidebar */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-xl shadow-lg p-6 sticky top-6">
            <div className="h-5 w-32 bg-gray-200 rounded mb-4"></div>
            <div className="p-4 bg-gray-200 rounded-lg mb-4 h-16"></div>
            <div className="p-3 bg-gray-100 rounded-lg h-12 mb-6"></div>
            <div className="mt-6 space-y-2">
              <div className="h-4 w-28 bg-gray-200 rounded"></div>
              <div className="h-2 w-full bg-gray-200 rounded-full"></div>
              <div className="h-3 w-20 bg-gray-200 rounded"></div>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="lg:col-span-3">
          {/* header */}
          <div className="bg-white rounded-xl shadow-lg">
            <div className="bg-linear-to-r from-purple-200 to-indigo-200 p-6 rounded-t-xl">
              <div className="h-6 w-48 bg-gray-200 rounded mb-2"></div>
              <div className="h-4 w-64 bg-gray-200 rounded"></div>
            </div>
          </div>

          {/* questions */}
          <div className="p-8 bg-white space-y-8">
            {Array.from({ length: 2 }).map((_, idx) => (
              <div key={idx} className=" space-y-4">
                <div className="h-5 w-3/4 bg-gray-200 rounded"></div>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-2">
                  {Array.from({ length: 4 }).map((_, i) => (
                    <div
                      key={i}
                      className="h-10 w-full bg-gray-200 rounded-lg"
                    ></div>
                  ))}
                </div>
              </div>
            ))}
          </div>

          {/* navigation */}
          <div className="bg-gray-50 px-8 py-6 rounded-b-xl border-t flex justify-between items-center">
            <div className="h-10 w-28 bg-gray-200 rounded"></div>
            <div className="flex space-x-4">
              <div className="h-10 w-32 bg-gray-200 rounded"></div>
            </div>
          </div>
        </div>
      </div>
      <div className="fixed inset-0 p-5 flex justify-center items-center bg-white/30 backdrop-blur-xs">
        <div
          className={`max-w-md w-full bg-gradient-to-br from-violet-500 to-purple-600 shadow-2xl shadow-violet-500/30 rounded-2xl px-10 py-12 text-center flex flex-col items-center gap-4 `}
        >
          <div className="relative h-20 flex items-center justify-center overflow-hidden">
            <div className="flex items-center justify-center w-14 h-14 rounded-full bg-white/20">
              <div
                className={`absolute flex flex-col items-center ${launched ? "animate-rocket-launch" : "shake-pause"}`}
              >
                <Image
                  src="/assets/icon/rocket.png"
                  height={54}
                  width={54}
                  alt=""
                  className="relative z-10"
                />
                <div
                  className={`rocket-flame ${launched ? "flame-launch" : "flame-idle"}`}
                />
              </div>
            </div>
          </div>
          <div className="text-xl font-semibold mt-2 text-white">
            Starting in <span className="text-2xl font-bold">{counter}</span>s
          </div>
        </div>
      </div>
    </div>
  );
}
