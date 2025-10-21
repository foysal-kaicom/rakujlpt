import Link from "next/link";

import WebpageWrapper from "../wrapper/WebpageWrapper";

import Image from "next/image";

export default function HomeMockTest() {
  return (
    <>
      <WebpageWrapper>
        <div className="relative bg-gradient-to-r from-sky-300/40 to-indigo-300/40 text-[#173fa4] rounded-xl overflow-hidden px-8 py-4 lg:px-16 flex flex-col lg:flex-row justify-between items-center gap-8 shadow-md hover:shadow-lg transition-shadow duration-500">
          {/* Animated Floating Orbs */}
          <div className="absolute -top-20 -left-20 w-56 h-56 rounded-full bg-white/90 blur-3xl"></div>
          <div className="absolute -bottom-24 -right-24 w-72 h-72 rounded-full bg-white/80 blur-3xl"></div>
          <div className="absolute top-10 right-10 w-32 h-32 rounded-full bg-white blur-2xl"></div>

          <div className="relative z-10 lg:max-w-1/2 text-center lg:text-left mt-10 lg:mt-0">
            <h1 className="text-xl sm:text-3xl lg:text-4xl xl:text-5xl font-semibold mb-4">
              📝 Boost Your Japanese Skills!
            </h1>
            <p className="text-sm sm:text-base mb-6 text-[#173fa4]">
              Take interactive mock tests for JPT (N5 & N4). Track your
              progress, improve fast, and achieve your goals!
            </p>
            <Link
              href="/mock_test_select"
              className="px-5 sm:px-10 py-1.5 lg:py-2.5 rounded-lg text-white bg-[#173fa4] text-xs sm:text-sm md:text-base font-bold shadow-lg hover:scale-105 hover:shadow-xl transition-transform duration-300 animate-pulse"
            >
              Take Mock Test
            </Link>
          </div>

          <div className="w-full sm:w-[300px] 2xl:w-[400px]">
            <Image
              src="/assets/img/mocktest/t13.png"
              alt="Mock Test Illustration"
              height={400}
              width={400}
              className="w-full"
            />
          </div>
        </div>
      </WebpageWrapper>
    </>
  );
}
