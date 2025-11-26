import type { Metadata } from "next";
import { Suspense } from "react";

import { FaBook, FaLaptop, FaSmileBeam } from "react-icons/fa";

// Components
import BreadCrumb from "@/components/BreadCrumb";
import WebpageWrapper from "@/components/wrapper/WebpageWrapper";
import SuspenseLoader from "@/components/SuspenseLoader";
import Link from "next/link";

// Metadata
export const metadata: Metadata = {
  title: "About Raku",
  description: "Raku is your all-in-one platform for JPT, JLPT, and NAT exam prep with practice tests, study tools, and personalized learning for Japanese language proficiency.Master Japanese with Raku — a complete language proficiency platform providing JPT, JLPT, and NAT exam prep, mock tests, smart analytics, and step-by-step learning for every level.",
};

export default function AboutJPT() {
  const breadCrumbData = [
    { name: "Home", to: "/" },
    { name: "About Mock Test", to: "/about_jpt" },
  ];
  return (
    <>
      <Suspense fallback={<SuspenseLoader />}>
        <section className="relative bg-gradient-to-br from-blue-50 via-pink-50 to-purple-100 text-gray-900 pt-5 pb-28 overflow-hidden">
          {/* Background funky shapes */}
          <div className="absolute -top-16 -left-16 w-60 h-60 bg-yellow-200/30 rounded-full filter blur-3xl animate-bounce-slow"></div>
          <div className="absolute -bottom-24 -right-16 w-96 h-96 bg-pink-200/30 rounded-full filter blur-3xl animate-pulse-slow"></div>

          <WebpageWrapper>
            <BreadCrumb breadCrumbData={breadCrumbData} />

            <div className="flex flex-col-reverse lg:flex-row items-center gap-12 relative z-10 pt-15">
              {/* Left content */}
              <div className="lg:w-1/2 space-y-6">
                <h2 className="text-4xl sm:text-5xl font-extrabold leading-snug bg-clip-text text-transparent bg-gradient-to-r from-indigo-500 via-pink-400 to-purple-500 animate-gradient-x">
                  Your Exciting Journey to Japan Starts Here!
                </h2>
                <p className="text-lg sm:text-xl text-gray-700/90">
                  Dreaming of Japan? Start here! Enjoy interactive lessons,
                  track your progress, and prepare for{" "}
                  <span className="font-bold text-indigo-500">
                    JPT & JLPT with RakuJLPT
                  </span>{" "}
                  —your perfect study partner.
                </p>

                {/* Funky feature cards */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mt-6 pb-8">
                  <div className="bg-white/60 backdrop-blur-md rounded-3xl p-6 flex flex-col items-center text-center shadow-lg transform hover:-translate-y-2 hover:rotate-1 transition-all duration-300">
                    <FaBook
                      size={32}
                      className="mb-3 text-yellow-400 animate-bounce"
                    />
                    <h3 className="font-bold text-lg text-gray-900">
                      Mock Tests
                    </h3>
                    <p className="text-gray-800/80 mt-1 text-sm">
                      Fun practice anytime, anywhere!
                    </p>
                  </div>
                  <div className="bg-white/60 backdrop-blur-md rounded-3xl p-6 flex flex-col items-center text-center shadow-lg transform hover:-translate-y-2 hover:-rotate-1 transition-all duration-300">
                    <FaLaptop
                      size={32}
                      className="mb-3 text-pink-400 animate-bounce"
                    />
                    <h3 className="font-bold text-lg text-gray-900">
                      Easy Subscription
                    </h3>
                    <p className="text-gray-800/80 mt-1 text-sm">
                      Plans that fit your learning style!
                    </p>
                  </div>
                  <div className="bg-white/60 backdrop-blur-md rounded-3xl p-6 flex flex-col items-center text-center shadow-lg transform hover:-translate-y-2 hover:rotate-1 transition-all duration-300">
                    <FaSmileBeam
                      size={32}
                      className="mb-3 text-green-400 animate-bounce"
                    />
                    <h3 className="font-bold text-lg text-gray-900">
                      Track Progress
                    </h3>
                    <p className="text-gray-800/80 mt-1 text-sm">
                      See your improvement in real time!
                    </p>
                  </div>
                </div>

                <Link
                  href="/mock_test_select"
                  className="bg-gradient-to-r from-pink-500 to-purple-500 px-8 py-3 rounded-3xl font-bold text-white shadow-lg hover:shadow-xl transition-all duration-300 border border-white"
                >
                  Start Practicing Now
                </Link>
              </div>

              {/* Right funky illustration */}
              <div className="lg:w-1/2 flex justify-end relative">
                <img
                  src="/assets/test.jpg"
                  alt="Funky Japanese learning illustration"
                  className="w-full max-w-lg rounded-2xl hover:scale-105 transition-transform duration-500"
                />
              </div>
            </div>
          </WebpageWrapper>
        </section>
      </Suspense>
    </>
  );
}
