import { Metadata } from "next";
import BreadCrumb from "@/components/BreadCrumb";
import WebpageWrapper from "@/components/wrapper/WebpageWrapper";
import HeadLine2 from "@/components/HeadLine2";
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
    { name: "News", to: "/news" },
  ];

  return (
    <Suspense fallback={<NewsSketeton />}>
      <div className="bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 min-h-[70vh]">
        <WebpageWrapper>
          <div className="pt-5">
            <BreadCrumb breadCrumbData={breadCrumbData} />
            <div className="w-1/2 mt-5">
              <HeadLine2 preText="" subText="" mainText="Blogs" />
            </div>
          </div>
        </WebpageWrapper>
        <NewsComponent />
      </div>
    </Suspense>
  );
}
