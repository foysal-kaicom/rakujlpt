import type { Metadata } from "next";
import { Suspense } from "react";
import SuspenseLoader from "@/components/SuspenseLoader";
import AboutUsSection from "@/components/AboutUsSection";

export const metadata: Metadata = {
  title: "About Raku JLPT – Japanese JLPT, JPT & NAT Practice Test Platform",
  description:
    "Learn more about Raku JLPT, the online platform that provides free and premium JLPT, JPT, and NAT mock tests. Discover our mission, how we help learners practice Japanese grammar, vocabulary, listening, and reading, and why thousands trust Raku for Japanese language exam preparation.",
  keywords: [
    "About Raku JLPT",
    "Raku JLPT platform",
    "Japanese practice test website",
    "JLPT JPT NAT mock test platform",
    "About Japanese learning site",
    "What is Raku JLPT",
  ],
};


export default function AboutJPT() {
  return (
    <>
      <Suspense fallback={<SuspenseLoader />}>
        <AboutUsSection />
      </Suspense>
    </>
  );
}
