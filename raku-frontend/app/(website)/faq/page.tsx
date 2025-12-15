import { Metadata } from "next";
import FAQ from "./faqPage";
import { Suspense } from "react";
import SuspenseLoader from "@/components/SuspenseLoader";

export const metadata: Metadata = {
  title: "FAQ – Raku JLPT | JLPT, JPT & NAT Mock Test Help & Common Questions",
  description:
    "Find answers to frequently asked questions about Raku JLPT, including how to take JLPT, JPT, and NAT mock tests, scoring details, subscriptions, payments, account issues, and platform features.",
  keywords: [
    "Raku JLPT FAQ",
    "JLPT mock test FAQ",
    "JPT practice test FAQ",
    "NAT mock test FAQ",
    "Japanese exam practice help",
    "How to use Raku JLPT",
    "JLPT test platform questions",
  ],
};



export default function FaqPageWrapper() {
  return (
    <Suspense fallback={<SuspenseLoader />}>
      <FAQ />
    </Suspense>
  );
}
