"use client";
import { FaBook, FaLaptop, FaSmileBeam } from "react-icons/fa";

// Components
import BreadCrumb from "@/components/BreadCrumb";
import WebpageWrapper from "@/components/wrapper/WebpageWrapper";
import Link from "next/link";
import { useTranslation } from "react-i18next";

export default function AboutUsSection() {
  const { t } = useTranslation("common");
  const breadCrumbData = [
    { name: "Home", to: "/" },
    { name: t("breadcrumb.about_raku"), to: "/about_us" },
  ];
  return (
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
              {t("about.hero_title")}
            </h2>

            <p className="text-lg sm:text-xl text-gray-700/90">
              {t("about.hero_description")}{" "}
              <span className="font-bold text-indigo-500">
                {t("about.hero_highlight")}
              </span>
            </p>

            {/* Feature cards */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mt-6 pb-8">
              <div className="bg-white/60 backdrop-blur-md rounded-3xl p-6 flex flex-col items-center text-center shadow-lg transform hover:-translate-y-2 hover:rotate-1 transition-all duration-300">
                <FaBook
                  size={32}
                  className="mb-3 text-yellow-400 animate-bounce"
                />
                <h3 className="font-bold text-lg text-gray-900">
                  {t("about.features.mock_tests.title")}
                </h3>
                <p className="text-gray-800/80 mt-1 text-sm">
                  {t("about.features.mock_tests.desc")}
                </p>
              </div>

              <div className="bg-white/60 backdrop-blur-md rounded-3xl p-6 flex flex-col items-center text-center shadow-lg transform hover:-translate-y-2 hover:-rotate-1 transition-all duration-300">
                <FaLaptop
                  size={32}
                  className="mb-3 text-pink-400 animate-bounce"
                />
                <h3 className="font-bold text-lg text-gray-900">
                  {t("about.features.subscription.title")}
                </h3>
                <p className="text-gray-800/80 mt-1 text-sm">
                  {t("about.features.subscription.desc")}
                </p>
              </div>

              <div className="bg-white/60 backdrop-blur-md rounded-3xl p-6 flex flex-col items-center text-center shadow-lg transform hover:-translate-y-2 hover:rotate-1 transition-all duration-300">
                <FaSmileBeam
                  size={32}
                  className="mb-3 text-green-400 animate-bounce"
                />
                <h3 className="font-bold text-lg text-gray-900">
                  {t("about.features.progress.title")}
                </h3>
                <p className="text-gray-800/80 mt-1 text-sm">
                  {t("about.features.progress.desc")}
                </p>
              </div>
            </div>

            <div className="flex justify-center sm:justify-start">
              <Link
                href="/mock_test_select"
                className="bg-gradient-to-r from-pink-500 to-purple-500 px-8 py-3 rounded-3xl font-bold text-white shadow-lg hover:shadow-xl transition-all duration-300 border border-white"
              >
                {t("about.cta")}
              </Link>
            </div>
          </div>

          {/* Right illustration */}
          <div className="lg:w-1/2 flex justify-end relative">
            <img
              src="/assets/test.jpg"
              alt={t("about.image_alt")}
              className="w-full max-w-lg rounded-2xl hover:scale-105 transition-transform duration-500"
            />
          </div>
        </div>
      </WebpageWrapper>
    </section>
  );
}
