"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { useRouter } from "next/navigation";

import WebpageWrapper from "@/components/wrapper/WebpageWrapper";
import BreadCrumb from "@/components/BreadCrumb";

import { Sparkles, Rocket } from "lucide-react";
import { IoMdStar } from "react-icons/io";

import { useExamStore } from "@/stores/useExamStore";
import axios from "axios";
import { toast } from "raku-toast-react";

interface ExamResponse {
  data: Exam;
}

interface Exam {
  id: number;
  title: string;
  name: string;
  type: "general" | string;
  pass_point: number;
  total_point: number;
  duration: number;
  description: string;
  total_exam_question_quantity: string;
  mock_test_modules: MockTestModule[];
  reviews: Review[];
}

interface MockTestModule {
  id: number;
  exam_id: number;
  name: string;
  total_module_question_quantity: string;
  sections: Section[];
}

interface Section {
  id: number;
  mock_test_module_id: number;
  title: string;
  status: "active" | "inactive" | string;
  question_limit: number;
}

interface Review {
  id: number;
  exam_id: number;
  reviewer_name: string;
  reviewer_designation: string | null;
  rating: number;
  body: string;
}

export default function MockTestDetailsPage() {
  const params = useParams();
  const id = params.id;
  const router = useRouter();
  const { startExam } = useExamStore();
  const [examDetails, setExamDetails] = useState<Exam | null>(null);
  const breadCrumbData = [
    { name: "Home", to: "/" },
    { name: "Select Mock test", to: "/mock_test_select" },
    { name: "Mocktest Details", to: `/mock_test_select/${id}` },
  ];

  const getMockTestsDetails = async () => {
    try {
      const response = await axios.get<ExamResponse>(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/exam/module-details/${id}`,
      );
      setExamDetails(response.data.data);
    } catch (error: any) {
      toast.error(error?.response?.data?.message);
    }
  };

  useEffect(() => {
    getMockTestsDetails();
  }, []);

  return (
    <WebpageWrapper>
      <div className="pt-5">
        <BreadCrumb breadCrumbData={breadCrumbData} />

        <main className="space-y-12 py-10 max-w-6xl mx-auto">
          <section className="relative z-10 flex flex-col justify-center items-center text-center">
            <span className="inline-flex items-center gap-2 px-4 py-2 bg-white/70 backdrop-blur-md border border-white/40 rounded-full text-pink-600 text-sm font-medium shadow">
              <Sparkles className="w-4 h-4" />
              Raku JLPT
            </span>

            <h2 className="text-4xl sm:text-5xl font-extrabold leading-snug bg-clip-text text-transparent bg-gradient-to-r from-indigo-500 via-pink-400 to-purple-500 capitalize mt-3">
              {examDetails?.title} Mock Test
            </h2>

            <p className="mt-4 max-w-2xl text-lg text-slate-600 font-medium">
              {examDetails?.description}
            </p>

            <div className="mt-8 flex flex-wrap gap-3 justify-center">
              <span
                className={`px-4 py-2 rounded-full font-medium border shadow text-sm bg-indigo-100/40 text-indigo-700 border-indigo-200`}
              >
                ⏱ {examDetails?.duration} Minutes
              </span>

              <span
                className={`px-4 py-2 rounded-full font-medium border shadow text-sm bg-pink-100/40 text-pink-700 border-pink-200`}
              >
                ❓ {examDetails?.total_exam_question_quantity} Questions
              </span>

              <span
                className={`px-4 py-2 rounded-full font-medium border shadow text-sm bg-violet-100/40 text-violet-700 border-violet-200`}
              >
                🎯 Pass: {examDetails?.pass_point} / {examDetails?.total_point}
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

            <div
              className={`mt-4 gap-6 ${examDetails?.mock_test_modules && examDetails?.mock_test_modules?.length > 2 ? "grid md:grid-cols-2 xl:grid-cols-3" : "flex flex-col md:flex-row justify-center"}`}
            >
              {examDetails?.mock_test_modules.map((modules, moduleIndex) => (
                <div
                  key={modules.id}
                  className="flex-1 rounded-2xl p-6 border bg-white/70 border-slate-200 hover:border-indigo-300 transition"
                >
                  <h3 className="text-lg font-medium text-slate-900">
                    {modules.name}
                  </h3>
                  <div className="flex flex-wrap gap-x-2">
                    {modules.sections.map((section) => (
                      <p key={section.id} className="text-slate-600 mt-1">
                        {section.title},
                      </p>
                    ))}
                  </div>
                  <div className="mt-4 flex gap-4 text-sm">
                    <span
                      className={`px-3 py-1 rounded-full ${
                        moduleIndex % 2 == 0
                          ? "bg-pink-100 text-pink-700"
                          : "bg-purple-100 text-purple-700"
                      }`}
                    >
                      {modules?.sections.length} Section
                    </span>
                    <span className="px-3 py-1 rounded-full bg-slate-100 text-slate-900">
                      {modules?.total_module_question_quantity} Questions
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </section>

          <section>
            <SectionTitle title="Student Reviews" />
            {examDetails?.reviews && examDetails?.reviews.length > 0 ? (
              <div className="mt-4 grid md:grid-cols-3 gap-6">
                {examDetails?.reviews.map((review, index) => (
                  <div
                    key={review.id}
                    className={`rounded-2xl p-6 border ${
                      index % 2 == 0
                        ? "border-purple-200 bg-purple-50"
                        : "border-indigo-200 bg-indigo-50"
                    }`}
                  >
                    <p className="font-medium text-slate-900">
                      {review.reviewer_name}
                    </p>

                    <p className="flex gap-1 items-center">
                      {Array.from({ length: review.rating }).map((_, i) => (
                        <IoMdStar key={i} className="text-yellow-500 size-5" />
                      ))}
                    </p>

                    <p className="mt-2 text-slate-600">{review.body}</p>
                    <p className="mt-2 text-slate-600 text-sm">
                      - {review.reviewer_designation || "Student"}
                    </p>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center">No reviews found</div>
            )}
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

// function Review({
//   name,
//   rating,
//   text,
//   color,
// }: {
//   name: string;
//   rating: number;
//   text: string;
//   color: string;
// }) {
//   const borderColor =
//     color === "pink"
//       ? "border-pink-200"
//       : color === "violet"
//         ? "border-purple-200"
//         : "border-indigo-200";
//   return (
//     <div className={`rounded-2xl p-6 bg-${color}-50 border ${borderColor}`}>
//       <p className="font-medium text-slate-900">{name}</p>
//       <p className="flex gap-1 items-center">
//         {[...Array(rating)].map((_, i) => (
//           <IoMdStar key={i} className="text-yellow-500 size-5" />
//         ))}
//       </p>

//       <p className="mt-2 text-slate-600">{text}</p>
//     </div>
//   );
// }
