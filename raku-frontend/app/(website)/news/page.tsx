import { Metadata } from "next";
import BreadCrumb from "@/components/BreadCrumb";
import WebpageWrapper from "@/components/wrapper/WebpageWrapper";
import { Suspense } from "react";

import NewsComponent from "./NewsComponent";
import NewsSketeton from "./NewsSkeleton";

export const metadata: Metadata = {
  title: "Raku JLPT News – Updates on JLPT, JPT & NAT Exams",
  description:
    "Stay updated with the latest JLPT, JPT, and NAT exam news. Get announcements, policy changes, exam schedules, study updates, and important information for Japanese language learners from Raku JLPT.",
  keywords: [
    "JLPT news",
    "JPT exam updates",
    "NAT test news",
    "Japanese language exam news",
    "JLPT announcements",
    "JPT latest news",
    "Japanese proficiency test updates",
    "Raku JLPT news",
  ],
};

export default function AllNewsPage() {
  const breadCrumbData = [
    { name: "Home", to: "/" },
    { name: "Blogs", to: "/news" },
  ];

  return (
    <Suspense fallback={<NewsSketeton />}>
      <div className="relative bg-gradient-to-br from-blue-50 via-pink-50 to-purple-100 min-h-[70vh] overflow-clip">
        <div className="absolute -top-16 -left-16 w-60 h-60 bg-yellow-200/30 rounded-full filter blur-3xl animate-bounce-slow"></div>
        <div className="absolute -bottom-24 -right-16 w-96 h-96 bg-pink-200/30 rounded-full filter blur-3xl animate-pulse-slow"></div>
        <WebpageWrapper>
          <div className="pt-5">
            <BreadCrumb breadCrumbData={breadCrumbData} />
            <div className="w-1/2 mt-5">
              <h2 className="text-4xl sm:text-5xl font-extrabold leading-snug bg-clip-text text-transparent bg-gradient-to-r from-indigo-500 via-pink-400 to-purple-500">
                Blogs
              </h2>
            </div>
          </div>
        </WebpageWrapper>
        <NewsComponent />
      </div>
    </Suspense>
  );
}
