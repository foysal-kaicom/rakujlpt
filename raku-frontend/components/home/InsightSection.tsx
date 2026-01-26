"use client";

import Link from "next/link";
import { PiExam } from "react-icons/pi";
import { TbAugmentedReality2 } from "react-icons/tb";
import { FaRegStar } from "react-icons/fa";
import { BsFileText } from "react-icons/bs";
import { FaArrowRight } from "react-icons/fa6";
import { PiCursorClickBold } from "react-icons/pi";

import InsightSectionCounter from "../InsightSectionCounter";
import { useTranslation } from "react-i18next";

export default function InsightSection() {
  const { t } = useTranslation("common");

  return (
    <section className="relative py-16 min-h-[70vh] flex items-center overflow-hidden">
      {/* Background blobs for playfulness */}
      <div className="absolute -top-24 -left-24 w-96 h-96 bg-purple-300/30 rounded-full blur-3xl" />
      <div className="absolute top-1/3 -right-24 w-96 h-96 bg-pink-300/30 rounded-full blur-3xl" />

      <div className="px-6 lg:px-8 container mx-auto z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
          {/* LEFT CONTENT */}
          <div>
            {/* Badge */}
            <p className="inline-flex items-center gap-2 text-sm font-semibold bg-linear-to-r from-blue-600 to-purple-600 text-white px-3 py-1 rounded-full mb-4 drop-shadow-sm drop-shadow-violet-600 border-b border-white/50">
              <FaRegStar />
              Raku JLPT
            </p>

            {/* Headline */}
            <h2 className="text-4xl md:text-6xl font-bold text-gray-900 mb-4">
              {t("premium")}{" "}
              <span className="bg-[linear-gradient(to_right,#2c5bfc_0%,#2c5bfc_42%,#e96fd1_48%,#db2777_52%,#8f26fb_58%,#8f26fb_100%)] bg-[length:300%_100%] animate-gradient bg-clip-text text-transparent">
                {" "}
                JPT & JLPT{" "}
              </span>{" "}
              {t("mocktest_exp")}
            </h2>

            {/* Subtext */}
            <p className="text-gray-600 text-sm sm:text-base mb-8">
              {t("prepare_for_your_exams")}
            </p>

            {/* Buttons */}
            <div className="flex flex-wrap gap-3 mb-8">
              {/* Primary CTA */}
              <Link
                href="/mock_test_select"
                className="group inline-flex items-center gap-2 px-6 py-3 rounded-full bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-semibold shadow-lg shadow-purple-400/40 hover:shadow-2xl hover:shadow-purple-400/60 transform hover:-translate-y-1 hover:scale-105 transition-all duration-300"
              >
                {t("start_mock_test")}
                <FaArrowRight className="group-hover:translate-x-2 transition-transform duration-300" />
              </Link>

              {/* Secondary CTA */}
              <Link
                href="/practice"
                className="relative inline-flex items-center gap-2 px-6 py-3 rounded-full font-semibold text-purple-700 bg-[linear-gradient(to_right,#ffffff_50%,#7c3aed_50%)] bg-[length:200%_100%] bg-left hover:bg-right border border-purple-400 shadow-md shadow-purple-300/40 hover:text-white hover:-translate-y-1 hover:scale-105 transition-[background-position,transform,color,box-shadow] duration-500"
              >
                <PiCursorClickBold className="text-2xl" />
                {t("start_practice")}
              </Link>
            </div>

            {/* Insight Counter Component */}
            <InsightSectionCounter />
          </div>

          {/* RIGHT CONTENT */}
          <div className="space-y-6">
            {/* Feature Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <article className="flex gap-4 p-5 bg-white/80 backdrop-blur rounded-2xl border border-gray-200 hover:shadow-lg hover:-translate-y-1 transition-all duration-300">
                <div className="shrink-0 flex items-center justify-center w-12 h-12 rounded-lg bg-blue-50">
                  <TbAugmentedReality2 className="size-6 text-gray-700" />
                </div>
                <div>
                  <h3 className="text-sm font-semibold text-gray-900">
                    {t("feature_real_exam_title")}
                  </h3>
                  <p className="text-xs text-gray-500 font-medium">
                    {t("feature_real_exam_desc")}
                  </p>
                </div>
              </article>

              <article className="flex gap-4 p-5 bg-white/80 backdrop-blur rounded-2xl border border-gray-200 hover:shadow-lg hover:-translate-y-1  transition-all duration-300">
                <div className="shrink-0 flex items-center justify-center w-12 h-12 rounded-lg bg-green-50">
                  <FaRegStar className="size-6 text-gray-700" />
                </div>
                <div>
                  <h3 className="text-sm font-semibold text-gray-900">
                    {t("feature_ai_title")}
                  </h3>
                  <p className="text-xs text-gray-500 font-medium">
                    {t("feature_ai_desc")}
                  </p>
                </div>
              </article>

              <article className="flex gap-4 p-5 bg-white/80 backdrop-blur rounded-2xl border border-gray-200 hover:shadow-lg hover:-translate-y-1 transition-all duration-300">
                <div className="shrink-0 flex items-center justify-center w-12 h-12 rounded-lg bg-yellow-50">
                  <PiExam className="size-6 text-gray-700" />
                </div>
                <div>
                  <h3 className="text-sm font-semibold text-gray-900">
                    {t("feature_certificate_title")}
                  </h3>
                  <p className="text-xs text-gray-500 font-medium">
                    {t("feature_certificate_desc")}
                  </p>
                </div>
              </article>

              <article className="flex gap-4 p-5 bg-white/80 backdrop-blur rounded-2xl border border-gray-200 hover:shadow-lg hover:-translate-y-1 transition-all duration-300 ">
                <div className="shrink-0 flex items-center justify-center w-12 h-12 rounded-lg bg-purple-50">
                  <BsFileText className="size-6 text-gray-700" />
                </div>
                <div>
                  <h3 className="text-sm font-semibold text-gray-900">
                    {t("feature_flexible_title")}
                  </h3>
                  <p className="text-xs text-gray-500 font-medium">
                    {t("feature_flexible_desc")}
                  </p>
                </div>
              </article>
            </div>

            {/* Promo Card */}
            <div className="rounded-2xl bg-white/50 border border-gray-200 p-6 hover:-translate-y-1 hover:shadow-lg transition">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="text-lg font-semibold text-gray-900">
                    {t("level_up_title")}
                  </h4>
                  <p className="text-sm text-gray-500 mt-1 font-medium">
                    {t("level_up_desc")}
                  </p>
                </div>
                <img
                  src="/assets/home/h1.png"
                  alt="mock test promo"
                  className="w-[30%] object-cover rounded-md drop-shadow-2xl hover:rotate-1 transition"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
