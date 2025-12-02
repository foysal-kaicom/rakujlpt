import { Metadata } from "next";
import BreadCrumb from "@/components/BreadCrumb";
import WebpageWrapper from "@/components/wrapper/WebpageWrapper";
import HeadLine2 from "@/components/HeadLine2";
import { Suspense } from "react";
import SuspenseLoader from "@/components/SuspenseLoader";
import NewsComponent from "./NewsComponent";

export const metadata: Metadata = {
  title: "Blogs",
  description:
    "Discover blogs on Japanese language learning, exam preparation tips, study guides, and updates for JPT, JLPT, and NAT learners. Learn smarter with Raku’s expert content. Boost your Japanese proficiency with the Raku blog — packed with study tips, exam guidance, learning techniques, and insights for JPT, JLPT, and NAT success.",
};

export default function AllNewsPage() {
  const breadCrumbData = [
    { name: "Home", to: "/" },
    { name: "News", to: "/news" },
  ];

  return (
    <Suspense fallback={<SuspenseLoader />}>
      <div className="bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 min-h-[70vh]">
        <WebpageWrapper>
          <div className="pt-5">
            <BreadCrumb breadCrumbData={breadCrumbData} />
            <div className="w-1/2 mt-5">
              <HeadLine2 preText="" subText="" mainText="Blogs" />
            </div>
          </div>

          <NewsComponent />
        </WebpageWrapper>
      </div>
    </Suspense>
  );
}
