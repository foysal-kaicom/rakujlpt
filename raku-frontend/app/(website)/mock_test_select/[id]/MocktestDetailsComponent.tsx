"use client";

import { useParams } from "next/navigation";
import { useRouter } from "next/navigation";

import WebpageWrapper from "@/components/wrapper/WebpageWrapper";
import BreadCrumb from "@/components/BreadCrumb";

import { Sparkles, Rocket } from "lucide-react";
import { IoMdStar } from "react-icons/io";

import { useExamStore } from "@/stores/useExamStore";

export default function MockTestDetailsPage() {
  const params = useParams();
  const id = params.id;
  const router = useRouter();
  const { startExam } = useExamStore();
  const breadCrumbData = [
    { name: "Home", to: "/" },
    { name: "Select Mock test", to: "/mock_test_select" },
    { name: "Mocktest Details", to: `/mock_test_select/${id}` },
  ];

  return (
    <WebpageWrapper>
      <div className="pt-5">
        <BreadCrumb breadCrumbData={breadCrumbData} />

        <main className="space-y-12 py-8 max-w-6xl mx-auto">
          <section className="relative z-10 flex flex-col justify-center items-center text-center">
            <span className="inline-flex items-center gap-2 px-4 py-2 bg-white/70 backdrop-blur-md border border-white/40 rounded-full text-pink-600 text-sm font-medium shadow">
              <Sparkles className="w-4 h-4" />
              Raku JLPT
            </span>

            <h2 className="text-4xl sm:text-5xl font-extrabold leading-snug bg-clip-text text-transparent bg-gradient-to-r from-indigo-500 via-pink-400 to-purple-500 capitalize mt-3">
              JLPT N4 Full Mock Test
            </h2>

            <p className="mt-4 max-w-2xl text-lg text-slate-600 font-medium">
              Experience a real JLPT-style mock test with authentic questions,
              strict timing, and instant evaluation.
            </p>

            <div className="mt-8 flex flex-wrap gap-3 justify-center">
              <span
                className={`px-4 py-2 rounded-full font-medium border shadow text-sm bg-indigo-100/40 text-indigo-700 border-indigo-200`}
              >
                ⏱ 120 Minutes
              </span>

              <span
                className={`px-4 py-2 rounded-full font-medium border shadow text-sm bg-pink-100/40 text-pink-700 border-pink-200`}
              >
                ❓ 120 Questions
              </span>

              <span
                className={`px-4 py-2 rounded-full font-medium border shadow text-sm bg-violet-100/40 text-violet-700 border-violet-200`}
              >
                🎯 Pass: 90 / 180
              </span>
            </div>

            <button
              onClick={() => {
                startExam();
                router.push(`/mock_test/start/${id}`);
              }}
              className="mt-10 bg-gradient-to-r from-pink-500 to-purple-500 px-8 py-3 rounded-3xl font-bold text-white shadow-lg hover:shadow-xl transition-all duration-300 border border-white flex gap-1 shake-pause cursor-pointer"
            >
              Start Mock Test <Rocket />
            </button>
          </section>

          <section>
            <SectionTitle title="Module-wise Question Breakdown" />

            <div className="mt-4 grid md:grid-cols-2 xl:grid-cols-4 gap-6">
              <Module
                title="Vocabulary"
                desc="Kanji, meanings & usage"
                question="30"
                section="60"
                color="indigo"
              />
              <Module
                title="Grammar"
                desc="Particles & patterns"
                question="30"
                section="60"
                color="pink"
              />
              <Module
                title="Reading"
                desc="Short & long passages"
                question="30"
                section="60"
                color="violet"
              />
              <Module
                title="Listening"
                desc="Audio-based questions"
                question="30"
                section="60"
                color="indigo"
              />
            </div>
          </section>

          <section>
            <SectionTitle title="Student Reviews" />

            <div className="mt-4 grid md:grid-cols-3 gap-6">
              <Review
                name="Rafiul Islam"
                rating={5}
                text="Very close to the real JLPT exam experience. Highly recommended."
                color="indigo"
              />
              <Review
                name="Nusrat Jahan"
                rating={4}
                text="Listening section was challenging but realistic."
                color="pink"
              />
            </div>
          </section>

          <section className="flex justify-center">
            <button
              onClick={() => {
                startExam();
                router.push(`/mock_test/start/${id}`);
              }}
              className="bg-gradient-to-r from-pink-500 to-purple-500 px-8 py-3 rounded-3xl font-bold text-white shadow-lg hover:shadow-xl transition-all duration-300 border border-white flex gap-1 shake-pause cursor-pointer"
            >
              Start Mock Test <Rocket />
            </button>
          </section>
        </main>
      </div>
    </WebpageWrapper>
  );
}

/* ================= COMPONENTS ================= */

function SectionTitle({ title }: { title: string }) {
  return (
    <h2 className="text-3xl font-semibold leading-snug bg-clip-text text-transparent bg-gradient-to-r from-indigo-500 via-pink-400 to-purple-500 text-center">
      {title}
    </h2>
  );
}

function Module({
  title,
  desc,
  section,
  question,
  color,
}: {
  title: string;
  desc: string;
  section: string;
  question: string;
  color: string;
}) {
  const badgeColor =
    color === "pink"
      ? "bg-pink-100 text-pink-700"
      : color === "violet"
        ? "bg-purple-100 text-purple-700"
        : "bg-indigo-100 text-indigo-700";
  return (
    <div className="rounded-2xl p-6 border bg-white/70 border-slate-200 hover:border-indigo-300 transition">
      <h3 className="text-lg font-medium text-slate-900">{title}</h3>
      <p className="text-slate-600 mt-1">{desc}</p>

      <div className="mt-4 flex gap-4 text-sm">
        <span className={`px-3 py-1 rounded-full ${badgeColor}`}>
          {section} Section
        </span>
        <span className="px-3 py-1 rounded-full bg-slate-100 text-slate-900">
          {question} Questions
        </span>
      </div>
    </div>
  );
}

function Review({
  name,
  rating,
  text,
  color,
}: {
  name: string;
  rating: number;
  text: string;
  color: string;
}) {
  const borderColor =
    color === "pink"
      ? "border-pink-200"
      : color === "violet"
        ? "border-purple-200"
        : "border-indigo-200";
  return (
    <div className={`rounded-2xl p-6 bg-${color}-50 border ${borderColor}`}>
      <p className="font-medium text-slate-900">{name}</p>
      <p className="flex gap-1 items-center">
        {[...Array(rating)].map((_, i) => (
          <IoMdStar key={i} className="text-yellow-500 size-5" />
        ))}
      </p>

      <p className="mt-2 text-slate-600">{text}</p>
    </div>
  );
}