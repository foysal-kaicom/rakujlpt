import { Metadata } from "next";
import FAQ from "./faqPage";
import { Suspense } from "react";
import SuspenseLoader from "@/components/SuspenseLoader";

export const metadata: Metadata = {
  title: "FAQ",
  description: "Explore Raku’s FAQ to learn how our Japanese language proficiency platform works—exam preparation, practice tests, subscriptions, payments, and student support explained.",
};


export default function FaqPageWrapper() {
  return (
    <Suspense fallback={<SuspenseLoader />}>
      <FAQ />
    </Suspense>
  );
}
