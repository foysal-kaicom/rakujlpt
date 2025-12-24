import { Metadata } from "next";
import { Suspense } from "react";

import QuestionCompositionComponent from "@/components/QuestionCompositionComponent";
import QuestionCompositionSkeleton from "./QusetionCompositionSkeleton";

// Metadata
export const metadata: Metadata = {
  title: "Question Composition – Create & Practice JLPT, JPT & NAT Questions | Raku JLPT",
  description:
    "Compose and practice JLPT, JPT, and NAT exam questions with Raku JLPT. Design custom practice tests, improve your Japanese grammar, vocabulary, listening, and reading skills, and track your performance.",
  keywords: [
    "JLPT question composition",
    "JPT practice questions",
    "NAT mock test creation",
    "Japanese exam practice",
    "Create JLPT test",
    "Practice Japanese questions online",
  ],
};


export default function QuestionComposition() {
  const breadCrumbData = [
    { name: "Home", to: "/" },
    { name: "Question Composition", to: "/question_composition" },
  ];
  
  return (
    <Suspense fallback={<QuestionCompositionSkeleton />}>
      <QuestionCompositionComponent breadCrumbData={breadCrumbData} type="" title="" duration="" />
    </Suspense>
  );
}
